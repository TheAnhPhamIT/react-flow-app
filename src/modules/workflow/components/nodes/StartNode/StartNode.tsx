import { Handle, Position } from 'reactflow';
import './StartNode.css';
import { CustomNodeProps } from '../types';
import { useRef } from 'react';
import { useFocusContent } from '../../../hooks/useFocusContent';
import { useUpdateContent } from '../../../hooks/useUpdateContent';

export function StartNode({ id, selected, data }: CustomNodeProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    useFocusContent(selected, contentRef.current);
    useUpdateContent(selected, id, data.label || '', contentRef.current);
    return (
        <>
            <div className={`start-node ${selected ? 'active' : ''}`}></div>
            <Handle
                type='source'
                position={Position.Right}
                id='right'
                className='custom-handle'
            />
            <div
                contentEditable={selected}
                ref={contentRef}
                suppressContentEditableWarning={true}
                className='start-node__label'
            >
                {data.label}
            </div>
        </>
    );
}
