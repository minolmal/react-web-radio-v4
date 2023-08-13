type tEvents = "waiting" | "playing" | "ended" | "stalled" | "error";
/**
 * Audio handler object
 */
const audio = {
  _audio: null as unknown as HTMLAudioElement,
  _context: null as unknown as AudioContext,
  _source: null as unknown as MediaElementAudioSourceNode,
  _gain: null as unknown as GainNode,
  _analyser: null as unknown as AnalyserNode,
  _freq: new Uint8Array(32),
  _hasFreq: false,
  _counter: 0,
  _events: new Map<tEvents, VoidFunction>(),

  /** setup audio routing*/
  setupAudio() {
    if (this._audio && this._context) return;

    this._audio = new Audio();
    this._context = new window.AudioContext();
    this._source = this._context.createMediaElementSource(this._audio);
    this._analyser = this._context.createAnalyser();
    this._gain = this._context.createGain();

    this._analyser.fftSize = 32;
    this._source.connect(this._analyser);
    this._source.connect(this._gain);
    this._gain.connect(this._context.destination);

    this._audio.addEventListener("canplay", () => {
      this._freq = new Uint8Array(this._analyser.frequencyBinCount);
      this._audio.play();
    });

    for (const [key, value] of this._events) {
      this._audio.addEventListener(key, value);
    }
  },
  /** add event listeners to the audio api */
  on(event: tEvents, callback: VoidFunction) {
    if (event && typeof callback === "function") {
      this._events.set(event, callback);
    }
  },
  /** emit saved audio event */
  emit(event: tEvents, data: VoidFunction) {
    if (event && this._events.has(event)) {
      this._events.get(event)?.call(data);
    }
  },
  /**  update and return analyser frequency value (0-1) to control animations */
  getFreqData(playing: any) {
    if (!this._analyser) return 0;

    // this is not working on some devices running safari
    this._analyser.getByteFrequencyData(this._freq);
    let _freq = Math.floor(this._freq[4] | 0) / 255;

    // indicate that a freq value can be read
    if (!this._hasFreq && _freq) this._hasFreq = true;

    // frequency data available
    if (this._hasFreq) return _freq;

    // return fake counter if no freq data available (safari workaround)
    if (playing) {
      this._counter = this._counter < 0.6 ? this._counter + 0.01 : this._counter;
    } else {
      this._counter = this._counter > 0 ? this._counter - 0.01 : this._counter;
    }
    return this._counter;
  },
  /**  set audio volume */
  setVolume(volume: number) {
    if (!this._gain) return;
    volume = volume > 1 ? volume / 100 : volume;
    volume = volume > 1 ? 1 : volume;
    volume = volume < 0 ? 0 : volume;
    this._audio.muted = volume <= 0 ? true : false;
    this._gain.gain.value = volume;
  },
  /**  stop playing audio*/
  stopAudio() {
    if (!this._audio) return;
    try {
      this._audio.pause();
    } catch (e) {}
  },
  /**  play audio source url*/
  playSource(source: any) {
    this.setupAudio();
    this.stopAudio();

    if (this._context.state === "suspended") {
      this._context.resume().then(() => console.log("Audio context has been resumed"));
    }

    this._audio.src = String(source || "") + "?x=" + Date.now();
    this._audio.preload = "metadata";
    this._audio.crossOrigin = "anonymous";
    this._audio.autoplay = false;
    this._audio.load();
  },
};

export default audio;
