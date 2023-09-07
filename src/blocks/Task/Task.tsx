import React, { memo } from 'react';

export type ITask = {
  id: number;
  title: string;
  completed: boolean;
};

const Task: React.FC<{
  data: ITask;
  onChangeStatus: () => void;
  onDelete: () => void;
}> = ({ data, onChangeStatus, onDelete }) => {
  const { title, completed } = data;

  return (
    <div className="d-flex gap-3 align-items-center border-bottom px-2 py-1 bg-body">
      <input type="checkbox" checked={completed} onClick={onChangeStatus} />
      <p
        className={`m-0 flex-fill fs-3 text-light-emphasis ${
          completed && 'text-decoration-line-through'
        }`}
      >
        {title}
      </p>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onDelete}
      />
    </div>
  );
};

export default memo(Task);