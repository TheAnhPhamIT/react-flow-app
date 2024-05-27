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
  ConnectionMode,
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

  const { getIntersectingNodes, screenToFlowPosition } = useReactFlow();

  const onNodeDragStop = useCallback(
    (
      _: React.MouseEvent<Element, MouseEvent>,
      node: Node<string | undefined>
    ) => {
      if (node.parentId || node.type === "pool") return;
      const intersectionPoolNode = getIntersectingNodes(node).find(
        (node) => node.type === "pool"
      );
      if (intersectionPoolNode) {
        setNodes((ns) =>
          ns.map((n) => {
            if (n.id !== node.id) return n;
            n.parentId = intersectionPoolNode.id;
            n.position = {
              x: n.positionAbsolute!.x - intersectionPoolNode.position.x,
              y: n.positionAbsolute!.y - intersectionPoolNode.position.y,
            };
            n.extent = "parent";
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
            data: { label: "edge" },
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

  // create new node when drop
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `node-${Date.now()}`,
        type,
        position,
        data: { label: "I'm a node" },
      };

      setNodes((nds) => {
        // put pool node to the front of nodes array to ensure child node display above pool node
        if (newNode.type === "pool") {
          return [newNode, ...nds];
        }
        return nds.concat(newNode as Node);
      });
    },
    [setNodes, screenToFlowPosition]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

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
      onDrop={onDrop}
      onDragOver={onDragOver}
      connectionMode={ConnectionMode.Loose}
    >
      <Controls />
      <DetailsPanel />
      {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      <Toolbar />
      <SearchBar />
    </ReactFlow>
  );
}
