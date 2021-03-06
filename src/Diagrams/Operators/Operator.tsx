import React from 'react';
import { Node } from 'react-flow-renderer';
import { getRandomId } from '../utils';
import { GraphNode, LogicStateStore } from '../Compiler/flowGraph';

export type NodePort = {
  id: string;
  label: string;
  isConnectable?: boolean;
  children?: NodePort[];
};

export type OperatorNodeData = {
  label?: string;
  sourcePorts?: NodePort[];
  targetPorts?: NodePort[];
  operatorType: string;
  [key: string]: any;
};

export class Operator<T = OperatorNodeData> implements Node<T> {
  static generateOperatorIcon() {
    return <div>{this.name}</div>;
  }

  static generateAttributeControl(options: {
    value: Operator;
    actions: {
      updateElement: any;
    };
  }) {
    const { value, actions } = options;
    function handleChange(val: string) {
      value.data.label = val;
      actions.updateElement(value.id, value);
    }
    return (
      <>
        <input
          placeholder="input label"
          style={{ width: '100%', maxWidth: 'none' }}
          value={value.data.label}
          onChange={(e) => handleChange(e.target.value)}
        />
      </>
    );
  }

  static generateOperation(node: GraphNode): string {
    return '';
  }

  // 1. should generate the attributes that can modified by user
  // 2. should generate the nodes
  // 3. should generate the ports in graph
  // 4. should generate the funtion which will be used in later code piping
  id: Node['id'] = getRandomId();
  position: Node['position'] = {
    x: 0,
    y: 0,
  };

  type: string = 'OperatorNode';
  data: T = {} as any;
  style?: Node['style'];
  className?: Node['className'];
  targetPosition?: Node['targetPosition'];
  sourcePosition?: Node['sourcePosition'];
  isHidden?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;

  constructor(operatorType: string = 'Operator', data?: Partial<Operator>) {
    Object.assign(this, {
      ...data,
      data: {
        operatorType,
        ...this.data,
        ...data?.data,
      },
    });
  }
}
