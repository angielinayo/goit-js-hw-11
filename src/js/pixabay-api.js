import axios from 'axios';

export class pixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '33208131-4d6357c90f666897a60a05f72';

  constructor() {
    this.page = 1;
    this.per_page = 40;
    this.query = '';
  }

  async fetchPhotos(photoKey) {
    const searchParams = {
      params: {
        key: pixabayAPI.API_KEY,
        q: this.query,
        page: this.page,
        per_page: this.per_page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    };
    try {
      const results = await axios.get(
        `${pixabayAPI.BASE_URL}/api/?q=${photoKey}`,
        searchParams
      );
      return results.data;
    } catch (error) {
      console.log(error);
    }
  }
}
