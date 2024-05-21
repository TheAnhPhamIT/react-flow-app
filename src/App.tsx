// import {
//   Background,
//   Controls,
//   MiniMap,
//   Node,
//   OnConnect,
//   ReactFlow,
//   addEdge,
//   useEdgesState,
//   useNodesState,
// } from "reactflow";

// import "reactflow/dist/style.css";

// import { initialNodes, nodeTypes } from "./modules/workflow/nodes";
// import { edgeTypes, initialEdges } from "./modules/workflow/edges";
// import { useCallback } from "react";
// import { Toolbar } from "./modules/workflow/components/Toolbar/Toolbar";

// let currId = 4;
// export default function App() {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onCreateNode = useCallback(
//     (type: string) => {
//       const node: Node = {
//         id: `${++currId}`,
//         type,
//         position: { x: 200, y: 300 },
//         data: {},
//       };
//       setNodes((nodes) => [...nodes, node]);
//     },
//     [setNodes]
//   );

//   const onConnect: OnConnect = useCallback(
//     (connection) => {
//       const edge = { ...connection, type: "custom" };
//       setEdges((edges) => addEdge(edge, edges));
//     },
//     [setEdges]
//   );

//   return (
//     <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
//       <ReactFlow
//         nodes={nodes}
//         nodeTypes={nodeTypes}
//         onNodesChange={onNodesChange}
//         edges={edges}
//         edgeTypes={edgeTypes}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         fitView
//       >
//         <Background />
//         <MiniMap />
//         <Controls />
//       </ReactFlow>
//       <Toolbar onCreateNode={onCreateNode} />
//     </div>
//   );
// }

// import Workflow from "./modules/workflow/workflow";

// export default function App() {
//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <Workflow projectId="" />
//     </div>
//   );
// }

import Workflow from "./modules/workflow/workflow";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Workflow />
    </div>
  );
}
