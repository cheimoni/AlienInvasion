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

    this.playerOffset = 10;
    this.canvasMultiplier= 1;
    this.scale = 1; // Default scale
    this.setupMobile();

    // Make canvas fullscreen on desktop
    this.makeFullscreen();

    // Show canvas with fade-in effect (prevents black flash)
    this.canvas.classList.add('game-ready');

    // Only set width/height if makeFullscreen didn't set them
    if(!this.fullscreenMode) {
      this.width = this.canvas.width;
      this.height = this.canvas.height;
    }

    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
    if(!this.ctx) { return alert("Please upgrade your browser to play"); }

    this.setupInput();

    this.loop();

    if(this.mobile) {
      this.setBoard(4,new TouchControls());
    }

    SpriteSheet.load(sprite_data,callback);
  };

  // Fullscreen functionality
  this.makeFullscreen = function() {
    var hasTouch = !!('ontouchstart' in window);
    if(hasTouch) return; // Skip on mobile

    this.fullscreenMode = true;

    // Set canvas to window size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = 'fixed';
    this.canvas.style.left = '0';
    this.canvas.style.top = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    // Hide body overflow
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';

    // Use full canvas dimensions for game
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // Handle resize
    var self = this;
    window.addEventListener('resize', function() {
      self.canvas.width = window.innerWidth;
      self.canvas.height = window.innerHeight;
      self.width = self.canvas.width;
      self.height = self.canvas.height;
    });
  };
  

  // Handle Input
  var KEY_CODES = { 37:'left', 39:'right', 32 :'fire', 77:'mute' };
  this.keys = {};

  this.setupInput = function() {
    window.addEventListener('keydown',function(e) {
      if(KEY_CODES[e.keyCode]) {
       Game.keys[KEY_CODES[e.keyCode]] = true;
       e.preventDefault();
      }
      // M key toggles sound
      if(e.keyCode === 77) {
        SoundManager.toggleMute();
      }
    },false);

    window.addEventListener('keyup',function(e) {
      if(KEY_CODES[e.keyCode]) {
       Game.keys[KEY_CODES[e.keyCode]] = false;
       e.preventDefault();
      }
    },false);

    // Mouse position tracking for ship movement
    this.mouseX = Game.width / 2;
    this.canvas.addEventListener('mousemove',function(e) {
      var rect = Game.canvas.getBoundingClientRect();
      Game.mouseX = (e.clientX - rect.left) * (Game.width / rect.width);
    },false);

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


  var lastTime = new Date().getTime();
  var maxTime = 1/30;
  // Game Loop
  this.loop = function() {
    var curTime = new Date().getTime();
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

    for(var i=0,len = boards.length;i<len;i++) {
      if(boards[i]) {
        boards[i].step(dt);
        boards[i].draw(Game.ctx);
      }
    }

    Game.ctx.restore();
    lastTime = curTime;
  };
  
  // Change an active game board
  this.setBoard = function(num,board) { boards[num] = board; };


  this.setupMobile = function() {
    var container = document.getElementById("container"),
        hasTouch =  !!('ontouchstart' in window),
        w = window.innerWidth, h = window.innerHeight;
      
    if(hasTouch) { this.mobile = true; }

    if(screen.width >= 1280 || !hasTouch) { return false; }

    if(w > h) {
      alert("Please rotate the device and then click OK");
      w = window.innerWidth; h = window.innerHeight;
    }

    container.style.height = h*2 + "px";
    window.scrollTo(0,1);

    h = window.innerHeight + 2;
    container.style.height = h + "px";
    container.style.width = w + "px";
    container.style.padding = 0;

    if(h >= this.canvas.height * 1.75 || w >= this.canvas.height * 1.75) {
      this.canvasMultiplier = 2;
      this.canvas.width = w / 2;
      this.canvas.height = h / 2;
      this.canvas.style.width = w + "px";
      this.canvas.style.height = h + "px";
    } else {
      this.canvas.width = w;
      this.canvas.height = h;
    }

    this.canvas.style.position='absolute';
    this.canvas.style.left="0px";
    this.canvas.style.top="0px";

  };

};


