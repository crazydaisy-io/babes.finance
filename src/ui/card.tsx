import { HTMLAttributes, ReactNode } from 'react';

interface ICard extends HTMLAttributes<HTMLDivElement> {
  actions?: ReactNode;
  title?: string;
  description?: string;
  img?: {
    src: string;
    alt: string;
  };
}

export default function Card(props: ICard) {
  return (
    <div
      className={`card min-w-80 border border-neutral-300 bg-brand-white shadow-xl ${props.className}`}
    >
      {props.img ? (
        <figure>
          <img {...props.img} />
        </figure>
      ) : null}
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <div>{props.children}</div>
        <div className="card-actions justify-end">{props.actions}</div>
      </div>
    </div>
  );
}
