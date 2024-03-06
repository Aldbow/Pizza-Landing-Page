// Selecting DOM elements
const header = document.querySelector(".header"); // Selecting the header element
const nav = document.querySelector(".nav"); // Selecting the navigation container
const ul = document.querySelector(".nav__menu"); // Selecting the unordered list within navigation

// Calculating navigation height for sticky navigation
const navHeight = nav.getBoundingClientRect().height;

// Function for sticky navigation using Intersection Observer API
const stickyNav = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting)
    nav.classList.add(
      "header__sticky"
    ); // Adding sticky class when not intersecting
  else nav.classList.remove("header__sticky"); // Removing sticky class when intersecting
};

// Creating Intersection Observer for sticky navigation
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});

headerObserver.observe(header); // Observing the header element

// Smooth page navigation using event delegation
const sections = document.querySelectorAll("section"); // Selecting all section elements

ul.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" }); // Smooth scrolling to the target section
    sections.forEach((section) => (section.style.paddingTop = "100px")); // Adding padding to sections for better visibility
  }
});

// Fading animation for sections with better performance
const allSections = document.querySelectorAll(".section"); // Selecting all sections with the 'section' class

const fadingSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section__hidden"); // Removing hidden class to trigger fade-in animation
  observer.unobserve(entry.target); // Unobserving the section once it's visible
};

// Creating Intersection Observer for fading animation
const sectionObserver = new IntersectionObserver(fadingSection, {
  root: null,
  threshold: 0.12,
});

allSections.forEach((section) => {
  sectionObserver.observe(section); // Observing each section
  section.classList.add("section__hidden"); // Adding hidden class initially
});

// Mobile menu functionality
const mobileMenu = document.querySelector(".mobile__menu"); // Selecting mobile menu button
const overlay = document.querySelector(".navigation"); // Selecting navigation overlay

const showMenu = () => {
  overlay.classList.add("show__menu"); // Adding class to show menu overlay
};

const hideMenu = () => {
  overlay.classList.remove("show__menu"); // Removing class to hide menu overlay
};

mobileMenu.addEventListener("click", showMenu); // Event listener for showing menu
overlay.addEventListener("click", hideMenu); // Event listener for hiding menu when overlay is clicked
