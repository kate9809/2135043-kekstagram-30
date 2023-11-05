import { getPhotoPost } from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const getPicture = getPhotoPost;

const getPictureFragment = document.createDocumentFragment();

getPicture.forEach (({ url, description, likes, comments }, idIndex) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__img').id = idIndex;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  getPictureFragment.appendChild(pictureElement);
});

pictureList.appendChild(getPictureFragment);

export { pictureList };
