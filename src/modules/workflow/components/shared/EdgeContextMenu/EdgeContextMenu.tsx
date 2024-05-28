import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import './EdgeContextMenu.css';

type ContextMenuProps = {
    id: string;
    top: number;
    left: number;
    right: number;
    bottom: number;
    onClick?: () => void;
};

export default function EdgeContextMenu({
    id,
    top,
    left,
    right,
    bottom,
    ...props
}: ContextMenuProps) {
    const { setEdges } = useReactFlow();

    const deleteEdge = useCallback(() => {
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
    }, [id, setEdges]);

    return (
        <div
            style={{ top, left, right, bottom }}
            className='context-menu'
            {...props}
        >
            <p style={{ margin: '0.5em' }}>
                <small>edge: {id}</small>
            </p>
            <button onClick={deleteEdge}>delete</button>
        </div>
    );
}
