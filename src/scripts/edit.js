
// Image Editing Controller
const EDIT = (function(){
  
  // PRIVATE 
  const collageItems = collageWrapper.children;
  
  let targ;
  let scale;

  let sizeCount;
  let zCount;
  let fadeCount;

  let newLeft   = null;
  let newTop    = null;
  let newWidth  = null;
  let newHeight = null;

  function updateImg(targ, width, height, left, top) {
    targ.style.width = width + "px";
    targ.style.height = height + "px";
    targ.style.left = left + "px";
    targ.style.top = top + "px";
    targ.style.transform = "";
  }

  // PUBLIC _________________________________________________________
  return {
    initEdit: function(e){
      targ = e;
      scale = 1;
      sizeCount = 0;
      zCount = 0;
      fadeCount = 0;

      // Enable/Disable editing on all <img>s
      if(targ.classList.contains('isSelected')){
        // De-select targ
        targ.classList.remove('isSelected');
      } else {
        // De-select all
        for(let i=0; i < collageItems.length; i++){
          document.getElementById(collageItems[i].id).classList.remove('isSelected');
        }
        // Select targ
        targ.classList.add('isSelected');
      }

      EDIT.handleEditListeners();
    },
    handleEditListeners: function(){

      // Add mousewheel-event listeners for - size || z-index || opacity
      document.addEventListener("keydown", function(e){

        // Edit size
        if(e.keyCode == 83 || e.which == 83) { // 'S'
          if(sizeCount === 0){
            document.addEventListener('wheel', EDIT.setSize);
          }
          sizeCount += 1;
        }

        // Edit z-index
        if(e.keyCode == 68 || e.which == 68) { // 'D'
          // Display #displayOrderBtn
          document.querySelector('#displayOrderBtn').style.display = 'block';

          if(zCount === 0){
            document.addEventListener('wheel', EDIT.setZ);
          }
          zCount += 1;
        }

        // Edit opacity
        if(e.keyCode == 70 || e.which == 70) { // 'F'
          if(fadeCount === 0){
            document.addEventListener('wheel', EDIT.setOpacity);
          }
          fadeCount += 1;
        }
      });

      // Remove all mousewheel listeners | Hide #displayOrderBtn | Handle resizing
      document.addEventListener("keyup", function(e){

        // If any of the edit keys are released
        if (e.keyCode == 83 || e.which == 83 || // 'S'
          e.keyCode == 68 || e.which == 68 ||   // 'D'
          e.keyCode == 70 || e.which == 70) {   // 'F'
          
          // Remove listeners
          document.removeEventListener('wheel', EDIT.setSize);
          document.removeEventListener('wheel', EDIT.setZ);
          document.removeEventListener('wheel', EDIT.setOpacity);

          // Reset count
          sizeCount = 0;
          fadeCount = 0;
          zCount = 0;

          // Hide #displayOrderBtn
          document.querySelector('#displayOrderBtn').style.display = 'none';

          // If 'S' key released -> Set <img>'s new size & position 
          if (e.keyCode == 83 || e.which == 83){ // 'S'
            if(newWidth !== null){
              updateImg(targ, newWidth, newHeight, newLeft, newTop);
            }
          }
        }
      });
    },
    setSize: function(e){
      const initWidth = Number(targ.style.width.slice(0, -2));
      const initHeight = Number(targ.style.height.slice(0, -2));
      const initLeft = Number(targ.style.left.slice(0, -2));
      const initTop = Number(targ.style.top.slice(0, -2));

      scale += e.deltaY * 0.0005;
    
      // Restrict scale
      scale = Math.min(Math.max(.125, scale), 4);
    
      // Apply scale transform
      targ.style.transform = `scale(${scale})`;

      // Update <img> css values
      newWidth = initWidth * scale;
      newHeight = initHeight * scale;
      newLeft = initLeft - ((newWidth - initWidth) / 2);
      newTop = initTop - ((newHeight - initHeight) / 2);
    },
    setZ: function(e){

      // Get current
      let targZ = parseInt(targ.style.zIndex);

      // Set new
      if (e.deltaY > 0) { targZ += 1; } 
      else {
        if (!targZ - 1 < 0) { targZ -= 1; }
      }
    
      // Apply new
      targ.style.zIndex = targZ;

      // Update #displayOrderBtn
      document.querySelector('#displayOrderBtn > span').innerHTML = targZ;
    },
    setOpacity: function(e){

      // Get current
      let targOpacity = Number(targ.style.opacity);

      // Set new
      if (e.deltaY < 0){
        if (targOpacity - .1 > 0) { targOpacity -= .1; }
      } else {
        if (targOpacity + .1 < 1) { targOpacity += .1; }
      }
    
      // Apply new
      targ.style.opacity = targOpacity;
    },
  }
})();

export { EDIT };