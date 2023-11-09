import { bodyElement } from './full-photo-modal.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неверный хэштег',
};

const pictureForm = document.querySelector('.img-upload__form');
const pictureUploadContainer = pictureForm.querySelector('.img-upload__overlay');
const pictureOpeninput = pictureForm.querySelector('.img-upload__input');
const pictureCloseButton = pictureForm.querySelector('.img-upload__cancel');
const form = document.getElementById('upload-select-image');
const hashtagField = pictureForm.querySelector('.text__hashtags');
const commentField = pictureForm.querySelector('.text__description');
const buttonSubmit = pictureForm.querySelector('.img-upload__submit');

const pristine = new Pristine(pictureForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const showForm = () => {
  pictureUploadContainer.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  form.reset();
  pristine.reset();
  pictureUploadContainer.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter(Boolean);

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SIMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

const onPictureInputChange = () => {
  showForm();
};

const onClosePictureButtonClick = () => {
  closeForm();
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
    buttonSubmit.disabled = true;
  } else {
    pristine.validate();
    buttonSubmit.disabled = false;
  }
};

pictureOpeninput.addEventListener('change', onPictureInputChange);
pictureCloseButton.addEventListener('click', onClosePictureButtonClick);
form.addEventListener('submit', onFormSubmit);
