import { Handle, Position } from "reactflow";
import "./TaskNode.css";
import { CustomNodeProps } from "../types";

export function TaskNode({ data, selected }: CustomNodeProps) {
  return (
    <>
      <div className={`task-node ${selected ? "active" : ""}`}>
        {data.label}
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="custom-handle"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="custom-handle"
      />
    </>
  );
}
