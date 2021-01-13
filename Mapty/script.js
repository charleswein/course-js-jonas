'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  data = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(distance, duration, coords){
    this.distance = distance;
    this.duration = duration;
    this.coords = coords; // [lat, lng]
  }
}

class Running extends Workout{
  constructor(distance,duration,coords,cadence){
    super(distance,duration,coords);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace(){
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace
  }
}

class Cycling extends Workout{
  constructor(distance,duration,coords,elevationGain){
    super(distance,duration,coords);
    this.elevationGain = elevationGain;
    this.speed()
  }
  speed(){
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running(24, 5.2, [39, -12], 178);
const cycling1 = new Cycling(13, 27, [39, -12] , 1318);
console.log(run1, cycling1);
//////////////////////////
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkOut.bind(this));
    inputType.addEventListener('change', this._toggleEvevationField);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.ru/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 13);
    console.log(this);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleEvevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkOut(e) {
    e.preventDefault();

    //clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value =
      inputElevation.value;
    let { lat, lng } = this.#mapEvent.latlng;
    console.log(lat, lng);
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();
