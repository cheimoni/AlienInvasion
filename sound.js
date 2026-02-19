/**
 * Sound Manager for AlienInvasion
 * Uses Web Audio API to generate procedural sounds
 */
var SoundManager = new function() {
    var audioContext = null;
    var masterVolume = 0.5;
    var sfxVolume = 0.7;
    var musicVolume = 0.3;
    var muted = false;
    var musicNode = null;
    var musicGain = null;

    // Initialize Audio Context
    this.init = function() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log("Sound system initialized");
        } catch(e) {
            console.log("Web Audio API not supported");
        }
    };

    // Resume audio context (needed for browsers that suspend it)
    this.resume = function() {
        if(audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
    };

    // Set volumes
    this.setMasterVolume = function(vol) { masterVolume = Math.max(0, Math.min(1, vol)); };
    this.setSfxVolume = function(vol) { sfxVolume = Math.max(0, Math.min(1, vol)); };
    this.setMusicVolume = function(vol) { musicVolume = Math.max(0, Math.min(1, vol)); };

    // Mute/Unmute
    this.toggleMute = function() {
        muted = !muted;
        if(musicGain) musicGain.gain.value = muted ? 0 : masterVolume * musicVolume;
        return muted;
    };
    this.isMuted = function() { return muted; };

    // Helper: Play a tone
    function playTone(frequency, duration, type, volume, delay) {
        if(!audioContext || muted) return;

        delay = delay || 0;
        type = type || 'square';
        volume = volume || 1;

        var oscillator = audioContext.createOscillator();
        var gainNode = audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + delay);

        gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(volume * masterVolume * sfxVolume, audioContext.currentTime + delay + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + delay + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(audioContext.currentTime + delay);
        oscillator.stop(audioContext.currentTime + delay + duration);
    }

    // Helper: Play noise
    function playNoise(duration, volume) {
        if(!audioContext || muted) return;

        var bufferSize = audioContext.sampleRate * duration;
        var buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        var data = buffer.getChannelData(0);

        for(var i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        var noise = audioContext.createBufferSource();
        noise.buffer = buffer;

        var gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(volume * masterVolume * sfxVolume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        var filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1000;

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        noise.start();
        noise.stop(audioContext.currentTime + duration);
    }

    // === SOUND EFFECTS ===

    // Player shooting - sweeping laser
    this.playShoot = function() {
        if(!audioContext || muted) return;
        this.resume();
        var osc = audioContext.createOscillator();
        var gain = audioContext.createGain();
        osc.type = 'sawtooth';
        // Sweep from high to low — classic sci-fi laser feel
        osc.frequency.setValueAtTime(1400, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(350, audioContext.currentTime + 0.13);
        gain.gain.setValueAtTime(0.22 * masterVolume * sfxVolume, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.15);
        // Thin harmonic layer
        playTone(2800, 0.06, 'sine', 0.08);
    };

    // Missile impact (non-lethal hit tick)
    this.playImpact = function() {
        if(!audioContext || muted) return;
        playTone(880, 0.035, 'square', 0.10);
        playTone(550, 0.04,  'square', 0.07, 0.02);
    };

    // Rocket launch
    this.playRocket = function() {
        if(!audioContext || muted) return;
        playTone(150, 0.3, 'sawtooth', 0.4);
        playTone(100, 0.4, 'square', 0.3, 0.1);
        playNoise(0.2, 0.2);
    };

    // Explosion
    this.playExplosion = function() {
        if(!audioContext || muted) return;
        playNoise(0.3, 0.5);
        playTone(100, 0.2, 'sawtooth', 0.4);
        playTone(60, 0.3, 'square', 0.3, 0.1);
    };

    // Enemy death
    this.playEnemyDeath = function() {
        if(!audioContext || muted) return;
        playTone(400, 0.1, 'square', 0.2);
        playTone(200, 0.1, 'square', 0.2, 0.05);
        playTone(100, 0.1, 'square', 0.2, 0.1);
    };

    // Mothership warp-in (descending frequency sweep + rumble)
    this.playWarp = function() {
        if(!audioContext || muted) return;
        var osc = audioContext.createOscillator();
        var gain = audioContext.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(700, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(55, audioContext.currentTime + 0.9);
        gain.gain.setValueAtTime(0.28 * masterVolume * sfxVolume, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.0);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 1.05);
        playNoise(0.55, 0.22);
        playTone(48, 0.65, 'sine', 0.32, 0.12);
    };

    // Boss/Mothership death - big explosion
    this.playBossDeath = function() {
        if(!audioContext || muted) return;
        for(var i = 0; i < 5; i++) {
            playNoise(0.5, 0.4);
            playTone(80 - i*10, 0.3, 'sawtooth', 0.5, i * 0.1);
        }
        playTone(50, 0.5, 'square', 0.6, 0.3);
    };

    // Power-up collected
    this.playPowerUp = function() {
        if(!audioContext || muted) return;
        playTone(523, 0.1, 'sine', 0.3);      // C5
        playTone(659, 0.1, 'sine', 0.3, 0.1); // E5
        playTone(784, 0.15, 'sine', 0.3, 0.2); // G5
        playTone(1047, 0.2, 'sine', 0.4, 0.3); // C6
    };

    // Player hit
    this.playPlayerHit = function() {
        if(!audioContext || muted) return;
        playTone(200, 0.15, 'sawtooth', 0.5);
        playTone(150, 0.2, 'square', 0.4, 0.05);
        playNoise(0.1, 0.3);
    };

    // Game over
    this.playGameOver = function() {
        if(!audioContext || muted) return;
        playTone(392, 0.3, 'sine', 0.4);      // G4
        playTone(349, 0.3, 'sine', 0.4, 0.3); // F4
        playTone(330, 0.3, 'sine', 0.4, 0.6); // E4
        playTone(262, 0.5, 'sine', 0.5, 0.9); // C4
        playTone(196, 0.8, 'sine', 0.6, 1.4); // G3
    };

    // Level complete
    this.playLevelComplete = function() {
        if(!audioContext || muted) return;
        playTone(523, 0.15, 'sine', 0.4);     // C5
        playTone(659, 0.15, 'sine', 0.4, 0.15); // E5
        playTone(784, 0.15, 'sine', 0.4, 0.3); // G5
        playTone(1047, 0.3, 'sine', 0.5, 0.45); // C6
        playTone(784, 0.15, 'sine', 0.4, 0.75); // G5
        playTone(1047, 0.4, 'sine', 0.5, 0.9); // C6
    };

    // Bonus ship
    this.playBonusShip = function() {
        if(!audioContext || muted) return;
        playTone(600, 0.1, 'sine', 0.2);
        playTone(800, 0.1, 'sine', 0.2, 0.1);
    };

    // Kamikaze attack - rising alarm then dive sound
    this.playKamikaze = function() {
        if(!audioContext || muted) return;
        // Rising alarm
        var osc = audioContext.createOscillator();
        var gain = audioContext.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.4);
        gain.gain.setValueAtTime(0.25 * masterVolume * sfxVolume, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.55);
        // Dive whoosh
        playNoise(0.3, 0.15);
        playTone(400, 0.2, 'square', 0.15, 0.15);
    };

    // === BACKGROUND MUSIC ===

    // Ominous sci-fi background music with bass + sparse melody + pad chords
    this.startMusic = function() {
        if(!audioContext || muted) return;
        this.stopMusic();

        musicGain = audioContext.createGain();
        musicGain.gain.value = masterVolume * musicVolume;
        musicGain.connect(audioContext.destination);

        // Bass line — minor feel (C2 Eb2 G2 Bb2 pattern)
        var bassSeq = [65.41, 77.78, 65.41, 77.78, 61.74, 65.41, 77.78, 65.41];
        // Sparse melody (0 = rest)
        var melSeq  = [261.63, 0, 0, 293.66, 0, 246.94, 0, 0,
                        261.63, 0, 329.63, 0, 311.13, 0, 261.63, 0];
        // Pad chord sets (played every 8 beats)
        var padSets = [
            [130.81, 155.56, 196.00],   // Cm
            [116.54, 146.83, 174.61],   // Bbm
            [130.81, 164.81, 196.00],   // C major (tension)
            [110.00, 138.59, 164.81]    // Am
        ];
        var beat = 0;
        var padIdx = 0;
        var BPM = 340; // ms per beat (~176 BPM)

        function playBeat() {
            if(!musicGain || muted) return;

            // ---- Bass ----
            var bassFreq = bassSeq[beat % bassSeq.length];
            if(bassFreq) {
                var bOsc = audioContext.createOscillator();
                var bGain = audioContext.createGain();
                bOsc.type = 'triangle';
                bOsc.frequency.value = bassFreq;
                bGain.gain.setValueAtTime(0.22, audioContext.currentTime);
                bGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
                bOsc.connect(bGain); bGain.connect(musicGain);
                bOsc.start(); bOsc.stop(audioContext.currentTime + 0.35);
            }

            // ---- Melody ----
            var melFreq = melSeq[beat % melSeq.length];
            if(melFreq) {
                var mOsc = audioContext.createOscillator();
                var mGain = audioContext.createGain();
                mOsc.type = 'sine';
                mOsc.frequency.value = melFreq;
                mGain.gain.setValueAtTime(0.10, audioContext.currentTime);
                mGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.38);
                mOsc.connect(mGain); mGain.connect(musicGain);
                mOsc.start(); mOsc.stop(audioContext.currentTime + 0.42);
            }

            // ---- Pad chord every 8 beats ----
            if(beat % 8 === 0) {
                var chord = padSets[padIdx % padSets.length];
                padIdx++;
                for(var p = 0; p < chord.length; p++) {
                    var pOsc = audioContext.createOscillator();
                    var pGain = audioContext.createGain();
                    pOsc.type = 'sine';
                    pOsc.frequency.value = chord[p];
                    pGain.gain.setValueAtTime(0.07, audioContext.currentTime);
                    pGain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 1.2);
                    pGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + BPM * 8 / 1000);
                    pOsc.connect(pGain); pGain.connect(musicGain);
                    pOsc.start(); pOsc.stop(audioContext.currentTime + BPM * 8 / 1000 + 0.05);
                }
            }

            beat++;
            musicNode = setTimeout(playBeat, BPM);
        }

        playBeat();
    };

    this.stopMusic = function() {
        if(musicNode) {
            clearTimeout(musicNode);
            musicNode = null;
        }
        if(musicGain) {
            musicGain.disconnect();
            musicGain = null;
        }
    };

    this.isMusicPlaying = function() {
        return musicNode !== null;
    };
};
