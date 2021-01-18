const wait = function (seconds) {
  return new Promise(function (res, rej) {
    setTimeout(res, seconds * 1000);
  }).then(res => console.log(res));
};

const createImage = function (imgPath) {
  return new Promise(function (res, rej) {
    const newImg = document.createElement('img');
    newImg.src = imgPath;
    newImg.addEventListener('load', function () {
      document
        .querySelector('.images')
        .insertAdjacentElement('beforeend', newImg);
      res(newImg);
    });
    newImg.addEventListener('error', function () {
      rej(new Error(`We can't find a picture...`));
    });
  });
};

let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded!');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then((img) => {
    currentImg = img;
    console.log('Image 1 loaded!');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .catch(err => console.error(err));
