var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = window.innerHeight;
context.canvas.width = window.innerWidth;

rectangle = {

  height:32,
  jumping:true,
  width:32,
  x:450, // center of the canvas
  x_velocity:0,
  y:300,
  y_velocity:0

};

controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 65:// left key
        controller.left = key_state;
      break;
      case 87:// up key
        controller.up = key_state;
      break;
      case 68:// right key
        controller.right = key_state;
      break;
      case 83:// right key
        controller.down = key_state;
      break;

    }

  }

};

loop = function() {
  if(controller.down){
      rectangle.y_velocity += 5;
  }

  if (controller.up) {

    rectangle.y_velocity -= 5;
    

  }

  if (controller.left) {

    rectangle.x_velocity -= 5;

  }

  if (controller.right) {

    rectangle.x_velocity += 5;

  }

  
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0;// friction
  rectangle.y_velocity *= 0;// friction

  // if rectangle is falling below floor line
  if (rectangle.y > window.innerHeight - 32) {

    rectangle.y = window.innerHeight - 32;
    rectangle.y_velocity = 0;

  } else if(rectangle.y < 0) {
    rectangle.y = 0;
    rectangle.y_velocity = 0;
  }

  // if rectangle is going off the left of the screen
  if (rectangle.x < 32 - 32) {

    rectangle.x = 32 - 32;
    rectangle.x_velocity = 0;

  } else if (rectangle.x > window.innerWidth - 32) {// if rectangle goes past right boundary

    rectangle.x = window.innerWidth - 32;
    rectangle.x_velocity = 0;

  }

  context.fillStyle = "#bebebe";
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);// x, y, width, height

  context.fillStyle = "#ff0000";// hex for red
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();

 

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);