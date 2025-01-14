import { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {

}

export default function Input(props: IInput) {
    return (
        <input {...props}  type="text" placeholder="Input the amount here" className="input input-bordered w-full max-w-xs" />
    )
}