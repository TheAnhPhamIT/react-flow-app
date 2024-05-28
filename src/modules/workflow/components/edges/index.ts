import { Edge, MarkerType, type EdgeTypes } from 'reactflow';
import FloatingEdge from './FloatingEdge/FloatingEdge';
import DashEdge from './DashEdge/DashEdge';

export const initialEdges = [
    {
        id: 'edge-1716869202295',
        type: 'custom',
        source: 'node-1716869178889',
        target: 'node-1716869202295',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: '',
        },
        selected: false,
    },
    {
        id: 'edge-1716869265766',
        type: 'dash',
        source: 'node-1716869202295',
        target: 'node-1716869265766',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: 'edge',
        },
    },
    {
        source: 'node-1716869202295',
        sourceHandle: 'bottom',
        target: 'node-1716869419367',
        targetHandle: 'top',
        id: 'edge-1716869423077',
        type: 'custom',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: '',
        },
        selected: false,
    },
    {
        id: 'edge-1716869456014',
        type: 'custom',
        source: 'node-1716869419367',
        target: 'node-1716869456014',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: '',
        },
        selected: false,
    },
    {
        id: 'edge-1716869532373',
        type: 'custom',
        source: 'node-1716869456014',
        target: 'node-1716869532373',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: 'no',
        },
        selected: false,
    },
    {
        id: 'edge-1716869553093',
        type: 'custom',
        source: 'node-1716869456014',
        target: 'node-1716869553093',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: 'yes',
        },
        selected: false,
    },
    {
        source: 'node-1716869532373',
        sourceHandle: 'bottom',
        target: 'node-1716869553093',
        targetHandle: 'top',
        id: 'edge-1716869568669',
        type: 'custom',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: '',
        },
        selected: false,
    },
    {
        id: 'edge-1716869577709',
        type: 'custom',
        source: 'node-1716869553093',
        target: 'node-1716869577709',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: '',
        },
        selected: false,
    },
    {
        id: 'edge-1716869631670',
        type: 'custom',
        source: 'node-1716869577709',
        target: 'node-1716869631669',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: '',
        },
        selected: false,
    },
    {
        id: 'edge-1716869742878',
        type: 'custom',
        source: 'node-1716869631669',
        target: 'node-1716869742878',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: '',
        },
        selected: false,
    },
    {
        id: 'edge-1716869860284',
        type: 'custom',
        source: 'node-1716869202295',
        target: 'node-1716869860284',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: '',
        },
        selected: false,
    },
    {
        id: 'edge-1716870052717',
        type: 'custom',
        source: 'node-1716869860284',
        target: 'node-1716870052717',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: '',
        },
        selected: false,
    },
    {
        source: 'node-1716869742878',
        sourceHandle: 'top',
        target: 'node-1716870052717',
        targetHandle: 'bottom',
        id: 'edge-1716870077556',
        type: 'custom',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: '',
        },
        selected: false,
    },
    {
        id: 'edge-1716870094205',
        type: 'custom',
        source: 'node-1716870052717',
        target: 'node-1716870094205',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: '',
        },
        selected: false,
    },
    {
        id: 'edge-1716870110324',
        type: 'custom',
        source: 'node-1716869742878',
        target: 'node-1716870110324',
        markerEnd: {
            type: MarkerType.Arrow,
        },
        data: {
            label: '',
        },
        selected: false,
    },
] satisfies Edge[];

export const edgeTypes = {
    custom: FloatingEdge,
    floating: FloatingEdge,
    dash: DashEdge,
} satisfies EdgeTypes;
