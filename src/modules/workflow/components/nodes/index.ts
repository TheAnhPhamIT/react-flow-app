import { NodeTypes } from "reactflow";
import { StartNode } from "./StartNode/StartNode";
import { EndNode } from "./EndNode/EndNode";
import { GatewayNode } from "./GatewayNode/GatewayNode";
import { TaskNode } from "./TaskNode/TaskNode";
import { CustomNode } from "./types";

export const initialNodes = [
  {
    id: "1",
    type: "startEvent",
    position: { x: 100, y: 100 },
    data: { label: "Start" },
  },
  {
    id: "2",
    type: "task",
    position: { x: 250, y: 100 },
    data: { label: "drag me!" },
  },
  {
    id: "3",
    type: "endEvent",
    position: { x: 500, y: 100 },
    data: { label: "drag me!" },
  },
  {
    id: "4",
    type: "gateway",
    position: { x: 400, y: 100 },
    data: { label: "drag me!" },
  },
] satisfies CustomNode[];

export const nodeTypes = {
  startEvent: StartNode,
  endEvent: EndNode,
  gateway: GatewayNode,
  task: TaskNode,
} satisfies NodeTypes;
