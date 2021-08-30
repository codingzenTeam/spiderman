var engine = Matter.Engine.create();
var render = Matter.Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
  },
});

var spidey = Matter.Bodies.rectangle(100, 100, 20, 40, { inertia: Infinity, label: 'player' });
var spideystand = [
  "Stance1.png",
  "Stance2.png",
  "Stance3.png",
  "Stance4.png",
  "Stance5.png",
  "Stance6.png",
  "Stance7.png",
  "Stance8.png",
  "Stance9.png",
  "Stance10.png",
  "Stance11.png",
  "Stance12.png",
  "Stance13.png",
  "Stance14.png",
  "Stance15.png",
  "Stance16.png",
  "Stance17.png",
  "Stance18.png",
  "Stance19.png",
  "Stance20.png",
  "Stance21.png",
  "Stance22.png",
  "Stance23.png",
  "Stance24.png",
  "Stance25.png",
  "Stance26.png",
  "Stance27.png",
  "Stance28.png",
  "Stance29.png",
  "Stance30.png",
];
var running = [
  "Run3.png",
  "Run4.png",
  "Run5.png",
  "Run6.png",
  "Run7.png",
  "Run8.png",
  "Run9.png",
  "Run10.png",
  "Run11.png",
  "Run12.png",
  "Run13.png",
  "Run14.png",
  "Run15.png",
  "Run16.png",
];
let Base = Matter.Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
  Wall1 = Matter.Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
  Wall2 = Matter.Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
  Roof = Matter.Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
  rec2 = Matter.Bodies.rectangle(230, 300, 100, 100, { isStatic: true }),
  rec1 = Matter.Bodies.rectangle(30, 500, 200, 200, { isStatic: true }),
  rec3 = Matter.Bodies.rectangle(655, 500, 250, 200, { isStatic: true }),
  rec4 = Matter.Bodies.rectangle(330, 550, 400, 50, {
    isStatic: true,
    render: { fillStyle: "blue" }, label: 'water'
  });

 goal = Matter.Bodies.rectangle(730, 350, 50, 50, {
    isStatic: true,
    render: { fillStyle: "green" }, label: 'end'
  });
var constraint1 = Matter.Constraint.create({
  bodyA: spidey,
  bodyB: rec2,
  pointA: { x: 25, y: -3.95 },

  //damping: 0.1
});
Matter.World.add(engine.world, [
  spidey,
  Wall1,
  Wall2,
  Roof,
  Base,
  rec2,
  rec1,
  rec3,
  rec4,
    goal
]);
Matter.Engine.run(engine);
Matter.Render.run(render);
var a = 0;
var i = 0;
var killua = "gon";
function killgon() {
  if (i == 29) {
    i = 0;
  } else {
    i = i + 1;
  }
  spidey.render.sprite.texture = spideystand[i];
}
function run() {
  if (a == 13) {
    a = 0;
  } else {
    a++;
  }
  spidey.render.sprite.texture = running[a];
}

Matter.Events.on(engine, "beforeUpdate", function (event) {
  if (killua == "gon") {
    killgon();
  }
  if (killua == "running") {
    run();
  }
});

document.addEventListener("keydown", function (bla) {
  if (bla.keyCode == 38) {
    Matter.Body.applyForce(
      spidey,
      { x: spidey.position.x, y: spidey.position.y },
      { x: 0, y: -0.05 }
    );
  }

  if (bla.keyCode == 39) {
    Matter.Body.applyForce(
      spidey,
      { x: spidey.position.x, y: spidey.position.y },
      { x: 0.01, y: 0 }
    );
    killua = "running";
  }
  if (bla.keyCode == 40) {
    Matter.Body.applyForce(
      spidey,
      { x: spidey.position.x, y: spidey.position.y },
      { x: 0, y: 0.05 }
    );
  }
  if (bla.keyCode == 37) {
    Matter.Body.applyForce(
      spidey,
      { x: spidey.position.x, y: spidey.position.y },
      { x: -0.01, y: 0 }
    );
  }
  if (bla.keyCode == 87) {
    Matter.World.add(engine.world, [constraint1]);
  }
  if (bla.keyCode == 69) {
    Matter.World.remove(engine.world, [constraint1]);
  }
});
document.addEventListener("keyup", function (bla) {
  if (bla.keyCode == 38) {
  }

  if (bla.keyCode == 39) {
    killua = "gon";
  }
  if (bla.keyCode == 40) {
  }
});
var m = 320;
var b = 160;
var c = 1;
Matter.Events.on(engine, "beforeUpdate", function (event) {
  c += 0.014;
  var pan = 320 + 100 * Math.sin(c);
  Matter.Body.setPosition(rec2, { x: pan, y: b });
});


function collisiontest(f) {
  f.pairs.forEach((pair) => {
    const { label: labelA } = pair.bodyA;
    const { label: labelB } = pair.bodyB;

    if (labelA == "player" && labelB == "water") {
        alert("Oh No, Spidey drowned!");
        location.reload();
    }
      
    else if (labelA == "player" && labelB == "end") {
        alert("Yay! Spidey reached the goal!");
        location.reload();
    }
      else{
         // console.log(labelA+" "+labelB);
      }

});
}
Matter.Events.on(engine, "collisionStart", collisiontest);


