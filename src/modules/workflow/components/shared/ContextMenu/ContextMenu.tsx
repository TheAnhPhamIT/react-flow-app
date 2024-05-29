import { useCallback } from 'react';
import { Edge, MarkerType, useReactFlow } from 'reactflow';
import './ContextMenu.css';
import { CustomNode, CustomNodeType } from '../../nodes/types';

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
    const { getNode, setNodes, setEdges } = useReactFlow();

    const node = getNode(id);

    const deleteNode = useCallback(() => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) =>
            edges.filter((edge) => edge.source !== id && edge.target !== id)
        );
    }, [id, setNodes, setEdges]);

    const createNode = useCallback(
        (nodeType: CustomNodeType) => {
            if (!node) return;
            const newNode: CustomNode = {
                id: `node-${Date.now()}`,
                position: {
                    x: node.position.x + 150,
                    y: node.position.y,
                },
                type: nodeType,
                data: {
                    label: nodeType,
                },
                parentId: node.parentId || '',
                extent: node.parentId ? 'parent' : undefined,
            };
            setNodes((nodes) => nodes.concat(newNode));
            const newEdge: Edge = {
                id: `edge-${Date.now()}`,
                type: nodeType == 'textNotation' ? 'dash' : 'custom',
                source: node.id,
                target: newNode.id,
                markerEnd: { type: MarkerType.Arrow },
                data: { label: 'edge' },
            };
            setEdges((edges) => edges.concat(newEdge));
        },
        [node, setNodes, setEdges]
    );

    const toggleLockNodes = useCallback(() => {
        if (node?.type !== 'pool') return;
        setNodes((nodes) =>
            nodes.map((n) => {
                if (n.parentId !== node.id) return n;
                if (n.extent === 'parent') {
                    delete n.extent;
                } else {
                    n.extent = 'parent';
                }
                return n;
            })
        );
    }, [node, setNodes]);

    const toggleExpand = useCallback(() => {
        if (node?.type !== 'pool') return;
        setNodes((nodes) =>
            nodes.map((n) => {
                if (n.parentId !== node.id) return n;
                n.expandParent = !n.expandParent;
                return n;
            })
        );
    }, [node, setNodes]);

    return (
        <div
            style={{ top, left, right, bottom }}
            className='context-menu'
            {...props}
        >
            <p style={{ margin: '0.5em' }}>
                <small>node: {id}</small>
            </p>
            {node?.type !== 'pool' && (
                <>
                    <button onClick={() => createNode('endEvent')}>
                        create end event
                    </button>
                    <button onClick={() => createNode('gateway')}>
                        create gateway
                    </button>
                    <button onClick={() => createNode('task')}>
                        create task
                    </button>
                    <button onClick={() => createNode('textNotation')}>
                        create text notation
                    </button>
                </>
            )}
            {node?.type === 'pool' && (
                <>
                    <button onClick={toggleLockNodes}>
                        toggle lock children
                    </button>
                    <button onClick={toggleExpand}>
                        toggle expand when move children
                    </button>
                </>
            )}
            <button onClick={deleteNode}>delete</button>
        </div>
    );
}
