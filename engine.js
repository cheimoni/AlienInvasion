(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
  

var Game = new function() {
  var boards = [];
  var _boardKeys = []; // sorted numeric keys — supports fractional slots (1.5, 2.5, 9.5…)

  // Screen shake system
  this.shakeMagnitude = 0;
  this.shakeDuration = 0;
  this.shakeDecay = 0;
  this.shake = function(mag, dur) {
    dur = dur || 0.3;
    if(mag > this.shakeMagnitude) {
      this.shakeMagnitude = mag;
      this.shakeDuration = dur;
      this.shakeDecay = mag / dur;
    }
  };

  // Game Initialization
  this.initialize = function(canvasElementId,sprite_data,callback) {
    this.canvas = document.getElementById(canvasElementId);

    this.playerOffset = 0;
    this.canvasMultiplier= 1;
    this.scale = 1; // Default scale
    this.setupMobile();

    // Make canvas fullscreen on desktop
    this.makeFullscreen();

    // Only set width/height if makeFullscreen didn't set them
    if(!this.fullscreenMode) {
      this.width = this.canvas.width;
      this.height = this.canvas.height;
    }

    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
    if(!this.ctx) { return alert("Please upgrade your browser to play"); }

    this.setupInput();

    this.loop();

    // Show loading screen while sprites load
    var _ls = new LoadingScreen();
    this.setBoard(9, _ls);

    SpriteSheet.load(sprite_data, function() {
      _ls.setProgress(1.0);
      // Hold 100% briefly so the player sees it, then launch game
      setTimeout(function() {
        Game.setBoard(9, null);
        callback();
      }, 350);
    }, function(ratio) {
      _ls.setProgress(ratio);
    });
  };

  // Fullscreen functionality — canvas fills the entire viewport (no black bars).
  // Game.uiScale is a reference multiplier so fonts/UI can scale consistently:
  //   1.0 at 1280×720  |  1.5 at 1920×1080  |  2.0 at 2560×1440  |  3.0 at 4K
  this.makeFullscreen = function() {
    var hasTouch = !!('ontouchstart' in window);
    if(hasTouch) return; // Mobile uses setupMobile()

    this.fullscreenMode = true;

    document.body.style.margin   = '0';
    document.body.style.padding  = '0';
    document.body.style.overflow = 'hidden';

    this.canvas.style.position = 'fixed';
    this.canvas.style.left     = '0';
    this.canvas.style.top      = '0';
    this.canvas.style.width    = '100vw';
    this.canvas.style.height   = '100vh';
    this.canvas.style.display  = 'block';

    var self = this;
    function resize() {
      self.canvas.width  = window.innerWidth;
      self.canvas.height = window.innerHeight;
      self.width  = self.canvas.width;
      self.height = self.canvas.height;
      Game.uiScale     = Math.min(self.width / 1280, self.height / 720);
      Game.spriteScale = Math.min(2.5, Math.max(1.0, self.width / 750));
    }

    resize();
    window.addEventListener('resize', resize);
  };
  

  // Handle Input
  var KEY_CODES = { 37:'left', 39:'right', 88:'rocket', 77:'mute' }; // 32 (space) handled separately
  this.keys = {};
  this.paused = false;
  this.playing = false;

  this.setupInput = function() {
    // Hide cursor on canvas
    Game.canvas.style.cursor = 'none';

    window.addEventListener('keydown',function(e) {
      if(KEY_CODES[e.keyCode]) {
       Game.keys[KEY_CODES[e.keyCode]] = true;
       e.preventDefault();
      }
      // M key toggles sound
      if(e.keyCode === 77) {
        SoundManager.toggleMute();
      }
      // Cheat code digit tracking (1=49, 2=50, 3=51, 4=52)
      if(e.keyCode >= 49 && e.keyCode <= 52) Game.keys['num' + (e.keyCode - 48)] = true;

      // ESC: pause + release pointer lock
      if(e.keyCode === 27) {
        e.preventDefault();
        if(Game.playing) {
          Game.paused = true;
          var _epl = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
          if(_epl) _epl.call(document);
        }
      }

      // Spacebar: start game on title screen / toggle pause during gameplay
      if(e.keyCode === 32) {
        e.preventDefault();
        if(!Game.playing) {
          Game.keys['fire'] = true;  // title screen: start
        } else if(Game.paused && !Game.shipSelectOpen) {
          Game.paused = false;
          Game.keys['fire'] = false;  // don't fire on resume
          if(!Game.mobile) {
            var _rpl = Game.canvas.requestPointerLock || Game.canvas.mozRequestPointerLock || Game.canvas.webkitRequestPointerLock;
            if(_rpl) _rpl.call(Game.canvas);
          }
        } else if(!Game.shipSelectOpen) {
          Game.paused = true;
          var _epl2 = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
          if(_epl2) _epl2.call(document);
        }
      }
    },false);

    window.addEventListener('keyup',function(e) {
      if(KEY_CODES[e.keyCode]) {
       Game.keys[KEY_CODES[e.keyCode]] = false;
       e.preventDefault();
      }
      if(e.keyCode >= 49 && e.keyCode <= 52) Game.keys['num' + (e.keyCode - 48)] = false;
      if(e.keyCode === 32) Game.keys['fire'] = false;  // clear title screen fire
    },false);

    // Mouse position tracking: only update when pointer lock is active (prevents jump on lock transitions)
    this.mouseX = Game.width / 2;
    // Cache _scale so getBoundingClientRect isn't called on every mousemove event
    var _mouseScale = 1;
    var _updateMouseScale = function() {
      var rect = Game.canvas.getBoundingClientRect();
      _mouseScale = rect.width > 0 ? Game.width / rect.width : 1;
    };
    window.addEventListener('resize', _updateMouseScale, false);
    // Skip first few mousemove events after pointer lock state changes — Chrome often reports
    // a large spurious movementX on the very first event after lock is acquired/released,
    // which would cause the ship to lurch suddenly.
    var _skipMouseMoves = 0;
    this.canvas.addEventListener('mousemove',function(e) {
      var _locked = document.pointerLockElement === Game.canvas ||
                    document.mozPointerLockElement === Game.canvas ||
                    document.webkitPointerLockElement === Game.canvas;
      if(_locked) {
        if(_skipMouseMoves > 0) { _skipMouseMoves--; return; }
        // Clamp per-event delta to 80 logical px — prevents a single fast swipe from
        // jumping Game.mouseX to the screen edge and causing the ship to lurch.
        var _rawDelta = e.movementX * _mouseScale;
        var _clampedDelta = _rawDelta > 80 ? 80 : _rawDelta < -80 ? -80 : _rawDelta;
        Game.mouseX = Math.max(0, Math.min(Game.width, Game.mouseX + _clampedDelta));
      }
      // When NOT locked: keep Game.mouseX frozen so ship doesn't jump when lock transitions
    },false);

    // Click canvas to lock pointer during gameplay (only if not already locked and no UI overlay)
    this.canvas.addEventListener('click', function() {
      if(!Game.mobile && Game.playing && !Game.paused && !Game.shipSelectOpen) {
        var _isLocked = document.pointerLockElement === Game.canvas ||
                        document.mozPointerLockElement === Game.canvas ||
                        document.webkitPointerLockElement === Game.canvas;
        if(!_isLocked) {
          var _rpl = Game.canvas.requestPointerLock || Game.canvas.mozRequestPointerLock || Game.canvas.webkitRequestPointerLock;
          if(_rpl) _rpl.call(Game.canvas);
        }
      }
    }, false);

    // If pointer lock is released externally, auto-pause — but NOT during ship selection
    document.addEventListener('pointerlockchange', function() {
      var _locked = document.pointerLockElement === Game.canvas ||
                    document.mozPointerLockElement === Game.canvas ||
                    document.webkitPointerLockElement === Game.canvas;
      if(!_locked && Game.playing && !Game.shipSelectOpen) Game.paused = true;
      if(_locked) _skipMouseMoves = 3; // discard first 3 events after re-lock (spurious large movementX)
    }, false);
    document.addEventListener('mozpointerlockchange', function() {
      var _locked = document.mozPointerLockElement === Game.canvas;
      if(!_locked && Game.playing && !Game.shipSelectOpen) Game.paused = true;
      if(_locked) _skipMouseMoves = 3;
    }, false);

    // Left click = fire
    this.canvas.addEventListener('mousedown',function(e) {
      e.preventDefault();
      if(e.button === 0) {
        Game.keys['fire'] = true;
      } else if(e.button === 2) {
        // Right click = rocket
        Game.keys['rocket'] = true;
      }
    },false);

    this.canvas.addEventListener('mouseup',function(e) {
      e.preventDefault();
      if(e.button === 0) {
        Game.keys['fire'] = false;
      } else if(e.button === 2) {
        Game.keys['rocket'] = false;
      }
    },false);

    // Prevent context menu on right click
    this.canvas.addEventListener('contextmenu',function(e) {
      e.preventDefault();
    },false);
  };


  var lastTime = performance.now();
  var maxTime = 1/30;
  // Game Loop
  this.loop = function() {
    var curTime = performance.now();
    requestAnimationFrame(Game.loop);
    var dt = (curTime - lastTime)/1000;
    if(dt > maxTime) { dt = maxTime; }

    // Clear canvas
    Game.ctx.fillStyle = '#000';
    Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);

    // Screen shake
    var shakeX = 0, shakeY = 0;
    if(Game.shakeDuration > 0) {
      var mag = Game.shakeMagnitude;
      shakeX = (Math.random() - 0.5) * mag * 2;
      shakeY = (Math.random() - 0.5) * mag * 2;
      Game.shakeMagnitude = Math.max(0, Game.shakeMagnitude - Game.shakeDecay * dt);
      Game.shakeDuration -= dt;
      if(Game.shakeDuration <= 0) { Game.shakeMagnitude = 0; shakeX = 0; shakeY = 0; }
    }

    Game.ctx.save();
    if(shakeX !== 0 || shakeY !== 0) Game.ctx.translate(shakeX, shakeY);

    for(var i=0,len=_boardKeys.length;i<len;i++) {
      var _b = boards[_boardKeys[i]];
      if(_b) {
        if(!Game.paused) _b.step(dt);
        _b.draw(Game.ctx);
      }
    }

    // Pause overlay
    if(Game.paused && Game.playing && !Game.shipSelectOpen) {
      var _pCtx = Game.ctx;
      _pCtx.save();
      _pCtx.fillStyle = 'rgba(0,0,0,0.58)';
      _pCtx.fillRect(0, 0, Game.width, Game.height);
      _pCtx.textAlign = 'center';
      var _pFS = Math.max(16, Math.round(Game.width / 14));
      _pCtx.font = 'bold ' + _pFS + 'px Uncial Antiqua, Arial Black, Arial';
      _pCtx.shadowColor = '#00BBFF';
      _pCtx.shadowBlur = 22;
      _pCtx.fillStyle = '#FFFFFF';
      _pCtx.fillText('PAUSED', Game.width / 2, Game.height / 2 - 8);
      _pCtx.shadowBlur = 0;
      var _pFS2 = Math.max(10, Math.round(Game.width / 28));
      _pCtx.font = _pFS2 + 'px Uncial Antiqua, Arial Black, Arial';
      _pCtx.fillStyle = '#AAAAAA';
      _pCtx.fillText('SPACE \u2014 resume   ESC \u2014 release mouse', Game.width / 2, Game.height / 2 + _pFS + 4);
      _pCtx.restore();
    }

    Game.ctx.restore();
    lastTime = curTime;
  };
  
  // Change an active game board — rebuilds sorted key list to support fractional slots
  this.setBoard = function(num, board) {
    boards[num] = board;
    _boardKeys = Object.keys(boards).map(Number).sort(function(a,b){ return a-b; });
  };


  this.setupMobile = function() {
    var hasTouch = !!('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (hasTouch) { this.mobile = true; }
    if (!hasTouch) { return false; }

    var canvas = this.canvas;

    // Lock body to prevent scroll / bounce
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width    = '100%';
    document.body.style.height   = '100%';

    // Reset container so canvas can be fixed-positioned freely
    var container = document.getElementById('container');
    if (container) {
      container.style.padding = '0';
      container.style.margin  = '0';
      container.style.width   = '100%';
      container.style.height  = '100%';
    }

    // Scale canvas to 90% of viewport (10% smaller — thin black border on all sides)
    function fitCanvas() {
      var vw = window.innerWidth;
      var vh = window.innerHeight;
      var cw = 320; // logical width is always 320
      var cssW = Math.floor(vw * 0.90);
      var cssH = Math.floor(vh * 0.90);
      var scale = cssW / cw;
      var newH = Math.ceil(cssH / scale);
      canvas.width  = cw;
      canvas.height = newH;
      Game.width    = cw;
      Game.height   = newH;
      Game.spriteScale = 1.0; // mobile: sprites stay at baseline size
      canvas.style.width    = cssW + 'px';
      canvas.style.height   = cssH + 'px';
      canvas.style.position = 'fixed';
      canvas.style.left     = Math.floor((vw - cssW) / 2) + 'px';
      canvas.style.top      = Math.floor((vh - cssH) / 2) + 'px';
      canvas.style.display  = 'block';
    }

    // Show/hide portrait-only overlay
    function checkOrientation() {
      var overlay = document.getElementById('rotate-overlay');
      if (!overlay) return;
      var landscape = window.innerWidth > window.innerHeight;
      var small     = Math.min(window.innerWidth, window.innerHeight) < 600;
      overlay.style.display = (landscape && small) ? 'flex' : 'none';
    }

    fitCanvas();
    checkOrientation();
    window.addEventListener('resize', function() { fitCanvas(); checkOrientation(); });
    window.addEventListener('orientationchange', function() {
      setTimeout(function() { fitCanvas(); checkOrientation(); }, 300);
    });
  };

};


// =====================================================================
// LOADING SCREEN — shown while sprites load
// =====================================================================
var LoadingScreen = function() {
  this.progress = 0;
  this.t = 0;
  // Shooting stars (meteors) — many falling simultaneously
  var _ssColors = [[255,255,255],[180,220,255],[255,240,200],[200,200,255],[150,210,255],[255,200,180]];
  this.shootingStars = [];
  var _ssCount = Math.min(55, Math.max(25, Math.round(30 * (Game.width * Game.height) / (320 * 480))));
  function _makeSSOffsets(segs, maxOff) {
    var offs = [];
    for(var k = 0; k <= segs; k++) offs.push((Math.random() - 0.5) * 2 * maxOff);
    offs[0] = 0; offs[segs] = 0; // endpoints always on the line
    return offs;
  }
  for(var i = 0; i < _ssCount; i++) {
    var _rgb = _ssColors[Math.floor(Math.random() * _ssColors.length)];
    var _segs = 7 + Math.floor(Math.random() * 6);
    var _maxOff = 2.5 + Math.random() * 5;
    this.shootingStars.push({
      x:      Math.random() * (Game.width  || 320),
      y:      Math.random() * (Game.height || 480),
      speed:  260 + Math.random() * 340,
      ang:    0.38 + Math.random() * 0.55,
      len:    90  + Math.random() * 180,   // longer trails
      alpha:  0.5 + Math.random() * 0.5,
      r: _rgb[0], g: _rgb[1], b: _rgb[2],
      delay:  Math.random() * 1.5,
      segs:   _segs,
      maxOff: _maxOff,
      offsets: _makeSSOffsets(_segs, _maxOff)
    });
  }
  // Nebula blobs (pink/purple/blue — same palette as Starfield)
  var _nPalettes = [
    ['rgba(180,60,140,','rgba(110,20,90,','rgba(55,5,50,'],
    ['rgba(40,55,185,', 'rgba(20,30,130,','rgba(8,10,70,'],
    ['rgba(130,40,170,','rgba(80,15,115,','rgba(35,5,60,'],
    ['rgba(60,100,210,','rgba(30,55,155,','rgba(10,18,75,'],
    ['rgba(170,50,130,','rgba(100,20,90,','rgba(45,5,55,']
  ];
  this.nebulae = [];
  for(var n = 0; n < 6; n++) {
    var pal = _nPalettes[Math.floor(Math.random() * _nPalettes.length)];
    this.nebulae.push({
      xr: Math.random(), yr: Math.random(),
      rad: 0.22 + Math.random() * 0.28,
      c0: pal[0], c1: pal[1], c2: pal[2],
      phase: Math.random() * Math.PI * 2,
      spd: 0.07 + Math.random() * 0.10
    });
  }
  // Floating energy particles (same as TitleScreen)
  this.particles = [];
  var _pColors = ['#00FFFF','#FF44FF','#FFFF44','#FF8800','#00FF88','#FF4466'];
  for(var j = 0; j < 45; j++) {
    this.particles.push({
      x: Math.random() * (Game.width || 320),
      y: Math.random() * (Game.height || 480),
      vx: (Math.random() - 0.5) * 22,
      vy: -(4 + Math.random() * 18),
      size: 0.8 + Math.random() * 2.2,
      alpha: 0.3 + Math.random() * 0.6,
      color: _pColors[Math.floor(Math.random() * _pColors.length)]
    });
  }
};
LoadingScreen.prototype.step = function(dt) {
  this.t += dt;
  var w = Game.width, h = Game.height;
  // Particles
  for(var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if(p.y < -6)  { p.y = h + 6; p.x = Math.random() * w; }
    if(p.x < 0)   p.x = w;
    if(p.x > w)   p.x = 0;
  }
  // Shooting stars
  for(var j = 0; j < this.shootingStars.length; j++) {
    var ss = this.shootingStars[j];
    if(ss.delay > 0) { ss.delay -= dt; continue; }
    ss.x += Math.cos(ss.ang) * ss.speed * dt;
    ss.y += Math.sin(ss.ang) * ss.speed * dt;
    if(ss.x > w + ss.len || ss.y > h + ss.len) {
      // Respawn at top or left edge
      if(Math.random() < 0.6) { ss.x = Math.random() * w; ss.y = -ss.len; }
      else                    { ss.x = -ss.len; ss.y = Math.random() * h * 0.6; }
      ss.speed = 260 + Math.random() * 340;
      ss.ang   = 0.38 + Math.random() * 0.55;
      ss.len   = 90  + Math.random() * 180;
      ss.alpha = 0.45 + Math.random() * 0.55;
      ss.segs  = 7 + Math.floor(Math.random() * 6);
      ss.maxOff = 2.5 + Math.random() * 5;
      ss.offsets = [];
      for(var k=0; k<=ss.segs; k++) ss.offsets.push((Math.random()-0.5)*2*ss.maxOff);
      ss.offsets[0] = 0; ss.offsets[ss.segs] = 0;
    }
  }
};
LoadingScreen.prototype.setProgress = function(ratio) {
  this.progress = Math.max(this.progress, ratio);
};
LoadingScreen.prototype.draw = function(ctx) {
  var w = Game.width, h = Game.height;
  // Scale based on height so it looks proportional at any resolution
  var sc = Math.min(2.0, Math.max(1.0, Game.height / 480));

  // Dark space background
  ctx.fillStyle = '#020208';
  ctx.fillRect(0, 0, w, h);

  // Nebula blobs (pink/purple/blue)
  ctx.save();
  for(var n = 0; n < this.nebulae.length; n++) {
    var nb = this.nebulae[n];
    var pulse = 0.65 + 0.35 * Math.sin(this.t * nb.spd + nb.phase);
    var nr = Math.min(w, h) * nb.rad * pulse;
    var nx = nb.xr * w, ny = nb.yr * h;
    var op = 0.25 * pulse;
    var rg = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr);
    rg.addColorStop(0,    nb.c0 + (op * 0.90) + ')');
    rg.addColorStop(0.45, nb.c1 + (op * 0.48) + ')');
    rg.addColorStop(0.78, nb.c2 + (op * 0.20) + ')');
    rg.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.arc(nx, ny, nr, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Shooting stars (meteors)
  ctx.save();
  for(var si = 0; si < this.shootingStars.length; si++) {
    var ss = this.shootingStars[si];
    if(ss.delay > 0) continue;
    var _dx = Math.cos(ss.ang), _dy = Math.sin(ss.ang);
    var _px = -_dy, _py = _dx; // perpendicular unit vector
    var tailX = ss.x - _dx * ss.len;
    var tailY = ss.y - _dy * ss.len;
    var sGrad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
    sGrad.addColorStop(0, 'rgba(' + ss.r + ',' + ss.g + ',' + ss.b + ',0)');
    sGrad.addColorStop(1, 'rgba(' + ss.r + ',' + ss.g + ',' + ss.b + ',' + ss.alpha + ')');
    ctx.beginPath();
    var _segs = ss.segs || 8;
    var _offs = ss.offsets || [];
    for(var _seg = 0; _seg <= _segs; _seg++) {
      var _t = _seg / _segs;
      var _cx = tailX + _dx * ss.len * _t;
      var _cy = tailY + _dy * ss.len * _t;
      var _env = Math.sin(_t * Math.PI); // 0 at endpoints, 1 at midpoint
      var _off = (_offs[_seg] || 0) * _env;
      _cx += _px * _off; _cy += _py * _off;
      if(_seg === 0) ctx.moveTo(_cx, _cy); else ctx.lineTo(_cx, _cy);
    }
    ctx.strokeStyle = sGrad;
    ctx.lineWidth = 1.6;
    ctx.shadowColor = 'rgba(' + ss.r + ',' + ss.g + ',' + ss.b + ',0.7)';
    ctx.shadowBlur = 6;
    ctx.stroke();
  }
  ctx.restore();

  // Energy particles (floating upward, same as TitleScreen)
  ctx.save();
  for(var j = 0; j < this.particles.length; j++) {
    var p = this.particles[j];
    var flicker = 0.35 + 0.65 * Math.abs(Math.sin(this.t * 1.7 + j * 0.9));
    ctx.globalAlpha = p.alpha * flicker;
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Title glow pulse
  var glow = (10 + 8 * Math.sin(this.t * 2.2)) * sc;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#0088FF';
  ctx.shadowBlur = glow;
  ctx.fillStyle = '#00DDFF';
  ctx.font = 'bold ' + Math.round(50 * sc) + 'px Uncial Antiqua, Arial Black, Arial';
  var titleY = h * 0.28;
  ctx.fillText('ALIEN', w / 2, titleY);
  ctx.fillText('INVASION', w / 2, titleY + Math.round(56 * sc));
  ctx.shadowBlur = 0;

  // Author line
  ctx.font = Math.round(13 * sc) + 'px Arial';
  ctx.fillStyle = 'rgba(140, 200, 255, 0.75)';
  ctx.fillText('by Georgios Chimonides', w / 2, titleY + Math.round(98 * sc));

  // Progress bar
  var barW = w * 0.72;
  var barH = Math.max(6, Math.round(10 * sc));
  var barX = (w - barW) / 2;
  var barY = h * 0.65;
  var barR = barH / 2; // corner radius

  // Bar track
  ctx.fillStyle = 'rgba(0, 50, 90, 0.65)';
  _roundRect(ctx, barX, barY, barW, barH, barR);
  ctx.fill();

  // Green fill
  var fillW = barW * Math.min(1, this.progress);
  if(fillW > barR * 2) {
    var grad = ctx.createLinearGradient(barX, 0, barX + fillW, 0);
    grad.addColorStop(0, '#008833');
    grad.addColorStop(1, '#00FF88');
    ctx.fillStyle = grad;
    ctx.shadowColor = '#00FF66';
    ctx.shadowBlur = Math.round(8 * sc);
    _roundRect(ctx, barX, barY, fillW, barH, barR);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Percentage text
  ctx.font = Math.round(11 * sc) + 'px Arial';
  ctx.fillStyle = 'rgba(160, 230, 200, 0.85)';
  ctx.fillText('Loading... ' + Math.round(this.progress * 100) + '%', w / 2, barY + barH + Math.round(16 * sc));

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
};

// Helper: rounded rectangle path
function _roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
// =====================================================================

var SpriteSheet = new function() {
  this.map = { };
  this.images = {}; // Store multiple images
  this.image = null; // Default image

  this.load = function(spriteData, callback, progressCallback) {
    this.map = spriteData;

    // Collect unique image files in an array
    var imageFiles = [];
    var addedFiles = {};

    for(var key in spriteData) {
      var file = spriteData[key].file || 'images/sprites.webp';
      if(!addedFiles[file]) {
        addedFiles[file] = true;
        imageFiles.push(file);
      }
    }

    var loadedCount = 0;
    var totalImages = imageFiles.length;
    var self = this;

    // If no images to load, call callback immediately
    if(totalImages === 0) {
      if(callback) callback();
      return;
    }

    // Load each image
    for(var i = 0; i < imageFiles.length; i++) {
      (function(file) {
        var img = new Image();
        img.onload = function() {
          self.images[file] = img;
          // Also set as default image for backward compatibility
          if(file === 'images/sprites.webp') {
            self.image = img;
          }
          loadedCount++;
          if(progressCallback) progressCallback(loadedCount / totalImages);
          if(loadedCount === totalImages && callback) {
            callback();
          }
        };
        img.onerror = function() {
          loadedCount++;
          if(progressCallback) progressCallback(loadedCount / totalImages);
          if(loadedCount === totalImages && callback) {
            callback();
          }
        };
        img.src = file;
      })(imageFiles[i]);
    }
  };

  this.draw = function(ctx,sprite,x,y,frame,drawW,drawH) {
    var s = this.map[sprite];
    if(!s) return; // Sprite not found
    if(!frame) frame = 0;
    var w = drawW || s.w;
    var h = drawH || s.h;

    // Get the image for this sprite
    var img = s.file ? this.images[s.file] : this.image;

    if(!img) return; // Image not loaded yet

    if(s.file) {
      // Individual image file: draw at exact float coords for smooth sub-pixel rendering
      ctx.drawImage(img, x, y, w, h);
    } else {
      // Spritesheet: crop from the sheet
      ctx.drawImage(img,
                       s.sx + frame * s.w,
                       s.sy,
                       s.w, s.h,
                       x, y,
                       w, h);
    }
  };

  return this;
};

var TitleScreen = function TitleScreen(title,subtitle,callback,opts) {
  var up = false;
  var t = 0;
  opts = opts || {};
  var fadeIn = opts.fadeIn === true;
  var fadeInAlpha = fadeIn ? 1 : 0;
  var fadeInDuration = (typeof opts.fadeInDuration === 'number' && opts.fadeInDuration > 0) ? opts.fadeInDuration : 1.0;
  var duration = opts.duration;       // αν ορισμένο, η οθόνη κρατά τόσο δευτ. και εμφανίζεται γραμμή προόδου
  var showProgressBar = opts.showProgressBar === true && typeof duration === 'number' && duration > 0;
  var done = false;

  // Title figures — transparent PNG ladies, shown left & right, changing every 6 seconds
  // Use _DEMONIK_FILES/_DEMONIK_DIR from game.js (available at runtime); fall back to fig_06/07
  var _figFileList = (typeof _DEMONIK_FILES !== 'undefined' && _DEMONIK_FILES.length > 0)
    ? _DEMONIK_FILES
    : ['fig_06.webp', 'fig_07.webp'];
  var _figDir = (typeof _DEMONIK_DIR !== 'undefined') ? _DEMONIK_DIR : 'images/title_figures/';
  var _figCount = _figFileList.length;
  var _figs = [];
  for(var _fi = 0; _fi < _figCount; _fi++) {
    var _img = new Image();
    _img.src = _figDir + _figFileList[_fi];
    _figs.push(_img);
  }
  // Left and right start at different offsets so they're never the same image
  var _figTimerL = 0, _figTimerR = 0;
  var _figIdxL = 0, _figIdxR = Math.floor(_figCount / 2);
  var _figFadeL = 1, _figFadeR = 1;  // fade alpha for transitions
  var _FIG_INTERVAL = 6.0; // seconds between figure changes


  this.step = function(dt) {
    t += dt;
    if(fadeIn && fadeInAlpha > 0) {
      fadeInAlpha -= dt / fadeInDuration;
      if(fadeInAlpha < 0) fadeInAlpha = 0;
    }
    if(showProgressBar && duration) {
      if(t >= duration && !done) { done = true; if(callback) callback(); return; }
      return; // progress bar active — fire key cannot skip
    }
    if(!Game.keys['fire']) up = true;
    if(up && Game.keys['fire'] && callback && !done) { done = true; callback(); }

    // Rotate left figure every _FIG_INTERVAL seconds
    _figTimerL += dt;
    if(_figTimerL >= _FIG_INTERVAL) {
      _figTimerL = 0;
      _figIdxL = (_figIdxL + 1) % _figCount;
    }
    // Right figure cycles at a different pace (offset by half interval)
    _figTimerR += dt;
    if(_figTimerR >= _FIG_INTERVAL) {
      _figTimerR = 0;
      _figIdxR = (_figIdxR + 1) % _figCount;
    }
    // Keep them different
    if(_figIdxL === _figIdxR) _figIdxR = (_figIdxR + 1) % _figCount;

  };

  this.draw = function(ctx) {
    // Light vignette — let starfield show through
    ctx.fillStyle = 'rgba(0,0,18,0.40)';
    ctx.fillRect(0, 0, Game.width, Game.height);

    // Center spotlight: bright center, darker sides where figures stand
    var _spot = ctx.createRadialGradient(
      Game.width * 0.5, Game.height * 0.48, Game.width * 0.06,
      Game.width * 0.5, Game.height * 0.48, Game.width * 0.72
    );
    _spot.addColorStop(0,    'rgba(255,240,200,0.07)'); // warm glow at center
    _spot.addColorStop(0.35, 'rgba(0,0,0,0)');
    _spot.addColorStop(0.70, 'rgba(0,0,10,0.38)');
    _spot.addColorStop(1,    'rgba(0,0,10,0.72)');      // dark at far edges/figures
    ctx.fillStyle = _spot;
    ctx.fillRect(0, 0, Game.width, Game.height);

    // ---- Figures: left and right, rotating every 6 seconds ----
    var _figH = Math.round(Game.height * 0.80);
    function _drawFig(img, side) {
      if(!img || !img.complete || !img.naturalWidth) return;
      var _fw = Math.round(_figH * (img.naturalWidth / img.naturalHeight));
      // Show 85% of figure width, capped at 32% of screen — more toward center
      var _vis = Math.min(Math.round(_fw * 0.85), Math.round(Game.width * 0.32)) + 20;
      var _figY = Game.height;
      // Draw the figure (no dark vignette — images are transparent PNGs)
      ctx.save();
      ctx.globalAlpha = 0.97;
      if(side === 'left') {
        ctx.translate(_vis, Game.height - _figH);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, _fw, _figH);
      } else {
        ctx.drawImage(img, Game.width - _vis, Game.height - _figH, _fw, _figH);
      }
      ctx.restore();
    }
    _drawFig(_figs[_figIdxL], 'left');
    _drawFig(_figs[_figIdxR], 'right');

    // ---- Title text with multi-layer glow + gentle scale flash ----
    var _tsSzMult = (opts.titleSizeScale !== undefined) ? opts.titleSizeScale : 1.0;
    var titleSize = Math.round(Math.min(58, Math.max(24, Math.floor(Game.width / 13))) * _tsSzMult);
    // Centred vertically — between the figures' shoulder and knee zone
    var titleY = (opts.titleY !== undefined) ? opts.titleY : Game.height * 0.65;
    var pulse = 0.72 + 0.28 * Math.sin(t * 2.3);
    // Scale pulse — amplitude can be overridden per screen
    var _tsAmp = (opts.titleScaleAmplitude !== undefined) ? opts.titleScaleAmplitude : 0.10;
    var titleScale = 1.0 + _tsAmp * Math.sin(t * 2.3);

    // Color cycling — 2s hold per color, 0.5s crossfade
    var _titleColors = [
      { text: '#FFFFFF', glow: '#00AAFF', mid: '#66CCFF', outer: '#0088CC' },
      { text: '#FFD700', glow: '#FF8800', mid: '#FFCC44', outer: '#AA5500' },
      { text: '#00FFFF', glow: '#0088FF', mid: '#44DDFF', outer: '#005599' },
      { text: '#FF44FF', glow: '#AA00FF', mid: '#FF88FF', outer: '#660099' },
      { text: '#44FF88', glow: '#00CC44', mid: '#88FFCC', outer: '#006622' },
      { text: '#FF8844', glow: '#FF2200', mid: '#FFBB66', outer: '#991100' },
    ];
    var _tcLen = _titleColors.length;
    var _tcTotal = 2.5; // 2s hold + 0.5s fade
    var _tcPhase = (t % (_tcTotal * _tcLen)) / _tcTotal;
    var _tcIdx  = Math.floor(_tcPhase) % _tcLen;
    var _tcNext = (_tcIdx + 1) % _tcLen;
    var _tcFrac = _tcPhase - Math.floor(_tcPhase);
    var _tcBlend = _tcFrac < 0.8 ? 0 : (_tcFrac - 0.8) / 0.2; // 0→1 during last 0.5s
    var _tcA = _titleColors[_tcIdx];
    var _tcB = _titleColors[_tcNext];

    ctx.save();
    ctx.font = 'bold ' + titleSize + 'px Uncial Antiqua, Arial Black, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(Game.width / 2, titleY);
    ctx.scale(titleScale, titleScale);

    // Outermost wide glow
    ctx.globalAlpha = 0.28 * pulse * (1 - _tcBlend);
    ctx.shadowColor = _tcA.glow; ctx.shadowBlur = 60;
    ctx.fillStyle = _tcA.outer;
    ctx.fillText(title, 0, 0);
    if(_tcBlend > 0) {
      ctx.globalAlpha = 0.28 * pulse * _tcBlend;
      ctx.shadowColor = _tcB.glow;
      ctx.fillStyle = _tcB.outer;
      ctx.fillText(title, 0, 0);
    }

    // Mid glow
    ctx.globalAlpha = 0.6 * (1 - _tcBlend);
    ctx.shadowBlur = 28 * pulse;
    ctx.shadowColor = _tcA.glow;
    ctx.fillStyle = _tcA.mid;
    ctx.fillText(title, 0, 0);
    if(_tcBlend > 0) {
      ctx.globalAlpha = 0.6 * _tcBlend;
      ctx.shadowColor = _tcB.glow;
      ctx.fillStyle = _tcB.mid;
      ctx.fillText(title, 0, 0);
    }

    // Solid bright text
    ctx.shadowBlur = 8;
    ctx.globalAlpha = 1 - _tcBlend;
    ctx.shadowColor = _tcA.glow;
    ctx.fillStyle = _tcA.text;
    ctx.fillText(title, 0, 0);
    if(_tcBlend > 0) {
      ctx.globalAlpha = _tcBlend;
      ctx.shadowColor = _tcB.glow;
      ctx.fillStyle = _tcB.text;
      ctx.fillText(title, 0, 0);
    }
    ctx.restore();

    // ---- Subtitle (σταθερό, χωρίς flashing/scale) ----
    var subSize = Math.max(11, Math.floor(Game.width / 38));
    // First subtitle line: below title bottom + comfortable gap
    var _subY0 = titleY + titleSize * 0.5 + subSize + 18;
    ctx.save();
    ctx.font = 'bold ' + subSize + 'px Uncial Antiqua, Arial Black, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.9;
    ctx.shadowColor = '#FFFF00';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#FFFF55';
    var _subLines = Array.isArray(subtitle) ? subtitle : [subtitle];
    for(var _sl = 0; _sl < _subLines.length; _sl++) {
      ctx.fillText(_subLines[_sl], Game.width / 2, _subY0 + _sl * (subSize * 1.5));
    }
    ctx.restore();

    // ---- Γραμμή προόδου (όταν duration/showProgressBar) — όπως στα άλλα stages ----
    var _lastSubY = _subY0 + Math.max(0, _subLines.length - 1) * (subSize * 1.5);
    if(showProgressBar && duration) {
      var barH2 = 5;
      var barW = Math.min(Game.width * 0.50, 260);
      var barX = (Game.width - barW) / 2;
      var barY = _lastSubY + subSize + 22;
      var prog = Math.min(1, t / duration);
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#112233';
      ctx.fillRect(barX, barY, barW, barH2);
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = '#00CCFF';
      ctx.fillRect(barX, barY, barW * prog, barH2);
      ctx.restore();
    }

    // ---- Author / copyright — fixed at the very bottom of the screen (σταθερό, χωρίς flashing) ----
    var creditFade = 0.9;
    var _cSc = Math.max(0.55, Math.min(1.4, Game.height / 600));
    var _nameSize  = Math.round(22 * _cSc);
    var _labelSize = Math.round(14 * _cSc);
    var _copySize  = Math.round(13 * _cSc);
    // Slightly tighter vertical gaps and a touch higher for even spacing
    var _gap       = Math.round(19 * _cSc);
    var creditY    = Game.height - Math.round(58 * _cSc);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // "Created by"
    ctx.font = 'bold ' + _labelSize + 'px Arial';
    ctx.globalAlpha = creditFade * 0.75;
    ctx.shadowColor = '#88AAFF';
    ctx.shadowBlur = 6;
    ctx.fillStyle = '#AACCFF';
    ctx.fillText('Created by', Game.width / 2, creditY);

    // "Georgios Chimonides"
    ctx.font = 'bold ' + _nameSize + 'px Arial';
    ctx.globalAlpha = creditFade;
    ctx.shadowColor = '#AADDFF';
    ctx.shadowBlur = 16;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Georgios Chimonides', Game.width / 2, creditY + _gap);

    // "© 2026  All rights reserved"
    ctx.font = _copySize + 'px Arial';
    ctx.globalAlpha = creditFade * 0.75;
    ctx.shadowColor = '#6688CC';
    ctx.shadowBlur = 5;
    ctx.fillStyle = '#99AACC';
    ctx.fillText('\u00A9 2026  \u2022  All rights reserved', Game.width / 2, creditY + _gap * 2);
    ctx.restore();

    // Μετά τη μεταλλαγή βίντεο: ξεκινάμε από σκοτάδι και δίνουμε φως (fade-in)
    if(fadeIn && fadeInAlpha > 0) {
      ctx.fillStyle = 'rgba(0,0,0,' + fadeInAlpha + ')';
      ctx.fillRect(0, 0, Game.width, Game.height);
    }
  };
};


var GameBoard = function() {
  // The current list of objects
  this.objects = [];
  this.cnt = {};
  this.removed = []; // Initialize removed array to prevent undefined error

  // Add a new object to the object list
  this.add = function(obj) { 
    obj.board=this; 
    this.objects.push(obj); 
    this.cnt[obj.type] = (this.cnt[obj.type] || 0) + 1;
    return obj; 
  };

  // Mark an object for removal
  this.remove = function(obj) { 
    var idx = this.removed.indexOf(obj);
    if(idx === -1) {
      this.removed.push(obj); 
      return true;
    } else {
      return false;
    }
  };

  // Reset the list of removed objects
  this.resetRemoved = function() { this.removed = []; };

  // Removed an objects marked for removal from the list
  this.finalizeRemoved = function() {
    for(var i=0,len=this.removed.length;i<len;i++) {
      var idx = this.objects.indexOf(this.removed[i]);
      if(idx !== -1) {
        this.cnt[this.removed[i].type]--;
        this.objects.splice(idx,1);
      }
    }
  };

  // Call the same method on all current objects 
  this.iterate = function(funcName) {
     var args = Array.prototype.slice.call(arguments,1);
     for(var i=0,len=this.objects.length;i<len;i++) {
       var obj = this.objects[i];
       obj[funcName].apply(obj,args);
     }
  };

  // Find the first object for which func is true
  this.detect = function(func) {
    for(var i = 0, len=this.objects.length; i < len; i++) {
      if(func.call(this.objects[i])) return this.objects[i];
    }
    return false;
  };

  // Call step on all objects and then delete
  // any object that have been marked for removal
  // If Game.timeSlowFactor < 1, enemies/enemy-projectiles get reduced dt
  this.step = function(dt) {
    this.resetRemoved();
    var slowF = (typeof Game !== 'undefined' && Game.timeSlowFactor) ? Game.timeSlowFactor : 1.0;
    for(var i = 0, len = this.objects.length; i < len; i++) {
      var obj = this.objects[i];
      // OBJECT_ENEMY=4, OBJECT_ENEMY_PROJECTILE=8 → bitmask 12
      var objDt = (slowF < 1.0 && obj.type && (obj.type & 12)) ? dt * slowF : dt;
      obj.step(objDt);
    }
    this.finalizeRemoved();
  };

  // Draw all the objects
  this.draw= function(ctx) {
    this.iterate('draw',ctx);
  };

  // Check for a collision between the
  // bounding rects of two objects
  this.overlap = function(o1,o2) {
    // Safety check: ensure dimensions exist
    if(!o1.w || !o1.h || !o2.w || !o2.h) return false;
    return !((o1.y+o1.h-1<o2.y) || (o1.y>o2.y+o2.h-1) ||
             (o1.x+o1.w-1<o2.x) || (o1.x>o2.x+o2.w-1));
  };

  // Find the object that collides with obj
  // Returns the one with highest Y (visually in front, closest to player)
  // match against an optional type
  this.collide = function(obj,type) {
    var bestMatch = null;
    var bestY = -Infinity;

    for(var i = 0; i < this.objects.length; i++) {
      var other = this.objects[i];
      if(obj !== other) {
        var typeMatch = !type || (other.type & type);
        if(typeMatch && this.overlap(obj, other)) {
          // Pick the enemy with highest Y (closest to player)
          if(other.y > bestY) {
            bestY = other.y;
            bestMatch = other;
          }
        }
      }
    }
    return bestMatch;
  };


};

var Sprite = function() { };

Sprite.prototype.setup = function(sprite,props) {
  this.sprite = sprite;
  this.merge(props);
  this.frame = this.frame || 0;
  var _ss = Game.spriteScale || 1.0;
  var _sm = SpriteSheet.map[sprite];
  if(!_sm) { console.error('Sprite.setup: MISSING sprite key:', JSON.stringify(sprite)); this.w = 64; this.h = 64; return; }
  this.w = Math.round(_sm.w * _ss);
  this.h = Math.round(_sm.h * _ss);
};

Sprite.prototype.merge = function(props) {
  if(props) {
    for (var prop in props) {
      this[prop] = props[prop];
    }
  }
};

Sprite.prototype.draw = function(ctx) {
  SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame,this.w,this.h);
};

Sprite.prototype.hit = function(damage) {
  this.board.remove(this);
};


var Level = function(levelData,callback) {
  this.levelData = [];
  for(var i =0; i<levelData.length; i++) {
    this.levelData.push(Object.create(levelData[i]));
  }
  this.t = 0;
  this.callback = callback;
  this.done = false; // fires callback only once
};

Level.prototype.step = function(dt) {
  var idx = 0, remove = [], curShip = null;

  // Update the current time offset
  this.t += dt * 1000;

  //   Start, End,  Gap, Type,   Override
  // [ 0,     4000, 500, 'step', { x: 100 } ]
  while((curShip = this.levelData[idx]) &&
        (curShip[0] < this.t + 2000)) {
    // Check if we've passed the end time
    if(this.t > curShip[1]) {
      remove.push(curShip);
    } else if(curShip[0] < this.t) {
      var type = curShip[3];
      var override = curShip[4];

      // Special spawn types
      if(type === 'grid_formation') {
        // Spawn a grid formation (one-time)
        var grid = new GridFormation(override || {});
        this.board.add(grid);
        grid.init(this.board);
        // Set gap huge so it only spawns once
        curShip[0] = curShip[1] + 1;
      } else if(type === 'bonus_flyby') {
        // Spawn a bonus ship
        this.board.add(new BonusShip(override || {}));
        curShip[0] += curShip[2];
      } else if(type === 'falling_row') {
        // Spawn a falling row
        var fr = new FallingRow(override || {});
        fr.init(this.board);
        curShip[0] = curShip[1] + 1;
      } else if(type === 'zigzag_enemy') {
        // Spawn a ZigZagEnemy (sin-wave movement)
        var zSpr = (override && override.sprite) || pickAlien(2);
        var zX   = override && override.x !== undefined ? (override.x / 320) * Game.width : Game.width * (0.15 + Math.random() * 0.7);
        this.board.add(new ZigZagEnemy(zSpr, zX));
        curShip[0] += curShip[2];
      } else if(type === 'spiral_enemy') {
        // Spawn a SpiralEnemy (rotation-based spiral path)
        var sSpr = (override && override.sprite) || pickAlien(5);
        var sX   = override && override.x !== undefined ? (override.x / 320) * Game.width : Game.width * (0.15 + Math.random() * 0.7);
        this.board.add(new SpiralEnemy(sSpr, sX));
        curShip[0] += curShip[2];
      } else if(type === 'alien_head') {
        // Spawn an AlienHeadEnemy (portrait alien face, 10 movement patterns)
        this.board.add(new AlienHeadEnemy(override || {}));
        curShip[0] += curShip[2];
      } else if(type === 'siren_portrait') {
        // Spawn a SirenPortrait (holo-portrait boss; chains to next portrait on death)
        this.board.add(new SirenPortrait(override || {}));
        curShip[0] = curShip[1] + 1; // one-time spawn
      } else {
        // Normal enemy spawn
        var enemy = enemies[type];
        if(typeof enemy === 'function') {
          enemy = enemy.call(enemies);
        }

        // Scale override x position for fullscreen
        if(override && override.x !== undefined) {
          override.x = (override.x / 320) * Game.width;
        }

        // Add a new enemy with the blueprint and override
        this.board.add(new Enemy(enemy,override));

        // Increment the start time by the gap
        curShip[0] += curShip[2];
      }
    }
    idx++;
  }

  // Remove any objects from the levelData that have passed
  for(var i=0,len=remove.length;i<len;i++) {
    var remIdx = this.levelData.indexOf(remove[i]);
    if(remIdx !== -1) this.levelData.splice(remIdx,1);
  }

  // Advance immediately when all spawns are done AND no enemies remain on screen
  if(!this.done && this.levelData.length === 0 && this.board.cnt[OBJECT_ENEMY] === 0) {
    this.done = true;
    if(this.callback) this.callback();
  }

};

Level.prototype.draw = function() { };


var TouchControls = function() {

  // Removed — touch controls are handled by tap/drag gestures directly
  var ctrlH = 0;

  function layout() {
    return { ctrlY: Game.height, btnBomb: { x:0,y:0,w:0,h:0 }, btnFire: { x:0,y:0,w:0,h:0 } };
  }

  // Drag tracking for MOVE zone
  var moveTouch = null; // { id, startX, currentX }
  var MOVE_DEAD = 3;    // px dead zone — almost instant response
  var MOVE_MAX  = 32;   // px for full speed — short drag = max speed
  Game.mobileMoveX = 0;

  // Multi-touch tracking for BOMB/FIRE buttons
  var activeTouches = {};

  // Cache canvas rect — updated on resize/orientationchange so canvasPos() doesn't trigger layout every touch
  var _touchRect = Game.canvas.getBoundingClientRect();
  var _updateTouchRect = function() { _touchRect = Game.canvas.getBoundingClientRect(); };
  window.addEventListener('resize', _updateTouchRect, false);
  window.addEventListener('orientationchange', _updateTouchRect, false);

  function canvasPos(touch) {
    return {
      x: (touch.clientX - _touchRect.left) * (Game.canvas.width  / _touchRect.width),
      y: (touch.clientY - _touchRect.top)  * (Game.canvas.height / _touchRect.height)
    };
  }

  function hitTest(btn, x, y) {
    return x >= btn.x && x <= btn.x + btn.w &&
           y >= btn.y && y <= btn.y + btn.h;
  }

  function zoneAt(x, y) {
    var L = layout();
    if (hitTest(L.btnBomb, x, y)) return 'rocket';
    if (hitTest(L.btnFire, x, y)) return 'fire';
    return 'move'; // anywhere else on screen = drag to move
  }

  function updateMoveX() {
    if (!moveTouch) { Game.mobileMoveX = 0; return; }
    var dx = moveTouch.currentX - moveTouch.startX;
    if (Math.abs(dx) < MOVE_DEAD) { Game.mobileMoveX = 0; return; }
    Game.mobileMoveX = Math.max(-1, Math.min(1, dx / MOVE_MAX));
  }

  this.trackTouch = function(e) {
    e.preventDefault();
    var changed = e.changedTouches;

    for (var i = 0; i < changed.length; i++) {
      var t   = changed[i];
      var pos = canvasPos(t);
      var id  = t.identifier;

      if (e.type === 'touchstart') {
        var z = zoneAt(pos.x, pos.y);
        if (!z) continue;
        if (z === 'move') {
          if (!moveTouch) {
            moveTouch = { id: id, startX: pos.x, currentX: pos.x };
            Game.mobileMoveX = 0;
          }
        } else {
          activeTouches[id] = z;
          Game.keys[z] = true;
        }

      } else if (e.type === 'touchmove') {
        // Update drag movement
        if (moveTouch && id === moveTouch.id) {
          moveTouch.currentX = pos.x;
          updateMoveX();
        }

      } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        if (moveTouch && id === moveTouch.id) {
          moveTouch = null;
          Game.mobileMoveX = 0;
        } else {
          var z = activeTouches[id];
          delete activeTouches[id];
          if (z) {
            var held = false;
            for (var tid in activeTouches) {
              if (activeTouches[tid] === z) { held = true; break; }
            }
            if (!held) Game.keys[z] = false;
          }
        }
      }
    }
  };

  // ── Drawing ──────────────────────────────────────────────────────────────

  this.draw = function() {};

  this.step = function() {};

  var opts = { passive: false, capture: true };
  Game.canvas.addEventListener('touchstart',  this.trackTouch, opts);
  Game.canvas.addEventListener('touchmove',   this.trackTouch, opts);
  Game.canvas.addEventListener('touchend',    this.trackTouch, opts);
  Game.canvas.addEventListener('touchcancel', this.trackTouch, opts);
  Game.canvas.addEventListener('dblclick',    function(e) { e.preventDefault(); }, true);

  // Keep player ship above control bar
  Game.playerOffset = ctrlH + 10;
};


var GamePoints = function() {
  // Do NOT reset Game.points here — reset happens only on new game (currentLevel===1 in playGame)

  var pointsLength = 8;

  this.draw = function(ctx) {
    ctx.save();
    ctx.textBaseline = 'top';

    // Score value - LEFT side
    var scoreSize = Math.max(14, Math.floor(Game.width / 32));
    ctx.font = 'bold ' + scoreSize + 'px Uncial Antiqua, Bangers, Arial';
    ctx.textAlign = 'left';
    var txt = String(Game.points).padStart(pointsLength, '0');
    ctx.shadowColor = '#00FFFF';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#00FFFF';
    ctx.fillText(txt, 10, 8);
    var scoreTextWidth = ctx.measureText(txt).width;

    // High score - LEFT side, below score
    var hiSize = Math.max(9, Math.floor(Game.width / 55));
    if(typeof highScore !== 'undefined') {
      ctx.font = 'bold ' + hiSize + 'px Arial';
      ctx.textAlign = 'left';
      ctx.shadowColor = '#FFAA00';
      ctx.shadowBlur = 6;
      ctx.fillStyle = '#FFAA00';
      ctx.fillText('HI: ' + highScore, 10, scoreSize + 12);
    }

    // === COMBO MULTIPLIER DISPLAY — right of score, same line, 100px gap ===
    if(typeof comboMult !== 'undefined' && comboMult > 1 && typeof comboTimer !== 'undefined' && comboTimer > 0) {
      var fadeAlpha = Math.min(1, comboTimer * 3);
      var comboSize = Math.max(16, Math.floor(Game.width / 28));
      ctx.globalAlpha = fadeAlpha;
      ctx.font = 'bold ' + comboSize + 'px Uncial Antiqua, Bangers, Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      var comboColor = comboMult >= 6 ? '#FF4400' : comboMult >= 4 ? '#FF8800' : '#FFCC00';
      ctx.shadowColor = comboColor;
      ctx.shadowBlur = 18;
      ctx.fillStyle = comboColor;
      ctx.fillText(comboMult + 'x COMBO', 10 + scoreTextWidth + 100, 8);
    }

    // === POWER-UP TIMER BARS (left side, below hi-score) ===
    if(typeof playerShip !== 'undefined' && playerShip) {
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      var barBaseY = scoreSize + hiSize + 22; // Better spacing
      var barW = 70;
      var barH = 4;
      var labelSz = Math.max(8, Math.floor(Game.width / 80));
      var labelOff = 32;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold ' + labelSz + 'px Arial';
      var yOff = 0;

      if(playerShip.speedBoostTimer > 0) {
        ctx.fillStyle = '#00FF88'; ctx.shadowColor = '#00FF88'; ctx.shadowBlur = 4;
        ctx.fillText('SPD', 10, barBaseY + yOff + barH / 2);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#222'; ctx.fillRect(10 + labelOff, barBaseY + yOff, barW, barH);
        ctx.fillStyle = '#00FF88'; ctx.fillRect(10 + labelOff, barBaseY + yOff, barW * (playerShip.speedBoostTimer / 10), barH);
        yOff += barH + 5;
      }
      if(playerShip.powerShotTimer > 0) {
        ctx.fillStyle = '#FF8800'; ctx.shadowColor = '#FF8800'; ctx.shadowBlur = 4;
        ctx.fillText('PWR', 10, barBaseY + yOff + barH / 2);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#222'; ctx.fillRect(10 + labelOff, barBaseY + yOff, barW, barH);
        ctx.fillStyle = '#FF8800'; ctx.fillRect(10 + labelOff, barBaseY + yOff, barW * (playerShip.powerShotTimer / 10), barH);
        yOff += barH + 5;
      }
      // Rocket reload indicator
      if(playerShip.rocketReload > 0) {
        var rReady = 1 - Math.max(0, playerShip.rocketReload / playerShip.rocketReloadTime);
        ctx.fillStyle = '#BB44FF'; ctx.shadowColor = '#BB44FF'; ctx.shadowBlur = 4;
        ctx.fillText('RKT', 10, barBaseY + yOff + barH / 2);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#222'; ctx.fillRect(10 + labelOff, barBaseY + yOff, barW, barH);
        ctx.fillStyle = '#BB44FF'; ctx.fillRect(10 + labelOff, barBaseY + yOff, barW * rReady, barH);
      } else {
        ctx.fillStyle = '#DD88FF'; ctx.shadowColor = '#DD88FF'; ctx.shadowBlur = 5;
        ctx.fillText('RKT \u25CF', 10, barBaseY + yOff + barH / 2);
        ctx.shadowBlur = 0;
      }
    }

    ctx.restore();
  };

  this.step = function(dt) {
    if(typeof comboTimer !== 'undefined' && comboTimer > 0) {
      comboTimer -= dt;
      if(comboTimer <= 0) { comboCount = 0; comboMult = 1; }
    }
  };
};
 
 
  
