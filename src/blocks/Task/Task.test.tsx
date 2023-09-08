import { render, screen } from "@testing-library/react";
import Task from "./Task";

const data = {
  id: 1,
  title: "тест",
  completed: true,
};

describe("test Task", () => {
  test("checkbox checked если data.completed = true", () => {
    render(<Task data={data} onChangeStatus={() => {}} onDelete={() => {}} />);
    const checkboxElement = screen.getByTestId('checkbox');
    expect(checkboxElement).toHaveAttribute('checked');
  });

  test("к title добавляется класс 'text-decoration-line-through' если data.completed = true", () => {
    render(<Task data={data} onChangeStatus={() => {}} onDelete={() => {}} />);
    const titleElement = screen.getByText(data.title);
    expect(titleElement).toHaveClass('text-decoration-line-through');
  });
});
