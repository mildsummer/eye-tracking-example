import EyeTracker from './EyeTracker';

const stopButton = document.getElementById('stopButton');
const eyeTracker = new EyeTracker((eyeCenter, faceSize) => {
  console.log(eyeCenter, faceSize);
});
stopButton.addEventListener('click', () => {
  eyeTracker.stop();
});
