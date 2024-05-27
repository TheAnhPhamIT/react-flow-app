import { Handle, Position } from "reactflow";
import "./StartNode.css";
import { CustomNodeProps } from "../types";

export function StartNode({ selected, data }: CustomNodeProps) {
  return (
    <>
      <div className={`start-node ${selected ? "active" : ""}`}></div>
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="custom-handle"
      />
      <div className="start-node__label">{data.label}</div>
    </>
  );
}
