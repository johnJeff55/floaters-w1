// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/index.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"scripts/utilities.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCollageCss = setCollageCss;
exports.handleFullscreen = handleFullscreen;

function setCollageCss() {
  return new Promise(function (resolve, reject) {
    loadingDock_wrapper.style.display = 'none';
    loadingDock_selectWrapper.style.display = 'none';
    createCollageBtn.style.display = 'none';
    collageWrapper.style.opacity = 1;
    resolve();
  });
}

var isFullscreen = 0;

function handleFullscreen() {
  return new Promise(function (resolve, reject) {
    var bgClass = "bg-black"; // If now in fullscreen -> Reset the UI

    if (isFullscreen % 2 == 0) {
      // Reset CSS
      document.getElementsByTagName('body')[0].classList.add(bgClass);
      loadingDock_wrapper.classList.remove("loadingDock_transition");
      loadingDock_wrapper.removeAttribute("style");
      loadingDock_selectWrapper.removeAttribute("style");
      createCollageBtn.removeAttribute("style");
    } else if (!isFullscreen % 2 == 0) {
      // Remove collage images
      collageWrapper.innerHTML = ""; // Update css

      collageWrapper.removeAttribute("style");
      loadingGif.style.display = "none";
    }

    isFullscreen += 1;
    resolve();
  });
} // function updateImg(targ, width, height, left, top){
// console.log('updateImg() called : ', );
// targ.style.width = width + "px";
// targ.style.height = height + "px";
// targ.style.left = left + "px";
// targ.style.top = top + "px";
// targ.style.transform = "";
// }
},{}],"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"scripts/loadHTML.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOAD_HTML = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOAD_HTML = function LOAD_HTML() {
  return new Promise(function (resolve, reject) {
    var _helpModal = "<!-- Content wrapper -->\r\n<div \r\n  class=\"modal-dialog modal-xl\"\r\n>\r\n  <!-- Content -->\r\n  <div \r\n    class=\"modal-content bg-white border\"\r\n  >\r\n    <!-- Heading -->\r\n    <div \r\n      class=\"d-flex pt-2 pb-3 bg-white justify-content-between border-bottom\"\r\n    >\r\n      <!-- Title -->\r\n      <div class=\"d-inline-flex ml-3 align-items-end\">\r\n        <p class=\"headerTag my-0 p-0 smallCaps\">\r\n          Floaters - Help\r\n        </p>\r\n      </div>\r\n\r\n      <!-- Close btn -->\r\n      <div class=\"d-inline-flex pr-3 align-items-center\">\r\n        <button\r\n          type=\"button\"\r\n          class=\"btn btn-outline-dark text120 border-0 font-weight-bold\"\r\n          data-dismiss=\"modal\"\r\n        >\r\n          X\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <!-- Body -->\r\n    <div \r\n      class=\"modal-body\"\r\n    >\r\n      <!-- Tab triggers -->\r\n      <ul \r\n        class=\"nav nav-tabs\" role=\"tablist\"\r\n      >\r\n        <!-- Quick Start trigger -->\r\n        <li \r\n          class=\"nav-item\" role=\"presentation\"\r\n        >\r\n          <a\r\n            class=\"nav-link px-4 active text-dark\"\r\n            id=\"quickstart_tab\"\r\n            data-toggle=\"tab\"\r\n            \r\n            href=\"#quickstart\"\r\n            role=\"tab\"\r\n            aria-controls=\"quickstart\"\r\n            aria-selected=\"true\"\r\n          >\r\n            Quick Start\r\n          </a>\r\n        </li>\r\n\r\n        <!-- How to edit trigger -->\r\n        <li \r\n          class=\"nav-item\" role=\"presentation\"\r\n        >\r\n          <a\r\n            class=\"nav-link px-4 text-dark\"\r\n            id=\"howtoedit_tab\"\r\n            data-toggle=\"tab\"\r\n            href=\"#howtoedit\"\r\n            role=\"tab\"\r\n            aria-controls=\"howtoedit\"\r\n            aria-selected=\"false\"\r\n          >\r\n            How to edit\r\n          </a>\r\n        </li>\r\n      </ul>\r\n\r\n      <!-- Tabs content -->\r\n      <div \r\n        class=\"tab-content\"\r\n      >\r\n        <!-- Quick Start content  -->\r\n        <div\r\n          id=\"quickstart\"\r\n          class=\"tab-pane fade card card-body border-top-0 show active\"\r\n          role=\"tabpanel\"\r\n          aria-labelledby=\"quickstart_tab\"\r\n        >\r\n          <!-- Get Help & Drag-n-Drop -->\r\n          <div class=\"d-flex w-100 mt-4 justify-content-between\">\r\n            <div class=\"d-inline-block ml-3 fitContent\">\r\n              <div class=\"fitContent justify-content-end\">\r\n                <p class=\"mb-0 pb-0 text140 text-center\">Help</p>\r\n                <p class=\"pt-0 px-4 text-center\">H key</p>\r\n              </div>\r\n            </div>\r\n            <div class=\"d-inline-block px-5 fitContent\">\r\n              <div class=\"fitContent\">\r\n                <p class=\"mb-0 pb-0 text140 text-center\">Drag</p>\r\n                <p class=\"pt-0 px-4 text-center\">ctrl+ Click</p>\r\n              </div>\r\n            </div>\r\n            <div class=\"d-inline-block mr-3 fitContent\">\r\n              <div class=\"fitContent\">\r\n                <p class=\"mb-0 pb-0 text140 text-center\">Edit</p>\r\n                <p class=\"pt-0 px-4 text-center\">shift+ Click</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- Start/Stop floating (headking) -->\r\n          <div \r\n            class=\" mx-auto mt-5 mb-3 text140 smallCaps text-center\" \r\n            style=\"width:90%; border-bottom:3px solid black;\"\r\n          >\r\n            Start/stop floating for\r\n          </div>\r\n          <!-- Start/Stop floating (hotkeys) -->\r\n          <div class=\"d-flex w-100 justify-content-center\">\r\n            <div class=\"d-inline-block mr-5 fitContent\">\r\n              <div class=\"fitContent justify-content-end\">\r\n                <p class=\"mb-0 pb-0 text140 text-center\">all images</p>\r\n                <p class=\"pt-0 text-center\">spacebar</p>\r\n              </div>\r\n            </div>\r\n            <div class=\"d-inline-block ml-5 fitContent\">\r\n              <div class=\"fitContent justify-content-end\">\r\n                <p class=\"mb-0 pb-0 text140 text-center\">1 image</p>\r\n                <p class=\"pt-0 px-4 text-center\">Click image</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- How to edit content -->\r\n        <div\r\n          id=\"howtoedit\"\r\n          class=\"tab-pane fade card card-body pb-0 border-top-0\"\r\n          role=\"tabpanel\"\r\n          aria-labelledby=\"howtoedit_tab\"\r\n        >\r\n          <!-- Editing steps -->\r\n          <div class=\"mx-auto mt-3\" style=\"width:fit-content;\">\r\n            <p>1. shift+ Click the image to edit it.</p>\r\n            <p>2. Press a key & use mousewheel&hellip;</p>\r\n          </div>\r\n          <!-- Size & Fade -->\r\n          <div class=\"d-flex w-50 mt-5 mx-auto justify-content-between\">\r\n            <div class=\"d-inlne-flex\">\r\n              <p class=\"mb-0 pb-0 text140 text-center\">Size</p>\r\n              <p class=\"pt-0 px-4 text-center\">'S' key</p>\r\n            </div>\r\n            <div class=\"d-inlne-flex\">\r\n              <p class=\"mb-0 pb-0 text140 text-center\">Fade</p>\r\n              <p class=\"pt-0 px-4 text-center\">'F' key</p>\r\n            </div>\r\n          </div>\r\n          <!-- Display order -->\r\n          <div class=\"w-50 mt-4 mx-auto text-center\">\r\n            <p class=\"text140 mb-0 pb-0\">Display order</p>\r\n            <p class=\"pt-0\">'D' key</p>\r\n          </div>\r\n        </div><!--/ How to edit content -->\r\n      </div><!--/ Tabs content -->\r\n    </div><!--/ Body -->\r\n  </div><!--/ Content -->\r\n</div><!--/ Content wrapper -->\r\n";
    helpModal.innerHTML = _helpModal;
    resolve();
  });
};

