import { CustomNodeType } from "../../nodes/types";
import "./Toolbar.css";

export function Toolbar() {
  function onDragStart(event: React.DragEvent, nodeType: CustomNodeType) {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <div className="toolbar">
      <div
        onDragStart={(event: React.DragEvent) =>
          onDragStart(event, "startEvent")
        }
        draggable
        className="toolbar__item create-start-node"
      ></div>
      <div
        onDragStart={(event: React.DragEvent) => onDragStart(event, "task")}
        draggable
        className="toolbar__item create-task-node"
      ></div>
      <div
        onDragStart={(event: React.DragEvent) => onDragStart(event, "endEvent")}
        draggable
        className="toolbar__item create-end-node"
      ></div>
      <div
        onDragStart={(event: React.DragEvent) => onDragStart(event, "gateway")}
        draggable
        className="toolbar__item create-gateway-node"
      ></div>
      <div
        onDragStart={(event: React.DragEvent) => onDragStart(event, "pool")}
        draggable
        className="toolbar__item create-pool-node"
      ></div>
    </div>
  );
}
