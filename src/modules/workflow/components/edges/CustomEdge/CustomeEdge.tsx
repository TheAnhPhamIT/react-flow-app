import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "reactflow";
import "./CustomEdge.css";

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  selected,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const { setEdges } = useReactFlow();

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
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