exports.LOAD_HTML = LOAD_HTML;
},{"fs":"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/_empty.js"}],"scripts/uploadImages.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPLOAD = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Upload Controller
var UPLOAD = function () {
  // PRIVATE 
  var bgClass = "bg-black";
  var numImgsToLoad = null;
  var numImgsRendered = null;
  var allImgsRendered = false;
  var numTransitionsDone = 0;
  document.getElementsByTagName('body')[0].classList.add(bgClass);

  var incNumTransitions = function incNumTransitions() {
    numTransitionsDone += 1;
  }; // Handle offscreen rendering of uploaded images


  var renderImg = function renderImg() {
    // each <img>'s onload() initiates it's rendering process
    requestAnimationFrame(startImgRender);
  };

  var startImgRender = function startImgRender() {
    // Next frame
    requestAnimationFrame(imgRendered);
  };

  var imgRendered = function imgRendered() {
    numImgsRendered += 1; // If all the <img>s have been rendered

    if (numImgsRendered === numImgsToLoad) {
      // Reset counters
      numImgsToLoad = null;
      numImgsRendered = null; // Update rendering status

      allImgsRendered = true;
    }
  }; // PUBLIC _________________________________________________________


  return {
    userImages: function userImages() {
      return new Promise(function (resolve, reject) {
        var input = document.querySelector("#selectImagesBtn");
        var curFiles = input.files;
        numImgsToLoad = curFiles.length; // Handle css

        loadingDock_selectWrapper.style.display = "none";
        loadingGif.style.display = "block";
        loadingDock_wrapper.classList.add("loadingDock_transition"); // Start listeners

        loadingDock_wrapper.addEventListener("transitionend", incNumTransitions); // Upload & append user images ->

        var _iterator = _createForOfIteratorHelper(curFiles),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var file = _step.value;
            // Create a new image element
            var newImg = document.createElement("img"); // Handle image rendering delays

            newImg.onload = function () {
              renderImg();
            }; // Add the current file as the <img>.src attribute


            newImg.src = URL.createObjectURL(file); // Append the new image to an offscreen div

            offscreenImgLoader.appendChild(newImg);
          } // Clear selectImagesBtn

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        selectImagesBtn.value = "";
      });
    },
    // Are all uploads rendered & css transitions done?
    isCollagePrepDone: function isCollagePrepDone() {
      // If transitions done
      if (numTransitionsDone === 4) {
        // Stop listening for transitions
        loadingDock_wrapper.removeEventListener("transitionend", incNumTransitions); // Update body bg color

        document.getElementsByTagName('body')[0].classList.add(bgClass);
      } // If transitions done && all imgs are rendered


      if (numTransitionsDone === 4 && allImgsRendered) {
        // Reset Vars
        numImgsToLoad = null;
        numImgsRendered = null;
        allImgsRendered = false;
        numTransitionsDone = 0; // Update css

        createCollageBtn.style.display = "inline-block";
        loadingGif.style.display = "none";
        return true;
      }
    }
  };
}();

