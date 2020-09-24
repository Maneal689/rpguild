import { useState, useMemo } from "react";

export default function (elmPerPage, nbElm, defaultPage = 0) {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const lastPageIndex = useMemo(() => Math.ceil(nbElm / elmPerPage), [
    elmPerPage,
    nbElm,
  ]);

  const startIndex = useMemo(() => currentPage * elmPerPage, [currentPage, elmPerPage]);
  const endIndex = useMemo(() => startIndex + elmPerPage, [elmPerPage, startIndex]); // Out of bound

  return { currentPage, setCurrentPage, lastPageIndex, startIndex, endIndex };
}
