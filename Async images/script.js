const wait = function (seconds) {
  return new Promise(function (res) {
    setTimeout(res, seconds * 1000);
  });
};

const createImage = function (imgPath, cl) {
  return new Promise(function (res, rej) {
    const newImg = document.createElement('img');
    newImg.src = imgPath;
    newImg.addEventListener('load', function () {
      document
        .querySelector(cl)
        .append(newImg);
      res(newImg);
    });
    newImg.addEventListener('error', function () {
      rej(new Error(`We can't find a picture...`));
    });
  });
};

const loadNPause = async() =>{
  try {
    let img = await createImage('img/img-1.jpg','.images1');
    await wait(2)
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg','.images1');
    await wait(2)
    img.style.display = 'none';

    img = await createImage('img/img-3.jpg','.images1');
  } catch(err) {
    err => console.error(err)
  }
}
loadNPause()


const loadAll = async imgArr => {
  try {
    let imgs = imgArr.map(async img => await createImage(img, '.images2'));
    const arrImg = await Promise.all(imgs);
    arrImg.forEach(img => img.classList.add('parallel'))
  } catch (err) {
    err => console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
