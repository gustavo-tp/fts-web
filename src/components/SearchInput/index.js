import React from 'react';

import './styles.css';

const SearchInput = ({
    isFts,
    searchTerms,
    handleKeyDown,
    onChangeSearch,
    onChangeMethod
  }) => (
  <div className="searchContainer">
    <input
      type="search"
      value={searchTerms}
      placeholder="Pesquise por um exemplar"
      onChange={onChangeSearch}
      onKeyDown={handleKeyDown}
    />
    <div className="fts-input">
      <label htmlFor="isFts">FTS:</label>
      <input
        type="checkbox"
        id="isFts"
        checked={isFts}
        onChange={onChangeMethod}
      />
    </div>
  </div>
);

export default SearchInput;
