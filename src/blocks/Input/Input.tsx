import React from "react";

const Input: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({value, onChange, onAdd}) => {
  return (
    <input
      type="text"
      value={value}
      placeholder="What need to be done?"
      onChange={onChange}
      onKeyUpCapture={onAdd}
      className="form-control mb-2"
      data-testid="input"
    />
  );
};

export default Input;
