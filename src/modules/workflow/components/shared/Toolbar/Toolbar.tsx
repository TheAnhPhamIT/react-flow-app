// import { useReactFlow } from "reactflow";
import { CustomNodeType } from "../../nodes/types";
import "./Toolbar.css";
// import { CustomNode, CustomNodeType } from "../../nodes/types";
// import { useCallback } from "react";

export function Toolbar() {
  // const { addNodes } = useReactFlow();

  function onDragStart(event: React.DragEvent, nodeType: CustomNodeType) {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }

  // const createNodeByType = useCallback(
  //   (type: CustomNodeType) => {
  //     const newNode: CustomNode = {
  //       id: `node-${Date.now()}`,
  //       type,
  //       position: {
  //         x: 100,
  //         y: 100,
  //       },
  //       data: {
  //         label: "right click to open the context menu",
  //       },
  //     };

  //     addNodes(newNode);
  //   },
  //   [addNodes]
  // );

  return (
    <div className="toolbar">
      <div
        onDragStart={(event: React.DragEvent) =>
          onDragStart(event, "startEvent")
        }
        draggable
        className="toolbar__item create-start-node"
        // onClick={() => createNodeByType("startEvent")}
      ></div>
      <div
        onDragStart={(event: React.DragEvent) => onDragStart(event, "task")}
        draggable
        className="toolbar__item create-task-node"
        // onClick={() => createNodeByType("task")}
      ></div>
      <div
        onDragStart={(event: React.DragEvent) => onDragStart(event, "endEvent")}
        draggable
        className="toolbar__item create-end-node"
        // onClick={() => createNodeByType("endEvent")}
      ></div>
      <div
        onDragStart={(event: React.DragEvent) => onDragStart(event, "gateway")}
        draggable
        className="toolbar__item create-gateway-node"
        // onClick={() => createNodeByType("gateway")}
      ></div>
      <div
        onDragStart={(event: React.DragEvent) => onDragStart(event, "pool")}
        draggable
        className="toolbar__item create-pool-node"
        // onClick={() => createNodeByType("pool")}
      ></div>
    </div>
  );
}
