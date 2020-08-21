// Ref: https://www.kirupa.com/html5/drag.htm

// Drag Controller
const DRAG = (function(){

  // PRIVATE 
  let activeItem = null;
  let active = false;
  let isFrozen = null;
  
  function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }

  function updateImg(targ, width, height, left, top) {
    targ.style.width = width + "px";
    targ.style.height = height + "px";
    targ.style.left = left + "px";
    targ.style.top = top + "px";
    targ.style.transform = "";
  }

  // PUBLIC _________________________________________________________
  return{ 

    dragStart: function(e) {
      if (!e.ctrlKey) { return; }
      else {
      
        // Allow drop anywhere in #collageWrapper;
        e.preventDefault();
  
        // Clear the isFrozen var
        isFrozen = null;
  
        // If the user has clicked on a floating <img>
        if (e.target !== e.currentTarget) {
  
          // Enable dragging stuff
          active = true;
  
          // Get/Set the clicked <img>
          activeItem = e.target;
  
          if (activeItem !== null) {
  
            // Clear the offset
            activeItem.xOffset = 0;
            activeItem.yOffset = 0;
            
            // Set the offset
            activeItem.initialX = e.clientX - activeItem.xOffset;
            activeItem.initialY = e.clientY - activeItem.yOffset;
  
            // Get 'canMove' state => Set 'isFrozen' bool
            activeItem.classList.contains("canMove") ?
            isFrozen = false:
            isFrozen = true;
  
            // Disable floating action
            activeItem.classList.remove("canMove");
          }
        }
      }
    },
    drag: function(e) {
      if (!e.ctrlKey) { return; } 
      else {
        if (active) {
          
          activeItem.currentX = e.clientX - activeItem.initialX;
          activeItem.currentY = e.clientY - activeItem.initialY;
  
          activeItem.xOffset = activeItem.currentX;
          activeItem.yOffset = activeItem.currentY;
  
          setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
        }
      }
    },
    dragEnd: function(e) {
      if (!e.ctrlKey) { return; } 
      else {
        // Update the <img>
        if (activeItem !== null) {
  
          updateImg(activeItem, activeItem.style.width, 
          activeItem.style.height, e.clientX - e.offsetX, 
          e.clientY - e.offsetY); // (targ, width, height, left, top)
  
          // Clear the transform values created during the drag
          activeItem.style.transform = "unset";
  
          // Re-enable the floating action - that was disabled in dragStart
          activeItem.classList.add("canMove");
  
          // If <img> was NOT moving at dragStart -> Disable floating action
          if(isFrozen === true){
            activeItem.classList.remove("canMove");
          }
  
          // If <img> was already selected for editing at dragStart
          if(activeItem.classList.contains("isSelected")){
            // Disable 'isSelected'
            activeItem.classList.remove("isSelected");
          }
        }
        
        // Reset the drag-n-drop function
        activeItem = null;
        active = false;
      }
    }
  }

})();

export { DRAG };