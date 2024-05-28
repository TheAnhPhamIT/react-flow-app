import { NodeTypes } from 'reactflow';
import { StartNode } from './StartNode/StartNode';
import { EndNode } from './EndNode/EndNode';
import { GatewayNode } from './GatewayNode/GatewayNode';
import { TaskNode } from './TaskNode/TaskNode';
import { CustomNode } from './types';
import { TextNotationNode } from './TextNotationNode/TextNotationNode';
import { PoolNode } from './PoolNode/PoolNode';

export const initialNodes = [
    {
        id: 'node-1716869387264',
        type: 'pool',
        position: {
            x: -336.6236145147326,
            y: 321.8425805210315,
        },
        data: {
            label: 'Restaurant',
        },
        width: 1002,
        height: 257,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: -336.6236145147326,
            y: 321.8425805210315,
        },
        style: {
            width: 1002,
            height: 257,
        },
        resizing: false,
    },
    {
        id: 'node-1716869183568',
        type: 'pool',
        position: {
            x: -204.5029301283328,
            y: 113.09776248981852,
        },
        data: {
            label: 'Customer',
        },
        width: 718,
        height: 134,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: -204.5029301283328,
            y: 113.09776248981852,
        },
        style: {
            width: 718,
            height: 134,
        },
        resizing: false,
    },
    {
        id: 'node-1716869178889',
        type: 'startEvent',
        position: {
            x: 44.06579639437432,
            y: 39.509323347421514,
        },
        data: {
            label: 'start',
        },
        width: 30,
        height: 30,
        selected: false,
        positionAbsolute: {
            x: -113.43713373395845,
            y: 159.60708583724005,
        },
        dragging: false,
        parentId: 'node-1716869183568',
        extent: 'parent',
    },
    {
        id: 'node-1716869202295',
        position: {
            x: 134.19499201721365,
            y: 21.320724549296727,
        },
        type: 'task',
        data: {
            label: 'Place order',
        },
        parentId: 'node-1716869183568',
        width: 120,
        height: 70,
        selected: false,
        positionAbsolute: {
            x: -23.307938111119114,
            y: 141.41848703911526,
        },
        dragging: false,
    },
    {
        id: 'node-1716869265766',
        position: {
            x: 245.54421957119843,
            y: -116.7887584538527,
        },
        type: 'textNotation',
        data: {
            label: 'Over 70% of request are made by phone call, about 30% by app',
        },
        parentId: 'node-1716869183568',
        width: 211,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 88.04128944286566,
            y: 3.3090040359658417,
        },
        dragging: false,
        style: {
            width: 211,
            height: 43,
        },
        resizing: false,
    },
    {
        id: 'node-1716869419367',
        type: 'task',
        position: {
            x: 42.00000000000003,
            y: 58,
        },
        data: {
            label: 'Verify customer identity',
        },
        width: 120,
        height: 70,
        selected: false,
        positionAbsolute: {
            x: -377.6236145147326,
            y: 365.8425805210315,
        },
        dragging: false,
        parentId: 'node-1716869387264',
        extent: 'parent',
    },
    {
        id: 'node-1716869456014',
        position: {
            x: 215.0000000000001,
            y: 82,
        },
        type: 'gateway',
        data: {
            label: 'Customer exist?',
        },
        parentId: 'node-1716869387264',
        width: 25,
        height: 25,
        selected: false,
        positionAbsolute: {
            x: -204.62361451473248,
            y: 389.8425805210315,
        },
        dragging: false,
    },
    {
        id: 'node-1716869532373',
        position: {
            x: 344.0000000000001,
            y: 5,
        },
        type: 'task',
        data: {
            label: 'Create customer account',
        },
        parentId: 'node-1716869387264',
        width: 120,
        height: 70,
        selected: false,
        positionAbsolute: {
            x: -75.62361451473248,
            y: 312.8425805210315,
        },
        dragging: false,
    },
    {
        id: 'node-1716869553093',
        position: {
            x: 392.0000000000001,
            y: 127,
        },
        type: 'gateway',
        data: {
            label: '',
        },
        parentId: 'node-1716869387264',
        width: 25,
        height: 25,
        selected: false,
        positionAbsolute: {
            x: -27.62361451473248,
            y: 434.8425805210315,
        },
        dragging: false,
    },
    {
        id: 'node-1716869577709',
        position: {
            x: 457.0000000000001,
            y: 104,
        },
        type: 'task',
        data: {
            label: 'Forward order to the kitchen',
        },
        parentId: 'node-1716869387264',
        width: 120,
        height: 70,
        selected: false,
        positionAbsolute: {
            x: 37.37638548526752,
            y: 411.8425805210315,
        },
        dragging: false,
    },
    {
        id: 'node-1716869631669',
        position: {
            x: 642.0000000000001,
            y: 106,
        },
        type: 'task',
        data: {
            label: 'The chef will prepare the meal by customer order',
        },
        parentId: 'node-1716869387264',
        width: 120,
        height: 70,
        selected: false,
        positionAbsolute: {
            x: 222.37638548526752,
            y: 413.8425805210315,
        },
        dragging: false,
    },
    {
        id: 'node-1716869742878',
        position: {
            x: 800.0000000000001,
            y: 108,
        },
        type: 'task',
        data: {
            label: 'Delivering the order to customer',
        },
        parentId: 'node-1716869387264',
        width: 120,
        height: 70,
        selected: false,
        positionAbsolute: {
            x: 380.3763854852675,
            y: 415.8425805210315,
        },
        dragging: false,
    },
    {
        id: 'node-1716869860284',
        position: {
            x: 325.1949920172136,
            y: 21.320724549296727,
        },
        type: 'task',
        data: {
            label: 'Waiting for the meal',
        },
        parentId: 'node-1716869183568',
        width: 120,
        height: 70,
        selected: false,
        positionAbsolute: {
            x: 167.69206188888086,
            y: 141.41848703911526,
        },
        dragging: false,
    },
    {
        id: 'node-1716870052717',
        position: {
            x: 490.1949920172136,
            y: 23.320724549296727,
        },
        type: 'task',
        data: {
            label: 'Received the order from deliver',
        },
        parentId: 'node-1716869183568',
        width: 120,
        height: 70,
        selected: false,
        positionAbsolute: {
            x: 332.69206188888086,
            y: 143.41848703911526,
        },
        dragging: false,
    },
    {
        id: 'node-1716870094205',
        position: {
            x: 670.1949920172137,
            y: 44.32072454929673,
        },
        type: 'endEvent',
        data: {
            label: 'Enjoy the meal',
        },
        parentId: 'node-1716869183568',
        width: 30,
        height: 30,
        selected: false,
        positionAbsolute: {
            x: 512.692061888881,
            y: 164.41848703911526,
        },
        dragging: false,
    },
    {
        id: 'node-1716870110324',
        position: {
            x: 960.0000000000001,
            y: 129,
        },
        type: 'endEvent',
        data: {
            label: 'end',
        },
        parentId: 'node-1716869387264',
        width: 30,
        height: 30,
        selected: false,
        positionAbsolute: {
            x: 540.3763854852675,
            y: 436.8425805210315,
        },
        dragging: false,
    },
] satisfies CustomNode[];

export const nodeTypes = {
    startEvent: StartNode,
    endEvent: EndNode,
    gateway: GatewayNode,
    task: TaskNode,
    textNotation: TextNotationNode,
    pool: PoolNode,
} satisfies NodeTypes;
