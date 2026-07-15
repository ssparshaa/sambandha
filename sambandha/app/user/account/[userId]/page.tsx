import MyAccount from "./MyAccount";

interface PageProps {
  params: Promise<{ userId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;

  return <MyAccount userId={userId} />;
};

export default Page;
