import Edit from "./Edit";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return <Edit slug={slug} />;
};

export default Page;
