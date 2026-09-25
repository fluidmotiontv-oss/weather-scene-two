/**
 * Dragon 9 Fluid Motion - Web Audio Synthesizer Engine
 * Synthesizes real-time 432Hz Harmonic Tones, Ocean Tube Noise, Alpine Blizzard Howl, and Feed Glitches.
 */

class DragonAudioEngine {
  private ctx: AudioContext | null = null;
  private is432HzActive = false;
  private oscillator432: OscillatorNode | null = null;
  private gain432: GainNode | null = null;
  
  private waveNoiseNode: AudioNode | null = null;
  private waveGain: GainNode | null = null;
  
  private windNoiseNode: AudioNode | null = null;
  private windGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toggle 432Hz Harmonic Drone Tone
  public toggle432HzHarmonic(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.is432HzActive) {
      // Fade out
      if (this.gain432) {
        this.gain432.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
        setTimeout(() => {
          this.oscillator432?.stop();
          this.oscillator432?.disconnect();
          this.gain432?.disconnect();
          this.oscillator432 = null;
          this.gain432 = null;
        }, 150);
      }
      this.is432HzActive = false;
      return false;
    } else {
      // Start 432Hz Oscillator + Harmonics
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, this.ctx.currentTime); // Pure 432Hz

      // Add sub-harmonic at 216Hz and third harmonic at 864Hz for richness
      const subOsc = this.ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(216, this.ctx.currentTime);
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 1.2);

      subOsc.connect(subGain);
      subGain.connect(gain);
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      subOsc.start();

      this.oscillator432 = osc;
      this.gain432 = gain;
      this.is432HzActive = true;
      return true;
    }
  }

  public getIs432HzActive(): boolean {
    return this.is432HzActive;
  }

  // Play cinematic feed switch glitch + bass drop sound
  public playFeedSwitchSound() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Sub bass drop
    const bassOsc = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();

    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(160, now);
    bassOsc.frequency.exponentialRampToValueAtTime(32, now + 0.6);

    bassGain.gain.setValueAtTime(0.35, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    bassOsc.connect(bassGain);
    bassGain.connect(this.ctx.destination);
    bassOsc.start(now);
    bassOsc.stop(now + 0.6);

    // Glitch chirp noise
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.Q.setValueAtTime(8, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    noise.start(now);
  }

  // Play ambient location audio soundscape (Ocean Wave Spitting Barrels or Alpine Blizzard)
  public playAmbientSoundscape(type: 'surf' | 'alpine' | 'off') {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Stop current ambience
    if (this.waveGain) {
      this.waveGain.gain.setTargetAtTime(0, now, 0.2);
    }
    if (this.windGain) {
      this.windGain.gain.setTargetAtTime(0, now, 0.2);
    }

    if (type === 'off') return;

    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    if (type === 'surf') {
      // Lowpass wave rumble + modulated spray
      const lowFilter = this.ctx.createBiquadFilter();
      lowFilter.type = 'lowpass';
      lowFilter.frequency.setValueAtTime(450, now);

      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 1.5);

      // LFO for wave pumping effect
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.25, now); // Every 4 seconds wave pulse
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(250, now);

      lfo.connect(lfoGain);
      lfoGain.connect(lowFilter.frequency);

      noiseSource.connect(lowFilter);
      lowFilter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      lfo.start(now);
      noiseSource.start(now);
      this.waveGain = gainNode;
      this.waveNoiseNode = noiseSource;
    } else if (type === 'alpine') {
      // Bandpass howling wind filter
      const bandFilter = this.ctx.createBiquadFilter();
      bandFilter.type = 'bandpass';
      bandFilter.frequency.setValueAtTime(800, now);
      bandFilter.Q.setValueAtTime(3.5, now);

      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 1.2);

      // LFO for howling wind gusts
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.4, now);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(600, now);

      lfo.connect(lfoGain);
      lfoGain.connect(bandFilter.frequency);

      noiseSource.connect(bandFilter);
      bandFilter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      lfo.start(now);
      noiseSource.start(now);
      this.windGain = gainNode;
      this.windNoiseNode = noiseSource;
    }
  }
}

export const audioEngine = new DragonAudioEngine();
