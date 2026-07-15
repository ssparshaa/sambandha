import Memories from "./Memories";

interface PageProps {
  params: Promise<{ userId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;
  return <Memories userId={userId} />;
};

export default Page;
