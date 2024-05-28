import { useCallback, useEffect, useRef } from 'react';
import {
    useStore,
    getBezierPath,
    EdgeProps,
    EdgeLabelRenderer,
    useReactFlow,
    BaseEdge,
} from 'reactflow';
import { getDistanceBetweenTwoPoints, getEdgeParams } from '../../../utils';

import './FloatingEdge.css';
import { useFocusContent } from '../../../hooks/useFocusContent';

function FloatingEdge({
    id,
    source,
    target,
    markerEnd,
    selected = false,
    data,
}: EdgeProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const sourceNode = useStore(
        useCallback((store) => store.nodeInternals.get(source), [source])
    );
    const targetNode = useStore(
        useCallback((store) => store.nodeInternals.get(target), [target])
    );

    const { setEdges } = useReactFlow();

    useFocusContent(selected, contentRef.current);

    useEffect(() => {
        if (selected) return;
        if (
            contentRef.current &&
            data.label !== contentRef.current?.innerText
        ) {
            setEdges((edges) =>
                edges.map((edge) => {
                    if (edge.id !== id) return edge;
                    edge.data.label = contentRef.current?.innerText || '';
                    return edge;
                })
            );
        }
    }, [selected, data.label, id, setEdges]);

    if (!sourceNode || !targetNode) {
        return null;
    }

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
        sourceNode,
        targetNode
    );

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: sourcePos,
        targetPosition: targetPos,
        targetX: tx,
        targetY: ty,
    });

    const labelWidth = getDistanceBetweenTwoPoints(sx, sy, tx, ty);

    return (
        <>
            {/* <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
        onClick={() => console.log(`${id} is clicked`)}
      /> */}
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={markerEnd}
                style={{ zIndex: 1001 }}
            />
            <EdgeLabelRenderer>
                {/* <button
                    style={{
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    }}
                    className={`edge-btn nodrag nopan ${
                        selected ? 'active' : ''
                    }`}
                    onClick={() => {
                        setEdges((es) => es.filter((e) => e.id !== id));
                    }}
                >
                    x
                </button> */}
                <div
                    contentEditable={selected}
                    ref={contentRef}
                    suppressContentEditableWarning={true}
                    className='edge-label nodrag nopan'
                    style={{
                        margin: '10px 0px',
                        width: labelWidth - 20 + 'px',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    }}
                >
                    {data.label}
                </div>
            </EdgeLabelRenderer>
        </>
    );
}

export default FloatingEdge;
