import React from 'react';
import cn from 'classnames';
import { usePagination, DOTS } from './usePagination';
import styles from './Pagination.module.css';
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={cn(styles['pagination-container'], className)}
    >
      <li
        className={cn(styles['pagination-item'], currentPage === 1 && styles.disabled)}
        onClick={onPrevious}
      >
        <div className={cn(styles.arrow, styles.left)} />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className={cn(styles['pagination-item'], styles.dots)}>&#8230;</li>;
        }

        return (
          <li
            className={cn(styles['pagination-item'], pageNumber === currentPage && styles.selected)}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={cn(styles['pagination-item'], currentPage === lastPage && styles.disabled)}
        onClick={onNext}
      >
        <div className={cn(styles.arrow, styles.right)} />
      </li>
    </ul>
  );
};

export default Pagination;