exports.UPLOAD = UPLOAD;
},{}],"scripts/makeCollageImages.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAKE_IMGS = void 0;

// Collage-image-maker Controller
var MAKE_IMGS = function () {
  // PRIVATE 
  function setRndTop(height) {
    var posY = getRndInteger(1, $(window).height() * .75); // Keep running setRndTop()until the <img> fits on the screen

    if (posY + height < $(window).height() - 10) {
      return posY;
    } else {
      setRndTop(height);
    }
  }

  function setRndLeft(width) {
    var posX = getRndInteger(1, $(window).width() * .75); // Keep running setRndleft() until the <img> fits on the screen

    if (posX + width < $(window).width() - 10) {
      return posX;
    } else {
      setRndLeft(width);
    }
  }

  function setDir() {
    var dir = getRndInteger(1, 2);

    if (dir === 1) {
      return "1";
    } else {
      return "-1";
    }
  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } // PUBLIC _________________________________________________________


  return {
    collageImages: function collageImages() {
      return new Promise(function (resolve, reject) {
        var imgsCollection = Array.from(offscreenImgLoader.children);
        var newWidth;
        var newHeight; // Configure & append the <img.floater>s

        imgsCollection.forEach(function (img, i) {
          // Set attributes
          img.id = i;
          img.className = 'floater canMove'; // Handle large images

          var aspectRatio = img.naturalWidth / img.naturalHeight;

          if (img.naturalWidth >= img.naturalHeight) {
            if (img.naturalWidth > window.innerWidth / 3) {
              newWidth = window.innerWidth / 3;
              newHeight = newWidth / aspectRatio;
            } else {
              newWidth = img.naturalWidth;
              newHeight = img.naturalHeight;
            }
          } else {
            if (img.naturalHeight > window.innerHeight / 2) {
              newHeight = window.innerHeight / 2;
              newWidth = newHeight * aspectRatio;
            } else {
              newWidth = img.naturalWidth;
              newHeight = img.naturalHeight;
            }
          } // Set CSS


          img.style.width = newWidth + 'px';
          img.style.height = newHeight + 'px';
          img.style.top = setRndTop(newHeight) + 'px';
          img.style.left = setRndLeft(newWidth) + 'px';
          img.style.opacity = .99;
          img.style.zIndex = 1; // Set data

          img.setAttribute("data-dx", setDir());
          img.setAttribute("data-dy", setDir()); // Append <img>

          collageWrapper.appendChild(img);
        });
        resolve();
      });
    }
  };
}();

