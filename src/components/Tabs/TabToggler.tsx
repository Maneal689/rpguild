import React from "react";

interface Props {
  targetKey: number | string;
  setActiveKey: any;
  className?: string;
  [key: string]: any;
}

function TabToggler(props: Props) {
  return (
    <div
      className={`${props.className}`}
      onClick={() => props.setActiveKey(props.targetKey)}
    >
      {props.children}
    </div>
  );
}

export default TabToggler;
