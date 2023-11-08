import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');
let activeLightbox = null;

function renderGallery() {
  const galleryHTML = galleryItems
    .map(
      (item, index) => `
        <li class="gallery__item">
          <a class "gallery__link" href="${item.original}">
            <img
              class="gallery__image"
              src="${item.preview}"
              data-source="${item.original}"
              alt="${item.description}"
              data-index="${index}"
            />
          </a>
        </li>
      `
    )
    .join('');
  gallery.innerHTML = galleryHTML;
}

renderGallery();

gallery.addEventListener('click', (el) => {
  el.preventDefault();
  const target = el.target;
  if (target.tagName === 'IMG') {
    const index = Number(target.dataset.index);
    const imageSrc = galleryItems[index].original;

    const instance = basicLightbox.create(`
      <img src="${imageSrc}" width="800" height="600">
    `);

    instance.show();

    // Збережіть активне модальне вікно
    activeLightbox = instance;

    // Додайте обробник клавіші "Escape" для активного модального вікна
    document.addEventListener('keydown', onKeyPress);
  }
});

function onKeyPress(el) {
  if (el.key === 'Escape' && activeLightbox) {
    activeLightbox.close();
    // Зніміть обробник клавіші "Escape" після закриття модального вікна
    document.removeEventListener('keydown', onKeyPress);
  }
}
console.log(galleryItems);