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

// const initialNodes = [
//   {
//     id: "1",
//     type: "input",
//     data: { label: "Node 0" },
//     position: { x: 250, y: 5 },
//     className: "light",
//   },
//   {
//     id: "2",
//     data: { label: "Group A" },
//     position: { x: 100, y: 100 },
//     className: "light",
//     style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 200, height: 200 },
//   },
//   {
//     id: "2a",
//     data: { label: "Node A.1" },
//     position: { x: 10, y: 50 },
//     parentId: "2",
//   },
//   {
//     id: "3",
//     data: { label: "Node 1" },
//     position: { x: 320, y: 100 },
//     className: "light",
//   },
//   {
//     id: "4",
//     data: { label: "Group B" },
//     position: { x: 320, y: 200 },
//     className: "light",
//     style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 300, height: 300 },
//     type: "group",
//   },
//   {
//     id: "4a",
//     data: { label: "Node B.1" },
//     position: { x: 15, y: 65 },
//     className: "light",
//     parentId: "4",
//     extent: "parent",
//   },
//   {
//     id: "4b",
//     data: { label: "Group B.A" },
//     position: { x: 15, y: 120 },
//     className: "light",
//     style: {
//       backgroundColor: "rgba(255, 0, 255, 0.2)",
//       height: 150,
//       width: 270,
//     },
//     parentId: "4",
//   },
//   {
//     id: "4b1",
//     data: { label: "Node B.A.1" },
//     position: { x: 20, y: 40 },
//     className: "light",
//     parentId: "4b",
//   },
//   {
//     id: "4b2",
//     data: { label: "Node B.A.2" },
//     position: { x: 100, y: 100 },
//     className: "light",
//     parentId: "4b",
//   },
// ];

// const initialEdges = [
//   { id: "e1-2", source: "1", target: "2", animated: true },
//   { id: "e1-3", source: "1", target: "3" },
//   { id: "e2a-4a", source: "2a", target: "4a" },
//   { id: "e3-4b", source: "3", target: "4b" },
//   { id: "e4a-4b1", source: "4a", target: "4b1" },
//   { id: "e4a-4b2", source: "4a", target: "4b2" },
//   { id: "e4b1-4b2", source: "4b1", target: "4b2" },
// ];

export default function Workflow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const ref = useRef<HTMLDivElement>(null);
  const { menu, setMenu, onNodeContextMenu } = useContextMenu(ref.current!);

  const {
    getIntersectingNodes,
    screenToFlowPosition,
    // isNodeIntersecting,
  } = useReactFlow();

  const onNodeDragStop = useCallback(
    (
      _: React.MouseEvent<Element, MouseEvent>,
      node: Node<string | undefined>
    ) => {
      if (node.parentId) return;
      if (node.type === "group") {
        // const intersections = getIntersectingNodes(node)
        //   .filter((n) => !n.parentId)
        //   .map((n) => n.id);
        // if (intersections.length <= 0) return;
        // setNodes((ns) =>
        //   ns.map((n) => {
        //     if (intersections.indexOf(n.id) === -1) return n;
        //     n.position = {
        //       x: n.positionAbsolute!.x - node.position.x,
        //       y: n.positionAbsolute!.y - node.position.y,
        //     };
        //     n.parentId = node.id;
        //     n.extent = "parent";
        //     return n;
        //   })
        // );
      } else {
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
              // n.extent = "parent";
              return n;
            })
          );
        } else if (node.parentId) {
          // const parentNode = nodes.find((n) => n.id === node.parentId);
          // setNodes((ns) =>
          //   ns.map((n) => {
          //     if (n.id !== node.id) return n;
          //     n.parentId = "";
          //     n.position = parentNode
          //       ? {
          //           x: n.positionAbsolute!.x - parentNode.position.x,
          //           y: n.positionAbsolute!.y - parentNode.position.y,
          //         }
          //       : n.position;
          //     return n;
          //   })
          // );
        }
      }
    },
    [getIntersectingNodes, setNodes]
  );

  // const onNodeDragStop = useCallback(
  //   (_: React.MouseEvent<Element, MouseEvent>, node: Node) => {
  //     if (node.type === "pool") {
  //       return;
  //     }
  //     nodes.forEach((nd) => {
  //       // Check if there's a group node in the array of nodes on the screen
  //       if (nd.type === "pool") {
  //         //safety check to make sure there's a height and width
  //         if (nd.height && nd.width) {
  //           const rec = { height: nd.height, width: nd.width, ...nd.position };

  //           // Check if the dragged node is inside the group
  //           if (isNodeIntersecting(node, rec, false)) {
  //             //Check if dragged node isn't already a child to the group
  //             if (!node.parentId) {
  //               node.parentId = nd.id;
  //               node.extent = "parent";
  //               node.position = {
  //                 x: node.positionAbsolute!.x - nd.position.x,
  //                 y: node.positionAbsolute!.y - nd.position.y,
  //               };
  //               setNodes((nodes) =>
  //                 nodes.map((n) => {
  //                   if (n.id === node.id) {
  //                     n = node;
  //                   }
  //                   return n;
  //                 })
  //               );
  //             }
  //           }
  //         }
  //       }
  //     });
  //   },
  //   [nodes, isNodeIntersecting, setNodes]
  // );

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

      // addNodes(newNode);

      setNodes((nds) => {
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

  const onNodeClick = (
    _: React.MouseEvent<Element, MouseEvent>,
    node: Node
  ) => {
    console.log(node);
  };

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
      onNodeClick={onNodeClick}
    >
      <Controls />
      <DetailsPanel />
      {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      <Toolbar />
      <SearchBar />
    </ReactFlow>
  );
}
