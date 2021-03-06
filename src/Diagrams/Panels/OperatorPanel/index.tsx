import React, { DragEventHandler } from 'react';
import { OperatorMap } from '../../Operators';
import css from './OperatorPanel.module.less';

export const MODEL_FORMAT = 'model';

type DragEventGenerator = (operatorName: string) => DragEventHandler;

export const OperatorPanel: React.FC = () => {
  const handleDragStart: DragEventGenerator = (operatorName) => (event) => {
    event.dataTransfer.setData(MODEL_FORMAT, operatorName);
    event.dataTransfer.dropEffect = 'copy';
    event.dataTransfer.effectAllowed = 'all';
  };

  return (
    <div className={css.container}>
      <div className={css.title}>Operator Panel</div>
      <div className={css.content}>
        {[...OperatorMap.entries()].map(([name, Operator]) => {
          return (
            <div
              key={name}
              style={{ cursor: 'pointer' }}
              draggable={true}
              onDragStart={handleDragStart(name)}
            >
              {Operator?.generateOperatorIcon() || name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
