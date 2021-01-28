import React, { useState, useCallback, useEffect } from 'react';
import api from '../../config/api';

import SearchInput from '../../components/SearchInput';

import './styles.css';

const Results = ({ location }) => {
  const [searchTerms, setSearchTerms] = useState(location.state.searchTerms);
  const [isFts, setIsFts] = useState(location.state.isFts);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [queryExecutionTime, setQueryExecutionTime] = useState(0);

  const fetchSearchResults = useCallback(() => {
    const searchMethod = isFts ? 'fts' : 'nofts';

    api.get(
      `exemplaries/${searchMethod}?seachTerms=${searchTerms.trim()}&page=${currentPage}`
    ).then(searchResults => {
      const { totalPages, totalRecords, queryExecutionTime, data } = searchResults.data;

      setSearchResults(data);
      setTotalPages(totalPages);
      setTotalRecords(totalRecords);
      setQueryExecutionTime(queryExecutionTime);
    });
  }, [isFts, searchTerms, currentPage]);
  
  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const previousPage = () => {
    if (currentPage === 1) return;

    setCurrentPage(currentPage - 1);
  }

  const nextPage = () => {
    if (currentPage === totalPages) return;

    setCurrentPage(currentPage + 1);
  }

  const toPage = page => {
    if (currentPage === page) return;

    setCurrentPage(page);
  }

  const getPagesToShowInPagination = () => {
    const maxPagesToShow = 9;
    const halfPagesToShow = Math.ceil(maxPagesToShow / 2);
    const middlePage = currentPage < halfPagesToShow
      ? halfPagesToShow
      : currentPage;

    const aroundMiddlePage = maxPagesToShow - halfPagesToShow;

    const maxPage = middlePage + aroundMiddlePage < totalPages
      ? middlePage + aroundMiddlePage
      : totalPages;

    const minPage = maxPage - maxPagesToShow + 1 > 0
      ? maxPage - maxPagesToShow + 1
      : 1;

    const pagesToShow = [];

    for (let pageNumber = minPage; pageNumber <= maxPage; pageNumber++) {
      pagesToShow.push(pageNumber);
    }

    return pagesToShow;
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && searchTerms.trim()) {
      fetchSearchResults();
    }
  }
  
  return (
    <div className="results-container">
      <SearchInput
        isFts={isFts}
        searchTerms={searchTerms}
        handleKeyDown={handleKeyDown}
        onChangeSearch={e => setSearchTerms(e.target.value)}
        onChangeMethod={() => setIsFts(!isFts)}
      />
      <span className="result-metrics">
        Exibindo {searchResults.length} de {totalRecords} resultados. ({queryExecutionTime}ms)
      </span>
      {searchResults.length > 0 && searchResults.map((searchResult, index) => (
        <article className="content-card" key={index}>
          <div className="content-detail">
            <cite>{searchResult.author}</cite>
            <span>{searchResult.content_type}</span>
          </div>
          <strong>{searchResult.title}</strong>
          <p>{searchResult.subtitle}</p>
          <div className="publisher-details">
            <cite>{searchResult.publisher}</cite>
            <span>{searchResult.edition}</span>
          </div>
        </article>
      ))}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={previousPage}
          >
            Anterior
          </button>
          {getPagesToShowInPagination().map(page =>
            currentPage === page ?
              <button
                key={page}
                className="page-button selected"
                onClick={() => toPage(page)}
              >
                {page}
              </button>
            :
              <button
                key={page}
                className="page-button"
                onClick={() => toPage(page)}
              >
                {page}
              </button>
          )}
          <button
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default Results;
