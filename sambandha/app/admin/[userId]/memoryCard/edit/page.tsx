import { NextPage } from "next";
import Edit from "./Edit";

interface PageProps {
  params: Promise<{ userId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;

  return <Edit userId={userId} />;
};

export default Page;
