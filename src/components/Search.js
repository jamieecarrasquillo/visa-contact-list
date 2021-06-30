import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setSearchInput } from './../store/filter';
import './styling/search.css';

const Search = ({ searchFilter, open }) => {
  const [searching, setSearching] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(searchFilter);
    dispatch(setSearchInput(searching));
  }, [searching]);

  return (
    <div>
      <input
        className='search-placeholder'
        placeholder='Search here...'
        type='text'
        disabled={!open}
        onChange={(e) => setSearching(e.target.value)}
        value={searching}
        style={{
          opacity: open ? 1 : 0
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchFilter: state.searchFilter
  };
};

export default connect(mapStateToProps, null)(Search);
