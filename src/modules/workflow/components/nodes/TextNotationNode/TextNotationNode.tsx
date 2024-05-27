import { Handle, NodeResizer, Position } from "reactflow";
import { CustomNodeProps } from "../types";
import './TextNotationNode.css'

export function TextNotationNode({ data, selected }: CustomNodeProps) {
  return (
    <>
      <NodeResizer minWidth={100} minHeight={30} isVisible={selected}/>
      {selected ? (<textarea defaultValue={data.label} className="text-notation-node active"></textarea>) : (<div className="text-notation-node">
        {data.label}
      </div>)}
      
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="custom-handle"
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        className="custom-handle"
      />
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
