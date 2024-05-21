import { CustomNodeType } from "../../nodes/types";
import "./NodeCard.css";

type NodeCardProps = {
  type: CustomNodeType;
  label: string;
};

type NodeTypeInfo = {
  name: string;
  icon: string;
};

const nodeType: Record<CustomNodeType, NodeTypeInfo> = {
  startEvent: {
    name: "Start Event",
    icon: "",
  },
  endEvent: {
    name: "End Event",
    icon: "",
  },
  task: {
    name: "Task",
    icon: "",
  },
  gateway: {
    name: "Gateway",
    icon: "",
  },
};

export function NodeCard({ type, label }: NodeCardProps) {
  const { name: typeName, icon } = nodeType[type];
  return (
    <div className="node-card">
      <div className="node-card__icon"></div>
      <div className="node-card__infos">
        <h3>{typeName}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}
