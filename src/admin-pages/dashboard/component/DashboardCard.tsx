import { IDashboardCardProps } from "@/types/main-dashboard/mainDashboard.type";

const DashboardCard: React.FC<IDashboardCardProps> = ({
    title,
    icon: Icon,
    description,
  }) => (
    <div
      className={`p-4 lg:p-6 border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark text-center`}
    >
      <div className='flex flex-col items-center'>
        <div className='mb-4 h-10 w-10'>
          {Icon}
        </div>
        <h3 className='font-semibold text-quaternary-dark dark:text-quaternary-light mb-1'>
          {title}
        </h3>
        <p className='text-xs text-quaternary-dark dark:text-quaternary-light'>
          {description}
        </p>
      </div>
    </div>
  );

  export default DashboardCard;