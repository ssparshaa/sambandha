import { NextPage } from "next";

interface Props {}

const Loading: NextPage<Props> = ({}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[500]">
      <div className="h-12 w-12 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
