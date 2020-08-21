
// Float Controller
const FLOAT = (function(){

  // PRIVATE 
    const boxWidth = screen.width;
    const boxHeight = screen.height;
    const speedX = .25;
    const speedY = .5;
    let floaters;
    let timer;

    function floatInterval(){ timer = setInterval(float, 15); }

    function float(){
      floaters.forEach(function(floater){
        let posX = Number(floater.style.left.slice(0, -2));
        let posY = Number(floater.style.top.slice(0, -2));
        let nextLeft = posX + dirX(floater) * speedX;
        let nextTop = posY + dirY(floater) * speedY;

        handleCollisions(floater, nextLeft, nextTop);

        posX += dirX(floater) * speedX;
        posY += dirY(floater) * speedY;

        if(!floater.classList.contains("isSelected") && floater.classList.contains("canMove")){
          floater.style.left = posX + 'px';
          floater.style.top = posY + 'px';
        }
      });
    }

    function handleCollisions(floater, nextLeft, nextTop){
      let nextRight = nextLeft + Number(floater.style.width.slice(0, -2));
      let nextBottom = nextTop + Number(floater.style.height.slice(0, -2));

      // X-AXIS - If floater's about to go out-of-bounds on the x-axis
      if(nextLeft <= 0 || nextRight >= boxWidth){
        // Reverse its direction of movement on the x-axis
        if(dirX(floater) < 0){
          // Start moving to the right
          floater.setAttribute("data-dx", "1");
        } else{
          // Start moving to the left
          floater.setAttribute("data-dx", "-1");
        }
      }

      // Y-AXIS - If floater's about to go out-of-bounds on the y-axis
      if(nextTop <= 0 || nextBottom >= boxHeight){
        // Reverse its direction of movement on the y-axis
        if(dirY(floater) < 0){
          floater.setAttribute("data-dy", "1");
        } else{
          floater.setAttribute("data-dy", "-1");
        }
      }
    }

    function dirX(floater){return parseInt(floater.getAttribute("data-dx"));}
    function dirY(floater){return parseInt(floater.getAttribute("data-dy"));
  }

  // PUBLIC _________________________________________________________
  return {
    startFloating: function(){
      floaters = document.querySelectorAll('.floater');
      floatInterval();
    },
    stopFloating: function(){ clearInterval(timer); }
  }
})();

export { FLOAT }
