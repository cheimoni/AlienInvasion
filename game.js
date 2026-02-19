// Object type constants - MUST be defined first!
var OBJECT_PLAYER = 1,
    OBJECT_PLAYER_PROJECTILE = 2,
    OBJECT_ENEMY = 4,
    OBJECT_ENEMY_PROJECTILE = 8,
    OBJECT_POWERUP = 16;

var sprites = {
 // Original sprites from sprites.png
 ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
 missile: { sx: 0, sy: 30, w: 8, h: 20, frames: 1 },
 enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
 enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
 enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
 enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 },
 explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
 enemy_missile: { sx: 9, sy: 42, w: 3, h: 20, frame: 1 },

 // ===== 10 NEW REGULAR ENEMIES (32x32 or 48x48) =====

 // Enemy 1 - Alien Red
 enemy_alien_red: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771177489342.png' },

 // Enemy 2 - Mech Boss (used as regular enemy)
 enemy_mech_boss: { sx: 0, sy: 0, w: 96, h: 96, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771177571877.png' },

 // Enemy 3 - Green Creature
 enemy_green_creature: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771177712172.png' },

 // Enemy 4 - Blue Ship
 enemy_blue_ship: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771177719176.png' },

 // Enemy 5 - Orange Beast
 enemy_orange_beast: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771177725677.png' },

 // Enemy 6 - Cyber Drone (using existing sprite)
 enemy_cyber_drone: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771177725677.png' },

 // Enemy 7
 enemy_new_1: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771178629872.png' },

 // Enemy 8
 enemy_new_2: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771178645450.png' },

 // Enemy 9
 enemy_new_3: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771178652004.png' },

 // Enemy 10
 enemy_new_4: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771178659689.png' },

 // ===== CLOUDS (πάντα πίσω από τους εχθρούς) =====
 cloud_sunset: { sx: 0, sy: 0, w: 200, h: 120, frames: 1, file: 'images/Sunset-lit_cloud_with_vibrant_color_spectrum_rich-1771436713562.png' },
 cloud_wispy: { sx: 0, sy: 0, w: 180, h: 100, frames: 1, file: 'images/Ethereal_wispy_cirrus_cloud_with_delicate_color_va-1771436717477.png' },
 cloud_majestic: { sx: 0, sy: 0, w: 220, h: 130, frames: 1, file: 'images/cloud_majestic_colorful.png' },
 cloud_white: { sx: 0, sy: 0, w: 160, h: 90, frames: 1, file: 'images/cloud_white_grey_tones.png' },
 cloud_storm: { sx: 0, sy: 0, w: 240, h: 140, frames: 1, file: 'images/cloud_storm_dramatic.png' },

 // ===== BACKGROUND OBJECTS (πλανήτες, αστεροειδείς, αστέρια, motherships) - ΜΕΓΑΛΑ! =====
 // Planets (BIG!)
 bg_planet_1: { sx: 0, sy: 0, w: 300, h: 300, frames: 1, file: 'images/remove_background_keep_planet_only_with_transpare-1771437623912.png' },
 bg_planet_2: { sx: 0, sy: 0, w: 350, h: 350, frames: 1, file: 'images/remove_background_keep_planet_only_with_transpare-1771437627114.png' },
 bg_planet_3: { sx: 0, sy: 0, w: 280, h: 280, frames: 1, file: 'images/remove_background_keep_planet_only_with_transpare-1771437632686.png' },
 bg_planet_4: { sx: 0, sy: 0, w: 320, h: 320, frames: 1, file: 'images/remove_background_keep_planet_only_with_transpare-1771437636117.png' },
 bg_planet_5: { sx: 0, sy: 0, w: 250, h: 250, frames: 1, file: 'images/remove_background_keep_planet_only_with_transpare-1771437640044.png' },
 bg_planet_6: { sx: 0, sy: 0, w: 400, h: 400, frames: 1, file: 'images/remove_background_keep_planet_only_with_transpare-1771437643732.png' },

 // Asteroids (BIG!)
 bg_asteroid_1: { sx: 0, sy: 0, w: 180, h: 150, frames: 1, file: 'images/remove_background_keep_asteroid_only_with_transpa-1771437878608.png' },
 bg_asteroid_2: { sx: 0, sy: 0, w: 200, h: 160, frames: 1, file: 'images/remove_background_keep_asteroid_only_with_transpa-1771437889459.png' },
 bg_asteroid_3: { sx: 0, sy: 0, w: 160, h: 130, frames: 1, file: 'images/remove_background_keep_asteroid_only_with_transpa-1771437893911.png' },
 bg_asteroid_4: { sx: 0, sy: 0, w: 190, h: 145, frames: 1, file: 'images/remove_background_keep_asteroid_only_with_transpa-1771437899883.png' },
 bg_asteroid_5: { sx: 0, sy: 0, w: 220, h: 175, frames: 1, file: 'images/remove_background_keep_asteroid_only_with_transpa-1771437906511.png' },

 // Stars (BIG!)
 bg_star_1: { sx: 0, sy: 0, w: 120, h: 120, frames: 1, file: 'images/remove_background_keep_star_only_with_transparent-1771438014717.png' },
 bg_star_2: { sx: 0, sy: 0, w: 100, h: 100, frames: 1, file: 'images/remove_background_keep_star_only_with_transparent-1771438021672.png' },
 bg_star_3: { sx: 0, sy: 0, w: 140, h: 140, frames: 1, file: 'images/remove_background_keep_star_only_with_transparent-1771438025866.png' },
 bg_star_4: { sx: 0, sy: 0, w: 150, h: 150, frames: 1, file: 'images/remove_background_keep_star_only_with_transparent-1771438033273.png' },

 // Saturn (BIG!)
 bg_saturn_1: { sx: 0, sy: 0, w: 400, h: 230, frames: 1, file: 'images/remove_background_keep_Saturn_planet_with_rings_o-1771438156492.png' },
 bg_saturn_2: { sx: 0, sy: 0, w: 450, h: 260, frames: 1, file: 'images/remove_background_keep_Saturn_planet_with_rings_o-1771438160539.png' },
 bg_saturn_3: { sx: 0, sy: 0, w: 480, h: 275, frames: 1, file: 'images/remove_background_keep_Saturn_planet_with_rings_o-1771438163504.png' },
 bg_saturn_4: { sx: 0, sy: 0, w: 380, h: 220, frames: 1, file: 'images/remove_background_keep_Saturn_planet_with_rings_o-1771438166972.png' },
 bg_saturn_5: { sx: 0, sy: 0, w: 520, h: 300, frames: 1, file: 'images/remove_background_keep_Saturn_planet_with_rings_o-1771438176494.png' },

 // Background Motherships (BIG!)
 bg_mothership_1: { sx: 0, sy: 0, w: 500, h: 300, frames: 1, file: 'images/remove_background_keep_mothership_spacecraft_only-1771438322897.png' },
 bg_mothership_2: { sx: 0, sy: 0, w: 550, h: 330, frames: 1, file: 'images/remove_background_keep_mothership_spacecraft_only-1771438328286.png' },
 bg_mothership_3: { sx: 0, sy: 0, w: 480, h: 290, frames: 1, file: 'images/remove_background_keep_mothership_spacecraft_only-1771438334530.png' },
 bg_mothership_4: { sx: 0, sy: 0, w: 600, h: 360, frames: 1, file: 'images/remove_background_keep_mothership_spacecraft_only-1771438343320.png' },

 // ===== 10 MOTHER SHIPS / BOSSES (3x LARGER!) =====

 // Mother Ship 1 - Hive Queen
 mother_hive_queen: { sx: 0, sy: 0, w: 480, h: 480, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180665054.png' },

 // Mother Ship 2 - Star Fortress
 mother_star_fortress: { sx: 0, sy: 0, w: 600, h: 600, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180672423.png' },

 // Mother Ship 3 - Void Carrier
 mother_void_carrier: { sx: 0, sy: 0, w: 480, h: 480, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180678054.png' },

 // Mother Ship 4 - Crystal Mothership
 mother_crystal: { sx: 0, sy: 0, w: 384, h: 384, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180682273.png' },

 // Mother Ship 5 - Bio Factory
 mother_bio_factory: { sx: 0, sy: 0, w: 540, h: 540, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180688724.png' },

 // Mother Ship 6 - Dreadnought Prime
 mother_dreadnought: { sx: 0, sy: 0, w: 600, h: 600, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180693705.png' },

 // Mother Ship 7 - Nebula Spawner
 mother_nebula: { sx: 0, sy: 0, w: 480, h: 480, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180698872.png' },

 // Mother Ship 8 - Tech Hive
 mother_tech_hive: { sx: 0, sy: 0, w: 420, h: 420, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180703392.png' },

 // Mother Ship 9 - Bone Leviathan
 mother_bone_leviathan: { sx: 0, sy: 0, w: 540, h: 540, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180708808.png' },

 // Mother Ship 10 - Omega Station (FINAL BOSS)
 mother_omega_station: { sx: 0, sy: 0, w: 720, h: 720, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180716254.png' },

 // ===== ADDITIONAL ENEMIES FROM NEW IMAGES =====

 enemy_extra_1: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180720107.png' },
 enemy_extra_2: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180725558.png' },
 enemy_extra_3: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180729987.png' },
 enemy_extra_4: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180735772.png' },
 enemy_extra_5: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180740857.png' },
 enemy_extra_6: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180748792.png' },
 enemy_extra_7: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180759408.png' },
 enemy_extra_8: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180766876.png' },
 enemy_extra_9: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180772422.png' },
 enemy_extra_10: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180778324.png' },
 enemy_extra_11: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180783743.png' },
 enemy_extra_12: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180788562.png' },
 enemy_extra_13: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180793761.png' },
 enemy_extra_14: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180799043.png' },
 enemy_extra_15: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180804676.png' },
 enemy_extra_16: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180813056.png' },
 enemy_extra_17: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180818004.png' },
 enemy_extra_18: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180821659.png' },
 enemy_extra_19: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771180826727.png' }
};

var enemies = {
  getScale: function() { return Game.width / 320; },

  // ===== SWOOP & LOOP (Galaga-style dive with circular loop) =====
  swoop_left: function() { return {
    x: Game.width * 0.2, y: -64, sprite: 'enemy_alien_red', health: 10,
    movementType: 'swoop',
    swoopPhase: 0, // 0=dive, 1=loop, 2=exit
    swoopSpeed: 80 * this.getScale(),
    swoopDir: 1, // 1=curves right, -1=curves left
    loopRadius: 60 * this.getScale(),
    loopAngle: -Math.PI/2,
    missiles: 1, points: 80
  };},
  swoop_right: function() { return {
    x: Game.width * 0.8, y: -64, sprite: 'enemy_alien_red', health: 10,
    movementType: 'swoop',
    swoopPhase: 0,
    swoopSpeed: 80 * this.getScale(),
    swoopDir: -1,
    loopRadius: 60 * this.getScale(),
    loopAngle: -Math.PI/2,
    missiles: 1, points: 80
  };},

  // ===== FIGURE-8 (Lissajous curve: x=A*sin(t), y=B*sin(2t)) =====
  fig8_left: function() { return {
    x: Game.width * 0.3, y: -64, sprite: 'enemy_green_creature', health: 10,
    movementType: 'figure8',
    fig8CenterX: Game.width * 0.3, fig8CenterY: Game.height * 0.35,
    fig8A: 120 * this.getScale(), fig8B: 80 * this.getScale(),
    fig8Speed: 0.8, fig8Drift: 8 * this.getScale(),
    missiles: 1, points: 100
  };},
  fig8_right: function() { return {
    x: Game.width * 0.7, y: -64, sprite: 'enemy_green_creature', health: 10,
    movementType: 'figure8',
    fig8CenterX: Game.width * 0.7, fig8CenterY: Game.height * 0.35,
    fig8A: 120 * this.getScale(), fig8B: 80 * this.getScale(),
    fig8Speed: 0.8, fig8Drift: 8 * this.getScale(),
    missiles: 1, points: 100
  };},

  // ===== S-CURVE DESCENT (smooth S-shape while falling) =====
  scurve_left: function() { return {
    x: Game.width * 0.15, y: -64, sprite: 'enemy_blue_ship', health: 10,
    movementType: 'scurve',
    scurveAmplitude: 200 * this.getScale(),
    scurveFreq: 0.004 / this.getScale(),
    scurveSpeed: 55 * this.getScale(),
    scurveStartX: Game.width * 0.15,
    missiles: 1, points: 75
  };},
  scurve_right: function() { return {
    x: Game.width * 0.85, y: -64, sprite: 'enemy_blue_ship', health: 10,
    movementType: 'scurve',
    scurveAmplitude: -200 * this.getScale(),
    scurveFreq: 0.004 / this.getScale(),
    scurveSpeed: 55 * this.getScale(),
    scurveStartX: Game.width * 0.85,
    missiles: 1, points: 75
  };},

  // ===== CORKSCREW (spiral descent) =====
  cork_left: function() { return {
    x: Game.width * 0.25, y: -64, sprite: 'enemy_cyber_drone', health: 10,
    movementType: 'corkscrew',
    corkCenterX: Game.width * 0.25, corkRadius: 80 * this.getScale(),
    corkSpeed: 2, corkFall: 35 * this.getScale(),
    points: 50
  };},
  cork_right: function() { return {
    x: Game.width * 0.75, y: -64, sprite: 'enemy_cyber_drone', health: 10,
    movementType: 'corkscrew',
    corkCenterX: Game.width * 0.75, corkRadius: 80 * this.getScale(),
    corkSpeed: -2, corkFall: 35 * this.getScale(),
    points: 50
  };},

  // ===== PENDULUM (swing left-right while descending) =====
  pendulum: function() { return {
    x: Game.width * 0.5, y: -64, sprite: 'enemy_orange_beast', health: 10,
    movementType: 'pendulum',
    pendCenterX: Game.width * 0.5,
    pendAmplitude: 180 * this.getScale(),
    pendSpeed: 1.2, pendFall: 25 * this.getScale(),
    missiles: 1, points: 90
  };},

  // ===== BOOMERANG (comes in, U-turns, comes back from other side) =====
  boomerang_left: function() { return {
    x: -64, y: Game.height * 0.2, sprite: 'enemy_extra_1', health: 10,
    movementType: 'boomerang',
    boomSpeed: 110 * this.getScale(), boomDir: 1,
    boomTurnY: Game.height * 0.6,
    boomPhase: 0, // 0=enter, 1=curve, 2=exit
    missiles: 1, points: 60
  };},
  boomerang_right: function() { return {
    x: Game.width + 64, y: Game.height * 0.2, sprite: 'enemy_extra_1', health: 10,
    movementType: 'boomerang',
    boomSpeed: 110 * this.getScale(), boomDir: -1,
    boomTurnY: Game.height * 0.6,
    boomPhase: 0,
    missiles: 1, points: 60
  };},

  // ===== ZIGZAG (sharp zigzag descent) =====
  zigzag: function() { return {
    x: Game.width * 0.5, y: -64, sprite: 'enemy_orange_beast', health: 10,
    movementType: 'zigzag',
    zigSpeed: 65 * this.getScale(), zigWidth: 150 * this.getScale(),
    zigDir: 1, zigTimer: 0, zigInterval: 0.5,
    E: 30 * this.getScale(),
    missiles: 1, points: 85
  };},

  // ===== MOTHER SHIPS (3x LARGER, SIMPLE MOVEMENT) =====
  mother_small: function() { return {
    x: Game.width * 0.3, y: -420, sprite: 'mother_crystal', health: 150,
    movementType: 'mothership',
    motherTargetY: 100, motherSpeed: 300,
    isMotherShip: true, spawnRate: 5, spawnType: 'cork_left', points: 500, missiles: 2
  };},
  mother_medium: function() { return {
    x: Game.width * 0.3, y: -510, sprite: 'mother_hive_queen', health: 300,
    movementType: 'mothership',
    motherTargetY: 80, motherSpeed: 280,
    isMotherShip: true, spawnRate: 4, spawnType: 'swoop_left', points: 800, missiles: 3
  };},
  mother_large: function() { return {
    x: Game.width * 0.3, y: -660, sprite: 'mother_star_fortress', health: 500,
    movementType: 'mothership',
    motherTargetY: 70, motherSpeed: 250,
    isMotherShip: true, spawnRate: 3, spawnType: 'fig8_left', points: 1200, missiles: 4
  };},

  // FINAL BOSS (HUGE!)
  final_boss: function() { return {
    x: Game.width * 0.15, y: -780, sprite: 'mother_omega_station', health: 1200,
    movementType: 'mothership',
    motherTargetY: 60, motherSpeed: 200,
    isBossShip: true, spawnRate: 4, spawnType: 'swoop_left', points: 3000, missiles: 6
  };}
};

// ===================================================================
// PATTERN 1: GRID FORMATION (Space Invaders πλέγμα ping-pong)
// ===================================================================
var GridFormation = function(opts) {
  this.rows = opts.rows || 5;
  this.cols = opts.columns || 11;
  this.spacingX = opts.spacing_x || 48;
  this.spacingY = opts.spacing_y || 40;
  this.speed = opts.initial_speed || 40;
  this.direction = 1;
  this.stepDownPx = opts.step_down_pixels || 16;
  this.marginL = 16;
  this.marginR = 16;
  this.shootCooldown = (opts.cooldown_ms || 1200) / 1000;
  this.minCooldown = (opts.min_cooldown_ms || 250) / 1000;
  this.shootTimer = this.shootCooldown;
  this.gridX = opts.start_x || 64;
  this.gridY = opts.start_y || 64;
  this.spriteList = opts.spriteTypes || [
    'enemy_alien_red', 'enemy_green_creature', 'enemy_blue_ship',
    'enemy_orange_beast', 'enemy_cyber_drone'
  ];
  this.diveCooldown = opts.diveCooldown || 4;
  this.totalEnemies = this.rows * this.cols;
  this.gridEnemies = [];
};

GridFormation.prototype.init = function(board) {
  for(var r = 0; r < this.rows; r++) {
    var spr = this.spriteList[r % this.spriteList.length];
    for(var c = 0; c < this.cols; c++) {
      var ge = new GridEnemy(spr, r, c, this);
      ge.x = this.gridX + c * this.spacingX;
      ge.y = this.gridY + r * this.spacingY;
      board.add(ge);
      this.gridEnemies.push(ge);
    }
  }
};

GridFormation.prototype.step = function(dt) {
  var alive = [];
  var minCol = 999, maxCol = -1;

  for(var i = 0; i < this.gridEnemies.length; i++) {
    var e = this.gridEnemies[i];
    if(!e.dead) {
      alive.push(e);
      if(e.gridCol < minCol) minCol = e.gridCol;
      if(e.gridCol > maxCol) maxCol = e.gridCol;
    }
  }

  if(alive.length === 0) {
    this.board.remove(this);
    return;
  }

  // Difficulty scaling: fewer enemies = faster (1x to 3.5x)
  var ratio = alive.length / this.totalEnemies;
  var speedMult = 1.0 + (1.0 - ratio) * 2.5;

  // Move grid horizontally
  this.gridX += this.speed * this.direction * speedMult * dt;

  // Edge detection
  var leftEdge = this.gridX + minCol * this.spacingX;
  var rightEdge = this.gridX + maxCol * this.spacingX + 64;

  if(rightEdge >= Game.width - this.marginR && this.direction === 1) {
    this.direction = -1;
    this.gridY += this.stepDownPx;
  } else if(leftEdge <= this.marginL && this.direction === -1) {
    this.direction = 1;
    this.gridY += this.stepDownPx;
  }

  // Update all enemy positions
  for(var i = 0; i < alive.length; i++) {
    var e = alive[i];
    e.x = this.gridX + e.gridCol * this.spacingX;
    e.y = this.gridY + e.gridRow * this.spacingY;
  }

  // === DIVE ATTACK: one enemy detaches and dives toward player ===
  if(!this.diveTimer) this.diveTimer = 0;
  if(!this.diveInterval) this.diveInterval = this.diveCooldown || 3.5;
  this.diveTimer += dt;
  if(this.diveTimer >= this.diveInterval && alive.length > 1) {
    this.diveTimer = 0;
    // Pick a random alive enemy to dive
    var pick = alive[Math.floor(Math.random() * alive.length)];
    pick.dead = true; // Remove from grid tracking
    this.board.remove(pick);
    // Spawn a DivingEnemy at its position
    this.board.add(new DivingEnemy(pick.sprite, pick.x, pick.y));
  }

  // === KAMIKAZE ATTACK: enemy goes UP then DIVES DOWN ===
  if(!this.kamikazeTimer) this.kamikazeTimer = 0;
  if(!this.kamikazeInterval) this.kamikazeInterval = 6 + Math.random() * 4;
  this.kamikazeTimer += dt;
  if(this.kamikazeTimer >= this.kamikazeInterval && alive.length > 2) {
    this.kamikazeTimer = 0;
    this.kamikazeInterval = 5 + Math.random() * 5;
    // Pick a random alive enemy for kamikaze
    var kpick = alive[Math.floor(Math.random() * alive.length)];
    kpick.dead = true;
    this.board.remove(kpick);
    // Spawn a KamikazeEnemy - goes up then dives down
    this.board.add(new KamikazeEnemy(kpick.sprite, kpick.x, kpick.y));
    // Play special kamikaze sound
    SoundManager.playKamikaze();
  }

  // Shooting from bottom of columns (fire rate scales with difficulty)
  this.shootTimer -= dt;
  var cooldown = Math.max(this.minCooldown, this.shootCooldown * ratio);
  if(this.shootTimer <= 0) {
    this.shootTimer = cooldown;
    // Find bottom enemy per column
    var bottomMap = {};
    for(var i = 0; i < alive.length; i++) {
      var e = alive[i];
      if(!bottomMap[e.gridCol] || e.gridRow > bottomMap[e.gridCol].gridRow) {
        bottomMap[e.gridCol] = e;
      }
    }
    var cols = Object.keys(bottomMap);
    if(cols.length > 0) {
      var pick = cols[Math.floor(Math.random() * cols.length)];
      var shooter = bottomMap[pick];
      this.board.add(new EnemyMissile(shooter.x + shooter.w/2, shooter.y + shooter.h));
    }
  }
};

GridFormation.prototype.draw = function(ctx) { };

// Individual enemy inside a grid formation
var GridEnemy = function(spriteType, row, col, formation) {
  this.setup(spriteType, { health: 10, points: 50 });
  this.gridRow = row;
  this.gridCol = col;
  this.formation = formation;
  this.dead = false;
  // Individual sway motion
  this.swayAngle = 0;
  this.swaySpeed = 1.5 + Math.random() * 1.0;
  this.swayOffset = Math.random() * Math.PI * 2;
  this.t = 0;

  // Random 180° flip animation (some enemies do this)
  this.canFlip = Math.random() < 0.3; // 30% chance to be a flipper
  this.flipAngle = 0;
  this.flipSpeed = 0;
  this.isFlipping = false;
  this.flipCooldown = 3 + Math.random() * 5; // Wait before first flip
};

GridEnemy.prototype = new Sprite();
GridEnemy.prototype.type = OBJECT_ENEMY;

GridEnemy.prototype.step = function(dt) {
  this.t += dt;
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;

  // Individual sway motion (30 degrees left-right)
  this.swayAngle = Math.sin(this.t * this.swaySpeed + this.swayOffset) * (Math.PI / 6);

  // Random 180° flip animation
  if(this.canFlip && !this.isFlipping) {
    this.flipCooldown -= dt;
    if(this.flipCooldown <= 0) {
      this.isFlipping = true;
      this.flipSpeed = 4 + Math.random() * 2; // Random flip speed
      this.flipCooldown = 4 + Math.random() * 6; // Next flip
    }
  }
  if(this.isFlipping) {
    this.flipAngle += this.flipSpeed * dt;
    if(this.flipAngle >= Math.PI) { // 180° done
      this.flipAngle = 0;
      this.isFlipping = false;
    }
  }

  // Smooth banking from formation direction
  this.bankAngle = ((this.bankAngle || 0) * 0.88 + this.formation.direction * 0.14 * 0.12);
  // Position managed by GridFormation
  var collision = this.board.collide(this, OBJECT_PLAYER);
  if(collision) {
    collision.hit(10);
    this.dead = true;
    this.board.remove(this);
  }
  if(this.y > Game.height) {
    this.dead = true;
    this.board.remove(this);
  }
};

GridEnemy.prototype.draw = function(ctx) {
  ctx.save();
  var gCx = this.x + this.w / 2, gCy = this.y + this.h / 2;

  // Combine individual sway + banking + flip animation
  var totalRotation = this.swayAngle + (this.bankAngle || 0) + this.flipAngle;
  ctx.translate(gCx, gCy);
  ctx.rotate(Math.max(-0.52, Math.min(0.52 + Math.PI, totalRotation)));
  ctx.translate(-gCx, -gCy);

  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame);
  if(this.hitFlash > 0) {
    ctx.globalAlpha = Math.min(1, this.hitFlash) * 0.75;
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  ctx.restore();
};

GridEnemy.prototype.hit = function(damage) {
  this.hitFlash = 1.0;
  this.health -= damage;
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      this.dead = true;
      Game.shake(5, 0.14);
      SoundManager.playEnemyDeath();
      var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w));
      earnPoints(this.board, ecx, this.y, this.points || 50);
      if(Math.random() < 0.15) {
        this.board.add(new PowerUp(ecx, ecy));
      }
    }
  } else {
    var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
    this.board.add(new MissileImpactSpark(ecx, ecy));
    SoundManager.playImpact();
  }
};

// ===================================================================
// DIVING ENEMY (detaches from grid and swoops toward player)
// ===================================================================
var DivingEnemy = function(spriteType, startX, startY) {
  this.setup(spriteType, { health: 10, points: 75 });
  this.x = startX;
  this.y = startY;
  this.startX = startX;
  this.startY = startY;
  this.t = 0;
  this.phase = 0; // 0=dive toward player, 1=curve and exit right
  this.diveSpeed = 120 * (Game.width / 320);
  this.hasShot = false;
  this.targetX = Game.width * 0.5; // Will update to player pos
  this.trail = [];
  this.bankAngle = 0;
  // Individual sway motion
  this.swayAngle = 0;
  this.swaySpeed = 1.5 + Math.random() * 1.0;
  this.swayOffset = Math.random() * Math.PI * 2;
};

DivingEnemy.prototype = new Sprite();
DivingEnemy.prototype.type = OBJECT_ENEMY;

DivingEnemy.prototype.step = function(dt) {
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;
  this.t += dt;

  // Individual sway motion (30 degrees left-right)
  this.swayAngle = Math.sin(this.t * this.swaySpeed + this.swayOffset) * (Math.PI / 6);

  // Trail: store previous positions
  this.trail.push({ x: this.x, y: this.y });
  if(this.trail.length > 8) this.trail.shift();

  // Try to find player for targeting
  if(this.t < 0.1) {
    var player = this.board.detect(function() { return this.type === OBJECT_PLAYER; });
    if(player) this.targetX = player.x + player.w / 2;
  }

  if(this.phase === 0) {
    // Dive down toward player with slight curve toward targetX
    this.y += this.diveSpeed * dt;
    this.x += (this.targetX - this.x) * 1.5 * dt;

    // Shoot once at midscreen
    if(!this.hasShot && this.y > Game.height * 0.4) {
      this.hasShot = true;
      this.board.add(new EnemyMissile(this.x + this.w/2, this.y + this.h));
    }

    // Switch to exit phase near bottom
    if(this.y > Game.height * 0.7) {
      this.phase = 1;
    }
  } else {
    // Exit: curve right and fly off screen
    this.x += this.diveSpeed * 1.5 * dt;
    this.y -= this.diveSpeed * 0.3 * dt;
  }

  // Collision with player
  var collision = this.board.collide(this, OBJECT_PLAYER);
  if(collision) {
    collision.hit(10);
    this.board.remove(this);
    return;
  }

  // Banking angle based on horizontal + vertical movement
  var _dbdx = this.x - (this._prevBX !== undefined ? this._prevBX : this.x);
  var _dbdy = this.y - (this._prevBY !== undefined ? this._prevBY : this.y);
  var targetBank = _dbdx * 0.10 + _dbdy * 0.04;
  this.bankAngle = this.bankAngle * 0.80 + targetBank * 0.20;
  this._prevBX = this.x;
  this._prevBY = this.y;

  // Off-screen removal
  if(this.x > Game.width + 100 || this.y > Game.height + 100 || this.y < -200) {
    this.board.remove(this);
  }
};

DivingEnemy.prototype.hit = function(damage) {
  this.hitFlash = 1.0;
  this.health -= damage;
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      Game.shake(7, 0.2);
      SoundManager.playExplosion();
      var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w));
      earnPoints(this.board, ecx, this.y, this.points || 75);
      if(Math.random() < 0.2) {
        this.board.add(new PowerUp(ecx, ecy));
      }
    }
  } else {
    var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
    this.board.add(new MissileImpactSpark(ecx, ecy));
    SoundManager.playImpact();
  }
};

DivingEnemy.prototype.draw = function(ctx) {
  ctx.save();
  // Motion trail (afterimages, no rotation — ghostly effect)
  for(var i = 0; i < this.trail.length - 1; i++) {
    var ta = (i + 1) / this.trail.length * 0.22;
    ctx.globalAlpha = ta;
    SpriteSheet.draw(ctx, this.sprite, this.trail[i].x, this.trail[i].y, this.frame);
  }
  ctx.globalAlpha = 1;

  var dCx = this.x + this.w / 2;
  var dCy = this.y + this.h / 2;

  // Combine individual sway + banking rotation
  var totalRotation = this.swayAngle + (this.bankAngle || 0);
  ctx.translate(dCx, dCy);
  ctx.rotate(Math.max(-0.55, Math.min(0.55, totalRotation)));
  ctx.translate(-dCx, -dCy);

  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame);
  if(this.hitFlash > 0) {
    ctx.globalAlpha = Math.min(1, this.hitFlash) * 0.75;
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  ctx.restore();
};

// ===================================================================
// KAMIKAZE ENEMY (goes UP first, then DIVES DOWN toward player)
// ===================================================================
var KamikazeEnemy = function(spriteType, startX, startY) {
  this.setup(spriteType, { health: 10, points: 100 });
  this.x = startX;
  this.y = startY;
  this.t = 0;
  this.phase = 0; // 0=go up, 1=hover briefly, 2=dive down
  this.upSpeed = 150;
  this.diveSpeed = 250 * (Game.width / 320);
  this.hoverTime = 0.5; // Hover at top before diving
  this.hoverTimer = 0;
  this.targetX = Game.width * 0.5;
  this.trail = [];
  this.bankAngle = 0;
  this.rotation = 0;
  this.spinRotation = 0; // 360° spin during dive
  // Individual sway motion
  this.swayAngle = 0;
  this.swaySpeed = 2.0 + Math.random() * 1.0;
  this.swayOffset = Math.random() * Math.PI * 2;
};

KamikazeEnemy.prototype = new Sprite();
KamikazeEnemy.prototype.type = OBJECT_ENEMY;

KamikazeEnemy.prototype.step = function(dt) {
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;
  this.t += dt;

  // Individual sway motion
  this.swayAngle = Math.sin(this.t * this.swaySpeed + this.swayOffset) * (Math.PI / 6);

  // Trail
  this.trail.push({ x: this.x, y: this.y });
  if(this.trail.length > 12) this.trail.shift();

  // Try to find player for targeting
  if(this.t < 0.5) {
    var player = this.board.detect(function() { return this.type === OBJECT_PLAYER; });
    if(player) this.targetX = player.x + player.w / 2;
  }

  if(this.phase === 0) {
    // Phase 0: Go UP quickly
    this.y -= this.upSpeed * dt;
    this.rotation = -Math.PI / 2; // Pointing up
    if(this.y < 20) {
      this.y = 20;
      this.phase = 1;
    }
  } else if(this.phase === 1) {
    // Phase 1: Hover briefly, rotate toward player
    this.hoverTimer += dt;
    this.rotation = -Math.PI / 2 + (this.hoverTimer / this.hoverTime) * Math.PI; // Rotate 180°
    if(this.hoverTimer >= this.hoverTime) {
      this.phase = 2;
      // Retarget player
      var player = this.board.detect(function() { return this.type === OBJECT_PLAYER; });
      if(player) this.targetX = player.x + player.w / 2;
    }
  } else {
    // Phase 2: DIVE DOWN toward player with 360° SPIN
    this.y += this.diveSpeed * dt;
    this.x += (this.targetX - this.x) * 3 * dt; // Home in on player
    this.rotation = Math.PI / 2; // Pointing down
    this.spinRotation += dt * 8; // Fast spin (8 radians per second = ~1.3 full rotations/sec)
  }

  // Collision with player
  var collision = this.board.collide(this, OBJECT_PLAYER);
  if(collision) {
    collision.hit(15); // Extra damage!
    this.board.remove(this);
    return;
  }

  // Banking angle
  var _dbdx = this.x - (this._prevBX !== undefined ? this._prevBX : this.x);
  var _dbdy = this.y - (this._prevBY !== undefined ? this._prevBY : this.y);
  var targetBank = _dbdx * 0.08 + _dbdy * 0.03;
  this.bankAngle = this.bankAngle * 0.80 + targetBank * 0.20;
  this._prevBX = this.x;
  this._prevBY = this.y;

  // Off-screen removal
  if(this.y > Game.height + 100 || this.y < -200) {
    this.board.remove(this);
  }
};

KamikazeEnemy.prototype.hit = function(damage) {
  this.hitFlash = 1.0;
  this.health -= damage;
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      Game.shake(8, 0.25);
      SoundManager.playExplosion();
      var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w));
      earnPoints(this.board, ecx, this.y, this.points || 100);
      if(Math.random() < 0.25) {
        this.board.add(new PowerUp(ecx, ecy));
      }
    }
  } else {
    var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
    this.board.add(new MissileImpactSpark(ecx, ecy));
    SoundManager.playImpact();
  }
};

