import { NextPage } from "next";
import SingleProductPage from "./SingleProductPage";

interface PageProps {
  params: Promise<{ productSlug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { productSlug } = await params;
  return <SingleProductPage productSlug={productSlug} />;
};

export default Page;
