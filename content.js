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
  commentsBox.id = "comments-box";
  commentsBoxHeader.id = "comments-box-header"
  commentsBoxHeader.innerHTML = "Drag here"
  
  commentsBox.className = "style-scope ytd-watch-flexy";
  contentElement = document.getElementById("primary");
  contentElement.appendChild(commentsBox);
  document.getElementById("comments-box").appendChild(commentsBoxHeader);
  document.getElementById("comments-box").appendChild(commentsContent);
  
 
  dragEle()
  //dragElement(document.getElementById("comments-box"));
  console.log("pushed");
}

function getComments() {
  return document.getElementById("comments");
}

function getPrimary() {
  return document.getElementById("primary-inner");
}


function dragEle() {
  var commentsBox = document.getElementById("comments-box");
  var commentsBoxHeader = document.getElementById("comments-box-header");
  var initX, initY, mousePressX, mousePressY;

  commentsBoxHeader.addEventListener(
    "mousedown",
    function (event) {
      window.addEventListener('selectstart', disableSelect);
      initX = commentsBox.offsetLeft;
      initY = commentsBox.offsetTop;
      mousePressX = event.clientX;
      mousePressY = event.clientY;

      commentsBoxHeader.addEventListener("mousemove", repositionElement, false);

      document.addEventListener(
        "mouseup",
        function () {
          window.removeEventListener('selectstart', disableSelect);
          commentsBoxHeader.removeEventListener(
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
    commentsBox.style.left = initX + event.clientX - mousePressX + "px";
    commentsBox.style.top = initY + event.clientY - mousePressY + "px";
  }
}

//prevent text selection while dragging
function disableSelect(event) {
  event.preventDefault();
}

AddCommentsButton();
