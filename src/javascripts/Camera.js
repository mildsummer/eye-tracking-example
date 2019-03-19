export default class Camera {
  constructor(callback) {
    this.callback = callback;
    const medias = {
      audio : false,
      video : true
    };
    this.video = document.createElement('video');
    this.video.setAttribute('autoplay', 'autoplay');
    this.video.setAttribute('playsinline', 'playsinline');
    this.video.width = 400;
    this.video.height = 300;
    document.body.appendChild(this.video);
    navigator.mediaDevices.getUserMedia(medias)
      .then(this.onSuccess.bind(this))
      .catch(this.onError.bind(this));
  }

  onSuccess(stream) {
    this.video.srcObject = stream;
    this.stream = stream;
    if (this.callback) {
      this.callback(this);
    }
  }

  onError(error) {
    window.alert(error);
  }

  stop() {
    this.stream.getVideoTracks().forEach((track) => {
      track.stop();
    });
  }
}
