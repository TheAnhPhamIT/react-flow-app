import { Handle, Position } from "reactflow";
import "./GatewayNode.css";
import { CustomNodeProps } from "../types";

export function GatewayNode({ selected, data }: CustomNodeProps) {
  return (
    <>
      <div className={`gateway-node ${selected ? "active" : null}`}></div>
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="custom-handle handle-left"
        style={{ left: "-10px" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="custom-handle handle-right"
        style={{ right: "-10px" }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        className="custom-handle handle-top"
        style={{ top: "-10px" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="custom-handle handle-bottom"
        style={{ bottom: "-10px" }}
      />
      <div className="gateway-node__label">{data.label}</div>
    </>
  );
}
