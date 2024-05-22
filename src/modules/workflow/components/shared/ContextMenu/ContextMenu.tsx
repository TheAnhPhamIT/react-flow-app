import { useCallback } from "react";
import { Edge, MarkerType, useReactFlow } from "reactflow";
import "./ContextMenu.css";
import { CustomNode, CustomNodeType } from "../../nodes/types";

type ContextMenuProps = {
  id: string;
  top: number;
  left: number;
  right: number;
  bottom: number;
  onClick?: () => void;
};

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: ContextMenuProps) {
  const { getNode, setNodes, addNodes, setEdges, addEdges } = useReactFlow();

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) =>
      edges.filter((edge) => edge.source !== id && edge.target !== id)
    );
  }, [id, setNodes, setEdges]);

  const createNode = useCallback(
    (nodeType: CustomNodeType) => {
      const node = getNode(id);
      if (!node) return;
      const newNode: CustomNode = {
        id: `node-${Date.now()}`,
        position: {
          x: node.position.x + 150,
          y: node.position.y,
        },
        type: nodeType,
        data: {
          label: "on the details panel you can edit the node's label",
        },
      };
      addNodes(newNode);
      const newEdge: Edge = {
        id: `edge-${Date.now()}`,
        type: nodeType == "textNotation" ? "dash" : "custom",
        source: node.id,
        target: newNode.id,
        markerEnd: { type: MarkerType.Arrow },
        data: {label: "I'm a edge"}
      };
      addEdges(newEdge);
    },
    [id, getNode, addNodes, addEdges]
  );

  return (
    <div
      style={{ top, left, right, bottom }}
      className="context-menu"
      {...props}
    >
      <p style={{ margin: "0.5em" }}>
        <small>node: {id}</small>
      </p>
      <button onClick={() => createNode("endEvent")}>create end event</button>
      <button onClick={() => createNode("gateway")}>create gateway</button>
      <button onClick={() => createNode("task")}>create task</button>
      <button onClick={() => createNode("textNotation")}>create text notation</button>
      <button onClick={deleteNode}>delete</button>
    </div>
  );
}
