import { getData, sendData } from './api.js';
import { showAllert, debounce } from './util.js';
import { renderGallery } from './gallery.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { setOnFormSubmit, hideModal } from './upload-form.js';
import { filterPhotoInit, getFilteredPictures } from './filter-user-photo.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();

  const debounceRenderGallery = debounce(renderGallery);
  filterPhotoInit(data, debounceRenderGallery);
  renderGallery(getFilteredPictures());
} catch {
  showAllert();
}
