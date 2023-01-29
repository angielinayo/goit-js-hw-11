import simpleLightbox from 'simplelightbox';

export function createImageGallery(images) {
  const gallery = images.hits
    .map(item => {
      const {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = item;
      return `
	<li class="gallery__item">
	<a class="photo-link"  href="${largeImageURL}">
			<div class="photo-card">
				<img
					src="${webformatURL}"
					class="gallery__image"
					alt="${tags}"
					loading="lazy"
				/>
				<div class="info-wrapper">
				 <div class="info">
					<p class="info-item"><b>Likes${likes}</b>
					</p>
					<p class="info-item"><b>Views ${views}</b>
					</p>
					<p class="info-item"><b>Comments ${comments}</b>
					</p>
					<p class="info-item"><b>Downloads ${downloads}</b>
					</p>
				</div>
				</div>
			</div>
		</a>
		</li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', gallery);
  simpleLightbox.refresh();
}
