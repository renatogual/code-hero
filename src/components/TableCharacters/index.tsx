import { Characters } from "../../types";

import styles from "./styles.module.scss";

interface TableCharactersProps {
  items: Characters[];
}

export function TableCharacters({ items }: TableCharactersProps) {
  return (
    <table className={styles.tableContent}>
      <thead>
        <tr>
          <th colSpan={2}>Personagem</th>
          <th>Séries</th>
          <th>Eventos</th>
        </tr>
      </thead>
      <tbody>
        {items?.map(({ id, name, thumbnail, series, events }) => (
          <tr key={id}>
            <td width="10%">
              <img
                src={`${thumbnail.path}/standard_small.${thumbnail.extension}`}
                alt={name}
              />
            </td>
            <td className={styles.title}>{name}</td>
            <td className={styles.series}>
              {series?.items?.splice(0, 3).map(({ name }) => (
                <div key={name}>
                  <span>{name}</span>
                  <br />
                </div>
              ))}
            </td>
            <td className={styles.series}>
              {events?.items?.splice(0, 3).map(({ name }) => (
                <div key={name}>
                  <span>{name}</span>
                  <br />
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
