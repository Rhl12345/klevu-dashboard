import { FC } from "react";

import { StatusProps } from "@/types/common/common.type";
import { RecStatusValuebyName, RecStatusValueName } from "@/utils/constants";
import Success from "../DisplayStatus/Success";
import Danger from "../DisplayStatus/Danger";
import Grey from "../DisplayStatus/Grey";
import Warning from "../DisplayStatus/Warning";
import Slate from "../DisplayStatus/Slate";
import Expired from "../DisplayStatus/Expired";
import General from "../DisplayStatus/General";

const Status: FC<StatusProps> = ({ type, ...rest }) => {
  switch (true) {
    case [
      RecStatusValuebyName?.Active,
      RecStatusValueName.FulFilled,
      RecStatusValueName.Approved,
      RecStatusValueName.Approve,
      RecStatusValueName.Subscribed,
    ].includes(type):
      return <Success type={type} {...rest} />;
    case [
      RecStatusValuebyName.Inactive,
      RecStatusValuebyName.Cancelled,
      RecStatusValuebyName.Fraud,
      RecStatusValueName.Disapproved,
      RecStatusValueName.Reject,
      RecStatusValueName.Unsubscribed,
    ].includes(type):
      return <Danger type={type} {...rest} />;
    case [
      RecStatusValuebyName.Draft,
      RecStatusValueName.Paid,
      RecStatusValuebyName.Cloned,
    ].includes(type):
      return <Grey type={type} {...rest} />;
    case [
      RecStatusValuebyName.Pending,
      RecStatusValuebyName.Scheduled,
      RecStatusValueName.Unfulfilled,
      RecStatusValueName.Pending,
      RecStatusValueName.Inprogress,
    ].includes(type):
      return <Warning type={type} {...rest} />;
    case [RecStatusValuebyName?.Archived].includes(type):
      return <Slate type={type} {...rest} />;
    case [RecStatusValuebyName.Expired].includes(type):
      return <Expired type={type} {...rest} />;
    default:
      return <General type={type} {...rest} />;
  }
};

export default Status;
