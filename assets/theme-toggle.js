document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme");
  
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }
  
    updateButtonIcon();
  
    if (button) {
      button.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
  
        if (document.body.classList.contains("dark-mode")) {
          localStorage.setItem("theme", "dark");
        } else {
          localStorage.setItem("theme", "light");
        }
  
        updateButtonIcon();
      });
    }
  
    function updateButtonIcon() {
      if (!button) return;
      button.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
      button.setAttribute(
        "aria-label",
        document.body.classList.contains("dark-mode")
          ? "Switch to light mode"
          : "Switch to dark mode"
      );
    }
  });