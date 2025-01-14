import { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  type?: "default";
}

export default function Input(props: IInput) {
  return (
    <input
      {...props}
      type="text"
      placeholder={props.placeholder || "Input the amount here"}
      className="input input-bordered w-full max-w-xs"
    />
  );
}
