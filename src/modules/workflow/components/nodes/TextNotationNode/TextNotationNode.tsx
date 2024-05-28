import { Handle, NodeResizer, Position } from 'reactflow';
import { CustomNodeProps } from '../types';
import './TextNotationNode.css';
import { useRef } from 'react';
import { useFocusContent } from '../../../hooks/useFocusContent';
import { useUpdateContent } from '../../../hooks/useUpdateContent';

export function TextNotationNode({ id, data, selected }: CustomNodeProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    useFocusContent(selected, contentRef.current);
    useUpdateContent(selected, id, data.label || '', contentRef.current);
    return (
        <>
            <NodeResizer minWidth={100} minHeight={30} isVisible={selected} />
            <div
                contentEditable={selected}
                ref={contentRef}
                suppressContentEditableWarning={true}
                className='text-notation-node'
            >
                {data.label}
            </div>

            <Handle
                type='target'
                position={Position.Left}
                id='left'
                className='custom-handle'
            />
            <Handle
                type='target'
                position={Position.Right}
                id='right'
                className='custom-handle'
            />
            <Handle
                type='target'
                position={Position.Top}
                id='top'
                className='custom-handle'
            />
            <Handle
                type='target'
                position={Position.Bottom}
                id='bottom'
                className='custom-handle'
            />
        </>
    );
}
