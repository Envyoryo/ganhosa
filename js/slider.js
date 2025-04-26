// SLIDER OF SERVICES
const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper1 i");

let isDragStart = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  //Showing and hiding prev/next ison according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //Getting max scrollable width
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; //getting first img width & adding 14 margin value
    // If clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); //Calling showHideIcons after 60ms
  });
});

const dragStart = (e) => {
  // UPDATING GLOBAL VARIABLES VALUE ON DOWN EVENT
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  // Scrolling images/carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
