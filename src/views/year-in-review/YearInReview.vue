<script setup lang="ts">
import { onMounted } from "vue";
import paper from "paper";
import { useRouter } from "vue-router";

let refreshRate: any = 30;

let router = useRouter();

const getRefreshRate = () => {
  let trialSum = 0;
  const numTrials = 20;
  const trial: (
    currentTime: DOMHighResTimeStamp,
    prevTime: DOMHighResTimeStamp,
    trialNum: number,
    resolve: any
  ) => any = (
    currentTime: DOMHighResTimeStamp,
    prevTime: DOMHighResTimeStamp,
    trialNum: number,
    resolve: any
  ) => {
    if (trialNum != numTrials) {
      trialSum += currentTime - prevTime;
      requestAnimationFrame((ts) =>
        trial(ts, currentTime, trialNum + 1, resolve)
      );
    } else {
      resolve(1000 / (trialSum / numTrials));
    }
  };
  return new Promise((resolve) =>
    requestAnimationFrame((time) =>
      requestAnimationFrame((ts) => trial(ts, time, 0, resolve))
    )
  );
};
const spiral = (
  t: number,
  s: number,
  o: number,
  center: paper.Point
): paper.Point => {
  return new paper.Point(
    s * t * Math.cos(t + o) + center.x,
    s * t * Math.sin(t + o) + center.y
  );
};

let groups: paper.Path.Circle[] = [];

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
  const durationFrames: number = Math.ceil((duration / 1000) * refreshRate);

  const offsets: number[] = [0, Math.PI];
  const gradientA = (i: number): number[] => {
    return gradient(hexToTuple("EE4673"), hexToTuple("FF7926"), i / numDots);
  };

  const gradientB = (i: number): number[] => {
    return gradient(hexToTuple("04E762"), hexToTuple("00A1E4"), i / numDots);
  };

  const gradientC = (i: number): number[] => {
    return gradient(hexToTuple("FFFFFF"), hexToTuple("FF0000"), i / numDots);
  };

  const gradients: ((i: number) => number[])[] = [
    gradientA,
    gradientB,
    gradientC,
  ];

  const generateFrame = (frameCount: number): void => {
    const progress: number = frameCount / durationFrames;
    const currentDot: number = Math.floor(progress * numDots);

    const leg: number = currentDot % numYears;

    const circ: paper.Path.Circle = new paper.Path.Circle(
      spiral(
        Math.floor(currentDot / numYears) *
          ((numRotations * 2 * Math.PI) / (numDots - 1)),
        scale,
        offsets[leg],
        center
      ),
      Math.floor(currentDot / numYears) * circleSize
    );

    const color: number[] = gradients[leg](currentDot);

    circ.fillColor = new paper.Color(color[0], color[1], color[2]);
    circ.shadowColor = circ.fillColor;
    circ.name = `l${leg}_${circ.id}`;
    groups.push(circ);
    circ.onMouseEnter = () => {
      paper.view.element.style.cursor = "pointer";
      groups.forEach((circle) => {
        if (circle.name.substring(0, 2) === circ.name.substring(0, 2)) {
          circle.shadowBlur = 20;
        }
      });
    };
    circ.onMouseLeave = () => {
      groups.forEach((circle) => {
        paper.view.element.style.cursor = "default";
        if (circle.name.substring(0, 2) === circ.name.substring(0, 2)) {
          circle.shadowBlur = 0;
        }
      });
    };
    circ.onClick = () => {
      if (circ.name.substring(0, 2) === "l0") {
        router.push("/");
      }
    };
    paper.view.update();

    if (frameCount < durationFrames) {
      window.requestAnimationFrame(() => generateFrame(frameCount + 1));
    }
  };

  window.requestAnimationFrame(() => generateFrame(0));
};

onMounted(async () => {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById("paper-blobs")
  );
  paper.setup(canvas);
  const center: paper.Point = new paper.Point(
    paper.view.bounds.width / 2,
    paper.view.bounds.height / 2
  );
  // refreshRate = await getRefreshRate();
  animateLegs(2500, 65, 2, center, 4, 15, 3);

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
