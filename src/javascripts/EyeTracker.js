import Camera from './Camera';

const clm = window.clm;
const pow = Math.pow;
const sqrt = Math.sqrt;

export default class EyeTracker {
  constructor(callback) {
    this.tracker = new clm.tracker();
    this.tracker.init();
    this.onLoop = this.onLoop.bind(this);
    this.callback = callback;
    this.camera = new Camera((camera) => {
      this.tracker.start(camera.video);
      this.onLoop();
    });
  }

  onLoop() {
    window.requestAnimationFrame(this.onLoop);
    const positions = this.tracker.getCurrentPosition();
    if (positions) {
      const rightEye = [positions[27][0], positions[27][1]];
      const leftEye = [positions[32][0], positions[32][1]];
      const faceRight = [positions[1][0], positions[1][1]];
      const faceLeft = [positions[13][0], positions[13][1]];
      const eyeCenter = [(rightEye[0] + leftEye[0]) / 2, (rightEye[1] + leftEye[1]) / 2];
      const faceSize = sqrt(pow(faceRight[0] - faceLeft[0], 2) + pow(faceRight[1] - faceLeft[1], 2));
      this.callback(eyeCenter, faceSize);
    }
  }

  stop() {
    this.tracker.stop();
    this.camera.stop();
  }
}
