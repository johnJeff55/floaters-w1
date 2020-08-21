
function setCollageCss(){
  return new Promise(function(resolve, reject){
    loadingDock_wrapper.style.display = 'none';
    loadingDock_selectWrapper.style.display = 'none';
    createCollageBtn.style.display = 'none';
    collageWrapper.style.opacity = 1;

    resolve();
  });
}

let isFullscreen = 0;
function handleFullscreen(){
  return new Promise(function(resolve, reject){
    let bgClass = "bg-black";

    // If now in fullscreen -> Reset the UI
    if (isFullscreen % 2 == 0) {
      
      // Reset CSS
      document.getElementsByTagName('body')[0].classList.add(bgClass);
      loadingDock_wrapper.classList.remove("loadingDock_transition");
      loadingDock_wrapper.removeAttribute("style");
      loadingDock_selectWrapper.removeAttribute("style");
      createCollageBtn.removeAttribute("style");

    } else if (!isFullscreen % 2 == 0) {
      // Remove collage images
      collageWrapper.innerHTML = "";

      // Update css
      collageWrapper.removeAttribute("style");
      loadingGif.style.display = "none";
    }
    isFullscreen += 1;

    resolve();
  });
}


export { setCollageCss, handleFullscreen };


// function updateImg(targ, width, height, left, top){
  // console.log('updateImg() called : ', );
  // targ.style.width = width + "px";
  // targ.style.height = height + "px";
  // targ.style.left = left + "px";
  // targ.style.top = top + "px";
  // targ.style.transform = "";
// }
