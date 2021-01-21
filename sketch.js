const  Engine = Matter.Engine;
const  World = Matter.World;
const  Events = Matter.Events;
const  Bodies = Matter.Bodies;
 
//var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var particles;
var turn =0;
var gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

}
 


function draw() {
  background("black");
  textSize(20)
 text("Score : "+score,20,30);
 text("turn: "+turn,20,50);
 
  Engine.update(engine);

   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

  for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
  }

    if(particles!=null){
    
     particles.display();
     
      if(particles.body.position.y>760){
        if(particles.body.position.x<600 && particles.body.position.x>301){
          score=score+100;
          particles=null;
 
          if(turn >= 5) {
            gameState = "end";
          }
        }

          else if(particles.body.position.x<900 && particles.body.position.x>601){
            score=score+200;
            particles=null;
    
            if(turn >= 5) {
               gameState = "end";
             }
           }

        else if(particles.body.position.x<300){
          score=score+500;
          particles=null;

          if(turn >= 5) {
            gameState = "end";
          }
        }
      }
  
    }

    if(gameState === "end"){
      textSize(30);
      text("Game Over",400,400);
      
    }

    if(keyCode=32){
      turn = 5;
      score = 0;
      gameState="play";
    }
  }

    function mousePressed () {
  if(gameState !== "end") {
    turn++
    particles=new Particle(mouseX,10,10,10);
  }
}