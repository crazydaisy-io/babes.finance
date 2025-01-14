import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: `btn-${'primary' | 'secondary' | 'outline' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'link' | 'ghost' | 'active' | 'disabled' | 'glass'}`;
    size?: `btn-${'lg' | 'md' | 'sm' | 'xs' | 'block' | 'wide'}`
}

export default function Button(props: IButton) {
    return (
        <button {...props} className={`uppercase btn ${props.variant || 'btn-primary bg-brand-blue hover:bg-brand-blue/70 border-0'} ${props.size || 'btn-md'} ${props.className || ""}`}>
            {props.children}
        </button>
    )
}