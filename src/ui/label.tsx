import { LabelHTMLAttributes } from "react";

interface ILabel extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: "default";
}

export default function Label(props: ILabel) {
  return (
    <label {...props} className="text-sm">
      {props.children}
    </label>
  );
}