KamikazeEnemy.prototype.draw = function(ctx) {
  ctx.save();
  // Motion trail
  for(var i = 0; i < this.trail.length - 1; i++) {
    var ta = (i + 1) / this.trail.length * 0.3;
    ctx.globalAlpha = ta;
    SpriteSheet.draw(ctx, this.sprite, this.trail[i].x, this.trail[i].y, this.frame);
  }
  ctx.globalAlpha = 1;

  var dCx = this.x + this.w / 2;
  var dCy = this.y + this.h / 2;

  // Combine sway + banking + rotation + 360° spin during dive
  var totalRotation = this.swayAngle + (this.bankAngle || 0) + (this.rotation || 0) + (this.spinRotation || 0);
  ctx.translate(dCx, dCy);
  ctx.rotate(totalRotation);
  ctx.translate(-dCx, -dCy);

  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame);
  if(this.hitFlash > 0) {
    ctx.globalAlpha = Math.min(1, this.hitFlash) * 0.75;
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  ctx.restore();
};

// ===================================================================
// POWER-UP SYSTEM (falling balls with letters)
// ===================================================================
var POWERUP_TYPES = [
  { letter: 'S', color: '#00FF00', name: 'Speed Boost' },
  { letter: 'W', color: '#00AAFF', name: 'Wingmen' },
  { letter: 'P', color: '#FF4400', name: 'Power Shot' },
  { letter: 'L', color: '#FF00FF', name: 'Extra Life' },
  { letter: 'B', color: '#FFFF00', name: 'Bomb' }
];

