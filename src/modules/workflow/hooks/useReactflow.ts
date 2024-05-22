import { useCallback } from "react";
import {
  Edge,
  MarkerType,
  OnConnect,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { useUndoable } from "./useUndoable";
import { CustomNode } from "../components/nodes/types";

export function useReactflow() {
  const { currState } = useUndoable<{
    edges: Edge[];
    nodes: CustomNode[];
  }>({
    edges: [],
    nodes: [],
  });

  const [nodes, , onNodesChange] = useNodesState(currState.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(currState.edges);

  const onConnect: OnConnect = useCallback(
    (connection) =>
      setEdges((edges) =>
        addEdge(
          {
            ...connection,
            type: "custom",
            markerEnd: { type: MarkerType.Arrow },
          },
          edges
        )
      ),
    [setEdges]
  );

  return {
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
  };
}
