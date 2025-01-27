document.addEventListener("DOMContentLoaded", () => {
  // LOGIN FORM
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      if (validateEmail(email) && password.length > 0) {
        alert(`Login successful!\nEmail: ${email}`);
      } else {
        alert("Please provide valid credentials.");
      }
    });
  }

  // REGISTER FORM
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value.trim();
      const confirm = document.getElementById("regConfirmPassword").value.trim();

      if (
        name.length > 0 &&
        validateEmail(email) &&
        password.length >= 6 &&
        password === confirm
      ) {
        alert(`Welcome, ${name}! Registration successful.`);
      } else {
        alert("Please fill in all fields correctly (passwords must match).");
      }
    });
  }

  // CONTACT FORM
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const contactName = document.getElementById("contactName").value.trim();
      const contactEmail = document.getElementById("contactEmail").value.trim();
      const contactMessage = document
        .getElementById("contactMessage")
        .value.trim();

      if (contactName && validateEmail(contactEmail) && contactMessage) {
        alert("Message sent successfully. We'll get back to you soon.");
      } else {
        alert("Please fill in all fields before submitting.");
      }
    });
  }

  // Email Validation
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Scroll to Top Button (optional)
  /*
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.textContent = "↑";
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.style.display = "none";
  document.body.appendChild(scrollToTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  */
});
