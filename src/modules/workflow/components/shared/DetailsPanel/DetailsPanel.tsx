import { useReactFlow } from "reactflow";
import "./DetailsPanel.css";
import { useState } from "react";
import { useNodeForm } from "../../../hooks/useNodeForm";
import { CollapsibleContent } from "../CollapsibleContent/CollapsibleContent";
type DetailsPanelProps = {
  nodeId: string | null;
};

export function DetailsPanel({ nodeId }: DetailsPanelProps) {
  const { getNode } = useReactFlow();
  const node = nodeId ? getNode(nodeId) : null;
  const [isCollapse, setIsCollapse] = useState(false);

  const { form, onSubmit } = useNodeForm(node);

  function collapsePanel() {
    setIsCollapse((prev) => !prev);
  }

  // function onFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const fr = new FileReader();
  //   fr.onload = function () {
  //     console.log(fr.result);
  //   };

  //   if (e.target.files?.[0]) {
  //     fr.readAsText(e.target.files[0]);
  //   }
  // }

  return (
    <div className={`details-panel ${isCollapse ? "collapse" : null}`}>
      {/* <NodeCard type={node?.type as CustomNodeType} label={node?.data.label} /> */}
      <div className="details-panel__content">
        {/* <input type="file" name="xml" id="xml" onChange={onFileInputChange} /> */}
        <CollapsibleContent name="General">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="input-group">
              <label htmlFor="id">ID</label>
              <input type="text" name="id" value={node?.id} disabled />
            </div>
            <div className="input-group">
              <label htmlFor="label">Label</label>
              <input type="text" {...form.register("label")} />
            </div>
            <button type="submit">Update</button>
          </form>
        </CollapsibleContent>
        {node && (
          <CollapsibleContent name="Properties">
            {node.data.customFields ? (
              Object.keys(node?.data.customFields).map((fieldName) => {
                return <p>{fieldName}</p>;
              })
            ) : (
              <p>Empty</p>
            )}
          </CollapsibleContent>
        )}
        <button className="details-panel__close-btn" onClick={collapsePanel}>
          Details pane
        </button>
      </div>
    </div>
  );
}