exports.MAKE_IMGS = MAKE_IMGS;
},{}],"scripts/float.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FLOAT = void 0;

// Float Controller
var FLOAT = function () {
  // PRIVATE 
  var boxWidth = screen.width;
  var boxHeight = screen.height;
  var speedX = .25;
  var speedY = .5;
  var floaters;
  var timer;

  function floatInterval() {
    timer = setInterval(float, 15);
  }

  function float() {
    floaters.forEach(function (floater) {
      var posX = Number(floater.style.left.slice(0, -2));
      var posY = Number(floater.style.top.slice(0, -2));
      var nextLeft = posX + dirX(floater) * speedX;
      var nextTop = posY + dirY(floater) * speedY;
      handleCollisions(floater, nextLeft, nextTop);
      posX += dirX(floater) * speedX;
      posY += dirY(floater) * speedY;

      if (!floater.classList.contains("isSelected") && floater.classList.contains("canMove")) {
        floater.style.left = posX + 'px';
        floater.style.top = posY + 'px';
      }
    });
  }

  function handleCollisions(floater, nextLeft, nextTop) {
    var nextRight = nextLeft + Number(floater.style.width.slice(0, -2));
    var nextBottom = nextTop + Number(floater.style.height.slice(0, -2)); // X-AXIS - If floater's about to go out-of-bounds on the x-axis

    if (nextLeft <= 0 || nextRight >= boxWidth) {
      // Reverse its direction of movement on the x-axis
      if (dirX(floater) < 0) {
        // Start moving to the right
        floater.setAttribute("data-dx", "1");
      } else {
        // Start moving to the left
        floater.setAttribute("data-dx", "-1");
      }
    } // Y-AXIS - If floater's about to go out-of-bounds on the y-axis


    if (nextTop <= 0 || nextBottom >= boxHeight) {
      // Reverse its direction of movement on the y-axis
      if (dirY(floater) < 0) {
        floater.setAttribute("data-dy", "1");
      } else {
        floater.setAttribute("data-dy", "-1");
      }
    }
  }

  function dirX(floater) {
    return parseInt(floater.getAttribute("data-dx"));
  }

  function dirY(floater) {
    return parseInt(floater.getAttribute("data-dy"));
  } // PUBLIC _________________________________________________________


  return {
    startFloating: function startFloating() {
      floaters = document.querySelectorAll('.floater');
      floatInterval();
    },
    stopFloating: function stopFloating() {
      clearInterval(timer);
    }
  };
}();