var SpriteSheet = new function() {
  this.map = { };
  this.images = {}; // Store multiple images
  this.image = null; // Default image

  this.load = function(spriteData,callback) {
    this.map = spriteData;

    // Collect unique image files in an array
    var imageFiles = [];
    var addedFiles = {};

    for(var key in spriteData) {
      var file = spriteData[key].file || 'images/sprites.png';
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
          if(file === 'images/sprites.png') {
            self.image = img;
          }
          loadedCount++;
          if(loadedCount === totalImages && callback) {
            callback();
          }
        };
        img.onerror = function() {
          console.log('Failed to load image: ' + file);
          loadedCount++;
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
      // Individual image file: draw the ENTIRE image scaled to the sprite size
      ctx.drawImage(img,
                       Math.floor(x), Math.floor(y),
                       w, h);
    } else {
      // Spritesheet: crop from the sheet
      ctx.drawImage(img,
                       s.sx + frame * s.w,
                       s.sy,
                       s.w, s.h,
                       Math.floor(x), Math.floor(y),
                       w, h);
    }
  };

  return this;
};

var TitleScreen = function TitleScreen(title,subtitle,callback) {
  var up = false;
  var t = 0;
  // Floating energy particles for atmosphere
  var particles = [];
  for(var i = 0; i < 45; i++) {
    particles.push({
      x: Math.random() * (Game.width || 800),
      y: Math.random() * (Game.height || 600),
      vx: (Math.random() - 0.5) * 22,
      vy: -(4 + Math.random() * 18),
      size: 0.8 + Math.random() * 2.2,
      alpha: 0.3 + Math.random() * 0.6,
      color: ['#00FFFF','#FF44FF','#FFFF44','#FF8800','#00FF88','#FF4466'][Math.floor(Math.random() * 6)]
    });
  }

  this.step = function(dt) {
    t += dt;
    if(!Game.keys['fire']) up = true;
    if(up && Game.keys['fire'] && callback) callback();
    for(var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if(p.y < -6) { p.y = Game.height + 6; p.x = Math.random() * Game.width; }
      if(p.x < 0) p.x = Game.width;
      if(p.x > Game.width) p.x = 0;
    }
  };

  this.draw = function(ctx) {
    // Dark vignette overlay
    ctx.fillStyle = 'rgba(0,0,18,0.72)';
    ctx.fillRect(0, 0, Game.width, Game.height);

    // Animated energy particles
    ctx.save();
    for(var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var flicker = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.7 + i * 0.9));
      ctx.globalAlpha = p.alpha * flicker;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // ---- Title text with multi-layer glow ----
    var titleSize = Math.max(30, Math.floor(Game.width / 9));
    var titleY = Game.height * 0.42;
    var pulse = 0.72 + 0.28 * Math.sin(t * 2.3);

    ctx.save();
    ctx.font = 'bold ' + titleSize + 'px Bangers, Arial Black, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Outermost wide glow
    ctx.globalAlpha = 0.28 * pulse;
    ctx.shadowColor = '#00AAFF';
    ctx.shadowBlur = 60;
    ctx.fillStyle = '#0088CC';
    ctx.fillText(title, Game.width / 2, titleY);

    // Mid glow
    ctx.globalAlpha = 0.6;
    ctx.shadowBlur = 28 * pulse;
    ctx.fillStyle = '#66CCFF';
    ctx.fillText(title, Game.width / 2, titleY);

    // Solid bright text
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#AADDFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(title, Game.width / 2, titleY);
    ctx.restore();

    // ---- Subtitle pulsing ----
    var subSize = Math.max(13, Math.floor(Game.width / 28));
    var subPulse = 0.45 + 0.55 * Math.sin(t * 3.6);
    ctx.save();
    ctx.font = 'bold ' + subSize + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.55 + 0.45 * subPulse;
    ctx.shadowColor = '#FFFF00';
    ctx.shadowBlur = 14 * subPulse;
    ctx.fillStyle = '#FFFF55';
    ctx.fillText(subtitle, Game.width / 2, titleY + titleSize * 1.35);
    ctx.restore();
  };
};


