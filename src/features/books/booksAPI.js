// A mock function to mimic making an async request for data
import axios from 'axios';

export function getBooks(q, page = 1) {
  let url = `http://openlibrary.org/search.json?title=a&page=${page}`
  if (q) {
    url = `http://openlibrary.org/search.json?title=${q}&page=${page}`
  }
  return axios.get(url);
}

export function getAuthor(key) {
  return axios.get(`https://openlibrary.org/authors/${key}.json`);
}