exports.FLOAT = FLOAT;
},{}],"scripts/drag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DRAG = void 0;

// Ref: https://www.kirupa.com/html5/drag.htm
// Drag Controller
var DRAG = function () {
  // PRIVATE 
  var activeItem = null;
  var active = false;
  var isFrozen = null;

  function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }

  function updateImg(targ, width, height, left, top) {
    targ.style.width = width + "px";
    targ.style.height = height + "px";
    targ.style.left = left + "px";
    targ.style.top = top + "px";
    targ.style.transform = "";
  } // PUBLIC _________________________________________________________


  return {
    dragStart: function dragStart(e) {
      if (!e.ctrlKey) {
        return;
      } else {
        // Allow drop anywhere in #collageWrapper;
        e.preventDefault(); // Clear the isFrozen var

        isFrozen = null; // If the user has clicked on a floating <img>

        if (e.target !== e.currentTarget) {
          // Enable dragging stuff
          active = true; // Get/Set the clicked <img>

          activeItem = e.target;

          if (activeItem !== null) {
            // Clear the offset
            activeItem.xOffset = 0;
            activeItem.yOffset = 0; // Set the offset

            activeItem.initialX = e.clientX - activeItem.xOffset;
            activeItem.initialY = e.clientY - activeItem.yOffset; // Get 'canMove' state => Set 'isFrozen' bool

            activeItem.classList.contains("canMove") ? isFrozen = false : isFrozen = true; // Disable floating action

            activeItem.classList.remove("canMove");
          }
        }
      }
    },
    drag: function drag(e) {
      if (!e.ctrlKey) {
        return;
      } else {
        if (active) {
          activeItem.currentX = e.clientX - activeItem.initialX;
          activeItem.currentY = e.clientY - activeItem.initialY;
          activeItem.xOffset = activeItem.currentX;
          activeItem.yOffset = activeItem.currentY;
          setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
        }
      }
    },
    dragEnd: function dragEnd(e) {
      if (!e.ctrlKey) {
        return;
      } else {
        // Update the <img>
        if (activeItem !== null) {
          updateImg(activeItem, activeItem.style.width, activeItem.style.height, e.clientX - e.offsetX, e.clientY - e.offsetY); // (targ, width, height, left, top)
          // Clear the transform values created during the drag

          activeItem.style.transform = "unset"; // Re-enable the floating action - that was disabled in dragStart

          activeItem.classList.add("canMove"); // If <img> was NOT moving at dragStart -> Disable floating action

          if (isFrozen === true) {
            activeItem.classList.remove("canMove");
          } // If <img> was already selected for editing at dragStart


          if (activeItem.classList.contains("isSelected")) {
            // Disable 'isSelected'
            activeItem.classList.remove("isSelected");
          }
        } // Reset the drag-n-drop function


        activeItem = null;
        active = false;
      }
    }
  };
}();

exports.DRAG = DRAG;
},{}],"scripts/edit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EDIT = void 0;

