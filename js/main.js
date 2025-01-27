document.addEventListener("DOMContentLoaded", () => {
  // Basic form validation for Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const pass = document.getElementById("loginPassword").value.trim();

      if (validateEmail(email) && pass.length >= 6) {
        alert("Login successful!");
      } else {
        alert("Please enter valid credentials.");
      }
    });
  }

  // Register form
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const pwd = document.getElementById("regPassword").value.trim();
      const confirm = document.getElementById("regConfirmPassword").value.trim();

      if (!name || !validateEmail(email) || pwd.length < 6 || pwd !== confirm) {
        alert("Invalid registration details or passwords do not match.");
      } else {
        alert("Account created successfully!");
      }
    });
  }

  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cName = document.getElementById("contactName").value.trim();
      const cEmail = document.getElementById("contactEmail").value.trim();
      const cMsg = document.getElementById("contactMessage").value.trim();

      if (!cName || !validateEmail(cEmail) || !cMsg) {
        alert("Please fill in all fields correctly.");
      } else {
        alert("Your message has been sent successfully!");
      }
    });
  }

  // Simple email validator
  function validateEmail(email) {
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(email.toLowerCase());
  }
});
