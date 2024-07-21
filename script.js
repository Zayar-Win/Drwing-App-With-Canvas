let myCanvas = document.getElementById("my_canvas");
let ctx = myCanvas.getContext("2d");

const canvasProperties = {
  width: window.innerWidth,
  height: window.innerHeight,
  center: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  },
};

myCanvas.width = canvasProperties.width;
myCanvas.height = canvasProperties.height;

const stageProperties = {
  width: 600,
  height: 480,
  left: canvasProperties.center.x - 600 / 2,
  top: canvasProperties.center.y - 480 / 2,
};
const clearCanvas = () => {
  ctx.clearRect(0, 0, canvasProperties.width, canvasProperties.height);

  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvasProperties.width, canvasProperties.height);
  ctx.fillStyle = "white";
  ctx.fillRect(
    stageProperties.left,
    stageProperties.top,
    stageProperties.width,
    stageProperties.height
  );
};

clearCanvas();

let shapes = [];

let path = [];

let rectangle = {};

// myCanvas.addEventListener("pointerdown", function (e) {
//   const mousePosition = {
//     x: e.offsetX,
//     y: e.offsetY,
//   };

//   path.push(mousePosition);

//   const pointerMoveCallback = (e) => {
//     const mousePosition = {
//       x: e.offsetX,
//       y: e.offsetY,
//     };

//     path.push(mousePosition);

//     clearCanvas();
//     for (const shape of [...shapes, path]) {
//       ctx.beginPath();
//       ctx.strokeStyle = "rgba(0,0,0,0.5)";
//       ctx.moveTo(shape[0].x, shape[0].y);
//       shape.forEach((point) => {
//         ctx.lineTo(point.x, point.y);
//       });
//       ctx.stroke();
//     }
//   };

//   const pointerUpCallback = (e) => {
//     myCanvas.removeEventListener("pointermove", pointerMoveCallback);
//     myCanvas.removeEventListener("pointerup", pointerUpCallback);
//     shapes.push(path);
//     path = [];
//   };

//   myCanvas.addEventListener("pointermove", pointerMoveCallback);

//   myCanvas.addEventListener("pointerup", pointerUpCallback);
// });

myCanvas.addEventListener("pointerdown", function (e) {
  const mousePosition = {
    x: e.offsetX,
    y: e.offsetY,
  };

  rectangle.conner1 = mousePosition;
  rectangle.conner2 = mousePosition;

  const pointerMoveCallback = (e) => {
    const mousePosition = {
      x: e.offsetX,
      y: e.offsetY,
    };

    rectangle.conner2 = mousePosition;

    clearCanvas();
    for (const rect of [...shapes, rectangle]) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0,0,0,0.5)";
      ctx.strokeWidth = 5;
      const width = Math.abs(rect.conner1.x - rect.conner2.x);
      const height = Math.abs(rect.conner1.y - rect.conner2.y);
      const minX = Math.min(rect.conner1.x, rect.conner2.x);
      const minY = Math.min(rect.conner1.y, rect.conner2.y);
      ctx.rect(minX, minY, width, height);
      ctx.stroke();
    }
  };

  const pointerUpCallback = (e) => {
    myCanvas.removeEventListener("pointermove", pointerMoveCallback);
    myCanvas.removeEventListener("pointerup", pointerUpCallback);
    shapes.push(rectangle);
    rectangle = {};
  };

  myCanvas.addEventListener("pointermove", pointerMoveCallback);

  myCanvas.addEventListener("pointerup", pointerUpCallback);
});