// Image Editing Controller
var EDIT = function () {
  // PRIVATE 
  var collageItems = collageWrapper.children;
  var targ;
  var scale;
  var sizeCount;
  var zCount;
  var fadeCount;
  var newLeft = null;
  var newTop = null;
  var newWidth = null;
  var newHeight = null;

  function updateImg(targ, width, height, left, top) {
    targ.style.width = width + "px";
    targ.style.height = height + "px";
    targ.style.left = left + "px";
    targ.style.top = top + "px";
    targ.style.transform = "";
  } // PUBLIC _________________________________________________________


  return {
    initEdit: function initEdit(e) {
      targ = e;
      scale = 1;
      sizeCount = 0;
      zCount = 0;
      fadeCount = 0; // Enable/Disable editing on all <img>s

      if (targ.classList.contains('isSelected')) {
        // De-select targ
        targ.classList.remove('isSelected');
      } else {
        // De-select all
        for (var i = 0; i < collageItems.length; i++) {
          document.getElementById(collageItems[i].id).classList.remove('isSelected');
        } // Select targ


        targ.classList.add('isSelected');
      }

      EDIT.handleEditListeners();
    },
    handleEditListeners: function handleEditListeners() {
      // Add mousewheel-event listeners for - size || z-index || opacity
      document.addEventListener("keydown", function (e) {
        // Edit size
        if (e.keyCode == 83 || e.which == 83) {
          // 'S'
          if (sizeCount === 0) {
            document.addEventListener('wheel', EDIT.setSize);
          }

          sizeCount += 1;
        } // Edit z-index


        if (e.keyCode == 68 || e.which == 68) {
          // 'D'
          // Display #displayOrderBtn
          document.querySelector('#displayOrderBtn').style.display = 'block';

          if (zCount === 0) {
            document.addEventListener('wheel', EDIT.setZ);
          }

          zCount += 1;
        } // Edit opacity


        if (e.keyCode == 70 || e.which == 70) {
          // 'F'
          if (fadeCount === 0) {
            document.addEventListener('wheel', EDIT.setOpacity);
          }

          fadeCount += 1;
        }
      }); // Remove all mousewheel listeners | Hide #displayOrderBtn | Handle resizing

      document.addEventListener("keyup", function (e) {
        // If any of the edit keys are released
        if (e.keyCode == 83 || e.which == 83 || // 'S'
        e.keyCode == 68 || e.which == 68 || // 'D'
        e.keyCode == 70 || e.which == 70) {
          // 'F'
          // Remove listeners
          document.removeEventListener('wheel', EDIT.setSize);
          document.removeEventListener('wheel', EDIT.setZ);
          document.removeEventListener('wheel', EDIT.setOpacity); // Reset count

          sizeCount = 0;
          fadeCount = 0;
          zCount = 0; // Hide #displayOrderBtn

          document.querySelector('#displayOrderBtn').style.display = 'none'; // If 'S' key released -> Set <img>'s new size & position 

          if (e.keyCode == 83 || e.which == 83) {
            // 'S'
            if (newWidth !== null) {
              updateImg(targ, newWidth, newHeight, newLeft, newTop);
            }
          }
        }
      });
    },
    setSize: function setSize(e) {
      var initWidth = Number(targ.style.width.slice(0, -2));
      var initHeight = Number(targ.style.height.slice(0, -2));
      var initLeft = Number(targ.style.left.slice(0, -2));
      var initTop = Number(targ.style.top.slice(0, -2));
      scale += e.deltaY * 0.0005; // Restrict scale

      scale = Math.min(Math.max(.125, scale), 4); // Apply scale transform

      targ.style.transform = "scale(".concat(scale, ")"); // Update <img> css values

      newWidth = initWidth * scale;
      newHeight = initHeight * scale;
      newLeft = initLeft - (newWidth - initWidth) / 2;
      newTop = initTop - (newHeight - initHeight) / 2;
    },
    setZ: function setZ(e) {
      // Get current
      var targZ = parseInt(targ.style.zIndex); // Set new

      if (e.deltaY > 0) {
        targZ += 1;
      } else {
        if (!targZ - 1 < 0) {
          targZ -= 1;
        }
      } // Apply new


      targ.style.zIndex = targZ; // Update #displayOrderBtn

      document.querySelector('#displayOrderBtn > span').innerHTML = targZ;
    },
    setOpacity: function setOpacity(e) {
      // Get current
      var targOpacity = Number(targ.style.opacity); // Set new

      if (e.deltaY < 0) {
        if (targOpacity - .1 > 0) {
          targOpacity -= .1;
        }
      } else {
        if (targOpacity + .1 < 1) {
          targOpacity += .1;
        }
      } // Apply new


      targ.style.opacity = targOpacity;
    }
  };
}();

