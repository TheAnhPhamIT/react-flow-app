import { MarkerType, type Edge, type EdgeTypes } from "reactflow";
// import { CustomEdge } from "./CustomEdge/CustomeEdge";
import FloatingEdge from "./FloatingEdge/FloatingEdge";

export const initialEdges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    type: "custom",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "2-4",
    source: "2",
    target: "4",
    type: "custom",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "4-3",
    source: "4",
    target: "3",
    type: "custom",
    markerEnd: { type: MarkerType.Arrow },
  },
] satisfies Edge[];

export const edgeTypes = {
  custom: FloatingEdge,
  floating: FloatingEdge,
} satisfies EdgeTypes;
