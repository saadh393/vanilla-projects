
const carousel = document.querySelector(".carousel");
const borolox = document.querySelector("#borolox");
let contentToinject = ""

const data = [
  {
    name: "Mark Zuckerberg",
    designation: "CEO of Facebook",
    photo : './images/zuck.jpg'
  },
  {
    name: "Elon Musk",
    designation: "CEO of Tesla",
    photo : './images/musk.jpg'
  },
  {
    name: "Bill Gates",
    designation: "American Business Mgnate",
    photo : './images/bill.jpg'
  },
  {
    name: "Jack Ma",
    designation: "Chinese Business Magnate",
    photo : './images/jackma.jpg'
  }
]
renderImages()


const carouselItem = document.querySelectorAll(".carousel .item");
let position = 0
let size = Math.floor(carousel.offsetWidth / 2.5);
let index1, index2, index3, index4;

init();

function renderImages() {
  data.forEach(card => {
    contentToinject += `
    <div class="item">
      <img src="${card.photo}" alt="${card.name}" srcset="" />
      <div class="content">
        <h3>${card.name}</h3>
        <p>${card.designation}</p>
      </div>
    </div>
    
    `
    console.log(contentToinject)
  });
  carousel.innerHTML = contentToinject

}

function init(firstTime = true) {
  
  carouselItem.forEach((image, index) => {
    index++    
    
    const newSize = firstTime ? size * index : size * index - size * position;
    if (newSize === size) {
      image.style.transform = `translate(${newSize + 100}px, 20%) scale(1.2)`;
      image.style.opacity = "1";
      // image.style.margin = "2rem";
      image.style.marginLeft = "0"
      image.style.zIndex = "2";
      image.style.border = "4px solid blue" 

      image.lastElementChild.classList.add('showContent')

    } else {
      image.style.transform = `translate(${newSize + 100}px, 10px) scale(.8)`;
      image.style.opacity = ".4";
      image.style.margin = "0rem";
      image.style.zIndex = "1";

    }
  })

}

function next() {
  if (position == data.length -1) {
    return;
  }
  anim();
  removeContent(position)
  position++
  init(false)

  if (position === 1) {
    borolox.style.left = "3%"
    borolox.style.opacity = ".5"
    borolox.style.background = "transparent"
    borolox.style.transition = "left .5s ease"
  }
  
}

function previous(e) {
  if (position == 0) {
    return;
  }
  anim();
  removeContent(position)
  position--;
  init(false);

  if (position === 0) {
    borolox.style.left = "15%"
    borolox.style.opacity = "1"
    borolox.style.background = "black"
    borolox.style.transition = "left .6s ease .25s, background .6s ease .25s"
  }
}

function addContent(el) {
  const div = document.createElement('div');
  div.className = "content";
  div.innerHTML = `<h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, tempora!</h3>`;
  el.appendChild(div);
}

function removeContent(pos) {
  let el = carouselItem[pos]

  el.lastElementChild.classList.add("hideContent");
  setTimeout(() => {
    el.lastElementChild.classList.remove("showContent");
    el.lastElementChild.classList.remove("hideContent");
  }, 300);
}

function anim() {
  carouselItem.forEach((item) => {
    item.style.cssText = "transition : .6s ease-in-out";
  });
}