var PowerUp = function(x, y) {
  this.x = x - 15;
  this.y = y;
  this.w = 30;
  this.h = 30;
  this.vy = 60;
  this.t = 0;
  // Pick random type
  var idx = Math.floor(Math.random() * POWERUP_TYPES.length);
  this.powerType = POWERUP_TYPES[idx];
};

PowerUp.prototype.type = OBJECT_POWERUP;

PowerUp.prototype.step = function(dt) {
  this.t += dt;
  this.y += this.vy * dt;
  // Gentle horizontal wobble
  this.x += Math.sin(this.t * 3) * 20 * dt;

  if(this.y > Game.height + 40) {
    this.board.remove(this);
  }
};

PowerUp.prototype.draw = function(ctx) {
  ctx.save();
  var cx = this.x + this.w/2;
  var cy = this.y + this.h/2;
  var r = 15;

  // Pulsing glow
  var pulse = 0.7 + 0.3 * Math.sin(this.t * 5);
  ctx.globalAlpha = pulse;

  // Outer glow
  ctx.beginPath();
  ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
  ctx.fillStyle = this.powerType.color;
  ctx.globalAlpha = 0.3 * pulse;
  ctx.fill();

  // Main ball
  ctx.globalAlpha = pulse;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = this.powerType.color;
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Letter
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(this.powerType.letter, cx, cy);

  ctx.restore();
};

// ===================================================================
// WINGMAN SHIPS (escort ships that shoot with player)
// ===================================================================
var WingmanShip = function(player, side) {
  this.setup('ship', { health: 1, points: 0 });
  this.player = player;
  this.side = side; // -1 = left, 1 = right
  this.offsetX = side * 55;
  this.offsetY = 15;
  this.x = player.x + this.offsetX;
  this.y = player.y + this.offsetY;
  this.reload = 0;
  this.reloadTime = 0.35;
  this.lifeTimer = 15; // 15 seconds duration
  this.scale = 0.6; // Draw smaller
};

WingmanShip.prototype = new Sprite();
WingmanShip.prototype.type = OBJECT_PLAYER;

WingmanShip.prototype.step = function(dt) {
  this.lifeTimer -= dt;
  if(this.lifeTimer <= 0) {
    this.board.remove(this);
    // Clear reference from player
    if(this.side === -1 && this.player) this.player.wingmanLeft = null;
    if(this.side === 1 && this.player) this.player.wingmanRight = null;
    return;
  }

  // Follow player
  var targetX = this.player.x + this.offsetX;
  var targetY = this.player.y + this.offsetY;
  this.x += (targetX - this.x) * 12 * dt;
  this.y += (targetY - this.y) * 12 * dt;

  // Fire when player fires
  this.reload -= dt;
  if(Game.keys['fire'] && this.reload < 0) {
    this.reload = this.reloadTime;
    this.board.add(new PlayerMissile(this.x + this.w * this.scale / 2, this.y));
  }
};

WingmanShip.prototype.draw = function(ctx) {
  ctx.save();
  // Draw smaller version of the ship
  var s = this.scale;
  var drawW = this.w * s;
  var drawH = this.h * s;
  // Blinking when about to expire
  if(this.lifeTimer < 3 && Math.floor(this.lifeTimer * 6) % 2 === 0) {
    ctx.globalAlpha = 0.4;
  }
  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame, drawW, drawH);
  ctx.restore();
};

