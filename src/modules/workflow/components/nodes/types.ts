import { Node, NodeProps } from "reactflow";

export type CustomNodeType = "startEvent" | "endEvent" | "task" | "gateway" | "textNotation";

export type CustomNodeData = {
  label?: string;
  customFields?: {
    [prop: string]: string;
  };
};

export type CustomNodeProps = NodeProps<CustomNodeData>;

export type CustomNode = Node<CustomNodeData, CustomNodeType>;
