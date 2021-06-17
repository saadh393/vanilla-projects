// const image = document.querySelectorAll(".item")
const carouselItem = document.querySelectorAll(".carousel .item");
const carousel = document.querySelector(".carousel");


let position = 0
let size = Math.floor(carousel.offsetWidth / 2.5);
let index1, index2, index3, index4;

// console.log(counter, index2);


init();

function init(firstTime = true) {
  
  carouselItem.forEach((image, index) => {
    index++    
    
    const newSize = firstTime ? size * index : size * index - size * position;
    if (newSize === size) {
      image.style.transform = `translate(${newSize + 100}px, 10px) scale(1.1)`;
      image.style.cssText = `
          margin:2rem;
          margin-left : 0;
          z-index : 2;
          opacity : 1;
          transform : translate(${newSize + 100}px, 10px) scale(1);
          border : 4px solid blue;

      `
      // image.style.margin = "2rem";
      // image.style.marginLeft = "0rem";
      // image.style.zIndex = "2"
      // image.style.opacity = "1";
      image.lastElementChild.classList.add('showContent')
      // addContent(image);

    } else {
      // removeContent(image);
      image.style.transform = `translate(${newSize + 100}px, 10px) scale(.8)`;
      image.style.opacity = ".2";
      image.style.margin = "0rem";
      image.style.zIndex = "1";
    }
  })

}

function next() {
  anim();
  if (position == 2) {
    return;
  }
  removeContent(position)
  position++
  init(false)
  
}

function previous() {
  anim();
  if (position == 0) {
    return;
  }
  removeContent(position)
  position--;
  init(false);
}

function addContent(el) {
  const div = document.createElement('div');
  div.className = "content";
  div.innerHTML = `
  <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, tempora!</h3>
  `;
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
    item.style.transition = ".3s ease-in-out";
  });
}
