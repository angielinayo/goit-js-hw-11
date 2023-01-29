import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pixabayAPI } from './js/pixabay-api.js';
import { createImageGallery } from './js/createCardMarkup.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-button');

const pixabayApi = new pixabayAPI();
let photoKey = '';

async function onSubmitForm(e) {
  e.preventDefault();
  photoKey = e.target.elements.searchQuery.value.trim();
  pixabayApi.page = 1;

  if (photoKey === '') {
    return;
  }

  pixabayApi
    .fetchPhotos(photoKey)
    .then(data => {
      if (data.totalHits === 0) {
        galleryEl.innerHTML = '';
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        galleryEl.innerHTML = '';
        loadMoreBtn.classList.add('is-hidden');
      } else {
        if (data.totalHits > 0) {
          simpleLightBox.refresh();
          Notify.success(`Hooray! We found ${data.totalHits} images.`);
          galleryEl.innerHTML = createImageGallery(data.hits);
          currentHits = data.hits.length;
        }
        if (data.totalHits > 40) {
          simpleLightBox.refresh();
          loadMoreBtn.classList.remove('is-hidden');
        } else {
          loadMoreBtn.classList.add('is-hidden');
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
}

async function onLoadMoreClick(e) {
  pixabayApi.page += 1;

  try {
    const data = await pixabayApi.fetchPhotos(photoKey, pixabayApi.page);

    currentHits = currentHits + data.hits.length;
    if (currentHits === data.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (err) {
    console.log(err);
  }
}

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

formEl.addEventListener('submit', onSubmitForm);
galleryEl.addEventListener('click', onLoadMoreClick);
