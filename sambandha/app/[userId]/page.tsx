import UserMemoryCard from "@/components/UserMemoryCards";

interface PageProps {
  params: Promise<{ userId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;
  return <UserMemoryCard userId={userId} />;
};

export default Page;
