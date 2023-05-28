<script setup lang="ts">
import paper from "paper";
import { onMounted } from "vue";

const grey = new paper.Color(0.5, 0.5, 0.5);
const white = new paper.Color(0.7, 0.7, 0.7);

class MovingPoint {
  point: paper.Path.Circle;
  velocity: number;
  direction: number;
  id: string;
  constructor(point: paper.Path.Circle, velocity: number, direction: number) {
    this.point = point;
    this.velocity = velocity;
    this.direction = direction;
    this.id = crypto.randomUUID();
  }
}

let movCircleList: MovingPoint[] = [];
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
    path.strokeColor = grey;
    path.fillColor = grey;
    path.shadowBlur = 20;
    path.shadowColor = white;
    const movCirc = new MovingPoint(
      path,
      Math.random() * 15,
      Math.random() * 360
    );
    movCircleList.push(movCirc);
  };
  for (let i = 0; i < 15; i++) {
    const start = new paper.Point(
      paper.project.view.bounds.right * Math.random(),
      paper.project.view.bounds.bottom * Math.random()
    );
    const path = new paper.Path.Circle(start, 6);
    path.strokeColor = grey;
    path.fillColor = grey;
    path.shadowBlur = 20;
    path.shadowColor = white;
    const movCirc = new MovingPoint(
      path,
      Math.random() * 7,
      Math.random() * 360
    );
    movCircleList.push(movCirc);
  }
  paper.view.update();
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
          currentPoint.x + (value.velocity * Math.cos(dirRadians)) / delta,
          paper.project.view.bounds.right
        ),
        mod(
          currentPoint.y + (value.velocity * Math.sin(dirRadians)) / delta,
          paper.project.view.bounds.bottom
        )
      );
      value.point.position = newPoint;

      let closest = 1000000;
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
      path.strokeColor = grey;
      path.strokeWidth = 3;
      path.shadowBlur = 30;
      path.shadowColor = white;
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
  requestAnimationFrame((timestamp) => {
    update(timestamp, prevTimestamp);
  });
};
requestAnimationFrame((timestamp) => {
  update(timestamp, timestamp);
});
</script>

<template>
  <canvas id="bg-canvas"></canvas>
  <div class="abs">
    <slot></slot>
  </div>
</template>

<style scoped>
.abs {
  position: relative;
  z-index: 5;
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
