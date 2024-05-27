import { Handle, NodeResizer, Position } from "reactflow";
import { CustomNodeProps } from "../types";
import "./PoolNode.css";

export function PoolNode({ selected }: CustomNodeProps) {
  return (
    <>
      <NodeResizer minWidth={300} minHeight={100} isVisible={selected} />
      <div
        className="pool-node"
        style={{
          minWidth: 300,
          minHeight: 100,
          backgroundColor: "orange",
        }}
        draggable
      ></div>
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
