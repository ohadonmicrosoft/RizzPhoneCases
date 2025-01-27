document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const openMenuBtn = document.getElementById("openMenuBtn");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  const navLinks = document.querySelectorAll(".sidebar-nav a");
  const toggleIcon = document.querySelector(".menu-toggle");

  // Open Sidebar
  openMenuBtn?.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
    toggleMenuIcon(true);
    lockScroll();
  });

  // Close Sidebar
  closeMenuBtn?.addEventListener("click", () => {
    closeSidebar();
  });

  overlay?.addEventListener("click", () => {
    closeSidebar();
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      closeSidebar();
    })
  );

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    toggleMenuIcon(false);
    unlockScroll();
  }

  // Toggle Icon Animation
  function toggleMenuIcon(isOpen) {
    if (isOpen) {
      toggleIcon.classList.add("open");
    } else {
      toggleIcon.classList.remove("open");
    }
  }

  // Lock/Unlock Scrolling
  function lockScroll() {
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    document.body.style.overflow = "auto";
  }

  // Highlight Active Page Link
  const currentPage = window.location.pathname.split("/").pop();
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Sticky Header on Scroll
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Sidebar Open Animation Effect
  sidebar.addEventListener("transitionend", () => {
    if (sidebar.classList.contains("open")) {
      sidebar.style.boxShadow = "0 0 20px rgba(0, 204, 170, 0.3)";
    } else {
      sidebar.style.boxShadow = "none";
    }
  });
});
