import { ChangeEvent, useState, useEffect } from "react";

import { Header } from "./components/Header";
import { InputSearch } from "./components/InputSearch";
import { TableCharacters } from "./components/TableCharacters";

import { Characters } from "./types";
import { api } from "./services/api";

import styles from "./home.module.scss";

export function App() {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState<Characters[]>([]);

  console.log(characters);

  const getData = async () => {
    try {
      const {
        data: { data },
      } = await api.get("/characters");
      const { results } = data;
      setCharacters(results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1>Busca de personagens</h1>
        <h3>Nome do personagem</h3>

        <InputSearch
          value={search}
          onChange={handleChange}
          placeholder="Search"
        />

        <section>
          <TableCharacters items={characters} />
        </section>
      </main>
    </>
  );
}