exports.EDIT = EDIT;
},{}],"scripts/index.js":[function(require,module,exports) {
"use strict";

require("../styles/index.scss");

var UTIL = _interopRequireWildcard(require("./utilities.js"));

var _loadHTML = require("./loadHTML");

var _uploadImages = require("./uploadImages");

var _makeCollageImages = require("./makeCollageImages");

var _float = require("./float");

var _drag = require("./drag");

var _edit = require("./edit");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var isFloating;

var togFloating = function togFloating() {
  if (isFloating) {
    _float.FLOAT.stopFloating();

    isFloating = false;
  } else {
    _float.FLOAT.startFloating();

    isFloating = true;
  }
};

var addListenersToImgs = function addListenersToImgs() {
  return new Promise(function (resolve, reject) {
    var collageImgsCollection = Array.from(collageWrapper.children);
    collageImgsCollection.forEach(function (img) {
      img.addEventListener('click', function (e) {
        if (!e.shiftKey && !e.ctrlKey) {
          img.classList.toggle("canMove");
        }

        if (e.shiftKey) {
          _edit.EDIT.initEdit(img);
        }
      });
    });
    resolve();
  });
}; // If uploads done => make & append collage images
//  .then add event listeners to each new image
//  .then start floating action for all


var checkUploadsDone = function checkUploadsDone() {
  var allDone = false;

  if (_uploadImages.UPLOAD.isCollagePrepDone()) {
    allDone = true;
  }

  if (allDone) {
    _makeCollageImages.MAKE_IMGS.collageImages().then(addListenersToImgs()).then(isFloating = true, togFloating());
  } else {
    setTimeout(function () {
      checkUploadsDone();
    }, 1000);
  }
};

var loadEventListeners = function loadEventListeners() {
  // Handle non-editing hotkeys
  document.addEventListener("keyup", function (e) {
    // Toggle Floating - < spacebar >
    if (e.keyCode == 32 || e.which == 32) {
      togFloating();
    } // Show help modal - < h >


    if (e.keyCode == 72 || e.which == 72) {
      document.getElementById("helpBtn").click();
    }
  }); // Handle upload

  selectImagesBtn.addEventListener("change", function () {
    _uploadImages.UPLOAD.userImages().then(checkUploadsDone());
  }); // Create collage

  createCollageBtn.addEventListener("click", function () {
    UTIL.setCollageCss().then(fullscreen.requestFullscreen());
  }); // Handle fullscreen

  document.addEventListener("fullscreenchange", function () {
    UTIL.handleFullscreen().then(togFloating);
  }); // Handle drag-n-drop

  collageWrapper.addEventListener("mousedown", _drag.DRAG.dragStart, false);
  collageWrapper.addEventListener("mousemove", _drag.DRAG.drag, false);
  collageWrapper.addEventListener("mouseup", _drag.DRAG.dragEnd, false);
};

(0, _loadHTML.LOAD_HTML)().then(loadEventListeners());
},{"../styles/index.scss":"styles/index.scss","./utilities.js":"scripts/utilities.js","./loadHTML":"scripts/loadHTML.js","./uploadImages":"scripts/uploadImages.js","./makeCollageImages":"scripts/makeCollageImages.js","./float":"scripts/float.js","./drag":"scripts/drag.js","./edit":"scripts/edit.js"}],"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58396" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.js.map