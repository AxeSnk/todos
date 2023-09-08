import React, { memo } from 'react';

export type ITask = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskProps = {
  data: ITask;
  onChangeStatus: (id: number) => void;
  onDelete: (id: number) => void;
};

const Task: React.FC<TaskProps> = (props) => {
  const { data, onChangeStatus, onDelete } = props;
  const { title, completed, id } = data;
  
  return (
    <div className="d-flex gap-3 align-items-center border-bottom px-2 py-1 bg-body" data-testid="task">
      <input type="checkbox" checked={data.completed} onChange={() => onChangeStatus(id)} data-testid="checkbox" />
      <p
        className={`m-0 flex-fill fs-3 text-light-emphasis${completed ? ' text-decoration-line-through' : ''}`}
      >{title}</p>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => onDelete(id)}
        data-testid="button"
      />
    </div>
  );
};

export default memo(Task);
