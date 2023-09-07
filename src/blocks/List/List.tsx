import React, { useCallback, useState } from 'react';

import { ControlPanel, Task } from '../index';
import { ITask } from '../Task/Task';

export type IFilter = 'all' | 'active' | 'completed';

const List: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<IFilter>('all');
  const filteredTasks: ITask[] = tasks.filter((item) => {
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return item;
  });

  const handleAdd = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const emptyInput = input.trim() === '';
    const keyEnter = ev.code === 'Enter';

    if (keyEnter && !emptyInput) {
      const newTask: ITask = {
        id: Date.now(),
        title: input,
        completed: false,
      };

      setTasks((prev) => [...prev, newTask]);
      setInput('');
    }
  };

  const handleToggleComplete = useCallback(
    (id: number) => {
      const newTasks = tasks.filter((item) => {
        if (item.id === id) item.completed = !item.completed;
        return item;
      });

      setTasks(newTasks);
    },
    [tasks],
  );

  const handleDelete = useCallback(
    (id: number) => {
      const newTasks = tasks.filter((item) => item.id !== id);

      setTasks(newTasks);
    },
    [tasks],
  );

  const handleClearCompleted = useCallback(() => {
    const newTasks = tasks.filter((item) => item.completed === false);

    setTasks(newTasks);
  }, [tasks]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="display-1 text-light-emphasis">todos</h1>
      <div className="shadow bg-body-tertiary p-2">
        <input
          type="text"
          value={input}
          placeholder="What need to be done?"
          onChange={(e) => setInput(e.target.value)}
          onKeyUpCapture={handleAdd}
          className="form-control mb-2"
        />
        {tasks.length ? (
          <>
            <div className="d-flex flex-column">
              {filteredTasks.map((item) => (
                <Task
                  key={item.id}
                  data={item}
                  onChangeStatus={() => handleToggleComplete(item.id)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
            <ControlPanel
              data={tasks}
              filter={filter}
              onChangeFilter={setFilter}
              onClearCompleted={handleClearCompleted}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default List;