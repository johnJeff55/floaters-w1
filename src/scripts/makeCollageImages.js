
// Collage-image-maker Controller
const MAKE_IMGS = (function(){

  // PRIVATE 
    function setRndTop(height){
      let posY = getRndInteger(1, $(window).height() * .75);

      // Keep running setRndTop()until the <img> fits on the screen
      if(posY + height < $(window).height()-10){
        return posY;
      } else{
        setRndTop(height);
      }
    }

    function setRndLeft(width){
      let posX = getRndInteger(1, $(window).width() * .75);

      // Keep running setRndleft() until the <img> fits on the screen
      if(posX + width < $(window).width()-10){
        return posX;
      } else{
        setRndLeft(width);
      }
    }

    function setDir(){
      let dir = getRndInteger(1, 2);
      if (dir === 1) { return "1"; } 
      else { return "-1"; }
    }

    function getRndInteger(min, max){
      return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  // PUBLIC _________________________________________________________
  return {
    collageImages: function(){
      return new Promise(function(resolve, reject){
        
        const imgsCollection = Array.from(offscreenImgLoader.children);
        let newWidth;
        let newHeight;
        
        // Configure & append the <img.floater>s
        imgsCollection.forEach(function(img, i){

          // Set attributes
          img.id = i;
          img.className = 'floater canMove';
        
          // Handle large images
          const aspectRatio = img.naturalWidth / img.naturalHeight;
          if(img.naturalWidth >= img.naturalHeight){
            if(img.naturalWidth > window.innerWidth / 3){
              newWidth = window.innerWidth / 3;
              newHeight = newWidth / aspectRatio;
            } else {
              newWidth = img.naturalWidth;
              newHeight = img.naturalHeight;
            }
          } else {
            if(img.naturalHeight > window.innerHeight / 2){
              newHeight = window.innerHeight / 2;
              newWidth = newHeight * aspectRatio;
            } else {
              newWidth = img.naturalWidth;
              newHeight = img.naturalHeight;
            }
          }

          // Set CSS
          img.style.width   = newWidth + 'px';
          img.style.height  = newHeight + 'px';
          img.style.top     = setRndTop(newHeight) + 'px';
          img.style.left    = setRndLeft(newWidth) + 'px';
          img.style.opacity = .99;
          img.style.zIndex  = 1;

          // Set data
          img.setAttribute("data-dx", setDir());
          img.setAttribute("data-dy", setDir());
          
          // Append <img>
          collageWrapper.appendChild(img);
        });
        resolve();
      });
    }
  }
})();

export { MAKE_IMGS };
