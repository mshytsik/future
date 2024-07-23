import { ONE_MEGABYTE_SIZE } from '../constants';

export const loadImageFile = (event, onSuccess, onError, maxSizeMb = 0.5) => {
  if (event.target.files) {
    const photoReader = new FileReader();
    photoReader.size = event.target.files[0].size;
    photoReader.onload = function (image) {
      const result = new Image();
      result.src = image.target.result;
      result.size = image.target.size;
      result.onload = (image) => {
        if (maxSizeMb) {
          const isError = image.target.size > maxSizeMb * ONE_MEGABYTE_SIZE;
          isError ? onError() : onSuccess(image.target.src);
        } else {
          onSuccess(image.target.src);
        }
      };
    };
    photoReader.readAsDataURL(event.target.files[0]);
  } else {
    onError();
  }
};
