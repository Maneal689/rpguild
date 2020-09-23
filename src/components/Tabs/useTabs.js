import { useState } from "react";

function useTabs(defaultActiveKey = null) {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  return { activeKey, setActiveKey };
}

export default useTabs;
