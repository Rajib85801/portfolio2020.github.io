$(document).ready(function () {
  const bars = document.querySelector(".humburger_menu");
  const headerBody = document.querySelector(".header-body");
  const header = document.querySelector("header");
  const links = document.querySelector(".links");
  const scrollBtn = document.querySelector(".top-scroll-btn button");
  const pageSettings = document.querySelector(".page-settings");
  const selectColorElement = document.querySelectorAll(".select-color ul li");
  const resumeNav = document.querySelectorAll(".resume-navbar ul li");

  // show navbars links
  bars.addEventListener("click", () => {
    if (window.pageYOffset > header.clientHeight - 200) {
      document
        .querySelector(".mobile-navbars")
        .classList.toggle("show-mobile-navbar");
      bars.classList.toggle("header_animate");
    } else {
      headerBody.classList.toggle("header_animate");
      bars.classList.toggle("header_animate");
      links.classList.toggle("header_animate");
    }
  });

  // active portfolio nav
  const portfolioNavs = document.querySelectorAll(".portfolio-nav ul li");

  portfolioNavs.forEach((element) => {
    element.addEventListener("click", (e) => {
      let CurrentElement = e.target;
      for (let x = 0; x < portfolioNavs.length; x++) {
        // remove active class
        portfolioNavs[x].classList.remove("active");
        // add active class
        CurrentElement.classList.add("active");
      }

      // show category items
      let allItems = document.querySelectorAll('.portfolio-item');
      let elementTarget = CurrentElement.getAttribute('data-filter');
      
      
      allItems.forEach(function(element){
        if(element.getAttribute('data-category') == elementTarget || elementTarget == 'all'){
          element.classList.remove('hide');
          element.classList.add('show');
        }else{
          element.classList.remove('show');
          element.classList.add('hide');
        }

        setTimeout(() => {
          element.classList.remove('show');
        },500);
      })
      
    });
  });

  // active resume nav
  resumeNav.forEach((element) => {
    element.addEventListener("click", (e) => {
      let CurrentElement = e.target;
      for (let x = 0; x < resumeNav.length; x++) {
        // remove active class
        resumeNav[x].classList.remove("active");
        // add active class
        CurrentElement.classList.add("active");
      }
      // show current section
      let sectionClass = CurrentElement.getAttribute("data-target");
      let currentSection = document.querySelector(sectionClass);

      let activeClass = document.querySelector(
        ".experience-section .grid.active"
      );
      // remove active tab
      activeClass.classList.remove("active");
      // add active tab
      currentSection.classList.add("active");
    });
  });

  // scrolltop
  scrollBtn.addEventListener("click", () => {
    scroll({
      top: 0,
      behavior: "smooth",
    });
  });

  // change theme color
  selectColorElement.forEach(function (CurrentElement) {
    CurrentElement.addEventListener("click", function () {
      for (let x = 0; x < selectColorElement.length; x++) {
        selectColorElement[x].classList.remove("active-color");
      }
      this.classList.add("active-color");

      let currntColorCode = this.style.background;
      document.documentElement.style.setProperty(
        "--main-color",
        currntColorCode
      );
    });
  });

  // show page settings
  pageSettings.querySelector("button").addEventListener("click", () => {
    pageSettings.classList.toggle("show-settings");
  });

  // set navbar when page scroll
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      document.querySelector(".nav").classList.add("scroll-nav");
    } else {
      document.querySelector(".nav").classList.remove("scroll-nav");
    }

    // scrollBy 20 and navbar will be hide
    if (window.pageYOffset > 30) {
      headerBody.classList.remove("header_animate");
      bars.classList.remove("header_animate");
      links.classList.remove("header_animate");
      document
        .querySelector(".mobile-navbars")
        .classList.remove("show-mobile-navbar");
    }

    // title bar animate
    const titleBarAnimate = (width, currentSection) => {
      let style = `${currentSection} .title-area::after{width:${width}%;}`;
      let sheet = document.createElement("style");
      sheet.innerHTML = style;
      document.body.appendChild(sheet);
    };

    if (window.pageYOffset > 170) {
      let width = Math.floor(window.pageYOffset / 4);
      let section = ".about-section";
      titleBarAnimate(width, section);
    }
    if (window.pageYOffset > 590) {
      let width = Math.floor(window.pageYOffset / 10);
      let section = ".skill-info-section";
      titleBarAnimate(width, section);
    }
  });

  // typed.js
  var options = {
    strings: [
      "Web Developer",
      "Web Desinger",
      "Graphic Desinger",
      "Software Developer",
    ],
    typeSpeed: 5,
    backSpeed: 20,
    loop: true,
    cursorChar: "|",
    showCursor: true
  };
  var typed = new Typed(".typed", options);

  // wow.js
  new WOW().init();
});