WingmanShip.prototype.hit = function(damage) {
  if(this.board.remove(this)) {
    if(this.side === -1 && this.player) this.player.wingmanLeft = null;
    if(this.side === 1 && this.player) this.player.wingmanRight = null;
    this.board.add(new Explosion(this.x + this.w/2, this.y + this.h/2));
  }
};

// ===================================================================
// PATTERN 2: BONUS FLYBY (mystery ship across top)
// ===================================================================
var BonusShip = function(opts) {
  var goRight = Math.random() > 0.5;
  var spr = opts.sprite || 'enemy_extra_1';
  this.setup(spr, { health: 5, points: 300 });
  this.y = 30;
  this.x = goRight ? -this.w : Game.width;
  this.vx = (goRight ? 1 : -1) * (opts.speed || 120);
};

BonusShip.prototype = new Sprite();
BonusShip.prototype.type = OBJECT_ENEMY;

BonusShip.prototype.step = function(dt) {
  this.x += this.vx * dt;
  // Despawn when off screen
  if(this.x < -this.w - 10 || this.x > Game.width + 10) {
    this.board.remove(this);
    return;
  }
  var collision = this.board.collide(this, OBJECT_PLAYER);
  if(collision) {
    collision.hit(10);
    this.board.remove(this);
  }
};

BonusShip.prototype.hit = function(damage) {
  this.health -= damage;
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      SoundManager.playBonusShip();
      var bcx = this.x + this.w/2;
      this.board.add(new Explosion(bcx, this.y + this.h/2));
      earnPoints(this.board, bcx, this.y, this.points || 300);
    }
  }
};

// ===================================================================
// PATTERN 6: FALLING ROW (row detaches and drops)
// ===================================================================
var FallingRow = function(opts) {
  this.cols = opts.columns || 8;
  this.spacingX = opts.spacing_x || 48;
  this.startY = opts.start_y || -64;
  this.sprite = opts.sprite || 'enemy_orange_beast';
  this.speed = opts.down_speed || 80;
  this.enemies = [];
};

FallingRow.prototype.init = function(board) {
  // Store board reference for later use
  this.board = board;
  var startX = (Game.width - this.cols * this.spacingX) / 2;
  for(var c = 0; c < this.cols; c++) {
    var blueprint = {
      x: startX + c * this.spacingX,
      y: this.startY,
      sprite: this.sprite,
      health: 15,
      movementType: 'falling',
      fallingSpeed: this.speed,
      fallingCol: c,
      points: 60
    };
    board.add(new Enemy(blueprint));
  }
};

// Player lives - can be changed here
var PLAYER_LIVES = 5;
var playerLives = PLAYER_LIVES;

// High Score System
var highScore = parseInt(localStorage.getItem('alienInvasionHighScore')) || 0;

var saveHighScore = function(score) {
  if(score > highScore) {
    highScore = score;
    localStorage.setItem('alienInvasionHighScore', highScore.toString());
    return true; // New high score!
  }
  return false;
};

// ===== COMBO KILL MULTIPLIER SYSTEM =====
var comboCount = 0;
var comboTimer = 0;
var comboMult = 1;
var COMBO_WINDOW = 2.5; // seconds to chain kills

var earnPoints = function(board, cx, cy, base) {
  comboCount++;
  comboTimer = COMBO_WINDOW;
  comboMult = Math.min(8, 1 + Math.floor((comboCount - 1) / 3));
  var earned = base * comboMult;
  Game.points += earned;
  board.add(new ScorePopup(cx, cy, earned, comboMult));
  return earned;
};

// Global player ship reference (set in PlayerShip constructor)
var playerShip = null;

var startGame = function() {
  // Initialize sound system
  SoundManager.init();

  var ua = navigator.userAgent.toLowerCase();

  // Starfields + Background objects (all behind enemies)
  if(ua.match(/android/)) {
    Game.setBoard(0,new Starfield(50,0.6,100,true));
  } else {
    Game.setBoard(0,new Starfield(20,0.4,100,true));
    Game.setBoard(1,new Starfield(50,0.6,100));
    Game.setBoard(2,new BackgroundObjectsSystem()); // Planets, asteroids, stars
    Game.setBoard(2.5,new EnergyParticlesSystem()); // Floating energy particles
  }
  Game.setBoard(3,new TitleScreen("Alien Invasion",
                                  "Press fire to start playing",
                                  playGame));
};

// Current level tracker
var currentLevel = 1;
var maxLevel = 5;
var infiniteLoopMode = false;

var activateInfiniteLoop = function() {
  infiniteLoopMode = true;
  maxLevel = Number.POSITIVE_INFINITY;
  return true;
};

window.activate_infinite_loop = activateInfiniteLoop;
window.activateInfiniteLoop = activateInfiniteLoop;

var playGame = function() {
  // Only reset lives when starting from level 1 (new game), not when advancing levels
  if(currentLevel === 1) {
    playerLives = PLAYER_LIVES;
  }
  SoundManager.startMusic();
  var board = new GameBoard();
  board.add(new PlayerShip());

  // Select level based on currentLevel
  var levels = [level1, level2, level3, level4, level5];
  var levelIndex = infiniteLoopMode ? ((currentLevel - 1) % levels.length) : (currentLevel - 1);
  var levelData = levels[levelIndex] || level1;

  board.add(new Level(levelData, function() {
    // Level complete callback
    if(infiniteLoopMode || currentLevel < maxLevel) {
      currentLevel++;
      SoundManager.playLevelComplete();
      Game.setBoard(3, new TitleScreen("Level " + (currentLevel - 1) + " Complete!",
                                      "Press fire for Level " + currentLevel,
                                      playGame));
    } else {
      // Won the game!
      currentLevel = 1; // Reset for next play
      winGame();
    }
  }));

  Game.setBoard(3,board);
  Game.setBoard(5,new GamePoints(0));
  Game.setBoard(6,new GameLives());
  Game.setBoard(7,new GameLevel()); // Show current level
};

// ===== LEVEL 1 - EASY =====
var level1 = [
  // WAVE 1: Space Invaders grid (8 rows, different sprites per row)
  [ 0,       1000,   99999, 'grid_formation', { rows: 8, columns: 8, spacing_x: 70, spacing_y: 55, start_x: 64, start_y: 30, initial_speed: 30, cooldown_ms: 1500, diveCooldown: 4, spriteTypes: ['enemy_alien_red', 'enemy_extra_2', 'enemy_extra_3', 'enemy_extra_4', 'enemy_extra_5', 'enemy_extra_6', 'enemy_extra_7', 'enemy_extra_8'] } ],

  // WAVE 2: Bonus flyby
  [ 5000,    30000,  8000,  'bonus_flyby', { speed: 70 } ],

  // WAVE 3: S-curve descent (symmetric)
  [ 14000,   20000,  2000,  'scurve_left' ],
  [ 14000,   20000,  2000,  'scurve_right' ],

  // WAVE 4: Pendulums from center
  [ 20000,   26000,  2000,  'pendulum' ],

  // WAVE 5: Swoops (Galaga-style) from both sides
  [ 26000,   32000,  1800,  'swoop_left' ],
  [ 26000,   32000,  1800,  'swoop_right' ],

  // WAVE 6: Mini boss
  [ 32000,   44000,  12000, 'mother_small' ]
];

// ===== LEVEL 2 - MEDIUM =====
var level2 = [
  // WAVE 1: Grid (bigger) - 8 rows
  [ 0,       1000,   99999, 'grid_formation', { rows: 8, columns: 9, spacing_x: 68, spacing_y: 55, start_x: 48, start_y: 30, initial_speed: 40, cooldown_ms: 1200, diveCooldown: 3.5, spriteTypes: ['enemy_green_creature', 'enemy_extra_6', 'enemy_extra_7', 'enemy_extra_8', 'enemy_extra_9', 'enemy_extra_10', 'enemy_extra_11', 'enemy_extra_12'] } ],

  // Bonus flyby
  [ 5000,    40000,  7000,  'bonus_flyby', { speed: 80 } ],

  // WAVE 2: Figure-8 enemies (Lissajous)
  [ 12000,   20000,  2500,  'fig8_left' ],
  [ 13000,   21000,  2500,  'fig8_right' ],

  // WAVE 3: Corkscrews (spiral descent)
  [ 20000,   26000,  1500,  'cork_left' ],
  [ 20000,   26000,  1500,  'cork_right' ],

  // WAVE 4: Boomerangs from sides
  [ 26000,   32000,  1800,  'boomerang_left' ],
  [ 27000,   33000,  1800,  'boomerang_right' ],

  // WAVE 5: Swoops
  [ 32000,   38000,  1500,  'swoop_left' ],
  [ 32000,   38000,  1500,  'swoop_right' ],

  // WAVE 6: Mother ship
  [ 38000,   52000,  14000, 'mother_medium' ]
];

// ===== LEVEL 3 - HARD =====
var level3 = [
  // WAVE 1: Dense grid - 8 rows
  [ 0,       1000,   99999, 'grid_formation', { rows: 8, columns: 10, spacing_x: 68, spacing_y: 55, start_x: 40, start_y: 30, initial_speed: 45, cooldown_ms: 1000, diveCooldown: 3, spriteTypes: ['enemy_blue_ship', 'enemy_extra_10', 'enemy_extra_11', 'enemy_extra_12', 'enemy_extra_13', 'enemy_extra_14', 'enemy_extra_15', 'enemy_extra_16'] } ],

  // Bonus flyby (faster)
  [ 4000,    40000,  6000,  'bonus_flyby', { speed: 90 } ],

  // WAVE 2: Falling row
  [ 10000,   11000,  99999, 'falling_row', { columns: 6, spacing_x: 52, down_speed: 50, sprite: 'enemy_orange_beast' } ],

  // WAVE 3: Figure-8 + swoops together!
  [ 14000,   20000,  2000,  'fig8_left' ],
  [ 14000,   20000,  2000,  'fig8_right' ],
  [ 16000,   22000,  1500,  'swoop_left' ],
  [ 16000,   22000,  1500,  'swoop_right' ],

  // WAVE 4: Zigzags + corkscrews
  [ 22000,   28000,  1500,  'zigzag' ],
  [ 23000,   29000,  1500,  'cork_left' ],
  [ 23000,   29000,  1500,  'cork_right' ],

  // WAVE 5: Falling row 2
  [ 28000,   29000,  99999, 'falling_row', { columns: 8, spacing_x: 48, down_speed: 55, sprite: 'enemy_blue_ship' } ],

  // WAVE 6: Boomerangs while mother appears
  [ 30000,   36000,  1500,  'boomerang_left' ],
  [ 30000,   36000,  1500,  'boomerang_right' ],
  [ 32000,   46000,  14000, 'mother_small' ],
  [ 36000,   50000,  14000, 'mother_medium' ]
];

// ===== LEVEL 4 - VERY HARD =====
var level4 = [
  // WAVE 1: Full grid - 8 rows
  [ 0,       1000,   99999, 'grid_formation', { rows: 8, columns: 11, spacing_x: 68, spacing_y: 55, start_x: 32, start_y: 30, initial_speed: 50, cooldown_ms: 800, min_cooldown_ms: 200, diveCooldown: 2.5, spriteTypes: ['enemy_orange_beast', 'enemy_extra_14', 'enemy_extra_15', 'enemy_extra_16', 'enemy_extra_17', 'enemy_extra_18', 'enemy_extra_19', 'enemy_new_1'] } ],

  // Bonus flyby
  [ 3000,    50000,  5000,  'bonus_flyby', { speed: 100 } ],

  // WAVE 2: Double falling rows
  [ 8000,    9000,   99999, 'falling_row', { columns: 8, spacing_x: 48, down_speed: 55, sprite: 'enemy_orange_beast' } ],
  [ 12000,   13000,  99999, 'falling_row', { columns: 6, spacing_x: 52, down_speed: 65, sprite: 'enemy_green_creature' } ],

  // WAVE 3: Swoops + figure-8 combo
  [ 16000,   22000,  1200,  'swoop_left' ],
  [ 16000,   22000,  1200,  'swoop_right' ],
  [ 18000,   24000,  2000,  'fig8_left' ],
  [ 18000,   24000,  2000,  'fig8_right' ],

  // WAVE 4: Corkscrews + zigzags + pendulums
  [ 24000,   30000,  1200,  'cork_left' ],
  [ 24000,   30000,  1200,  'cork_right' ],
  [ 26000,   32000,  1000,  'zigzag' ],
  [ 27000,   33000,  1500,  'pendulum' ],

  // WAVE 5: Boomerangs everywhere
  [ 33000,   38000,  1000,  'boomerang_left' ],
  [ 33000,   38000,  1000,  'boomerang_right' ],

  // WAVE 6: Large mother ship
  [ 38000,   54000,  16000, 'mother_large' ]
];

