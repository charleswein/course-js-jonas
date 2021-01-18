'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
<div class="country__data">
 <h3 class="country__name">${data.name}</h3>
 <h4 class="country__region">${data.region}</h4>
 <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
   1
 )}</p>
 <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
 </div>
 </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
// };
// // const getCountryAndNeighbour = function (country) {
// //   const request = new XMLHttpRequest();

// //   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// //   request.send();

// //   request.addEventListener('load', function () {
// //     const [data] = JSON.parse(this.responseText);
// //     console.log(data);
// //     renderCountry(data);
// //     //get neighboor country
// //     const [neighbour] = data.borders;
// //     if (!neighbour) return;

// //     const request2 = new XMLHttpRequest();
// //     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
// //     request2.send();
// //     request2.addEventListener('load', function(){
// //       const data2 = JSON.parse(this.responseText);
// //       renderCountry(data2, 'neighbour')
// //     })
// //   });
// // };

// // getCountryAndNeighbour('usa');

// //

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(`Country is named to ${country}, not found`);
//     }
//     return response.json();
//   });
// };
// const getCountryData = function (country) {
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found'
//   )
//     .then(([dat]) => {
//       renderCountry(dat);
//       const neighbour = dat.borders[0];
//       if (!neighbour) throw new Error('No neighbour found!');
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(response => renderCountry(response, 'neighbour'))
//     .catch(err => {
//       renderError(`Something went wrong ** ${err.message}.Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('usa');
// });

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getJSON = function (url, msg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(msg + response.status);
    }
  });
};
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return getJSON(
        `https://geocode.xyz/${lat},${lng}?geoit=json`,
        'Cound you send request a bit slower!'
      );
    })
    .then(data => {
      const { city, country } = data;
      console.log(`You are in ${city}, ${country}!`);
      return getJSON(
        `https://restcountries.eu/rest/v2/name/${country}`,
        'Country not found'
      );
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => console.log(err.message));
};
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

btn.addEventListener('click', function () {
  whereAmI();
  // whereAmI(52.508, 13.381);
  // whereAmI(19.037, 72.873);
  countriesContainer.style.opacity = 1;
  btn.style.opacity = 0;
});

//
// const lotteryPromise = new Promise(function (res, rej) {
//   console.log('Lotter draw is happening!');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       res('You WIN!!!');
//     } else {
//       rej(new Error('You lost your money.'));
//     }
//   }, 2000);
// });
// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

//promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I vaited for 3 second');
//     return wait(1);
//   }).then(() => {
//     console.log('I vaited for 4 second');
//   });

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Error!')).catch(x => console.error(x));


