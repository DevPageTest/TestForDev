document.addEventListener("DOMContentLoaded", function () {
  //Dropdown
  const dropdownContainer = document.querySelector(".dropdown-content");
  let dropdownHeight = 0;
  const btn = document.querySelector(".dropbtn");
  const dropdownArray = document.getElementsByClassName("dropdown-content-a");

  for (let i = 0; i < dropdownArray.length; i++) {
    let itemHeight = +dropdownArray[i].offsetHeight;
    dropdownHeight += itemHeight;
  }

  function handleHover() {
    dropdownContainer.style.height = `${dropdownHeight}px`;
  }

  function handleLeaveHover() {
    dropdownContainer.style.height = `0px`;
  }

  btn.addEventListener("mouseenter", handleHover);
  dropdownContainer.addEventListener("mouseenter", handleHover);
  btn.addEventListener("mouseleave", handleLeaveHover);
  dropdownContainer.addEventListener("mouseleave", handleLeaveHover);
});
