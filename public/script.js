const bar = document.querySelector('.bar');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');

let display = false;

// function drop(){
//   const drop = document.querySelector('.drop');
//   if(display !=true){
//     drop.style.display = 'block';
//     display = true
//   }else{
//     drop.style.display = 'none';
//     display = false
//   }
// }

const global = {
  currentPage: window.location.pathname,
  search: {
      term: '',
      type: '',
      page: 1,
      totalPages: 1,
      totalResults: 0,
  }
};

function init(){
  console.log("helo")
  console.log(global.currentPage)
  switch(global.currentPage){
    case '/':
    case '/index.html':
      function drop(){
        popup.style.display = 'grid';
        overlay.style.display = 'block';
      }
      function closeDropDown(){
        popup.style.display = 'none';
        overlay.style.display = 'none';
      } 
    break;
    case '/about.html':

      // change();
      break;
  }
}

init();

const body = document.body;

function drop(){
  document.getElementById('popup').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
  document.body.classList.add('no-scroll');

}
function closeDropDown(){
  document.getElementById('popup').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
  document.body.classList.remove('no-scroll');
} 

window.addEventListener('scroll', function() {
  const works = document.querySelectorAll('#work');
  const works2 = document.querySelectorAll('#work2');
  
  var windowHeight = window.innerHeight;

  works.forEach(function(work) {
    var workTop = work.getBoundingClientRect().top;

    // Check if the box is within the viewport
    if (workTop < windowHeight ) {
      work.style.animation = 'slideInLeft 1s ease-in-out';
    } 
  });
  works2.forEach(function(work2) {
    var workTop = work2.getBoundingClientRect().top;

    // Check if the box is within the viewport
    if (workTop < windowHeight ) {
      work2.style.animation = 'slideInRight 1s ease-in-out';
    } 
  });


});

window.addEventListener('scroll', function() {
  const works = document.querySelectorAll('#work');
  const works2 = document.querySelectorAll('#work2');
  
  var windowHeight = window.innerHeight;

  works.forEach(function(work) {
    var workTop = work.getBoundingClientRect().top;

    // Check if the box is within the viewport
    if (workTop < windowHeight ) {
      work.style.animation = 'slideInLeft 1s ease-in-out';
    } 
  });
  works2.forEach(function(work2) {
    var workTop = work2.getBoundingClientRect().top;

    // Check if the box is within the viewport
    if (workTop < windowHeight ) {
      work2.style.animation = 'slideInRight 1s ease-in-out';
    } 
  });


});

const currentUser = require('../server')
document.getElementById('admin-name').textContent = currentUser
