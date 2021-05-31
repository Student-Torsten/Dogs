//global variable & Array
const pictureArray = [];
let currentlyDisplayedPicture;

//initial page setup
getPicture();

//get picture via API
function getPicture() {
  fetch("https://random.dog/woof.json")
    .then((response) => response.json())
    .then(saveGotPictureInArr);
}

//save got picture in the array
function saveGotPictureInArr(picture) {
  let currUrl = picture.url;
  pictureArray.push(currUrl);
  const index = pictureArray.length - 1;
  show_image(index);
}

//display the picture
function show_image(index) {
  //variables
  var img = document.createElement("img");
  img.src = pictureArray[index];
  img.alt = "sorry, this picture isn´t available";

  //take the DOM-Element
  const area = document.querySelector(".main-picture");

  //clear the DOM-Element, because we want see just one picture
  area.innerHTML = "";

  // add a class for CSS
  img.classList.add("picture");

  //append the picture to the DOM
  area.appendChild(img);

  //update the global variable
  currentlyDisplayedPicture = index;
  //check whether the backButton is to disable
  if (currentlyDisplayedPicture === 0) {
    backButton.setAttribute("disabled", "");
  } else {
    backButton.removeAttribute("disabled");
  }
}

//join the Buttons & add eventListener
const nextButton = document.querySelector("#nextButton");
nextButton.addEventListener("click", stepForward);
const backButton = document.querySelector("#backButton");
backButton.addEventListener("click", stepBackward);

//display the next picture
function stepForward() {
  if (currentlyDisplayedPicture === pictureArray.length - 1) {
    //if we are at the end of array, get e new one from API
    getPicture();
  } else {
    //if we are in the "history", show next picture from the array
    indexToDisplayPicture = currentlyDisplayedPicture + 1;
    show_image(indexToDisplayPicture);
  }
}
//dispay the previous picture in the history
function stepBackward() {
  indexToDisplayPicture = currentlyDisplayedPicture - 1;
  show_image(indexToDisplayPicture);
}