// ===== LEVEL 5 - FINAL BOSS =====
var level5 = [
  // WAVE 1: Massive fast grid - 8 rows
  [ 0,       1000,   99999, 'grid_formation', { rows: 8, columns: 11, spacing_x: 68, spacing_y: 55, start_x: 32, start_y: 30, initial_speed: 55, cooldown_ms: 600, min_cooldown_ms: 150, diveCooldown: 2, spriteTypes: ['enemy_cyber_drone', 'enemy_extra_18', 'enemy_extra_19', 'enemy_new_1', 'enemy_new_2', 'enemy_new_3', 'enemy_new_4', 'enemy_alien_red'] } ],

  // Bonus flyby (constant)
  [ 3000,    70000,  4000,  'bonus_flyby', { speed: 110 } ],

  // WAVE 2: Falling row assault
  [ 6000,    7000,   99999, 'falling_row', { columns: 10, spacing_x: 44, down_speed: 60, sprite: 'enemy_alien_red' } ],

  // WAVE 3: Swoop swarm (Galaga chaos)
  [ 10000,   16000,  800,   'swoop_left' ],
  [ 10000,   16000,  800,   'swoop_right' ],

  // WAVE 4: Figure-8 + corkscrews storm
  [ 16000,   22000,  1200,  'fig8_left' ],
  [ 16000,   22000,  1200,  'fig8_right' ],
  [ 18000,   24000,  1000,  'cork_left' ],
  [ 18000,   24000,  1000,  'cork_right' ],

  // WAVE 5: All patterns at once!
  [ 24000,   30000,  1200,  'zigzag' ],
  [ 24000,   30000,  1200,  'pendulum' ],
  [ 25000,   31000,  1000,  'boomerang_left' ],
  [ 25000,   31000,  1000,  'boomerang_right' ],
  [ 26000,   27000,  99999, 'falling_row', { columns: 8, spacing_x: 48, down_speed: 70, sprite: 'enemy_orange_beast' } ],

  // WAVE 6: S-curves + swoops
  [ 31000,   36000,  1000,  'scurve_left' ],
  [ 31000,   36000,  1000,  'scurve_right' ],
  [ 33000,   38000,  800,   'swoop_left' ],
  [ 33000,   38000,  800,   'swoop_right' ],

  // WAVE 7: Pre-boss mothers
  [ 38000,   50000,  10000, 'mother_medium' ],
  [ 42000,   54000,  10000, 'mother_large' ],

  // WAVE 8: FINAL BOSS
  [ 55000,   95000,  40000, 'final_boss' ]
];




var winGame = function() {
  SoundManager.playLevelComplete();
  var isNewHighScore = saveHighScore(Game.points);
  var subtitle = isNewHighScore ?
    "NEW HIGH SCORE: " + Game.points + "! Press fire to play again" :
    "Score: " + Game.points + " | High Score: " + highScore + " - Press fire to play again";
  Game.setBoard(3,new TitleScreen("You win!", subtitle, playGame));
};

var loseGame = function() {
  currentLevel = 1; // Reset level on game over
  var isNewHighScore = saveHighScore(Game.points);
  var subtitle = isNewHighScore ?
    "NEW HIGH SCORE: " + Game.points + "! Press fire to play again" :
    "Score: " + Game.points + " | High Score: " + highScore + " - Press fire to play again";
  SoundManager.playGameOver();
  Game.setBoard(3,new TitleScreen("Game Over!", subtitle, playGame));
};

var Starfield = function(speed,opacity,numStars,clear) {

  // Set up the offscreen canvas
  var stars = document.createElement("canvas");
  stars.width = Game.width;
  stars.height = Game.height;
  var starCtx = stars.getContext("2d");

  var offset = 0;

  if(clear) {
    // Deep dark night sky background (darker blue-black)
    starCtx.fillStyle = '#020208';
    starCtx.fillRect(0, 0, stars.width, stars.height);
  }

  // Coloured stars of varied sizes (dimmer for night effect)
  var starColors = ['#FFFFFF','#AACCFF','#FFEEDD','#AAFFEE','#FFDDCC','#CCDDFF'];
  for(var i=0;i<numStars;i++) {
    starCtx.globalAlpha = opacity * (0.25 + Math.random() * 0.50); // Dimmer stars
    starCtx.fillStyle = starColors[Math.floor(Math.random() * starColors.length)];
    var sz = Math.random() < 0.03 ? 2 : 1; // Smaller stars
    starCtx.fillRect(Math.floor(Math.random()*stars.width),
                     Math.floor(Math.random()*stars.height),
                     sz, sz);
  }

  // ANIMATED NEBULAS - subtle, dark
  this.nebulas = [
    { x: 0.15, y: 0.25, r: 0.30, hue: 260, hueSpeed: 8 },  // Slower, smaller
    { x: 0.85, y: 0.15, r: 0.22, hue: 220, hueSpeed: 10 },
    { x: 0.50, y: 0.70, r: 0.30, hue: 280, hueSpeed: 7 },
    { x: 0.75, y: 0.55, r: 0.25, hue: 240, hueSpeed: 9 }
  ];
  this.nebulaTime = 0;

  // This method is called every frame
  // to draw the starfield onto the canvas
  this.draw = function(ctx) {
    var intOffset = Math.floor(offset);
    var remaining = stars.height - intOffset;

    // Draw the top half of the starfield
    if(intOffset > 0) {
      ctx.drawImage(stars,
                0, remaining,
                stars.width, intOffset,
                0, 0,
                stars.width, intOffset);
    }

    // Draw the bottom half of the starfield
    if(remaining > 0) {
      ctx.drawImage(stars,
              0, 0,
              stars.width, remaining,
              0, intOffset,
              stars.width, remaining);
    }

    // Draw animated nebulas with changing colors
    this.drawNebulas(ctx);
  };

  this.drawNebulas = function(ctx) {
    for(var n = 0; n < this.nebulas.length; n++) {
      var nd = this.nebulas[n];
      // Animate hue over time
      var currentHue = (nd.hue + this.nebulaTime * nd.hueSpeed) % 360;

      var cx = nd.x * Game.width;
      var cy = nd.y * Game.height;
      var radius = nd.r * Game.width;

      var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      // Darker, more subtle nebulas for night sky
      grad.addColorStop(0, 'hsla(' + currentHue + ', 60%, 20%, 0.12)');
      grad.addColorStop(0.5, 'hsla(' + ((currentHue + 30) % 360) + ', 50%, 12%, 0.06)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, Game.width, Game.height);
    }
  };

  // This method is called to update
  // the starfield
  this.step = function(dt) {
    offset += dt * speed;
    offset = offset % stars.height;
    this.nebulaTime += dt;
  };
};

// ===================================================================
// CLOUD SYSTEM - Beautiful image clouds moving left-right
// ===================================================================
var CloudSystem = function() {
  this.clouds = [];
  var cloudTypes = ['cloud_sunset', 'cloud_wispy', 'cloud_majestic', 'cloud_white', 'cloud_storm'];

  // Create 6-10 clouds with different sizes
  var numClouds = 6 + Math.floor(Math.random() * 5);
  for(var i = 0; i < numClouds; i++) {
    var spriteName = cloudTypes[Math.floor(Math.random() * cloudTypes.length)];
    var sprite = SpriteSheet.map[spriteName];
    var baseW = sprite ? sprite.w : 180;
    var baseH = sprite ? sprite.h : 100;

    // Random scale: some big, some small
    var scale = 0.5 + Math.random() * 1.5; // 0.5x to 2x

    this.clouds.push({
      x: Math.random() * Game.width,
      y: 30 + Math.random() * (Game.height * 0.5),
      speed: 10 + Math.random() * 20,
      direction: Math.random() > 0.5 ? 1 : -1,
      sprite: spriteName,
      scale: scale,
      width: baseW * scale,
      height: baseH * scale,
      opacity: 0.4 + Math.random() * 0.4
    });
  }
};

CloudSystem.prototype.step = function(dt) {
  for(var i = 0; i < this.clouds.length; i++) {
    var c = this.clouds[i];
    c.x += c.speed * c.direction * dt;

    // Wrap around edges
    if(c.x > Game.width + c.width) {
      c.x = -c.width;
    } else if(c.x < -c.width) {
      c.x = Game.width + c.width;
    }
  }
};

CloudSystem.prototype.draw = function(ctx) {
  ctx.save();
  for(var i = 0; i < this.clouds.length; i++) {
    var c = this.clouds[i];
    ctx.globalAlpha = c.opacity;

    // Draw the cloud image scaled
    SpriteSheet.draw(ctx, c.sprite, c.x, c.y, 0, c.width, c.height);
  }
  ctx.restore();
};

// ===================================================================
// BACKGROUND OBJECTS SYSTEM - Planets, Asteroids, Stars (NO clouds, NO motherships)
// Πάντα πίσω από τους εχθρούς! ΛΙΓΑ, ΑΡΓΑ, ΧΩΡΙΣ ΠΕΡΙΣΤΡΟΦΗ
// ===================================================================
var BackgroundObjectsSystem = function() {
  this.objects = [];

  // Background sprite types - ONLY planets, asteroids, stars (NO Saturn, NO clouds, NO motherships)
  var planetTypes = ['bg_planet_1', 'bg_planet_2', 'bg_planet_3', 'bg_planet_4', 'bg_planet_5', 'bg_planet_6'];
  var asteroidTypes = ['bg_asteroid_1', 'bg_asteroid_2', 'bg_asteroid_3', 'bg_asteroid_4', 'bg_asteroid_5'];
  var starTypes = ['bg_star_1', 'bg_star_2', 'bg_star_3', 'bg_star_4'];
  // REMOVED: Saturn (saturnTypes) - user doesn't want it

  // ΛΙΓΑ αντικείμενα - μόνο πλανήτες, αστεροειδείς, αστέρια (με περιστροφή γύρω από τον εαυτό τους)
  var allTypes = [
    { types: planetTypes, count: 3, scale: 1.2, opacity: 0.7, canRotate: true },    // Πλανήτες - περιστροφή
    { types: asteroidTypes, count: 3, scale: 1.0, opacity: 0.6, canRotate: true },  // Πετρώματα - περιστροφή
    { types: starTypes, count: 4, scale: 1.5, opacity: 0.9, canRotate: true, canSparkle: true }  // Αστέρια - περιστροφή + λαμπύρισμα
  ];

  for(var g = 0; g < allTypes.length; g++) {
    var group = allTypes[g];
    for(var i = 0; i < group.count; i++) {
      var spriteName = group.types[Math.floor(Math.random() * group.types.length)];
      var sprite = SpriteSheet.map[spriteName];
      if(!sprite) continue;

      var baseW = sprite.w;
      var baseH = sprite.h;
      var targetScale = group.scale * (0.8 + Math.random() * 0.4);

      // ALL objects MUST start small and grow - NEVER start at full size
      var isZooming = true;
      var startScale = 0.05 + Math.random() * 0.1; // Always start very small (0.05-0.15)

      // ΑΡΓΗ κίνηση: 5-15 pixels/second
      var speed = 5 + Math.random() * 10;

      // Random direction
      var dir = Math.floor(Math.random() * 4); // 0=left->right, 1=right->left, 2=up->down, 3=down->up

      // 60% start from edges (off-screen), 40% start from center (but SMALL)
      var fromEdge = Math.random() < 0.6;
      var startX, startY;

      if(fromEdge) {
        // Start OFF-SCREEN from an edge
        var margin = Math.max(baseW, baseH) * targetScale + 50;
        if(dir === 0) { // from LEFT
          startX = -margin;
          startY = Math.random() * Game.height;
        } else if(dir === 1) { // from RIGHT
          startX = Game.width + margin;
          startY = Math.random() * Game.height;
        } else if(dir === 2) { // from TOP
          startX = Math.random() * Game.width;
          startY = -margin;
        } else { // from BOTTOM
          startX = Math.random() * Game.width;
          startY = Game.height + margin;
        }
      } else {
        // Start from CENTER of screen (but SMALL - will grow)
        startX = Math.random() * Game.width;
        startY = Math.random() * Game.height;
      }

      this.objects.push({
        x: startX,
        y: startY,
        sprite: spriteName,
        baseWidth: baseW,
        baseHeight: baseH,
        scale: startScale,
        targetScale: targetScale,
        isZooming: isZooming,
        opacity: group.opacity,
        baseOpacity: group.opacity, // For sparkle effect
        canSparkle: group.canSparkle || false, // Only stars sparkle
        sparklePhase: Math.random() * Math.PI * 2, // Random start phase
        sparkleSpeed: 2 + Math.random() * 3, // Sparkle speed
        direction: dir,
        speed: speed,
        rotation: 0,
        rotationSpeed: group.canRotate ? (0.5 + Math.random() * 1.5) * (Math.random() < 0.5 ? 1 : -1) : 0, // Πιο γρήγορη περιστροφή γύρω από τον εαυτό τους
        growSpeed: 0.15 + Math.random() * 0.1 // Αργή αύξηση
      });
    }
  }
};

BackgroundObjectsSystem.prototype.step = function(dt) {
  for(var i = 0; i < this.objects.length; i++) {
    var obj = this.objects[i];

    // Sparkle effect for stars (vary opacity)
    if(obj.canSparkle) {
      obj.sparklePhase += obj.sparkleSpeed * dt;
      obj.opacity = obj.baseOpacity * (0.5 + 0.5 * Math.sin(obj.sparklePhase));
    }

    // Grow if zooming (αργά)
    if(obj.isZooming && obj.scale < obj.targetScale) {
      obj.scale += obj.growSpeed * dt;
      if(obj.scale > obj.targetScale) obj.scale = obj.targetScale;
    }

    // ΑΡΓΗ κίνηση
    if(obj.direction === 0) obj.x += obj.speed * dt; // left->right
    else if(obj.direction === 1) obj.x -= obj.speed * dt; // right->left
    else if(obj.direction === 2) obj.y += obj.speed * dt; // up->down
    else obj.y -= obj.speed * dt; // down->up

    // Self-rotation (μόνο αν επιτρέπεται)
    if(obj.rotationSpeed !== 0) {
      obj.rotation += obj.rotationSpeed * dt;
    }

    // Current size
    var currentW = obj.baseWidth * obj.scale;
    var currentH = obj.baseHeight * obj.scale;

    // Reset if off screen
    if(obj.x > Game.width + currentW) {
      obj.x = -currentW;
      obj.y = Math.random() * Game.height;
      obj.scale = obj.isZooming ? 0.15 : obj.targetScale;
    }
    if(obj.x < -currentW) {
      obj.x = Game.width + currentW;
      obj.y = Math.random() * Game.height;
      obj.scale = obj.isZooming ? 0.15 : obj.targetScale;
    }
    if(obj.y > Game.height + currentH) {
      obj.y = -currentH;
      obj.x = Math.random() * Game.width;
      obj.scale = obj.isZooming ? 0.15 : obj.targetScale;
    }
    if(obj.y < -currentH) {
      obj.y = Game.height + currentH;
      obj.x = Math.random() * Game.width;
      obj.scale = obj.isZooming ? 0.15 : obj.targetScale;
    }
  }
};

BackgroundObjectsSystem.prototype.draw = function(ctx) {
  ctx.save();
  for(var i = 0; i < this.objects.length; i++) {
    var obj = this.objects[i];
    var currentW = obj.baseWidth * obj.scale;
    var currentH = obj.baseHeight * obj.scale;

    ctx.globalAlpha = obj.opacity;

    // Self-rotation around center (μόνο αν έχει rotationSpeed)
    if(obj.rotationSpeed !== 0) {
      var cx = obj.x + currentW / 2;
      var cy = obj.y + currentH / 2;
      ctx.translate(cx, cy);
      ctx.rotate(obj.rotation);
      ctx.translate(-cx, -cy);
    }

    SpriteSheet.draw(ctx, obj.sprite, obj.x, obj.y, 0, currentW, currentH);
  }
  ctx.restore();
};

// ===================================================================
// ENERGY PARTICLES SYSTEM - Floating colorful particles (like title screen)
// ===================================================================
var EnergyParticlesSystem = function() {
  this.particles = [];
  this.t = 0;

  // Create floating energy particles
  for(var i = 0; i < 35; i++) {
    this.particles.push({
      x: Math.random() * Game.width,
      y: Math.random() * Game.height,
      vx: (Math.random() - 0.5) * 15,
      vy: -(3 + Math.random() * 12),
      size: 0.6 + Math.random() * 1.8,
      alpha: 0.25 + Math.random() * 0.45,
      color: ['#00FFFF','#FF44FF','#FFFF44','#FF8800','#00FF88','#FF4466'][Math.floor(Math.random() * 6)]
    });
  }
};

EnergyParticlesSystem.prototype.step = function(dt) {
  this.t += dt;
  for(var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if(p.y < -6) { p.y = Game.height + 6; p.x = Math.random() * Game.width; }
    if(p.x < 0) p.x = Game.width;
    if(p.x > Game.width) p.x = 0;
  }
};

EnergyParticlesSystem.prototype.draw = function(ctx) {
  ctx.save();
  for(var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    var flicker = 0.4 + 0.6 * Math.abs(Math.sin(this.t * 1.5 + i * 0.7));
    ctx.globalAlpha = p.alpha * flicker;
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
};

var PlayerShip = function() {
  playerShip = this;
  this.setup('ship', { vx: 0, reloadTime: 0.25, maxVel: 200 });

  this.reload = this.reloadTime;
  this.rocketReload = 0;
  this.rocketReloadTime = 2; // 2 seconds between rockets
  this.x = Game.width/2 - this.w / 2;
  this.y = Game.height - Game.playerOffset - this.h;

  // Power-up effect timers
  this.speedBoostTimer = 0;
  this.powerShotTimer = 0;
  this.wingmanLeft = null;
  this.wingmanRight = null;

  // Invincibility after taking damage
  this.invincible = 0;

  this.step = function(dt) {
    // Update power-up timers
    if(this.speedBoostTimer > 0) this.speedBoostTimer -= dt;
    if(this.powerShotTimer > 0) this.powerShotTimer -= dt;
    if(this.invincible > 0) this.invincible -= dt;

    // Mouse control ONLY - follow mouse X position
    if(typeof Game.mouseX !== 'undefined') {
      var targetX = Game.mouseX - this.w / 2;
      var diff = targetX - this.x;
      var followSpeed = this.speedBoostTimer > 0 ? 25 : 15;
      this.x += diff * followSpeed * dt;
    }

    // Keep ship on screen
    if(this.x < 0) { this.x = 0; }
    else if(this.x > Game.width - this.w) {
      this.x = Game.width - this.w;
    }

    this.reload-=dt;
    this.rocketReload -= dt;

    // Left click = normal fire
    if(Game.keys['fire'] && this.reload < 0) {
      Game.keys['fire'] = false;
      this.reload = this.reloadTime;

      var dmg = this.powerShotTimer > 0 ? 20 : 10;
      var m1 = new PlayerMissile(this.x,this.y+this.h/2);
      var m2 = new PlayerMissile(this.x+this.w,this.y+this.h/2);
      m1.damage = dmg;
      m2.damage = dmg;
      this.board.add(m1);
      this.board.add(m2);
      SoundManager.playShoot();
    }

    // Right click = rocket (bomb)
    if(Game.keys['rocket'] && this.rocketReload <= 0) {
      Game.keys['rocket'] = false;
      this.rocketReload = this.rocketReloadTime;

      this.board.add(new PlayerRocket(this.x + this.w/2, this.y));
      SoundManager.playRocket();
    }

    // === COLLECT POWER-UPS ===
    var powerup = this.board.collide(this, OBJECT_POWERUP);
    if(powerup) {
      this.board.remove(powerup);
      this.applyPowerUp(powerup.powerType);
    }
  };
};

PlayerShip.prototype = new Sprite();
PlayerShip.prototype.type = OBJECT_PLAYER;

PlayerShip.prototype.applyPowerUp = function(pType) {
  var letter = pType.letter;
  SoundManager.playPowerUp();

  if(letter === 'S') {
    // Speed boost for 10 seconds
    this.speedBoostTimer = 10;
  } else if(letter === 'W') {
    // Wingmen for 15 seconds
    if(!this.wingmanLeft) {
      this.wingmanLeft = new WingmanShip(this, -1);
      this.board.add(this.wingmanLeft);
    } else {
      this.wingmanLeft.lifeTimer = 15; // Refresh timer
    }
    if(!this.wingmanRight) {
      this.wingmanRight = new WingmanShip(this, 1);
      this.board.add(this.wingmanRight);
    } else {
      this.wingmanRight.lifeTimer = 15;
    }
  } else if(letter === 'P') {
    // Power shot for 10 seconds
    this.powerShotTimer = 10;
  } else if(letter === 'L') {
    // Extra life
    playerLives++;
  } else if(letter === 'B') {
    // Bomb: damage all enemies on screen
    var toHit = [];
    for(var i = 0; i < this.board.objects.length; i++) {
      var obj = this.board.objects[i];
      if(obj.type === OBJECT_ENEMY) {
        toHit.push(obj);
      }
    }
    for(var i = 0; i < toHit.length; i++) {
      toHit[i].hit(50);
    }
    // Flash effect
    this.board.add(new BombFlash());
  }
};

// Bomb flash effect (white screen flash)
var BombFlash = function() {
  this.alpha = 1;
};
BombFlash.prototype.step = function(dt) {
  this.alpha -= dt * 3;
  if(this.alpha <= 0) this.board.remove(this);
};
BombFlash.prototype.draw = function(ctx) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, this.alpha * 0.6);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, Game.width, Game.height);
  ctx.restore();
};

