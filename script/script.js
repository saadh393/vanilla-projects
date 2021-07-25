let productInfo;
let counter = 0;
const showCase = document.querySelectorAll('.showCase')
var productContainer = document.querySelector(".productContainer")

fetch('./script/data.json')
.then(res => res.json())
.then(data => {
    productInfo = data;
    initial(productInfo);
})

function initial(productInfo) {
    productInfo.forEach(product => {
        createProduct(product)
    })
    showCase.forEach((image, index) => image.style.backgroundImage = `url("../assets/background/${index+1}.jpg")`)
    document.querySelectorAll(".img").forEach((image, index) => {
        let calculation = 0;
        if(document.body.offsetWidth < 601){
            alert(true)
            calculation = (document.body.offsetWidth / 2)   - (image.offsetWidth / 2) 
        }else{
            calculation = (document.body.offsetWidth* index)  + document.querySelector('.sidebar').offsetWidth + (image.offsetWidth / 2)
        }

        image.style.transform = `translateX(${calculation * (index + 1)}px)`
    })
     

    
}

function next(){
    if(counter === 2) return
    counter += 1;
    performSlideAnimation(counter, true);
}

function previous() {
    if(counter === 0) return
    counter -= 1;
    performSlideAnimation(counter, false); 
}

function performSlideAnimation(counter, forward) {
    document.querySelectorAll(".productName").forEach(name => name.style.transform = `translateX(-${450*counter}px)`);
    document.querySelectorAll(".productPrice").forEach(name => name.style.transform = `translateX(-${450*counter}px)`);
    document.querySelectorAll(".productDescription").forEach(name => name.style.transform = `translateX(-${450*counter}px)`);
    document.querySelectorAll(".quickButton").forEach(name => name.style.transform = `translateX(-${450*counter}px)`);
    document.querySelectorAll(".fontImages .img").forEach((image, index) => {
        const currentTransformVal = parseInt(/translateX\((.*?)px\)/.exec(image.style.transform)[1])
        let calculation = 0;
        if(document.body.offsetWidth < 601){
            alert(true)
            calculation = (document.body.offsetWidth )  - (image.offsetWidth /3 )
        }else{
            calculation = (document.body.offsetWidth )  + document.querySelector('.sidebar').offsetWidth + (image.offsetWidth / 3)
        }

        image.style.transform = forward ? `translateX(${currentTransformVal - calculation}px)` : `translateX(${currentTransformVal + calculation}px)`        
    });
   
    showCase.forEach(image => image.style.transform = `translateX(-${100*counter}%)`);
}

function createProduct(productInfo) {
       // Creating Product
       const product = document.createElement('div');
       product.classList = "product";
   
       const productName = document.createElement('h1');
       productName.className = 'productName';
       productName.innerText = productInfo.name
   
       const productPrice = document.createElement('h4');
       productPrice.className = 'productPrice';
       productPrice.innerText = productInfo.price
   
       const productDescription = document.createElement('p');
       productDescription.className = 'productDescription';
       productDescription.innerText = productInfo.description
   
       const quickButton = document.createElement('button');
       quickButton.className = 'quickButton'
       quickButton.innerText = "Quick View"
       quickButton.onclick = quickViewAnim;

       product.appendChild(productName)
       product.appendChild(productPrice)
       product.appendChild(productDescription)
       product.appendChild(quickButton)
       document.querySelector(".productContainer").appendChild(product)
}

function quickViewAnim() {
    // Grid 3 to 2 Convert Animation
    const container = document.querySelector('.container');
    container.style.transform = `translate(-${document.querySelector(".sidebar").offsetWidth}px)`;
    
    // Focus Image Transition
    const currentImage = document.querySelectorAll('.img')[counter]
    const currentTransformVal = parseInt(/translateX\((.*?)px\)/.exec(currentImage.style.transform)[1])
    currentImage.style.transform = `translateX(${currentTransformVal - currentImage.offsetWidth/2 - 100}px)`
    document.querySelector('.productContainer').style.opacity = 0;
    
    renderProductDetails()
   
    setTimeout(() => {
        // container.style.gridTemplateColumns = '0fr 3fr 2.3fr'
        document.querySelector(".back").style.transform = 'translateX(0)'
        document.querySelector(".thumbnails").style.transform = 'translateX(0)';
    }, 700);
}

function quitQuickViewAnim(params) {
    const container = document.querySelector('.container');
    container.style.transform = ``;
    // document.querySelectorAll('.img')[counter].style.transform = `translateX(-${(100 * counter)}%)`

    const currentImage = document.querySelectorAll('.img')[counter]
    const currentTransformVal = parseInt(/translateX\((.*?)px\)/.exec(currentImage.style.transform)[1])
    currentImage.style.transform = `translateX(${currentTransformVal + currentImage.offsetWidth/2 + 100}px)`
    document.querySelector('.productContainer').style.opacity = 1;
    document.querySelector('.detailsProductInfo').style.transform = 'translateX(100%)'
    document.querySelector(".back").style.transform = 'translateX(-120%)'
   
}

function renderProductDetails() {
    document.querySelector('.detailsProductInfo').innerHTML = ""
    document.querySelector('.detailsProductInfo').style.maxWidth = document.querySelector(".sidebar").offsetWidth + document.querySelector('.productInfo').offsetWidth + "px";
    const productinfoCode = `
    <h1>${productInfo[counter].name}</h1>
      <h4>${productInfo[counter].price}</h4>
      <h2>XS - S - M - L - XL - XXL</h2>
      <div class="cartButtons">
        <button>Add to Cart</button>
        <button>Amazon Pay</button>
      </div>
      <p>${productInfo[counter].description}</p>
      <div class="thumbnails"></div>
    `;
    document.querySelector('.detailsProductInfo').innerHTML = productinfoCode;

    productInfo[counter].images.map((imageName, index) => {
        const img = document.createElement("img")
        const imageUrl = productInfo[counter].path + imageName;
        img.src = imageUrl
        index == 0 && img.classList.add("active")
        img.onclick = (e) =>changeProductImage(imageUrl, img)
        document.querySelector(".thumbnails").appendChild(img)
        
    })
    document.querySelector('.detailsProductInfo').style.opacity = 1
    document.querySelector('.detailsProductInfo').style.transform = 'translateX(0)'
}

function changeProductImage(imageUrl, el) {
    document.querySelectorAll('.img')[counter].firstElementChild.src = imageUrl
    document.querySelector('.thumbnails').childNodes.forEach(item => item.classList.remove("active"))
    el.classList.add("active")
    
    
}