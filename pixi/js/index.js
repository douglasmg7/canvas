'use strict';

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}

PIXI.utils.sayHello(type)

//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

// http://pixijs.download/release/docs/PIXI.Application.html
//Create a Pixi Application
let app = new Application({ 
    width: 256, 
    height: 256,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
}
);

// Not working.
// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
// app.renderer.autoResize = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);

// app.renderer.backgroundColor = 0x061639;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
loader
    .add("./img/cat.png")
    .load(setup);

let cat;
//This `setup` function will run when the image has loaded
function setup() {
    //Create the cat sprite
    cat = new Sprite(loader.resources["./img/cat.png"].texture);
    // cat.x = 96;
    // cat.y = 96;
    // cat.position.set(96, 96);

    //Change the sprite's size
    // cat.width = 80;
    // cat.height = 120;

    // cat.scale.x = 0.5;
    // cat.scale.y = 0.5;
    // cat.scale.set(0.5, 0.5);

    //Add the cat to the stage
    app.stage.addChild(cat);

    //Start the game loop by adding the `gameLoop` function to
    //Pixi's `ticker` and providing it with a `delta` argument.
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
  //Move the cat 1 pixel 
  // cat.x += 1;
  cat.x += delta/10;
}
