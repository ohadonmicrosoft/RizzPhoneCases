document.addEventListener("DOMContentLoaded", () => {
  // LOGIN FORM
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      alert(`Login attempt:\nEmail: ${email}\nPassword: ${password}`);
      // Implement real authentication here...
    });
  }

  // REGISTER FORM
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      alert(`Register attempt:\nName: ${name}\nEmail: ${email}`);
      // Implement real registration logic...
    });
  }

  // CONTACT FORM
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const contactName = document.getElementById("contactName").value;
      const contactEmail = document.getElementById("contactEmail").value;
      const contactMessage = document.getElementById("contactMessage").value;
      alert(
        `Contact form submitted:\nName: ${contactName}\nEmail: ${contactEmail}\nMessage: ${contactMessage}`
      );
      // Real form submission logic...
    });
  }

  // NEWSLETTER (if any .newsletter-form elements present)
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailField = newsletterForm.querySelector("input[type='email']");
      alert(`Subscribed with: ${emailField.value}`);
      emailField.value = "";
    });
  }
});
