/// <reference types="vite/client" />
declare module "typewriter-effect/dist/core";
declare module "album-art";
declare module '*.mp3' {
  const src: string;
  export default src;
}
