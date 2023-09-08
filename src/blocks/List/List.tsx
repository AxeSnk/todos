import React, { useCallback, useState } from "react";

import Input from "../Input/Input";
import { ITask } from "../Task/Task";
import { ControlPanel, Task } from "../index";

export type IFilter = "all" | "active" | "completed";

const List: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<IFilter>("all");
  const filteredTasks: ITask[] = tasks.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return item;
  });

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const handleAdd = useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      const emptyInput = input.trim() === "";
      const keyEnter = ev.code === "Enter";

      if (keyEnter && !emptyInput) {
        const newTask: ITask = {
          id: Date.now(),
          title: input,
          completed: false,
        };

        setTasks((prev) => [...prev, newTask]);
        setInput("");
      }
    },
    [input]
  );

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

  const handleDelete = useCallback((id: number) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleClearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((item) => item.completed === false));
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="display-1 text-light-emphasis">todos</h1>
      <div className="shadow bg-body-tertiary p-2">
        <Input value={input} onChange={handleInput} onAdd={handleAdd} />
        {filteredTasks.map((item) => (
          <Task
            key={item.id}
            data={item}
            onChangeStatus={handleToggleComplete}
            onDelete={handleDelete}
          />
        ))}
        <ControlPanel
          data={tasks}
          filter={filter}
          onChangeFilter={setFilter}
          onClearCompleted={handleClearCompleted}
        />
      </div>
    </div>
  );
};

export default List;
