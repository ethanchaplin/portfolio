<script setup lang="ts">
import { onMounted } from "vue";
import paper from "paper";

const spiral = (t: number, s: number, center: paper.Point): paper.Point => {
  return new paper.Point(
    s * t * Math.cos(t) + center.x,
    s * t * Math.sin(t) + center.y
  );
};

const gradient = (
  colorA: number[],
  colorB: number[],
  percent: number
): number[] => {
  let result: number[] = [];

  for (let i = 0; i < 3; i++) {
    let componentA = colorA[i];
    let componentB = colorB[i];

    let interpolatedValue = componentA + (componentB - componentA) * percent;

    result.push(interpolatedValue);
  }

  return result;
};

const hexToTuple = (color: string): number[] => {
  color = color.replace("#", "");
  const r = color.substring(0, 2);
  const g = color.substring(2, 4);
  const b = color.substring(4, 6);
  return [parseInt(r, 16) / 255, parseInt(g, 16) / 255, parseInt(b, 16) / 255];
};

const animateLegs = (
  duration: number,
  numDots: number,
  numYears: number,
  center: paper.Point,
  numRotations: number,
  scale: number = 15,
  circleSize: number = 3
): void => {
  const frameRate: number = 30; // Number of frames per second
  const durationFrames: number = Math.ceil((duration / 1000) * frameRate);

  const offsets: number[] = [1, -1];

  const gradientA = (i: number): number[] => {
    return gradient(hexToTuple("FF00FF"), hexToTuple("00FFFF"), i / numDots);
  };

  const gradientB = (i: number): number[] => {
    return gradient(hexToTuple("aaFF00"), hexToTuple("FFFF00"), i / numDots);
  };

  const gradients: ((i: number) => number[])[] = [gradientA, gradientB];

  const generateFrame = (frameCount: number): void => {
    const progress: number = frameCount / durationFrames;
    const currentDot: number = Math.floor(progress * numDots);

    const leg: number = currentDot % numYears;

    const circ: paper.Path.Circle = new paper.Path.Circle(
      spiral(
        Math.floor(currentDot / 2) *
          ((numRotations * 2 * Math.PI) / (numDots - 1)),
        offsets[leg] * scale,
        center
      ),
      Math.floor(currentDot / 2) * circleSize
    );

    const color: number[] = gradients[leg](currentDot);

    circ.fillColor = new paper.Color(color[0], color[1], color[2]);
    circ.shadowColor = circ.fillColor;
    paper.view.update();

    if (frameCount < durationFrames) {
      window.requestAnimationFrame(() => generateFrame(frameCount + 1));
    }
  };

  window.requestAnimationFrame(() => generateFrame(0));
};

onMounted(() => {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById("paper-blobs")
  );
  paper.setup(canvas);
  const center: paper.Point = new paper.Point(
    paper.view.bounds.width / 2,
    paper.view.bounds.height / 2
  );

  animateLegs(5000, 50, 2, center, 3, 15, 3);

  paper.view.update();
});
</script>

<template>
  <head>
    <title>Ethan Chaplin — Year In Review</title>
  </head>
  <canvas id="paper-blobs"></canvas>
</template>

<style scoped>
#paper-blobs {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
