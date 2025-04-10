import Grid from "@/components/Grid/Grid";
import Image from "@/components/Image/Image";
import { IStoreSectionProps } from "@/types/dashboard/dashboard.type";

const StoreSection = ({ title, items }: IStoreSectionProps) => {
  return (
    <div className="text-center item-center block border border-gray-light dark:border-gray-dark">
      <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 bg-body-light dark:bg-body-dark">
        <div className="p-2 lg:p-4 font-semibold text-md lg:text-lg text-quaternary-dark dark:text-quaternary-light border-b border-gray-light dark:border-gray-dark">
          {title}
        </div>

        <Grid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-10 gap-4 lg:gap-6 p-4 lg:p-6">
          {items.map((item) => (
            <div
              key={item.name}
              className="text-quaternary-dark dark:text-quaternary-light text-xs border border-solid border-gray-light dark:border-gray-dark"
            >
              <div className="grow flex items-center justify-center p-2 h-40 bg-body-light dark:bg-gray-dark/60">
                <Image
                  className="max-h-full mx-auto cursor-pointer"
                  src={item.src}
                  alt={item.alt}
                />
              </div>
              <div className="p-2 bg-body-light dark:bg-body-dark flex items-center justify-center min-h-[2.082vw] border-t border-gray-light dark:border-gray-dark text-quaternary-dark dark:text-quaternary-light overflow-hidden text-ellipsis rounded-none">
                {item.name}
              </div>
            </div>
          ))}
        </Grid>
        
      </div>
    </div>
  );
};

export default StoreSection;
