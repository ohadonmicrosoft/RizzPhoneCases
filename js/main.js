document.addEventListener("DOMContentLoaded", () => {
  // Login Form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      alert(`Attempting Login:\nEmail: ${email}\nPassword: ${password}`);
      // Real authentication logic here
    });
  }

  // Register Form
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      alert(`Attempting Registration:\nName: ${name}\nEmail: ${email}`);
      // Real registration logic here
    });
  }

  // Contact Form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const contactName = document.getElementById("contactName").value;
      const contactEmail = document.getElementById("contactEmail").value;
      const contactMessage = document.getElementById("contactMessage").value;
      alert(
        `Contact Form:\nName: ${contactName}\nEmail: ${contactEmail}\nMessage: ${contactMessage}`
      );
      // Real contact logic here
    });
  }
});
