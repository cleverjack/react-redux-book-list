// A mock function to mimic making an async request for data
import axios from 'axios';

export function getBooks(q, page = 1) {
  return axios.get(`http://openlibrary.org/search.json?q=${q}&page=${page}`);
}

export function getAuthor(key) {
  return axios.get(`https://openlibrary.org/authors/${key}.json`);
}