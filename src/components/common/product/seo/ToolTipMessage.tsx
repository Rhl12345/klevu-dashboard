import Tooltip from "@/components/Tooltip/Tooltip";
import { ISeoToolTipMessageRange } from "@/types/seo-tab/seoTab.type";

const ToolTipMessage = ({
  message1,
  message2,
  message3,
}: ISeoToolTipMessageRange) => (
  <Tooltip>
    {message1}
    <br />
    {message2}
    <br />
    {message3}
  </Tooltip>
);

export default ToolTipMessage;
