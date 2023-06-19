console.log('Hello World from Carol');
let year = document.getElementById('currentYear');
year.innerHTML = new Date().getFullYear(); // this makes the year change

window.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".navbar-nav a.nav-link");
  var sections = document.querySelectorAll("section");
  var backToTopBtn = document.querySelector(".back-to-top");

  // Function to remove active class from all nav links
  function removeActiveClass() {
    navLinks.forEach(function (link) {
      link.classList.remove("active");
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default link behavior

      var targetSection = document.querySelector(link.getAttribute("href"));
      scrollToSection(targetSection);

      // Update the URL with the section's ID
      history.pushState(null, null, '#' + targetSection.id);
    });
  });

  window.addEventListener("scroll", function () {
    var fromTop = window.pageYOffset;

    sections.forEach(function (section) {
      var sectionId = section.getAttribute("id");
      var navLink = document.querySelector(".navbar-nav a.nav-link[href='#" + sectionId + "']");

      if (section.offsetTop <= fromTop + 60 && section.offsetTop + section.offsetHeight > fromTop + 60) {
        removeActiveClass(); // Remove active class from all nav links
        navLink.classList.add("active"); // Add active class to the corresponding nav link

        // Update the URL with the section's ID
        history.pushState(null, null, '#' + sectionId);
      } else {
        navLink.classList.remove("active"); // Remove active class from the corresponding nav link
      }
    });

    if (fromTop > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior

    scrollToSection(document.body);

    // Update the URL with the homepage anchor (#)
    history.pushState(null, null, '#');
  });

  // Check the URL for a section ID and scroll to it
  var currentHash = window.location.hash;
  if (currentHash) {
    var targetSection = document.querySelector(currentHash);
    if (targetSection) {
      scrollToSection(targetSection);
    }
  }

  function scrollToSection(section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth"
    });
  }
});

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slide");
  if (n > x.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = x.length };
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}
