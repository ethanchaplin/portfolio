<script setup lang="ts">
import paper from "paper";
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
const grey = new paper.Color(0.5, 0.5, 0.5);
const white = new paper.Color(0.7, 0.7, 0.7);
const running = ref(true);
const konamiPattern = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let current = 0;
let colorMode = false;

class MovingPoint {
  point: paper.Path.Circle;
  velocity: number;
  direction: number;
  id: string;
  color: paper.Color;
  constructor(
    point: paper.Path.Circle,
    velocity: number,
    direction: number,
    color: paper.Color
  ) {
    this.point = point;
    this.velocity = velocity;
    this.direction = direction;
    this.id = crypto.randomUUID();
    this.color = color;
  }
}

let movCircleList: MovingPoint[] = [];

const keyHandler = (event: KeyboardEvent) => {
  if (
    konamiPattern.indexOf(event.key) < 0 ||
    event.key !== konamiPattern[current]
  ) {
    current = 0;
    return;
  }

  current++;

  if (konamiPattern.length === current) {
    current = 0;
    colorMode = !colorMode;
    movCircleList.forEach((value) => {
      value.point.strokeColor = colorMode ? value.color : grey;
      value.point.fillColor = colorMode ? value.color : grey;
      value.point.shadowColor = colorMode ? value.color : white;
    });
  }
};

document.addEventListener("keydown", keyHandler, false);

let canvas: HTMLCanvasElement;
onMounted(() => {
  canvas = <HTMLCanvasElement>document.getElementById("bg-canvas");
  paper.setup(canvas);
  window.onresize = () => {
    paper.view.bounds.height = window.innerHeight;
    paper.view.bounds.width = window.innerWidth;
  };
  paper.project.view.onClick = (event: any) => {
    const point = event.point;
    const path = new paper.Path.Circle(point, 6);
    const randomColor = new paper.Color(
      Math.random(),
      Math.random(),
      Math.random()
    );
    path.strokeColor = colorMode ? randomColor : grey;
    path.fillColor = colorMode ? randomColor : grey;
    path.shadowColor = colorMode ? randomColor : white;
    path.shadowBlur = 20;
    randomColor.brightness = 1;
    const movCirc = new MovingPoint(
      path,
      Math.random() * 0.25,
      Math.random() * 360,
      randomColor
    );
    movCircleList.push(movCirc);
  };
  for (let i = 0; i < 35; i++) {
    const randomColor = new paper.Color(
      Math.random(),
      Math.random(),
      Math.random()
    );
    randomColor.brightness = 1;
    const start = new paper.Point(
      paper.project.view.bounds.right * Math.random(),
      paper.project.view.bounds.bottom * Math.random()
    );
    const path = new paper.Path.Circle(start, 6);
    path.strokeColor = colorMode ? randomColor : grey;
    path.fillColor = colorMode ? randomColor : grey;
    path.shadowBlur = 20;
    path.shadowColor = colorMode ? randomColor : white;
    const movCirc = new MovingPoint(
      path,
      Math.random() * 0.1,
      Math.random() * 360,
      randomColor
    );
    movCircleList.push(movCirc);
  }
  paper.view.update();
});

onBeforeRouteLeave(() => {
  running.value = false;
});

const mod = (a: number, b: number) => {
  return ((a % b) + b) % b;
};

const update = (
  timestamp: DOMHighResTimeStamp,
  prevTime: DOMHighResTimeStamp
) => {
  let pathList: paper.Path[] = [];
  let connections: string[] = [];
  if (timestamp !== prevTime) {
    const delta = timestamp - prevTime;
    movCircleList.forEach((value) => {
      const currentPoint = value.point.position;
      const dirRadians = (value.direction * Math.PI) / 180;
      const newPoint = new paper.Point(
        mod(
          currentPoint.x +
            (value.velocity * Math.cos(dirRadians)) / (1 / delta),
          paper.project.view.bounds.right
        ),
        mod(
          currentPoint.y +
            (value.velocity * Math.sin(dirRadians)) / (1 / delta),
          paper.project.view.bounds.bottom
        )
      );
      value.point.position = newPoint;

      let closest = 10000;
      let closeCircle: MovingPoint = value;
      movCircleList.forEach((compare) => {
        let checkDistance = value.point.position.getDistance(
          compare.point.position,
          false
        );
        if (
          checkDistance < closest &&
          compare !== value &&
          !connections.includes(compare.id + value.id) &&
          !connections.includes(value.id + compare.id)
        ) {
          closest = checkDistance;
          closeCircle = compare;
        }
      });

      const path = new paper.Path();

      const grad = new paper.Gradient();
      grad.stops = [
        new paper.GradientStop(value.color, 0),
        new paper.GradientStop(closeCircle.color, 1),
      ];
      const gradColor = new paper.Color(
        grad,
        value.point.position,
        closeCircle.point.position
      );
      path.strokeColor = colorMode ? gradColor : grey;

      path.strokeWidth = 3;
      path.shadowBlur = 30;
      path.shadowColor = colorMode ? value.color : white;
      path.moveTo(value.point.position);
      path.lineTo(closeCircle.point.position);
      pathList.push(path);
      connections.push(value.id + closeCircle.id);
    });
  }
  let prevTimestamp = timestamp;
  paper.view.update();
  pathList.forEach((path) => {
    path.remove();
    connections.pop();
  });
  if (running.value) {
    window.requestAnimationFrame((timestamp) => {
      update(timestamp, prevTimestamp);
    });
  }
};
window.requestAnimationFrame((timestamp) => {
  update(timestamp, timestamp);
});
</script>

<template>
  <canvas id="bg-canvas"></canvas>
  <div class="center-box">
    <div class="abs">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.abs {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  z-index: 5;
  backdrop-filter: blur(3px);
  padding: 3rem;
}
.center-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#bg-canvas {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