PlayerShip.prototype.hit = function(damage) {
  if(this.invincible > 0) return; // Invincible — no damage
  playerLives--;
  this.invincible = 2.0; // 2 seconds of invincibility
  SoundManager.playPlayerHit();
  Game.shake(16, 0.45);
  if(playerLives <= 0) {
    if(this.board.remove(this)) {
      loseGame();
    }
  } else {
    this.x = Game.width/2 - this.w / 2;
  }
};

PlayerShip.prototype.draw = function(ctx) {
  ctx.save();
  var cx = this.x + this.w / 2;
  var engineY = this.y + this.h;

  // Engine thruster glow (random flicker)
  var thrustH = 14 + Math.random() * 11;
  var thrustGrad = ctx.createRadialGradient(cx, engineY, 0, cx, engineY, thrustH * 1.4);
  thrustGrad.addColorStop(0, 'rgba(210,230,255,0.95)');
  thrustGrad.addColorStop(0.25, 'rgba(80,130,255,0.55)');
  thrustGrad.addColorStop(1, 'rgba(0,40,200,0)');
  ctx.fillStyle = thrustGrad;
  ctx.beginPath();
  ctx.ellipse(cx, engineY + thrustH * 0.45, thrustH * 0.28, thrustH, 0, 0, Math.PI * 2);
  ctx.fill();

  // Invincibility shield bubble + blink
  if(this.invincible > 0) {
    var shieldPulse = 0.45 + 0.28 * Math.sin(this.invincible * 22);
    ctx.save();
    ctx.globalAlpha = shieldPulse * 0.55;
    ctx.strokeStyle = '#00FFFF';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00FFFF';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.ellipse(cx, this.y + this.h * 0.44, this.w * 0.65, this.h * 0.68, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = shieldPulse * 0.07;
    ctx.fillStyle = '#00DDFF';
    ctx.fill();
    ctx.restore();
    // Ship itself blinks
    if(Math.floor(this.invincible * 9) % 2 === 0) {
      ctx.globalAlpha = 0.3;
    }
  }

  // Ship glow colour changes with active power-up
  ctx.shadowColor = this.speedBoostTimer > 0 ? '#00FF88' :
                    this.powerShotTimer > 0  ? '#FF8800' : '#4499FF';
  ctx.shadowBlur = 18;

  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame);
  ctx.restore();
};


var PlayerMissile = function(x,y) {
  this.setup('missile',{ vy: -700, damage: 10 });
  // Increase collision box width for better hit detection
  this.w = 20;
  this.h = 24;
  this.x = x - this.w/2;
  this.y = y - this.h;
};

PlayerMissile.prototype = new Sprite();
PlayerMissile.prototype.type = OBJECT_PLAYER_PROJECTILE;

PlayerMissile.prototype.draw = function(ctx) {
  ctx.save();
  var cx = this.x + this.w / 2;
  var top = this.y;
  var bot = this.y + this.h;

  ctx.lineCap = 'round';

  // Outer cyan glow beam
  ctx.strokeStyle = '#00FFFF';
  ctx.lineWidth = 5;
  ctx.shadowColor = '#00DDFF';
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.moveTo(cx, bot);
  ctx.lineTo(cx, top);
  ctx.stroke();

  // Bright white core
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.moveTo(cx, bot);
  ctx.lineTo(cx, top);
  ctx.stroke();

  ctx.restore();
};

PlayerMissile.prototype.step = function(dt)  {
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_ENEMY);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y < -this.h) { 
      this.board.remove(this); 
  }
};


var Enemy = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
  this.maxHealth = this.health; // Store for health bar
  this.hitFlash = 0;
  // Sway motion - individual left-right rotation
  this.swayAngle = 0;
  this.swaySpeed = 1.5 + Math.random() * 1.0; // Random speed for each enemy
  this.swayOffset = Math.random() * Math.PI * 2; // Random starting phase
};

Enemy.prototype = new Sprite();
Enemy.prototype.type = OBJECT_ENEMY;

Enemy.prototype.baseParameters = { A: 0, B: 0, C: 0, D: 0,
                                   E: 0, F: 0, G: 0, H: 0,
                                   t: 0, reloadTime: 0.75,
                                   reload: 0, spawnTimer: 0 };

