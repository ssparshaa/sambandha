import Memories from "./Memories";

interface PageProps {
  params: Promise<{ folderId: string; userId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { folderId } = await params;
  const { userId } = await params;

  return <Memories folderId={folderId} userId={userId} />;
};

export default Page;
