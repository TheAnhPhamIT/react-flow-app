import { useReactFlow } from "reactflow";
import "./Toolbar.css";
import { CustomNode, CustomNodeType } from "../../nodes/types";
import { useCallback } from "react";

export function Toolbar() {
  const { addNodes } = useReactFlow();

  const createNodeByType = useCallback(
    (type: CustomNodeType) => {
      const newNode: CustomNode = {
        id: `node-${Date.now()}`,
        type,
        position: {
          x: 100,
          y: 100,
        },
        data: {
          label: "right click to open the context menu",
        },
      };

      addNodes(newNode);
    },
    [addNodes]
  );

  return (
    <div className="toolbar">
      <button
        className="toolbar__item create-start-node"
        onClick={() => createNodeByType("startEvent")}
      ></button>
      <button
        className="toolbar__item create-task-node"
        onClick={() => createNodeByType("task")}
      ></button>
      <button
        className="toolbar__item create-end-node"
        onClick={() => createNodeByType("endEvent")}
      ></button>
      <button
        className="toolbar__item create-gateway-node"
        onClick={() => createNodeByType("gateway")}
      ></button>
      <button
        className="toolbar__item create-pool-node"
        onClick={() => createNodeByType("pool")}
      ></button>
    </div>
  );
}
