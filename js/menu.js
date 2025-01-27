document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const overlay = document.getElementById("overlay");
  const navList = document.querySelector(".nav-list");
  const header = document.querySelector(".header");

  // Toggle for mobile
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      overlay.classList.toggle("show");
      navList.classList.toggle("open-menu");
      if (overlay.classList.contains("show")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });
  }

  // Close menu on overlay click
  if (overlay) {
    overlay.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      overlay.classList.remove("show");
      navList.classList.remove("open-menu");
      document.body.style.overflow = "auto";
    });
  }

  // Sticky header on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});
