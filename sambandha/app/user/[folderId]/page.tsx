import FolderDetail from "./FolderDetail";

interface PageProps {
  params: Promise<{ folderId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { folderId } = await params;

  return <FolderDetail folderId={folderId} />;
};

export default Page;
