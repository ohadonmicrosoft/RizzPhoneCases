document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const overlay = document.getElementById("overlay");
  const navList = document.querySelector(".nav-list");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navList.classList.toggle("open-menu");

      if (overlay.classList.contains("show")) {
        overlay.classList.remove("show");
        document.body.style.overflow = "auto";
      } else {
        overlay.classList.add("show");
        document.body.style.overflow = "hidden";
      }
    });
  }

  // Close menu on overlay click
  if (overlay) {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("show");
      navList.classList.remove("open-menu");
      menuToggle.classList.remove("open");
      document.body.style.overflow = "auto";
    });
  }
});
