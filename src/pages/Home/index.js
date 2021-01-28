import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import SearchInput from '../../components/SearchInput';

import './styles.css';

const Home = () => {
  const [searchTerms, setSearchTerms] = useState('');
  const [isFts, setIsFts] = useState(true);


  const history = useHistory();

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && searchTerms.trim()) {
      history.push('/results', { searchTerms, isFts });
    }
  }
  
  return (
    <div className="container">
      <header>
        <h1 className="logo">Sniffer</h1>
      </header>
      <SearchInput
        isFts={isFts}
        searchTerms={searchTerms}
        handleKeyDown={handleKeyDown}
        onChangeSearch={e => setSearchTerms(e.target.value)}
        onChangeMethod={() => setIsFts(!isFts)}
      />
    </div>
  );
};

export default Home;
