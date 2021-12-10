import { Comics } from "../../types";

import styles from "./styles.module.scss";

interface ListComicsProps {
  list: Comics[];
}

export function ListComics({ list }: ListComicsProps) {
  return (
    <ul className={styles.container}>
      {list?.map(({ id, title, thumbnail }) => (
        <li key={id}>
          <div>
            <h3>{title}</h3>
            <img
              src={`${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`}
              alt={title}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
