let theme;
var origElement;
window.onload = function () {
  theme = document.documentElement.getAttribute("dark");
  console.log(theme);
};
console.log(theme);

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
commentsButton.onclick = toggleComments;

function openComments() {
  console.log("opening...");
  var contentElement;
  var commentsContent = getPrimary().removeChild(getComments());
  var commentsBox = document.createElement("div");
  var commentsBoxHeader = document.createElement("div");
  var commentsContainer = document.createElement("div");
  commentsBox.id = "comments-box";
  commentsBoxHeader.id = "comments-box-header";
  commentsContainer.id = "comments-container";

  commentsBoxHeader.innerHTML = "Drag here";

  //commentsContainer.className = "style-scope ytd-watch-flexy";
  if (theme) {
    commentsContainer.className = "dark";
  }
  contentElement = document.getElementById("primary");
  origElement = contentElement;
  console.log(origElement)

  contentElement.appendChild(commentsContainer);

  commentsContainer.appendChild(commentsBox);
  //document.getElementById("comments-box").appendChild(commentsBoxHeader);
  document.getElementById("comments-box").appendChild(commentsContent);

  dragEle();
}

function closeComments() {
  console.log("closing...");
  var commentsBox = document.getElementById("comments-box");
  var commentsContainer = document.getElementById("comments-container");
  var commentsContent = commentsBox.removeChild(getComments());
  getPrimary().appendChild(commentsContent);
  commentsContainer.remove();
}

function toggleComments() {
  if (!document.getElementById("comments-container")) {
    openComments();
  } else {
    closeComments();
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
      window.addEventListener("selectstart", disableSelect);
      initX = commentsContainer.offsetLeft;
      initY = commentsContainer.offsetTop;
      mousePressX = event.clientX;
      mousePressY = event.clientY;

      commentsBox.addEventListener("mousemove", repositionElement, false);

      document.addEventListener(
        "mouseup",
        function () {
          window.removeEventListener("selectstart", disableSelect);
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

/* function dragTest() {
  var dragItem = document.getElementById("comments-box");
  var container = document.getElementById("comments-box");

  var active = false;
  var currentX;
  var currentY;
  var initialX;
  var initialY;
  var xOffset = 0;
  var yOffset = 0;

  container.addEventListener("touchstart", dragStart, false);
  container.addEventListener("touchend", dragEnd, false);
  container.addEventListener("touchmove", drag, false);

  container.addEventListener("mousedown", dragStart, false);
  container.addEventListener("mouseup", dragEnd, false);
  container.addEventListener("mousemove", drag, false);

  function dragStart(e) {
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem) {
      active = true;
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
  }

  function drag(e) {
    if (active) {
      e.preventDefault();

      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, dragItem);
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }
}
 */
AddCommentsButton();
