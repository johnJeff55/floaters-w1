
// Upload Controller
const UPLOAD = (function(){

  // PRIVATE 
    let bgClass = "bg-black";
    let numImgsToLoad = null;
    let numImgsRendered = null;
    let allImgsRendered = false;
    let numTransitionsDone = 0;

    document.getElementsByTagName('body')[0].classList.add(bgClass);

    const incNumTransitions = () => {
      numTransitionsDone += 1;
    };

    // Handle offscreen rendering of uploaded images
    const renderImg = () => {
      // each <img>'s onload() initiates it's rendering process
      requestAnimationFrame(startImgRender);
    }
    const startImgRender = () => {
      // Next frame
      requestAnimationFrame(imgRendered);
    }
    const imgRendered = () => {
      numImgsRendered += 1;

      // If all the <img>s have been rendered
      if (numImgsRendered === numImgsToLoad) {
        // Reset counters
        numImgsToLoad = null;
        numImgsRendered = null;

        // Update rendering status
        allImgsRendered = true;
      }
  }

  // PUBLIC _________________________________________________________
  return {
    userImages: function (){

      return new Promise(function(resolve, reject){
        const input = document.querySelector("#selectImagesBtn");
        const curFiles = input.files;
        numImgsToLoad = curFiles.length;

        // Handle css
        loadingDock_selectWrapper.style.display = "none";
        loadingGif.style.display = "block";
        loadingDock_wrapper.classList.add("loadingDock_transition");

        // Start listeners
        loadingDock_wrapper.addEventListener("transitionend", incNumTransitions);

        // Upload & append user images ->
        for (const file of curFiles) {
          // Create a new image element
          const newImg = document.createElement("img");

          // Handle image rendering delays
          newImg.onload = function () {
            renderImg();
          };

          // Add the current file as the <img>.src attribute
          newImg.src = URL.createObjectURL(file);

          // Append the new image to an offscreen div
          offscreenImgLoader.appendChild(newImg);
        }
        // Clear selectImagesBtn
        selectImagesBtn.value = ""; 
      });
    },

    // Are all uploads rendered & css transitions done?
    isCollagePrepDone: function() {

      // If transitions done
      if (numTransitionsDone === 4) {
        // Stop listening for transitions
        loadingDock_wrapper.removeEventListener("transitionend", incNumTransitions);

        // Update body bg color
        document.getElementsByTagName('body')[0].classList.add(bgClass);
      }

      // If transitions done && all imgs are rendered
      if (numTransitionsDone === 4 && allImgsRendered) {
        // Reset Vars
        numImgsToLoad = null;
        numImgsRendered = null;
        allImgsRendered = false;
        numTransitionsDone = 0;

        // Update css
        createCollageBtn.style.display = "inline-block";
        loadingGif.style.display = "none";

        return true;
      } 
    }
  }
})();

export { UPLOAD };