var GameBoard = function() {
  var board = this;

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
    if(idx == -1) {
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
      if(idx != -1) {
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
    for(var i = 0,val=null, len=this.objects.length; i < len; i++) {
      if(func.call(this.objects[i])) return this.objects[i];
    }
    return false;
  };

  // Call step on all objects and them delete
  // any object that have been marked for removal
  this.step = function(dt) { 
    this.resetRemoved();
    this.iterate('step',dt);
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
      if(obj != other) {
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
  this.w =  SpriteSheet.map[sprite].w;
  this.h =  SpriteSheet.map[sprite].h;
};

Sprite.prototype.merge = function(props) {
  if(props) {
    for (var prop in props) {
      this[prop] = props[prop];
    }
  }
};

Sprite.prototype.draw = function(ctx) {
  SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
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
    if(remIdx != -1) this.levelData.splice(remIdx,1);
  }

  // If there are no more enemies on the board or in
  // levelData, this level is done
  if(this.levelData.length === 0 && this.board.cnt[OBJECT_ENEMY] === 0) {
    if(this.callback) this.callback();
  }

};

Level.prototype.draw = function(ctx) { };


var TouchControls = function() {

  var gutterWidth = 10;
  var unitWidth = Game.width/5;
  var blockWidth = unitWidth-gutterWidth;

  this.drawSquare = function(ctx,x,y,txt,on) {
    ctx.globalAlpha = on ? 0.9 : 0.6;
    ctx.fillStyle =  "#CCC";
    ctx.fillRect(x,y,blockWidth,blockWidth);

    ctx.fillStyle = "#FFF";
    ctx.globalAlpha = 1.0;
    ctx.font = "bold " + (3*unitWidth/4) + "px arial";

    var txtSize = ctx.measureText(txt);

    ctx.fillText(txt, 
                 x+blockWidth/2-txtSize.width/2, 
                 y+3*blockWidth/4+5);
  };

  this.draw = function(ctx) {
    ctx.save();

    var yLoc = Game.height - unitWidth;
    this.drawSquare(ctx,gutterWidth,yLoc,"\u25C0", Game.keys['left']);
    this.drawSquare(ctx,unitWidth + gutterWidth,yLoc,"\u25B6", Game.keys['right']);
    this.drawSquare(ctx,4*unitWidth,yLoc,"A",Game.keys['fire']);

    ctx.restore();
  };

  this.step = function(dt) { };

  this.trackTouch = function(e) {
    var touch, x;

    e.preventDefault();
    Game.keys['left'] = false;
    Game.keys['right'] = false;
    for(var i=0;i<e.targetTouches.length;i++) {
      touch = e.targetTouches[i];
      x = touch.pageX / Game.canvasMultiplier - Game.canvas.offsetLeft;
      if(x < unitWidth) {
        Game.keys['left'] = true;
      } 
      if(x > unitWidth && x < 2*unitWidth) {
        Game.keys['right'] = true;
      } 
    }

    if(e.type == 'touchstart' || e.type == 'touchend') {
      for(i=0;i<e.changedTouches.length;i++) {
        touch = e.changedTouches[i];
        x = touch.pageX / Game.canvasMultiplier - Game.canvas.offsetLeft;
        if(x > 4 * unitWidth) {
          Game.keys['fire'] = (e.type == 'touchstart');
        }
      }
    }
  };

  Game.canvas.addEventListener('touchstart',this.trackTouch,true);
  Game.canvas.addEventListener('touchmove',this.trackTouch,true);
  Game.canvas.addEventListener('touchend',this.trackTouch,true);

  // For Android
  Game.canvas.addEventListener('dblclick',function(e) { e.preventDefault(); },true);
  Game.canvas.addEventListener('click',function(e) { e.preventDefault(); },true);

  Game.playerOffset = unitWidth + 20;
};


var GamePoints = function() {
  Game.points = 0;

  var pointsLength = 8;

  this.draw = function(ctx) {
    ctx.save();
    ctx.textBaseline = 'top';

    // Score value - LEFT side
    var scoreSize = Math.max(14, Math.floor(Game.width / 32));
    ctx.font = 'bold ' + scoreSize + 'px Bangers, Arial';
    ctx.textAlign = 'left';
    var txt = '' + Game.points;
    var zeros = '';
    var i = pointsLength - txt.length;
    while(i-- > 0) { zeros += '0'; }
    ctx.shadowColor = '#00FFFF';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#00FFFF';
    ctx.fillText(zeros + txt, 10, 8);

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

    // === COMBO MULTIPLIER DISPLAY (centered, at top of screen) - NO TIMER BAR ===
    if(typeof comboMult !== 'undefined' && comboMult > 1 && typeof comboTimer !== 'undefined' && comboTimer > 0) {
      var fadeAlpha = Math.min(1, comboTimer * 3);
      var comboSize = Math.max(16, Math.floor(Game.width / 28));
      ctx.globalAlpha = fadeAlpha;
      ctx.font = 'bold ' + comboSize + 'px Bangers, Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      var comboColor = comboMult >= 6 ? '#FF4400' : comboMult >= 4 ? '#FF8800' : '#FFCC00';
      ctx.shadowColor = comboColor;
      ctx.shadowBlur = 18;
      ctx.fillStyle = comboColor;
      ctx.fillText(comboMult + 'x COMBO', Game.width / 2, 6); // Top of screen, no bar
    }

    // === POWER-UP TIMER BARS (left side, below high score) ===
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
 
 
  
