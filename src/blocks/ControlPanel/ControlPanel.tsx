import React, { memo } from 'react';

import { IFilter } from '../List/List';
import { ITask } from '../Task/Task';

const ControlPanel: React.FC<{
  data: ITask[];
  filter: IFilter;
  onChangeFilter: (val: IFilter) => void;
  onClearCompleted: () => void;
}> = ({ data, filter, onChangeFilter, onClearCompleted }) => {
  const activeItems = data.filter((item) => !item.completed);
  const title = activeItems.length
    ? `${activeItems.length} items left`
    : 'no items';

  return (
    <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center border-bottom px-2 py-1 bg-body">
      <p className="mb-0 text-body-tertiary">{title}</p>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          className="btn-check"
          name="all"
          id="btnradio1"
          autoComplete="off"
          checked={filter === 'all'}
          onChange={() => {
            onChangeFilter('all');
          }}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio1">
          All
        </label>

        <input
          type="radio"
          className="btn-check"
          name="active"
          id="btnradio2"
          autoComplete="off"
          checked={filter === 'active'}
          onChange={() => {
            onChangeFilter('active');
          }}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio2">
          Active
        </label>

        <input
          type="radio"
          className="btn-check"
          name="completed"
          id="btnradio3"
          autoComplete="off"
          checked={filter === 'completed'}
          onChange={() => {
            onChangeFilter('completed');
          }}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio3">
          Completed
        </label>
      </div>
      <button
        type="button"
        className="btn text-body-tertiary"
        aria-label="Clear"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </div>
  );
};

export default memo(ControlPanel);
