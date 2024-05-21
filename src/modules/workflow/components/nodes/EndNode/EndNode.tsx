import { Handle, Position } from "reactflow";
import "./EndNode.css";
import { CustomNodeProps } from "../types";

export function EndNode({ selected, data }: CustomNodeProps) {
  return (
    <>
      <div className={`end-node ${selected ? "active" : null}`}></div>
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="custom-handle"
      />
      <div className="end-node__label">{data.label}</div>
    </>
  );
}
