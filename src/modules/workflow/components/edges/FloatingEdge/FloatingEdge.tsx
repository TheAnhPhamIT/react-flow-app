import { useEffect, useRef } from 'react';
import {
    EdgeProps,
    EdgeLabelRenderer,
    useReactFlow,
    BaseEdge,
    getSmoothStepPath,
} from 'reactflow';
import { getDistanceBetweenTwoPoints } from '../../../utils';

import './FloatingEdge.css';
import { useFocusContent } from '../../../hooks/useFocusContent';

export default function FloatingEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    selected = false,
    data,
}: EdgeProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    const { setEdges } = useReactFlow();

    // dynamic edge path, without stick to the node's handle point
    // const sourceNode = useStore(
    //     useCallback((store) => store.nodeInternals.get(source), [source])
    // );
    // const targetNode = useStore(
    //     useCallback((store) => store.nodeInternals.get(target), [target])
    // );

    // if (!sourceNode || !targetNode) {
    //     return null;
    // }

    // const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    //     sourceNode,
    //     targetNode
    // );

    // const [edgePath, labelX, labelY] = getSmoothStepPath({
    //     sourceX: sx,
    //     sourceY: sy,
    //     sourcePosition: sourcePos,
    //     targetPosition: targetPos,
    //     targetX: tx,
    //     targetY: ty,
    // });

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

    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetPosition,
        targetX,
        targetY,
    });

    const labelWidth = getDistanceBetweenTwoPoints(
        sourceX,
        sourceY,
        targetX,
        targetY
    );

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
