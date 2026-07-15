import { NextPage } from "next";
import Create from "./Create";

interface PageProps {
  params: Promise<{ userId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;

  return <Create userId={userId} />;
};

export default Page;