Enemy.prototype.step = function(dt) {
  this.t += dt;
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;

  // ===== INDIVIDUAL SWAY MOTION (30 degrees left-right) =====
  // Calculate sway: 30 degrees = Math.PI/6 radians
  this.swayAngle = Math.sin(this.t * this.swaySpeed + this.swayOffset) * (Math.PI / 6);

  // ===== MOVEMENT BY TYPE =====

  if(this.movementType === 'swoop') {
    // GALAGA SWOOP: dive down, do a circular loop, exit upward
    var spd = this.swoopSpeed || 150;
    if(this.swoopPhase === 0) {
      // Phase 0: Dive downward with slight curve
      this.y += spd * dt;
      this.x += this.swoopDir * spd * 0.3 * dt;
      if(this.y > Game.height * 0.5) {
        this.swoopPhase = 1;
        this.loopCenterX = this.x + this.swoopDir * this.loopRadius;
        this.loopCenterY = this.y;
        this.loopAngle = Math.PI + (this.swoopDir > 0 ? 0 : Math.PI);
      }
    } else if(this.swoopPhase === 1) {
      // Phase 1: Circular loop (like Galaga's iconic loop)
      this.loopAngle += this.swoopDir * 2 * dt;
      this.x = this.loopCenterX + Math.cos(this.loopAngle) * this.loopRadius;
      this.y = this.loopCenterY + Math.sin(this.loopAngle) * this.loopRadius;
      var totalRotation = Math.abs(this.loopAngle - (Math.PI + (this.swoopDir > 0 ? 0 : Math.PI)));
      if(totalRotation > Math.PI * 2) {
        this.swoopPhase = 2;
      }
    } else {
      // Phase 2: Exit upward fast
      this.y -= spd * 1.2 * dt;
      this.x -= this.swoopDir * spd * 0.2 * dt;
    }

  } else if(this.movementType === 'figure8') {
    // LISSAJOUS FIGURE-8: x = A*sin(t), y = B*sin(2t) + drift down
    // Entry phase: fly toward center first
    if(this.t < 1.0) {
      var progress = this.t;
      this.x += (this.fig8CenterX - this.x) * 3 * dt;
      this.y += (this.fig8CenterY - this.y) * 3 * dt;
    } else {
      var ft = (this.t - 1.0) * this.fig8Speed;
      this.x = this.fig8CenterX + this.fig8A * Math.sin(ft);
      this.y = this.fig8CenterY + this.fig8B * Math.sin(ft * 2);
      // Slow drift downward
      this.fig8CenterY += this.fig8Drift * dt;
    }

  } else if(this.movementType === 'scurve') {
    // S-CURVE DESCENT: smooth S-shape while falling
    this.y += this.scurveSpeed * dt;
    var yProgress = this.y + 64; // distance traveled
    this.x = this.scurveStartX + this.scurveAmplitude * Math.sin(this.scurveFreq * yProgress);

  } else if(this.movementType === 'corkscrew') {
    // CORKSCREW: spiral descent like a spinning drill
    this.x = this.corkCenterX + Math.cos(this.t * this.corkSpeed) * this.corkRadius;
    this.y += this.corkFall * dt;
    // Slowly drift center toward middle of screen
    this.corkCenterX += (Game.width * 0.5 - this.corkCenterX) * 0.3 * dt;

  } else if(this.movementType === 'pendulum') {
    // PENDULUM: wide swings while falling
    this.x = this.pendCenterX + Math.sin(this.t * this.pendSpeed) * this.pendAmplitude;
    this.y += this.pendFall * dt;

  } else if(this.movementType === 'boomerang') {
    // BOOMERANG: enter, curve down, U-turn, exit other side
    var spd = this.boomSpeed;
    if(this.boomPhase === 0) {
      // Enter: move horizontally + slowly descend
      this.x += this.boomDir * spd * dt;
      this.y += spd * 0.3 * dt;
      if(this.y > this.boomTurnY) {
        this.boomPhase = 1;
        this.boomTurnX = this.x;
        this.boomAngle = this.boomDir > 0 ? 0 : Math.PI;
      }
    } else if(this.boomPhase === 1) {
      // U-turn: semicircle
      this.boomAngle += this.boomDir * 1.5 * dt;
      var turnR = 80;
      this.x = this.boomTurnX + Math.cos(this.boomAngle) * turnR - (this.boomDir > 0 ? turnR : -turnR);
      this.y = this.boomTurnY + Math.sin(this.boomAngle) * turnR;
      if(Math.abs(this.boomAngle - (this.boomDir > 0 ? 0 : Math.PI)) > Math.PI) {
        this.boomPhase = 2;
        this.boomDir *= -1; // reverse direction
      }
    } else {
      // Exit: fly back the other way, ascending
      this.x += this.boomDir * spd * dt;
      this.y -= spd * 0.5 * dt;
    }

  } else if(this.movementType === 'zigzag') {
    // ZIGZAG: sharp direction changes while descending
    this.zigTimer += dt;
    if(this.zigTimer >= this.zigInterval) {
      this.zigTimer = 0;
      this.zigDir *= -1;
    }
    this.x += this.zigDir * this.zigSpeed * dt;
    this.y += (this.E || 50) * dt;

  } else if(this.movementType === 'falling') {
    // FALLING ROW: fast drop with oscillation
    this.y += (this.fallingSpeed || 80) * dt;
    this.x += Math.sin(this.t * 2 + (this.fallingCol || 0)) * 20 * dt;

  } else if(this.movementType === 'mothership') {
    // MOTHERSHIP: simple left-right movement with slow descent
    if(!this.motherArrived) {
      // Phase 1: descend to target Y
      this.y += this.motherSpeed * dt;
      if(this.y >= this.motherTargetY) {
        this.y = this.motherTargetY;
        this.motherArrived = true;
        this.motherDir = 1; // Start moving right
        SoundManager.playWarp();
        Game.shake(this.isBossShip ? 24 : 14, this.isBossShip ? 0.75 : 0.5);
      }
    } else {
      // Phase 2: move left-right, slowly descend
      this.x += this.motherSpeed * this.motherDir * dt;

      // Slowly descend
      this.y += 5 * dt;

      // Bounce off edges
      if(this.x + this.w > Game.width - 20) {
        this.x = Game.width - this.w - 20;
        this.motherDir = -1; // Go left
      }
      if(this.x < 20) {
        this.x = 20;
        this.motherDir = 1; // Go right
      }
    }

  } else {
    // DEFAULT: parametric sine movement (for mother ships etc)
    this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
    this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  // Smooth banking angle based on horizontal movement (non-mothership enemies)
  if(!this.isMotherShip && !this.isBossShip) {
    var _bdx = this.x - (this._prevBX !== undefined ? this._prevBX : this.x);
    var targetBank = _bdx * 0.07;
    this.bankAngle = ((this.bankAngle || 0) * 0.84 + targetBank * 0.16);
    this._prevBX = this.x;
  }

  // Mother Ship - spawns enemies
  if(this.isMotherShip) {
    this.spawnTimer += dt;
    if(this.spawnTimer >= this.spawnRate) {
      this.spawnTimer = 0;
      var spawnEnemy = enemies[this.spawnType]();
      this.board.add(new Enemy(spawnEnemy, { x: this.x + this.w/2, y: this.y + this.h }));
    }
  }

  // Boss Ship - spawns enemies
  if(this.isBossShip) {
    this.spawnTimer += dt;
    if(this.spawnTimer >= this.spawnRate) {
      this.spawnTimer = 0;
      var spawnEnemy = enemies[this.spawnType]();
      this.board.add(new Enemy(spawnEnemy, { x: this.x + this.w/2, y: this.y + this.h }));
    }
  }

  // Collision with player
  var collision = this.board.collide(this,OBJECT_PLAYER);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  }

  // Shooting
  if(this.missiles && Math.random() < 0.01 && this.reload <= 0) {
    this.reload = this.reloadTime;
    if(this.missiles == 2) {
      this.board.add(new EnemyMissile(this.x+this.w-2,this.y+this.h));
      this.board.add(new EnemyMissile(this.x+2,this.y+this.h));
    } else if(this.missiles == 3) {
      this.board.add(new EnemyMissile(this.x+this.w-2,this.y+this.h));
      this.board.add(new EnemyMissile(this.x+this.w/2,this.y+this.h));
      this.board.add(new EnemyMissile(this.x+2,this.y+this.h));
    } else if(this.missiles >= 4) {
      this.board.add(new EnemyMissile(this.x+this.w-2,this.y+this.h));
      this.board.add(new EnemyMissile(this.x+this.w*0.66,this.y+this.h));
      this.board.add(new EnemyMissile(this.x+this.w*0.33,this.y+this.h));
      this.board.add(new EnemyMissile(this.x+2,this.y+this.h));
    } else {
      this.board.add(new EnemyMissile(this.x+this.w/2,this.y+this.h));
    }
  }
  this.reload-=dt;

  // Off-screen removal (account for large sprites like motherships)
  if(this.y > Game.height + 100 ||
     this.y + this.h < -100 ||
     this.x + this.w < -200 ||
     this.x > Game.width + 200) {
       this.board.remove(this);
  }
};

Enemy.prototype.hit = function(damage) {
  this.hitFlash = 1.0; // Flash white on any hit
  this.health -= damage;
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      if(this.isMotherShip || this.isBossShip) {
        SoundManager.playBossDeath();
        Game.shake(32, 0.85); // Big shake for boss
        var cx = this.x + this.w/2;
        var cy = this.y + this.h/2;
        var numDebris = this.isBossShip ? 50 : 35; // More debris pieces
        for(var d = 0; d < numDebris; d++) {
          this.board.add(new Debris(cx, cy, this.w));
        }
        for(var e = 0; e < 6; e++) {
          var ex = this.x + Math.random() * this.w;
          var ey = this.y + Math.random() * this.h;
          this.board.add(new Explosion(ex, ey));
        }
        this.board.add(new ParticleExplosion(cx, cy, this.w));
        earnPoints(this.board, cx, cy - 50, this.points || 500);
        this.board.add(new PowerUp(cx, cy));
      } else {
        SoundManager.playEnemyDeath();
        Game.shake(6, 0.18);
        var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
        this.board.add(new Explosion(ecx, ecy));
        this.board.add(new ParticleExplosion(ecx, ecy, this.w));
        earnPoints(this.board, ecx, this.y, this.points || 100);
        if(Math.random() < 0.15) {
          this.board.add(new PowerUp(ecx, ecy));
        }
      }
    }
  } else {
    // Hit but not dead — cyan impact sparks
    var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
    this.board.add(new MissileImpactSpark(ecx, ecy));
    SoundManager.playImpact();
  }
};

