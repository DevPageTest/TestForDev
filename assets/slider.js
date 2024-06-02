document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".wrapper");
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".wrapper .btns");
  const firstCardWidth = carousel.querySelector(".slide").offsetWidth;
  const carouselChildren = [...carousel.children];
  let isDragging = false,
    startX,
    startScrollLeft;
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  carouselChildren
    .slice(-cardPerView)
    .reverse()
    .forEach((slide) => {
      carousel.insertAdjacentHTML("afterbegin", slide.outerHTML);
    });

  carouselChildren.slice(0, cardPerView).forEach((slide) => {
    carousel.insertAdjacentHTML("beforeend", slide.outerHTML);
  });

  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft +=
        btn.id === "prevButton" ? -firstCardWidth : firstCardWidth;
    });
  });

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragEnd = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const autoPlay = () => {
    if (window.innerWidth < 800) return;
    timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2000);
  };
  autoPlay();

  const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    } else if (
      Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - carousel.offsetWidth
    ) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
  };

  carousel.addEventListener("pointerdown", dragStart);
  carousel.addEventListener("pointermove", dragging);
  carousel.addEventListener("pointerup", dragEnd);
  carousel.addEventListener("pointerleave", dragEnd);
  carousel.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);
});
