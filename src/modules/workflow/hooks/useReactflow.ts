import { useCallback } from "react";
import {
  Edge,
  MarkerType,
  OnConnect,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { useUndoable } from "./useUndoable";
import { CustomNode } from "../components/nodes/types";

export function useReactflow() {
  const { currState, add, undo, redo } = useUndoable<{
    edges: Edge[];
    nodes: CustomNode[];
  }>({
    edges: [],
    nodes: [],
  });

  const [nodes, , onNodesChange] = useNodesState(currState.nodes);
  const [edges, , onEdgesChange] = useEdgesState(currState.edges);

  // const onConnect: OnConnect = useCallback(
  //   (connection) =>
  //     setEdges((edges) =>
  //       addEdge(
  //         {
  //           ...connection,
  //           id: `edge-${Date.now()}`,
  //           type: "custom",
  //           markerEnd: { type: MarkerType.Arrow },
  //         },
  //         edges
  //       )
  //     ),
  //   [setEdges]
  // );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      const newEdge = {
        ...connection,
        id: `edge-${Date.now()}`,
        type: "custom",
        markerEnd: { type: MarkerType.Arrow },
      };

      add({
        ...currState, edges: [...currState.edges, newEdge as Edge]
      })
    },
    [add, currState]
  );

  return {
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    undo,
    redo,
  };
}
