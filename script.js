const container = document.querySelector("#container");
const preview = document.querySelector("#preview");
const progressWraper = document.querySelector("#progressWraper");
const progress = document.querySelector("#progress");
const fileInput = document.querySelector("#fileInput");
const previewImage = document.querySelector("#previewImage");
const uploadingProgress = document.querySelector("#uploadingProgress");
const imgRight = document.querySelector("#imgRight");
const imgLeft = document.querySelector("#imgLeft");

preview.addEventListener("dragover", (e) => {
  e.preventDefault();
  previewImage.classList.add("dragEnter");
  showImageAnim();
});

preview.addEventListener("dragenter", (e) => {
  e.preventDefault();
});

preview.addEventListener("dragleave", (e) => {
  e.preventDefault();
  previewImage.classList.remove("dragEnter");
  removeAnim();
});

preview.addEventListener("drop", (e) => {
  e.preventDefault();
  progressWraper.style.display = "block";
  setTimeout(() => {
    showUploadingProgress();
  }, 10);
});

preview.addEventListener("click", (e) => {
  fileInput.click();
});

  fileInput.addEventListener("change", function () {
  showImageAnim();
  showUploadingProgress();
});

function showUploadingProgress() {
  progressWraper.style.height = "80px";
  progressWraper.style.opacity = "1";
  progressWraper.style.transform = "translateY(0px) rotate(0deg)";

  let progressWidth = 0;
  const asyncProcess = setInterval(() => {
    if (progressWidth < 100) {
      progress.style.width = `${progressWidth}%`;
      progressWidth += 1;
      uploadingProgress.innerText = `Upload Completed ${progressWidth}%`;
    } else {
      clearInterval(asyncProcess);
      hide();
    }
  }, 20);
}

function hide() {
  setTimeout(() => {
    progressWraper.style.transform = "translateY(100px)  rotate(7deg)";
    progressWraper.style.opacity = "0";
    setTimeout(() => {
      progressWraper.style.height = "0px";
      progress.style.width = `0%`;
      removeAnim();
    }, 100);
  }, 2000);
}

function showImageAnim() {
  imgLeft.style.transform = "rotate(10deg) translateX(40px) scale(0.8)";
  imgRight.style.transform = "rotate(-10deg) translateX(-40px) scale(0.8)";
}

function removeAnim() {
  imgLeft.style.transform = "rotate(0deg) translateX(0px) scale(0)";
  imgRight.style.transform = "rotate(0deg) translateX(0px) scale(0)";
}
