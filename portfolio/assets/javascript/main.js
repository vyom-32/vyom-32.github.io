$(".projects-wrapper").slick({
  infinite: true,
  slidesToShow: 1,
  variableWidth: true,
  centerMode: true,
  nextArrow: $(".projects-next"),
  prevArrow: $(".projects-prev"),
});

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
    console.log(this.sections);
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
