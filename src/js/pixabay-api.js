import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33208131-4d6357c90f666897a60a05f72';
const params = `image_type=photo&orientation=horizontal&per_page=40`;

export class pixabayAPI {
  constructor() {
    this.page = 1;
    this.per_page = 40;
    this.searchQuery = '';
  }

  async fetchPhotos() {
    const url = `${BASE_URL}?q=${this.searchQuery}&page=${this.page}&key=${API_KEY}&${params}`;
    try {
      const response = await axios.get(url);
      const data = await response.data;
      this.incrementPage();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
