import React from "react";

interface Props {
  active: boolean;
  className?: string;
  [key: string]: any;
}

function Tab(props: Props) {
  if (props.active)
    return <div className={`${props.className}`}>{props.children}</div>;
  return null;
}

export default Tab;
