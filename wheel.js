// wheel.js — Τροχός της Τύχης (Wheel of Fortune) bonus stage
// Appears every 8 completed levels. Player spins the wheel to win bonus points.

var WheelBonusScreen = function(completedLevel, onComplete) {

  // ─── Image pools ───────────────────────────────────────────────────
  var WHEEL_DIR  = 'images/\u03a4\u03c1\u03bf\u03c7\u03cc\u03c2 \u03c4\u03b7\u03c2 \u03a4\u03cd\u03c7\u03b7\u03c2/';
  var FIGURE_DIR = 'images/\u03a6\u03b9\u03b3\u03bf\u03cd\u03c1\u03b5\u03c2 \u03b1\u03c1\u03b9\u03c3\u03c4\u03b5\u03c1\u03ac \u03ba\u03b1\u03b9 \u03b4\u03b5\u03be\u03b9\u03ac \u03c4\u03bf\u03c5 \u03c4\u03c1\u03bf\u03c7\u03bf\u03cd \u03c4\u03b7\u03c2 \u03c4\u03cd\u03c7\u03b7\u03c2/';

  var WHEEL_FILES = [
    'Remove_background_completely_make_100_transparen-1771833495754.webp',
    'Remove_background_completely_make_100_transparen-1771833665422.webp',
    'Remove_background_completely_make_100_transparen-1771833674471.webp',
    'Remove_background_completely_make_100_transparen-1771833674516.webp',
    'Remove_background_completely_make_100_transparen-1771833693458.webp',
    'Remove_background_completely_make_100_transparen-1771833694243.webp',
    'Remove_background_completely_make_100_transparen-1771833695071.webp',
    'Remove_background_completely_make_100_transparen-1771833695967.webp',
    'Remove_background_completely_make_100_transparen-1771833701501.webp',
    'Remove_background_completely_make_100_transparen-1771833715219.webp',
    'Remove_background_completely_make_100_transparen-1771833715439.webp',
    'Remove_background_completely_make_100_transparen-1771833720649.webp',
    'Remove_background_completely_make_100_transparen-1771833726954.webp',
    'Remove_background_completely_make_100_transparen-1771833999303.webp',
    'Remove_background_completely_make_100_transparen-1771834006328.webp',
    'Remove_background_completely_make_100_transparen-1771834012710.webp',
    'Remove_background_completely_make_100_transparen-1771834027303.webp',
    'Remove_background_completely_make_100_transparen-1771849113082.webp',
    'Remove_background_completely_make_100_transparen-1771849352158.webp',
    'Remove_background_completely_make_100_transparen-1771849368261.webp',
    'Remove_background_completely_make_100_transparen-1771849369187.webp',
    'Remove_background_completely_make_100_transparen-1771849373487.webp',
    'Remove_background_completely_make_100_transparen-1771849386000.webp',
    'Remove_background_completely_make_100_transparen-1771849394291.webp',
    'Remove_background_completely_make_100_transparen-1771849543301.webp'
  ];

  var FIGURE_FILES = [
    'Hyper-realistic_3D_full-body_alien_skeleton_creatu-1771832779335.webp',
    'Remove_background_completely_make_100_transparen-1771831048509.webp',
    'Remove_background_completely_make_100_transparen-1771831227472.webp',
    'Remove_background_completely_make_100_transparen-1771831355029.webp',
    'Remove_background_completely_make_100_transparen-1771831464298.webp',
    'Remove_background_completely_make_100_transparen-1771831580791.webp',
    'Remove_background_completely_make_100_transparen-1771831586792.webp',
    'Remove_background_completely_make_100_transparen-1771831595071.webp',
    'Remove_background_completely_make_100_transparen-1771831602004.webp',
    'Remove_background_completely_make_100_transparen-1771831726582.webp',
    'Remove_background_completely_make_100_transparen-1771831728449.webp',
    'Remove_background_completely_make_100_transparen-1771831733331.webp',
    'Remove_background_completely_make_100_transparen-1771831739066.webp',
    'Remove_background_completely_make_100_transparen-1771831747916.webp',
    'Remove_background_completely_make_100_transparen-1771831851306.webp',
    'Remove_background_completely_make_100_transparen-1771831853856.webp',
    'Remove_background_completely_make_100_transparen-1771831858692.webp',
    'Remove_background_completely_make_100_transparen-1771831864401.webp',
    'Remove_background_completely_make_100_transparen-1771831870495.webp',
    'Remove_background_completely_make_100_transparen-1771832185545.webp',
    'Remove_background_completely_make_100_transparen-1771832191326.webp',
    'Remove_background_completely_make_100_transparen-1771832268604.webp',
    'Remove_background_completely_make_100_transparen-1771832276143.webp',
    'Remove_background_completely_make_100_transparen-1771832315646.webp',
    'Remove_background_completely_make_100_transparen-1771832321506.webp',
    'Remove_background_completely_make_100_transparen-1771832329706.webp',
    'Remove_background_completely_make_100_transparen-1771832336482.webp',
    'Remove_background_completely_make_100_transparen-1771832488718.webp',
    'Remove_background_completely_make_100_transparen-1771832489118.webp',
    'Remove_background_completely_make_100_transparen-1771832495785.webp',
    'Remove_background_completely_make_100_transparen-1771832501792.webp',
    'Remove_background_completely_make_100_transparen-1771832510536.webp',
    'Remove_background_completely_make_100_transparen-1771832516855.webp',
    'Remove_background_completely_make_100_transparen-1771832786025.webp',
    'Remove_background_completely_make_100_transparen-1771832791923.webp',
    'Remove_background_completely_make_100_transparen-1771832902929.webp',
    'Remove_background_completely_make_100_transparen-1771832908411.webp'
  ];

  // ─── Segment values ─────────────────────────────────────────────────
  // 8 equal segments. Scale x level-round so later wheels pay more.
  var levelRound = Math.ceil(completedLevel / 8);
  var BASE_SEGS  = [100, 500, 200, 1000, 200, 500, 100, 5000];
  var segments   = BASE_SEGS.map(function(v){ return v * levelRound; });
  var NUM_SEG    = segments.length;                 // 8
  var SEG_ANGLE  = (Math.PI * 2) / NUM_SEG;

  // ─── Load images ────────────────────────────────────────────────────
  function _rnd(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

  var wheelImg   = new Image();
  var leftFigImg = new Image();
  var rightFigImg = new Image();

  wheelImg.src = WHEEL_DIR + _rnd(WHEEL_FILES);

  // Pick 2 different figures
  var figCopy = FIGURE_FILES.slice().sort(function(){ return Math.random() - 0.5; });
  leftFigImg.src  = FIGURE_DIR + figCopy[0];
  rightFigImg.src = FIGURE_DIR + figCopy[1];

  // ─── Spin state ──────────────────────────────────────────────────────
  var angle        = 0;      // current wheel rotation (radians, clockwise)
  var velocity     = 0;      // angular velocity (rad/s)
  var state        = 'idle'; // 'idle' | 'spinning' | 'result'
  var bonusPoints  = 0;
  var resultTimer  = 0;
  var fireHeld     = true;   // prevent fire from triggering on screen entry

  // Start the eerie long ambient sound for the wheel stage
  SoundManager.playWheelAmbience();
  var tickerDeflect = 0;     // rubber flapper deflection (radians)
  var lastSegIdx   = -1;     // last segment boundary crossed (for click sound)
  var glowPhase    = 0;      // pulsing glow on result
  // Fake star positions (stable across frames using deterministic positions)
  var STARS = [];
  for(var _i = 0; _i < 80; _i++) {
    STARS.push([
      ((_i * 137.508) % 1.0),
      ((_i * 79.456 + _i * 31) % 1.0),
      0.5 + (_i % 5) * 0.25,
      0.2 + (_i % 7) * 0.07
    ]);
  }

  // ─── Step ─────────────────────────────────────────────────────────────
  this.step = function(dt) {
    if(!Game.keys['fire']) fireHeld = false;

    if(state === 'idle') {
      if(Game.keys['fire'] && !fireHeld) {
        fireHeld = true;
        velocity = 9 + Math.random() * 7;  // 9–16 rad/s
        state    = 'spinning';
      }
    }

    if(state === 'spinning') {
      angle    += velocity * dt;
      velocity *= Math.pow(0.12, dt);  // exponential deceleration → stops in ~5s

      // Ticker click at each segment boundary
      var curSegIdx = Math.floor(angle / SEG_ANGLE);
      if(curSegIdx !== lastSegIdx) {
        lastSegIdx    = curSegIdx;
        tickerDeflect = 0.30;
        SoundManager.playTick();
      }
      // Spring the ticker back
      tickerDeflect *= Math.pow(0.005, dt);

      if(velocity < 0.10) {
        // Wheel has stopped — determine winning segment
        state        = 'result';
        velocity     = 0;
        var norm     = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        // Segment 0 is at 12-o'clock when angle=0; as wheel rotates CW, work backward
        var winIdx   = (NUM_SEG - Math.floor(norm / SEG_ANGLE)) % NUM_SEG;
        bonusPoints  = segments[winIdx];
        Game.points += bonusPoints;
        SoundManager.playLevelComplete();
      }
    }

    if(state === 'result') {
      resultTimer += dt;
      glowPhase   += dt * 4;
      // After 2s, allow continuing
      if(resultTimer > 2.0 && Game.keys['fire'] && !fireHeld) {
        SoundManager.stopWheelAmbience();
        if(onComplete) onComplete();
      }
    }
  };

  // ─── Draw ─────────────────────────────────────────────────────────────
  this.draw = function(ctx) {
    var W = Game.width, H = Game.height;
    var cx = W * 0.5, cy = H * 0.50;
    var r  = Math.min(W * 0.38, H * 0.37);

    // ── Semi-transparent overlay — stars from boards 0/1 show through
    ctx.fillStyle = 'rgba(0,0,10,0.48)';
    ctx.fillRect(0, 0, W, H);

    // ── Stars
    for(var si = 0; si < STARS.length; si++) {
      var s = STARS[si];
      ctx.beginPath();
      ctx.arc(s[0]*W, s[1]*H, s[2], 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,' + s[3] + ')';
      ctx.fill();
    }

    // ── Title
    var titleSz = Math.max(14, Math.round(H * 0.055));
    ctx.save();
    ctx.textAlign  = 'center';
    ctx.font       = 'bold ' + titleSz + 'px Arial';
    ctx.fillStyle  = '#FFD700';
    ctx.shadowColor = '#FF8800';
    ctx.shadowBlur  = 18;
    ctx.fillText('\u26a1 \u03a4\u03a1\u039f\u03a7\u039f\u03a3 \u03a4\u0397\u03a3 \u03a4\u03a5\u03a7\u0397\u03a3 \u26a1', cx, H * 0.08);
    ctx.restore();

    // ── Monster figures (only if screen is wide enough)
    if(W > 400) {
      var figH = r * 1.30;
      var figGap = r * 0.08;

      if(leftFigImg.naturalWidth > 0) {
        var lw = figH * leftFigImg.naturalWidth / leftFigImg.naturalHeight;
        var lx = cx - r - figGap - lw * 0.5;
        ctx.save();
        ctx.translate(lx + lw, cy - figH * 0.20);
        ctx.scale(-1, 1);
        ctx.drawImage(leftFigImg, 0, 0, lw, figH);
        ctx.restore();
      }

      if(rightFigImg.naturalWidth > 0) {
        var rw = figH * rightFigImg.naturalWidth / rightFigImg.naturalHeight;
        var rx = cx + r + figGap;
        ctx.drawImage(rightFigImg, rx, cy - figH * 0.20, rw, figH);
      }
    }

    // ── Spinning wheel image (or fallback colored segments)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    if(wheelImg.naturalWidth > 0) {
      ctx.drawImage(wheelImg, -r, -r, r * 2, r * 2);
    } else {
      // Fallback: draw segment colors + values
      var segColors = ['#C0392B','#E67E22','#F1C40F','#27AE60','#2980B9','#8E44AD','#16A085','#2C3E50'];
      for(var si2 = 0; si2 < NUM_SEG; si2++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, r, si2 * SEG_ANGLE - Math.PI/2, (si2+1) * SEG_ANGLE - Math.PI/2);
        ctx.fillStyle = segColors[si2 % segColors.length];
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
    ctx.restore();

    // ── Golden rim around wheel
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r + 3, 0, Math.PI * 2);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth   = 4;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur  = 12;
    ctx.stroke();
    ctx.restore();

    // ── Ticker / rubber flapper at 12-o'clock
    // The flapper is attached above the wheel, pivots at its top
    var tickerX = cx;
    var tickerY = cy - r - 2;
    ctx.save();
    ctx.translate(tickerX, tickerY);
    ctx.rotate(tickerDeflect);  // deflects right when a peg hits it
    // Rubber body (tapered strip pointing down into the wheel)
    ctx.beginPath();
    ctx.moveTo(-5, -30);   // pivot area top-left
    ctx.lineTo( 5, -30);   // pivot area top-right
    ctx.lineTo( 4,   0);   // bottom-right (tip into wheel)
    ctx.lineTo(-4,   0);   // bottom-left
    ctx.closePath();
    ctx.fillStyle = '#8B1A1A';
    ctx.fill();
    ctx.strokeStyle = '#FF4444';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Pivot bolt
    ctx.beginPath();
    ctx.arc(0, -30, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#AAAAAA';
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    // ── Bottom instruction or result
    ctx.save();
    ctx.textAlign = 'center';

    if(state === 'idle') {
      var pulse = 0.65 + 0.35 * Math.sin(Date.now() / 280);
      var sz    = Math.max(12, Math.round(H * 0.046));
      ctx.font       = 'bold ' + sz + 'px Arial';
      ctx.fillStyle  = 'rgba(255,215,0,' + pulse + ')';
      ctx.shadowColor = '#FF8800';
      ctx.shadowBlur  = 14;
      ctx.fillText('\u25ba\u25ba SPIN — \u03a0\u0391\u03a4\u0397\u03a3\u0395 \u03a0\u03a5\u03a1\u0391! \u25c4\u25c4', cx, H * 0.92);

    } else if(state === 'spinning') {
      // Small level label while spinning
      ctx.font      = Math.max(10, Math.round(H * 0.030)) + 'px Arial';
      ctx.fillStyle = 'rgba(180,180,180,0.6)';
      ctx.fillText('BONUS WHEEL — LEVEL ' + completedLevel, cx, H * 0.93);

    } else if(state === 'result') {
      var glow2 = 0.55 + 0.45 * Math.sin(glowPhase);
      // Big points reveal
      var bigSz = Math.max(18, Math.round(H * 0.08));
      ctx.font       = 'bold ' + bigSz + 'px Arial';
      ctx.fillStyle  = 'rgba(0,255,136,' + glow2 + ')';
      ctx.shadowColor = '#00FF88';
      ctx.shadowBlur  = 30 * glow2;
      ctx.fillText('+' + bonusPoints.toLocaleString() + ' \u03a0\u039f\u039d\u03a4\u039f\u0399!', cx, H * 0.87);

      if(resultTimer > 2.0) {
        ctx.font       = Math.max(10, Math.round(H * 0.036)) + 'px Arial';
        ctx.fillStyle  = '#FFD700';
        ctx.shadowBlur = 0;
        ctx.fillText('\u25ba CONTINUE — \u03a0\u0391\u03a4\u0397\u03a3\u0395 \u03a0\u03a5\u03a1\u0391', cx, H * 0.94);
      }
    }
    ctx.restore();
  };
};
