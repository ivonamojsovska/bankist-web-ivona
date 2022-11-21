"use strict";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const allSections = document.querySelectorAll(".section");
const allBtns = document.getElementsByTagName("button");
const header = document.querySelector(".header");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const contents = document.querySelectorAll(".operations__content");
const linkContainer = document.querySelector(".nav__links");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const dotContainer = document.querySelector(".dots");
///////Menu fade animation//////
const handleHover = function(e, opacity) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        siblings.forEach((el)=>{
            if (el !== link) el.style.opacity = opacity;
        });
    }
};
linkContainer.addEventListener("mouseover", function(e) {
    handleHover(e, 0.9);
});
linkContainer.addEventListener("mouseout", function(e) {
    handleHover(e, 1);
});
/////////Nav Sticky//////
const navHeight = nav.getBoundingClientRect().height;
const callBack = function(entries) {
    entries.forEach((entry)=>{
        if (!entry.isIntersecting) {
            nav.classList.add("sticky");
            nav.style.opacity = 0.7;
        } else {
            nav.classList.remove("sticky");
            nav.style.opacity = 1;
        }
    });
};
const headerObserver = new IntersectionObserver(callBack, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);
/////Reveal sections
const revealSection = function(entries, observer) {
    entries.forEach((entry)=>{
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("section--hidden");
        observer.unobserve(entry.target);
    });
};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});
allSections.forEach((section)=>{
    section.classList.add("section--hidden");
    sectionObserver.observe(section);
});
//////Lazy loading images
const loadImages = function(entries, observer) {
    entries.forEach((entry)=>{
        if (!entry.isIntersecting) return;
        entry.target.src = entry.target.dataset.src;
        entry.target.addEventListener("load", function() {
            entry.target.classList.remove("lazy-img");
        });
        observer.unobserve(entry.target);
    });
};
const imgObserver = new IntersectionObserver(loadImages, {
    root: null,
    threshold: 0,
    rootMargin: "200px"
});
imgTargets.forEach((img)=>imgObserver.observe(img));
//////Tab content//////
tabsContainer.addEventListener("click", function(e) {
    const clicked = e.target.closest(".operations__tab");
    tabs.forEach(function(t) {
        t.classList.remove("operations__tab--active");
    });
    if (!clicked) return;
    clicked.classList.add("operations__tab--active");
    contents.forEach((c)=>c.classList.remove("operations__content--active"));
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});
//////Modals
const openModal = function(e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
btnsOpenModal.forEach((btn)=>btn.addEventListener("click", openModal));
const closeModal = function() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});
btnScrollTo.addEventListener("click", function() {
    section1.scrollIntoView({
        behavior: "smooth"
    });
});
document.querySelector(".nav__links").addEventListener("click", function(e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({
            behavior: "smooth"
        });
    }
});
/////////Slider
const createDot = function() {
    slides.forEach(function(_, i) {
        dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
    });
};
createDot();
const activateDot = function(slide) {
    document.querySelectorAll(".dots__dot").forEach((dot)=>dot.classList.remove("dots__dot--active"));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
};
activateDot(0);
const goToSlide = function(slide) {
    slides.forEach((s, i)=>s.style.transform = `translateX(${100 * (i - slide)}%)`);
};
goToSlide(0);
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
let curSlide = 0;
const maxSlide = slides.length;
const nextSlide = function() {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    slides.forEach((s, i)=>s.style.transform = `translateX(${100 * (i - curSlide)}%)`);
    activateDot(curSlide);
};
const prevSlide = function() {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    slides.forEach((s, i)=>s.style.transform = `translateX(${100 * (i - curSlide)}%)`);
    activateDot(curSlide);
};
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
});
dotContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("dots__dot")) {
        const slide = e.target.dataset.slide;
        goToSlide(slide);
        activateDot(slide);
    }
}); //////////////////////////////

//# sourceMappingURL=index.672d4772.js.map
