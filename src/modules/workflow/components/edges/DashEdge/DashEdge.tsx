import { useCallback } from "react";
import {
  useStore,
  getBezierPath,
  EdgeProps,
  BaseEdge,
} from "reactflow";
import { getEdgeParams } from "../../../utils";

export default function DashEdge({
  id,
  source,
  target,
}: EdgeProps) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );


  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath ] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });
  return (
    <BaseEdge style={{
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeDasharray: "0, 5",
        strokeWidth: 3
      }} id={id} path={edgePath} />
  );
}
