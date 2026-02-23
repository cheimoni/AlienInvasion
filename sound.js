/**
 * Sound Manager for AlienInvasion
 * Uses Web Audio API to generate procedural sounds
 */
var SoundManager = new function() {
    var audioContext = null;
    var masterVolume = 0.5;
    var sfxVolume = 0.7;
    var musicVolume = 0.7;
    var muted = false;
    var musicMuted = false; // music-only mute (independent of SFX)
    var sfxMuted   = false; // sfx-only mute   (independent of music)
    var _trackIdx  = 0;     // current position in shuffled playlist
    var _shuffledList = []; // shuffled copy of musicPlaylist
    var musicAudio = null;   // HTML5 Audio element for MP3 playback
    var musicNode = null;    // kept for isMusicPlaying() compatibility
    var musicGain = null;    // kept for toggleMute compatibility
    var _fadeTimer = null;   // active fade interval
    var _currentTrackMult = 1.0; // per-track normalization multiplier
    var _analyser = null;    // AnalyserNode for waveform visualizer

    // ── Per-track volume normalization (target: -14 dBFS)
    // gain = 10^((target - measured) / 20)  ──
    var trackNorm = {
      'music/quiet-and-deep-ambient-landscape-2026-01-20-13-05-44-utc/quiet and deep ambient landscape.mp3': 0.741,
      'music/cosmos-2026-02-02-12-02-46-utc/Inspiring Epic Guitar Ambient.mp3':                             0.776,
      'music/galaxy-2026-01-26-21-56-09-utc/Space.mp3':                                                     0.832,
      'music/futuristic-epic-sci-fi-ambient-2025-01-16-04-40-22-utc/Futuristic Epic Sci-Fi Ambient.mp3':    0.841,
      'music/cinematic-space-soundscape-2025-12-28-22-28-17-utc/The Space Universe.mp3':                    0.891,
      'music/futuristic-space-ambient-timelapse-2025-01-16-09-55-51-utc/Futuristic Space Ambient Timelapse.mp3': 0.955,
      'music/space-ambient-timelapse-2025-01-16-04-25-37-utc/MP3/Space Ambient Timelapse.mp3':              1.000,
      'music/planet-exploration-drone-2025-08-27-06-38-43-utc/Planet Exploration Drone.mp3':               1.035,
      'music/atmospheric-space-travel-2025-01-16-04-21-05-utc/Atmospheric Space Travel.mp3':               1.072,
      'music/ambient-cinematic-soundscape-2025-01-15-23-12-10-utc/Back to Earth.mp3':                      1.083,
      'music/space-ambient-timelapse-2025-01-16-04-25-37-utc/MP3/Space Ambient Timelapse No Epic Brass.mp3': 1.095,
      'music/for-ambient-music-2025-09-27-09-59-50-utc/For Ambient Music.mp3':                              1.230,
      'music/interstellar-voyager-dreamers-2025-11-10-19-10-12-utc/Luke PN - Interstellar Voyager Dreamers/LukePN_interstellar-voyager-dreamers_main-01_full.mp3': 1.274,
      'music/into-the-expanse-2025-09-27-11-16-30-utc/Into the Expanse.mp3':                               1.464,
      'music/mysterious-guitar-ambient-2025-09-26-23-49-22-utc/Puls of Stars.mp3':                         1.514,
      'music/interstellar-voyager-dreamers-2025-11-10-19-10-12-utc/Luke PN - Interstellar Voyager Dreamers/LukePN_interstellar-voyager-dreamers_main-02_no-percs.mp3': 1.549,
      'music/cosmos-2026-02-10-23-15-41-utc/Deep Space.mp3':                                               1.718,
      'music/outer-space-drone-2025-08-27-06-43-15-utc/Outer Space Drone/Outer Space Drone.mp3':           1.000,
      'music/space-travel-2025-08-27-06-23-38-utc/Space Travel.mp3':                                        1.000
    };

    // ── MP3 playlist: only tracks >= 60 seconds ──
    var musicPlaylist = [
      'music/ambient-cinematic-soundscape-2025-01-15-23-12-10-utc/Back to Earth.mp3',
      'music/atmospheric-space-travel-2025-01-16-04-21-05-utc/Atmospheric Space Travel.mp3',
      'music/cinematic-space-soundscape-2025-12-28-22-28-17-utc/The Space Universe.mp3',
      'music/cosmos-2026-02-02-12-02-46-utc/Inspiring Epic Guitar Ambient.mp3',
      'music/cosmos-2026-02-10-23-15-41-utc/Deep Space.mp3',
      'music/for-ambient-music-2025-09-27-09-59-50-utc/For Ambient Music.mp3',
      'music/futuristic-epic-sci-fi-ambient-2025-01-16-04-40-22-utc/Futuristic Epic Sci-Fi Ambient.mp3',
      'music/futuristic-space-ambient-timelapse-2025-01-16-09-55-51-utc/Futuristic Space Ambient Timelapse.mp3',
      'music/galaxy-2026-01-26-21-56-09-utc/Space.mp3',
      'music/interstellar-voyager-dreamers-2025-11-10-19-10-12-utc/Luke PN - Interstellar Voyager Dreamers/LukePN_interstellar-voyager-dreamers_main-01_full.mp3',
      'music/interstellar-voyager-dreamers-2025-11-10-19-10-12-utc/Luke PN - Interstellar Voyager Dreamers/LukePN_interstellar-voyager-dreamers_main-02_no-percs.mp3',
      'music/into-the-expanse-2025-09-27-11-16-30-utc/Into the Expanse.mp3',
      'music/mysterious-guitar-ambient-2025-09-26-23-49-22-utc/Puls of Stars.mp3',
      'music/outer-space-drone-2025-08-27-06-43-15-utc/Outer Space Drone/Outer Space Drone.mp3',
      'music/planet-exploration-drone-2025-08-27-06-38-43-utc/Planet Exploration Drone.mp3',
      'music/quiet-and-deep-ambient-landscape-2026-01-20-13-05-44-utc/quiet and deep ambient landscape.mp3',
      'music/space-ambient-timelapse-2025-01-16-04-25-37-utc/MP3/Space Ambient Timelapse No Epic Brass.mp3',
      'music/space-ambient-timelapse-2025-01-16-04-25-37-utc/MP3/Space Ambient Timelapse.mp3',
      'music/space-travel-2025-08-27-06-23-38-utc/Space Travel.mp3'
    ];

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

    // Mute/Unmute (master — mutes everything)
    this.toggleMute = function() {
        muted = !muted;
        if(musicAudio) musicAudio.volume = (muted || musicMuted) ? 0 : Math.min(1, masterVolume * musicVolume * _currentTrackMult);
        return muted;
    };
    this.isMuted = function() { return muted; };

    // Music-only toggle (radio on/off)
    this.toggleMusicMute = function() {
        musicMuted = !musicMuted;
        if(_fadeTimer) { clearInterval(_fadeTimer); _fadeTimer = null; }
        if(musicMuted) {
            if(musicAudio) musicAudio.volume = 0;
        } else if(!muted) {
            if(musicAudio) this.fadeIn(0.5);
            else this.startMusic();
        }
        return musicMuted;
    };
    this.isMusicMuted = function() { return muted || musicMuted; };

    // SFX-only toggle
    this.toggleSfxMute = function() { sfxMuted = !sfxMuted; return sfxMuted; };
    this.isSfxMuted = function() { return muted || sfxMuted; };

    // Helper: Play a tone
    function playTone(frequency, duration, type, volume, delay) {
        if(!audioContext || muted || sfxMuted) return;

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
        if(!audioContext || muted || sfxMuted) return;

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
        if(!audioContext || muted || sfxMuted) return;
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
        if(!audioContext || muted || sfxMuted) return;
        playTone(880, 0.035, 'square', 0.10);
        playTone(550, 0.04,  'square', 0.07, 0.02);
    };

    // Rocket launch — deep ignition whoosh
    this.playRocket = function() {
        if(!audioContext || muted || sfxMuted) return;
        playNoise(0.06, 0.5);                       // crack/ignition
        playTone(180, 0.35, 'sawtooth', 0.5);       // deep roar
        playTone(90,  0.5,  'square',   0.35, 0.05);// subsonic rumble
        playTone(60,  0.6,  'sawtooth', 0.25, 0.1); // low boom tail
    };

    // Rocket explosion — massive boom
    this.playRocketExplosion = function() {
        if(!audioContext || muted || sfxMuted) return;
        playNoise(0.7, 0.9);                         // explosion body
        playTone(55,  0.65, 'sawtooth', 0.75);       // deep floor-shaking boom
        playTone(38,  0.85, 'square',   0.6,  0.04); // sub-bass punch
        playTone(110, 0.4,  'sawtooth', 0.45, 0.08); // mid crunch
        playTone(220, 0.15, 'sine',     0.35, 0.02); // crack transient
    };

    // Explosion
    this.playExplosion = function() {
        if(!audioContext || muted || sfxMuted) return;
        playNoise(0.3, 0.5);
        playTone(100, 0.2, 'sawtooth', 0.4);
        playTone(60, 0.3, 'square', 0.3, 0.1);
    };

    // Enemy death
    this.playEnemyDeath = function() {
        if(!audioContext || muted || sfxMuted) return;
        playTone(400, 0.1, 'square', 0.2);
        playTone(200, 0.1, 'square', 0.2, 0.05);
        playTone(100, 0.1, 'square', 0.2, 0.1);
    };

    // Mothership warp-in (descending frequency sweep + rumble)
    this.playWarp = function() {
        if(!audioContext || muted || sfxMuted) return;
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
        if(!audioContext || muted || sfxMuted) return;
        for(var i = 0; i < 5; i++) {
            playNoise(0.5, 0.4);
            playTone(80 - i*10, 0.3, 'sawtooth', 0.5, i * 0.1);
        }
        playTone(50, 0.5, 'square', 0.6, 0.3);
    };

    // Power-up collected
    this.playPowerUp = function() {
        if(!audioContext || muted || sfxMuted) return;
        playTone(523, 0.1, 'sine', 0.3);      // C5
        playTone(659, 0.1, 'sine', 0.3, 0.1); // E5
        playTone(784, 0.15, 'sine', 0.3, 0.2); // G5
        playTone(1047, 0.2, 'sine', 0.4, 0.3); // C6
    };

    // Player hit
    this.playPlayerHit = function() {
        if(!audioContext || muted || sfxMuted) return;
        playTone(200, 0.15, 'sawtooth', 0.5);
        playTone(150, 0.2, 'square', 0.4, 0.05);
        playNoise(0.1, 0.3);
    };

    // Game over
    this.playGameOver = function() {
        if(!audioContext || muted || sfxMuted) return;
        playTone(392, 0.3, 'sine', 0.4);      // G4
        playTone(349, 0.3, 'sine', 0.4, 0.3); // F4
        playTone(330, 0.3, 'sine', 0.4, 0.6); // E4
        playTone(262, 0.5, 'sine', 0.5, 0.9); // C4
        playTone(196, 0.8, 'sine', 0.6, 1.4); // G3
    };

    // Level complete
    this.playLevelComplete = function() {
        if(!audioContext || muted || sfxMuted) return;
        playTone(523, 0.15, 'sine', 0.4);     // C5
        playTone(659, 0.15, 'sine', 0.4, 0.15); // E5
        playTone(784, 0.15, 'sine', 0.4, 0.3); // G5
        playTone(1047, 0.3, 'sine', 0.5, 0.45); // C6
        playTone(784, 0.15, 'sine', 0.4, 0.75); // G5
        playTone(1047, 0.4, 'sine', 0.5, 0.9); // C6
    };

    // Bonus ship
    this.playBonusShip = function() {
        if(!audioContext || muted || sfxMuted) return;
        playTone(600, 0.1, 'sine', 0.2);
        playTone(800, 0.1, 'sine', 0.2, 0.1);
    };

    // Wheel of Fortune ticker click
    this.playTick = function() {
        if(!audioContext || muted || sfxMuted) return;
        var osc  = audioContext.createOscillator();
        var gain = audioContext.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(900, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.04);
        gain.gain.setValueAtTime(0.18 * masterVolume * sfxVolume, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.06);
    };

    // Kamikaze attack - rising alarm then dive sound
    this.playKamikaze = function() {
        if(!audioContext || muted || sfxMuted) return;
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

    // Dive/entry buzz — classic Galaxian-style zzz
    this.playDiveBuzz = function() {
        if(!audioContext || muted || sfxMuted) return;
        this.resume();
        var now = audioContext.currentTime, dur = 0.55;
        // Sawtooth sweeping down
        var osc = audioContext.createOscillator();
        var gain = audioContext.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + dur);
        gain.gain.setValueAtTime(0.0, now);
        gain.gain.linearRampToValueAtTime(0.22 * masterVolume * sfxVolume, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
        // LFO for the buzz texture
        var lfo = audioContext.createOscillator();
        var lfoGain = audioContext.createGain();
        lfo.type = 'square';
        lfo.frequency.setValueAtTime(45, now);
        lfo.frequency.linearRampToValueAtTime(30, now + dur);
        lfoGain.gain.setValueAtTime(55, now);
        lfoGain.gain.linearRampToValueAtTime(18, now + dur);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        lfo.start(now); lfo.stop(now + dur + 0.05);
        osc.start(now); osc.stop(now + dur + 0.05);
    };

    // === BACKGROUND MUSIC ===

    // Compute the normalised target volume for the current track
    function _trackVol(src) {
        return Math.min(1.0, masterVolume * musicVolume * (trackNorm[src] || 1.0));
    }

    // Fade IN over `dur` seconds (from 0 → _trackVol)
    this.fadeIn = function(dur) {
        if(_fadeTimer) { clearInterval(_fadeTimer); _fadeTimer = null; }
        if(!musicAudio || muted || musicMuted) return;
        var target = Math.min(1.0, masterVolume * musicVolume * _currentTrackMult);
        musicAudio.volume = 0;
        var steps = 40, step = 0;
        var ms = Math.max(16, (dur * 1000) / steps);
        _fadeTimer = setInterval(function() {
            step++;
            if(!musicAudio) { clearInterval(_fadeTimer); _fadeTimer = null; return; }
            musicAudio.volume = target * Math.min(1, step / steps);
            if(step >= steps) { musicAudio.volume = target; clearInterval(_fadeTimer); _fadeTimer = null; }
        }, ms);
    };

    // Fade OUT over `dur` seconds then call optional callback
    this.fadeOut = function(dur, callback) {
        if(_fadeTimer) { clearInterval(_fadeTimer); _fadeTimer = null; }
        if(!musicAudio) { if(callback) callback(); return; }
        var startVol = musicAudio.volume;
        var steps = 40, step = 0;
        var ms = Math.max(16, (dur * 1000) / steps);
        _fadeTimer = setInterval(function() {
            step++;
            if(!musicAudio) { clearInterval(_fadeTimer); _fadeTimer = null; if(callback) callback(); return; }
            musicAudio.volume = Math.max(0, startVol * (1 - step / steps));
            if(step >= steps) {
                clearInterval(_fadeTimer); _fadeTimer = null;
                if(callback) callback();
            }
        }, ms);
    };

    // Fisher-Yates shuffle helper
    function _shuffle(arr) {
        for(var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
        return arr;
    }

    // Background music — plays MP3 files in random shuffled order, loops forever
    this.startMusic = function() {
        if(muted || musicMuted) return;
        this.stopMusic();

        // Build a fresh shuffle at startup
        _shuffledList = _shuffle(musicPlaylist.slice());
        _trackIdx = 0;

        musicAudio = new Audio();
        musicAudio.volume = 0;

        // Connect to Web Audio API for waveform visualizer
        _analyser = null;
        if(audioContext) {
            try {
                var _mediaSrc = audioContext.createMediaElementSource(musicAudio);
                _analyser = audioContext.createAnalyser();
                _analyser.fftSize = 256;
                _analyser.smoothingTimeConstant = 0.82;
                _mediaSrc.connect(_analyser);
                _analyser.connect(audioContext.destination);
            } catch(e) { _analyser = null; }
        }

        var self = this;

        function playNext() {
            if(!musicAudio) return;
            // Re-shuffle when we've played all tracks
            if(_trackIdx >= _shuffledList.length) {
                _shuffledList = _shuffle(musicPlaylist.slice());
                _trackIdx = 0;
            }
            var src = _shuffledList[_trackIdx++];
            _currentTrackMult = trackNorm[src] || 1.0;
            musicAudio.src = src;
            musicAudio.volume = 0;
            musicAudio.load();
            musicAudio.play().catch(function() {
                musicNode = setTimeout(playNext, 3000);
            });
            self.fadeIn(2.0);
        }

        musicAudio.addEventListener('ended', playNext);
        musicAudio.addEventListener('error', function() {
            musicNode = setTimeout(playNext, 500);
        });

        playNext();
        musicNode = true;
    };

    this.stopMusic = function() {
        if(_fadeTimer) { clearInterval(_fadeTimer); _fadeTimer = null; }
        if(musicAudio) {
            musicAudio.pause();
            musicAudio.removeAttribute('src');
            musicAudio = null;
        }
        if(musicNode && musicNode !== true) { clearTimeout(musicNode); }
        musicNode = null;
        musicGain = null;
        _analyser = null;
    };

    this.isMusicPlaying = function() {
        return musicAudio !== null;
    };

    this.getAnalyser = function() { return _analyser; };

    // ──── Alien Voice SFX ─────────────────────────────────────────────────
    var _alienAttackPool = [
        'music/alien voice/alien-talk-2025-08-27-06-38-22-utc/Alien Talking01.mp3',
        'music/alien voice/alien-talk-2025-08-27-06-38-22-utc/Alien Talking02.mp3',
        'music/alien voice/alien-talk-2025-08-27-06-38-22-utc/Alien Talking03.mp3',
        'music/alien voice/alien-talk-2025-08-27-06-38-22-utc/Alien Talking04.mp3',
        'music/alien voice/evil-alien-extraterrestrial-being-deep-voice-2025-08-27-06-59-52-utc/Evil Alien Talking02.mp3',
        'music/alien voice/alien-creature-guttural-voice-2-2025-08-27-04-28-32-utc/Alien_Creature_Guttural_Voice_OCP-1574-73.wav',
        'music/alien voice/alien-voice-3-2025-08-27-04-14-14-utc/Alien Voice 3.wav',
        'music/alien voice/alien-voice-or-code-2025-08-27-06-41-38-utc/Communications 8005_85_2.wav',
        'music/alien voice/dark-game-voice-spell-agosa-landum-1-soft-full-rev-2025-08-27-06-07-11-utc/Dark_Game_Voice_Spell_Agosa_Landum_1_Soft_Full_Reverse_Conjure_Male.wav',
        'music/alien voice/dark-game-voice-spell-blookzoran-venomus-3-spoken-2025-08-27-06-49-12-utc/Dark_Game_Voice_Spell_Blookzoran_Venomus_3_Spoken_Reverb_Reverse_Male.wav',
        'music/alien voice/creature-demon-dark-voice-reverse-end-of-days-01-2025-08-27-05-53-11-utc/CREATURE_DEMON_Dark_Voice_Reverse_End_Of_Days_01.wav',
        'music/alien voice/creature-demon-dark-voice-reverse-fear-of-dark-01-2025-08-27-05-53-12-utc/CREATURE_DEMON_Dark_Voice_Reverse_Fear_Of_Dark_01.wav'
    ];
    var _alienLastPlayed = 0; // ms timestamp — throttle so voices don't stack
    var _alienLastIdx = -1;   // prevent consecutive repeat

    function _pickAlien() {
        var n = _alienAttackPool.length;
        var idx;
        do { idx = Math.floor(Math.random() * n); } while(idx === _alienLastIdx && n > 1);
        _alienLastIdx = idx;
        return _alienAttackPool[idx];
    }

    // Play a random alien voice on dive/kamikaze attack (throttled to 1 per 2s)
    this.playAlienAttack = function() {
        if(muted || sfxMuted) return;
        var now = Date.now();
        if(now - _alienLastPlayed < 2000) return;
        _alienLastPlayed = now;
        var a = new Audio(_pickAlien());
        a.volume = Math.min(1, masterVolume * sfxVolume * 0.75);
        a.play().catch(function() {});
    };

    // Play a random alien voice when ship selection screen opens
    this.playAlienSelect = function() {
        if(muted || sfxMuted) return;
        var a = new Audio(_pickAlien());
        a.volume = Math.min(1, masterVolume * sfxVolume * 0.65);
        a.play().catch(function() {});
    };
};
