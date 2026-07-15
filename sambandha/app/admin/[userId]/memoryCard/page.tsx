// app/user/[userId]/page.tsx

import MemoryCard from "./MemoryCard";

interface PageProps {
  params: Promise<{ userId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;

  return <MemoryCard userId={userId} />;
};

export default Page;
