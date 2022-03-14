import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Drawer.module.css';
import Loading from '../loading/Loading';
import {
  selectAuthor,
  selectAuthorLoading,
  getAuthorAsync
} from '../books/booksSlice';

export default function Drawer({isOpen, onClose, children}) {
  const [drawer, setDrawer] = useState(false);
  const author = useSelector(selectAuthor);
  const authorLoading = useSelector(selectAuthorLoading);

  useEffect(() => {
    setDrawer(isOpen)
  }, [isOpen]);

  return (
    <React.Fragment>
      {
        drawer ? (
          <React.Fragment>
            <div className={styles.backdrop} onClick={onClose}></div>
            <div
              className={styles.drawer}
              open={drawer}
            >
              {children}
            </div>
          </React.Fragment>
        ) : null
      }
    </React.Fragment>
  );
}
