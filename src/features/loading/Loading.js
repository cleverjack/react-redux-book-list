import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loading}></div>
  );
}
