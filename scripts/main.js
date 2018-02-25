var DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]";
var DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role=\"trigger\"]";

function setDetails(imageUrl, titleText){
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src",imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail){
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail){
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail){
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb){
  "use strict";
  thumb.addEventListener("click", function(event){
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray(){
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR); //returns NodeList
  var thumbnailArray = [].slice.call(thumbnails); //turns it into an array
  return thumbnailArray;
}

function initializeEvents(){
  "use strict";
  var thumbnails = getThumbnailsArray(); //gets the thumbnail array
  thumbnails.forEach(addThumbClickHandler); //adds event handler to each thumbnail\; lack of () adds it as "property" of that function

  //test for left button changeImage
  leftButtonCycle();
  //
  rightButtonCycle();
}

//functions to have buttons cycle through the pictures
function leftButtonCycle(){
  "use strict";
  var left = document.querySelector(".left-button"); //selects the left button

  left.addEventListener("click", function(){
    //var currImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var currTitle = document.querySelector(DETAIL_TITLE_SELECTOR);

    var thumbList = getThumbnailsArray();

    for(var i = 0; i < thumbList.length; i++){
      if(thumbList[i].getAttribute("data-image-title") == currTitle.textContent){
        if(i == 0){
          var changeImage = imageFromThumb(thumbList[thumbList.length-1]);
          var changeTitle = titleFromThumb(thumbList[thumbList.length-1]);

          setDetails(changeImage, changeTitle);
          break;
        }

        else if(i != 0){
          changeImage = imageFromThumb(thumbList[i-1]);
          changeTitle = titleFromThumb(thumbList[i-1]);

          setDetails(changeImage, changeTitle);
        }
      }
    }
  });
}
function rightButtonCycle(){
  "use strict";
  var right = document.querySelector(".right-button"); //selects the left button

  right.addEventListener("click", function(){
    //var currImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var currTitle = document.querySelector(DETAIL_TITLE_SELECTOR);

    var thumbList = getThumbnailsArray();

    for(var i = 0; i < thumbList.length; i++){
      if(thumbList[i].getAttribute("data-image-title") == currTitle.textContent){
        if(i == thumbList.length-1){
          var changeImage = imageFromThumb(thumbList[0]);
          var changeTitle = titleFromThumb(thumbList[0]);

          setDetails(changeImage, changeTitle);
        }

        else{
          changeImage = imageFromThumb(thumbList[i+1]);
          changeTitle = titleFromThumb(thumbList[i+1]);

          setDetails(changeImage, changeTitle);
          break;
        }
      }
    }
  });
}

initializeEvents();
