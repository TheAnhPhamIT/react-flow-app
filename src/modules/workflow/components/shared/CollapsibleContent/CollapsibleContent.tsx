import { PropsWithChildren, useRef, useState } from "react";
import "./CollapsibleContent.css";

type CollapsibleContentProps = PropsWithChildren & {
  name: string;
};

export function CollapsibleContent({
  name,
  children,
}: CollapsibleContentProps) {
  const [showContent, setShowContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const contentStyle = {
    maxHeight: showContent ? contentRef?.current?.scrollHeight + "px" : "0",
  };
  return (
    <div className="collapsible">
      <div
        className="collapsible__name"
        onClick={() => setShowContent((prev) => !prev)}
      >
        {name}
      </div>
      <div
        ref={contentRef}
        className="collapsible__content"
        style={contentStyle}
      >
        {children}
      </div>
    </div>
  );
}
