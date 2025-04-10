import Loader from "@/components/common/Loader";

const Loading = () => {
  return (
    <div className="fixed z-50 inset-0 bg-body-light dark:bg-body-dark bg-opacity-80 flex justify-center items-center h-screen w-full">
      <Loader />
    </div>
  );
};

export default Loading;
