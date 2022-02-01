function AddCommentsButton() {
  var ytpRightControls =
    document.getElementsByClassName("ytp-right-controls")[0];
  if (ytpRightControls) {
    ytpRightControls.prepend(commentsButton);
  }
}

var commentsButton = document.createElement("button");
commentsButton.className = "comments ytp-button";
commentsButton.style.width = "auto";
commentsButton.innerHTML = "Comments";
commentsButton.style.cssFloat = "left";
commentsButton.onclick = openComments;

function openComments() {
  var contentElement;
  var commentsContent = getPrimary().removeChild(getComments());
  var commentsBox = document.createElement("div");
  var commentsBoxHeader = document.createElement("div");
  var commentsContainer = document.createElement("div");
  commentsBox.id = "comments-box";
  commentsBoxHeader.id = "comments-box-header";
  commentsContainer.id = "comments-container";
  commentsBoxHeader.innerHTML = "Drag here";
  
  commentsContainer.className = "style-scope ytd-watch-flexy";
  contentElement = document.getElementById("primary");

  contentElement.appendChild(commentsContainer);
  
  commentsContainer.appendChild(commentsBox);
  //document.getElementById("comments-box").appendChild(commentsBoxHeader);
  document.getElementById("comments-box").appendChild(commentsContent);
  
 
  dragEle()
  //dragElement(document.getElementById("comments-box"));
}

function closeComments(){

}

function toggleComments() {
  if (!document.getElementById("comments-container")){
    openComments()
  }
  else{
    closeComments()
  }
}

function getComments() {
  return document.getElementById("comments");
}

function getPrimary() {
  return document.getElementById("primary-inner");
}


function dragEle() {
  var commentsBox = document.getElementById("comments-box");
  //var commentsBoxHeader = document.getElementById("comments-box-header");
  var commentsContainer = document.getElementById("comments-container");
  var initX, initY, mousePressX, mousePressY;

  commentsBox.addEventListener(
    "mousedown",
    function (event) {
      window.addEventListener('selectstart', disableSelect);
      initX = commentsContainer.offsetLeft;
      initY = commentsContainer.offsetTop;
      mousePressX = event.clientX;
      mousePressY = event.clientY;

      commentsBox.addEventListener("mousemove", repositionElement, false);

      document.addEventListener(
        "mouseup",
        function () {
          window.removeEventListener('selectstart', disableSelect);
          commentsBox.removeEventListener(
            "mousemove",
            repositionElement,
            false
          );
        },
        false
      );
    },
    false
  );

  function repositionElement(event) {
    commentsContainer.style.left = initX + event.clientX - mousePressX + "px";
    commentsContainer.style.top = initY + event.clientY - mousePressY + "px";
  }
}

//prevent text selection while dragging
function disableSelect(event) {
  event.preventDefault();
}

AddCommentsButton();
