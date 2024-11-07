import React, { PropsWithChildren } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface Props {
  id: string;
  message: string;
  link?: string;
  className?: string;
  tipClasses?: string;
}

const Tooltip = ({
  children,
  message,
  id,
  className,
  tipClasses = "",
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={className}
      data-tooltip-id={id}
      data-tooltip-content={message}
      data-tooltip-delay-hide={100}
    >
      {children}
      <ReactTooltip
        id={id}
        openEvents={{ mouseover: true }}
        className={`!rounded-xl border !bg-white !text-left !text-black !font-bold !text-lg ${tipClasses}`}
        place="bottom"
      />
    </div>
  );
};

export default Tooltip;
