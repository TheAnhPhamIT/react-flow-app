import type { Node, OnConnect } from "reactflow";

import { useCallback, useRef, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";

import { nodeTypes } from "./components/nodes";
import { edgeTypes } from "./components/edges";
import { Toolbar } from "./components/shared/Toolbar/Toolbar";
import ContextMenu from "./components/shared/ContextMenu/ContextMenu";
import { useContextMenu } from "./hooks/useContextMenu";
import FloatingConnectionLine from "./components/connection-line/FloatingConnectionLine";
import { DetailsPanel } from "./components/shared/DetailsPanel/DetailsPanel";
import { SearchBar } from "./components/shared/SearchBar/SearchBar";

export default function Workflow() {
  const [nodes, ,onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const ref = useRef<HTMLDivElement>(null);
  const { menu, setMenu, onNodeContextMenu } = useContextMenu(ref.current!);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // delete node and edges attach to the node when user clicked Backspace key
  // useKeyDown((e: KeyboardEvent) => {
  //   if (e.key === "Backspace" && selectedNodeId) {
  //     setNodes((nodes) => nodes.filter((node) => node.id !== selectedNodeId));
  //     setEdges((edges) =>
  //       edges.filter(
  //         (edge) =>
  //           edge.source !== selectedNodeId && edge.target !== selectedNodeId
  //       )
  //     );
  //     setSelectedNodeId(null);
  //     setMenu(null);
  //   }
  // });

  // create new edge between two nodes when user create new connection
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

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => {
    setMenu(null);
    setSelectedNodeId(null);
  }, [setMenu, setSelectedNodeId]);

  // set selected node id when a node is clicked, details panel use this state to show node's details
  const onNodeClick = useCallback(
    (e: React.MouseEvent, node: Node) => {
      console.log(e)
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  return (
    <ReactFlow
      ref={ref}
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeContextMenu={onNodeContextMenu}
      onPaneClick={onPaneClick}
      connectionLineComponent={FloatingConnectionLine}
      onNodeClick={onNodeClick}
      fitView
    >
      <Background />
      <Controls />
      <DetailsPanel nodeId={selectedNodeId} />
      {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      <Toolbar />
      <SearchBar />
    </ReactFlow>
  );
}
