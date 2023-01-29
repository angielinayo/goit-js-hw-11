import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pixabayAPI } from './js/pixabay-api.js';
import { refs } from './js/refs.js';
import { renderMarkup, clear } from './js/createCardMarkup.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loadMoreBtn = document.querySelector('.load-more-button');

const pixabayApi = new pixabayAPI();

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formEl.addEventListener('submit', onSubmitForm);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onSubmitForm(e) {
  e.preventDefault();
  pixabayApi.query = e.target.elements.searchQuery.value.trim();

  if (pixabayApi.query === '') {
    Notify.info('Sorry, but something needs to be entered.');
    return;
  }

  pixabayApi.resetPage();
  clear();

  try {
    const { hits, totalHits } = await pixabayApi.fetchPhotos();

    if (totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.classList.add('is-hidden');
      return;
    } else {
      Notify.success(`Hooray! We found ${totalHits} images.`);
      renderMarkup(hits);

      loadMoreBtn.classList.remove('is-hidden');
      lightBox.refresh();
    }
  } catch (err) {
    console.log(err);
  }
}

async function onLoadMoreClick() {
  loadMoreBtn.classList.add('is-hidden');
  try {
    const { hits, totalHits } = await pixabayApi.fetchPhotos();

    if (hits.length < 40) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );

      renderMarkup(hits);
      loadMoreBtn.classList.add('is-hidden');
    }
    renderMarkup(hits);
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2.3,
      behavior: 'smooth',
    });
    loadMoreBtn.classList.remove('is-hidden');
    lightBox.refresh();
  } catch (err) {
    console.log(err);
  }
}
