"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/../config/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/../context/AuthContext";
import Loading from "@/components/loading";
import CustomerMemoryCard from "@/components/customer-memory-card";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface MemoryCard {
  _id: string; // Changed from id to _id to match actual usage
  title: string;
  description: string;
  image?: string;
  audio?: string;
  bgColor: string; // Added missing bgColor field
  date: string; // Added missing createdAt field
  createdAt: string; // Added missing createdAt field
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

// Interface for the user data from auth context
interface AuthUser {
  _id: string;
  name: string;
  email?: string;
  role?: string;
}

const fetchMemoryCards = async (
  userId: string,
  token: string,
): Promise<MemoryCard[]> => {
  const { data } = await api.get(`/memoryCard/get/${userId}`);
  return data;
};

const fetchUserData = async (userId: string, token: string): Promise<User> => {
  const { data } = await api.get(`/user/get/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

const MemoryCard: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoggedIn, user: userData, loading } = useAuth();
  const [loadingg, setLoadingg] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMemoryCardId, setSelectedMemoryCardId] = useState<
    string | null
  >(null);
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        router.push("/login");
      }
    }
  }, [isLoggedIn, loading, router]);

  // Type assertion for userData to ensure it has the expected structure
  const typedUserData = userData as AuthUser | null;
  const userId = typedUserData?._id;

  const { data: memoryCards, isLoading: loadingCards } = useQuery({
    queryKey: ["memoryCards", userId],
    queryFn: () => {
      if (!userId || !token) {
        throw new Error("Missing userId or token");
      }
      return fetchMemoryCards(userId, token);
    },
    enabled: !!userId && !!token,
  });

  const { data: user, isLoading: loadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      if (!userId || !token) {
        throw new Error("Missing userId or token");
      }
      return fetchUserData(userId, token);
    },
    enabled: !!userId && !!token,
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await api.delete(`/memoryCard/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onMutate: () => {
      setLoadingg(true);
    },
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["memoryCards"] }); // Refresh users list
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || error.message);
    },
    onSettled: () => {
      setIsDeleteModalOpen(false);
      setSelectedMemoryCardId(null);
      setLoadingg(false);
    },
  });

  // Show loading state while auth is loading or if queries are loading
  if (loadingg || loading || loadingCards || loadingUser) {
    return (
      <div className="p-4 bg-stone-800 min-h-dvh rounded-[2%] pt-16 mx-2">
        <Loading />
      </div>
    );
  }

  // If not logged in and not loading, don't render anything (redirect will happen)
  if (!loading && !isLoggedIn) {
    return null;
  }

  return (
    <div className="p-4 bg-stone-800 min-h-dvh rounded-[2%] pt-16 mx-2">
      {/* User Info Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">
            {typedUserData?.name || "User"}'s Memory Cards
          </h2>
          <p className="text-gray-400">Total: {memoryCards?.length || 0}</p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            if (userId) {
              router.push(`/user/${userId}/memoryCard/create`);
            }
          }}
          disabled={!userId} // Disable button if no userId
        >
          Create Memory Card
        </button>
      </div>

      {/* Memory Cards List */}
      {memoryCards && memoryCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {memoryCards.map((card, index) => (
            <div key={card._id} className="flex justify-center items-center">
              <CustomerMemoryCard
                key={card._id}
                id={card._id}
                image={card.image}
                date={
                  new Date(card?.date).toLocaleDateString() ||
                  new Date(card.createdAt).toLocaleDateString()
                }
                alt={card.title}
                heading={card.title}
                subheading={card.description}
                audioSrc={card?.audio}
                index={index}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                setSelectedMemoryCardId={setSelectedMemoryCardId}
                userId={userId}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-10 p-6 border rounded-md border-dashed border-gray-600">
          <p className="text-xl font-semibold">No Memory Cards Found</p>
          <p className="text-sm text-gray-500 mt-2">
            Create your first memory card to get started!
          </p>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-stone-800 p-6 rounded-lg shadow-lg flex flex-col gap-4 w-96">
            <h2 className="text-lg font-semibold">Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-green-800 rounded"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-800 text-white rounded"
                onClick={() =>
                  selectedMemoryCardId &&
                  deleteUserMutation.mutate(selectedMemoryCardId)
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryCard;
