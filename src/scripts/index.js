
import '../styles/index.scss';
import * as UTIL from './utilities.js';
import { LOAD_HTML } from "./loadHTML";
import { UPLOAD } from "./uploadImages";
import { MAKE_IMGS } from "./makeCollageImages";
import { FLOAT } from "./float";
import { DRAG } from "./drag";
import { EDIT } from "./edit";

let isFloating;
const togFloating = function(){
  if(isFloating){
    FLOAT.stopFloating();
    isFloating = false;
  } else {
    FLOAT.startFloating();
    isFloating = true;
  }
}

const addListenersToImgs = function(){
  return new Promise(function(resolve, reject){
    const collageImgsCollection = Array.from(collageWrapper.children);

    collageImgsCollection.forEach(function(img){
      img.addEventListener('click', function(e){
        if (!e.shiftKey && !e.ctrlKey) {
          img.classList.toggle("canMove");
        } 
        
        if (e.shiftKey) {
          EDIT.initEdit(img);
        }
      });
    });
    
    resolve();
  });
}
// If uploads done => make & append collage images
//  .then add event listeners to each new image
//  .then start floating action for all
const checkUploadsDone = function(){
  let allDone = false;

  if (UPLOAD.isCollagePrepDone()){ allDone = true; }
  
  if (allDone){
    MAKE_IMGS.collageImages() 
      .then(addListenersToImgs() )
      .then(isFloating = true, togFloating() )
    ; 
  } 
  else { setTimeout(function(){ checkUploadsDone(); }, 1000); }
}

const loadEventListeners = function () {

  // Handle non-editing hotkeys
  document.addEventListener("keyup",function (e) {

    // Toggle Floating - < spacebar >
    if (e.keyCode == 32 || e.which == 32) { togFloating(); }

    // Show help modal - < h >
    if (e.keyCode == 72 || e.which == 72) { document.getElementById("helpBtn").click(); }
  });

  // Handle upload
  selectImagesBtn.addEventListener("change",function(){
    UPLOAD.userImages() 
      .then(checkUploadsDone()); 
  });

  // Create collage
  createCollageBtn.addEventListener("click",function(){ 
    UTIL.setCollageCss() 
      .then(fullscreen.requestFullscreen())
    ; 
  });

  // Handle fullscreen
  document.addEventListener("fullscreenchange",function(){
    UTIL.handleFullscreen()
      .then(togFloating)
    ;
  })

  // Handle drag-n-drop
  collageWrapper.addEventListener("mousedown", DRAG.dragStart, false);
  collageWrapper.addEventListener("mousemove", DRAG.drag, false);
  collageWrapper.addEventListener("mouseup", DRAG.dragEnd, false);
};

LOAD_HTML() .then(loadEventListeners());
