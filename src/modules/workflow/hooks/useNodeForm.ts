import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Node, useReactFlow } from "reactflow";
import { useEffect } from "react";

const formSchema = z.object({
  label: z.string(),
  customFields: z.object({}).optional(),
});

export function useNodeForm(node?: Node | null) {
  const { setNodes } = useReactFlow();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: node?.data.label,
      customFields: node?.data.customFields,
    },
  });

  useEffect(() => {
    form.resetField("label", { defaultValue: node?.data.label });
    form.resetField("customFields", { defaultValue: node?.data.customFields });
  }, [form, node]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updateNodeId = node?.id;
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id !== updateNodeId) return node;
        return { ...node, data: { ...node.data, ...values } };
      })
    );
  }

  return { form, onSubmit };
}
