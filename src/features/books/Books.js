import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectData,
  selectDataLoading,
  selectAuthor,
  selectAuthorLoading,
  getBooksAsync,
  getAuthorAsync
} from './booksSlice';
import styles from './Books.module.css';
import debounce from 'lodash.debounce';

import Loading from '../loading/Loading';
import Drawer from '../drawer/Drawer';
import Pagination from '../pagination/Pagination';

let PageSize = 10;

export function Books() {
  const data = useSelector(selectData);
  const dataLoading = useSelector(selectDataLoading);
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const [searchText, setSearchText] = useState('');
  const author = useSelector(selectAuthor);
  const authorLoading = useSelector(selectAuthorLoading);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);
  
  useEffect(() => {
    dispatch(getBooksAsync(['', 1]));
  }, []);

  useEffect(() => {
    dispatch(getBooksAsync([searchText, 1]));
  }, [searchText]);

  const toggleDrawer = (open, key) => (event) => {
    if (open) {
      dispatch(getAuthorAsync(key));
    }
    setDrawer(open);
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const debouncedChangeHandler = useCallback(
    debounce(handleChange, 300)
  , []);

  return (
    <div>
      <header position="static">
        <h1>
          Books
        </h1>
      </header>
      <div className={styles.container}>
        <div sx={{textAlign: 'left', py: 3}}>
          <input
            id="standard-adornment-password"
            onChange={debouncedChangeHandler}
            placeholder="Search"
          />
        </div>
        <div sx={{ py: 4 }}>
          {dataLoading ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div>
              <table>
                <thead>
                  <th className={styles.type}>Title</th>
                  <th className={styles.type}>Author</th>
                  <th className={styles.type}>Type</th>
                  <th className={styles.type}>ISBN</th>
                </thead>
                <tbody>
                {
                  currentTableData.map(it => (
                    <tr item xs={3} key={it.key}>
                      <td className={styles.title}>
                        {it.title}
                      </td>
                      <td className={styles.author}>
                        <button onClick={toggleDrawer(true, it.author_key[0])} className={styles.authorBtn}>{it.author_name[0]}</button>
                      </td>
                      <td className={styles.type}>
                        {it.type}
                      </td>
                      <td className={styles.isbn}>
                        {it.isbn && it.isbn[0]}
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={data.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
      <Drawer
        isOpen={drawer}
        onClose={toggleDrawer(false)}
      >
        {(authorLoading || Object.keys(author).length == 0) ? (
          <div sx={{ width: 360, p: 3, display: 'flex' }}>
            <Loading />
          </div>
        ) : (
          <div sx={{width: 360, p: 3}}>
            <h1 sx={{pb: 2}} variant="h5">Name: {author.name}</h1>
            <p sx={{pb: 2}}>Key: {author.key}</p>
            <p sx={{pb: 2}}>Last Modified: {new Date(author.last_modified.value).toUTCString()}</p>
            <p>Revision: {author.revision}</p>
          </div>
        )}
      </Drawer>
    </div>
  );
}