// Draw method for enemies — hit flash + boss health bar
Enemy.prototype.draw = function(ctx) {
  ctx.save();

  if(this.isGhost && this.opacity !== undefined) {
    ctx.globalAlpha = this.opacity;
  }

  // Calculate center for rotation
  var bCx = this.x + this.w / 2;
  var bCy = this.y + this.h / 2;

  // Apply scale 110% for regular enemies (not motherships/bosses) - 10% BIGGER
  if(!this.isMotherShip && !this.isBossShip) {
    ctx.translate(bCx, bCy);
    ctx.scale(1.1, 1.1); // 10% BIGGER
    ctx.translate(-bCx, -bCy);
  }

  // Apply individual sway rotation (30 degrees) + banking rotation
  if(!this.isMotherShip && !this.isBossShip) {
    var totalRotation = this.swayAngle + (this.bankAngle || 0);
    ctx.translate(bCx, bCy);
    ctx.rotate(Math.max(-0.52, Math.min(0.52, totalRotation))); // ~30 degrees max
    ctx.translate(-bCx, -bCy);
  }

  // Mothership pulsing danger aura
  if((this.isMotherShip || this.isBossShip) && this.motherArrived) {
    var mCx = this.x + this.w / 2;
    var mCy = this.y + this.h / 2;
    var auraPulse = 0.22 + 0.16 * Math.sin(this.t * 3.5);
    ctx.save();
    ctx.globalAlpha = auraPulse;
    ctx.shadowColor = '#FF3300';
    ctx.shadowBlur = 55;
    ctx.strokeStyle = '#FF5500';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.ellipse(mCx, mCy, this.w * 0.53, this.h * 0.53, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame);

  // Hit flash - small white dots around the ship (randomized each hit)
  if(this.hitFlash > 0 && (this.isMotherShip || this.isBossShip)) {
    ctx.globalAlpha = Math.min(1, this.hitFlash) * 0.9;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 3;
    // Generate random dots around the ship edges
    var numDots = 15 + Math.floor(Math.random() * 10);
    for(var d = 0; d < numDots; d++) {
      var angle = Math.random() * Math.PI * 2;
      var distX = (Math.random() * 0.5 + 0.5) * this.w / 2;
      var distY = (Math.random() * 0.5 + 0.5) * this.h / 2;
      var dotX = this.x + this.w/2 + Math.cos(angle) * distX;
      var dotY = this.y + this.h/2 + Math.sin(angle) * distY;
      var dotSize = 2 + Math.random() * 3;
      ctx.beginPath();
      ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  // Boss / mothership health bar - ABOVE the ship (not below)
  if((this.isMotherShip || this.isBossShip) && this.maxHealth) {
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    var barW = Math.min(this.w * 0.82, 200);
    var barX = this.x + this.w / 2 - barW / 2;
    var barY = this.y - 18; // ABOVE the ship instead of below
    var ratio = Math.max(0, this.health / this.maxHealth);

    // Background track
    ctx.fillStyle = '#111111';
    ctx.fillRect(barX - 1, barY - 1, barW + 2, 10);

    // Filled portion
    var hColor = ratio > 0.5 ? '#00DD00' : ratio > 0.25 ? '#FFAA00' : '#FF2200';
    ctx.shadowColor = hColor;
    ctx.shadowBlur = 7;
    ctx.fillStyle = hColor;
    ctx.fillRect(barX, barY, barW * ratio, 8);

    // Border
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.85;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, 8);
  }

  ctx.restore();
};

var EnemyMissile = function(x,y) {
  this.setup('enemy_missile',{ vy: 200, damage: 10 });
  this.x = x - this.w/2;
  this.y = y;
};

EnemyMissile.prototype = new Sprite();
EnemyMissile.prototype.type = OBJECT_ENEMY_PROJECTILE;

EnemyMissile.prototype.draw = function(ctx) {
  ctx.save();
  var cx = this.x + this.w / 2;
  var cy = this.y + this.h * 0.3;

  // Outer red plasma glow
  ctx.shadowColor = '#FF3300';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#FF5500';
  ctx.fill();

  // Bright hot core
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#FFCC88';
  ctx.fill();

  // Trailing sparks
  ctx.globalAlpha = 0.5;
  ctx.shadowBlur = 9;
  ctx.beginPath();
  ctx.arc(cx, cy - 9, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#FF4400';
  ctx.fill();

  ctx.globalAlpha = 0.22;
  ctx.beginPath();
  ctx.arc(cx, cy - 17, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = '#FF2200';
  ctx.fill();

  ctx.restore();
};

EnemyMissile.prototype.step = function(dt)  {
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_PLAYER)
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y > Game.height) {
      this.board.remove(this); 
  }
};



var Explosion = function(centerX,centerY) {
  this.setup('explosion', { frame: 0 });
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
};

Explosion.prototype = new Sprite();

Explosion.prototype.step = function(dt) {
  this.frame++;
  if(this.frame >= 12) {
    this.board.remove(this);
  }
};

// ===================================================================
// PARTICLE EXPLOSION (fire sparks that fly outward)
// ===================================================================
var ParticleExplosion = function(cx, cy, size) {
  this.particles = [];
  var count = 20 + Math.floor(Math.random() * 16);
  var colors = ['#FF8800','#FF4400','#FFFF00','#FF2200','#FF6600','#FFFFFF','#FFAA44','#FF5522'];
  size = size || 64;
  for(var i = 0; i < count; i++) {
    var angle = Math.random() * Math.PI * 2;
    var speed = (55 + Math.random() * 190) * (size / 64);
    var life = 0.35 + Math.random() * 0.55;
    this.particles.push({
      x: cx + (Math.random() - 0.5) * size * 0.3,
      y: cy + (Math.random() - 0.5) * size * 0.3,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: life,
      maxLife: life,
      size: 1.5 + Math.random() * 3.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
};

ParticleExplosion.prototype.step = function(dt) {
  var alive = 0;
  for(var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    if(p.life > 0) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 110 * dt; // gravity
      p.vx *= 0.975;
      p.life -= dt;
      alive++;
    }
  }
  if(alive === 0) this.board.remove(this);
};

ParticleExplosion.prototype.draw = function(ctx) {
  ctx.save();
  for(var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    if(p.life > 0) {
      var a = p.life / p.maxLife;
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * Math.max(0.2, a), 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
};

// ===================================================================
// MISSILE IMPACT SPARK (cyan sparks when missile hits but doesn't kill)
// ===================================================================
var MissileImpactSpark = function(cx, cy) {
  this.particles = [];
  var count = 4 + Math.floor(Math.random() * 5);
  for(var i = 0; i < count; i++) {
    var angle = Math.random() * Math.PI * 2;
    var speed = 55 + Math.random() * 110;
    var life = 0.09 + Math.random() * 0.13;
    this.particles.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: life, maxLife: life,
      size: 1.5 + Math.random() * 2.2
    });
  }
};
MissileImpactSpark.prototype.step = function(dt) {
  var alive = 0;
  for(var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    if(p.life > 0) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.87;
      p.life -= dt;
      alive++;
    }
  }
  if(alive === 0) this.board.remove(this);
};
MissileImpactSpark.prototype.draw = function(ctx) {
  ctx.save();
  for(var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    if(p.life > 0) {
      var a = p.life / p.maxLife;
      ctx.globalAlpha = a;
      ctx.fillStyle = '#00FFFF';
      ctx.shadowColor = '#00FFFF';
      ctx.shadowBlur = 9;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
};

// ===================================================================
// DEBRIS (flying pieces from destroyed mothership/boss)
// ===================================================================
var Debris = function(cx, cy, shipSize) {
  this.x = cx + (Math.random() - 0.5) * shipSize * 0.6;
  this.y = cy + (Math.random() - 0.5) * shipSize * 0.6;
  this.w = 2 + Math.random() * 5; // Smaller: 2-7px instead of 6-18px
  this.h = 2 + Math.random() * 5; // Smaller: 2-7px instead of 6-18px
  // Random velocity in all directions
  var angle = Math.random() * Math.PI * 2;
  var speed = 120 + Math.random() * 300;
  this.vx = Math.cos(angle) * speed;
  this.vy = Math.sin(angle) * speed;
  this.rotation = Math.random() * Math.PI * 2;
  this.rotSpeed = (Math.random() - 0.5) * 12;
  this.alpha = 1;
  this.life = 1.2 + Math.random() * 0.8;
  // Random color from fire palette
  var colors = ['#FF4400', '#FF6600', '#FF8800', '#FFAA00', '#FFCC00', '#FF2200', '#CC4400'];
  this.color = colors[Math.floor(Math.random() * colors.length)];
};

Debris.prototype.step = function(dt) {
  this.x += this.vx * dt;
  this.y += this.vy * dt;
  this.vy += 80 * dt; // gravity
  this.rotation += this.rotSpeed * dt;
  this.life -= dt;
  this.alpha = Math.max(0, this.life / 1.5);
  if(this.life <= 0) {
    this.board.remove(this);
  }
};

Debris.prototype.draw = function(ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation);
  ctx.globalAlpha = this.alpha;
  ctx.fillStyle = this.color;
  ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
  // Bright edge
  ctx.strokeStyle = '#FFFF00';
  ctx.lineWidth = 1;
  ctx.strokeRect(-this.w/2, -this.h/2, this.w, this.h);
  ctx.restore();
};

// ===================================================================
// SCORE POPUP (floating text showing points earned)
// ===================================================================
var ScorePopup = function(x, y, points, mult) {
  this.x = x;
  this.y = y;
  this.points = points;
  this.mult = mult || 1;
  this.life = 1.0; // seconds
  this.vy = -50 - (this.mult > 1 ? 15 : 0); // float faster for combos
};

ScorePopup.prototype.step = function(dt) {
  this.y += this.vy * dt;
  this.life -= dt;
  if(this.life <= 0) {
    this.board.remove(this);
  }
};

ScorePopup.prototype.draw = function(ctx) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, this.life);
  var sz = this.mult >= 4 ? 22 : this.mult > 1 ? 18 : 15;
  ctx.font = 'bold ' + sz + 'px Bangers, Arial';
  ctx.fillStyle = this.mult >= 6 ? '#FF4400' : this.mult >= 4 ? '#FF8800' : this.mult >= 2 ? '#FFCC00' : '#FFFF00';
  ctx.shadowColor = ctx.fillStyle;
  ctx.shadowBlur = this.mult > 1 ? 14 : 0;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  var label = '+' + this.points;
  if(this.mult > 1) label += ' x' + this.mult + '!';
  ctx.fillText(label, this.x, this.y);
  ctx.restore();
};

window.addEventListener("load", function() {
  activateInfiniteLoop();
  Game.initialize("game",sprites,startGame);
});

// Display player lives as glowing hearts - LINE 1 (top-right)
var GameLives = function() {
  this.draw = function(ctx) {
    ctx.save();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    var heartSz = Math.max(12, Math.floor(Game.width / 38)); // ~21px on 800px screen
    ctx.font = 'bold ' + heartSz + 'px Arial';
    ctx.shadowColor = '#FF3366';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#FF5588';
    var hearts = '';
    for(var i = 0; i < Math.max(0, playerLives); i++) hearts += '\u2665 ';
    ctx.fillText(hearts.trim(), Game.width - 10, 8);
    ctx.restore();
  };

  this.step = function(dt) { };
};

// Display current level + sound indicator - LINES 2 & 3 (top-right)
var GameLevel = function() {
  this.draw = function(ctx) {
    ctx.save();
    ctx.textBaseline = 'top';

    // Calculate sizes based on screen width
    var heartSz = Math.max(12, Math.floor(Game.width / 38)); // Same as hearts
    var levelSz = Math.max(11, Math.floor(Game.width / 45)); // ~17px on 800px screen
    var soundSz = Math.max(9, levelSz - 2); // ~15px

    // Hearts end at: y=8 + heartSz + shadow(8*2) = 8 + 21 + 16 = 45
    // Level starts at: 45 + 15 = 60
    ctx.font = 'bold ' + levelSz + 'px Bangers, Arial';
    ctx.textAlign = 'right';
    ctx.shadowColor = '#FFFF00';
    ctx.shadowBlur = 7;
    ctx.fillStyle = '#FFFF44';
    ctx.fillText('L E V E L  ' + currentLevel, Game.width - 10, 60); // More spaced letters

    // Level ends at: 60 + levelSz + shadow(7*2) = 60 + 17 + 14 = 91
    // Sound starts at: 91 + 15 = 106
    var muted = SoundManager.isMuted();
    ctx.font = 'bold ' + soundSz + 'px Arial';
    ctx.textAlign = 'right';
    ctx.shadowColor = muted ? '#FF2200' : '#00FF44';
    ctx.shadowBlur = 6;
    ctx.fillStyle = muted ? '#FF4422' : '#22FF66';
    ctx.fillText(muted ? 'SND:OFF [M]' : 'SND:ON [M]', Game.width - 10, 106);

    ctx.restore();
  };

  this.step = function(dt) { };
};

// ===== ROCKET / BOMB (Right click) =====
var PlayerRocket = function(x,y) {
  this.setup('missile',{ vy: -400, damage: 50 });  // Slower but more damage
  this.x = x - this.w/2;
  this.y = y - this.h;
  this.radius = 80; // Explosion radius
};

PlayerRocket.prototype = new Sprite();
PlayerRocket.prototype.type = OBJECT_PLAYER_PROJECTILE;

PlayerRocket.prototype.step = function(dt) {
  this.y += this.vy * dt;

  // Check collision with any enemy
  var collision = this.board.collide(this,OBJECT_ENEMY);
  if(collision) {
    // Create explosion effect
    this.board.add(new RocketExplosion(this.x + this.w/2, this.y + this.h/2, this.radius));

    // Damage all enemies in radius
    var self = this;
    this.board.objects.forEach(function(obj) {
      if(obj.type === OBJECT_ENEMY) {
        var dx = (obj.x + obj.w/2) - (self.x + self.w/2);
        var dy = (obj.y + obj.h/2) - (self.y + self.h/2);
        var distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < self.radius) {
          obj.hit(self.damage);
        }
      }
    });

    this.board.remove(this);
  } else if(this.y < -this.h) {
    // Create explosion at top of screen
    this.board.add(new RocketExplosion(this.x + this.w/2, 50, this.radius));
    this.board.remove(this);
  }
};

// Rocket Explosion Effect
var RocketExplosion = function(centerX, centerY, radius) {
  this.x = centerX;
  this.y = centerY;
  this.radius = radius || 80;
  this.maxRadius = this.radius;
  this.currentRadius = 0;
  this.alpha = 1;
  this.done = false;
};

RocketExplosion.prototype.step = function(dt) {
  this.currentRadius += dt * 300;
  this.alpha -= dt * 2;

  if(this.alpha <= 0) {
    this.board.remove(this);
  }
};

RocketExplosion.prototype.draw = function(ctx) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, this.alpha);

  // Outer ring
  ctx.beginPath();
  ctx.arc(this.x, this.y, Math.min(this.currentRadius, this.maxRadius), 0, Math.PI * 2);
  ctx.strokeStyle = '#FF6600';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Inner glow
  ctx.beginPath();
  ctx.arc(this.x, this.y, Math.min(this.currentRadius * 0.7, this.maxRadius * 0.7), 0, Math.PI * 2);
  ctx.fillStyle = '#FFFF00';
  ctx.globalAlpha = Math.max(0, this.alpha * 0.5);
  ctx.fill();

  ctx.restore();
};

 
 
 
   
    
     
