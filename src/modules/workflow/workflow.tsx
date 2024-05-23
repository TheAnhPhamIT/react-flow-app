import { useCallback, useRef } from "react";
import {
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  OnConnect,
  useReactFlow,
  Node,
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
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const ref = useRef<HTMLDivElement>(null);
  const { menu, setMenu, onNodeContextMenu } = useContextMenu(ref.current!);

  const { getIntersectingNodes } = useReactFlow();

  const onNodeDragStop = useCallback(
    (
      _: React.MouseEvent<Element, MouseEvent>,
      node: Node<string | undefined>
    ) => {
      if (node.type === "pool") {
        const intersections = getIntersectingNodes(node)
          .filter((n) => !n.parentId)
          .map((n) => n.id);
        if (intersections.length <= 0) return;
        setNodes((ns) =>
          ns.map((n) => {
            if (intersections.indexOf(n.id) === -1) return n;
            n.position = {
              x: n.positionAbsolute!.x - node.position.x,
              y: n.positionAbsolute!.y - node.position.y,
            };
            n.parentId = node.id;
            return n;
          })
        );
      } else {
        const intersectionPoolNode = getIntersectingNodes(node).find(
          (node) => node.type === "pool"
        );
        setNodes((ns) =>
          ns.map((n) => {
            if (n.id !== node.id) return n;
            n.parentId = intersectionPoolNode ? intersectionPoolNode.id : "";
            return n;
          })
        );
      }
    },
    [getIntersectingNodes, setNodes]
  );

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
            id: `edge-${Date.now()}`,
            type: "custom",
            markerEnd: { type: MarkerType.Arrow },
            data: { label: "I'm a edge" },
          },
          edges
        )
      ),
    [setEdges]
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => {
    setMenu(null);
  }, [setMenu]);

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
      fitView
      onNodeDragStop={onNodeDragStop}
      className="intersection-flow"
    >
      <Controls />
      <DetailsPanel />
      {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      <Toolbar />
      <SearchBar />
    </ReactFlow>
  );
}
