'use strict';

let imageOne = document.getElementById('image-one');
let imageTwo = document.getElementById('image-two');
let imageThree = document.getElementById('image-three');

let chart = document.getElementById('my-chart');
let productsContainer = document.getElementById('container');
let maxClicksAllowed = 5;
let allProducts = [];
let recentlyShown = [];
let chartLabels = [];
let chartData = [];

function Product(productName, filepath, numberOfTimesShown=0, numberOfTimesClicked=0){
  this.productName = productName;
  this.filepath = filepath;
  this.numberOfTimesClicked = numberOfTimesClicked;
  this.numberOfTimesShown = numberOfTimesShown;
  allProducts.push(this);
}

//render the product instances
function initalizeDatabase(){
  if(localStorage.getItem('products')){
    allProducts = JSON.parse(localStorage.getItem('products'));
  } else {
    new Product('R2D2 Bag', 'img/bag.jpg');
    new Product('Banana Slicer', 'img/banana.jpg');
    new Product('Bathroom Tablet Holder', 'img/bathroom.jpg');
    new Product('Open Toed Rainboots', 'img/boots.jpg');
    new Product('All In One Breakfast Maker', 'img/breakfast.jpg');
    new Product('Meatball Flavored Bubblegum', 'img/bubblegum.jpg');
    new Product('Puffy Chair', 'img/chair.jpg');
    new Product('Cthulhu Action Figure', 'img/cthulhu.jpg');
    new Product('Duck Beak For Your Dog', 'img/dog-duck.jpg');
    new Product('Dragon Meat', 'img/dragon.jpg');
    new Product('Pen Utensils', 'img/pen.jpg');
    new Product('Pet Friendly Sweeper', 'img/pet-sweep.jpg');
    new Product('Pizza Scissors', 'img/scissors.jpg');
    new Product('Shark Sleeping Bag', 'img/shark.jpg');
    new Product('Baby Sweeper', 'img/sweep.png');
    new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
    new Product('Unicorn Meat', 'img/unicorn.jpg');
    new Product('Tenticle USB', 'img/usb.gif');
    new Product('Self Watering Water Can', 'img/water-can.jpg');
    new Product('Impossible Wine Glass', 'img/wine-glass.jpg');
  }
}

// create the labels array
function createLabels(){
  for (let i = 0; i<allProducts.length; i++){
    chartLabels.push(allProducts[i].productName);
  }
}

// generates the chart data array
function createChartData(){
  for(let i=0; i<allProducts.length; i++){
    chartData.push(allProducts[i].numberOfTimesClicked);
  }
}

// listens for a click on the product
productsContainer.addEventListener('click', renderNewProducts);

function renderImage(imageElement){
  let randomNumber = Math.floor(Math.random() * allProducts.length);

  // ensure that recently shown images do not get rendered
  while(recentlyShown.includes(randomNumber)){
    randomNumber = Math.floor(Math.random() * allProducts.length);
  }

  // adds index number of image shown to array
  recentlyShown.push(randomNumber);

  // only keeps the most recent 5 images
  if(recentlyShown.length > 5){
    recentlyShown.shift();
  }

  // render the image to the page
  imageElement.src = allProducts[randomNumber].filepath;
  imageElement.alt = allProducts[randomNumber].productName;
  imageElement.productIndex = randomNumber;
}

function renderNewProducts(){

  // increase the number of times the product was clicked
  // decrease the max clicks
  if(event){
    allProducts[event.target.productIndex].numberOfTimesClicked++;
    maxClicksAllowed--;
  }

  // if our max clicks get to 0, remove the event listener, generate chart data
  if(maxClicksAllowed === 0){
    productsContainer.removeEventListener('click', renderNewProducts);
    createChartData();
    createLabels();
    chart.classList.toggle('hide');
    setLocalStorage(allProducts);
  }

  renderImage(imageOne);
  renderImage(imageTwo);
  renderImage(imageThree);
}

// adds or updates local storage with all the products
function setLocalStorage(products){
  console.log('products for local storage', products);
  localStorage.setItem('products', JSON.stringify(products));
}

// render the chart
var ctx = document.getElementById('my-chart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: chartLabels,
    datasets: [{
      label: '# of Votes',
      data: chartData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
}); 

initalizeDatabase();
renderNewProducts();
setLocalStorage(allProducts);
