"use client";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../config/api";
import { useRouter } from "next/navigation";
import { Ellipsis, Eye, EyeClosed } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import Cookies from "js-cookie";
import Loading from "./loading";

const fetchUsersData = async (token: string) => {
  try {
    const response = await api.get("/admin/getUsers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Ensure returning `data` directly
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch users data");
  }
};

const AdminDashboard = () => {
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isLoggedIn, user: userInfo, loading: authLoading } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const togglePassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (!authLoading) {
      if (!isLoggedIn) {
        router.push("/login");
        return; // don’t set loading false
      }

      if (!userInfo?.role || userInfo.role !== "admin") {
        router.push("/");
        return; // don’t set loading false
      }

      // Only reach here if valid admin
      setIsAdmin(true);
      setToken(Cookies.get("token"));
      setLoading(false);
    }
  }, [authLoading, isLoggedIn, userInfo, router]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsersData(token!),
    enabled: !!token && isAdmin && !loading,
  });

  // 2. Create User Mutation
  const createUserMutation = useMutation({
    mutationFn: async (formData: any) => {
      const response = await api.post("/admin/createUser", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },

    // Triggered if successful
    onSuccess: () => {
      toast.success("User created successfully", { duration: 1000 });
      queryClient.invalidateQueries({ queryKey: ["users"] }); // refetch users
    },

    // Triggered if error
    onError: (error: any) => {
      const msg = error?.response?.data?.message || error?.response?.data || error.message || "Something went wrong";
      toast.error(typeof msg === "string" ? msg : "Something went wrong");
    },

    // Always runs (success or error)
    onSettled: () => {
      setIsModalOpen(false); // close modal
    },
  });

  // 3. Delete User Mutation
  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/admin/deleteUser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("User deleted successfully", { duration: 1000 });
      queryClient.invalidateQueries({ queryKey: ["users"] }); // refetch users
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || error?.response?.data || error.message || "Something went wrong";
      toast.error(typeof msg === "string" ? msg : "Something went wrong");
    },
    // Always runs (success or error)
    onSettled: () => {
      setIsDeleteModalOpen(false); // close modal
    },
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (!isAdmin) {
    return <p>You are not authorized to view this page</p>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 4. Handlers
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserMutation.mutate(formData); // pass formData state
  };

  const handleDelete = () => {
    deleteUserMutation.mutate();
  };

  return (
    <div className="p-4 bg-stone-800 min-h-dvh rounded-[2%] pt-16 mx-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[25px] font-bold text-gray-200 text">
          User Dashboard
        </h1>
        <button
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Create New User
        </button>
      </div>

      {/* User Table */}
      <div className="bg-[#1E1B1A] rounded-md shadow-md overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-stone-700">
            <tr>
              <th className="px-4 py-2 text-left text-gray-200">S.N.</th>
              <th className="px-4 py-2 text-left text-gray-200">Name</th>
              <th className="px-4 py-2 text-left text-gray-200">Email</th>
              <th className="px-4 py-2 text-left text-gray-200">Status</th>
              <th className="px-4 py-2 text-left text-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2 text-gray-200">{index + 1}</td>
                <td className="px-4 py-2 text-gray-200">{user.name}</td>
                <td className="px-4 py-2 text-gray-200">{user.email}</td>
                <td className="px-4 py-2 text-gray-200 flex">
                  {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : "Active"}
                  {/* <Switch className=""/> */}
                </td>
                <td className="px-4 py-2 text-gray-200 cursor-pointer">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Ellipsis className="" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="flex flex-col gap-1"
                    >
                      <DropdownMenuItem
                        onClick={() => router.push(`/${user._id}`)}
                      >
                        Visit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/admin/${user._id}/memoryCard`)
                        }
                      >
                        Memory Card
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setUserId(user._id);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Creating New User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create New User</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="Name">Name</Label>
                    <Input
                      type="name"
                      id="name"
                      placeholder="Full Name"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="Email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        required
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                      {/* Eye icon for toggling password visibility */}
                      <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <Eye className="w-4" />
                        ) : (
                          <EyeClosed className="w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="confirm_password"
                        placeholder="Confirm Password"
                        required
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirm_password: e.target.value,
                          })
                        }
                      />
                      {/* Eye icon for toggling password visibility */}
                      <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <Eye className="w-4" />
                        ) : (
                          <EyeClosed className="w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={() => setIsModalOpen(false)} variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Confirm Delete</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Are you sure you want to delete this user?</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => setIsDeleteModalOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