// // show img popUp----------
const slideBtnAlignment = () => {
  const imgSlideNext = document.querySelector('.popUp-img-controller .next');
  const imgSlidePrev = document.querySelector('.popUp-img-controller .prev');
  const popUpImgDivWidth = document.querySelector('.showUpproject-inner').clientWidth;
  const fullScreenWidth = window.innerWidth;
  imgSlideNext.style.right = (((fullScreenWidth - popUpImgDivWidth) / 2) / 2) + 'px';
  imgSlidePrev.style.left = (((fullScreenWidth - popUpImgDivWidth) / 2) / 2) + 'px';
}



// -----------------------show popUp window----------------
const projectItems = document.querySelectorAll('.portfolio-item');
const PopUpBox = document.querySelector('.mainitemsPopUp');
let slideIndex,projectItemsIndex;

projectItems.forEach((item,itemIndex) => {
  item.addEventListener('click',(e) => {
    let currentProject = projectItems[itemIndex];
    let ProjectCategory = currentProject.getAttribute('data-category');
    let ProjectDetails = currentProject.querySelector('.items-details');
    let ProjectDesc = ProjectDetails.querySelector('p').textContent;
    let ProjectInfo = ProjectDetails.querySelector('.items-info').innerHTML;

    projectItemsIndex = itemIndex;

    showPopUp(ProjectCategory,ProjectDesc,ProjectInfo);
    slideUpProjectDetails();
    slideBtnAlignment()
  })
})
// show popUp box
const showPopUp = (ProjectCategory,ProjectDesc,ProjectInfo) =>{
  slideIndex = 0;
  document.querySelector(".pop-project-category").innerHTML = '<span>category - </span>' + ProjectCategory;
  document.querySelector('.pop-project-desc p').innerHTML = ProjectDesc;
  document.querySelector('.pop-project-info ul').innerHTML = ProjectInfo;
  slideProjectImage();
  PopUpBox.classList.add('show');
  stopScrolling();
}

// slideUp Project Details
const slideUpProjectDetails = () => {
  const slideUpDetails = document.querySelector('.pop-project-details');
  const slideUpDetailsBtn = document.querySelector('.popUp-controller .slideUp-details');
  const slideUpDetailsBtnIcon = slideUpDetailsBtn.querySelector('i');
  slideUpDetailsBtn.addEventListener('click', () => {
    // change button icon
    if(slideUpDetailsBtnIcon.classList.contains('fa-plus')){
      slideUpDetailsBtnIcon.classList.remove('fa-plus');
      slideUpDetailsBtnIcon.classList.add('fa-minus');
    }else{
      slideUpDetailsBtnIcon.classList.remove('fa-minus');
      slideUpDetailsBtnIcon.classList.add('fa-plus');
    }
    // show Project Details
    slideUpDetails.classList.toggle('show');
  })
}

const slideProjectImage = () => {
  let ProjectImage = projectItems[projectItemsIndex].querySelector('img').getAttribute('data-slide-img');
    ProjectImage = ProjectImage.split(',');
  document.querySelector('.page-counter p').innerHTML = (slideIndex + 1) + ' of ' + ProjectImage.length;
  document.querySelector('.showUpproject-inner img').src = 'images/portfolios/' + ProjectImage[slideIndex];
  document.querySelector('.showUpproject-inner img').onload = () => {
    document.querySelector('#popUp-img-preloader').classList.add('hide');
  }
}

const changeImage = (currentTarget) => {
  let ProjectImage = projectItems[projectItemsIndex].querySelector('img').getAttribute('data-slide-img');
    ProjectImage = ProjectImage.split(',');

  if(currentTarget == 'next'){
    if(slideIndex < ProjectImage.length - 1){
      slideIndex++;
    }else{
      slideIndex = 0;
    }
  }else if(currentTarget == 'prev'){
    if(slideIndex > 0){
      slideIndex--;
    }else{
      slideIndex = ProjectImage.length - 1;
    }
  }
  slideProjectImage();
}

// hide body scroller
const stopScrolling = () => {
  document.body.classList.toggle('stopScrolling');
}


// close popUp exicute
const closePopUpBox = () => {
  // close project details 
  slideUpProjectDetails();
  

  PopUpBox.classList.remove('show');
  PopUpBox.classList.add('close');
  //after 500ms remove close class
  setTimeout(() => {
    PopUpBox.classList.remove('close');
    stopScrolling();
  },500);
}



// preloader
window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('hide');
})


