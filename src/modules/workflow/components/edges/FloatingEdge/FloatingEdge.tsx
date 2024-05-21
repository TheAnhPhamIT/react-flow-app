import { useCallback } from "react";
import {
  useStore,
  getBezierPath,
  EdgeProps,
  EdgeLabelRenderer,
  useReactFlow,
} from "reactflow";
import { getEdgeParams } from "../../../utils";

import "./FloatingEdge.css";

function FloatingEdge({
  id,
  source,
  target,
  markerEnd,
  style,
  selected,
}: EdgeProps) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  const { setEdges } = useReactFlow();

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

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
      />
      <EdgeLabelRenderer>
        <button
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className={`edge-label nodrag nopan ${selected ? "active" : ""}`}
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          x
        </button>
      </EdgeLabelRenderer>
    </>
  );
}

export default FloatingEdge;
