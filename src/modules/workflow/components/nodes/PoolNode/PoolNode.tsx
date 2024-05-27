import { Handle, NodeResizer, Position } from "reactflow";
import { CustomNodeProps } from "../types";
import "./PoolNode.css";

export function PoolNode({ selected, data }: CustomNodeProps) {
  return (
    <>
      <NodeResizer minWidth={300} minHeight={100} isVisible={selected} />
      <div className="pool-node"></div>
      <div className="pool-node__label">
        <p>{data.label}</p>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="custom-handle"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        className="custom-handle"
      />
    </>
  );
}
