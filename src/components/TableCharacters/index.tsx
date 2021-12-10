import { Characters } from "../../types";

import styles from "./styles.module.scss";

interface TableCharactersProps {
  items: Characters[];
  onSelected: (props: number) => void;
}

export function TableCharacters({ items, onSelected }: TableCharactersProps) {
  return (
    <table className={styles.tableContent}>
      <thead>
        <tr>
          <th colSpan={2}>Personagem</th>
          <th className={styles.infos}>Séries</th>
          <th className={styles.infos}>Eventos</th>
        </tr>
      </thead>
      <tbody>
        {!!items.length ? (
          items?.map(({ id, name, thumbnail, series, events }) => (
            <tr
              key={id}
              onClick={() => onSelected(id)}
              className={styles.rowSelected}
            >
              <td width="10%">
                <img
                  src={`${thumbnail.path}/standard_small.${thumbnail.extension}`}
                  alt={name}
                />
              </td>
              <td className={styles.title}>{name}</td>
              <td width="35%" className={styles.infos}>
                {series?.items?.splice(0, 3).map(({ name }) => (
                  <div key={name}>
                    <span>{name}</span>
                    <br />
                  </div>
                ))}
              </td>
              <td width="30%" className={styles.infos}>
                {events?.items?.splice(0, 3).map(({ name }) => (
                  <div key={name}>
                    <span>{name}</span>
                    <br />
                  </div>
                ))}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>Não foram encontrados dados deste personagem !</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
