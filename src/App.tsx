import { ChangeEvent, useState, useEffect, useCallback } from "react";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { InputSearch } from "./components/InputSearch";
import { TableCharacters } from "./components/TableCharacters";
import { Spinner } from "./components/Spinner";
import { Pagination } from "./components/Pagination";

import { Characters } from "./types";
import { useDebounce } from "./hooks/useDebounce";
import { api } from "./services/api";

import styles from "./home.module.scss";

interface paramsProps {
  offset: number;
  limit: number;
  name?: string;
}

const LIMIT = 10;

export function App() {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce<string>(search, 500);
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = useCallback(async () => {
    setIsLoading(true);
    const offset = page * LIMIT - LIMIT; // Este cálculo é devido ao offset = 0 retornar a primeira página da api

    const params: paramsProps = {
      offset,
      limit: LIMIT,
    };

    if (debouncedValue.length > 0) {
      params.name = debouncedValue;
    }

    try {
      const response = await api.get("/characters", { params });
      const { data } = response.data;
      const { results } = data;
      setTotalPages(data.total);
      setCharacters(results);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }, [debouncedValue, page]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.content}>
        <section className={styles.headerContent}>
          <h1>Busca de personagens</h1>
          <h3>Nome do personagem</h3>

          <InputSearch
            value={search}
            onChange={handleChange}
            placeholder="Search"
          />
        </section>

        <section>
          {isLoading ? <Spinner /> : <TableCharacters items={characters} />}
        </section>
      </main>

      <Footer>
        <Pagination
          totalCountOfRegisters={totalPages || 10}
          currentPage={page}
          onPageChange={setPage}
          registersPerPage={LIMIT}
        />
      </Footer>
    </div>
  );
}
