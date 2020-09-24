import React, { useMemo, ReactElement } from "react";

import styles from "./style.module.scss";

interface Props {
  currentPage: number;
  nbPage: number;
  setCurrentPage: (newPage: any) => void;
}

function Paging(props: Props) {
  const { currentPage, setCurrentPage, nbPage } = props;

  const pages = useMemo<ReactElement[]>(() => {
    let res: ReactElement[] = [];
    let dots = false;
    for (let i = 0; i < nbPage; i++) {
      if (i === 0 || i === nbPage - 1 || Math.abs(i - currentPage) <= 1) {
        res.push(
          <button
            className={`${styles.btn} ${i === currentPage ? styles.active : ""}`}
            key={i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        );
        dots = false;
      } else if (!dots) {
        res.push(<span>...</span>);
        dots = true;
      }
    }
    return res;
  }, [currentPage, nbPage, setCurrentPage]);
  return (
    <div className={styles.container}>
      {currentPage > 0 && (
        <button onClick={() => setCurrentPage((old: number) => old - 1)}>
          <i className="fas fa-angle-left" />
        </button>
      )}
      {pages}
      {currentPage < nbPage - 1 && (
        <button onClick={() => setCurrentPage((old: number) => old + 1)}>
          <i className="fas fa-angle-right" />
        </button>
      )}
    </div>
  );
}

export default Paging;
