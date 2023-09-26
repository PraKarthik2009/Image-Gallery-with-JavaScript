const imagesList = document.querySelector(".images");
const searchInput = document.querySelector(".search-box input");
const loadMoreBtn = document.querySelector(".load-more");
const lightbox = document.querySelector(".lightbox");
const closeImgBtn = lightbox.querySelector(".close-icon");
const downloadImgBtn = lightbox.querySelector(".uil-import");

// Add your images and memorys here
const images = [
  { name: 'img.jpg', memory: 'Cake' , },
  { name: 'img2.jpg', memory: 'First Time In front of rajat house' },
  { name: 'img3.jpg', memory: 'School Last Day Photo' },
  { name: 'img4.jpg', memory: 'Pollution earth' },
  { name: 'img5.png', memory: 'Boy Standing In front of many planets with power' },
  { name: 'img6.png', memory: 'Boy seeing helicopter flying and police with cars standing' },
  { name: 'img7.png', memory: 'school' },
  { name: 'img8.png', memory: 'kite' },
  { name: 'img9.png', memory: 'Black Background with a guy in centre' },
];

let loadedImages = 0;
let totalImages = images.length;

// Load images on page load
window.addEventListener("load", () => {
  loadImages();
});

// Load more images on button click
loadMoreBtn.addEventListener("click", () => {
  loadImages();
});

const downloadImg = (imgUrl) => {
  // Converting received img to blob, creating its download link, & downloading it
  fetch(imgUrl).then(res => res.blob()).then(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = new Date().getTime();
      a.click();
  }).catch(() => alert("Failed to download image!"));
}
const showLightbox = (name, img) => {
    // Showing lightbox and setting img source, name and button attribute
    lightbox.querySelector("img").src = img;
    lightbox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}
const hideLightbox = () => {
    // Hiding lightbox on close icon click
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}


// Search images by memory name
searchInput.addEventListener("keyup", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredImages = images.filter((image) =>
    image.memory.toLowerCase().includes(searchTerm)
  );
  loadedImages = 0;
  totalImages = filteredImages.length;
  imagesList.innerHTML = "";
  loadMoreBtn.style.display = "block";
  loadImages(filteredImages);
});

// Load images function
function loadImages(imagesToLoad = images) {
  const batchSize = 6; // Number of images to load at once
  for (let i = loadedImages; i < loadedImages + batchSize; i++) {
    if (i >= totalImages) {
      loadMoreBtn.style.display = "none";
      return;
    }
    const image = document.createElement("li");
    const imgSrc = `../images/${imagesToLoad[i].name}`; // Path to the image
    const memoryName = imagesToLoad[i].memory; // memory name
    image.innerHTML = `
      <div class="card">
        <img src="${imgSrc}" alt="${imagesToLoad[i].name}">
        <div class="details">
          <div class="memory">
            <i class="uil uil-camera"></i>
            <span>${memoryName}</span>
          </div>
          <i class="uil uil-heart"></i>  
        </div>
      </div>
    `;   
    image.querySelector("img").addEventListener("click", () => {
        showLightbox(memoryName, imgSrc);
      });
      closeImgBtn.addEventListener("click", hideLightbox);
    imagesList.appendChild(image);

  }
  loadedImages += batchSize;
}
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));