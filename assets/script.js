// Show Password visibility
// Sign Up
function viewPw() {
  let pw = document.getElementById("password");
  let repassword = document.getElementById("repassword");
  if (pw.type === "password") {
    pw.type = "text";
    repassword.type = "text";
  } else {

    pw.type = "password";
    repassword.type = "password";
  }
}
// End signup

// Login
function viewPwLogin() {
  let lPw = document.getElementById("passwordLogin");
  if (lPw.type === "password") {
    lPw.type = "text";
  } else {
    lPw.type = "password";
  }
}
// End of Show Password visibility

// Scroll to Top Button
let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (!mybutton) return;
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", () => {
  // End Scroll to Top Button

  // Dark Mode
  const toggleButton = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");

  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    // moonIcon.style.display = "inline";
    // sunIcon.style.display = "none";
    if (moonIcon) moonIcon.style.display = "inline";
    if (sunIcon) sunIcon.style.display = "none";
  }

  if (toggleButton && sunIcon && moonIcon) {
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        moonIcon.style.display = "inline";
        sunIcon.style.display = "none";
      } else {
        localStorage.setItem("theme", "light");
        moonIcon.style.display = "none";
        sunIcon.style.display = "inline";
      }
    });
  }
  // End of Dark Mode

  // Video play on Home Page
  const videoModal = document.getElementById("videoMoal");
  const video = document.getElementById("video");

  if (videoModal && video) {
    videoModal.addEventListener("show.bs.modal", function (event) {
      const button = event.relatedTarget;
      const videoSrc = button.getAttribute("data-src");
      video.src = videoSrc;
    });

    videoModal.addEventListener("hidden.bs.modal", function () {
      video.src = "";
    });
  }

  // End Video play on Home Page

  // Contact form (on index.html)
  const contactForm = document.getElementById("contactForm");
  const contactBtn = document.getElementById("submitContactBtt");
  if (contactForm && contactBtn) {
    contactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (contactForm.checkValidity()) {
        window.location = "http://127.0.0.1:5500/pages/successContactUs.html";
      } else {
        contactForm.classList.add("was-validated");
      }
    });
  }

  // Signup form (on signup.html)
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      if (!signupForm.checkValidity()) {
        e.preventDefault();
        signupForm.classList.add("was-validated");
        return;
      }

      e.preventDefault();
      // Save the info in the SessionStorage
      const email = document.getElementById("email").value;
      const firstname = document.getElementById("firstname").value;
      const lastname = document.getElementById("lastname").value;
      const password = document.getElementById("password").value;
      const repassword = document.getElementById("repassword").value;

      console.log({ email, firstname, lastname, password, repassword });

      if (password !== repassword) {
        alert("សូមដាក់លេខសម្ងាត់ឲ្យដូចគ្នា។");
        return;
      }

      if(password.length < 8){
        alert("លេខសម្ងាត់ត្រួវតែមាន ៨ ខ្ទង់");
        return;
      }

      sessionStorage.setItem("email", email);
      sessionStorage.setItem("firstname", firstname);
      sessionStorage.setItem("lastname", lastname);
      sessionStorage.setItem("password", password);

      window.location = "login.html";
    });
  }

  // Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      if (!loginForm.checkValidity()) {
        e.preventDefault();
        loginForm.classList.add("was-validated");
        return;
      }

      e.preventDefault();

      const firstnameLogin = document.getElementById("firstnameLogin").value;
      const lastnameLogin = document.getElementById("lastnameLogin").value;
      const passwordLogin = document.getElementById("passwordLogin").value;

      const saveFirstName = sessionStorage.getItem("firstname");
      const saveLastName = sessionStorage.getItem("lastname");
      const savePassword = sessionStorage.getItem("password");

      if (
        firstnameLogin === saveFirstName &&
        lastnameLogin === saveLastName &&
        passwordLogin === savePassword
      ) {
        window.location.href = "indexTwo.html";
      } else {
        alert("សូមបំពេញព័ណ៍មានឲ្យត្រឹមត្រូវ");
      }
    });
  }

  //  Reset password
  const resetForm = document.getElementById("resetPassword");
  if (resetForm) {
    resetForm.addEventListener("submit", (e) => {
      if (!resetForm.checkValidity()) {
        e.preventDefault();
        resetForm.classList.add("was-validated");
        return;
      }
      e.preventDefault();
      const emailReset = document.getElementById("emailReset").value;
      const passwordReset = document.getElementById("passwordReset").value;
      const repasswordReset = document.getElementById("repasswordReset").value;

      const storedEmail = sessionStorage.getItem("email");
      if (emailReset !== storedEmail) {
        alert("អ៊ីម៉ែលមិនត្រឹមត្រូវទេ។");
        return;
      }

      if (passwordReset !== repasswordReset) {
        alert("សូមបំពេញលេខសម្ងាត់ឲ្យត្រឹមត្រូវ");
        return;
      }

      sessionStorage.setItem("password", passwordReset);
      alert("កំណត់លេខសម្ងាត់ថ្មីបានជោគជ័យ");
      window.location.href = "login.html";
    });
  }

  // Update

  const firstnameProfile = document.getElementById("firstnameProfile");
  const lastnameProfile = document.getElementById("lastnameProfile");
  const emailProfile = document.getElementById("emailProfile");
  const passwordProfile = document.getElementById("passwordProfile");

  if (firstnameProfile && lastnameProfile && emailProfile && passwordProfile) {
    // Set initial values
    firstnameProfile.value = sessionStorage.getItem("firstname") || "";
    lastnameProfile.value = sessionStorage.getItem("lastname") || "";
    emailProfile.value = sessionStorage.getItem("email") || "";
    passwordProfile.value = sessionStorage.getItem("password") || "";

    // Edit button handlers
    document.querySelectorAll(".editInfo").forEach((button) => {
      button.addEventListener("click", () => {
        const isReadonly = firstnameProfile.hasAttribute("readonly");

        if (isReadonly) {
          // Enable editing
          firstnameProfile.removeAttribute("readonly");
          lastnameProfile.removeAttribute("readonly");
          emailProfile.removeAttribute("readonly");
          passwordProfile.removeAttribute("readonly");
          button.innerHTML = '<i class="bi bi-save"></i> រក្សាទុក';
        } else {
          // Save and disable editing
          sessionStorage.setItem("firstname", firstnameProfile.value);
          sessionStorage.setItem("lastname", lastnameProfile.value);
          sessionStorage.setItem("email", emailProfile.value);
          sessionStorage.setItem("password", passwordProfile.value);

          firstnameProfile.setAttribute("readonly", true);
          lastnameProfile.setAttribute("readonly", true);
          emailProfile.setAttribute("readonly", true);
          passwordProfile.setAttribute("readonly", true);

          button.innerHTML =
            '<i class="bi bi-pencil-square"></i> កែប្រែព័ត៌មាន';
          alert("កែប្រែព័ត៍មានបានជោគជ័យ");
        }
      });
    });
  }

  // Show in account
  const nameElements = document.querySelectorAll(".accountName");
  const first = sessionStorage.getItem("firstname") || "";
  const last = sessionStorage.getItem("lastname") || "";
  const fullName = (first.toUpperCase() + " " + last.toUpperCase()).trim();

  nameElements.forEach((el) => {
    el.innerHTML = fullName;
  });

  // Booking
  const bookForm = document.getElementById("bookForm");
  const bookBtn = document.getElementById("bookSubmitBtn");

  const firstnameBook = sessionStorage.getItem("firstname");
  const emailBook = sessionStorage.getItem("email");

  if (firstnameBook) {
    const nameInput = document.getElementById("nameBook");
    if (nameInput) nameInput.value = firstnameBook;
  }

  if (emailBook) {
    const emailInput = document.getElementById("emailBook");
    if (emailInput) emailInput.value = emailBook;
  }

  if (bookForm && bookBtn) {
    bookBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const dayTime = document.getElementById("dateTimeBook").value;
      const number = document.getElementById("select1").value;
      const message = document.getElementById("message").value;

      if (bookForm.checkValidity()) {
        let bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];
        const newBooking = {
          firstname: firstnameBook,
          email: emailBook,
          dayTime,
          number,
          message,
        };
        bookings.push(newBooking);
        sessionStorage.setItem("bookings", JSON.stringify(bookings));
        window.location = "bookingSuccess.html";
      } else {
        bookForm.classList.add("was-validated");
      }
    });
  }

  console.log("DOM fully loaded");
});

function deleteAccount() {
  const confirmDelete = confirm("តើអ្នកពិតជាចង់លុបគនណីរបស់អ្នក?");
  if (confirmDelete) {
    sessionStorage.clear();
    alert("គណនីបានលុបដោយជោគជ័យ។");
    window.location = "login.html";
  }
}
