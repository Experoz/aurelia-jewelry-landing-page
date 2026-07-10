// Gestisce la navigazione mobile:
// chiude il menu hamburger e poi scorre alla sezione corretta,
// compensando l'altezza della navbar fixed.

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".custom-navbar");
  const navbarCollapse = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".navbar-menu .nav-link");

  function scrollToTarget(targetId) {
    const targetSection = document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    const targetPosition =
      targetSection.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight +
      1;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

    history.pushState(null, "", targetId);
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const targetSection = document.querySelector(targetId);

      if (!targetSection) {
        return;
      }

      event.preventDefault();

      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

        navbarCollapse.addEventListener(
          "hidden.bs.collapse",
          function () {
            requestAnimationFrame(function () {
              scrollToTarget(targetId);
            });
          },
          { once: true }
        );

        collapseInstance.hide();
      } else {
        scrollToTarget(targetId);
      }
    });
  });
});