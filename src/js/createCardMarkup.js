import { refs } from './refs';

function createImageGallery(hits) {
  return hits
    .map(
      hits =>
        `
	<li class="gallery__item">
	<a class="photo-link link list"  href="${hits.largeImageURL}">
			<div class="photo-card">
				<img
					src="${hits.webformatURL}"
					class="gallery__image"
					alt="${hits.tags}"
					loading="lazy"
				/>
				<div class="info-wrapper">
				 <div class="info">
					<p class="info-item"><b>Likes ${hits.likes}</b>
					</p>
					<p class="info-item"><b>Views ${hits.views}</b>
					</p>
					<p class="info-item"><b>Comments ${hits.comments}</b>
					</p>
					<p class="info-item"><b>Downloads ${hits.downloads}</b>
					</p>
				</div>
				</div>
			</div>
		</a>
		</li>`
    )
    .join('');
}

export function renderMarkup(hits) {
  refs.galleryEl.insertAdjacentHTML('beforeend', createImageGallery(hits));
}

export function clear() {
  refs.galleryEl.innerHTML = '';
}
