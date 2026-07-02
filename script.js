const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
}

function showFormMessage(message, isError = false) {
  formStatus.textContent = message;
  formStatus.classList.toggle("error", isError);
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#visitorName").value.trim();
  const message = document.querySelector("#visitorMessage").value.trim();

  if (!name || !message) {
    showFormMessage("Please enter your name and message.", true);
    return;
  }

  showFormMessage(`Thank you, ${name}. Your message is ready to send.`);
  contactForm.reset();
});

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function setTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");

      const icon = themeToggle.querySelector(".theme-toggle__icon");
      const text = themeToggle.querySelector(".theme-toggle__text");

      if (icon) {
        icon.textContent = isDark ? "☀" : "☾";
      }

      if (text) {
        text.textContent = isDark ? "Light" : "Dark";
      }
    }
  }

  setTheme(savedTheme ? savedTheme === "dark" : prefersDark);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = !document.body.classList.contains("dark-theme");
      setTheme(isDark);
      localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
  initThemeToggle();
}
