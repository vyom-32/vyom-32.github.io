$(".projects-wrapper").slick({
  infinite: true,
  slidesToShow: 1,
  variableWidth: true,
  centerMode: true,
  nextArrow: $(".projects-next"),
  prevArrow: $(".projects-prev"),
});

// console.log = () => {};

const menuBtn = document.getElementById("menuBtn");
nav = document.querySelector(".nav");
menuBtnExit = document.getElementById("closeMenu");

menuBtn.addEventListener("click", () => {
  nav.style.display = "block";
  menuBtn.style.display = "none";
});

menuBtnExit.addEventListener("click", () => {
  nav.style.display = "none";
  menuBtn.style.display = "block";
});

class Slider {
  constructor(options) {
    this.sections = document.querySelectorAll(options.section);
    // console.log(this.sections);
    this.navigation = document.querySelector(options.dots);

    this.navigation.addEventListener("click", this.scrollToSection.bind(this));
    window.addEventListener("scroll", this.setDotStatus.bind(this));
  }

  removeDotStyles() {
    const dots = this.navigation;
    const is_active = dots.querySelector(".is-active");

    if (is_active != null) {
      is_active.classList.remove("is-active");
    }
  }

  setDotStatus() {
    const scroll_position = window.scrollY;
    const dots = Array.from(this.navigation.children);

    this.sections.forEach((section, index) => {
      const half_window = window.innerHeight / 2;
      const section_top = section.offsetTop;

      if (
        scroll_position > section_top - half_window &&
        scroll_position < section_top + half_window
      ) {
        this.removeDotStyles();
        dots[index].classList.add("is-active");
      }
    });
  }

  scrollToSection(e) {
    console.log("scroll clicked", e.target);
    const dots = Array.from(this.navigation.children);
    const window_height = window.innerHeight;
    let height = 0;
    let index = 0;
    dots.forEach((dot, index) => {
      console.log("dot", dot);
      dot.scrollIntoView(true);
      if (dot == e.target) {
        window.scrollTo({
          top: height,
          behavior: "smooth",
        });
        console.log("scrolled successfully");
      } else {
        console.log(
          "section height ",
          this.sections[index].offsetHeight,
          this.sections[index]
        );
        height = height + this.sections[index].offsetHeight;
      }
    });
  }
}

new Slider({
  section: ".new-section",
  dots: "#navDots",
});

const bgIcons = document.getElementsByClassName("bg-icons");
let timeout;
let i = 0;

// document.onscroll = function (e) {
//   console.log("scrolling", e)
//   clearTimeout(timeout);
//   for(let icon of bgIcons){
//     console.log(i)
//     icon.classList.add(i%2)
//     if(i%2 == 1){
//       icon.classList.add('rotating-animation-clockwise')
//     }
//     else{
//       icon.classList.add('rotating-animation-anticlockwise')
//     }
//     icon.classList.remove('remove-rotating-animation')
//     i++;
//   }
//   i = 0;
//   timeout = setTimeout(function () {
//     for(let icon of bgIcons){
//       icon.classList.remove('rotating-animation-anticlockwise')
//       icon.classList.remove('rotating-animation-clockwise')
//       icon.classList.remove('1')
//       icon.classList.remove('0')
//       icon.classList.add('remove-rotating-animation')
//     }
//   }, 300);
// }

window.addEventListener("wheel", function (event) {
  clearTimeout(timeout);
  if (event.deltaY < 0) {
    for (let icon of bgIcons) {
      icon.classList.remove('scrolleddown')
      icon.classList.add('scrolledup')
    }
  }
  else if (event.deltaY > 0) {
    for (let icon of bgIcons) {
      icon.classList.remove('scrolledup')
      icon.classList.add('scrolleddown')
    }
  }
  timeout = setTimeout(function () {
    for (let icon of bgIcons) {
      icon.classList.remove('scrolleddown','scrolledup')
    }
  }, 3000);
})

// const bgIconsContainer = document.getElementsByClassName("bg-icons-container")

// for(let icon of bgIcons){
//   icon.style.top = Math.random() * bgIconsContainer[0].offsetHeight + "px";
//   icon.style.left = Math.random() * bgIconsContainer[0].offsetWidth + "px";
// }