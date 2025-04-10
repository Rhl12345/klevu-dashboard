import Image from "@/components/Image/Image";

const RenderImageCell = ({ path }: { path: string }) => {
  const imagePath = `https://redefinecommerce.blob.core.windows.net${path}`;
  const imageSrc = path?.length > 0 ? imagePath : `/noImage.png`;
  const altText = path?.length > 0 ? path : "default-image";

  return (
    <div className="flex items-center">
      <Image className="w-20" src={imageSrc} alt={altText} />
    </div>
  );
};

export default RenderImageCell;
