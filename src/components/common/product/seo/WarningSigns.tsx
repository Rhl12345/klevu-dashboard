const WarningSigns = ({ colorFill }: { colorFill: string }) => (
  <div className="flex items-center justify-between gap-1">
    <div className={`w-4 h-4 rounded-full overflow-hidden ${colorFill}`} />
    <div className={`w-4 h-4 rounded-full overflow-hidden ${colorFill}`} />
    <div className={`w-4 h-4 rounded-full overflow-hidden ${colorFill}`} />
  </div>
);

export default WarningSigns;
