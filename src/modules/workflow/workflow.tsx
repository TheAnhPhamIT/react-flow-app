import React, { useCallback, useEffect, useRef } from 'react';
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
    Panel,
    Edge,
} from 'reactflow';

import 'reactflow/dist/style.css';

import { initialNodes, nodeTypes } from './components/nodes';
import { edgeTypes, initialEdges } from './components/edges';
import { Toolbar } from './components/shared/Toolbar/Toolbar';
import ContextMenu from './components/shared/ContextMenu/ContextMenu';
import { useContextMenu } from './hooks/useContextMenu';
import FloatingConnectionLine from './components/connection-line/FloatingConnectionLine';
import { SearchBar } from './components/shared/SearchBar/SearchBar';
import EdgeContextMenu from './components/shared/EdgeContextMenu/EdgeContextMenu';
import { useEdgeContextMenu } from './hooks/useEdgeContextMenu';

const REACTFLOW_DATA_LOCALSTORAGE_KEY = 'reactFlowData';

type ReactflowData = {
    nodes: Node[];
    edges: Edge[];
};

export default function Workflow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const ref = useRef<HTMLDivElement>(null);
    const { menu, setMenu, onNodeContextMenu } = useContextMenu(ref.current!);
    const {
        menu: edgeMenu,
        setMenu: setEdgeMenu,
        onEdgeContextMenu,
    } = useEdgeContextMenu(ref.current!);

    const { getIntersectingNodes, screenToFlowPosition } = useReactFlow();

    useEffect(() => {
        const onRestore = () => {
            const valStr = localStorage.getItem(
                REACTFLOW_DATA_LOCALSTORAGE_KEY
            );
            if (valStr === null) return;
            try {
                const flowData = JSON.parse(valStr) as ReactflowData;
                setNodes(flowData.nodes);
                setEdges(flowData.edges);
            } catch (error) {
                console.log(error);
            }
        };

        onRestore();
    }, [setEdges, setNodes]);

    const onSaveFlow = () => {
        try {
            const flowDataStr = JSON.stringify({ nodes, edges });
            localStorage.setItem(REACTFLOW_DATA_LOCALSTORAGE_KEY, flowDataStr);
        } catch (error) {
            console.log(error);
        }
    };

    const addNodeToPool = useCallback(
        (node: Node, pool: Node) => {
            setNodes((ns) =>
                ns.map((n) => {
                    if (n.id !== node.id) return n;
                    n.parentId = pool.id;
                    n.position = {
                        x: n.positionAbsolute!.x - pool.position.x,
                        y: n.positionAbsolute!.y - pool.position.y,
                    };
                    n.extent = 'parent';
                    return n;
                })
            );
        },
        [setNodes]
    );

    const removeNodeFromPool = useCallback(
        (node: Node) => {
            setNodes((ns) =>
                ns.map((n) => {
                    if (n.id !== node.id) return n;
                    delete n.parentId;
                    delete n.extent;
                    delete n.expandParent;
                    n.position = n.positionAbsolute
                        ? { ...n.positionAbsolute }
                        : n.position;
                    return n;
                })
            );
        },
        [setNodes]
    );

    const onNodeDragStop = useCallback(
        (
            _: React.MouseEvent<Element, MouseEvent>,
            node: Node<string | undefined>
        ) => {
            if (node.type === 'pool') return;
            const intersectionPoolNode = getIntersectingNodes(node).find(
                (node) => node.type === 'pool'
            );
            if (!node.parentId && intersectionPoolNode) {
                addNodeToPool(node, intersectionPoolNode);
            } else if (node.parentId && !intersectionPoolNode) {
                removeNodeFromPool(node);
            }
        },
        [getIntersectingNodes, addNodeToPool, removeNodeFromPool]
    );

    // create new edge between two nodes when user create new connection
    const onConnect: OnConnect = useCallback(
        (connection) =>
            setEdges((edges) =>
                addEdge(
                    {
                        ...connection,
                        id: `edge-${Date.now()}`,
                        type: 'custom',
                        markerEnd: { type: MarkerType.Arrow },
                        data: { label: 'edge' },
                    },
                    edges
                )
            ),
        [setEdges]
    );

    // Close the context menu if it's open whenever the window is clicked.
    const onPaneClick = useCallback(() => {
        setMenu(null);
        setEdgeMenu(null);
    }, [setMenu, setEdgeMenu]);

    // create new node when drop
    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type) {
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
                if (newNode.type === 'pool') {
                    return [newNode, ...nds];
                }
                return nds.concat(newNode as Node);
            });
        },
        [setNodes, screenToFlowPosition]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
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
            onEdgeContextMenu={onEdgeContextMenu}
            onPaneClick={onPaneClick}
            connectionLineComponent={FloatingConnectionLine}
            onNodeClick={onPaneClick}
            fitView
            onNodeDragStop={onNodeDragStop}
            onDrop={onDrop}
            onDragOver={onDragOver}
            connectionMode={ConnectionMode.Loose}
        >
            <Controls />
            {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
            {edgeMenu && (
                <EdgeContextMenu onClick={onPaneClick} {...edgeMenu} />
            )}
            <Toolbar />
            <SearchBar />
            <Panel position='top-right'>
                <button onClick={() => console.log(nodes, edges)}>
                    Log nodes and edges
                </button>
                <button onClick={onSaveFlow}>Save</button>
                <div
                    style={{
                        maxWidth: '250px',
                        wordBreak: 'break-word',
                        backgroundColor: '#fff',
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                        padding: '5px',
                        borderRadius: '5px',
                        marginTop: '10px',
                    }}
                >
                    <h3>How to use?</h3>
                    <ul>
                        <li>
                            Create new node by drop and drag from toolbar on the
                            top left corner
                        </li>
                        <li>
                            Right click on target node or edge to open context
                            menu
                        </li>
                        <li>Edit node's content or edge's content by click</li>
                        <li>
                            Search node with search bar on the top left corner
                            or by use hotkey "ctrl+f"
                        </li>
                    </ul>
                </div>
            </Panel>
        </ReactFlow>
    );
}
