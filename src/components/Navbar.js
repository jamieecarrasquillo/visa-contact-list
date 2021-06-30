import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from './icons/AddIcon';
import SearchIcon from './icons/SearchIcon';
import Search from './Search';
import { Tooltip } from '@material-ui/core';
import './styling/navbar.css';

const SCROLL_BREAKPOINT = 2;

const Navbar = (props) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      console.log(e);
      console.log(document.documentElement.scrollTop);
      if (
        document.body.scrollTop > SCROLL_BREAKPOINT ||
        document.documentElement.scrollTop > SCROLL_BREAKPOINT
      ) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });
  }, [setIsScrolling]);

  return (
    <>
      {isScrolling && <div className='dummy-contacts-navbar'></div>}
      <div
        className='contacts-navbar'
        style={{
          position: isScrolling ? 'fixed' : 'relative',
          backgroundColor: isScrolling ? '#fff' : 'inherit',
          boxShadow: isScrolling ? 'rgb(0 0 0 / 6%) 0px 0px 30px' : 'none'
        }}
      >
        <div className='left-nav'>
          <div
            style={{
              backgroundColor: open ? '#f6ebf0' : '#fff'
            }}
            className='nav-buttons'
            onClick={() => setOpen(!open)}
          >
            <SearchIcon />
          </div>
          <div>
            <Search open={open} />
          </div>
        </div>
        <div>
          <Link to='/'>
            <h1>Contact List</h1>
          </Link>
        </div>
        <div className='right-nav'>
          <Link to='/contacts/new'>
            <Tooltip title='Add New' arrow>
              <div className='nav-buttons'>
                <AddIcon />
              </div>
            </Tooltip>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
