import { ChangeEvent, useState, useEffect, useCallback } from "react";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { InputSearch } from "./components/InputSearch";
import { TableCharacters } from "./components/TableCharacters";
import { Spinner } from "./components/Spinner";
import { Pagination } from "./components/Pagination";
import { Modal } from "./components/Modal";
import { ListComics } from "./components/ListComics";

import { Characters, Comics } from "./types";
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
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [comics, setComics] = useState<Comics[]>([]);

  const debouncedValue = useDebounce<string>(search, 500);

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

  const handleSelectedCharacter = async (id: number) => {
    setShowModal(true);
    setIsLoadingDetail(true);

    try {
      const response = await api.get(`/characters/${id}/comics`);
      const { results } = response.data.data;
      setComics(results);
      setIsLoadingDetail(false);
    } catch (err) {
      console.error(err);
      setIsLoadingDetail(false);
    }
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
          {isLoading ? (
            <Modal showModal={isLoading} onCloseModal={setIsLoading} loading>
              <Spinner />
            </Modal>
          ) : (
            <TableCharacters
              items={characters}
              onSelected={handleSelectedCharacter}
            />
          )}
        </section>
      </main>

      <Footer>
        {!!characters.length && (
          <Pagination
            totalCountOfRegisters={totalPages || 10}
            currentPage={page}
            onPageChange={setPage}
            registersPerPage={LIMIT}
          />
        )}
      </Footer>

      {isLoadingDetail ? (
        <Modal
          showModal={isLoadingDetail}
          onCloseModal={setIsLoadingDetail}
          loading
        >
          <Spinner />
        </Modal>
      ) : (
        <Modal showModal={showModal} onCloseModal={setShowModal}>
          <div className={styles.modalContent}>
            <h1>Lista de Quadrinhos do Personagem</h1>
            <ListComics list={comics} />
          </div>
        </Modal>
      )}
    </div>
  );
}
