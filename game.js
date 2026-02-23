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
 enemy_alien_red: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771177489342.webp' },

 // Enemy 2 - Mech Boss (used as regular enemy)
 enemy_mech_boss: { sx: 0, sy: 0, w: 96, h: 96, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771177571877.webp' },

 // Enemy 3 - Green Creature
 enemy_green_creature: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771177712172.webp' },

 // Enemy 4 - Blue Ship
 enemy_blue_ship: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771177719176.webp' },

   // Enemy 7
 enemy_new_1: { sx: 0, sy: 0, w: 64, h: 64, frames: 1, file: 'images/Remove_background_to_create_transparent_PNG-1771178629872.webp' },

    // ===== CLOUDS (πάντα πίσω από τους εχθρούς) =====
  cloud_majestic: { sx:0, sy:0, w:520, h:310, frames:1, file:'images/cloud_majestic_colorful.webp' },
 cloud_storm: { sx:0, sy:0, w:560, h:330, frames:1, file:'images/cloud_storm_dramatic.webp' },

 // ===== BACKGROUND OBJECTS (πλανήτες, αστεροειδείς, αστέρια, motherships) - ΜΕΓΑΛΑ! =====
 // Planets (BIG!)
 bg_planet_1: { sx: 0, sy: 0, w: 300, h: 300, frames: 1, file: 'images/remove_background_keep_planet_only_with_transpare-1771437623912.webp' },
 bg_planet_2: { sx: 0, sy: 0, w: 350, h: 350, frames: 1, file: 'images/remove_background_keep_planet_only_with_transpare-1771437627114.webp' },
 bg_planet_3: { sx: 0, sy: 0, w: 280, h: 280, frames: 1, file: 'images/remove_background_keep_planet_only_with_transpare-1771437632686.webp' },
 bg_planet_4: { sx: 0, sy: 0, w: 320, h: 320, frames: 1, file: 'images/remove_background_keep_planet_only_with_transpare-1771437636117.webp' },
 bg_planet_5: { sx: 0, sy: 0, w: 250, h: 250, frames: 1, file: 'images/remove_background_keep_planet_only_with_transpare-1771437640044.webp' },
 
 // Asteroids (BIG!)
 bg_asteroid_1: { sx: 0, sy: 0, w: 180, h: 150, frames: 1, file: 'images/remove_background_keep_asteroid_only_with_transpa-1771437878608.webp' },
 bg_asteroid_2: { sx: 0, sy: 0, w: 200, h: 160, frames: 1, file: 'images/remove_background_keep_asteroid_only_with_transpa-1771437889459.webp' },
 bg_asteroid_3: { sx: 0, sy: 0, w: 160, h: 130, frames: 1, file: 'images/remove_background_keep_asteroid_only_with_transpa-1771437893911.webp' },
 bg_asteroid_4: { sx: 0, sy: 0, w: 190, h: 145, frames: 1, file: 'images/remove_background_keep_asteroid_only_with_transpa-1771437899883.webp' },
 bg_asteroid_5: { sx: 0, sy: 0, w: 220, h: 175, frames: 1, file: 'images/remove_background_keep_asteroid_only_with_transpa-1771437906511.webp' },

 // Stars (BIG!)
 bg_star_1: { sx: 0, sy: 0, w: 120, h: 120, frames: 1, file: 'images/remove_background_keep_star_only_with_transparent-1771438014717.webp' },
 bg_star_2: { sx: 0, sy: 0, w: 100, h: 100, frames: 1, file: 'images/remove_background_keep_star_only_with_transparent-1771438021672.webp' },
 bg_star_3: { sx: 0, sy: 0, w: 140, h: 140, frames: 1, file: 'images/remove_background_keep_star_only_with_transparent-1771438025866.webp' },
 bg_star_4: { sx: 0, sy: 0, w: 150, h: 150, frames: 1, file: 'images/remove_background_keep_star_only_with_transparent-1771438033273.webp' },



// ===== ΔΙΑΣΤΗΜΙΚΟΙ ΣΤΑΘΜΟΙ (Space Stations) — background objects =====
bg_station_1: { sx:0, sy:0, w:420, h:300, frames:1, file:"images/Διαστημικοί σταθμοί/Hyper-realistic_3D_render_of_a_complete_space_stat-1771769861420.webp" },
bg_station_2: { sx:0, sy:0, w:420, h:300, frames:1, file:"images/Διαστημικοί σταθμοί/Hyper-realistic_3D_render_of_a_futuristic_space_st-1771769869573.webp" },
bg_station_3: { sx:0, sy:0, w:480, h:340, frames:1, file:"images/Διαστημικοί σταθμοί/Hyper-realistic_3D_render_of_a_massive_deep_space_-1771769882515.webp" },
bg_station_4: { sx:0, sy:0, w:450, h:320, frames:1, file:"images/Διαστημικοί σταθμοί/Hyper-realistic_3D_render_of_an_advanced_orbital_s-1771769875414.webp" },
bg_station_5: { sx:0, sy:0, w:500, h:300, frames:1, file:"images/Διαστημικοί σταθμοί/remove_background_keep_mothership_spacecraft_only-1771438322897.webp" },
bg_station_6: { sx:0, sy:0, w:480, h:290, frames:1, file:"images/Διαστημικοί σταθμοί/remove_background_keep_mothership_spacecraft_only-1771438334530.webp" },
bg_station_8: { sx:0, sy:0, w:380, h:280, frames:1, file:"images/Διαστημικοί σταθμοί/Remove_background-1771769620185.webp" },
bg_station_9: { sx:0, sy:0, w:400, h:300, frames:1, file:"images/Διαστημικοί σταθμοί/Remove_background-1771769677369.webp" },
bg_station_10:{ sx:0, sy:0, w:420, h:310, frames:1, file:"images/Διαστημικοί σταθμοί/Remove_background-1771769771101.webp" },
bg_station_11:{ sx:0, sy:0, w:400, h:295, frames:1, file:"images/Διαστημικοί σταθμοί/Remove_background-1771769775808.webp" },
bg_station_12:{ sx:0, sy:0, w:410, h:305, frames:1, file:"images/Διαστημικοί σταθμοί/Remove_background-1771769781630.webp" },
bg_station_13:{ sx:0, sy:0, w:390, h:285, frames:1, file:"images/Διαστημικοί σταθμοί/Remove_background-1771769786358.webp" },


// ===== NEA TERATA (New Monsters) =====
nea_t_1: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background_from_alien_creature_image-1771702224937.webp" },
nea_t_2: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background_from_alien_creature_image-1771702234467.webp" },
nea_t_3: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background_from_alien_creature_image-1771702241321.webp" },
nea_t_4: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background_from_alien_creature_image-1771702247261.webp" },
nea_t_5: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background_from_alien_creature_image-1771702251440.webp" },
nea_t_6: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background_from_alien_creature_image-1771702256740.webp" },
nea_t_7: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background_from_alien_creature_image-1771702268673.webp" },
nea_t_8: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background_from_alien_creature_image-1771702275505.webp" },
nea_t_9: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-17717689670902.webp" },
nea_t_10: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771768972441.webp" },
nea_t_11: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771768977965.webp" },
nea_t_12: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771768982481.webp" },
nea_t_13: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771768987505.webp" },
nea_t_14: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771768993659.webp" },
nea_t_15: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771768999233.webp" },
nea_t_16: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769004255.webp" },
nea_t_17: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769010023.webp" },
nea_t_18: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769015384.webp" },
nea_t_19: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769020204.webp" },
nea_t_20: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769024087.webp" },
nea_t_21: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769032864.webp" },
nea_t_22: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769039368.webp" },
nea_t_23: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769044446.webp" },
nea_t_24: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769049247.webp" },
nea_t_25: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769054640.webp" },
nea_t_26: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769061205.webp" },
nea_t_27: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769067487.webp" },
nea_t_28: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769074427.webp" },
nea_t_29: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769080583.webp" },
nea_t_30: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769091390.webp" },
nea_t_31: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769097241.webp" },
nea_t_32: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771769103073.webp" },

// ===== EXTHOS E (New Exthos Group) =====
exthos_e_1: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/A_nightmarish_fuzzy_alien_based_on_a_cockroach-dra-1771750293849.webp" },
exthos_e_2: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background_completely-1771750378222.webp" },
exthos_e_3: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771768967090.webp" },
exthos_e_4: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771768972441.webp" },
exthos_e_5: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771768977965.webp" },
exthos_e_6: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771768982481.webp" },
exthos_e_7: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771768987505.webp" },
exthos_e_8: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771768993659.webp" },
exthos_e_9: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771768999233.webp" },
exthos_e_10: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769004255.webp" },
exthos_e_11: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769010023.webp" },
exthos_e_12: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769015384.webp" },
exthos_e_13: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769020204.webp" },
exthos_e_14: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769024087.webp" },
exthos_e_15: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769032864.webp" },
exthos_e_16: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769039368.webp" },
exthos_e_17: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769044446.webp" },
exthos_e_18: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769049247.webp" },
exthos_e_19: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769054640.webp" },
exthos_e_20: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769061205.webp" },
exthos_e_21: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769067487.webp" },
exthos_e_22: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769074427.webp" },
exthos_e_23: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769080583.webp" },
exthos_e_24: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769091390.webp" },
exthos_e_25: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769097241.webp" },
exthos_e_26: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/exthos/Remove_background-1771769103073.webp" },

// ===== SKOURES (Background Objects) =====
skoura_s_1: { sx:0, sy:0, w:128, h:128, frames:1, file:"images/skoures/Remove_background-1771770047551.webp" },
skoura_s_2: { sx:0, sy:0, w:128, h:128, frames:1, file:"images/skoures/Remove_background-1771770053614.webp" },
skoura_s_3: { sx:0, sy:0, w:128, h:128, frames:1, file:"images/skoures/Remove_background-1771770058824.webp" },

// ===== MAVRIS TRIBES (Background Objects) =====
tribe_s_1: { sx:0, sy:0, w:128, h:128, frames:1, file:"images/Mavris Tribes/Remove_background-1771770063733.webp" },
tribe_s_2: { sx:0, sy:0, w:128, h:128, frames:1, file:"images/Mavris Tribes/Remove_background-1771770070431.webp" },

 // ===== POWER-UP COINS =====
 coin_S: { sx:0, sy:0, w:69, h:69, frames:1, file:'images/Coins/remove_background-1771600438768.webp' },
 coin_W: { sx:0, sy:0, w:109, h:109, frames:1, file:'images/Coins/remove_background-1771600608156.webp' },
 coin_P: { sx:0, sy:0, w:73, h:73, frames:1, file:'images/Coins/remove_background-1771600613274.webp' },
 coin_L: { sx:0, sy:0, w:66, h:66, frames:1, file:'images/Coins/remove_background-1771600617526.webp' },
 coin_B: { sx:0, sy:0, w:68, h:68, frames:1, file:'images/Coins/remove_background-1771600621492.webp' },
 coin_R: { sx:0, sy:0, w:73, h:73, frames:1, file:'images/Coins/remove_background-1771600692925.webp' },
 coin_X: { sx:0, sy:0, w:66, h:66, frames:1, file:'images/Coins/remove_background-1771600698927.webp' },
 coin_I: { sx:0, sy:0, w:69, h:69, frames:1, file:'images/Coins/remove_background-1771600703296.webp' },
 coin_T: { sx:0, sy:0, w:66, h:66, frames:1, file:'images/Coins/remove_background-1771600712696.webp' },
 coin_M: { sx:0, sy:0, w:86, h:86, frames:1, file:'images/Coins/remove_background-1771600717914.webp' },
 coin_G: { sx:0, sy:0, w:75, h:75, frames:1, file:'images/Coins/remove_background-1771600724644.webp' },

 // ===== PLAYER SHIPS (nea skafi) — 19 selectable ships =====
 player_ship_1:  { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787185583.webp" },
 player_ship_2:  { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787188920.webp" },
 player_ship_3:  { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787196305.webp" },
 player_ship_4:  { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787201537.webp" },
 player_ship_5:  { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787313418.webp" },
 player_ship_6:  { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787317172.webp" },
 player_ship_7:  { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787321846.webp" },
 player_ship_8:  { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787325429.webp" },
 player_ship_9:  { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787417173.webp" },
 player_ship_10: { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787430255.webp" },
 player_ship_11: { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787434966.webp" },
 player_ship_12: { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787533851.webp" },
 player_ship_13: { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787538038.webp" },
 player_ship_14: { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787545875.webp" },
 player_ship_15: { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787556992.webp" },
 player_ship_16: { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787647953.webp" },
 player_ship_17: { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787658827.webp" },
 player_ship_18: { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787745332.webp" },
 player_ship_19: { sx:0, sy:0, w:40, h:40, frames:1, file:"images/\u03a4\u03bf \u03b4\u03b9\u03ba\u03cc \u03bc\u03bf\u03c5 \u03c3\u03ba\u03ac\u03c6\u03bf\u03c2/nea skafi/Remove_background-1771787746949.webp" },

 // ===== ALIEN BUG BOSSES (nees 1) =====
 alien_boss_ant:         { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_ant_7_nobg.webp" },
 alien_boss_beetle:      { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_beetle_2_nobg.webp" },
 alien_boss_butterfly:   { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_butterfly_15_nobg.webp" },
 alien_boss_centipede:   { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_centipede_6_nobg.webp" },
 alien_boss_cicada:      { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_cicada_21_nobg.webp" },
 alien_boss_cockroach:   { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_cockroach_1_nobg.webp" },
 alien_boss_cricket:     { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_cricket_20_nobg.webp" },
 alien_boss_dragonfly:   { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_dragonfly_11_nobg.webp" },
 alien_boss_firefly:     { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_firefly_13_nobg.webp" },
 alien_boss_flea:        { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_flea_22_nobg.webp" },
 alien_boss_grasshopper: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_grasshopper_14_nobg.webp" },
 alien_boss_ladybug:     { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_ladybug_12_nobg.webp" },
 alien_boss_leafhopper:  { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_leafhopper_18_nobg.webp" },
 alien_boss_locust:      { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_locust_8_nobg.webp" },
 alien_boss_mantis:      { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_mantis_3_nobg.webp" },
 alien_boss_moth:        { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_moth_10_nobg.webp" },
 alien_boss_scorpion:    { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_scorpion_9_nobg.webp" },
 alien_boss_spider:      { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_spider_4_nobg.webp" },
 alien_boss_stinkbug:    { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_stinkbug_16_nobg.webp" },
 alien_boss_termite:     { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_termite_19_nobg.webp" },
 alien_boss_wasp:        { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 1/alien_wasp_5_nobg.webp" },

 // ===== NEES 1 — small (64x64) for grid/regular enemies =====
 alien_s_ant:         { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_ant_7_nobg.webp" },
 alien_s_beetle:      { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_beetle_2_nobg.webp" },
 alien_s_butterfly:   { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_butterfly_15_nobg.webp" },
 alien_s_centipede:   { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_centipede_6_nobg.webp" },
 alien_s_cicada:      { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_cicada_21_nobg.webp" },
 alien_s_cockroach:   { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_cockroach_1_nobg.webp" },
 alien_s_cricket:     { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_cricket_20_nobg.webp" },
 alien_s_dragonfly:   { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_dragonfly_11_nobg.webp" },
 alien_s_firefly:     { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_firefly_13_nobg.webp" },
 alien_s_flea:        { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_flea_22_nobg.webp" },
 alien_s_grasshopper: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_grasshopper_14_nobg.webp" },
 alien_s_ladybug:     { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_ladybug_12_nobg.webp" },
 alien_s_leafhopper:  { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_leafhopper_18_nobg.webp" },
 alien_s_locust:      { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_locust_8_nobg.webp" },
 alien_s_mantis:      { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_mantis_3_nobg.webp" },
 alien_s_moth:        { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_moth_10_nobg.webp" },
 alien_s_scorpion:    { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_scorpion_9_nobg.webp" },
 alien_s_spider:      { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_spider_4_nobg.webp" },
 alien_s_stinkbug:    { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_stinkbug_16_nobg.webp" },
 alien_s_termite:     { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_termite_19_nobg.webp" },
 alien_s_wasp:        { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_wasp_5_nobg.webp" },
 alien_s_firefly2:    { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 1/alien_firefly_13_nobg.webp" },

 // ===== NEES 2 — alien creatures (64x64) =====
 alien_n2_01: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515477303.webp" },
 alien_n2_02: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515561638.webp" },
 alien_n2_03: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515726838.webp" },
 alien_n2_04: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515732857.webp" },
 alien_n2_05: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515742407.webp" },
 alien_n2_06: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515881898.webp" },
 alien_n2_07: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515888267.webp" },
 alien_n2_08: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515893532.webp" },
 alien_n2_09: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515899316.webp" },
 alien_n2_10: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516048250.webp" },
 alien_n2_11: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516060084.webp" },
 alien_n2_12: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516069565.webp" },
 alien_n2_13: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516069830.webp" },
 alien_n2_14: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516075540.webp" },
 alien_n2_15: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516085105.webp" },
 alien_n2_16: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516103301.webp" },
 alien_n2_17: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516115609.webp" },
 alien_n2_18: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516131361.webp" },
 alien_n2_19: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516924585.webp" },
 alien_n2_20: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516931553.webp" },
 alien_n2_21: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516937872.webp" },
 alien_n2_22: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516960187.webp" },

 // ===== NEES 2 — cicada (transparent, regular + boss) =====
 alien_n2_23:          { sx:0, sy:0, w:64,  h:64,  frames:1, file:"images/nees 2/alien_cicada_21_nobg.webp" },
 alien_boss_n2_cicada: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 2/alien_cicada_21_nobg.webp" },

 // ===== NEES 2 — new bosses (black background — use screen blend) =====
 alien_boss_n2_cockroach: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 2/2024546116439117824.webp", blackBg:true },
 alien_boss_n2_beetle:    { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 2/2024546429485191168.webp", blackBg:true },

  // ===== ALIEN FACE ENEMIES =====
 aface_crystal:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Alien face/remove_background-1771598573412.webp' },
 aface_horns:    { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Alien face/remove_background-1771598610980.webp' },
 aface_pink:     { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Alien face/remove_background-1771598625765.webp' },
 aface_green:    { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Alien face/remove_background-1771598631298.webp' },
 aface_demon:    { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Alien face/remove_background-1771598636445.webp' },
 aface_crystal2: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Alien face/remove_background-1771598641047.webp' },
 aface_lava:     { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Alien face/remove_background-1771598645497.webp' },
 aface_coral:    { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Alien face/remove_background-1771598798924.webp' },
 aface_neon:     { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Alien face/remove_background-1771598816894.webp' },
 aface_classic:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Alien face/remove_background-1771598827145.webp' },

 // ===== ΠΕΤΑΛΟΥΔΕΣ (Butterflies) =====
 butterfly_1: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Πεταλούδες/Remove_background_from_butterfly_image-1771656582081.webp' },
 butterfly_2: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Πεταλούδες/Remove_background_from_butterfly_image-1771656588062.webp' },
 butterfly_3: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Πεταλούδες/Remove_background_from_butterfly_image-1771656598750.webp' },
 butterfly_4: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Πεταλούδες/Remove_background_from_butterfly_image-1771656605271.webp' },
 butterfly_5: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Πεταλούδες/Remove_background_from_butterfly_image-1771656611176.webp' },
 butterfly_6: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Πεταλούδες/Remove_background_from_butterfly_image-1771656616618.webp' },
 butterfly_7: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Πεταλούδες/Remove_background_from_butterfly_image-1771656623747.webp' },
 butterfly_8: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Πεταλούδες/Remove_background_from_butterfly_image-1771656630082.webp' },

 // ===== ΣΚΑΡΘΑΡΙΑ (Beetles) =====
 beetle_s_1: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Σκαρθάρια/Remove_background_from_beetle_image-1771656910678.webp' },
 beetle_s_2: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Σκαρθάρια/Remove_background_from_beetle_image-1771656917418.webp' },
 beetle_s_3: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Σκαρθάρια/Remove_background_from_beetle_image-1771656926386.webp' },
 beetle_s_4: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Σκαρθάρια/Remove_background_from_beetle_image-1771656932569.webp' },
 beetle_s_5: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Σκαρθάρια/Remove_background_from_beetle_image-1771656936753.webp' },
 beetle_s_6: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Σκαρθάρια/Remove_background_from_beetle_image-1771656947168.webp' },
 beetle_s_7: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Σκαρθάρια/Remove_background_from_beetle_image-1771656953053.webp' },

 // ===== ARACHNES (Spiders) =====
 spider_s_1: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Arachnes/Remove_background_from_spider_image-1771657098077.webp' },
 spider_s_2: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Arachnes/Remove_background_from_spider_image-1771657103844.webp' },
 spider_s_3: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Arachnes/Remove_background_from_spider_image-1771657107512.webp' },
 spider_s_4: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Arachnes/Remove_background_from_spider_image-1771657112661.webp' },
 spider_s_5: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Arachnes/Remove_background_from_spider_image-1771657116692.webp' },
 spider_s_6: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Arachnes/Remove_background_from_spider_image-1771657122028.webp' },
 spider_s_7: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Arachnes/Remove_background_from_spider_image-1771657126445.webp' },
 spider_s_8: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Arachnes/Remove_background_from_spider_image-1771657131378.webp' },

 // ===== NICTRIDES (Bats) =====
 bat_s_1: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Nictrides/Remove_background_from_bat_image-1771657267986.webp' },
 bat_s_2: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Nictrides/Remove_background_from_bat_image-1771657272453.webp' },
 bat_s_3: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Nictrides/Remove_background_from_bat_image-1771657276921.webp' },

 // ===== ΧΑΜΑΙΛΕΟΝΤΕΣ (Chameleons) =====
 chameleon_s_1: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Χαμαιλέοντες/Remove_background_from_chameleon_image-1771657337115.webp' },
 chameleon_s_2: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Χαμαιλέοντες/Remove_background_from_chameleon_image-1771657343507.webp' },
 chameleon_s_3: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Χαμαιλέοντες/Remove_background_from_chameleon_image-1771657347191.webp' },
 chameleon_s_4: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Χαμαιλέοντες/Remove_background_from_chameleon_image-1771657352275.webp' },

 // ===== ΠΑΡΑΞΕΝΑ ΝΕΑ ΖΩΑ (Strange alien creatures) =====
 strange_s_1:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771657626185.webp' },
 strange_s_2:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663479294.webp' },
 strange_s_3:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663483611.webp' },
 strange_s_4:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663487727.webp' },
 strange_s_5:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663492248.webp' },
 strange_s_6:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663495933.webp' },
 strange_s_7:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663499345.webp' },
 strange_s_8:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663506729.webp' },
 strange_s_9:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663510710.webp' },
 strange_s_10: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663515528.webp' },
 strange_s_11: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663519812.webp' },
 strange_s_12: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663524162.webp' },
 strange_s_13: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663527530.webp' },
 strange_s_14: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/Παράξενα νέα ζώα/Remove_background_from_alien_creature_image-1771663531217.webp' },

 // ===== ΛΙΟΝΤΑΡΙΑ (Lions) =====
lion_s_1:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/liontaria/Remove_background_from_alien_lion_creature_image-1771702906622.webp' },
lion_s_2:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/liontaria/Remove_background_from_alien_lion_creature_image-1771702911456.webp' },
lion_s_3:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/liontaria/Remove_background_from_alien_lion_creature_image-1771702914479.webp' },
lion_s_4:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/liontaria/Remove_background_from_alien_lion_creature_image-1771702918957.webp' },
lion_s_5:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/liontaria/Remove_background_from_alien_lion_creature_image-1771702922450.webp' },
lion_s_6:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/liontaria/Remove_background_from_alien_lion_creature_image-1771702927246.webp' },
lion_s_7:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/liontaria/Remove_background_from_alien_lion_creature_image-1771702931608.webp' },
lion_s_8:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/liontaria/Remove_background_from_alien_lion_creature_image-1771702937325.webp' },
lion_s_9:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/liontaria/Remove_background_from_alien_lion_creature_image-1771702980159.webp' },
lion_s_10: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/liontaria/Remove_background_from_alien_lion_creature_image-1771702987178.webp' },

// ===== ΜΕΛΙΣΣΕΣ (Bees) =====
bee_s_1:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/melises/Remove_background_from_alien_bee_creature_image-1771703405863.webp' },
bee_s_2:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/melises/Remove_background_from_alien_bee_creature_image-1771703410953.webp' },
bee_s_3:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/melises/Remove_background_from_alien_bee_creature_image-1771703644268.webp' },
bee_s_4:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/melises/Remove_background_from_alien_bee_creature_image-1771703651363.webp' },
bee_s_5:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/melises/Remove_background_from_alien_bee_creature_image-1771703655430.webp' },
bee_s_6:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/melises/Remove_background_from_alien_bee_creature_image-1771703661686.webp' },
bee_s_7:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/melises/Remove_background_from_alien_bee_creature_image-1771703682031.webp' },
bee_s_8:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/melises/Remove_background_from_alien_bee_creature_image-1771703688784.webp' },
bee_s_9:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/melises/Remove_background_from_alien_bee_creature_image-1771703693929.webp' },
bee_s_10: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/melises/Remove_background_from_alien_bee_creature_image-1771703698915.webp' },

// ===== ΝΕΑ ΤΕΡΑΤΑ (New monsters) =====
monster_s_1: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea terata/Remove_background_from_alien_creature_image-1771702224937.webp' },
monster_s_2: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea terata/Remove_background_from_alien_creature_image-1771702234467.webp' },
monster_s_3: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea terata/Remove_background_from_alien_creature_image-1771702241321.webp' },
monster_s_4: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea terata/Remove_background_from_alien_creature_image-1771702247261.webp' },
monster_s_5: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea terata/Remove_background_from_alien_creature_image-1771702251440.webp' },
monster_s_6: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea terata/Remove_background_from_alien_creature_image-1771702256740.webp' },
monster_s_7: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea terata/Remove_background_from_alien_creature_image-1771702268673.webp' },
monster_s_8: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea terata/Remove_background_from_alien_creature_image-1771702275505.webp' },

// ===== ΓΕΡΑΚΙΑ (Hawks/Birds) =====
hawk_s_1:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_hawk_creature_image-1771703910626.webp' },
hawk_s_2:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_hawk_creature_image-1771703916379.webp' },
hawk_s_3:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_hawk_creature_image-1771703920893.webp' },
hawk_s_4:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_hawk_creature_image-1771703927860.webp' },
hawk_s_5:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_hawk_creature_image-1771703933894.webp' },
hawk_s_6:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_hawk_creature_image-1771703938150.webp' },
hawk_s_7:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_hawk_creature_image-1771703947810.webp' },
hawk_s_8:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_bird_creature_image-1771704290979.webp' },
hawk_s_9:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_bird_creature_image-1771704295764.webp' },
hawk_s_10: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_bird_creature_image-1771704300450.webp' },
hawk_s_11: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_bird_creature_image-1771704306967.webp' },
hawk_s_12: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_bird_creature_image-1771704308580.webp' },
hawk_s_13: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_bird_creature_image-1771704313370.webp' },
hawk_s_14: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_bird_creature_image-1771704319768.webp' },
hawk_s_15: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_bird_creature_image-1771704325347.webp' },
hawk_s_16: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_bird_creature_image-1771704331864.webp' },
hawk_s_17: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/kerakia/Remove_background_from_alien_bird_creature_image-1771704335547.webp' },

// ===== ΕΧΘΡΟΙ / EXTHOS — Group A (20 sprites) =====
exthos_a_1:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771729825132.webp' },
exthos_a_2:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771729834969.webp' },
exthos_a_3:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771729853752.webp' },
exthos_a_4:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771729854356.webp' },
exthos_a_5:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730045525.webp' },
exthos_a_6:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730052225.webp' },
exthos_a_7:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730063015.webp' },
exthos_a_8:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730063157.webp' },
exthos_a_9:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730068961.webp' },
exthos_a_10: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730084487.webp' },
exthos_a_11: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730089984.webp' },
exthos_a_12: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730096043.webp' },
exthos_a_13: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730107500.webp' },
exthos_a_14: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730107685.webp' },
exthos_a_15: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730291311.webp' },
exthos_a_16: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730297058.webp' },
exthos_a_17: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730302850.webp' },
exthos_a_18: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730310795.webp' },
exthos_a_19: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730315927 - Copy - Copy.webp' },
exthos_a_20: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771730321945 - Copy - Copy.webp' },

// ===== ΕΧΘΡΟΙ / EXTHOS — Group B (27 sprites) =====
exthos_b_1:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771728954165.webp' },
exthos_b_2:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729056345.webp' },
exthos_b_3:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729065793.webp' },
exthos_b_4:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729073731.webp' },
exthos_b_5:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729081716.webp' },
exthos_b_6:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729106981.webp' },
exthos_b_7:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729117673.webp' },
exthos_b_8:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729256664.webp' },
exthos_b_9:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729265420.webp' },
exthos_b_10: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729276331.webp' },
exthos_b_11: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729291383.webp' },
exthos_b_12: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729298275.webp' },
exthos_b_13: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729299966.webp' },
exthos_b_14: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729308760.webp' },
exthos_b_15: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729331374.webp' },
exthos_b_16: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729338277.webp' },
exthos_b_17: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729342158.webp' },
exthos_b_18: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729478049.webp' },
exthos_b_19: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729485977.webp' },
exthos_b_20: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729491325.webp' },
exthos_b_21: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729520016.webp' },
exthos_b_22: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729527344.webp' },
exthos_b_23: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729534917.webp' },
exthos_b_24: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729716693.webp' },
exthos_b_25: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729722176.webp' },
exthos_b_26: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729727396.webp' },
exthos_b_27: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_keep_only_the_alien_creature_is-1771729732398.webp' },

// ===== ΕΧΘΡΟΙ / EXTHOS — Group C (16 sprites — new shapes incl. two-headed) =====
exthos_c_1:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771749902157.webp' },
exthos_c_2:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771749908208.webp' },
exthos_c_3:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771749912327.webp' },
exthos_c_4:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771749917714.webp' },
exthos_c_5:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771750335524.webp' },
exthos_c_6:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771750339755.webp' },
exthos_c_7:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771750344637.webp' },
exthos_c_8:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771750348341.webp' },
exthos_c_9:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_keep_only_the_alien_-1771750353059.webp' },
exthos_c_10: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely-1771750363041.webp' },
exthos_c_11: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely-1771750367126.webp' },
exthos_c_12: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely-1771750374949.webp' },
exthos_c_13: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely-1771750382511.webp' },
exthos_c_14: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely-1771750387774.webp' },
exthos_c_15: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/A_nightmarish_alien_with_two_heads_side-by-side_in-1771750286615.webp' },
exthos_c_16: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/A_terrifying_alien_with_two_heads_side-by-side_ins-1771750311641.webp' },

// ===== ΕΧΘΡΟΙ / EXTHOS — Group D (26 sprites — dark horde) =====
exthos_d_1:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750393811.webp' },
exthos_d_2:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750398041.webp' },
exthos_d_3:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750404110.webp' },
exthos_d_4:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750408454.webp' },
exthos_d_5:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750412794.webp' },
exthos_d_6:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750417331.webp' },
exthos_d_7:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750422322.webp' },
exthos_d_8:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750427382.webp' },
exthos_d_9:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750432388.webp' },
exthos_d_10: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750437050.webp' },
exthos_d_11: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750442114.webp' },
exthos_d_12: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750448480.webp' },
exthos_d_13: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750451395.webp' },
exthos_d_14: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750458515.webp' },
exthos_d_15: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750463117.webp' },
exthos_d_16: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750466929.webp' },
exthos_d_17: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750472062.webp' },
exthos_d_18: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750475647.webp' },
exthos_d_19: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750480482.webp' },
exthos_d_20: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750484911.webp' },
exthos_d_21: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750489537.webp' },
exthos_d_22: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750494103.webp' },
exthos_d_23: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750498621.webp' },
exthos_d_24: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750504791.webp' },
exthos_d_25: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750507797.webp' },
exthos_d_26: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771750513535.webp' },

// ===== ΕΧΘΡΟΙ F (new wave — 22 sprites) =====
exthos_f_1:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811601239.webp' },
exthos_f_2:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811607781.webp' },
exthos_f_3:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811613929.webp' },
exthos_f_4:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811618576.webp' },
exthos_f_5:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811623446.webp' },
exthos_f_6:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811628145.webp' },
exthos_f_7:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811633834.webp' },
exthos_f_8:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811637466.webp' },
exthos_f_9:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811644020.webp' },
exthos_f_10: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811649407.webp' },
exthos_f_11: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811672560.webp' },
exthos_f_12: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811760404.webp' },
exthos_f_13: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811766601.webp' },
exthos_f_14: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811783964.webp' },
exthos_f_15: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811784664.webp' },
exthos_f_16: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811789747.webp' },
exthos_f_17: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811795234.webp' },
exthos_f_18: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811800385.webp' },
exthos_f_19: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811805621.webp' },
exthos_f_20: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811810974.webp' },
exthos_f_21: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811818384.webp' },
exthos_f_22: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background_completely_make_100_transparen-1771811826498.webp' },

// ===== SPACE MAN (background objects — NOT enemies) =====
 spaceman_1: { sx:0, sy:0, w:140, h:140, frames:1, file:'images/space man/envato-labs-image-edit.webp' },
 spaceman_2: { sx:0, sy:0, w:140, h:140, frames:1, file:'images/space man/envato-labs-image-edit (1).webp' },
 spaceman_3: { sx:0, sy:0, w:140, h:140, frames:1, file:'images/space man/envato-labs-image-edit (2).webp' },
 spaceman_4: { sx:0, sy:0, w:140, h:140, frames:1, file:'images/space man/envato-labs-image-edit (3).webp' },
 spaceman_5: { sx:0, sy:0, w:140, h:140, frames:1, file:'images/space man/envato-labs-image-edit (4).webp' },
 spaceman_6: { sx:0, sy:0, w:140, h:140, frames:1, file:'images/space man/envato-labs-image-edit (5).webp' }
};

// ===================================================================
// ALIEN SPRITE POOL — 44 sprites from nees 1 + nees 2
// Sliding window: every level introduces 2 new aliens, phases out 2 old
// ===================================================================
var allAlienPool = [
  // === Levels 1-5 window (positions 0-9): pure nees 1 bugs ===
  'alien_s_ant','alien_s_beetle','alien_s_butterfly','alien_s_cicada',
  'alien_s_cockroach','alien_s_cricket','alien_s_dragonfly','alien_s_firefly',
  'alien_s_flea','alien_s_grasshopper',

  // === Level 6+ window (positions 10-29): 2 outside sprites per level, paired with nees ===
  'enemy_alien_red',     'alien_s_ladybug',       // level 6
  'enemy_mech_boss',     'alien_s_leafhopper',    // level 7
  'enemy_green_creature','alien_s_locust',         // level 8
  'enemy_blue_ship',     'alien_s_mantis',         // level 9
    'alien_s_moth',           // level 10
     'alien_s_scorpion',       // level 11
  'enemy_new_1',         'alien_s_spider',         // level 12
           'alien_s_stinkbug',       // level 13
           'alien_s_termite',        // level 14
           'alien_s_wasp',           // level 15

  // === Level 16+ window (positions 30-56): classic sprite sheet + nees 2 ===
  'enemy_purple',        'alien_s_firefly2',       // level 16
  'enemy_bee',           'alien_n2_01',            // level 17
  'enemy_ship',          'alien_n2_02',            // level 18
  'enemy_circle',        'alien_n2_03',            // level 19
  'alien_n2_04','alien_n2_05',                     // level 20
  'alien_n2_06','alien_n2_07',                     // level 21
  'alien_n2_08','alien_n2_09',                     // level 22
  'alien_n2_10','alien_n2_11',                     // level 23
  'alien_n2_12','alien_n2_13',                     // level 24
  'alien_n2_14','alien_n2_15',                     // level 25
  'alien_n2_16','alien_n2_17',                     // level 26
  'alien_n2_18','alien_n2_19',                     // level 27
  'alien_n2_20','alien_n2_21','alien_n2_22',        // level 28
  'alien_n2_23'                                     // level 29 (cicada — then cycles back)
];

// Active species pool for dedicated species stages (null = use allAlienPool)
var currentLevelPool = null;

// Pick one alien — uses species pool when in a species stage, else sliding window
function pickAlien(offset) {
  var pool = currentLevelPool || allAlienPool;
  if(currentLevelPool) {
    // Species stage: just pick randomly from the pool for variety
    return pool[Math.floor(Math.random() * pool.length)];
  }
  var base = ((currentLevel - 1) * 2) % pool.length;
  return pool[(base + (offset || 0)) % pool.length];
}

var enemies = {
  getScale: function() { return Game.width / 320; },

  // ===== SWOOP & LOOP (Galaga-style dive with circular loop) =====
  swoop_left: function() { return {
    x: Game.width * 0.2, y: -64, sprite: pickAlien(0), health: 10,
    movementType: 'swoop',
    swoopPhase: 0, // 0=dive, 1=loop, 2=exit
    swoopSpeed: 80 * this.getScale(),
    swoopDir: 1, // 1=curves right, -1=curves left
    loopRadius: 60 * this.getScale(),
    loopAngle: -Math.PI/2,
    missiles: 1, points: 80
  };},
  swoop_right: function() { return {
    x: Game.width * 0.8, y: -64, sprite: pickAlien(1), health: 10,
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
    x: Game.width * 0.3, y: -64, sprite: pickAlien(2), health: 10,
    movementType: 'figure8',
    fig8CenterX: Game.width * 0.3, fig8CenterY: Game.height * 0.35,
    fig8A: 120 * this.getScale(), fig8B: 80 * this.getScale(),
    fig8Speed: 0.8, fig8Drift: 8 * this.getScale(),
    missiles: 1, points: 100
  };},
  fig8_right: function() { return {
    x: Game.width * 0.7, y: -64, sprite: pickAlien(3), health: 10,
    movementType: 'figure8',
    fig8CenterX: Game.width * 0.7, fig8CenterY: Game.height * 0.35,
    fig8A: 120 * this.getScale(), fig8B: 80 * this.getScale(),
    fig8Speed: 0.8, fig8Drift: 8 * this.getScale(),
    missiles: 1, points: 100
  };},

  // ===== S-CURVE DESCENT (smooth S-shape while falling) =====
  scurve_left: function() { return {
    x: Game.width * 0.15, y: -64, sprite: pickAlien(4), health: 10,
    movementType: 'scurve',
    scurveAmplitude: 200 * this.getScale(),
    scurveFreq: 0.004 / this.getScale(),
    scurveSpeed: 55 * this.getScale(),
    scurveStartX: Game.width * 0.15,
    missiles: 1, points: 75
  };},
  scurve_right: function() { return {
    x: Game.width * 0.85, y: -64, sprite: pickAlien(5), health: 10,
    movementType: 'scurve',
    scurveAmplitude: -200 * this.getScale(),
    scurveFreq: 0.004 / this.getScale(),
    scurveSpeed: 55 * this.getScale(),
    scurveStartX: Game.width * 0.85,
    missiles: 1, points: 75
  };},

  // ===== CORKSCREW (spiral descent) =====
  cork_left: function() { return {
    x: Game.width * 0.25, y: -64, sprite: pickAlien(6), health: 10,
    movementType: 'corkscrew',
    corkCenterX: Game.width * 0.25, corkRadius: 80 * this.getScale(),
    corkSpeed: 2, corkFall: 35 * this.getScale(),
    points: 50
  };},
  cork_right: function() { return {
    x: Game.width * 0.75, y: -64, sprite: pickAlien(7), health: 10,
    movementType: 'corkscrew',
    corkCenterX: Game.width * 0.75, corkRadius: 80 * this.getScale(),
    corkSpeed: -2, corkFall: 35 * this.getScale(),
    points: 50
  };},

  // ===== PENDULUM (swing left-right while descending) =====
  pendulum: function() { return {
    x: Game.width * 0.5, y: -64, sprite: pickAlien(3), health: 10,
    movementType: 'pendulum',
    pendCenterX: Game.width * 0.5,
    pendAmplitude: 180 * this.getScale(),
    pendSpeed: 1.2, pendFall: 25 * this.getScale(),
    missiles: 1, points: 90
  };},

  // ===== BOOMERANG (comes in, U-turns, comes back from other side) =====
  boomerang_left: function() { return {
    x: -64, y: Game.height * 0.2, sprite: pickAlien(5), health: 10,
    movementType: 'boomerang',
    boomSpeed: 110 * this.getScale(), boomDir: 1,
    boomTurnY: Game.height * 0.6,
    boomPhase: 0, // 0=enter, 1=curve, 2=exit
    missiles: 1, points: 60
  };},
  boomerang_right: function() { return {
    x: Game.width + 64, y: Game.height * 0.2, sprite: pickAlien(6), health: 10,
    movementType: 'boomerang',
    boomSpeed: 110 * this.getScale(), boomDir: -1,
    boomTurnY: Game.height * 0.6,
    boomPhase: 0,
    missiles: 1, points: 60
  };},

  // ===== ZIGZAG (sharp zigzag descent) =====
  zigzag: function() { return {
    x: Game.width * 0.5, y: -64, sprite: pickAlien(7), health: 10,
    movementType: 'zigzag',
    zigSpeed: 65 * this.getScale(), zigWidth: 150 * this.getScale(),
    zigDir: 1, zigTimer: 0, zigInterval: 0.5,
    E: 30 * this.getScale(),
    missiles: 1, points: 85
  };},

  // ===== MOTHER SHIPS — alien bug bosses (nees 1) =====
  mother_small: function() {
    var pool = ['alien_boss_cockroach','alien_boss_ant','alien_boss_flea','alien_boss_ladybug','alien_boss_cricket','alien_boss_stinkbug','alien_boss_leafhopper','alien_boss_termite','alien_boss_n2_cockroach','alien_boss_n2_beetle'];
    var spr  = pool[Math.floor(Math.random() * pool.length)];
    return {
      x: Game.width * 0.3, y: -500, sprite: spr, health: 250,
      movementType: 'mothership',
      motherTargetY: 100, motherSpeed: 300,
      isMotherShip: true, spawnRate: 5, spawnType: 'cork_left', points: 500, missiles: 2
    };
  },
  mother_medium: function() {
    var pool = ['alien_boss_beetle','alien_boss_butterfly','alien_boss_grasshopper','alien_boss_moth','alien_boss_cicada','alien_boss_locust','alien_boss_n2_cicada'];
    var spr  = pool[Math.floor(Math.random() * pool.length)];
    return {
      x: Game.width * 0.3, y: -500, sprite: spr, health: 500,
      movementType: 'mothership',
      motherTargetY: 80, motherSpeed: 280,
      isMotherShip: true, spawnRate: 4, spawnType: 'swoop_left', points: 800, missiles: 3
    };
  },
  mother_large: function() {
    var pool = ['alien_boss_dragonfly','alien_boss_firefly','alien_boss_mantis','alien_boss_wasp','alien_boss_spider'];
    var spr  = pool[Math.floor(Math.random() * pool.length)];
    return {
      x: Game.width * 0.3, y: -500, sprite: spr, health: 850,
      movementType: 'mothership',
      motherTargetY: 70, motherSpeed: 250,
      isMotherShip: true, spawnRate: 3, spawnType: 'fig8_left', points: 1200, missiles: 4
    };
  },

  // FINAL BOSS — most fearsome alien bugs
  final_boss: function() {
    var pool = ['alien_boss_centipede','alien_boss_scorpion'];
    var spr  = pool[Math.floor(Math.random() * pool.length)];
    return {
      x: Game.width * 0.15, y: -500, sprite: spr, health: 2000,
      movementType: 'mothership',
      motherTargetY: 60, motherSpeed: 200,
      isBossShip: true, spawnRate: 4, spawnType: 'swoop_left', points: 3000, missiles: 6
    };
  }
};

// ===================================================================
// FORMATION SHAPES - επιστρέφει array από {col, row} θέσεις
// col/row μπορεί να είναι float για κεντράρισμα
// ===================================================================
function getFormationPositions(shape, rows, cols) {
  var p = [], r, c, count, start;

  if(shape === 'grid') {
    // Κανονικό ορθογώνιο πλέγμα
    for(r = 0; r < rows; r++)
      for(c = 0; c < cols; c++)
        p.push({col: c, row: r});

  } else if(shape === 'arrow') {
    // Τρίγωνο/βέλος με μύτη κάτω (προς τον παίκτη)
    for(r = 0; r < rows; r++) {
      count = Math.max(1, cols - r * 2);
      start = (cols - count) / 2.0;
      for(c = 0; c < count; c++)
        p.push({col: start + c, row: r});
    }

  } else if(shape === 'diamond') {
    // Διαμάντι — φαρδύ στη μέση, μύτη πάνω-κάτω
    var midR = (rows - 1) / 2.0;
    var halfC = (cols - 1) / 2.0;
    for(r = 0; r < rows; r++) {
      var spread = midR > 0
        ? Math.round(halfC * (1 - Math.abs(r - midR) / midR))
        : Math.round(halfC);
      for(c = Math.round(halfC - spread); c <= Math.round(halfC + spread); c++)
        p.push({col: c, row: r});
    }

  } else if(shape === 'three_clusters') {
    // 3 μικρές ορθογώνιες ομάδες δίπλα-δίπλα
    var clC = Math.max(2, Math.floor(cols / 4));
    var gap  = (cols - clC * 3) / 2.0;
    var clR  = Math.max(2, Math.floor(rows * 0.6));
    var rowOff = Math.floor((rows - clR) / 2);
    for(var g = 0; g < 3; g++) {
      var colOff = g * (clC + gap);
      for(r = 0; r < clR; r++)
        for(c = 0; c < clC; c++)
          p.push({col: colOff + c, row: rowOff + r});
    }

  } else if(shape === 'chevron') {
    // Κοίλο V — δύο διαγώνιες γραμμές που ενώνονται στο κέντρο-κάτω (πάχος 2)
    for(r = 0; r < rows; r++) {
      var lc = Math.min(r, Math.floor((cols - 1) / 2));
      var rc = Math.max(cols - 1 - r, Math.ceil((cols - 1) / 2));
      p.push({col: lc, row: r});
      if(rc !== lc) p.push({col: rc, row: r});
      if(lc + 1 <= rc - 1) {
        p.push({col: lc + 1, row: r});
        if(rc - 1 !== lc + 1) p.push({col: rc - 1, row: r});
      }
    }

  } else if(shape === 'cross') {
    // Σταυρός/+ — οριζόντια + κάθετη μπάρα που τέμνονται στο κέντρο
    var midR1 = Math.floor((rows - 1) / 2), midR2 = Math.ceil((rows - 1) / 2);
    var midC1 = Math.floor((cols - 1) / 2), midC2 = Math.ceil((cols - 1) / 2);
    for(r = 0; r < rows; r++)
      for(c = 0; c < cols; c++)
        if((r >= midR1 && r <= midR2) || (c >= midC1 && c <= midC2))
          p.push({col: c, row: r});

  } else if(shape === 'wings') {
    // Φτερά — δύο πυκνές ομάδες στα πλαϊνά, κενό κέντρο
    var wW = Math.max(2, Math.floor(cols / 3));
    for(r = 0; r < rows; r++) {
      for(c = 0; c < wW; c++)           p.push({col: c, row: r});
      for(c = cols - wW; c < cols; c++) p.push({col: c, row: r});
    }

  } else if(shape === 'hourglass') {
    // Κλεψύδρα — φαρδύ πάνω-κάτω, στενό στη μέση
    var hMid = (rows - 1) / 2.0;
    for(r = 0; r < rows; r++) {
      var t = hMid > 0 ? Math.abs(r - hMid) / hMid : 1;
      var indent = Math.round(((cols - 1) / 2) * (1 - t));
      for(c = indent; c <= cols - 1 - indent; c++)
        p.push({col: c, row: r});
    }

  } else if(shape === 'three_v') {
    // 3 μικρά V/chevron δίπλα-δίπλα
    var vSize = Math.max(3, Math.floor(cols / 4));
    var vGap  = (cols - vSize * 3) / 2.0;
    var vRows = Math.max(3, Math.floor(rows * 0.7));
    var vRowOff = Math.floor((rows - vRows) / 2);
    for(var vg = 0; vg < 3; vg++) {
      var vOff = vg * (vSize + vGap);
      for(r = 0; r < vRows; r++) {
        var vlc = Math.min(r, Math.floor((vSize - 1) / 2));
        var vrc = Math.max(vSize - 1 - r, Math.ceil((vSize - 1) / 2));
        p.push({col: vOff + vlc, row: vRowOff + r});
        if(vrc !== vlc) p.push({col: vOff + vrc, row: vRowOff + r});
      }
    }

  } else if(shape === 'three_cross') {
    // 3 μικροί σταυροί δίπλα-δίπλα
    var xSize = Math.max(3, Math.floor(cols / 4));
    var xGap  = (cols - xSize * 3) / 2.0;
    var xRows = Math.max(3, Math.floor(rows * 0.7));
    var xRowOff = Math.floor((rows - xRows) / 2);
    for(var xg = 0; xg < 3; xg++) {
      var xOff = xg * (xSize + xGap);
      var xmr = Math.floor((xRows - 1) / 2);
      var xmc = Math.floor((xSize - 1) / 2);
      for(r = 0; r < xRows; r++)
        for(c = 0; c < xSize; c++)
          if(r === xmr || c === xmc)
            p.push({col: xOff + c, row: xRowOff + r});
    }

  } else if(shape === 'asymmetric') {
    // Ασύμμετρο: 1 μεγάλη ομάδα αριστερά + 1 μικρή δεξιά (ή αντίστροφα)
    var flip = Math.random() < 0.5;
    var bigW = Math.max(3, Math.floor(cols * 0.55));
    var smW  = Math.max(2, Math.floor(cols * 0.30));
    var asGap = cols - bigW - smW;
    var bigRows = rows;
    var smRows  = Math.max(2, Math.floor(rows * 0.55));
    var smRowOff = Math.floor((rows - smRows) / 2);
    if(!flip) {
      for(r = 0; r < bigRows; r++) for(c = 0; c < bigW; c++) p.push({col: c, row: r});
      for(r = 0; r < smRows; r++)  for(c = 0; c < smW; c++)  p.push({col: bigW + asGap + c, row: smRowOff + r});
    } else {
      for(r = 0; r < smRows; r++)  for(c = 0; c < smW; c++)  p.push({col: c, row: smRowOff + r});
      for(r = 0; r < bigRows; r++) for(c = 0; c < bigW; c++) p.push({col: smW + asGap + c, row: r});
    }

  } else if(shape === 'v_flanked') {
    // V στο κέντρο + μικρή ομάδα αριστερά και δεξιά
    var vfFlank = Math.max(2, Math.floor(cols / 5));
    var vfMid   = cols - vfFlank * 2 - 2;            // πλάτος κεντρικού V
    var vfOff   = vfFlank + 1;                        // αρχή κεντρικού V
    var vfFR    = Math.max(2, Math.floor(rows * 0.5));
    var vfFRowOff = Math.floor((rows - vfFR) / 2);
    // Αριστερή ομάδα
    for(r = 0; r < vfFR; r++) for(c = 0; c < vfFlank; c++) p.push({col: c, row: vfFRowOff + r});
    // Δεξιά ομάδα
    for(r = 0; r < vfFR; r++) for(c = cols - vfFlank; c < cols; c++) p.push({col: c, row: vfFRowOff + r});
    // Κεντρικό V (μύτη κάτω)
    for(r = 0; r < rows; r++) {
      var vfc = Math.max(1, vfMid - r * 2);
      var vfStart = vfOff + (vfMid - vfc) / 2.0;
      for(c = 0; c < vfc; c++) p.push({col: vfStart + c, row: r});
    }

  } else if(shape === 'cross_flanked') {
    // Σταυρός στο κέντρο + μικρή ομάδα αριστερά και δεξιά
    var cfFlank = Math.max(2, Math.floor(cols / 5));
    var cfMid   = cols - cfFlank * 2 - 2;
    var cfOff   = cfFlank + 1;
    var cfFR    = Math.max(2, Math.floor(rows * 0.5));
    var cfFRowOff = Math.floor((rows - cfFR) / 2);
    // Αριστερή ομάδα
    for(r = 0; r < cfFR; r++) for(c = 0; c < cfFlank; c++) p.push({col: c, row: cfFRowOff + r});
    // Δεξιά ομάδα
    for(r = 0; r < cfFR; r++) for(c = cols - cfFlank; c < cols; c++) p.push({col: c, row: cfFRowOff + r});
    // Κεντρικός σταυρός
    var cfmr1 = Math.floor((rows - 1) / 2), cfmr2 = Math.ceil((rows - 1) / 2);
    var cfmc1 = Math.floor((cfMid - 1) / 2), cfmc2 = Math.ceil((cfMid - 1) / 2);
    for(r = 0; r < rows; r++)
      for(c = 0; c < cfMid; c++)
        if((r >= cfmr1 && r <= cfmr2) || (c >= cfmc1 && c <= cfmc2))
          p.push({col: cfOff + c, row: r});

  } else if(shape === 'pyramid') {
    // Πυραμίδα — μύτη πάνω, φαρδύ κάτω (αντίθετο του arrow)
    for(r = 0; r < rows; r++) {
      var pyW = Math.min(cols, 1 + r * 2);
      var pyStart = (cols - pyW) / 2.0;
      for(c = 0; c < pyW; c++) p.push({col: pyStart + c, row: r});
    }

  } else if(shape === 'frame') {
    // Κοίλο πλαίσιο — μόνο η περίμετρος
    for(r = 0; r < rows; r++)
      for(c = 0; c < cols; c++)
        if(r === 0 || r === rows - 1 || c === 0 || c === cols - 1)
          p.push({col: c, row: r});

  } else if(shape === 'comb') {
    // Χτένα — οριζόντια μπάρα πάνω + κάθετα δόντια κάτω
    for(c = 0; c < cols; c++) p.push({col: c, row: 0});
    var toothStep = Math.max(2, Math.floor(cols / 5));
    for(r = 1; r < rows; r++)
      for(c = 0; c < cols; c += toothStep) p.push({col: c, row: r});

  } else if(shape === 'double_v') {
    // Δύο V δίπλα-δίπλα, χωρισμένα στη μέση
    var dvHalf = Math.floor(cols / 2);
    for(var dvi = 0; dvi < 2; dvi++) {
      var dvOff = dvi * (dvHalf + (cols % 2 === 1 && dvi === 1 ? 1 : 0));
      var dvW   = dvHalf - 1;
      for(r = 0; r < rows; r++) {
        var dvlc = Math.min(r, Math.floor((dvW - 1) / 2));
        var dvrc = Math.max(dvW - 1 - r, Math.ceil((dvW - 1) / 2));
        p.push({col: dvOff + dvlc, row: r});
        if(dvrc !== dvlc) p.push({col: dvOff + dvrc, row: r});
      }
    }

  } else if(shape === 'zigzag_line') {
    // Ζίγκ-ζαγκ — διαγώνια γραμμή εχθρών που αλλάζει κατεύθυνση
    var period = Math.max(3, Math.floor(cols / 2));
    for(r = 0; r < rows; r++) {
      var phase = r % (period * 2);
      var zc = phase < period ? phase : (period * 2 - 1 - phase);
      var scaledC = Math.round(zc * (cols - 1) / (period - 1));
      p.push({col: Math.min(scaledC, cols - 1), row: r});
      // Πλάτος 2 για ορατότητα
      if(scaledC + 1 < cols) p.push({col: scaledC + 1, row: r});
    }

  } else if(shape === 'diamond_flanked') {
    // Διαμάντι στο κέντρο + δύο στήλες εχθρών αριστερά και δεξιά
    var dflank = Math.max(1, Math.floor(cols / 6));
    var dmidW  = cols - dflank * 2 - 2;
    var dmidOff = dflank + 1;
    var dfFR   = Math.max(2, Math.floor(rows * 0.5));
    var dfRowOff = Math.floor((rows - dfFR) / 2);
    for(r = 0; r < dfFR; r++) for(c = 0; c < dflank; c++)            p.push({col: c, row: dfRowOff + r});
    for(r = 0; r < dfFR; r++) for(c = cols - dflank; c < cols; c++) p.push({col: c, row: dfRowOff + r});
    var dmidR = (rows - 1) / 2.0, dmidC = (dmidW - 1) / 2.0;
    for(r = 0; r < rows; r++) {
      var dsp = dmidR > 0 ? Math.round(dmidC * (1 - Math.abs(r - dmidR) / dmidR)) : Math.round(dmidC);
      for(c = Math.round(dmidC - dsp); c <= Math.round(dmidC + dsp); c++)
        p.push({col: dmidOff + c, row: r});
    }

  } else if(shape === 'compass') {
    // Πυξίδα — 8 βραχίονες από το κέντρο (ρόδα ανέμου / αστερίσκος)
    var cpCR = Math.floor((rows - 1) / 2), cpCC = Math.floor((cols - 1) / 2);
    for(r = 0; r < rows; r++) p.push({col: cpCC, row: r});                      // κάθετος
    for(c = 0; c < cols; c++) p.push({col: c, row: cpCR});                      // οριζόντιος
    var cpLen = Math.min(cpCR, cpCC);
    for(var cpA = 1; cpA <= cpLen; cpA++) {
      if(cpCC + cpA < cols && cpCR - cpA >= 0)    p.push({col: cpCC + cpA, row: cpCR - cpA}); // NE
      if(cpCC - cpA >= 0   && cpCR - cpA >= 0)    p.push({col: cpCC - cpA, row: cpCR - cpA}); // NW
      if(cpCC + cpA < cols && cpCR + cpA < rows)   p.push({col: cpCC + cpA, row: cpCR + cpA}); // SE
      if(cpCC - cpA >= 0   && cpCR + cpA < rows)   p.push({col: cpCC - cpA, row: cpCR + cpA}); // SW
    }

  } else if(shape === 'L_shape') {
    // Γράμμα L — αριστερή στήλη (πλάτος 2) + κάτω γραμμή
    for(r = 0; r < rows; r++) { p.push({col: 0, row: r}); if(cols > 1) p.push({col: 1, row: r}); }
    for(c = 2; c < cols; c++) p.push({col: c, row: rows - 1});

  } else if(shape === 'T_shape') {
    // Γράμμα Τ — πάνω γραμμή + κεντρική στήλη (πλάτος 2)
    for(c = 0; c < cols; c++) p.push({col: c, row: 0});
    var tC = Math.floor((cols - 1) / 2);
    for(r = 1; r < rows; r++) {
      p.push({col: tC, row: r});
      if(tC + 1 < cols) p.push({col: tC + 1, row: r});
    }

  } else if(shape === 'snake_s') {
    // S-σχήμα — τρεις ζώνες: δεξί ήμισυ / πλήρης / αριστερό ήμισυ
    var ssH = Math.floor(rows / 3), ssH2 = ssH * 2, ssHalf = Math.floor(cols / 2);
    for(r = 0; r < rows; r++) {
      if(r < ssH)        { for(c = ssHalf; c < cols; c++) p.push({col: c, row: r}); }
      else if(r < ssH2)  { for(c = 0; c < cols; c++) p.push({col: c, row: r}); }
      else               { for(c = 0; c < ssHalf; c++) p.push({col: c, row: r}); }
    }

  } else if(shape === 'ring') {
    // Δακτύλιος/έλλειψη — μόνο η περίμετρος
    var rCx = (cols - 1) / 2.0, rCy = (rows - 1) / 2.0;
    var rA  = Math.max(1, (cols - 1) / 2.0 - 0.3), rB = Math.max(1, (rows - 1) / 2.0 - 0.3);
    for(r = 0; r < rows; r++) for(c = 0; c < cols; c++) {
      var rd = Math.sqrt(Math.pow((c - rCx) / rA, 2) + Math.pow((r - rCy) / rB, 2));
      if(rd >= 0.72 && rd <= 1.15) p.push({col: c, row: r});
    }

  } else if(shape === 'two_diamonds') {
    // Δύο διαμάντια δίπλα-δίπλα
    var td1W = Math.max(3, Math.floor(cols * 0.44)), td2Off = Math.ceil(cols * 0.54);
    var td2W = cols - td2Off, tdMidRR = (rows - 1) / 2.0;
    for(r = 0; r < rows; r++) {
      var tdS1 = tdMidRR > 0 ? Math.round((td1W - 1) / 2 * (1 - Math.abs(r - tdMidRR) / tdMidRR)) : 0;
      var tdM1 = (td1W - 1) / 2;
      for(c = Math.round(tdM1 - tdS1); c <= Math.round(tdM1 + tdS1); c++) p.push({col: c, row: r});
      if(td2W > 2) {
        var tdS2 = tdMidRR > 0 ? Math.round((td2W - 1) / 2 * (1 - Math.abs(r - tdMidRR) / tdMidRR)) : 0;
        var tdM2 = (td2W - 1) / 2;
        for(c = Math.round(tdM2 - tdS2); c <= Math.round(tdM2 + tdS2); c++) p.push({col: td2Off + c, row: r});
      }
    }

  } else if(shape === 'staggered') {
    // Πλινθοδομή — γραμμές με εναλλακτικό offset (αραιό πλέγμα)
    for(r = 0; r < rows; r++) {
      var stOff = (r % 2 === 0) ? 0 : 1;
      for(c = stOff; c < cols; c += 2) p.push({col: c, row: r});
    }

  } else if(shape === 'sword') {
    // Σπαθί — στενή λεπίδα πάνω + φαρδιά λαβή κάτω
    var swC = Math.floor((cols - 1) / 2), swGuard = Math.min(2, rows - 1);
    for(r = 0; r < rows - swGuard; r++) {
      p.push({col: swC, row: r});
      if(swC + 1 < cols) p.push({col: swC + 1, row: r});
    }
    for(r = rows - swGuard; r < rows; r++)
      for(c = Math.max(0, swC - 2); c <= Math.min(cols - 1, swC + 3); c++) p.push({col: c, row: r});

  } else if(shape === 'trident') {
    // Τρίαινα — 3 κάθετες λόγχες + οριζόντιος κορμός κάτω
    var trW = Math.max(1, Math.floor(cols / 6));
    var tr1 = 0, tr2 = Math.floor((cols - trW) / 2), tr3 = cols - trW;
    var trBR = Math.floor(rows * 0.65);
    for(r = 0; r < trBR; r++) {
      for(c = tr1; c < tr1 + trW; c++) p.push({col: c, row: r});
      for(c = tr2; c < tr2 + trW; c++) p.push({col: c, row: r});
      for(c = tr3; c < Math.min(cols, tr3 + trW); c++) p.push({col: c, row: r});
    }
    for(r = trBR; r < rows; r++) for(c = 0; c < cols; c++) p.push({col: c, row: r});

  } else if(shape === 'wave') {
    // Κύμα — ημιτονοειδής καμπύλη πλάτους 2
    for(r = 0; r < rows; r++) {
      var wc = Math.round((cols - 1) / 2 * (1 + Math.sin(r * Math.PI * 2.5 / Math.max(4, rows))));
      wc = Math.max(0, Math.min(cols - 1, wc));
      p.push({col: wc, row: r});
      if(wc + 1 < cols) p.push({col: wc + 1, row: r});
    }

  } else if(shape === 'X_shape') {
    // Χ — δύο διαγώνιες γραμμές (πλάτος 2)
    for(r = 0; r < rows; r++) {
      var xc1 = Math.round(r * (cols - 1) / Math.max(1, rows - 1));
      var xc2 = Math.round((rows - 1 - r) * (cols - 1) / Math.max(1, rows - 1));
      p.push({col: xc1, row: r});
      if(xc1 + 1 < cols) p.push({col: xc1 + 1, row: r});
      if(xc2 !== xc1) {
        p.push({col: xc2, row: r});
        if(xc2 + 1 < cols && xc2 + 1 !== xc1 && xc2 + 1 !== xc1 + 1) p.push({col: xc2 + 1, row: r});
      }
    }

  } else if(shape === 'bowtie') {
    // Παπιγιόν/φιόγκος — δύο τρίγωνα ενωμένα στο κέντρο
    var btMidRR = (rows - 1) / 2.0;
    for(r = 0; r < rows; r++) {
      var btT = btMidRR > 0 ? Math.abs(r - btMidRR) / btMidRR : 1;
      var btW = Math.max(1, Math.round(cols / 2 * btT));
      for(c = 0; c < btW; c++) p.push({col: c, row: r});
      for(c = cols - btW; c < cols; c++) p.push({col: c, row: r});
    }

  } else if(shape === 'double_cross') {
    // Δύο σταυροί δίπλα-δίπλα — χρησιμοποιεί grid για dedup
    var dc1W = Math.max(3, Math.floor(cols * 0.44)), dc2Off = Math.ceil(cols * 0.56);
    var dc2W = cols - dc2Off, dcMidRR = Math.floor((rows - 1) / 2);
    var dcGrid = []; for(r = 0; r < rows; r++) { dcGrid[r] = []; for(c = 0; c < cols; c++) dcGrid[r][c] = false; }
    var _dcAdd = function(cc, rr) { if(cc >= 0 && cc < cols && rr >= 0 && rr < rows && !dcGrid[rr][cc]) { dcGrid[rr][cc] = true; p.push({col: cc, row: rr}); } };
    var dcMC1 = Math.floor((dc1W - 1) / 2);
    for(r = 0; r < rows; r++) _dcAdd(dcMC1, r);
    for(c = 0; c < dc1W; c++) _dcAdd(c, dcMidRR);
    var dcMC2 = Math.floor((dc2W - 1) / 2);
    for(r = 0; r < rows; r++) _dcAdd(dc2Off + dcMC2, r);
    for(c = 0; c < dc2W; c++) _dcAdd(dc2Off + c, dcMidRR);

  } else if(shape === 'five_clusters') {
    // Ζάρι 5 — 4 ομάδες στις γωνίες + 1 στο κέντρο
    var fcW = Math.max(2, Math.floor(cols / 4)), fcH = Math.max(2, Math.floor(rows / 4));
    var fcMC = Math.floor((cols - fcW) / 2), fcMR = Math.floor((rows - fcH) / 2);
    for(r = 0; r < fcH; r++) for(c = 0; c < fcW; c++)               p.push({col: c,          row: r});
    for(r = 0; r < fcH; r++) for(c = cols - fcW; c < cols; c++)      p.push({col: c,          row: r});
    for(r = rows - fcH; r < rows; r++) for(c = 0; c < fcW; c++)      p.push({col: c,          row: r});
    for(r = rows - fcH; r < rows; r++) for(c = cols - fcW; c < cols; c++) p.push({col: c,     row: r});
    for(r = fcMR; r < fcMR + fcH; r++) for(c = fcMC; c < fcMC + fcW; c++) p.push({col: c,    row: r});

  } else if(shape === 'pinwheel') {
    // Ανεμόμυλος — 4 βραχίονες με κλίση (κεκλιμένοι 45°)
    var pwCR = Math.floor((rows - 1) / 2), pwCC = Math.floor((cols - 1) / 2);
    p.push({col: pwCC, row: pwCR}); // κέντρο
    for(var pwI = 1; pwI <= Math.min(pwCR, Math.floor(cols / 2)); pwI++) {
      var pwOff = Math.floor(pwI * 0.6);
      if(pwCR - pwI >= 0   && pwCC + pwOff < cols)  p.push({col: pwCC + pwOff,  row: pwCR - pwI}); // Β→ΒΑ
      if(pwCC + pwI < cols  && pwCR + pwOff < rows)  p.push({col: pwCC + pwI,    row: pwCR + pwOff}); // Α→ΝΑ
      if(pwCR + pwI < rows  && pwCC - pwOff >= 0)    p.push({col: pwCC - pwOff,  row: pwCR + pwI}); // Ν→ΝΔ
      if(pwCC - pwI >= 0    && pwCR - pwOff >= 0)    p.push({col: pwCC - pwI,    row: pwCR - pwOff}); // Δ→ΒΔ
    }

  } else if(shape === 'broken_frame') {
    // Σπασμένο πλαίσιο — περίμετρος με κενά (διακεκομμένο)
    for(r = 0; r < rows; r++) for(c = 0; c < cols; c++) {
      var bfOnEdge = (r === 0 || r === rows - 1 || c === 0 || c === cols - 1);
      if(bfOnEdge) {
        var bfIdx = (r === 0) ? c : (r === rows - 1) ? c : (c === 0) ? r : r;
        if(Math.floor(bfIdx / 3) % 2 === 0) p.push({col: c, row: r});
      }
    }

  } else if(shape === 'spine') {
    // Σπονδυλική στήλη — κεντρικός άξονας + εναλλακτικά νευρά
    var spC = Math.floor((cols - 1) / 2);
    for(r = 0; r < rows; r++) {
      p.push({col: spC, row: r});
      if(spC + 1 < cols) p.push({col: spC + 1, row: r});
      if(r % 2 === 0) {
        for(c = Math.max(0, spC - 3); c < spC; c++) p.push({col: c, row: r});
        for(c = spC + 2; c <= Math.min(cols - 1, spC + 4); c++) p.push({col: c, row: r});
      }
    }

  } else if(shape === 'scatter') {
    // Σκόρπιο — pseudo-random κατανομή (deterministic)
    var scArr = [];
    for(r = 0; r < rows; r++) { scArr[r] = []; for(c = 0; c < cols; c++) scArr[r][c] = false; }
    var scN = Math.floor(rows * cols * 0.45);
    for(var sci = 0; sci < rows * cols * 4 && scN > 0; sci++) {
      var scR = (sci * 7 + 3) % rows, scC = (sci * 11 + 5) % cols;
      if(!scArr[scR][scC]) { scArr[scR][scC] = true; p.push({col: scC, row: scR}); scN--; }
    }
  }

  return p;
}

// ===================================================================
// PATTERN 1: GRID FORMATION (Space Invaders πλέγμα ping-pong)
// ===================================================================
var GridFormation = function(opts) {
  // ── Randomized parameters (opts = "οδηγός", παραμένει ± τυχαία παραλλαγή) ──
  var _rnd = function(base, delta) { return base + Math.floor(Math.random() * (delta * 2 + 1)) - delta; };
  this.rows    = Math.max(4, Math.min(10, _rnd(opts.rows    || 6,  1)));
  this.cols    = Math.max(5, Math.min(13, _rnd(opts.columns || 9,  2)));
  var _ss = Game.spriteScale || 1.0;
  this.spacingX = Math.max(42, Math.min(80, _rnd(opts.spacing_x || 52, 5))) * _ss;
  this.spacingY = Math.max(36, Math.min(68, _rnd(opts.spacing_y || 48, 5))) * _ss;

  var _gridLvlM = currentLevel <= 5 ? 0.25 : Math.min(0.75, 0.25 + (currentLevel - 5) * 0.050);
  // Ταχύτητα ± 15% τυχαία — also scale by spriteScale so larger grids move proportionally
  this.speed = (opts.initial_speed || 40) * _gridLvlM * 1.6 * (0.85 + Math.random() * 0.30) * _ss;
  this.stepDownPx = opts.step_down_pixels || 16;
  this.marginL = 16;
  this.marginR = 16;

  // Auto-fit cols: ensure the grid doesn't exceed screen width (critical on mobile)
  var _sprW = Math.round(64 * _ss);
  var _maxCols = Math.floor((Game.width - this.marginL - this.marginR - _sprW) / this.spacingX) + 1;
  if(this.cols > _maxCols) this.cols = Math.max(4, _maxCols);

  // Auto-fit rows: ensure the grid bottom doesn't reach the player zone
  var _topY = (opts.start_y || 30) + 10; // conservative top estimate
  var _playerSafeY = Game.height - (Game.playerOffset || 10) - 32 - 30;
  var _maxRows = Math.min(5, Math.max(3, Math.floor((_playerSafeY - _topY) / this.spacingY)));
  if(this.rows > _maxRows) this.rows = _maxRows;

  // Shoot timing ± 20% τυχαία
  var _cdBase = (opts.cooldown_ms || 1200) * (0.80 + Math.random() * 0.40);
  this.shootCooldown = _cdBase / 1000;
  this.minCooldown = (opts.min_cooldown_ms || 250) / 1000;
  this.shootTimer = this.shootCooldown;
  // Y start ± 10px τυχαία
  this.gridY = (opts.start_y || 30) + Math.floor(Math.random() * 21) - 10;

  // Random starting position: left, right, or center
  var _gridW = (this.cols - 1) * this.spacingX + _sprW;
  var _startPos = ['left', 'right', 'center'][Math.floor(Math.random() * 3)];
  if(_startPos === 'left') {
    this.gridX = this.marginL;
    this.direction = 1;
  } else if(_startPos === 'right') {
    this.gridX = Game.width - this.marginR - _gridW;
    this.direction = -1;
  } else {
    this.gridX = (Game.width - _gridW) / 2;
    this.direction = Math.random() < 0.5 ? 1 : -1;
  }

  // Sprite pool: use species override, or active species pool, or full alien pool
  var _pool = opts.spritePool || currentLevelPool || allAlienPool;
  var _poolN = Math.min(8, _pool.length);
  var _gBase = Math.floor(Math.random() * _pool.length);
  this.spriteList = [];
  for(var _gi = 0; _gi < _poolN; _gi++) {
    this.spriteList.push(_pool[(_gBase + _gi) % _pool.length]);
  }

  // Dive/kamikaze timing ± 30% τυχαία
  this.diveCooldown = (opts.diveCooldown || 4) * (0.70 + Math.random() * 0.60);

  // Τυχαίο σχήμα ανά stage — can be overridden by opts.shape
  var _shapes = [
    'grid', 'arrow', 'diamond', 'three_clusters',
    'chevron', 'cross', 'wings', 'hourglass',
    'three_v', 'three_cross', 'asymmetric',
    'v_flanked', 'cross_flanked', 'pyramid', 'frame',
    'comb', 'double_v', 'zigzag_line', 'diamond_flanked',
    'compass', 'L_shape', 'T_shape', 'snake_s',
    'ring', 'two_diamonds', 'staggered', 'sword',
    'trident', 'wave', 'X_shape', 'bowtie',
    'double_cross', 'five_clusters', 'pinwheel', 'broken_frame',
    'spine', 'scatter'
  ];
  this.formationShape = opts.shape || _shapes[Math.floor(Math.random() * _shapes.length)];
  this.positions = getFormationPositions(this.formationShape, this.rows, this.cols);
  this.totalEnemies = this.positions.length;
  this.gridEnemies = [];
  // Entry fly-in: enemies rush in one-by-one from a random side
  this.entryDir = ['left', 'right', 'top'][Math.floor(Math.random() * 3)];
  this.allEntered = false;
  this.enteredCount = 0;
};

GridFormation.prototype.init = function(board) {
  SoundManager.playDiveBuzz(); // entry buzz — enemies flying to position
  var _ss = Game.spriteScale || 1.0;
  var _sprW = Math.round(64 * _ss);
  var _entrySpd = 500 + Math.random() * 150;
  var _interval = 0.09; // 90ms between each enemy
  for(var i = 0; i < this.positions.length; i++) {
    var pos = this.positions[i];
    var spr = this.spriteList[Math.floor(pos.row) % this.spriteList.length];
    var ge = new GridEnemy(spr, pos.row, pos.col, this);
    var tX = this.gridX + pos.col * this.spacingX;
    var tY = this.gridY + pos.row * this.spacingY;
    // Entry start: off-screen based on direction
    var eX, eY;
    if(this.entryDir === 'left')       { eX = -_sprW - 20; eY = tY; }
    else if(this.entryDir === 'right') { eX = Game.width + _sprW + 20; eY = tY; }
    else                               { eX = tX; eY = -_sprW - 20; } // top
    ge.x = eX; ge.y = eY;
    ge.targetX = tX; ge.targetY = tY;
    ge.entering = true;
    ge.entryDelay = i * _interval;
    ge.entrySpeed = _entrySpd;
    board.add(ge);
    this.gridEnemies.push(ge);
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

  // Wait until all enemies have flown to their positions
  if(!this.allEntered) {
    var _anyEntering = false;
    for(var k = 0; k < this.gridEnemies.length; k++) {
      if(this.gridEnemies[k].entering && !this.gridEnemies[k].dead) { _anyEntering = true; break; }
    }
    if(!_anyEntering) this.allEntered = true;
    else return;
  }

  // Difficulty scaling: fewer enemies = faster (1x to 3.5x)
  var ratio = alive.length / this.totalEnemies;
  var speedMult = 1.0 + (1.0 - ratio) * 2.5;

  // Slow constant downward drift
  this.gridY += 7 * dt;

  // Move grid horizontally
  this.gridX += this.speed * this.direction * speedMult * dt;

  // Edge detection
  var leftEdge = this.gridX + minCol * this.spacingX;
  var rightEdge = this.gridX + maxCol * this.spacingX + Math.round(64 * (Game.spriteScale || 1.0));

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
    SoundManager.playDiveBuzz();
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
  // Entry fly-in: rush straight to target position
  if(this.entering) {
    if(this.entryDelay > 0) { this.entryDelay -= dt; return; }
    var _dx = this.targetX - this.x, _dy = this.targetY - this.y;
    var _d = Math.sqrt(_dx*_dx + _dy*_dy);
    if(_d < 6) {
      this.x = this.targetX; this.y = this.targetY;
      this.entering = false;
      this.formation.enteredCount++;
      if(this.formation.enteredCount >= this.formation.totalEnemies) this.formation.allEntered = true;
    } else {
      var _spd = this.entrySpeed || 500;
      this.x += (_dx/_d) * _spd * dt;
      this.y += (_dy/_d) * _spd * dt;
    }
    return;
  }

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

  // Subtle breathing pulse — each enemy has its own phase offset
  var pulse = 1.0 + 0.06 * Math.sin(this.t * 2.8 + this.swayOffset);
  ctx.scale(pulse, pulse);

  ctx.translate(-gCx, -gCy);

  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame, this.w, this.h);
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
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
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
  SoundManager.playAlienAttack();
  this.x = startX;
  this.y = startY;
  this.startX = startX;
  this.startY = startY;
  this.t = 0;
  this.phase = 0; // 0=dive toward player, 1=curve and exit right
  // Early levels: -75% speed (levels 1-5), gradual increase after
  var levelSpeedMult = currentLevel <= 5 ? 0.25 : Math.min(1.0, 0.25 + (currentLevel - 5) * 0.075);
  this.diveSpeed = 120 * (Game.width / 320) * levelSpeedMult;
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

// ===================================================================
// ZIGZAG ENEMY — κλεμμένη κίνηση από ChristianOellers/2D-Space-Shooter
// Κινείται κάτω + αριστερά-δεξιά με sin/cos rotation math
// ===================================================================
var ZigZagEnemy = function(spriteType, startX) {
  this.setup(spriteType, { health: 8, points: 60 });
  this.x = startX;
  this.y = -40;
  this.startX = startX;
  this.t = 0;
  // Stolen from ChristianOellers: speed + acceleration model
  var _zigLvlMult = currentLevel <= 5 ? 0.25 : Math.min(0.80, 0.25 + (currentLevel - 5) * 0.055);
  this.speed = (60 + Math.random() * 30) * _zigLvlMult;
  this.acceleration = 8 + Math.random() * 5;
  this.zigFreq = 2.5 + Math.random() * 2.0;  // oscillation frequency
  this.zigAmp  = 55 + Math.random() * 45;    // oscillation width
  this.hasShot = false;
  this.hitFlash = 0;
};
ZigZagEnemy.prototype = new Sprite();
ZigZagEnemy.prototype.type = OBJECT_ENEMY;

ZigZagEnemy.prototype.step = function(dt) {
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;
  this.t += dt;

  // Acceleration over time (stolen from ChristianOellers phaser.js)
  this.speed += this.acceleration * dt;

  // Move down
  this.y += this.speed * dt;

  // ZigZag: x = sin(t * freq) * amp  — borrowed rotation math
  this.x = this.startX + Math.sin(this.t * this.zigFreq) * this.zigAmp;

  // Shoot once at mid-screen
  if(!this.hasShot && this.y > Game.height * 0.35) {
    this.hasShot = true;
    this.board.add(new EnemyMissile(this.x + this.w/2, this.y + this.h));
  }

  // Collision with player
  var col = this.board.collide(this, OBJECT_PLAYER);
  if(col) { col.hit(8); this.board.remove(this); return; }

  if(this.y > Game.height + 60) this.board.remove(this);
};

ZigZagEnemy.prototype.draw = function(ctx) {
  if(this.hitFlash > 0) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = this.hitFlash * 0.6;
    Sprite.prototype.draw.call(this, ctx);
    ctx.restore();
  }
  Sprite.prototype.draw.call(this, ctx);
};

ZigZagEnemy.prototype.hit = function(damage) {
  this.hitFlash = 1.0;
  this.health -= damage;
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      Game.shake(5, 0.15);
      SoundManager.playEnemyDeath();
      var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
      earnPoints(this.board, ecx, this.y, this.points || 60);
      if(Math.random() < 0.15) this.board.add(new PowerUp(ecx, ecy));
    }
  } else {
    this.board.add(new MissileImpactSpark(this.x + this.w/2, this.y + this.h/2));
    SoundManager.playImpact();
  }
};

// ===================================================================
// SPIRAL ENEMY — κλεμμένη περιστροφή από ChristianOellers math.js
// getPosX = sin(rot) * speed, getPosY = cos(rot) * speed * -1
// ===================================================================
var SpiralEnemy = function(spriteType, startX, startY) {
  this.setup(spriteType, { health: 12, points: 90 });
  this.x = startX;
  this.y = startY || -40;
  this.t = 0;
  this.rotation = Math.random() < 0.5 ? 180 : 170; // facing down
  this.rotSpeed = 60 + Math.random() * 40;   // degrees/sec (spiral tightness)
  var _spiralLvlMult = currentLevel <= 5 ? 0.25 : Math.min(0.80, 0.25 + (currentLevel - 5) * 0.055);
  this.speed = (80 + Math.random() * 40) * _spiralLvlMult;
  this.hasShot = false;
  this.hitFlash = 0;
};
SpiralEnemy.prototype = new Sprite();
SpiralEnemy.prototype.type = OBJECT_ENEMY;

SpiralEnemy.prototype.step = function(dt) {
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;
  this.t += dt;

  // Rotation changes over time → spiral path
  this.rotation += this.rotSpeed * dt;

  // Stolen from ChristianOellers lib/math.js:
  // getPosX = sin(rotation * PI/180) * speed
  // getPosY = cos(rotation * PI/180) * speed * -1
  var rad = this.rotation * (Math.PI / 180);
  this.x += Math.sin(rad) * this.speed * dt;
  this.y += Math.cos(rad) * this.speed * dt * -1 + this.speed * 0.6 * dt; // bias downward

  if(!this.hasShot && this.y > Game.height * 0.3) {
    this.hasShot = true;
    this.board.add(new EnemyMissile(this.x + this.w/2, this.y + this.h));
  }

  var col = this.board.collide(this, OBJECT_PLAYER);
  if(col) { col.hit(10); this.board.remove(this); return; }

  if(this.y > Game.height + 80 || this.x < -100 || this.x > Game.width + 100) {
    this.board.remove(this);
  }
};

SpiralEnemy.prototype.draw = function(ctx) {
  if(this.hitFlash > 0) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = this.hitFlash * 0.6;
    Sprite.prototype.draw.call(this, ctx);
    ctx.restore();
  }
  Sprite.prototype.draw.call(this, ctx);
};

SpiralEnemy.prototype.hit = function(damage) {
  this.hitFlash = 1.0;
  this.health -= damage;
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      Game.shake(6, 0.18);
      SoundManager.playExplosion();
      var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
      earnPoints(this.board, ecx, this.y, this.points || 90);
      if(Math.random() < 0.2) this.board.add(new PowerUp(ecx, ecy));
    }
  } else {
    this.board.add(new MissileImpactSpark(this.x + this.w/2, this.y + this.h/2));
    SoundManager.playImpact();
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
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
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
    SpriteSheet.draw(ctx, this.sprite, this.trail[i].x, this.trail[i].y, this.frame, this.w, this.h);
  }
  ctx.globalAlpha = 1;

  var dCx = this.x + this.w / 2;
  var dCy = this.y + this.h / 2;

  // Combine individual sway + banking rotation
  var totalRotation = this.swayAngle + (this.bankAngle || 0);
  ctx.translate(dCx, dCy);
  ctx.rotate(Math.max(-0.55, Math.min(0.55, totalRotation)));
  ctx.translate(-dCx, -dCy);

  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame, this.w, this.h);
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
  SoundManager.playAlienAttack();
  this.x = startX;
  this.y = startY;
  this.t = 0;
  this.phase = 0; // 0=go up, 1=hover briefly, 2=dive down
  var _kamLvlMult = currentLevel <= 5 ? 0.25 : Math.min(1.0, 0.25 + (currentLevel - 5) * 0.075);
  this.upSpeed = 150 * _kamLvlMult;
  this.diveSpeed = 250 * (Game.width / 320) * _kamLvlMult;
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
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
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
    SpriteSheet.draw(ctx, this.sprite, this.trail[i].x, this.trail[i].y, this.frame, this.w, this.h);
  }
  ctx.globalAlpha = 1;

  var dCx = this.x + this.w / 2;
  var dCy = this.y + this.h / 2;

  // Combine sway + banking + rotation + 360° spin during dive
  var totalRotation = this.swayAngle + (this.bankAngle || 0) + (this.rotation || 0) + (this.spinRotation || 0);
  ctx.translate(dCx, dCy);
  ctx.rotate(totalRotation);
  ctx.translate(-dCx, -dCy);

  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame, this.w, this.h);
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
  { letter: 'S', color: '#00FF00', name: 'Speed Boost',       sprite: 'coin_S' },
  { letter: 'W', color: '#00AAFF', name: 'Wingmen',           sprite: 'coin_W' },
  { letter: 'P', color: '#FF4400', name: 'Power Shot',        sprite: 'coin_P' },
  { letter: 'L', color: '#FF00FF', name: 'Extra Life',        sprite: 'coin_L' },
  { letter: 'B', color: '#FFFF00', name: 'Bomb',              sprite: 'coin_B' },
  { letter: 'R', color: '#FF8800', name: 'Rapid Fire',        sprite: 'coin_R' },
  { letter: 'X', color: '#00FFFF', name: 'Triple Shot',       sprite: 'coin_X' },
  { letter: 'I', color: '#AAEEFF', name: 'Invincible Shield', sprite: 'coin_I' },
  { letter: 'T', color: '#AA00FF', name: 'Time Slow',         sprite: 'coin_T' },
  { letter: 'M', color: '#FFCC00', name: 'Magnet',            sprite: 'coin_M' },
  { letter: 'G', color: '#FF0044', name: 'Giant Laser',       sprite: 'coin_G' }
];

var PowerUp = function(x, y) {
  this.x = x - 28;
  this.y = y;
  this.w = 55;
  this.h = 55;
  this.vy = 60;
  this.t = 0;
  // Weighted random: 'L' (Extra Life, index 3) is 3× more likely than others
  // weights: [1,1,1,3,1,1,1,1,1,1,1] → total 13
  var _pw = [1,1,1,3,1,1,1,1,1,1,1];
  var _pt = 0; for(var _i=0;_i<_pw.length;_i++) _pt += _pw[_i];
  var _r = Math.random() * _pt, _idx = 0;
  while(_r > 0) { _r -= _pw[_idx]; if(_r > 0) _idx++; }
  this.powerType = POWERUP_TYPES[_idx];
};

PowerUp.prototype.type = OBJECT_POWERUP;

PowerUp.prototype.step = function(dt) {
  this.t += dt;
  // Magnet: fly toward player ship
  if(playerShip && playerShip.magnetTimer > 0) {
    var pcx = playerShip.x + playerShip.w / 2;
    var pcy = playerShip.y + playerShip.h / 2;
    var mcx = this.x + this.w / 2;
    var mcy = this.y + this.h / 2;
    var dx = pcx - mcx, dy = pcy - mcy;
    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
    var spd = 220;
    this.x += (dx / dist) * spd * dt;
    this.y += (dy / dist) * spd * dt;
  } else {
    this.y += this.vy * dt;
  }
  if(this.y > Game.height + 40) {
    this.board.remove(this);
  }
};

PowerUp.prototype.draw = function(ctx) {
  ctx.save();
  // Fast pulse: alpha 0.45-1.0, never fully invisible
  var f = Math.sin(this.t * 11);
  ctx.globalAlpha = 0.45 + 0.55 * Math.abs(f);
  // Color glow that flashes on the bright half
  if(f > 0) {
    ctx.shadowColor = this.powerType.color;
    ctx.shadowBlur  = 26 * f;
  }
  SpriteSheet.draw(ctx, this.powerType.sprite, this.x, this.y);
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
  // Align wingman bottom edge with player bottom edge (accounts for scaled ship height)
  this.offsetY = player.h * (1 - this.scale);
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
  var spr = opts.sprite || pickAlien(7);
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
// ALIEN HEAD ENEMY — 10 unique movement patterns
// ===================================================================
var AFACE_HEAD_SIZE = 90; // drawn size (up from natural 64px)

var AFACE_SPRITES = ['aface_crystal','aface_horns','aface_pink','aface_green','aface_demon',
  'aface_crystal2','aface_lava','aface_coral','aface_neon','aface_classic'];

var AFACE_PATTERNS = ['slow_descent','hover_strike','pendulum','spiral_in','figure_eight',
  'strafe_zigzag','orbit_drop','charge_player','bounce_walls','teleport_step',
  'cross_strafe','yo_yo','hunt_player'];

var AlienHeadEnemy = function(opts) {
  opts = opts || {};
  var _lvlM = currentLevel <= 5 ? 0.70 : Math.min(1.40, 0.70 + (currentLevel - 5) * 0.060);
  var spr = opts.sprite || AFACE_SPRITES[Math.floor(Math.random() * AFACE_SPRITES.length)];
  this.setup(spr, { health: Math.round((opts.health || 50) * _lvlM), points: opts.points || 200 });
  this.w = AFACE_HEAD_SIZE;
  this.h = AFACE_HEAD_SIZE;
  this.hitFlash = 0;
  this.t = 0;
  this.shootTimer = 1.5 + Math.random() * 2.0;
  var spd = (opts.speed || 100) * _lvlM;
  this.movePattern = opts.pattern || AFACE_PATTERNS[Math.floor(Math.random() * AFACE_PATTERNS.length)];
  var cx = Game.width / 2;
  var startX = Game.width * (0.1 + Math.random() * 0.8) - this.w / 2;

  if(this.movePattern === 'slow_descent') {
    // Drifts slowly down from top with sinusoidal horizontal sway
    this.x = startX;
    this.y = -this.h - 10;
    this.vy = spd * 0.35;
    this.amplitude = 40 + Math.random() * 50;
    this.waveFreq  = 0.9 + Math.random() * 0.8;
    this.phase     = Math.random() * Math.PI * 2;
    this.baseX     = this.x;

  } else if(this.movePattern === 'hover_strike') {
    // Enters from top, brakes at mid-screen, hovers, fires bursts, retreats
    this.x = startX;
    this.y = -this.h - 10;
    this.vy = spd * 1.4;
    this.targetY   = Game.height * (0.2 + Math.random() * 0.3);
    this.hoverPhase = 'enter';
    this.hoverTimer = 2.5 + Math.random() * 2.0;
    this.burstTimer = 0.6;

  } else if(this.movePattern === 'pendulum') {
    // Swings side-to-side like a pendulum while slowly descending
    this.x = cx - this.w / 2;
    this.y = -this.h - 10;
    this.vy = spd * 0.18;
    this.amplitude = 110 + Math.random() * 80;
    this.waveFreq  = 1.3 + Math.random() * 0.8;
    this.baseX     = cx - this.w / 2;

  } else if(this.movePattern === 'spiral_in') {
    // Spirals inward toward screen center while descending
    this.spiralCX    = cx;
    this.spiralCY    = -60;
    this.spiralR     = 120 + Math.random() * 60;
    this.spiralSpeed = (Math.random() > 0.5 ? 1 : -1) * (1.8 + Math.random() * 1.2);
    this.spiralDecay = 0.22;
    this.spiralAngle = Math.random() * Math.PI * 2;
    this.vy = spd * 0.28;
    this.x = this.spiralCX + Math.cos(this.spiralAngle) * this.spiralR - this.w / 2;
    this.y = this.spiralCY;

  } else if(this.movePattern === 'figure_eight') {
    // Traces a lemniscate figure-8 across the upper screen
    this.figCX    = cx;
    this.figCY    = Game.height * 0.25;
    this.figA     = 100 + Math.random() * 60;
    this.figB     = 60  + Math.random() * 40;
    this.figSpeed = 1.2 + Math.random() * 0.8;
    this.figAngle = Math.random() * Math.PI * 2;
    this.vy = spd * 0.05;
    this.x = this.figCX - this.w / 2;
    this.y = this.figCY - this.h / 2;

  } else if(this.movePattern === 'strafe_zigzag') {
    // Sharp diagonal zigzag descent — direction reverses every ~0.5s
    this.x  = Math.random() > 0.5 ? -this.w - 10 : Game.width + 10;
    this.y  = Game.height * (0.05 + Math.random() * 0.2);
    this.vx = (this.x < 0 ? 1 : -1) * spd * 1.1;
    this.vy = spd * 0.7;
    this.zigTimer = 0.55 + Math.random() * 0.4;

  } else if(this.movePattern === 'orbit_drop') {
    // Orbits a center point that slowly descends
    this.orbitCX    = cx;
    this.orbitCY    = -60;
    this.orbitR     = 80 + Math.random() * 50;
    this.orbitSpeed = (Math.random() > 0.5 ? 1 : -1) * (2.0 + Math.random() * 1.5);
    this.orbitAngle = Math.random() * Math.PI * 2;
    this.orbitDropSpeed = spd * 0.22;
    this.x = this.orbitCX + Math.cos(this.orbitAngle) * this.orbitR - this.w / 2;
    this.y = this.orbitCY + Math.sin(this.orbitAngle) * this.orbitR - this.h / 2;

  } else if(this.movePattern === 'charge_player') {
    // Enters, waits at top, then charges fast toward player and retreats
    this.x = startX;
    this.y = -this.h - 10;
    this.vy = spd * 1.6;
    this.stopY = Game.height * (0.05 + Math.random() * 0.15);
    this.chargePhase = 'enter';
    this.chargeWait  = 0.5 + Math.random() * 0.6;
    this.chargeSpeed = spd * 3.2;

  } else if(this.movePattern === 'bounce_walls') {
    // Bounces between left/right walls like a billiard ball while descending
    this.x  = startX;
    this.y  = -this.h - 10;
    this.vx = (Math.random() > 0.5 ? 1 : -1) * spd * 1.2;
    this.vy = spd * 0.3;

  } else if(this.movePattern === 'cross_strafe') {
    // Enters from left or right edge, slices diagonally across entire screen, exits other side
    var fromLeft = Math.random() > 0.5;
    this.x = fromLeft ? -this.w - 10 : Game.width + 10;
    this.y = Game.height * (0.05 + Math.random() * 0.35);
    this.vx = (fromLeft ? 1 : -1) * spd * 1.9;
    this.vy = spd * 0.55;

  } else if(this.movePattern === 'yo_yo') {
    // Bounces rapidly up/down like a yo-yo while drifting sideways
    this.x = startX;
    this.y = Game.height * 0.12;
    this.vx = (Math.random() > 0.5 ? 1 : -1) * spd * 0.5;
    this.vy = spd * 2.2;
    this.yoDir  = 1; // 1 = moving down, -1 = moving up
    this.yoTop  = Game.height * 0.07;
    this.yoBot  = Game.height * 0.62;

  } else { // hunt_player (also covers teleport_step fallthrough)
    if(this.movePattern === 'teleport_step') {
      // Stays visible, then teleports to a new random position with a flash
      this.x = startX;
      this.y = -this.h - 10;
      this.vy = spd * 0.15;
      this.teleTimer = 0.9 + Math.random() * 0.7;
    } else {
      // hunt_player: descends while slowly tracking player's X position
      this.x = startX;
      this.y = -this.h - 10;
      this.vy = spd * 0.45;
      this.huntSpeed = spd * 1.1;
    }
  }
};

AlienHeadEnemy.prototype = new Sprite();
AlienHeadEnemy.prototype.type = OBJECT_ENEMY;

AlienHeadEnemy.prototype.step = function(dt) {
  this.t += dt;
  if(this.hitFlash > 0) this.hitFlash -= dt * 3;

  if(this.movePattern === 'slow_descent') {
    this.x = this.baseX + Math.sin(this.t * this.waveFreq + this.phase) * this.amplitude;
    this.y += this.vy * dt;

  } else if(this.movePattern === 'hover_strike') {
    if(this.hoverPhase === 'enter') {
      this.y += this.vy * dt;
      if(this.y >= this.targetY) { this.y = this.targetY; this.vy = 0; this.hoverPhase = 'hover'; }
    } else if(this.hoverPhase === 'hover') {
      this.x += Math.sin(this.t * 2.2) * 55 * dt;
      this.hoverTimer -= dt;
      this.burstTimer -= dt;
      if(this.burstTimer <= 0) {
        this.burstTimer = 0.85;
        if(this.y > -10) this.board.add(new EnemyMissile(this.x + this.w/2, this.y + this.h));
      }
      if(this.hoverTimer <= 0) { this.vy = -300; this.hoverPhase = 'retreat'; }
    } else {
      this.y += this.vy * dt;
    }

  } else if(this.movePattern === 'pendulum') {
    this.x = this.baseX + Math.sin(this.t * this.waveFreq) * this.amplitude;
    this.y += this.vy * dt;

  } else if(this.movePattern === 'spiral_in') {
    this.spiralCY  += this.vy * dt;
    this.spiralAngle += this.spiralSpeed * dt;
    var r = this.spiralR * Math.max(0.05, 1.0 - this.spiralDecay * this.t);
    this.x = this.spiralCX + Math.cos(this.spiralAngle) * r - this.w / 2;
    this.y = this.spiralCY + Math.sin(this.spiralAngle) * r - this.h / 2;

  } else if(this.movePattern === 'figure_eight') {
    this.figAngle += this.figSpeed * dt;
    this.figCY    += this.vy * dt;
    var denom = 1 + Math.pow(Math.sin(this.figAngle), 2);
    this.x = this.figCX + Math.cos(this.figAngle) * this.figA / denom - this.w / 2;
    this.y = this.figCY + Math.sin(this.figAngle) * Math.cos(this.figAngle) * this.figB / denom - this.h / 2;

  } else if(this.movePattern === 'strafe_zigzag') {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.zigTimer -= dt;
    if(this.zigTimer <= 0) {
      this.vx *= -1;
      this.zigTimer = 0.55 + Math.random() * 0.4;
    }
    if(this.x < -10) { this.x = -10; this.vx = Math.abs(this.vx); }
    if(this.x > Game.width - this.w + 10) { this.x = Game.width - this.w + 10; this.vx = -Math.abs(this.vx); }

  } else if(this.movePattern === 'orbit_drop') {
    this.orbitCY    += this.orbitDropSpeed * dt;
    this.orbitAngle += this.orbitSpeed * dt;
    this.x = this.orbitCX + Math.cos(this.orbitAngle) * this.orbitR - this.w / 2;
    this.y = this.orbitCY + Math.sin(this.orbitAngle) * this.orbitR - this.h / 2;

  } else if(this.movePattern === 'charge_player') {
    if(this.chargePhase === 'enter') {
      this.y += this.vy * dt;
      if(this.y >= this.stopY) { this.y = this.stopY; this.vy = 0; this.chargePhase = 'wait'; }
    } else if(this.chargePhase === 'wait') {
      this.chargeWait -= dt;
      if(this.chargeWait <= 0) {
        var tx = playerShip ? playerShip.x + playerShip.w/2 : Game.width/2;
        var dx = tx - (this.x + this.w/2);
        var dy = (Game.height - 60) - (this.y + this.h/2);
        var dist = Math.sqrt(dx*dx + dy*dy) || 1;
        this.chargeVX = (dx/dist) * this.chargeSpeed;
        this.chargeVY = (dy/dist) * this.chargeSpeed;
        this.chargePhase = 'charge';
      }
    } else if(this.chargePhase === 'charge') {
      this.x += this.chargeVX * dt;
      this.y += this.chargeVY * dt;
      if(this.y > Game.height * 0.82) { this.chargeVX = 0; this.chargeVY = -380; this.chargePhase = 'retreat'; }
    } else {
      this.y += this.chargeVY * dt;
    }

  } else if(this.movePattern === 'bounce_walls') {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    if(this.x < 0) { this.x = 0; this.vx = Math.abs(this.vx); }
    if(this.x > Game.width - this.w) { this.x = Game.width - this.w; this.vx = -Math.abs(this.vx); }

  } else if(this.movePattern === 'cross_strafe') {
    // Slices across screen diagonally — removed by off-screen check
    this.x += this.vx * dt;
    this.y += this.vy * dt;

  } else if(this.movePattern === 'yo_yo') {
    // Rapid yo-yo bounce between yoTop and yoBot while drifting sideways
    this.x += this.vx * dt;
    this.y += this.vy * this.yoDir * dt;
    if(this.yoDir ===  1 && this.y > this.yoBot) { this.y = this.yoBot; this.yoDir = -1; }
    if(this.yoDir === -1 && this.y < this.yoTop) { this.y = this.yoTop; this.yoDir =  1; }
    if(this.x < 0)                    { this.x = 0;                    this.vx =  Math.abs(this.vx); }
    if(this.x > Game.width - this.w)  { this.x = Game.width - this.w;  this.vx = -Math.abs(this.vx); }

  } else if(this.movePattern === 'hunt_player') {
    // Descends while slowly homing horizontally onto the player's position
    this.y += this.vy * dt;
    if(this.y > 0 && playerShip) {
      var tx = playerShip.x + playerShip.w / 2 - this.w / 2;
      var diff = tx - this.x;
      var maxMove = this.huntSpeed * dt;
      this.x += Math.max(-maxMove, Math.min(maxMove, diff));
    }

  } else { // teleport_step
    this.y += this.vy * dt;
    this.teleTimer -= dt;
    if(this.teleTimer <= 0 && this.y > -10 && this.y < Game.height * 0.7) {
      this.teleTimer = 0.7 + Math.random() * 0.9;
      this.x = Game.width * (0.05 + Math.random() * 0.85) - this.w/2;
      this.y = Game.height * (0.05 + Math.random() * 0.55);
      this.hitFlash = 0.5;
    }
  }

  // Shoot downward
  this.shootTimer -= dt;
  if(this.shootTimer <= 0) {
    this.shootTimer = 1.8 + Math.random() * 2.2;
    if(this.y > -10 && this.y < Game.height - 50) {
      this.board.add(new EnemyMissile(this.x + this.w/2, this.y + this.h));
    }
  }

  // Player collision
  var player = this.board.collide(this, OBJECT_PLAYER);
  if(player) {
    player.hit(1);
    var ecx = this.x + this.w/2;
    this.board.add(new Explosion(ecx, this.y + this.h/2));
    earnPoints(this.board, ecx, this.y, this.points || 200);
    this.board.remove(this);
    return;
  }

  // Off-screen removal
  if(this.y > Game.height + 120 || this.y < -this.h - 350) {
    this.board.remove(this);
    return;
  }
  if(this.movePattern !== 'strafe_zigzag' && this.movePattern !== 'bounce_walls' &&
     this.movePattern !== 'pendulum' && this.movePattern !== 'figure_eight') {
    if(this.x < -this.w - 150 || this.x > Game.width + 150) this.board.remove(this);
  }
};

AlienHeadEnemy.prototype.hit = function(damage) {
  this.health -= damage;
  this.hitFlash = 1.0;
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      var ecx = this.x + this.w/2;
      var ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
      earnPoints(this.board, ecx, this.y, this.points || 200);
      if(Math.random() < 0.25) this.board.add(new PowerUp(ecx, ecy));
    }
  }
};

AlienHeadEnemy.prototype.draw = function(ctx) {
  ctx.save();
  // Rock ±30° (π/6 rad) around the sprite center
  var rcx = this.x + this.w / 2, rcy = this.y + this.h / 2;
  ctx.translate(rcx, rcy);
  ctx.rotate(Math.sin(this.t * 3) * Math.PI / 6);
  ctx.translate(-rcx, -rcy);
  if(this.hitFlash > 0) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = this.hitFlash * 0.65;
    SpriteSheet.draw(ctx, this.sprite, this.x, this.y, 0, this.w, this.h);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }
  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, 0, this.w, this.h);
  ctx.restore();
};

// ===================================================================
// BONUS STAGE — BonusAlienHead (80×80, rocking) + BonusStage (60s timer)
// ===================================================================
var BONUS_HEAD_SIZE = 88; // ~38% bigger than regular 64px aface sprites (+10%)
var BONUS_HEAD_NAT  = 64; // natural sprite size (used for draw offset)

var BonusAlienHead = function(opts) {
  opts = opts || {};
  var spr = AFACE_SPRITES[Math.floor(Math.random() * AFACE_SPRITES.length)];
  this.setup(spr, { health: 90, points: 400 });
  this.w = BONUS_HEAD_SIZE;
  this.h = BONUS_HEAD_SIZE;
  // Start off-screen, fly to target position at speed
  this.x = opts.startX !== undefined ? opts.startX : Game.width/2 - BONUS_HEAD_SIZE/2;
  this.y = opts.startY !== undefined ? opts.startY : -BONUS_HEAD_SIZE - 10;
  this.targetX = opts.targetX !== undefined ? opts.targetX : this.x;
  this.targetY = opts.targetY !== undefined ? opts.targetY : this.y;
  this.entering = true;
  this.entrySpeed = 380 + Math.random() * 120;
  this.entryDelay = opts.entryDelay || 0;
  this.driftVy   = 18 + Math.random() * 8; // slow downward after entry
  this.isBase    = opts.isBase || false;
  this.hitFlash  = 0;
  this.t         = 0;
  this.shootTimer = 2.5 + Math.random() * 2.0;
  this.rockPhase  = Math.random() * Math.PI * 2;
  this.parentStage = opts.parentStage || null;
};

BonusAlienHead.prototype = new Sprite();
BonusAlienHead.prototype.type = OBJECT_ENEMY;

BonusAlienHead.prototype.step = function(dt) {
  if(this.hitFlash > 0) this.hitFlash -= dt * 3;

  // Entry delay
  if(this.entryDelay > 0) { this.entryDelay -= dt; return; }

  this.t += dt;

  if(this.entering) {
    // Fly straight to formation position at speed
    var _dx = this.targetX - this.x, _dy = this.targetY - this.y;
    var _d = Math.sqrt(_dx*_dx + _dy*_dy);
    if(_d < 6) {
      this.x = this.targetX; this.y = this.targetY;
      this.entering = false;
    } else {
      this.x += (_dx/_d) * this.entrySpeed * dt;
      this.y += (_dy/_d) * this.entrySpeed * dt;
    }
  } else {
    // Slow downward drift + gentle side rocking
    this.y += this.driftVy * dt;
    this.x += Math.sin(this.t * 0.9 + this.rockPhase) * 20 * dt;
  }

  // All heads can shoot
  this.shootTimer -= dt;
  if(this.shootTimer <= 0) {
    this.shootTimer = 2.0 + Math.random() * 2.5;
    if(this.y > -10 && this.y < Game.height - 50)
      this.board.add(new EnemyMissile(this.x + this.w/2, this.y + this.h));
  }

  // Player collision
  var player = this.board.collide(this, OBJECT_PLAYER);
  if(player) {
    player.hit(1);
    var ecx = this.x + this.w/2;
    this.board.add(new Explosion(ecx, this.y + this.h/2));
    earnPoints(this.board, ecx, this.y, this.points || 400);
    if(this.parentStage) this.parentStage.bonusKills++;
    this.board.remove(this);
    return;
  }

  if(this.y > Game.height + 100) this.board.remove(this);
};

BonusAlienHead.prototype.hit = function(damage) {
  this.health -= damage;
  this.hitFlash = 1.0;
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      var ecx = this.x + this.w/2;
      var ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, BONUS_HEAD_SIZE));
      earnPoints(this.board, ecx, this.y, this.points || 400);
      if(this.parentStage) this.parentStage.bonusKills++;
      if(Math.random() < 0.3) this.board.add(new PowerUp(ecx, ecy));
    }
  }
};

BonusAlienHead.prototype.draw = function(ctx) {
  var sc = BONUS_HEAD_SIZE / BONUS_HEAD_NAT;
  var half = BONUS_HEAD_NAT / 2;
  ctx.save();
  // Rock ±30° around the displayed center
  ctx.translate(this.x + BONUS_HEAD_SIZE/2, this.y + BONUS_HEAD_SIZE/2);
  ctx.rotate(Math.sin(this.t * 2.5 + this.rockPhase) * Math.PI / 6);
  ctx.scale(sc, sc);
  if(this.hitFlash > 0) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = this.hitFlash * 0.65;
    SpriteSheet.draw(ctx, this.sprite, -half, -half);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }
  SpriteSheet.draw(ctx, this.sprite, -half, -half);
  ctx.restore();
};

// -------------------------------------------------------------------
// Bonus stage formation position generator
function _makeBonusFmPos(ftype, n, size, gap) {
  var step = size + gap;
  var topY = Math.round(Game.height * 0.09);
  var cx   = Math.round(Game.width / 2);
  var positions = [], i, r, c, totalW, lx;
  if(ftype === 0) { // Horizontal line
    totalW = n * step - gap; lx = cx - Math.round(totalW/2);
    for(i = 0; i < n; i++) positions.push({ x: lx + i*step, y: topY });
  } else if(ftype === 1) { // Two rows
    var h1 = Math.ceil(n/2), h2 = n - h1;
    totalW = h1*step-gap; lx = cx - Math.round(totalW/2);
    for(i = 0; i < h1; i++) positions.push({ x: lx + i*step, y: topY });
    totalW = h2*step-gap; lx = cx - Math.round(totalW/2);
    for(i = 0; i < h2; i++) positions.push({ x: lx + i*step, y: topY + step });
  } else if(ftype === 2) { // V-shape
    var half = Math.ceil(n/2), vStep = Math.round(size*0.55);
    for(i = 0; i < half; i++) {
      positions.push({ x: cx - (half-i)*step, y: topY + i*vStep });
      if(positions.length < n) positions.push({ x: cx + i*step + size, y: topY + i*vStep });
    }
  } else if(ftype === 3) { // Diagonal
    totalW = n*step-gap; lx = cx - Math.round(totalW/2);
    for(i = 0; i < n; i++) positions.push({ x: lx + i*step, y: topY + i*Math.round(size*0.42) });
  } else if(ftype === 4) { // Zigzag rows
    var perRow = Math.ceil(n/2); totalW = perRow*step-gap; lx = cx - Math.round(totalW/2);
    var idx = 0;
    for(r = 0; r < 2 && idx < n; r++) {
      var offset = r%2 ? Math.round(step/2) : 0;
      for(c = 0; c < perRow && idx < n; c++, idx++) positions.push({ x: lx + c*step + offset, y: topY + r*step });
    }
  } else if(ftype === 5) { // Wide arc
    totalW = n*step-gap; lx = cx - Math.round(totalW/2);
    for(i = 0; i < n; i++) {
      var arcY = n > 1 ? Math.round(Math.sin((i/(n-1))*Math.PI) * size * 1.2) : 0;
      positions.push({ x: lx + i*step, y: topY + arcY });
    }
  } else { // Three rows
    var pr = Math.ceil(n/3); totalW = pr*step-gap; lx = cx - Math.round(totalW/2);
    var idx3 = 0;
    for(r = 0; r < 3 && idx3 < n; r++)
      for(c = 0; c < pr && idx3 < n; c++, idx3++) positions.push({ x: lx + c*step, y: topY + r*step });
  }
  return positions;
}

var BonusStage = function(onComplete) {
  this.timer        = 60;
  this.spawnTimer   = 0.5;
  this.spawnInterval = 20 + Math.random() * 6; // one formation every 20-26s
  this.active       = true;
  this.onComplete   = onComplete;
  this.bonusKills   = 0;
  this.startPoints  = 0;
};

BonusStage.prototype.init = function(board) {
  this.board = board;
  this.startPoints = Game.points;
};

BonusStage.prototype.spawnRow = function() {
  var SIZE  = BONUS_HEAD_SIZE;
  var gap   = Math.max(10, Math.round(SIZE * 0.18));
  var step  = SIZE + gap;
  var count = 5 + Math.floor(Math.random() * 4); // 5-8 heads
  var maxFit = Math.floor((Game.width * 0.9 + gap) / step);
  count = Math.min(count, maxFit);

  var ftype = Math.floor(Math.random() * 7);
  var positions = _makeBonusFmPos(ftype, count, SIZE, gap);

  // Random entry direction: 0=left, 1=right, 2=top
  var entryDir = Math.floor(Math.random() * 3);
  var margin   = SIZE + 30;

  for(var i = 0; i < positions.length; i++) {
    var tX = positions[i].x, tY = positions[i].y;
    var sX, sY;
    if(entryDir === 0)      { sX = -margin;              sY = tY; }
    else if(entryDir === 1) { sX = Game.width + margin;  sY = tY; }
    else                    { sX = tX;                   sY = -margin; }
    this.board.add(new BonusAlienHead({
      startX: sX, startY: sY,
      targetX: tX, targetY: tY,
      entryDelay: i * 0.13,
      isBase: i === Math.floor(positions.length / 2),
      parentStage: this
    }));
  }
};

BonusStage.prototype.step = function(dt) {
  if(!this.active) return;

  this.timer      -= dt;
  this.spawnTimer -= dt;

  if(this.spawnTimer <= 0) {
    this.spawnTimer = this.spawnInterval;
    this.spawnRow();
  }

  if(this.timer <= 0) {
    this.timer  = 0;
    this.active = false;
    var bonusPts = Game.points - this.startPoints;
    this.board.remove(this);
    if(this.onComplete) this.onComplete(this.bonusKills, bonusPts);
  }
};

BonusStage.prototype.draw = function(ctx) {
  var sec = Math.ceil(Math.max(0, this.timer));
  ctx.save();
  // Positioned top-center but compact — no longer overlaps combo display
  ctx.textAlign = 'center';
  var _hs = Math.min(1.5, Math.max(1.0, Game.width / 640));
  var bx = Game.width / 2;

  // "BONUS STAGE" banner — smaller
  ctx.font = 'bold ' + Math.round(13 * _hs) + 'px monospace';
  ctx.fillStyle = '#FFD700';
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur  = 12;
  ctx.fillText('\u2736 BONUS STAGE \u2736', bx, 18);

  // Countdown — right after banner
  ctx.font = 'bold ' + Math.round(11 * _hs) + 'px monospace';
  var flash = sec <= 10 && Math.floor(this.timer * 4) % 2 === 0;
  ctx.fillStyle   = sec <= 10 ? '#FF4444' : '#00FFFF';
  ctx.shadowColor = ctx.fillStyle;
  ctx.shadowBlur  = 10;
  if(!flash) ctx.fillText(sec + 's', bx, 18 + Math.round(14 * _hs));

  ctx.restore();
};

// ===================================================================
// PATTERN 6: FALLING ROW (row detaches and drops)
// ===================================================================
var FallingRow = function(opts) {
  this.cols = opts.columns || 8;
  var _ss = Game.spriteScale || 1.0;
  this.spacingX = (opts.spacing_x || 48) * _ss;
  this.startY = opts.start_y || -64;
  this.sprite = pickAlien(4); // always from current level pool
  var _frLvlM = currentLevel <= 5 ? 0.25 : Math.min(1.0, 0.25 + (currentLevel - 5) * 0.075);
  this.speed = (opts.down_speed || 80) * _frLvlM;
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

// Kill-streak extra life: +1 life every 25 kills
var sessionKills = 0;
var nextLifeKills = 25;

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


// ===== SHIP SELECTION SYSTEM =====
var _SELECTABLE_SHIPS = [
  'ship',
  'player_ship_1','player_ship_2','player_ship_3','player_ship_4','player_ship_5',
  'player_ship_6','player_ship_7','player_ship_8','player_ship_9','player_ship_10',
  'player_ship_11','player_ship_12','player_ship_13','player_ship_14','player_ship_15',
  'player_ship_16','player_ship_17','player_ship_18','player_ship_19'
];
var _shipSelectThreshold = 30000; // next point milestone to open panel

var ShipSelectScreen = function(callback) {
  Game.paused = true;
  Game.shipSelectOpen = true;
  SoundManager.playAlienSelect();

  // Release pointer lock and show cursor so player can click icons
  var _epl = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
  if(_epl) _epl.call(document);
  Game.canvas.style.cursor = 'default';

  var _self   = this;
  var _ships  = _SELECTABLE_SHIPS;
  var _W      = Game.width;
  var _H      = Game.height;
  var _cols   = _W < 500 ? 4 : 5;
  var _gap    = Math.max(8, Math.floor(_W * 0.025));
  var _icoSz  = Math.min(110, Math.floor((_W * 0.88 - _gap * (_cols + 1)) / _cols));
  var _rows   = Math.ceil(_ships.length / _cols);
  var _gridW  = _cols * _icoSz + (_cols + 1) * _gap;
  var _gridH  = _rows * _icoSz + (_rows + 1) * _gap;
  var _panelH = _gap * 2 + _gridH;
  var _panelW = _gridW + _gap * 2;
  var _panelX = Math.floor((_W - _panelW) / 2);
  var _panelY = Math.floor((_H - _panelH) / 2);
  var _hovered = -1;
  var _currentSprite = (playerShip ? playerShip.sprite : 'ship');
  var _selectedKey = _currentSprite; // tracks player's click-selection before ENTER confirm
  var _t = 0; // animation time

  // Grid origin (inside panel)
  var _gridX = _panelX + _gap;
  var _gridY = _panelY + _gap;

  function _iconRect(i) {
    var col = i % _cols, row = Math.floor(i / _cols);
    return {
      x: _gridX + _gap + col * (_icoSz + _gap),
      y: _gridY + _gap + row * (_icoSz + _gap),
      w: _icoSz, h: _icoSz
    };
  }

  function _close(spriteKey) {
    _self._cleanup();
    Game.setBoard(11, null);
    Game.shipSelectOpen = false;
    Game.paused = false;
    // Hide cursor and re-acquire pointer lock
    Game.canvas.style.cursor = 'none';
    if(!Game.mobile) {
      var _rpl = Game.canvas.requestPointerLock || Game.canvas.mozRequestPointerLock || Game.canvas.webkitRequestPointerLock;
      if(_rpl) _rpl.call(Game.canvas);
    }
    if(callback) callback(spriteKey);
  }

  function _onInput(clientX, clientY) {
    var rect = Game.canvas.getBoundingClientRect();
    var sx = (_W / rect.width)  * (clientX - rect.left);
    var sy = (_H / rect.height) * (clientY - rect.top);
    for(var i = 0; i < _ships.length; i++) {
      var r = _iconRect(i);
      if(sx >= r.x && sx <= r.x + r.w && sy >= r.y && sy <= r.y + r.h) {
        _selectedKey = _ships[i]; // click = highlight only; ENTER confirms
        return;
      }
    }
  }
  function _onMove(clientX, clientY) {
    var rect = Game.canvas.getBoundingClientRect();
    var sx = (_W / rect.width)  * (clientX - rect.left);
    var sy = (_H / rect.height) * (clientY - rect.top);
    _hovered = -1;
    for(var i = 0; i < _ships.length; i++) {
      var r = _iconRect(i);
      if(sx >= r.x && sx <= r.x + r.w && sy >= r.y && sy <= r.y + r.h) { _hovered = i; break; }
    }
  }

  var _clickH = function(e) { _onInput(e.clientX, e.clientY); };
  var _touchH = function(e) {
    if(e.changedTouches && e.changedTouches.length) {
      e.preventDefault();
      _onInput(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
  };
  var _moveH = function(e) { _onMove(e.clientX, e.clientY); };
  var _keyH  = function(e) {
    if(e.keyCode === 13) { // ENTER = confirm
      e.preventDefault();
      _close(_selectedKey);
    }
  };

  Game.canvas.addEventListener('click',     _clickH);
  Game.canvas.addEventListener('touchend',  _touchH, { passive: false });
  Game.canvas.addEventListener('mousemove', _moveH);
  window.addEventListener('keydown', _keyH);

  // Clean up listeners when removed
  this._cleanup = function() {
    Game.canvas.removeEventListener('click',     _clickH);
    Game.canvas.removeEventListener('touchend',  _touchH);
    Game.canvas.removeEventListener('mousemove', _moveH);
    window.removeEventListener('keydown', _keyH);
  };

  this.step = function(dt) { _t += dt; };

  this.draw = function(ctx) {
    // Dark overlay
    ctx.save();
    ctx.globalAlpha = 0.80;
    ctx.fillStyle = '#000010';
    ctx.fillRect(0, 0, _W, _H);
    ctx.globalAlpha = 1;

    // Panel background
    var _bRadius = Math.max(8, Math.floor(_icoSz * 0.12));
    ctx.shadowColor = '#00AAFF';
    ctx.shadowBlur  = 28;
    ctx.fillStyle   = '#05081a';
    _roundRect(ctx, _panelX, _panelY, _panelW, _panelH, _bRadius);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Panel border
    ctx.strokeStyle = '#1144AA';
    ctx.lineWidth   = 2;
    _roundRect(ctx, _panelX, _panelY, _panelW, _panelH, _bRadius);
    ctx.stroke();

    // Ship icons — no text, only visual highlights
    for(var i = 0; i < _ships.length; i++) {
      var r    = _iconRect(i);
      var key  = _ships[i];
      var isCurrent  = (key === _currentSprite);
      var isSelected = (key === _selectedKey);
      var isHov      = (i === _hovered);

      // Icon background
      ctx.fillStyle = isSelected ? '#102060' : (isCurrent ? '#0a2050' : (isHov ? '#0a1535' : '#060d20'));
      ctx.shadowColor = isSelected ? '#FFDD00' : (isCurrent ? '#00CCFF' : (isHov ? '#3366FF' : 'transparent'));
      ctx.shadowBlur  = isSelected ? 28 : (isCurrent ? 16 : (isHov ? 10 : 0));
      _roundRect(ctx, r.x, r.y, r.w, r.h, Math.floor(_icoSz * 0.1));
      ctx.fill();
      ctx.shadowBlur = 0;

      // Icon border
      ctx.strokeStyle = isSelected ? '#FFDD00' : (isCurrent ? '#00CCFF' : (isHov ? '#4488FF' : '#1a2a4a'));
      ctx.lineWidth   = isSelected ? 3 : (isCurrent ? 2.5 : 1.5);
      _roundRect(ctx, r.x, r.y, r.w, r.h, Math.floor(_icoSz * 0.1));
      ctx.stroke();

      // Ship sprite
      var _pad = Math.floor(_icoSz * 0.1);
      SpriteSheet.draw(ctx, key, r.x + _pad, r.y + _pad, 0, r.w - _pad * 2, r.h - _pad * 2);
    }

    ctx.restore();
  };
};

// Helper: draw a rounded rectangle path
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

  // Ship select every 30000 pts
  if(Game.points >= _shipSelectThreshold && !Game.paused && playerShip) {
    _shipSelectThreshold += 30000;
    Game.setBoard(11, new ShipSelectScreen(function(key) {
      if(playerShip) playerShip.changeShip(key);
    }));
  }

  // Kill-milestone: every 25 kills → +1 life (shows in heart HUD)
  sessionKills++;
  if(sessionKills >= nextLifeKills) {
    nextLifeKills += 25;
    playerLives = Math.min(playerLives + 1, 9);
  }
  return earned;
};

// Global player ship reference (set in PlayerShip constructor)
var playerShip = null;

var startGame = function() {
  // Initialize sound system
  SoundManager.init();

  var ua = navigator.userAgent.toLowerCase();

  // Starfields + Background objects (all behind enemies)
  Game.setBoard(0,new Starfield(20,0.5,350,true));
  Game.setBoard(1,new Starfield(50,0.7,280));
  Game.setBoard(2,new BackgroundObjectsSystem()); // Planets, asteroids, rocks + shooting stars/comets
  if(!Game.mobile) {
    Game.setBoard(2.5,new EnergyParticlesSystem()); // Desktop only (performance)
  }
  var startPrompt = Game.mobile ? "Tap FIRE button to start" : "Press fire to start playing";
  Game.setBoard(9,new TitleScreen("Alien Invasion", startPrompt, function() {
    Game.setBoard(9, new LevelTransitionScreen(0, 1, playGame));
  }));
};

// Current level tracker
var currentLevel = 1;
var playerHitStreak = 0; // consecutive hit streak → missile speed boost
var maxLevel = 36; // 3 full cycles of 12 levels
var infiniteLoopMode = false;

var activateInfiniteLoop = function() {
  infiniteLoopMode = true;
  maxLevel = Number.POSITIVE_INFINITY;
  return true;
};

window.activate_infinite_loop = activateInfiniteLoop;
window.activateInfiniteLoop = activateInfiniteLoop;

var startBonusStage = function() {
  if(!SoundManager.isMusicPlaying()) SoundManager.startMusic();
  var board = new GameBoard();
  board.add(new PlayerShip());
  board.add(new BonusStage(function(kills, bonusPts) {
    SoundManager.playLevelComplete();
    var msg = 'Kills: ' + kills + '   +' + bonusPts + ' pts';
    var prompt = Game.mobile ? 'Tap FIRE for Level ' + currentLevel : 'Press fire for Level ' + currentLevel;
    Game.setBoard(9, new TitleScreen('\u03a4\u03ad\u03bb\u03bf\u03c2 Bonus Stage!', msg + '  |  ' + prompt, playGame));
  }));
  Game.setBoard(9, board);
  Game.setBoard(5, new GamePoints(0));
  Game.setBoard(6, new GameLives());
  Game.setBoard(7, new GameLevel());
};

var playGame = function() {
  Game.playing = true;
  Game.paused = false;
  // Request pointer lock (desktop only)
  if(!Game.mobile) {
    var _rpl = Game.canvas.requestPointerLock || Game.canvas.mozRequestPointerLock || Game.canvas.webkitRequestPointerLock;
    if(_rpl) _rpl.call(Game.canvas);
  }
  // Only reset lives/kills when starting from level 1 (new game), not when advancing levels
  if(currentLevel === 1) {
    playerLives = PLAYER_LIVES;
    sessionKills = 0;
    nextLifeKills = 25;
    _shipSelectThreshold = 30000;
    Game.points = 0;
    Game.godMode = false;
    Game._godComboHeld = false;
    Game._godMsgTimer = 0;
  }
  if(!SoundManager.isMusicPlaying()) SoundManager.startMusic();
  var board = new GameBoard();
  board.add(new PlayerShip());

  // Level roster: plain arrays = normal levels, objects {pool, data} = species stages
  // spacemen are background objects now — NOT enemies
  var levels = [
    level1, level2, level3, level4, level5,
    { pool: pool_butterflies, data: level_butterflies_data },
    level_boss_small_data,
    { pool: pool_beetles,     data: level_beetles_data },
    { pool: pool_spiders,     data: level_spiders_data },
    level_boss_medium_data,
    { pool: pool_bats,        data: level_bats_data },
    { pool: pool_chameleons,  data: level_chameleons_data },
    level_boss_large_data,
    { pool: pool_strange,     data: level_strange_data },
    { pool: pool_nees2,       data: level_nees2_data },
    { pool: pool_lions,       data: level_lions_data },
    level_boss_large_data,
    { pool: pool_bees,        data: level_bees_data },
    { pool: pool_monsters,    data: level_monsters_data },
    { pool: pool_hawks,       data: level_hawks_data },
    level_boss_large_data,
    { pool: pool_exthos_a,    data: level_exthos_a_data },
    { pool: pool_exthos_b,    data: level_exthos_b_data },
    { pool: pool_exthos_c,    data: level_exthos_c_data },
    { pool: pool_exthos_d,    data: level_exthos_d_data },
    { pool: pool_exthos_f,    data: level_exthos_f1_data },
    { pool: pool_exthos_f,    data: level_exthos_f2_data },
    { pool: pool_exthos_f,    data: level_exthos_f3_data },
    { pool: pool_exthos_f,    data: level_exthos_f4_data },
    level_final_boss_data
  ];
  var levelIndex = (currentLevel - 1) % levels.length;
  var levelEntry = levels[levelIndex];

  // Handle species levels vs regular levels
  var levelData;
  if(Array.isArray(levelEntry)) {
    currentLevelPool = null;        // Normal level: use allAlienPool sliding window
    levelData = levelEntry;
  } else {
    currentLevelPool = levelEntry.pool || null;  // Species level: lock to species pool
    levelData = levelEntry.data;
  }

  board.add(new Level(levelData, function() {
    // Level complete callback
    if(infiniteLoopMode || currentLevel < maxLevel) {
      currentLevel++;
      SoundManager.playLevelComplete();
      // Every 5 levels → +1 life bonus
      if((currentLevel - 1) % 5 === 0) {
        playerLives = Math.min(playerLives + 1, 9);
      }
      // Every 5 levels → Bonus Stage
      if((currentLevel - 1) % 5 === 0) {
        Game.setBoard(9, new LevelTransitionScreen(currentLevel - 1, currentLevel, startBonusStage));
      } else {
        Game.setBoard(9, new LevelTransitionScreen(currentLevel - 1, currentLevel, playGame));
      }
    } else {
      // Won the game!
      currentLevel = 1; // Reset for next play
      Game.motherShipCount = 0;
      winGame();
    }
  }));

  Game.setBoard(9,board);
  Game.setBoard(5,new GamePoints(0));
  Game.setBoard(6,new GameLives());
  Game.setBoard(7,new GameLevel()); // Show current level
};

// ===== LEVEL 1 - EASY =====
var level1 = [
  // WAVE 1: Space Invaders grid (8 rows, different sprites per row)
  [ 0,       1000,   99999, 'grid_formation', { rows: 8, columns: 8, spacing_x: 70, spacing_y: 55, start_x: 64, start_y: 30, initial_speed: 30, cooldown_ms: 1500, diveCooldown: 4 } ],

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
  [ 32000,   33500,  2000,  'mother_small' ]
];

// ===== LEVEL 2 - MEDIUM =====
var level2 = [
  // WAVE 1: Grid (bigger) - 8 rows
  [ 0,       1000,   99999, 'grid_formation', { rows: 8, columns: 9, spacing_x: 68, spacing_y: 55, start_x: 48, start_y: 30, initial_speed: 40, cooldown_ms: 1200, diveCooldown: 3.5 } ],

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

  // WAVE 5: ZigZag enemies (new sin-wave movement)
  [ 32000,   38000,  2000,  'zigzag_enemy' ],

  // WAVE 6: Swoops
  [ 38000,   44000,  1500,  'swoop_left' ],
  [ 38000,   44000,  1500,  'swoop_right' ],

  // WAVE 7: Mother ship
  [ 44000,   45500,  2000,  'mother_medium' ]
];

// ===== LEVEL 3 - HARD =====
var level3 = [
  // WAVE 1: Dense grid - 8 rows
  [ 0,       1000,   99999, 'grid_formation', { rows: 8, columns: 10, spacing_x: 68, spacing_y: 55, start_x: 40, start_y: 30, initial_speed: 45, cooldown_ms: 1000, diveCooldown: 3 } ],

  // Bonus flyby (faster)
  [ 4000,    40000,  6000,  'bonus_flyby', { speed: 90 } ],

  // WAVE 2: Falling row
  [ 10000,   11000,  99999, 'falling_row', { columns: 6, spacing_x: 52, down_speed: 50 } ],

  // WAVE 3: Figure-8 + swoops together!
  [ 14000,   20000,  2000,  'fig8_left' ],
  [ 14000,   20000,  2000,  'fig8_right' ],
  [ 16000,   22000,  1500,  'swoop_left' ],
  [ 16000,   22000,  1500,  'swoop_right' ],

  // WAVE 4: ZigZag enemies + spiral enemies + corkscrews
  [ 22000,   28000,  1800,  'zigzag_enemy' ],
  [ 23000,   29000,  2200,  'spiral_enemy' ],
  [ 24000,   30000,  1500,  'cork_left' ],
  [ 24000,   30000,  1500,  'cork_right' ],

  // WAVE 5: Falling row 2
  [ 28000,   29000,  99999, 'falling_row', { columns: 8, spacing_x: 48, down_speed: 55, sprite: 'enemy_blue_ship' } ],

  // WAVE 6: Boomerangs while mother appears
  [ 30000,   36000,  1500,  'boomerang_left' ],
  [ 30000,   36000,  1500,  'boomerang_right' ],
  [ 32000,   33500,  2000,  'mother_small' ],
  [ 36000,   37500,  2000,  'mother_medium' ]
];

// ===== LEVEL 4 - VERY HARD =====
var level4 = [
  // WAVE 1: Full grid - 8 rows
  [ 0,       1000,   99999, 'grid_formation', { rows: 8, columns: 11, spacing_x: 68, spacing_y: 55, start_x: 32, start_y: 30, initial_speed: 50, cooldown_ms: 800, min_cooldown_ms: 200, diveCooldown: 2.5 } ],

  // Bonus flyby
  [ 3000,    50000,  5000,  'bonus_flyby', { speed: 100 } ],

  // WAVE 2: Double falling rows
  [ 8000,    9000,   99999, 'falling_row', { columns: 8, spacing_x: 48, down_speed: 55 } ],
  [ 12000,   13000,  99999, 'falling_row', { columns: 6, spacing_x: 52, down_speed: 65, sprite: 'enemy_green_creature' } ],

  // WAVE 3: Swoops + figure-8 combo
  [ 16000,   22000,  1200,  'swoop_left' ],
  [ 16000,   22000,  1200,  'swoop_right' ],
  [ 18000,   24000,  2000,  'fig8_left' ],
  [ 18000,   24000,  2000,  'fig8_right' ],

  // WAVE 4: Corkscrews + ZigZag/Spiral enemies + pendulums
  [ 24000,   30000,  1200,  'cork_left' ],
  [ 24000,   30000,  1200,  'cork_right' ],
  [ 26000,   32000,  1500,  'zigzag_enemy' ],
  [ 27000,   33000,  1800,  'spiral_enemy' ],
  [ 28000,   34000,  1500,  'pendulum' ],

  // WAVE 5: Boomerangs everywhere
  [ 33000,   38000,  1000,  'boomerang_left' ],
  [ 33000,   38000,  1000,  'boomerang_right' ],

  // WAVE 6: Large mother ship
  [ 38000,   39500,  2000,  'mother_large' ]
];

// ===== LEVEL 5 - FINAL BOSS =====
var level5 = [
  // WAVE 1: Massive fast grid - 8 rows
  [ 0,       1000,   99999, 'grid_formation', { rows: 8, columns: 11, spacing_x: 68, spacing_y: 55, start_x: 32, start_y: 30, initial_speed: 55, cooldown_ms: 600, min_cooldown_ms: 150, diveCooldown: 2 } ],

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
  [ 26000,   27000,  99999, 'falling_row', { columns: 8, spacing_x: 48, down_speed: 70 } ],

  // WAVE 6: S-curves + swoops
  [ 31000,   36000,  1000,  'scurve_left' ],
  [ 31000,   36000,  1000,  'scurve_right' ],
  [ 33000,   38000,  800,   'swoop_left' ],
  [ 33000,   38000,  800,   'swoop_right' ],

  // WAVE 7: Pre-boss mothers
  [ 38000,   39500,  2000,  'mother_medium' ],
  [ 42000,   43500,  2000,  'mother_large' ],

  // WAVE 8: FINAL BOSS
  [ 55000,   56500,  2000,  'final_boss' ]
];

// ===================================================================
// SPECIES POOLS — one pool per new species folder
// ===================================================================
var pool_butterflies = [
  'butterfly_1','butterfly_2','butterfly_3','butterfly_4',
  'butterfly_5','butterfly_6','butterfly_7','butterfly_8'
];
var pool_beetles = [
  'beetle_s_1','beetle_s_2','beetle_s_3','beetle_s_4',
  'beetle_s_5','beetle_s_6','beetle_s_7'
];
var pool_spiders = [
  'spider_s_1','spider_s_2','spider_s_3','spider_s_4',
  'spider_s_5','spider_s_6','spider_s_7','spider_s_8'
];
var pool_bats = ['bat_s_1','bat_s_2','bat_s_3'];
var pool_chameleons = ['chameleon_s_1','chameleon_s_2','chameleon_s_3','chameleon_s_4'];
var pool_strange = [
  'strange_s_1','strange_s_2','strange_s_3','strange_s_4','strange_s_5',
  'strange_s_6','strange_s_7','strange_s_8','strange_s_9','strange_s_10',
  'strange_s_11','strange_s_12','strange_s_13','strange_s_14'
];
var pool_spacemen = [
  'spaceman_1','spaceman_2','spaceman_3','spaceman_4','spaceman_5','spaceman_6'
];
var pool_nees2 = [
  'alien_n2_01','alien_n2_02','alien_n2_03','alien_n2_04','alien_n2_05',
  'alien_n2_06','alien_n2_07','alien_n2_08','alien_n2_09','alien_n2_10',
  'alien_n2_11','alien_n2_12','alien_n2_13','alien_n2_14','alien_n2_15',
  'alien_n2_16','alien_n2_17','alien_n2_18','alien_n2_19','alien_n2_20',
  'alien_n2_21','alien_n2_22'
];
var pool_lions = [
  'lion_s_1','lion_s_2','lion_s_3','lion_s_4','lion_s_5',
  'lion_s_6','lion_s_7','lion_s_8','lion_s_9','lion_s_10'
];
var pool_bees = [
  'bee_s_1','bee_s_2','bee_s_3','bee_s_4','bee_s_5',
  'bee_s_6','bee_s_7','bee_s_8','bee_s_9','bee_s_10'
];
var pool_monsters = [
  'monster_s_1','monster_s_2','monster_s_3','monster_s_4',
  'monster_s_5','monster_s_6','monster_s_7','monster_s_8'
];
var pool_hawks = [
  'hawk_s_1','hawk_s_2','hawk_s_3','hawk_s_4','hawk_s_5',
  'hawk_s_6','hawk_s_7','hawk_s_8','hawk_s_9','hawk_s_10',
  'hawk_s_11','hawk_s_12','hawk_s_13','hawk_s_14','hawk_s_15',
  'hawk_s_16','hawk_s_17'
];
var pool_exthos_a = [
  'exthos_a_1','exthos_a_2','exthos_a_3','exthos_a_4','exthos_a_5',
  'exthos_a_6','exthos_a_7','exthos_a_8','exthos_a_9','exthos_a_10',
  'exthos_a_11','exthos_a_12','exthos_a_13','exthos_a_14','exthos_a_15',
  'exthos_a_16','exthos_a_17','exthos_a_18','exthos_a_19','exthos_a_20'
];
var pool_exthos_b = [
  'exthos_b_1','exthos_b_2','exthos_b_3','exthos_b_4','exthos_b_5',
  'exthos_b_6','exthos_b_7','exthos_b_8','exthos_b_9','exthos_b_10',
  'exthos_b_11','exthos_b_12','exthos_b_13','exthos_b_14','exthos_b_15',
  'exthos_b_16','exthos_b_17','exthos_b_18','exthos_b_19','exthos_b_20',
  'exthos_b_21','exthos_b_22','exthos_b_23','exthos_b_24','exthos_b_25',
  'exthos_b_26','exthos_b_27'
];
var pool_exthos_c = [
  'exthos_c_1','exthos_c_2','exthos_c_3','exthos_c_4','exthos_c_5',
  'exthos_c_6','exthos_c_7','exthos_c_8','exthos_c_9','exthos_c_10',
  'exthos_c_11','exthos_c_12','exthos_c_13','exthos_c_14','exthos_c_15',
  'exthos_c_16'
];

var pool_exthos_e = [
  'exthos_e_1','exthos_e_2','exthos_e_3','exthos_e_4','exthos_e_5','exthos_e_6','exthos_e_7','exthos_e_8','exthos_e_9','exthos_e_10','exthos_e_11','exthos_e_12','exthos_e_13','exthos_e_14','exthos_e_15','exthos_e_16','exthos_e_17','exthos_e_18','exthos_e_19','exthos_e_20','exthos_e_21','exthos_e_22','exthos_e_23','exthos_e_24','exthos_e_25','exthos_e_26'
];
var pool_nea_terata = [
  'nea_t_1','nea_t_2','nea_t_3','nea_t_4','nea_t_5','nea_t_6','nea_t_7','nea_t_8','nea_t_9','nea_t_10','nea_t_11','nea_t_12','nea_t_13','nea_t_14','nea_t_15','nea_t_16','nea_t_17','nea_t_18','nea_t_19','nea_t_20','nea_t_21','nea_t_22','nea_t_23','nea_t_24','nea_t_25','nea_t_26','nea_t_27','nea_t_28','nea_t_29','nea_t_30','nea_t_31','nea_t_32'
];
var pool_skoures = ['skoura_s_1','skoura_s_2','skoura_s_3'];
var pool_mavris_tribes = ['tribe_s_1','tribe_s_2'];
var pool_exthos_d = [
  'exthos_d_1','exthos_d_2','exthos_d_3','exthos_d_4','exthos_d_5',
  'exthos_d_6','exthos_d_7','exthos_d_8','exthos_d_9','exthos_d_10',
  'exthos_d_11','exthos_d_12','exthos_d_13','exthos_d_14','exthos_d_15',
  'exthos_d_16','exthos_d_17','exthos_d_18','exthos_d_19','exthos_d_20',
  'exthos_d_21','exthos_d_22','exthos_d_23','exthos_d_24','exthos_d_25',
  'exthos_d_26'
];
var pool_exthos_f = [
  'exthos_f_1','exthos_f_2','exthos_f_3','exthos_f_4','exthos_f_5',
  'exthos_f_6','exthos_f_7','exthos_f_8','exthos_f_9','exthos_f_10',
  'exthos_f_11','exthos_f_12','exthos_f_13','exthos_f_14','exthos_f_15',
  'exthos_f_16','exthos_f_17','exthos_f_18','exthos_f_19','exthos_f_20',
  'exthos_f_21','exthos_f_22'
];

// ===================================================================
// LEVEL 6 — ΠΕΤΑΛΟΥΔΕΣ (Butterflies) — graceful figure-8 stage
// ===================================================================
var level_butterflies_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 6, columns: 8, spacing_x: 60, spacing_y: 55, start_y: 30, initial_speed: 38, cooldown_ms: 1300, diveCooldown: 4 } ],
  [ 5000,    40000, 8000,  'bonus_flyby',    { speed: 78 } ],
  [ 10000,   18000, 2500,  'fig8_left' ],
  [ 11000,   19000, 2500,  'fig8_right' ],
  [ 18000,   26000, 2200,  'scurve_left' ],
  [ 18000,   26000, 2200,  'scurve_right' ],
  [ 26000,   33000, 1800,  'swoop_left' ],
  [ 26000,   33000, 1800,  'swoop_right' ],
  [ 33000,   40000, 2000,  'zigzag_enemy' ],
  [ 40000,   41500, 2000,  'mother_small' ]
];

// ===================================================================
// LEVEL 7 — ΣΚΑΡΘΑΡΙΑ (Beetles) — heavy grid + falling rows
// ===================================================================
var level_beetles_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 7, columns: 9, spacing_x: 58, spacing_y: 52, start_y: 30, initial_speed: 42, cooldown_ms: 1100, diveCooldown: 3.5 } ],
  [ 4000,    45000, 7000,  'bonus_flyby',    { speed: 85 } ],
  [ 8000,    9000,  99999, 'falling_row',    { columns: 6, spacing_x: 52, down_speed: 52 } ],
  [ 14000,   22000, 1800,  'boomerang_left' ],
  [ 14000,   22000, 1800,  'boomerang_right' ],
  [ 22000,   30000, 2000,  'zigzag_enemy' ],
  [ 23000,   31000, 2500,  'spiral_enemy' ],
  [ 28000,   29000, 99999, 'falling_row',    { columns: 8, spacing_x: 48, down_speed: 60 } ],
  [ 32000,   39000, 1500,  'swoop_left' ],
  [ 32000,   39000, 1500,  'swoop_right' ],
  [ 40000,   41500, 2000,  'mother_medium' ]
];

// ===================================================================
// LEVEL 8 — ARACHNES (Spiders) — spirals & zigzag web patterns
// ===================================================================
var level_spiders_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 7, columns: 8, spacing_x: 60, spacing_y: 52, start_y: 30, initial_speed: 45, cooldown_ms: 1000, diveCooldown: 3 } ],
  [ 4000,    45000, 7000,  'bonus_flyby',    { speed: 88 } ],
  [ 10000,   18000, 1800,  'spiral_enemy' ],
  [ 11000,   19000, 2000,  'spiral_enemy' ],
  [ 19000,   27000, 1600,  'zigzag_enemy' ],
  [ 20000,   28000, 1600,  'zigzag_enemy' ],
  [ 27000,   34000, 1400,  'cork_left' ],
  [ 27000,   34000, 1400,  'cork_right' ],
  [ 34000,   41000, 1600,  'swoop_left' ],
  [ 34000,   41000, 1600,  'swoop_right' ],
  [ 42000,   43500, 2000,  'mother_medium' ]
];

// ===================================================================
// LEVEL 9 — NICTRIDES (Bats) — swoops & boomerangs (only 3 sprites)
// ===================================================================
var level_bats_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 5, columns: 7, spacing_x: 62, spacing_y: 55, start_y: 30, initial_speed: 50, cooldown_ms: 900, diveCooldown: 3 } ],
  [ 3000,    45000, 6000,  'bonus_flyby',    { speed: 92 } ],
  [ 8000,    16000, 1200,  'swoop_left' ],
  [ 8000,    16000, 1200,  'swoop_right' ],
  [ 16000,   24000, 1400,  'boomerang_left' ],
  [ 16000,   24000, 1400,  'boomerang_right' ],
  [ 24000,   32000, 1500,  'fig8_left' ],
  [ 24000,   32000, 1500,  'fig8_right' ],
  [ 32000,   39000, 1200,  'swoop_left' ],
  [ 32000,   39000, 1200,  'swoop_right' ],
  [ 40000,   41500, 2000,  'mother_medium' ]
];

// ===================================================================
// LEVEL 10 — ΧΑΜΑΙΛΕΟΝΤΕΣ (Chameleons) — mixed tricky patterns
// ===================================================================
var level_chameleons_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 6, columns: 8, spacing_x: 60, spacing_y: 52, start_y: 30, initial_speed: 48, cooldown_ms: 950, diveCooldown: 2.8 } ],
  [ 3000,    45000, 6500,  'bonus_flyby',    { speed: 95 } ],
  [ 8000,    9000,  99999, 'falling_row',    { columns: 5, spacing_x: 54, down_speed: 55 } ],
  [ 12000,   20000, 2000,  'scurve_left' ],
  [ 12000,   20000, 2000,  'scurve_right' ],
  [ 20000,   28000, 1800,  'fig8_left' ],
  [ 20000,   28000, 1800,  'fig8_right' ],
  [ 28000,   36000, 1500,  'spiral_enemy' ],
  [ 29000,   37000, 1500,  'zigzag_enemy' ],
  [ 36000,   43000, 1300,  'boomerang_left' ],
  [ 36000,   43000, 1300,  'boomerang_right' ],
  [ 44000,   45500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 11 — ΠΑΡΑΞΕΝΑ ΝΕΑ ΖΩΑ (Strange creatures) — maximum variety
// ===================================================================
var level_strange_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 7, columns: 9, spacing_x: 58, spacing_y: 52, start_y: 30, initial_speed: 50, cooldown_ms: 900, diveCooldown: 2.5 } ],
  [ 3000,    50000, 5500,  'bonus_flyby',    { speed: 100 } ],
  [ 7000,    8000,  99999, 'falling_row',    { columns: 7, spacing_x: 50, down_speed: 58 } ],
  [ 12000,   20000, 1600,  'fig8_left' ],
  [ 12000,   20000, 1600,  'fig8_right' ],
  [ 18000,   26000, 1400,  'zigzag_enemy' ],
  [ 19000,   27000, 1800,  'spiral_enemy' ],
  [ 22000,   23000, 99999, 'falling_row',    { columns: 8, spacing_x: 48, down_speed: 65 } ],
  [ 26000,   34000, 1300,  'cork_left' ],
  [ 26000,   34000, 1300,  'cork_right' ],
  [ 34000,   42000, 1200,  'swoop_left' ],
  [ 34000,   42000, 1200,  'swoop_right' ],
  [ 38000,   46000, 1400,  'boomerang_left' ],
  [ 38000,   46000, 1400,  'boomerang_right' ],
  [ 46000,   47500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 12 — SPACE MAN — kamikaze swoops + zigzag assault
// ===================================================================
var level_spacemen_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 7, columns: 9, spacing_x: 60, spacing_y: 50, start_y: 30, initial_speed: 52, cooldown_ms: 850, diveCooldown: 2.5 } ],
  [ 3000,    50000, 5500,  'bonus_flyby',    { speed: 105 } ],
  [ 8000,    16000, 1000,  'swoop_left' ],
  [ 8000,    16000, 1000,  'swoop_right' ],
  [ 16000,   24000, 1400,  'zigzag_enemy' ],
  [ 17000,   25000, 1200,  'zigzag_enemy' ],
  [ 24000,   32000, 1500,  'spiral_enemy' ],
  [ 25000,   33000, 1800,  'fig8_left' ],
  [ 32000,   40000, 1000,  'swoop_left' ],
  [ 32000,   40000, 1000,  'swoop_right' ],
  [ 38000,   46000, 1200,  'boomerang_left' ],
  [ 38000,   46000, 1200,  'boomerang_right' ],
  [ 47000,   48500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 13 — NEES 2 MIX — epic 22-sprite creature invasion
// ===================================================================
var level_nees2_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 8, columns: 10, spacing_x: 55, spacing_y: 50, start_y: 30, initial_speed: 55, cooldown_ms: 800, diveCooldown: 2.2 } ],
  [ 3000,    55000, 5000,  'bonus_flyby',    { speed: 110 } ],
  [ 6000,    7000,  99999, 'falling_row',    { columns: 7, spacing_x: 50, down_speed: 60 } ],
  [ 10000,   18000, 1200,  'fig8_left' ],
  [ 10000,   18000, 1200,  'fig8_right' ],
  [ 16000,   24000, 1100,  'zigzag_enemy' ],
  [ 17000,   25000, 1400,  'spiral_enemy' ],
  [ 24000,   32000, 1100,  'cork_left' ],
  [ 24000,   32000, 1100,  'cork_right' ],
  [ 26000,   27000, 99999, 'falling_row',    { columns: 9, spacing_x: 46, down_speed: 70 } ],
  [ 32000,   40000, 900,   'swoop_left' ],
  [ 32000,   40000, 900,   'swoop_right' ],
  [ 36000,   44000, 1000,  'boomerang_left' ],
  [ 36000,   44000, 1000,  'boomerang_right' ],
  [ 40000,   48000, 1200,  'scurve_left' ],
  [ 40000,   48000, 1200,  'scurve_right' ],
  [ 48000,   49500, 2000,  'mother_medium' ],
  [ 53000,   54500, 2000,  'final_boss' ]
];

// ===================================================================
// BOSS-ONLY STAGES — pure boss battles (no species pool)
// ===================================================================
var level_boss_small_data = [
  [ 0,    1000, 3500, 'swoop_left' ],
  [ 0,    1000, 3500, 'swoop_right' ],
  [ 4000, 5000, 2000, 'mother_small' ]
];
var level_boss_medium_data = [
  [ 0,    1000, 3000, 'fig8_left' ],
  [ 0,    1000, 3000, 'fig8_right' ],
  [ 4500, 5500, 2000, 'mother_medium' ]
];
var level_boss_large_data = [
  [ 0,    1000, 2500, 'cork_left' ],
  [ 1000, 2000, 2500, 'cork_right' ],
  [ 5000, 6000, 2000, 'mother_large' ]
];
var level_final_boss_data = [
  [ 0,    1000, 4000, 'swoop_left' ],
  [ 0,    1000, 4000, 'swoop_right' ],
  [ 2000, 3000, 3000, 'fig8_left' ],
  [ 2000, 3000, 3000, 'fig8_right' ],
  [ 6000, 7500, 2000, 'final_boss' ]
];

// ===================================================================
// LEVEL 14 — ΛΙΟΝΤΑΡΙΑ (Lions) — aggressive charge patterns
// ===================================================================
var level_lions_data = [
  // Grid wave 1
  [ 0,       1000,  99999, 'grid_formation', { rows: 4, columns: 8, spacing_x: 60, spacing_y: 52, start_y: 30, initial_speed: 36, cooldown_ms: 1400, diveCooldown: 3.5 } ],
  [ 4000,    45000, 7500,  'bonus_flyby',    { speed: 75 } ],
  [ 9000,    17000, 2200,  'boomerang_left' ],
  [ 9000,    17000, 2200,  'boomerang_right' ],
  // Grid wave 2: tighter columns, different feel
  [ 17000,   18000, 99999, 'grid_formation', { rows: 3, columns: 10, spacing_x: 50, spacing_y: 50, start_y: 25, initial_speed: 36, cooldown_ms: 1400, diveCooldown: 3.5 } ],
  [ 19000,   27000, 2000,  'fig8_left' ],
  [ 19000,   27000, 2000,  'fig8_right' ],
  [ 27000,   35000, 1800,  'swoop_left' ],
  [ 27000,   35000, 1800,  'swoop_right' ],
  [ 35000,   43000, 2000,  'zigzag_enemy' ],
  [ 44000,   45500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 15 — ΜΕΛΙΣΣΕΣ (Bees) — swarms & spirals
// ===================================================================
var level_bees_data = [
  // Grid wave 1: wide swarm
  [ 0,       1000,  99999, 'grid_formation', { rows: 4, columns: 9, spacing_x: 54, spacing_y: 50, start_y: 28, initial_speed: 38, cooldown_ms: 1200, diveCooldown: 3.2 } ],
  [ 3000,    50000, 8000,  'bonus_flyby',    { speed: 77 } ],
  [ 8000,    16000, 2200,  'spiral_enemy' ],
  [ 9000,    17000, 2200,  'spiral_enemy' ],
  // Grid wave 2: dense cluster
  [ 16000,   17000, 99999, 'grid_formation', { rows: 3, columns: 11, spacing_x: 44, spacing_y: 48, start_y: 25, initial_speed: 38, cooldown_ms: 1200, diveCooldown: 3.2 } ],
  [ 18000,   26000, 1800,  'cork_left' ],
  [ 18000,   26000, 1800,  'cork_right' ],
  [ 26000,   34000, 1900,  'zigzag_enemy' ],
  [ 27000,   35000, 2000,  'scurve_left' ],
  [ 27000,   35000, 2000,  'scurve_right' ],
  [ 36000,   37500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 16 — ΝΕΑ ΤΕΡΑΤΑ (New monsters) — heavy assault
// ===================================================================
var level_monsters_data = [
  // Grid wave 1
  [ 0,       1000,  99999, 'grid_formation', { rows: 4, columns: 8, spacing_x: 58, spacing_y: 52, start_y: 30, initial_speed: 40, cooldown_ms: 1200, diveCooldown: 3.0 } ],
  [ 3000,    50000, 8000,  'bonus_flyby',    { speed: 80 } ],
  [ 7000,    8000,  99999, 'falling_row',    { columns: 6, spacing_x: 52, down_speed: 42 } ],
  [ 11000,   19000, 2000,  'boomerang_left' ],
  [ 11000,   19000, 2000,  'boomerang_right' ],
  // Grid wave 2: wider formation
  [ 19000,   20000, 99999, 'grid_formation', { rows: 3, columns: 10, spacing_x: 48, spacing_y: 50, start_y: 25, initial_speed: 40, cooldown_ms: 1200, diveCooldown: 3.0 } ],
  [ 21000,   29000, 2000,  'spiral_enemy' ],
  [ 22000,   30000, 2200,  'zigzag_enemy' ],
  [ 30000,   38000, 1800,  'swoop_left' ],
  [ 30000,   38000, 1800,  'swoop_right' ],
  [ 39000,   40500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 17 — ΓΕΡΑΚΙΑ (Hawks) — swoops & dive attacks
// ===================================================================
var level_hawks_data = [
  // Grid wave 1: dive-heavy formation
  [ 0,       1000,  99999, 'grid_formation', { rows: 4, columns: 8, spacing_x: 58, spacing_y: 52, start_y: 30, initial_speed: 42, cooldown_ms: 1300, diveCooldown: 3.0 } ],
  [ 3000,    50000, 8000,  'bonus_flyby',    { speed: 82 } ],
  [ 7000,    15000, 1900,  'swoop_left' ],
  [ 7000,    15000, 1900,  'swoop_right' ],
  // Grid wave 2: different angle
  [ 15000,   16000, 99999, 'grid_formation', { rows: 3, columns: 9, spacing_x: 52, spacing_y: 50, start_y: 25, initial_speed: 42, cooldown_ms: 1300, diveCooldown: 3.0 } ],
  [ 17000,   25000, 2000,  'fig8_left' ],
  [ 17000,   25000, 2000,  'fig8_right' ],
  [ 25000,   33000, 2000,  'cork_left' ],
  [ 25000,   33000, 2000,  'cork_right' ],
  [ 33000,   41000, 2000,  'boomerang_left' ],
  [ 33000,   41000, 2000,  'boomerang_right' ],
  [ 42000,   43500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 18 — ΕΧΘΡΟΙ Α (Exthos Group A) — heavy zigzag assault
// ===================================================================
var level_exthos_a_data = [
  // Grid wave 1
  [ 0,       1000,  99999, 'grid_formation', { rows: 4, columns: 8, spacing_x: 58, spacing_y: 52, start_y: 30, initial_speed: 44, cooldown_ms: 1200, diveCooldown: 2.8 } ],
  [ 3000,    50000, 7500,  'bonus_flyby',    { speed: 84 } ],
  [ 7000,    15000, 1800,  'zigzag_enemy' ],
  [ 8000,    16000, 2000,  'zigzag_enemy' ],
  // Grid wave 2: tighter
  [ 16000,   17000, 99999, 'grid_formation', { rows: 3, columns: 10, spacing_x: 50, spacing_y: 50, start_y: 25, initial_speed: 44, cooldown_ms: 1200, diveCooldown: 2.8 } ],
  [ 7000,    8000,  99999, 'falling_row',    { columns: 6, spacing_x: 52, down_speed: 48 } ],
  [ 18000,   26000, 2000,  'spiral_enemy' ],
  [ 19000,   27000, 2200,  'boomerang_left' ],
  [ 19000,   27000, 2200,  'boomerang_right' ],
  [ 27000,   35000, 1800,  'swoop_left' ],
  [ 27000,   35000, 1800,  'swoop_right' ],
  [ 35000,   43000, 2000,  'cork_left' ],
  [ 35000,   43000, 2000,  'cork_right' ],
  [ 44000,   45500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 19 — ΕΧΘΡΟΙ Β (Exthos Group B) — relentless final push
// ===================================================================
var level_exthos_b_data = [
  // Grid wave 1: dense
  [ 0,       1000,  99999, 'grid_formation', { rows: 5, columns: 9, spacing_x: 54, spacing_y: 50, start_y: 28, initial_speed: 46, cooldown_ms: 1100, diveCooldown: 2.5 } ],
  [ 3000,    55000, 7000,  'bonus_flyby',    { speed: 88 } ],
  [ 7000,    8000,  99999, 'falling_row',    { columns: 7, spacing_x: 50, down_speed: 52 } ],
  [ 9000,    17000, 1800,  'fig8_left' ],
  [ 9000,    17000, 1800,  'fig8_right' ],
  // Grid wave 2: wider sweep
  [ 17000,   18000, 99999, 'grid_formation', { rows: 3, columns: 11, spacing_x: 46, spacing_y: 48, start_y: 25, initial_speed: 46, cooldown_ms: 1100, diveCooldown: 2.5 } ],
  [ 19000,   27000, 1700,  'spiral_enemy' ],
  [ 20000,   28000, 1600,  'zigzag_enemy' ],
  [ 24000,   25000, 99999, 'falling_row',    { columns: 8, spacing_x: 48, down_speed: 60 } ],
  [ 28000,   36000, 1700,  'cork_left' ],
  [ 28000,   36000, 1700,  'cork_right' ],
  [ 36000,   44000, 1800,  'scurve_left' ],
  [ 36000,   44000, 1800,  'scurve_right' ],
  [ 44000,   52000, 1600,  'boomerang_left' ],
  [ 44000,   52000, 1600,  'boomerang_right' ],
  [ 53000,   54500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 20 — ΕΧΘΡΟΙ Γ (Exthos Group C) — pendulum storm + scurve chaos
// ===================================================================
var level_exthos_c_data = [
  // Grid wave 1: wide aggressive grid
  [ 0,       1000,  99999, 'grid_formation', { rows: 5, columns: 8, spacing_x: 56, spacing_y: 52, start_y: 28, initial_speed: 48, cooldown_ms: 1050, diveCooldown: 2.3 } ],
  [ 3000,    55000, 6500,  'bonus_flyby',    { speed: 90 } ],
  [ 6000,    7000,  99999, 'falling_row',    { columns: 7, spacing_x: 50, down_speed: 56 } ],
  [ 8000,    16000, 1700,  'pendulum' ],
  [ 9000,    17000, 1800,  'pendulum' ],
  [ 10000,   18000, 2000,  'scurve_left' ],
  [ 10000,   18000, 2000,  'scurve_right' ],
  // Grid wave 2: tighter columns
  [ 18000,   19000, 99999, 'grid_formation', { rows: 3, columns: 11, spacing_x: 46, spacing_y: 46, start_y: 22, initial_speed: 50, cooldown_ms: 950, diveCooldown: 2.0 } ],
  [ 20000,   21000, 99999, 'falling_row',    { columns: 8, spacing_x: 46, down_speed: 62 } ],
  [ 22000,   30000, 1600,  'cork_left' ],
  [ 22000,   30000, 1600,  'cork_right' ],
  [ 28000,   36000, 1700,  'fig8_left' ],
  [ 28000,   36000, 1700,  'fig8_right' ],
  [ 36000,   44000, 1500,  'boomerang_left' ],
  [ 36000,   44000, 1500,  'boomerang_right' ],
  [ 44000,   45500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 21 — ΕΧΘΡΟΙ Δ (Exthos Group D) — dark horde final onslaught
// ===================================================================
var level_exthos_d_data = [
  // Grid wave 1: max density
  [ 0,       1000,  99999, 'grid_formation', { rows: 6, columns: 9, spacing_x: 50, spacing_y: 48, start_y: 25, initial_speed: 50, cooldown_ms: 950, diveCooldown: 2.0 } ],
  [ 3000,    60000, 6000,  'bonus_flyby',    { speed: 95 } ],
  [ 5000,    6000,  99999, 'falling_row',    { columns: 8, spacing_x: 46, down_speed: 60 } ],
  [ 7000,    15000, 1500,  'zigzag_enemy' ],
  [ 7000,    15000, 1500,  'spiral_enemy' ],
  [ 8000,    16000, 1600,  'pendulum' ],
  // Grid wave 2: relentless push
  [ 16000,   17000, 99999, 'grid_formation', { rows: 4, columns: 10, spacing_x: 48, spacing_y: 46, start_y: 22, initial_speed: 52, cooldown_ms: 900, diveCooldown: 1.8 } ],
  [ 18000,   19000, 99999, 'falling_row',    { columns: 9, spacing_x: 44, down_speed: 68 } ],
  [ 20000,   28000, 1500,  'scurve_left' ],
  [ 20000,   28000, 1500,  'scurve_right' ],
  [ 24000,   32000, 1400,  'cork_left' ],
  [ 24000,   32000, 1400,  'cork_right' ],
  // Grid wave 3: final push
  [ 32000,   33000, 99999, 'grid_formation', { rows: 3, columns: 11, spacing_x: 44, spacing_y: 44, start_y: 20, initial_speed: 54, cooldown_ms: 850, diveCooldown: 1.6 } ],
  [ 34000,   42000, 1400,  'fig8_left' ],
  [ 34000,   42000, 1400,  'fig8_right' ],
  [ 40000,   48000, 1300,  'boomerang_left' ],
  [ 40000,   48000, 1300,  'boomerang_right' ],
  [ 48000,   56000, 1400,  'swoop_left' ],
  [ 48000,   56000, 1400,  'swoop_right' ],
  [ 57000,   58500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 22 — ΕΧΘΡΟΙ F-1 (Exthos F — Κυκλικοί σχηματισμοί)
// ===================================================================
var level_exthos_f1_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 5, columns: 9, spacing_x: 52, spacing_y: 50, start_y: 28, shape: 'ring',         initial_speed: 46, cooldown_ms: 1100, diveCooldown: 2.5 } ],
  [ 3000,    55000, 7000,  'bonus_flyby',    { speed: 84 } ],
  [ 6000,    7000,  99999, 'falling_row',    { columns: 7, spacing_x: 50, down_speed: 52 } ],
  [ 8000,    16000, 1800,  'fig8_left' ],
  [ 8000,    16000, 1800,  'fig8_right' ],
  [ 16000,   17000, 99999, 'grid_formation', { rows: 4, columns: 8,  spacing_x: 56, spacing_y: 52, start_y: 26, shape: 'ring',         initial_speed: 48, cooldown_ms: 1050, diveCooldown: 2.3 } ],
  [ 18000,   26000, 1700,  'swoop_left' ],
  [ 18000,   26000, 1700,  'swoop_right' ],
  [ 24000,   25000, 99999, 'grid_formation', { rows: 3, columns: 7,  spacing_x: 58, spacing_y: 54, start_y: 28, shape: 'ring',         initial_speed: 44, cooldown_ms: 1100, diveCooldown: 2.5 } ],
  [ 26000,   34000, 1600,  'spiral_enemy' ],
  [ 27000,   35000, 1700,  'zigzag_enemy' ],
  [ 35000,   43000, 1600,  'cork_left' ],
  [ 35000,   43000, 1600,  'cork_right' ],
  [ 44000,   45500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 23 — ΕΧΘΡΟΙ F-2 (Exthos F — Σταυρός & Τρίαινα)
// ===================================================================
var level_exthos_f2_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 5, columns: 11, spacing_x: 48, spacing_y: 48, start_y: 26, shape: 'cross_flanked', initial_speed: 48, cooldown_ms: 1050, diveCooldown: 2.3 } ],
  [ 3000,    55000, 6500,  'bonus_flyby',    { speed: 88 } ],
  [ 6000,    7000,  99999, 'falling_row',    { columns: 7, spacing_x: 50, down_speed: 56 } ],
  [ 8000,    16000, 1700,  'scurve_left' ],
  [ 8000,    16000, 1700,  'scurve_right' ],
  [ 16000,   17000, 99999, 'grid_formation', { rows: 5, columns: 11, spacing_x: 46, spacing_y: 48, start_y: 24, shape: 'trident',       initial_speed: 50, cooldown_ms: 1000, diveCooldown: 2.2 } ],
  [ 18000,   26000, 1600,  'boomerang_left' ],
  [ 18000,   26000, 1600,  'boomerang_right' ],
  [ 24000,   25000, 99999, 'grid_formation', { rows: 4, columns: 9,  spacing_x: 52, spacing_y: 50, start_y: 26, shape: 'three_cross',   initial_speed: 48, cooldown_ms: 1050, diveCooldown: 2.3 } ],
  [ 26000,   34000, 1500,  'pendulum' ],
  [ 27000,   35000, 1600,  'spiral_enemy' ],
  [ 35000,   43000, 1500,  'cork_left' ],
  [ 35000,   43000, 1500,  'cork_right' ],
  [ 44000,   52000, 1600,  'fig8_left' ],
  [ 44000,   52000, 1600,  'fig8_right' ],
  [ 53000,   54500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 24 — ΕΧΘΡΟΙ F-3 (Exthos F — Πυραμίδα & Flanked)
// ===================================================================
var level_exthos_f3_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 6, columns: 9,  spacing_x: 52, spacing_y: 50, start_y: 26, shape: 'pyramid',      initial_speed: 50, cooldown_ms: 1000, diveCooldown: 2.2 } ],
  [ 3000,    55000, 6500,  'bonus_flyby',    { speed: 90 } ],
  [ 6000,    7000,  99999, 'falling_row',    { columns: 8, spacing_x: 48, down_speed: 58 } ],
  [ 8000,    16000, 1700,  'swoop_left' ],
  [ 8000,    16000, 1700,  'swoop_right' ],
  [ 16000,   17000, 99999, 'grid_formation', { rows: 5, columns: 11, spacing_x: 46, spacing_y: 48, start_y: 24, shape: 'v_flanked',    initial_speed: 52, cooldown_ms: 950,  diveCooldown: 2.1 } ],
  [ 18000,   26000, 1600,  'scurve_left' ],
  [ 18000,   26000, 1600,  'scurve_right' ],
  [ 24000,   25000, 99999, 'grid_formation', { rows: 4, columns: 9,  spacing_x: 52, spacing_y: 50, start_y: 26, shape: 'diamond_flanked', initial_speed: 50, cooldown_ms: 1000, diveCooldown: 2.2 } ],
  [ 26000,   34000, 1500,  'zigzag_enemy' ],
  [ 27000,   35000, 1500,  'pendulum' ],
  [ 35000,   43000, 1400,  'boomerang_left' ],
  [ 35000,   43000, 1400,  'boomerang_right' ],
  [ 44000,   52000, 1500,  'cork_left' ],
  [ 44000,   52000, 1500,  'cork_right' ],
  [ 53000,   54500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL 25 — ΕΧΘΡΟΙ F-4 (Exthos F — Τελική έφοδος, όλοι οι σχηματισμοί)
// ===================================================================
var level_exthos_f4_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 6, columns: 10, spacing_x: 48, spacing_y: 48, start_y: 24, shape: 'compass',      initial_speed: 52, cooldown_ms: 950,  diveCooldown: 2.0 } ],
  [ 3000,    60000, 6000,  'bonus_flyby',    { speed: 95 } ],
  [ 5000,    6000,  99999, 'falling_row',    { columns: 9, spacing_x: 46, down_speed: 62 } ],
  [ 7000,    15000, 1500,  'zigzag_enemy' ],
  [ 7000,    15000, 1500,  'spiral_enemy' ],
  [ 15000,   16000, 99999, 'grid_formation', { rows: 5, columns: 11, spacing_x: 46, spacing_y: 46, start_y: 22, shape: 'ring',         initial_speed: 54, cooldown_ms: 900,  diveCooldown: 1.8 } ],
  [ 17000,   18000, 99999, 'falling_row',    { columns: 9, spacing_x: 44, down_speed: 66 } ],
  [ 19000,   27000, 1400,  'scurve_left' ],
  [ 19000,   27000, 1400,  'scurve_right' ],
  [ 23000,   24000, 99999, 'grid_formation', { rows: 4, columns: 10, spacing_x: 48, spacing_y: 48, start_y: 24, shape: 'cross_flanked', initial_speed: 54, cooldown_ms: 900,  diveCooldown: 1.8 } ],
  [ 27000,   35000, 1400,  'cork_left' ],
  [ 27000,   35000, 1400,  'cork_right' ],
  [ 33000,   34000, 99999, 'grid_formation', { rows: 3, columns: 11, spacing_x: 44, spacing_y: 46, start_y: 22, shape: 'pyramid',      initial_speed: 56, cooldown_ms: 850,  diveCooldown: 1.6 } ],
  [ 35000,   43000, 1300,  'boomerang_left' ],
  [ 35000,   43000, 1300,  'boomerang_right' ],
  [ 43000,   51000, 1400,  'fig8_left' ],
  [ 43000,   51000, 1400,  'fig8_right' ],
  [ 51000,   59000, 1300,  'pendulum' ],
  [ 59000,   60000, 99999, 'grid_formation', { rows: 3, columns: 9,  spacing_x: 46, spacing_y: 48, start_y: 22, shape: 'trident',       initial_speed: 58, cooldown_ms: 800,  diveCooldown: 1.5 } ],
  [ 61000,   62500, 2000,  'final_boss' ]
];

// ===== LEVEL TRANSITION FRAMES =====
var _transitionFrameFiles = [
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788024862.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788029927.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788088264.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788095831.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788258804.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788263638.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788269100.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788274560.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788279772.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788284470.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788290074.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788300744.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788305695.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788310761.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788451717.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788457411.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788461996.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788466834.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788478122.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788479975.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788483287.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788489382.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788495154.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788499595.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788505856.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788718337.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771788725122.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810732076.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810738084.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810745199.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810752655.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810762190.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810768246.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810774053.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810780421.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810785719.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810791752.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810965861.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810970895.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810976712.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810981714.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810989147.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771810998979.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811140455.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811144911.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811151326.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811162397.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811168185.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811170470.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Hyper-realistic_3D_ornate_frame_for_game_transitio-1771811179654.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Hyper-realistic_3D_decorative_frame_render_LEFT_-1771811203976.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811222655.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811226076.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811230926.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811350746.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811357482.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811364995.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811372104.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811376655.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811384262.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811394404.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811399287.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811410910.webp",
  "images/\u039a\u03bf\u03c1\u03bd\u03af\u03b6\u03b5\u03c2 \u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03bb\u03ad\u03b2\u03bb\u03b5\u03c2/Remove_background_completely_make_100_transparen-1771811421306.webp"
];

var LevelTransitionScreen = function(fromLevel, toLevel, callback) {
  var t = 0;
  var duration = 5.0;
  var done = false;
  // Positive modulo — handles fromLevel=0 (level 1 start)
  var _frameIdx = ((fromLevel - 1) % _transitionFrameFiles.length + _transitionFrameFiles.length) % _transitionFrameFiles.length;
  var frameFile = _transitionFrameFiles[_frameIdx];
  var frameImg = new Image();
  var frameLoaded = false;
  frameImg.onload = function() { frameLoaded = true; };
  frameImg.src = frameFile;

  // Figures appear every 5 levels (bonus stage transitions)
  var _figureFiles = [
    'images/demonikes fikoures/Screenshot 2026-02-22 122214.webp',
    'images/demonikes fikoures/Screenshot 2026-02-22 122256.webp',
    'images/demonikes fikoures/Screenshot 2026-02-22 122436.webp',
    'images/demonikes fikoures/Screenshot 2026-02-22 122615.webp',
    'images/demonikes fikoures/Screenshot 2026-02-22 122757.webp',
    'images/demonikes fikoures/Screenshot 2026-02-22 122913.webp'
  ];
  var showFigures = (fromLevel % 5 === 0);
  var figImg = null, figLoaded = false;
  if(showFigures) {
    // Pick figure based on milestone number (0,5,10,15... → figure index 0,1,2,3...)
    var _milestoneIdx = Math.floor(fromLevel / 5) % _figureFiles.length;
    figImg = new Image();
    figImg.onload = function() { figLoaded = true; };
    figImg.src = _figureFiles[_milestoneIdx];
  }

  this.step = function(dt) {
    if(done) return;
    t += dt;
    if(t >= duration) {
      done = true;
      if(callback) callback();
    }
  };

  this.draw = function(ctx) {
    var w = Game.width, h = Game.height;
    var pulse = 0.75 + 0.25 * Math.sin(t * 2.2);

    // Dark space background
    ctx.fillStyle = 'rgba(0,0,12,0.88)';
    ctx.fillRect(0, 0, w, h);

    // Decorative frame — bleed beyond canvas edges top & bottom so it fills fully
    if(frameLoaded) {
      ctx.save();
      ctx.globalAlpha = 0.95;
      var _bleedY = h * 0.07;
      ctx.drawImage(frameImg, 0, -_bleedY, w, h + _bleedY * 2);
      ctx.restore();
    }

    // All text grouped in lower portion of frame, close together
    var titleSize = Math.max(20, Math.min(Math.floor(h * 0.065), 80));
    var subSize   = Math.max(13, Math.min(Math.floor(h * 0.040), 50));
    var lineGap   = titleSize * 0.22; // tight gap between lines

    // Center the whole group vertically on screen
    var barH2 = 5;
    var totalGroupH = titleSize + lineGap + subSize + lineGap + barH2 + 4;
    var groupTopY  = h * 0.5 - totalGroupH / 2;
    var titleY     = groupTopY + titleSize * 0.5;
    var subY       = titleY + titleSize * 0.5 + lineGap + subSize * 0.5;
    var barBottomY = subY + subSize * 0.5 + lineGap + barH2;

    // Title: "LEVEL X COMPLETE!"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold ' + titleSize + 'px "Uncial Antiqua", Arial Black, Arial';
    ctx.globalAlpha = 0.38 * pulse;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 50;
    ctx.fillStyle = '#FFB800';
    var _titleText = (fromLevel === 0) ? 'ALIEN INVASION' : 'LEVEL ' + fromLevel + ' COMPLETE!';
    ctx.fillText(_titleText, w / 2, titleY);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 18 * pulse;
    ctx.fillStyle = '#FFE566';
    ctx.fillText(_titleText, w / 2, titleY);
    ctx.restore();

    // Subtitle
    var _subText = (fromLevel === 0) ? 'MISSION BEGINS' : 'ENTERING LEVEL ' + toLevel;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold ' + subSize + 'px "Uncial Antiqua", Arial Black, Arial';
    ctx.globalAlpha = 0.9;
    ctx.shadowColor = '#00CCFF';
    ctx.shadowBlur = 18 * pulse;
    ctx.fillStyle = '#55DDFF';
    ctx.fillText(_subText, w / 2, subY);
    ctx.restore();

    // Progress bar — anchored just below subtitle
    var barW = Math.min(w * 0.50, 260);
    var barX = (w - barW) / 2;
    var barY = barBottomY - barH2;
    var prog = Math.min(1, t / duration);
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#112233';
    ctx.fillRect(barX, barY, barW, barH2);
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = '#00CCFF';
    ctx.fillRect(barX, barY, barW * prog, barH2);
    ctx.restore();

    // Figures — drawn LAST so they are always in front of frame and text
    if(showFigures && figLoaded) {
      var figH = h * 0.82;
      var figW = figH * (figImg.naturalWidth / Math.max(1, figImg.naturalHeight));
      var figY = h - figH;
      // Left figure
      ctx.save();
      ctx.globalAlpha = 1.0;
      ctx.drawImage(figImg, 0, figY, figW, figH);
      ctx.restore();
      // Right figure — mirror horizontally
      ctx.save();
      ctx.globalAlpha = 1.0;
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(figImg, 0, figY, figW, figH);
      ctx.restore();
    }

  };
};

var winGame = function() {
  Game.playing = false;
  Game.paused = false;
  SoundManager.playLevelComplete();
  var isNewHighScore = saveHighScore(Game.points);
  var again = Game.mobile ? "Tap FIRE to play again" : "Press fire to play again";
  var subtitle = isNewHighScore ?
    "NEW HIGH SCORE: " + Game.points + "! " + again :
    "Score: " + Game.points + " | High Score: " + highScore + " \u2013 " + again;
  Game.setBoard(9,new TitleScreen("You win!", subtitle, playGame));
};

var loseGame = function() {
  Game.playing = false;
  Game.paused = false;
  currentLevel = 1; // Reset level on game over
  Game.motherShipCount = 0;
  var isNewHighScore = saveHighScore(Game.points);
  var again = Game.mobile ? "Tap FIRE to play again" : "Press fire to play again";
  var subtitle = isNewHighScore ?
    "NEW HIGH SCORE: " + Game.points + "! " + again :
    "Score: " + Game.points + " | High Score: " + highScore + " \u2013 " + again;
  SoundManager.playGameOver();
  Game.setBoard(9,new TitleScreen("Game Over!", subtitle, playGame));
};

var Starfield = function(speed,opacity,numStars,clear) {

  var _w = Game.width;
  var _h = Game.height;
  var _cx = _w / 2;
  var _cy = _h / 2;

  // Big enough canvas to cover all screen corners at any rotation angle
  var _big = Math.ceil(Math.sqrt(_w * _w + _h * _h)) + 4;

  var stars = document.createElement("canvas");
  stars.width = _big;
  stars.height = _big;
  var starCtx = stars.getContext("2d");

  // Rotation angle, starts at a random position so two layers don't align
  var _angle = Math.random() * Math.PI * 2;

  // Randomized rotation system: accelerates, decelerates, reverses direction
  var _baseSpeed = speed * 0.006;     // base max speed
  var _rotVel    = _baseSpeed * (Math.random() < 0.5 ? 1 : -1); // current velocity
  var _rotTarget = _rotVel;           // target velocity (we lerp toward it)
  var _phaseTimer = 0;                // time until next phase change
  var _phaseDur   = 8 + Math.random() * 18; // seconds until next change

  function _nextPhase() {
    // Randomly: speed up, slow down, stop, or reverse
    var roll = Math.random();
    if(roll < 0.30) {
      // Reverse direction, pick a new speed
      _rotTarget = _baseSpeed * (1.0 + Math.random() * 1.5) * (_rotVel > 0 ? -1 : 1);
    } else if(roll < 0.55) {
      // Speed up in current direction
      _rotTarget = _baseSpeed * (1.2 + Math.random() * 2.0) * (_rotVel >= 0 ? 1 : -1);
    } else if(roll < 0.75) {
      // Slow almost to stop
      _rotTarget = _baseSpeed * 0.08 * (_rotVel >= 0 ? 1 : -1);
    } else {
      // Moderate speed, maybe flip
      _rotTarget = _baseSpeed * (0.5 + Math.random() * 1.0) * (Math.random() < 0.4 ? -1 : (_rotVel >= 0 ? 1 : -1));
    }
    _phaseDur   = 6 + Math.random() * 22;
    _phaseTimer = 0;
  }

  if(clear) {
    // Deep dark night sky background
    starCtx.fillStyle = '#020208';
    starCtx.fillRect(0, 0, _big, _big);
  }

  // Scale star count by screen area so large screens look as dense as mobile
  var _areaRatio = Math.max(1, (_w * _h) / (320 * 480));
  var scaledStars = Math.round(numStars * _areaRatio);

  // Coloured stars of varied sizes
  var starColors = ['#FFFFFF','#AACCFF','#FFEEDD','#AAFFEE','#FFDDCC','#CCDDFF'];
  for(var i = 0; i < scaledStars; i++) {
    starCtx.globalAlpha = opacity * (0.3 + Math.random() * 0.7);
    starCtx.fillStyle = starColors[Math.floor(Math.random() * starColors.length)];
    var rnd = Math.random();
    var sz = rnd < 0.05 ? 3 : rnd < 0.2 ? 2 : 1;
    starCtx.fillRect(Math.floor(Math.random() * _big),
                     Math.floor(Math.random() * _big),
                     sz, sz);
  }

  // ANIMATED NEBULAS - subtle, dark
  this.nebulas = [
    { x: 0.15, y: 0.25, r: 0.30, hue: 260, hueSpeed: 8 },
    { x: 0.85, y: 0.15, r: 0.22, hue: 220, hueSpeed: 10 },
    { x: 0.50, y: 0.70, r: 0.30, hue: 280, hueSpeed: 7 },
    { x: 0.75, y: 0.55, r: 0.25, hue: 240, hueSpeed: 9 }
  ];
  this.nebulaTime = 0;

  this.draw = function(ctx) {
    // Rotate the star canvas around the screen centre
    ctx.save();
    ctx.translate(_cx, _cy);
    ctx.rotate(_angle);
    ctx.drawImage(stars, -_big / 2, -_big / 2);
    ctx.restore();

    // Nebulas drawn on top, non-rotated (soft full-screen glow)
    this.drawNebulas(ctx);
  };

  this.drawNebulas = function(ctx) {
    for(var n = 0; n < this.nebulas.length; n++) {
      var nd = this.nebulas[n];
      var currentHue = (nd.hue + this.nebulaTime * nd.hueSpeed) % 360;
      var ncx = nd.x * _w;
      var ncy = nd.y * _h;
      var radius = nd.r * _w;
      var grad = ctx.createRadialGradient(ncx, ncy, 0, ncx, ncy, radius);
      grad.addColorStop(0, 'hsla(' + currentHue + ', 60%, 20%, 0.12)');
      grad.addColorStop(0.5, 'hsla(' + ((currentHue + 30) % 360) + ', 50%, 12%, 0.06)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, _w, _h);
    }
  };

  this.step = function(dt) {
    // Phase timer: trigger next behaviour when time is up
    _phaseTimer += dt;
    if(_phaseTimer >= _phaseDur) _nextPhase();
    // Smoothly lerp velocity toward target (creates natural acceleration/deceleration)
    _rotVel += (_rotTarget - _rotVel) * Math.min(1, dt * 0.35);
    _angle  += dt * _rotVel;
    this.nebulaTime += dt;
  };
};

// ===================================================================
// SHOOTING STARS SYSTEM — periodic showers, dusty hazy trail
// ===================================================================
var ShootingStarSystem = function() {
  this.stars = [];
  // Continuous rain
  this.rainTimer = 0;
  // Occasional dramatic comet/red-giant shower
  this.showerTimer = 15 + Math.random() * 20;
  this.showerActive = false;
  this.showerLeft = 0;
  this.showerSpawn = 0;
  this.showerVx = 0; this.showerVy = 0; this.showerDir = 0;
};

ShootingStarSystem.prototype._startShower = function() {
  // Stars are small & far away — size ~0.8-1.8px, trail short
  var ang = (20 + Math.random() * 50) * Math.PI / 180; // 20-70° from horizontal
  var flip = Math.random() < 0.5 ? 1 : -1;
  var spd = 380 + Math.random() * 280; // fixed, not screen-scaled (they're distant)
  this.showerVx = flip * spd * Math.cos(ang);
  this.showerVy = spd * Math.sin(ang);
  this.showerDir = Math.floor(Math.random() * 5); // 0=top,1=left,2=right,3=top-left,4=top-right
  this.showerLeft = 8 + Math.floor(Math.random() * 8); // 8-15 stars over ~3-4s
  this.showerSpawn = 0;
  this.showerActive = true;
  // Next shower: 60-120 seconds
  this.showerTimer = 60 + Math.random() * 60;
};

ShootingStarSystem.prototype.step = function(dt) {
  // ── Continuous rain drops ──────────────────────────────────────────────
  this.rainTimer -= dt;
  if(this.rainTimer <= 0) {
    this.rainTimer = 0.05 + Math.random() * 0.07; // 10-20 drops/sec
    var rx = Math.random() * Game.width;
    var spd = 320 + Math.random() * 220;  // 320-540 px/s
    var drift = (Math.random() - 0.5) * 60; // slight horizontal drift
    var sz = 0.5 + Math.random() * 0.9;
    var trail = 20 + Math.random() * 30;
    this.stars.push({ x:rx, y:-4, vx:drift, vy:spd,
      trail:trail, size:sz, redGlow:false, life:3, isRain:true });
  }

  // ── Occasional dramatic shower (comets / red giants) ──────────────────
  this.showerTimer -= dt;
  if(this.showerTimer <= 0 && !this.showerActive) this._startShower();

  if(this.showerActive && this.showerLeft > 0) {
    this.showerSpawn -= dt;
    if(this.showerSpawn <= 0) {
      // Spread spawns over ~3-4s total (8-15 stars → 0.2-0.5s apart)
      this.showerSpawn = 0.20 + Math.random() * 0.30;
      this.showerLeft--;
      var d = this.showerDir;
      var sx, sy;
      if(d === 0)      { sx = Math.random() * Game.width; sy = -5; }
      else if(d === 1) { sx = -5; sy = Math.random() * Game.height * 0.6; }
      else if(d === 2) { sx = Game.width+5; sy = Math.random() * Game.height * 0.6; }
      else if(d === 3) { sx = Math.random() * Game.width * 0.55; sy = -5; }
      else             { sx = Game.width * 0.45 + Math.random() * Game.width * 0.55; sy = -5; }
      var dv = (Math.random() - 0.5) * 0.20; // tiny angle variation within shower
      var cv = Math.cos(dv), sv = Math.sin(dv);
      var vx = this.showerVx*cv - this.showerVy*sv;
      var vy = this.showerVx*sv + this.showerVy*cv;
      // Randomly assign star type: normal(60%), red giant(25%), comet(15%)
      var rnd = Math.random();
      var starSize, starTrail, starRed, starLife;
      if(rnd < 0.60) {        // normal — small, distant
        starSize  = 0.7 + Math.random() * 0.9;
        starTrail = 30 + Math.random() * 40;
        starRed   = false;
        starLife  = 4;
      } else if(rnd < 0.85) { // red giant — slightly bigger + red glow
        starSize  = 2.0 + Math.random() * 1.5;
        starTrail = 50 + Math.random() * 40;
        starRed   = true;
        starLife  = 4.5;
      } else {                // comet — long trail
        starSize  = 0.8 + Math.random() * 0.7;
        starTrail = 100 + Math.random() * 80;
        starRed   = false;
        starLife  = 5;
      }
      this.stars.push({ x:sx, y:sy, vx:vx, vy:vy,
        trail: starTrail, size: starSize, redGlow: starRed, life: starLife });
      if(this.showerLeft <= 0) this.showerActive = false;
    }
  }

  for(var i = this.stars.length-1; i >= 0; i--) {
    var s = this.stars[i];
    s.x += s.vx*dt; s.y += s.vy*dt; s.life -= dt;
    if(s.life <= 0 || s.x > Game.width+300 || s.y > Game.height+300 || s.x < -300 || s.y < -300)
      this.stars.splice(i, 1);
  }
};

ShootingStarSystem.prototype.draw = function(ctx) {
  if(!this.stars.length) return;
  ctx.save();
  ctx.lineCap = 'round';
  for(var i = 0; i < this.stars.length; i++) {
    var s = this.stars[i];
    var sp = Math.sqrt(s.vx*s.vx + s.vy*s.vy);
    var nx = s.vx/sp, ny = s.vy/sp;
    var tx = s.x - nx*s.trail, ty = s.y - ny*s.trail;
    var a = Math.min(1, s.life * 0.75); // fade gently

    // Soft outer glow (faint haze around trail)
    var g1 = ctx.createLinearGradient(tx, ty, s.x, s.y);
    g1.addColorStop(0,   'rgba(210,220,255,0)');
    g1.addColorStop(0.6, 'rgba(225,232,255,' + (a*0.08) + ')');
    g1.addColorStop(1,   'rgba(245,248,255,' + (a*0.25) + ')');
    ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(s.x,s.y);
    ctx.strokeStyle = g1; ctx.lineWidth = s.size * 5; ctx.stroke();

    // Bright core streak
    var g3 = ctx.createLinearGradient(tx, ty, s.x, s.y);
    g3.addColorStop(0, 'rgba(255,255,255,0)');
    g3.addColorStop(1, 'rgba(255,255,255,' + (a*0.95) + ')');
    ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(s.x,s.y);
    ctx.strokeStyle = g3; ctx.lineWidth = s.size; ctx.stroke();

    // Head: tiny soft halo
    var hr = s.size * 3.5;
    if(s.redGlow) {
      // Outer red/orange ring first (behind white core)
      var rr = hr * 4.5;
      var rg = ctx.createRadialGradient(s.x, s.y, hr*0.8, s.x, s.y, rr);
      rg.addColorStop(0,   'rgba(255,80,30,' + (a*0.35) + ')');
      rg.addColorStop(0.4, 'rgba(255,50,10,' + (a*0.18) + ')');
      rg.addColorStop(1,   'rgba(200,20,0,0)');
      ctx.beginPath(); ctx.arc(s.x, s.y, rr, 0, Math.PI*2);
      ctx.fillStyle = rg; ctx.fill();
    }
    var hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, hr);
    hg.addColorStop(0,   'rgba(255,255,255,' + (a*0.95) + ')');
    hg.addColorStop(0.3, 'rgba(220,232,255,' + (a*0.40) + ')');
    hg.addColorStop(1,   'rgba(180,210,255,0)');
    ctx.beginPath(); ctx.arc(s.x, s.y, hr, 0, Math.PI*2);
    ctx.fillStyle = hg; ctx.fill();
  }
  ctx.restore();
};

// ===================================================================
// LARGE NEBULA SYSTEM — big amorphous blue/silver blobs at screen edges
// Appear every 5-7 min, 2-3 at a time, up to 60s visible, then fade out
// ===================================================================
var LargeNebulaSystem = function() {
  this.nebulae = [];
  this.timer = 10 + Math.random() * 10; // first batch 10-20s in (so player sees it quickly)
};

LargeNebulaSystem.prototype._spawnBatch = function() {
  var count = 2 + Math.floor(Math.random() * 2); // 2 or 3
  var w = Game.width, h = Game.height;
  var palettes = [
    { c0:'40,80,200',   c1:'20,50,160',  c2:'10,30,100' },
    { c0:'80,130,230',  c1:'100,150,240',c2:'40,70,180' },
    { c0:'60,100,210',  c1:'30,60,170',  c2:'15,35,120' },
    { c0:'100,150,255', c1:'60,110,230', c2:'30,60,180' },
    { c0:'120,160,240', c1:'80,120,210', c2:'40,70,160' }
  ];
  for(var i = 0; i < count; i++) {
    var nebulaR = Math.max(w, h) * (0.55 + Math.random() * 0.55);
    var side = Math.floor(Math.random() * 4);
    var cx, cy;
    if(side === 0)      { cx = -nebulaR * 0.35; cy = h * (0.1 + Math.random() * 0.8); }
    else if(side === 1) { cx = w + nebulaR * 0.35; cy = h * (0.1 + Math.random() * 0.8); }
    else if(side === 2) { cx = w * (0.05 + Math.random() * 0.4); cy = -nebulaR * 0.35; }
    else                { cx = w * (0.55 + Math.random() * 0.4); cy = -nebulaR * 0.35; }
    var pal = palettes[Math.floor(Math.random() * palettes.length)];
    var blobs = [];
    var blobCount = 4 + Math.floor(Math.random() * 4);
    for(var b = 0; b < blobCount; b++) {
      blobs.push({
        ox: (Math.random() - 0.5) * nebulaR * 0.9,
        oy: (Math.random() - 0.5) * nebulaR * 0.7,
        r:  nebulaR * (0.45 + Math.random() * 0.65)
      });
    }
    var totalLife = 50 + Math.random() * 10;
    this.nebulae.push({ cx:cx, cy:cy, blobs:blobs, pal:pal,
      totalLife:totalLife, life:totalLife, fadeIn:8, fadeOut:12 });
  }
  this.timer = 300 + Math.random() * 120;
};

LargeNebulaSystem.prototype.step = function(dt) {
  this.timer -= dt;
  if(this.timer <= 0) this._spawnBatch();
  for(var i = this.nebulae.length-1; i >= 0; i--) {
    this.nebulae[i].life -= dt;
    if(this.nebulae[i].life <= 0) this.nebulae.splice(i, 1);
  }
};

LargeNebulaSystem.prototype.draw = function(ctx) {
  if(!this.nebulae.length) return;
  ctx.save();
  for(var i = 0; i < this.nebulae.length; i++) {
    var n = this.nebulae[i];
    var elapsed = n.totalLife - n.life;
    var op = elapsed < n.fadeIn ? elapsed / n.fadeIn :
             n.life   < n.fadeOut ? n.life / n.fadeOut : 1.0;
    op = Math.max(0, Math.min(1, op)) * 0.38;
    for(var b = 0; b < n.blobs.length; b++) {
      var bl = n.blobs[b];
      var bx = n.cx + bl.ox, by = n.cy + bl.oy;
      var grad = ctx.createRadialGradient(bx, by, 0, bx, by, bl.r);
      grad.addColorStop(0,    'rgba(' + n.pal.c0 + ',' + (op * 0.70) + ')');
      grad.addColorStop(0.35, 'rgba(' + n.pal.c1 + ',' + (op * 0.38) + ')');
      grad.addColorStop(0.70, 'rgba(' + n.pal.c2 + ',' + (op * 0.12) + ')');
      grad.addColorStop(1,    'rgba(' + n.pal.c2 + ',0)');
      ctx.beginPath(); ctx.arc(bx, by, bl.r, 0, Math.PI*2);
      ctx.fillStyle = grad; ctx.fill();
    }
  }
  ctx.restore();
};

// ===================================================================
// CLOUD SYSTEM - Beautiful image clouds moving left-right
// ===================================================================
var CloudSystem = function() {
  this.clouds = [];
  this._spawnCloud(true);  // initial population
};

CloudSystem.prototype._makeCloud = function(startOffscreen) {
  var types = [
    { sprite: 'cloud_majestic', w: 520, h: 310 },
    { sprite: 'cloud_storm',    w: 560, h: 330 }
  ];
  var t = types[Math.floor(Math.random() * types.length)];
  var goRight = Math.random() > 0.5;  // true = left→right, false = right→left
  var speed = 8 + Math.random() * 8;  // 8–16 px/s
  var x, y;
  if(startOffscreen) {
    x = goRight ? -(t.w + Math.random() * Game.width) : (Game.width + Math.random() * Game.width);
  } else {
    x = goRight ? -t.w : Game.width;
  }
  y = 20 + Math.random() * (Game.height * 0.45 - t.h);
  return {
    sprite: t.sprite,
    w: t.w, h: t.h,
    x: x, y: y,
    speed: speed,
    dir: goRight ? 1 : -1,
    opacity: 0.45 + Math.random() * 0.35,
    done: false
  };
};

CloudSystem.prototype._spawnCloud = function(scatter) {
  var count = 3 + Math.floor(Math.random() * 3);  // 3–5 clouds
  for(var i = 0; i < count; i++) {
    this.clouds.push(this._makeCloud(scatter));
  }
};

CloudSystem.prototype.step = function(dt) {
  var active = 0;
  for(var i = 0; i < this.clouds.length; i++) {
    var c = this.clouds[i];
    c.x += c.speed * c.dir * dt;
    // Mark as done when fully off the opposite edge
    if(c.dir > 0 && c.x > Game.width) c.done = true;
    if(c.dir < 0 && c.x < -c.w)      c.done = true;
    if(!c.done) active++;
  }
  // Remove done clouds
  this.clouds = this.clouds.filter(function(c){ return !c.done; });
  // Spawn a new cloud whenever any finishes (maintain 3–5)
  if(active < 4) {
    this.clouds.push(this._makeCloud(false));
  }
};

CloudSystem.prototype.draw = function(ctx) {
  ctx.save();
  for(var i = 0; i < this.clouds.length; i++) {
    var c = this.clouds[i];
    ctx.globalAlpha = c.opacity;
    SpriteSheet.draw(ctx, c.sprite, c.x, c.y, 0, c.w, c.h);
  }
  ctx.restore();
};

// ===================================================================
// ===================================================================
// SKY COLOR SYSTEM — periodic washed-out blue + mothership red tint
// ===================================================================
var SkyColorSystem = function() {
  var _intervals = [60, 90, 150, 180, 240];
  this._intervals = _intervals;
  this.timer = 20 + Math.random() * 40; // first change in 20-60s
  this.blueAlpha = 0;    // 0..1
  this.blueFade  = 0;    // 1=fading in, -1=fading out, 0=stable
  this.blueDur   = 0;    // seconds remaining at full blue
};
SkyColorSystem.prototype.step = function(dt) {
  // Countdown only when not currently showing blue
  if(this.blueFade === 0 && this.blueAlpha < 0.01) {
    this.timer -= dt;
    if(this.timer <= 0) {
      this.blueFade = 1;
      this.blueDur = 20 + Math.random() * 30;
      var pick = this._intervals[Math.floor(Math.random() * this._intervals.length)];
      this.timer = pick;
    }
  }
  if(this.blueFade === 1) {
    this.blueAlpha += dt * 0.12; // ~8s to full
    if(this.blueAlpha >= 1) { this.blueAlpha = 1; this.blueFade = 0; }
  }
  if(this.blueFade === 0 && this.blueAlpha >= 0.99) {
    this.blueDur -= dt;
    if(this.blueDur <= 0) this.blueFade = -1;
  }
  if(this.blueFade === -1) {
    this.blueAlpha -= dt * 0.12;
    if(this.blueAlpha <= 0) { this.blueAlpha = 0; this.blueFade = 0; }
  }
};
SkyColorSystem.prototype.draw = function(ctx) {
  var bA = this.blueAlpha;
  var ships = Math.max(0, Game.motherShipCount || 0);
  var rA = Math.min(1, ships * 0.22);
  if(bA <= 0.005 && rA <= 0.005) return;
  // Washed-out blue gradient top→bottom
  if(bA > 0.005) {
    var grad = ctx.createLinearGradient(0, 0, 0, Game.height);
    grad.addColorStop(0,   'rgba(110,155,235,' + (bA * 0.30) + ')');
    grad.addColorStop(0.6, 'rgba(70,105,195,' + (bA * 0.16) + ')');
    grad.addColorStop(1,   'rgba(35,55,150,' + (bA * 0.06) + ')');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, Game.width, Game.height);
  }
  // Reddish radial overlay for motherships
  if(rA > 0.005) {
    var rg = ctx.createRadialGradient(
      Game.width/2, 0, 0,
      Game.width/2, Game.height * 0.5, Game.width * 0.85
    );
    rg.addColorStop(0,   'rgba(210,25,15,' + (rA * 0.38) + ')');
    rg.addColorStop(0.5, 'rgba(165,15,8,' + (rA * 0.22) + ')');
    rg.addColorStop(1,   'rgba(90,5,3,' + (rA * 0.08) + ')');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, Game.width, Game.height);
  }
};

// BACKGROUND OBJECTS SYSTEM - Planets, Asteroids, Stars (NO clouds, NO motherships)
// Πάντα πίσω από τους εχθρούς! ΛΙΓΑ, ΑΡΓΑ, ΧΩΡΙΣ ΠΕΡΙΣΤΡΟΦΗ
// ===================================================================
var BackgroundObjectsSystem = function() {
  this.objects = [];
  this.ss = new ShootingStarSystem();  // embedded — board loop only handles integers
  this.ns = new LargeNebulaSystem();   // embedded — same reason
  this.sky = new SkyColorSystem();     // embedded — same reason
  var hugeObjectExists = false;

  // Era (scene) change system — new background scene every 6-7 levels
  this._eraLastLevel  = 1;
  this._eraLevelCount = 0;             // levels elapsed since last era change
  this._eraInterval   = 6 + Math.floor(Math.random() * 2); // 6 or 7 levels per era

  // Periodic background darkening effect
  this._darkAlpha  = 0;      // current overlay alpha (0=transparent, 1=full black)
  this._darkTarget = 0;      // target alpha we're lerping toward
  this._darkTimer  = 30 + Math.random() * 40; // seconds until first dark event
  this._darkPhase  = 'wait'; // 'wait' | 'darken' | 'hold' | 'clear'
  this._darkHold   = 0;      // how long to hold at peak darkness

  // Regular objects scale (mobile-friendly, capped at 1.0 for non-planets)
  var _screenScale = Math.min(1.0, Game.width / 800);
  this._screenScale = _screenScale;

  // Planets scale UP dramatically on large screens — some fill a chunk of the screen
  var _planetScale = Math.max(0.25, Game.width / 700); // 1920→2.74, 1366→1.95, 800→1.14, 320→0.46

  var planetTypes = ['bg_planet_1', 'bg_planet_2', 'bg_planet_3', 'bg_planet_4', 'bg_planet_5'];
  var stationTypes = ['bg_station_1','bg_station_2','bg_station_3','bg_station_4','bg_station_5',
                      'bg_station_6','bg_station_8','bg_station_9','bg_station_10',
                      'bg_station_11','bg_station_12','bg_station_13'];
  var asteroidTypes = ['bg_asteroid_1', 'bg_asteroid_2', 'bg_asteroid_3', 'bg_asteroid_4', 'bg_asteroid_5'];
  var starTypes = ['bg_star_1', 'bg_star_2', 'bg_star_3', 'bg_star_4'];
  var astronautTypes = ['spaceman_1','spaceman_2','spaceman_3','spaceman_4','spaceman_5','spaceman_6'];

  var allTypes = [
    { types: planetTypes,    count: 4, scale: 1.0, opacity: 1.0, canRotate: false, isPlanet: true },
    { types: stationTypes,   count: 2, scale: 1.0, opacity: 1.0, canRotate: false, isPlanet: true },
    { types: starTypes,      count: 2, scale: 1.0, opacity: 1.0, canRotate: false, isPlanet: true },
    { types: asteroidTypes,  count: 5, scale: 1.1, opacity: 1.0, canRotate: true },
    { types: astronautTypes, count: 1, scale: 1.0, opacity: 1.0, canRotate: false, isAstronaut: true }
  ];

  // Count how many asteroid trail objects we allow (max 2)
  var asteroidTrailCount = 0;

  for(var g = 0; g < allTypes.length; g++) {
    var group = allTypes[g];
    for(var i = 0; i < group.count; i++) {
      var spriteName = group.types[Math.floor(Math.random() * group.types.length)];
      var sprite = SpriteSheet.map[spriteName];
      if(!sprite) continue;

      var baseW = sprite.w;
      var baseH = sprite.h;

      // Planet sizing: big/small tier, no isHuge multiplier
      var isPlanet = group.isPlanet || false;
      var isHuge, sizeBoost, targetScale;
      if(isPlanet) {
        var bigPlanet = Math.random() < 0.60; // 60% chance of large planet
        targetScale = bigPlanet ? (_planetScale * (1.1 + Math.random() * 0.45))
                                : (_planetScale * (0.60 + Math.random() * 0.22));
      } else {
        isHuge = !hugeObjectExists && Math.random() < 0.15;
        if(isHuge) hugeObjectExists = true;
        sizeBoost = isHuge ? 2.4 : (Math.random() < 0.3 ? 1.2 : 1.0);
        targetScale = group.scale * (0.8 + Math.random() * 0.4) * sizeBoost * _screenScale;
      }

      // ALL objects MUST start small and grow - NEVER start at full size
      var isZooming = true;
      var startScale = 0.05 + Math.random() * 0.1; // Always start very small (0.05-0.15)

      // Βάση ταχύτητας: πολύ αργά στο level 1, +1 ανά level
      var baseSpeed = 0.2 + Math.random() * 0.05; // 0.2-0.25 px/sec (tight range for uniform feel)

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

      // Astronauts: enter from left or right edge, grow while drifting, rotate slowly, exit other side
      var isAstronaut = group.isAstronaut || false;
      var astroRotSpd = 0;
      if(isAstronaut) {
        dir = Math.floor(Math.random() * 2); // 0=left→right, 1=right→left only
        var _aMargin = baseW * 2.0;
        startX = (dir === 0) ? -_aMargin : (Game.width + _aMargin);
        startY = Game.height * 0.10 + Math.random() * Game.height * 0.55;
        astroRotSpd = (0.15 + Math.random() * 0.25) * (Math.random() < 0.5 ? 1 : -1);
      }
      var objBaseSpeed   = isAstronaut ? (13 + Math.random() * 9) : baseSpeed;
      var objGrowSpeed   = isAstronaut ? (0.10 + Math.random() * 0.07) : (0.15 + Math.random() * 0.1);
      var objTargetScale = isAstronaut ? ((0.75 + Math.random() * 0.35) * _screenScale) : targetScale;

      // Asteroid trail: mark 2 asteroids (falling downward) with dust trails
      var isAsteroidGroup = !isPlanet && !isAstronaut && !group.canSparkle && !group.types[0].match(/^kenney_ufo/);
      var hasTrail = false;
      if(isAsteroidGroup && asteroidTrailCount < 2 && Math.random() < 0.45) {
        hasTrail = true;
        dir = 2; // force downward so trail looks like falling meteor
        startX = Math.random() * Game.width;
        startY = -Math.max(baseW, baseH) * targetScale - 20;
        asteroidTrailCount++;
      }

      this.objects.push({
        x: startX,
        y: isAstronaut ? startY : startY,
        sprite: spriteName,
        baseWidth: baseW,
        baseHeight: baseH,
        scale: isAstronaut ? 0.02 : startScale,
        targetScale: objTargetScale,
        minScale: 0.01,
        isZooming: isZooming,   // all objects grow in (including astronaut)
        isZoomPulse: false,     // no more zoom-pulse
        zoomDir: 1,
        opacity: group.opacity,
        baseOpacity: group.opacity,
        canSparkle: group.canSparkle || false,
        sparklePhase: Math.random() * Math.PI * 2,
        sparkleSpeed: 2 + Math.random() * 3,
        direction: dir,
        baseSpeed: objBaseSpeed,
        rotation: 0,
        rotationSpeed: isAstronaut ? astroRotSpd
                     : (group.canRotate ? (0.008 + Math.random() * 0.020) * (Math.random() < 0.5 ? 1 : -1) : 0),
        growSpeed: objGrowSpeed,
        hasTrail: hasTrail,
        trailLen: hasTrail ? (80 + Math.random() * 70) : 0,
        isAstronaut: isAstronaut,
        isPlanetObj: isPlanet,
        staticTimer: isPlanet ? (70 + Math.random() * 50) : 0,
        isMoving: !isPlanet,   // planets/stars start static; others move immediately
        // Cloud ring properties (planets only)
        cloudAngle:    isPlanet ? (Math.random() * Math.PI * 2) : 0,
        cloudDir:      isPlanet ? (Math.random() < 0.5 ? 1 : -1) : 0,
        cloudColorT:   isPlanet ? (Math.random() * 6) : 0,
        cloudColorSpd: isPlanet ? (0.12 + Math.random() * 0.20) : 0,
        debrisRocks:   isPlanet ? _makeDebrisRocks() : null,
        // Era-change departure system
        typePool:      group.types,   // so reset can pick a fresh sprite
        normalSpeed:   objBaseSpeed,  // remember baseline for reset
        departing:     false,
        departDelay:   0
      });
    }
  }
};

BackgroundObjectsSystem.prototype.step = function(dt) {
  this.sky.step(dt);
  this.ss.step(dt);
  this.ns.step(dt);

  // Era (scene) change: detect level advance, trigger every 6-7 levels
  if(currentLevel !== this._eraLastLevel) {
    this._eraLevelCount += (currentLevel - this._eraLastLevel);
    this._eraLastLevel = currentLevel;
    if(this._eraLevelCount >= this._eraInterval) {
      this._eraLevelCount = 0;
      this._eraInterval   = 6 + Math.floor(Math.random() * 2);
      // Stagger departure of every bg object over 0-18 seconds
      for(var _ei = 0; _ei < this.objects.length; _ei++) {
        var _eo = this.objects[_ei];
        if(!_eo.isAstronaut) {
          _eo.departing   = true;
          _eo.departDelay = Math.random() * 18; // staggered 0-18s
        }
      }
    }
  }

  // Background darkening state machine
  if(this._darkPhase === 'wait') {
    this._darkTimer -= dt;
    if(this._darkTimer <= 0) {
      this._darkPhase  = 'darken';
      this._darkTarget = 0.55 + Math.random() * 0.35; // peak darkness (55-90%)
      this._darkHold   = 4 + Math.random() * 10;      // hold 4-14 seconds
    }
  } else if(this._darkPhase === 'darken') {
    this._darkAlpha += dt * 0.12; // fade in over ~5s
    if(this._darkAlpha >= this._darkTarget) {
      this._darkAlpha = this._darkTarget;
      this._darkPhase = 'hold';
    }
  } else if(this._darkPhase === 'hold') {
    this._darkHold -= dt;
    if(this._darkHold <= 0) this._darkPhase = 'clear';
  } else if(this._darkPhase === 'clear') {
    this._darkAlpha -= dt * 0.08; // fade out slowly over ~7s
    if(this._darkAlpha <= 0) {
      this._darkAlpha = 0;
      this._darkPhase = 'wait';
      this._darkTimer = 25 + Math.random() * 50; // wait 25-75s before next event
    }
  }
  for(var i = 0; i < this.objects.length; i++) {
    var obj = this.objects[i];

    // Sparkle effect for stars (vary opacity)
    if(obj.canSparkle) {
      obj.sparklePhase += obj.sparkleSpeed * dt;
      obj.opacity = obj.baseOpacity * (0.5 + 0.5 * Math.sin(obj.sparklePhase));
    }

    // Zoom-pulse for astronauts: grow → peak → shrink → respawn
    if(obj.isZoomPulse) {
      obj.scale += obj.growSpeed * obj.zoomDir * dt;
      if(obj.zoomDir === 1 && obj.scale >= obj.targetScale) {
        obj.scale = obj.targetScale;
        obj.zoomDir = -1; // start shrinking (leaving)
      } else if(obj.zoomDir === -1 && obj.scale <= obj.minScale) {
        // Respawn at a new random position, start approaching again
        obj.x = Math.random() * Game.width;
        obj.y = Math.random() * Game.height;
        obj.scale = obj.minScale;
        obj.zoomDir = 1;
        obj.targetScale = (0.7 + Math.random() * 0.5) * this._screenScale;
      }
    }

    // Grow if zooming (αργά)
    if(obj.isZooming && obj.scale < obj.targetScale) {
      obj.scale += obj.growSpeed * dt;
      if(obj.scale > obj.targetScale) obj.scale = obj.targetScale;
    }

    // Era departure countdown: when delay expires, rush the object off screen
    if(obj.departing && obj.departDelay > 0) {
      obj.departDelay -= dt;
      if(obj.departDelay <= 0) {
        obj.departDelay = 0;
        obj.isMoving   = true;
        obj.baseSpeed  = obj.normalSpeed * 5 + 30; // rush away quickly
        obj.isZooming  = false;
      }
    }

    // Static timer: planets/stars stay put after growing, then start moving
    if(obj.isPlanetObj && !obj.isMoving) {
      if(obj.scale >= obj.targetScale * 0.97) {
        obj.staticTimer -= dt;
        if(obj.staticTimer <= 0) obj.isMoving = true;
      }
    }

    // Movement (planets/stars wait for staticTimer; asteroids/astronauts always move)
    if(obj.isMoving) {
      var lvl = currentLevel;
      var normalSpeed = obj.baseSpeed * (1 + (lvl - 1) * 0.04); // +4% per level (gentle ramp)
      var isBreathing = (lvl >= 60 && lvl <= 62) ||
                        (lvl >= 70 && lvl <= 72) ||
                        (lvl >= 80 && lvl <= 82) ||
                        (lvl >= 90 && lvl <= 92);
      var dynSpeed = isBreathing ? normalSpeed * 0.10 : normalSpeed;
      if(obj.direction === 0) obj.x += dynSpeed * dt; // left->right
      else if(obj.direction === 1) obj.x -= dynSpeed * dt; // right->left
      else if(obj.direction === 2) obj.y += dynSpeed * dt; // up->down
      else obj.y -= dynSpeed * dt; // down->up
    }

    // Self-rotation (μόνο αν επιτρέπεται)
    if(obj.rotationSpeed !== 0) {
      obj.rotation += obj.rotationSpeed * dt;
    }

    // Cloud ring rotation & color cycle (planets only)
    if(obj.isPlanetObj) {
      obj.cloudAngle  += dt * obj.cloudDir * 0.32;
      obj.cloudColorT += dt * obj.cloudColorSpd;
      // Orbit debris rocks
      if(obj.debrisRocks) {
        for(var _ri = 0; _ri < obj.debrisRocks.length; _ri++)
          obj.debrisRocks[_ri].angle += dt * obj.debrisRocks[_ri].angSpeed;
      }
    }

    // Current size
    var currentW = obj.baseWidth * obj.scale;
    var currentH = obj.baseHeight * obj.scale;

    // Reset if off screen
    if(!obj.isZoomPulse) {
    // helper: reset object to start fresh (small + static for planets)
    var _doReset = function(newX, newY) {
      // On era-change departure: swap to a fresh random sprite from the same pool
      if(obj.departing && obj.typePool && obj.typePool.length > 0) {
        var _newSprite = obj.typePool[Math.floor(Math.random() * obj.typePool.length)];
        var _newSpr = SpriteSheet.map[_newSprite];
        if(_newSpr) {
          obj.sprite     = _newSprite;
          obj.baseWidth  = _newSpr.w;
          obj.baseHeight = _newSpr.h;
        }
        obj.baseSpeed  = obj.normalSpeed;  // restore normal speed
        obj.departing  = false;
        obj.departDelay = 0;
        // new random cloud direction & color for planets
        if(obj.isPlanetObj) {
          obj.cloudDir   = Math.random() < 0.5 ? 1 : -1;
          obj.cloudColorT = Math.random() * 6;
        }
      }
      obj.x = newX; obj.y = newY;
      obj.scale = obj.isAstronaut ? 0.02 : (0.05 + Math.random() * 0.06);
      obj.isZooming = true;
      if(obj.isPlanetObj) { obj.staticTimer = 70 + Math.random() * 50; obj.isMoving = false; }
      if(obj.isAstronaut) {
        obj.direction = Math.floor(Math.random() * 2);
        var _am = obj.baseWidth * 2.0;
        obj.x = (obj.direction === 0) ? -_am : (Game.width + _am);
        obj.y = Game.height * 0.10 + Math.random() * Game.height * 0.55;
      }
    };
    if(obj.x > Game.width + currentW) {
      _doReset(-currentW, Math.random() * Game.height);
    }
    if(obj.x < -currentW) {
      _doReset(Game.width + currentW, Math.random() * Game.height);
    }
    if(obj.y > Game.height + currentH) {
      _doReset(Math.random() * Game.width, -currentH);
    }
    if(obj.y < -currentH) {
      _doReset(Math.random() * Game.width, Game.height + currentH);
    }
    } // end if(!isZoomPulse)
  }
};

// Create debris rocks array for a planet's orbital ring
function _makeDebrisRocks() {
  var colors = ['#c8a060','#a05830','#909098','#b83820','#d0b030','#607888','#c0b080','#806840','#a08878','#703030'];
  var rocks = [];
  var n = 16 + Math.floor(Math.random() * 8); // 16-23 rocks
  for(var i = 0; i < n; i++) {
    var rxF = 1.20 + Math.random() * 1.05; // orbit radius: 1.2-2.25× planet radius
    rocks.push({
      angle:    Math.random() * Math.PI * 2,
      angSpeed: (0.16 + Math.random() * 0.28) * (Math.random() < 0.5 ? 1 : -1),
      rxFrac:   rxF,
      ryFrac:   rxF * (0.28 + Math.random() * 0.14), // elliptical tilt: 28-42% of rx
      size:     1.2 + Math.random() * 3.8,
      color:    colors[Math.floor(Math.random() * colors.length)],
      alpha:    0.50 + Math.random() * 0.40
    });
  }
  return rocks;
}

// Draw debris rocks orbiting around a planet (frontOnly=true → draw rocks in front of planet)
function _drawDebrisRing(ctx, obj, currentW, frontOnly) {
  if(!obj.debrisRocks) return;
  var pcx = obj.x + currentW / 2;
  var pcy = obj.y + (obj.baseHeight * obj.scale) / 2;
  var pr  = currentW * 0.52;
  var rocks = obj.debrisRocks;
  for(var i = 0; i < rocks.length; i++) {
    var r = rocks[i];
    var sinA = Math.sin(r.angle);
    var isFront = sinA >= 0;
    if(frontOnly !== isFront) continue;
    var bx = pcx + Math.cos(r.angle) * pr * r.rxFrac;
    var by = pcy + sinA * pr * r.ryFrac;
    var depthFade = isFront ? 1.0 : (0.30 + 0.55 * Math.abs(sinA));
    var sz = r.size * (isFront ? 1.0 : 0.60);
    // Soft outer halo
    ctx.globalAlpha = r.alpha * depthFade * 0.28;
    ctx.fillStyle = r.color;
    ctx.beginPath();
    ctx.arc(bx, by, sz * 2.8, 0, Math.PI * 2);
    ctx.fill();
    // Rock core
    ctx.globalAlpha = r.alpha * depthFade;
    ctx.beginPath();
    ctx.arc(bx, by, sz, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Amorphous smoke-cloud haze around a planet — overlapping soft radial gradients, no defined shape
function _drawPlanetCloud(ctx, obj, currentW) {
  var pcx = obj.x + currentW / 2;
  var pcy = obj.y + (obj.baseHeight * obj.scale) / 2;
  var pr  = currentW * 0.52; // ~planet radius

  // Color palette: dark yellow, black, gray, dark blue, dark green, dark lilac
  var _pal = [
    [110,  80,   0],  // dark yellow / gold
    [  8,   8,   8],  // black cloud
    [112, 112, 128],  // gray
    [ 10,  16,  96],  // dark blue
    [ 10,  48,  32],  // dark green
    [ 61,  16,  96]   // dark lilac
  ];
  var N  = _pal.length;
  var t  = obj.cloudColorT % N;
  var ci = Math.floor(t) % N;
  var cn = (ci + 1) % N;
  var f  = t - Math.floor(t);
  var cr = Math.round(_pal[ci][0] * (1 - f) + _pal[cn][0] * f);
  var cg = Math.round(_pal[ci][1] * (1 - f) + _pal[cn][1] * f);
  var cb = Math.round(_pal[ci][2] * (1 - f) + _pal[cn][2] * f);

  // Irregular blob cluster — each: [dist×pr, baseAngle, size×pr]
  // Blobs overlap heavily → amorphous smoke with no visible shape
  var _blobs = [
    [0.00, 0.00, 0.95],  // dense core haze over the planet
    [0.40, 0.00, 0.78],
    [0.45, 1.05, 0.72],
    [0.52, 2.20, 0.80],
    [0.38, 3.45, 0.75],
    [0.50, 4.65, 0.70],
    [0.32, 5.75, 0.82],
    [0.58, 0.55, 0.65],
    [0.42, 3.85, 0.70],
    [0.20, 2.80, 0.88]   // extra off-centre blob for irregularity
  ];

  for(var i = 0; i < _blobs.length; i++) {
    var bl  = _blobs[i];
    var ang = bl[1] + obj.cloudAngle;
    var bx  = pcx + Math.cos(ang) * bl[0] * pr;
    var by  = pcy + Math.sin(ang) * bl[0] * pr;
    var br  = bl[2] * pr;

    var grad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
    grad.addColorStop(0,    'rgba(' + cr + ',' + cg + ',' + cb + ',0.13)');
    grad.addColorStop(0.40, 'rgba(' + cr + ',' + cg + ',' + cb + ',0.07)');
    grad.addColorStop(1,    'rgba(' + cr + ',' + cg + ',' + cb + ',0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fill();
  }

  // Outer dust cloud — extends beyond planet into the debris ring zone
  var _dustPal = [
    [190, 130,  40],  // orange dust
    [150, 100,  50],  // rust/brown
    [170, 150,  60],  // golden dust
    [ 90,  90, 120],  // cold grey-blue
    [160,  80,  30],  // deep rust
    [120, 140,  80]   // murky green-gold
  ];
  var di = Math.floor((obj.cloudColorT * 0.55)) % _dustPal.length;
  var dn = (di + 1) % _dustPal.length;
  var df = (obj.cloudColorT * 0.55) - Math.floor(obj.cloudColorT * 0.55);
  var dr = Math.round(_dustPal[di][0]*(1-df) + _dustPal[dn][0]*df);
  var dg = Math.round(_dustPal[di][1]*(1-df) + _dustPal[dn][1]*df);
  var db = Math.round(_dustPal[di][2]*(1-df) + _dustPal[dn][2]*df);

  var _outerBlobs = [
    [1.35, 0.30, 0.70], [1.55, 1.45, 0.75], [1.30, 2.55, 0.65],
    [1.60, 3.75, 0.80], [1.45, 4.95, 0.68], [1.25, 5.80, 0.62],
    [1.65, 0.95, 0.60], [1.42, 2.15, 0.66], [1.52, 3.30, 0.64],
    [1.38, 4.55, 0.72], [1.70, 1.80, 0.58], [1.28, 5.20, 0.70]
  ];
  for(var j = 0; j < _outerBlobs.length; j++) {
    var ob = _outerBlobs[j];
    var oang = ob[1] + obj.cloudAngle * 0.55;
    var obx  = pcx + Math.cos(oang) * ob[0] * pr;
    var oby  = pcy + Math.sin(oang) * ob[0] * pr * 0.42; // elliptical tilt for 3D look
    var obr  = ob[2] * pr;
    var og = ctx.createRadialGradient(obx, oby, 0, obx, oby, obr);
    og.addColorStop(0,   'rgba(' + dr + ',' + dg + ',' + db + ',0.11)');
    og.addColorStop(0.5, 'rgba(' + dr + ',' + dg + ',' + db + ',0.05)');
    og.addColorStop(1,   'rgba(' + dr + ',' + dg + ',' + db + ',0)');
    ctx.fillStyle = og;
    ctx.beginPath();
    ctx.arc(obx, oby, obr, 0, Math.PI * 2);
    ctx.fill();
  }
}

BackgroundObjectsSystem.prototype.draw = function(ctx) {
  this.sky.draw(ctx); // sky color first (behind everything)
  this.ns.draw(ctx);  // then nebulae
  this.ss.draw(ctx);
  ctx.save();
  ctx.lineCap = 'round';
  // Depth rule: bigger = closer = drawn last (in front). Sort by max dimension.
  var _drawObjs = this.objects.slice().sort(function(a, b) {
    var sizeA = Math.max(a.baseWidth * a.scale, a.baseHeight * a.scale);
    var sizeB = Math.max(b.baseWidth * b.scale, b.baseHeight * b.scale);
    return sizeA - sizeB; // smallest first (behind), largest last (in front)
  });
  for(var i = 0; i < _drawObjs.length; i++) {
    var obj = _drawObjs[i];
    var currentW = obj.baseWidth * obj.scale;
    var currentH = obj.baseHeight * obj.scale;

    ctx.save(); // isolate each object's transforms and alpha

    // Asteroid trail (drawn before the rock, behind it)
    if(obj.hasTrail && obj.trailLen > 0) {
      var cx0 = obj.x + currentW/2;
      var cy0 = obj.y + currentH/2;
      var dvx = [1,-1,0,0][obj.direction];
      var dvy = [0,0,1,-1][obj.direction];
      var tx0 = cx0 - dvx * obj.trailLen;
      var ty0 = cy0 - dvy * obj.trailLen;
      var tg = ctx.createLinearGradient(tx0, ty0, cx0, cy0);
      tg.addColorStop(0,   'rgba(180,140,90,0)');
      tg.addColorStop(0.5, 'rgba(200,160,100,0.18)');
      tg.addColorStop(1,   'rgba(240,200,140,0.45)');
      ctx.globalAlpha = 1;
      ctx.beginPath(); ctx.moveTo(tx0, ty0); ctx.lineTo(cx0, cy0);
      ctx.strokeStyle = tg; ctx.lineWidth = Math.max(3, currentW * 0.22); ctx.stroke();
      var tg2 = ctx.createLinearGradient(tx0, ty0, cx0, cy0);
      tg2.addColorStop(0, 'rgba(255,240,200,0)');
      tg2.addColorStop(1, 'rgba(255,255,220,0.6)');
      ctx.beginPath(); ctx.moveTo(tx0, ty0); ctx.lineTo(cx0, cy0);
      ctx.strokeStyle = tg2; ctx.lineWidth = Math.max(1, currentW * 0.05); ctx.stroke();
    }

    ctx.globalAlpha = obj.opacity; // always 1.0 — no see-through

    // Self-rotation: isolated per object (no accumulation)
    if(obj.rotationSpeed !== 0) {
      var rcx = obj.x + currentW / 2;
      var rcy = obj.y + currentH / 2;
      ctx.translate(rcx, rcy);
      ctx.rotate(obj.rotation);
      ctx.translate(-rcx, -rcy);
    }

    // Debris rocks BEHIND planet (sin < 0 → upper half of orbit = further away)
    if(obj.isPlanetObj) _drawDebrisRing(ctx, obj, currentW, false);

    SpriteSheet.draw(ctx, obj.sprite, obj.x, obj.y, 0, currentW, currentH);

    // Smoke cloud haze + outer dust ring
    if(obj.isPlanetObj) _drawPlanetCloud(ctx, obj, currentW);

    // Debris rocks IN FRONT of planet (sin ≥ 0 → lower half of orbit = closer)
    if(obj.isPlanetObj) _drawDebrisRing(ctx, obj, currentW, true);

    ctx.restore(); // restore after each object — transforms don't bleed into next
  }
  ctx.restore(); // outer restore

  // Periodic background darkening overlay
  if(this._darkAlpha > 0) {
    ctx.save();
    ctx.globalAlpha = this._darkAlpha;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, Game.width, Game.height);
    ctx.restore();
  }
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

  // 20% smaller than the auto-scaled sprite size
  this.w = Math.round(this.w * 0.8);
  this.h = Math.round(this.h * 0.8);

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
  this.rapidFireTimer = 0;
  this.tripleShotTimer = 0;
  this.timeSlowTimer = 0;
  this.magnetTimer = 0;
  Game.timeSlowFactor = 1.0;

  // Invincibility after taking damage
  this.invincible = 0;

  this.step = function(dt) {
    // Cheat code: hold 1+2+3+4 simultaneously → toggle god mode (infinite lives)
    var _cheatAll = Game.keys['num1'] && Game.keys['num2'] && Game.keys['num3'] && Game.keys['num4'];
    if(_cheatAll && !Game._godComboHeld) {
      Game._godComboHeld = true;
      Game.godMode = !Game.godMode;
      Game._godMsgTimer = 2.8;
    } else if(!_cheatAll) {
      Game._godComboHeld = false;
    }
    if(Game._godMsgTimer > 0) Game._godMsgTimer -= dt;

    // Update power-up timers
    if(this.speedBoostTimer > 0) this.speedBoostTimer -= dt;
    if(this.powerShotTimer > 0) this.powerShotTimer -= dt;
    if(this.rapidFireTimer > 0) this.rapidFireTimer -= dt;
    if(this.tripleShotTimer > 0) this.tripleShotTimer -= dt;
    if(this.magnetTimer > 0) this.magnetTimer -= dt;
    if(this.timeSlowTimer > 0) {
      this.timeSlowTimer -= dt;
      Game.timeSlowFactor = 0.35;
    } else {
      Game.timeSlowFactor = 1.0;
    }
    if(this.invincible > 0) this.invincible -= dt;

    if (Game.mobile) {
      // Mobile: analog drag control via MOVE zone
      var spd = this.speedBoostTimer > 0 ? 320 : 240;
      var moveX = Game.mobileMoveX || 0;
      if (moveX !== 0) this.x += spd * moveX * dt;
    } else {
      // Desktop: ship follows mouse
      if (typeof Game.mouseX !== 'undefined') {
        var targetX = Game.mouseX - this.w / 2;
        var diff = targetX - this.x;
        var followSpeed = this.speedBoostTimer > 0 ? 25 : 15;
        this.x += diff * followSpeed * dt;
      }
    }

    // Keep ship on screen
    if(this.x < 0) { this.x = 0; }
    else if(this.x > Game.width - this.w) {
      this.x = Game.width - this.w;
    }

    this.reload-=dt;
    this.rocketReload -= dt;

    // Normal fire (reload timer prevents rapid fire; no key reset = auto-fire works on mobile)
    if(Game.keys['fire'] && this.reload < 0) {
      this.reload = this.rapidFireTimer > 0 ? 0.07 : this.reloadTime;

      var dmg = this.powerShotTimer > 0 ? 20 : 10;
      var _cx = this.x + this.w / 2;
      var m1 = new PlayerMissile(_cx - 6, this.y);
      var m2 = new PlayerMissile(_cx + 6, this.y);
      m1.damage = dmg;
      m2.damage = dmg;
      this.board.add(m1);
      this.board.add(m2);
      // Triple shot: extra missile from ship center
      if(this.tripleShotTimer > 0) {
        var m3 = new PlayerMissile(_cx, this.y);
        m3.damage = dmg;
        this.board.add(m3);
      }
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
  } else if(letter === 'R') {
    // Rapid Fire: 3.5× faster shooting for 8 seconds
    this.rapidFireTimer = 8;
  } else if(letter === 'X') {
    // Triple Shot: 3 missiles per burst for 8 seconds
    this.tripleShotTimer = 8;
  } else if(letter === 'I') {
    // Invincible Shield: 7 seconds of immunity
    this.invincible = 7;
  } else if(letter === 'T') {
    // Time Slow: enemies at 35% speed for 8 seconds
    this.timeSlowTimer = 8;
    Game.timeSlowFactor = 0.35;
  } else if(letter === 'M') {
    // Magnet: all power-ups fly toward player for 10 seconds
    this.magnetTimer = 10;
  } else if(letter === 'G') {
    // Giant Laser: vertical beam that vaporises a column of enemies
    this.board.add(new GiantLaser(this.x + this.w / 2));
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

// Giant Laser (G power-up): full-height beam that vaporises enemies in a column
var GiantLaser = function(cx) {
  this.cx = cx;
  this.alpha = 1.2;
  this.t = 0;
  this.beamW = 22;
  this.fired = false;
};
GiantLaser.prototype.step = function(dt) {
  this.t += dt;
  this.alpha -= dt * 2.8;
  if(!this.fired && this.t > 0.05) {
    this.fired = true;
    for(var i = 0; i < this.board.objects.length; i++) {
      var obj = this.board.objects[i];
      if(obj.type === OBJECT_ENEMY) {
        var ecx = obj.x + (obj.w || 0) / 2;
        if(Math.abs(ecx - this.cx) < this.beamW * 3.5) {
          obj.hit(90);
        }
      }
    }
    Game.shake(10, 0.35);
    SoundManager.playRocket();
  }
  if(this.alpha <= 0) this.board.remove(this);
};
GiantLaser.prototype.draw = function(ctx) {
  var a = Math.max(0, Math.min(1, this.alpha));
  ctx.save();
  // Wide outer glow
  var outerGrad = ctx.createLinearGradient(this.cx - this.beamW * 3, 0, this.cx + this.beamW * 3, 0);
  outerGrad.addColorStop(0,   'rgba(255,0,68,0)');
  outerGrad.addColorStop(0.5, 'rgba(255,0,68,' + (a * 0.45) + ')');
  outerGrad.addColorStop(1,   'rgba(255,0,68,0)');
  ctx.fillStyle = outerGrad;
  ctx.fillRect(this.cx - this.beamW * 3, 0, this.beamW * 6, Game.height);
  // Bright core
  var coreGrad = ctx.createLinearGradient(this.cx - this.beamW / 2, 0, this.cx + this.beamW / 2, 0);
  coreGrad.addColorStop(0,   'rgba(255,180,180,0)');
  coreGrad.addColorStop(0.5, 'rgba(255,255,255,' + a + ')');
  coreGrad.addColorStop(1,   'rgba(255,180,180,0)');
  ctx.fillStyle = coreGrad;
  ctx.fillRect(this.cx - this.beamW / 2, 0, this.beamW, Game.height);
  ctx.restore();
};

PlayerShip.prototype.changeShip = function(spriteKey) {
  if(!SpriteSheet.map[spriteKey]) return;
  var spr  = SpriteSheet.map[spriteKey];
  var _ss  = Game.spriteScale || 1.0;
  // Keep same visual footprint as the original ship (37×42 base, ×0.8 shrink)
  var _base = 37 * _ss * 0.8;
  var oldCx = this.x + this.w / 2;
  var oldCy = this.y + this.h / 2;
  this.sprite = spriteKey;
  this.w = Math.round(_base);
  this.h = Math.round(_base);
  this.x = Math.round(oldCx - this.w / 2);
  this.y = Math.round(oldCy - this.h / 2);
  // Brief invincibility flash on ship change
  this.invincible = 1.5;
};

PlayerShip.prototype.hit = function(damage) {
  if(this.invincible > 0) return; // Invincible — no damage
  if(!Game.godMode) {
    playerLives--;
    playerHitStreak = 0; // reset streak on hit
  }
  this.invincible = 2.0; // 2 seconds of invincibility
  Game.mouseX = this.x + this.w / 2; // freeze spring target so ship stays put
  SoundManager.playPlayerHit();
  Game.shake(16, 0.45);
  if(!Game.godMode && playerLives <= 0) {
    if(this.board.remove(this)) {
      loseGame();
    }
  }
};

PlayerShip.prototype.draw = function(ctx) {
  ctx.save();
  var cx = this.x + this.w / 2;
  var engineY = this.y + this.h;

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

  // Time Slow: subtle purple screen tint
  if(this.timeSlowTimer > 0) {
    ctx.save();
    ctx.globalAlpha = 0.09;
    ctx.fillStyle = '#AA00FF';
    ctx.fillRect(0, 0, Game.width, Game.height);
    ctx.restore();
  }

  // Ship glow colour changes with highest-priority active power-up
  ctx.shadowColor = this.timeSlowTimer > 0    ? '#AA00FF' :
                    this.magnetTimer > 0       ? '#FFCC00' :
                    this.rapidFireTimer > 0    ? '#FF8800' :
                    this.tripleShotTimer > 0   ? '#00FFFF' :
                    this.speedBoostTimer > 0   ? '#00FF88' :
                    this.powerShotTimer > 0    ? '#FF6600' : '#4499FF';
  ctx.shadowBlur = 18;

  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame, this.w, this.h);
  ctx.restore();

  // God mode: pulsing gold indicator in top-left + activation message
  if(Game.godMode) {
    ctx.save();
    var _gPulse = 0.65 + 0.35 * Math.sin(Date.now() * 0.005);
    ctx.globalAlpha = _gPulse;
    ctx.font = 'bold 9px monospace';
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = '#FF8800';
    ctx.shadowBlur = 8;
    ctx.textAlign = 'left';
    ctx.fillText('\u2605 GOD \u2605', 6, 14);
    ctx.restore();
  }
  // Activation / deactivation flash message
  if(Game._godMsgTimer > 0) {
    var _mAlpha = Math.min(1, Game._godMsgTimer * 1.2);
    ctx.save();
    ctx.globalAlpha = _mAlpha;
    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = Game.godMode ? '#FFD700' : '#AAAAAA';
    ctx.shadowColor = Game.godMode ? '#FF8800' : '#444444';
    ctx.shadowBlur = 14;
    ctx.textAlign = 'center';
    ctx.fillText(Game.godMode ? '\u2605 GOD MODE ON \u2605' : '\u2605 GOD MODE OFF \u2605', Game.width / 2, Game.height / 2 - 24);
    ctx.restore();
  }
};


var PlayerMissile = function(x,y) {
  var streakBoost = Math.min(playerHitStreak, 8) * 60; // +60 vy per hit, max +480
  this.setup('missile',{ vy: -700 - streakBoost, damage: 10 });
  this.streakLevel = Math.min(playerHitStreak, 8); // for color feedback
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

  // Color shifts cyan→yellow→orange with streak
  var sl = this.streakLevel || 0;
  var outerColor = sl >= 6 ? '#FF6600' : sl >= 3 ? '#FFDD00' : '#00FFFF';
  var glowColor  = sl >= 6 ? '#FF4400' : sl >= 3 ? '#FFBB00' : '#00DDFF';
  var beamWidth  = 5 + sl * 0.5; // slightly thicker at high streak

  // Outer glow beam
  ctx.strokeStyle = outerColor;
  ctx.lineWidth = beamWidth;
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 14 + sl * 2;
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
    playerHitStreak = Math.min(playerHitStreak + 1, 8); // hit → boost streak
    this.board.remove(this);
  } else if(this.y < -this.h) {
    playerHitStreak = Math.max(0, playerHitStreak - 1); // miss → cool down
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
  // Track active motherships for sky red tint
  if(this.isMotherShip) { Game.motherShipCount = (Game.motherShipCount || 0) + 1; }
  // Motherships sway slower than regular enemies
  if(this.isMotherShip || this.isBossShip) {
    this.swaySpeed = 0.4 + Math.random() * 0.25; // 0.4-0.65 rad/s (much slower than normal 1.5-2.5)
    // Scale down 30%, then cap to 65% of screen width for mobile
    var _mW = Math.round(Math.min(this.w * 0.70, Game.width * 0.65));
    this.w = _mW;
    this.h = _mW; // square
    // Center horizontally on screen
    this.x = Math.round(Game.width / 2 - this.w / 2);
  }
  // Early levels: slow non-boss enemies way down
  if(!this.isMotherShip && !this.isBossShip) {
    var _lvlM = currentLevel <= 5 ? 0.25 : Math.min(0.80, 0.25 + (currentLevel - 5) * 0.055);
    if(this.swoopSpeed) this.swoopSpeed *= _lvlM;
    if(this.scurveSpeed) this.scurveSpeed *= _lvlM;
    if(this.corkFall) this.corkFall *= _lvlM;
    if(this.pendFall) this.pendFall *= _lvlM;
    if(this.zigSpeed) this.zigSpeed *= _lvlM;
    if(this.E) this.E *= _lvlM;
    if(this.fig8Drift) this.fig8Drift *= _lvlM;
    if(this.boomSpeed) this.boomSpeed *= _lvlM;
  }
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
      // Phase 2: move left-right at fixed height (no descent)
      this.x += this.motherSpeed * this.motherDir * dt;

      // Bounce off edges
      if(this.x + this.w > Game.width - 20) {
        this.x = Game.width - this.w - 20;
        this.motherDir = -1; // Go left
      }
      if(this.x < 20) {
        this.x = 20;
        this.motherDir = 1; // Go right
      }

      // Trail — αποθηκεύουμε τις τελευταίες θέσεις για το ghostly effect
      if(!this.motherTrail) this.motherTrail = [];
      this.motherTrail.push({x: this.x, y: this.y});
      if(this.motherTrail.length > 10) this.motherTrail.shift();
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
      if(this.isMotherShip) { Game.motherShipCount = Math.max(0, (Game.motherShipCount || 0) - 1); }
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
        this.board.add(new ParticleExplosion(cx, cy, this.w, this.sprite));
        // Omnidirectional death burst — missiles fly outward to all directions
        if(this.isMotherShip) {
          var burstCount = 16;
          var burstSpd = 280 + Math.random() * 100;
          for(var bm = 0; bm < burstCount; bm++) {
            var ang = (bm / burstCount) * Math.PI * 2;
            var m = new EnemyMissile(cx, cy);
            m.vx = Math.cos(ang) * burstSpd;
            m.vy = Math.sin(ang) * burstSpd;
            this.board.add(m);
          }
        }
        earnPoints(this.board, cx, cy - 50, this.points || 500);
        this.board.add(new PowerUp(cx, cy));
      } else {
        SoundManager.playEnemyDeath();
        Game.shake(6, 0.18);
        var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
        this.board.add(new Explosion(ecx, ecy));
        this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
        earnPoints(this.board, ecx, this.y, this.points || 100);
        if(Math.random() < 0.15) {
          this.board.add(new PowerUp(ecx, ecy));
        }
      }
    }
  } else {
    // Hit but not dead — impact effect
    var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
    if(this.isMotherShip || this.isBossShip) {
      this.board.add(new MotherShipImpact(ecx, ecy));
    } else {
      this.board.add(new MissileImpactSpark(ecx, ecy));
    }
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
    ctx.scale(1.2, 1.2); // 20% BIGGER
    ctx.translate(-bCx, -bCy);
  }

  // Apply individual sway rotation (30 degrees) + banking rotation
  if(!this.isMotherShip && !this.isBossShip) {
    var totalRotation = this.swayAngle + (this.bankAngle || 0);
    ctx.translate(bCx, bCy);
    ctx.rotate(Math.max(-0.52, Math.min(0.52, totalRotation))); // ~30 degrees max
    ctx.translate(-bCx, -bCy);
  }

  // Mothership pulsing danger aura (circles the scaled-down sphere)
  if((this.isMotherShip || this.isBossShip) && this.motherArrived) {
    var mCx = this.x + this.w / 2;
    var mCy = this.y + this.h / 2;
    var _auraHR = this.maxHealth ? Math.max(0.35, this.health / this.maxHealth) : 1.0;
    var _auraScale = 0.86 * (0.75 + 0.25 * _auraHR);
    var _auraR  = Math.min(this.w, this.h) * _auraScale * 0.52;
    var auraPulse = 0.22 + 0.16 * Math.sin(this.t * 3.5);
    ctx.save();
    ctx.globalAlpha = auraPulse;
    ctx.shadowColor = '#FF3300';
    ctx.shadowBlur = 45;
    ctx.strokeStyle = '#FF5500';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(mCx, mCy, _auraR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Mothership / BossShip ghostly trail (εμφανίζεται όταν αλλάζει κατεύθυνση)
  if((this.isMotherShip || this.isBossShip) && this.motherTrail && this.motherTrail.length > 1) {
    var _tHR = this.maxHealth ? Math.max(0.35, this.health / this.maxHealth) : 1.0;
    var _tScale = 0.86 * (0.75 + 0.25 * _tHR);
    var _tClipR = Math.min(this.w, this.h) * 0.47;
    for(var _ti = 0; _ti < this.motherTrail.length - 1; _ti++) {
      var _ta = ((_ti + 1) / this.motherTrail.length) * 0.20;
      var _tp = this.motherTrail[_ti];
      var _tCX = _tp.x + this.w / 2;
      var _tCY = _tp.y + this.h / 2;
      ctx.save();
      ctx.globalAlpha = _ta;
      ctx.globalCompositeOperation = 'screen';
      ctx.translate(_tCX, _tCY);
      ctx.scale(_tScale, _tScale);
      ctx.translate(-_tCX, -_tCY);
      ctx.beginPath();
      ctx.arc(_tCX, _tCY, _tClipR, 0, Math.PI * 2);
      ctx.clip();
      SpriteSheet.draw(ctx, this.sprite, _tp.x, _tp.y, this.frame, this.w, this.h);
      ctx.restore();
    }
  }

  // Boss/mothership: scale down & clip to circle; shrinks with damage
  var _bossMScale = 1.0;
  if(this.isMotherShip || this.isBossShip) {
    var _bossHR  = this.maxHealth ? Math.max(0.35, this.health / this.maxHealth) : 1.0;
    _bossMScale  = 0.86 * (0.75 + 0.25 * _bossHR); // 0.645 → 0.86 range (+10% bigger)
    var _bossCX  = this.x + this.w / 2;
    var _bossCY  = this.y + this.h / 2;
    var _clipR   = Math.min(this.w, this.h) * 0.47; // clip radius in sprite-local space
    ctx.save();
    ctx.translate(_bossCX, _bossCY);
    ctx.scale(_bossMScale, _bossMScale);
    ctx.rotate(Math.max(-0.52, Math.min(0.52, this.swayAngle))); // 30 deg sway
    ctx.translate(-_bossCX, -_bossCY);
    ctx.beginPath();
    ctx.arc(_bossCX, _bossCY, _clipR, 0, Math.PI * 2);
    ctx.clip();
    // Black-background sprites: use 'screen' blend so black pixels become transparent
    var _sprInfo = SpriteSheet.map[this.sprite];
    if (_sprInfo && _sprInfo.blackBg) { ctx.globalCompositeOperation = 'screen'; }
    SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame, this.w, this.h);
    ctx.restore(); // also restores globalCompositeOperation
  } else {
    SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame, this.w, this.h);
  }

  // Hit flash — white sparks distributed around the circular boss edge
  if(this.hitFlash > 0 && (this.isMotherShip || this.isBossShip)) {
    var _effR = Math.min(this.w, this.h) * _bossMScale * 0.47;
    ctx.globalAlpha = Math.min(1, this.hitFlash) * 0.9;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 3;
    var numDots = 15 + Math.floor(Math.random() * 10);
    for(var d = 0; d < numDots; d++) {
      var angle = Math.random() * Math.PI * 2;
      var dist  = (Math.random() * 0.4 + 0.6) * _effR;
      var dotX  = this.x + this.w / 2 + Math.cos(angle) * dist;
      var dotY  = this.y + this.h / 2 + Math.sin(angle) * dist;
      var dotSize = 0.5 + Math.random() * 1.0;
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
    // Health bar positioned above the actual drawn (scaled) sphere
    var _bossEffR = Math.min(this.w, this.h) * _bossMScale * 0.47;
    var _bossCtrX  = this.x + this.w / 2;
    var _bossCtrY  = this.y + this.h / 2;
    var barW = Math.min(_bossEffR * 2 * 0.9, 180);
    var barX = _bossCtrX - barW / 2;
    var barY = _bossCtrY - _bossEffR - 18; // just above the circle
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

    // Red pulsing ring — follows the circular boss edge
    var ringCX = _bossCtrX;
    var ringCY = _bossCtrY;
    var ringR  = _bossEffR * 1.06; // just outside the sphere edge
    var pulse  = 0.28 + Math.sin(Date.now() * 0.004) * 0.14;
    var flashA = this.hitFlash > 0 ? this.hitFlash : pulse;
    ctx.globalAlpha = flashA;
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth   = this.hitFlash > 0 ? 3 + this.hitFlash * 5 : 2.5;
    ctx.shadowColor = '#FF0000';
    ctx.shadowBlur  = this.hitFlash > 0 ? 30 + this.hitFlash * 40 : 12;
    ctx.beginPath();
    ctx.arc(ringCX, ringCY, ringR, 0, Math.PI * 2);
    ctx.stroke();
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
  this.x += (this.vx || 0) * dt;
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_PLAYER)
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y > Game.height + 50 || this.y < -50 ||
             this.x < -50 || this.x > Game.width + 50) {
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
// Sample ~6 non-transparent pixel colors from a sprite image
function _sampleSpriteRgb(spriteName) {
  var s = SpriteSheet.map[spriteName];
  if(!s) return null;
  var img = s.file ? SpriteSheet.images[s.file] : SpriteSheet.image;
  if(!img) return null;
  try {
    var oc = document.createElement('canvas');
    oc.width = 20; oc.height = 20;
    var ox = oc.getContext('2d');
    ox.drawImage(img, 0, 0, 20, 20);
    var d = ox.getImageData(0, 0, 20, 20).data;
    var out = [];
    for(var t = 0; t < 300 && out.length < 6; t++) {
      var px = Math.floor(Math.random() * 20);
      var py = Math.floor(Math.random() * 20);
      var idx = (py * 20 + px) * 4;
      if(d[idx+3] > 90) out.push(d[idx] + ',' + d[idx+1] + ',' + d[idx+2]);
    }
    return out.length ? out : null;
  } catch(e) { return null; }
}

var ParticleExplosion = function(cx, cy, size, spriteName) {
  this.particles = [];
  this.dust = [];
  var count = 20 + Math.floor(Math.random() * 16);
  var colors = ['#FF8800','#FF4400','#FFFF00','#FF2200','#FF6600','#FFFFFF','#FFAA44','#FF5522'];
  size = size || 64;

  // Sample enemy sprite colors for dust; fallback to warm greys
  var sampledRgb = spriteName ? _sampleSpriteRgb(spriteName) : null;
  var dustPalette = sampledRgb && sampledRgb.length
    ? sampledRgb
    : ['160,130,90','145,120,80','175,148,100','125,110,78','155,140,95'];

  // Fire sparks
  for(var i = 0; i < count; i++) {
    var angle = Math.random() * Math.PI * 2;
    var speed = (55 + Math.random() * 190) * (size / 64);
    var life = 0.35 + Math.random() * 0.55;
    this.particles.push({
      x: cx + (Math.random() - 0.5) * size * 0.3,
      y: cy + (Math.random() - 0.5) * size * 0.3,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: life, maxLife: life,
      size: 1.5 + Math.random() * 3.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  // Dust puffs — irregular blobs, sprite-colored, dissolve over ~1.5-2.5s
  var dustN = 5 + Math.floor(Math.random() * 5);
  for(var d = 0; d < dustN; d++) {
    var da = Math.random() * Math.PI * 2;
    var ds = (18 + Math.random() * 38) * (size / 64);
    var dl = 1.5 + Math.random() * 1.1;
    // Pre-generate random blob sub-circles so shape is fixed (not flickering)
    var blobs = [];
    var bc = 4 + Math.floor(Math.random() * 4);
    for(var b = 0; b < bc; b++) {
      blobs.push({
        ox: (Math.random() - 0.5) * 0.88, // offset relative to puff radius
        oy: (Math.random() - 0.5) * 0.88,
        rs: 0.36 + Math.random() * 0.54   // sub-radius relative to puff radius
      });
    }
    this.dust.push({
      x: cx + (Math.random() - 0.5) * size * 0.28,
      y: cy + (Math.random() - 0.5) * size * 0.28,
      vx: Math.cos(da) * ds, vy: Math.sin(da) * ds - 14,
      r: size * (0.16 + Math.random() * 0.16),
      maxR: size * (0.52 + Math.random() * 0.72),
      life: dl, maxLife: dl,
      rgb: dustPalette[Math.floor(Math.random() * dustPalette.length)],
      blobs: blobs
    });
  }
};

ParticleExplosion.prototype.step = function(dt) {
  var alive = 0;
  for(var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    if(p.life > 0) {
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vy += 110 * dt; p.vx *= 0.975;
      p.life -= dt; alive++;
    }
  }
  for(var d = 0; d < this.dust.length; d++) {
    var du = this.dust[d];
    if(du.life > 0) {
      du.x += du.vx * dt; du.y += du.vy * dt;
      du.vx *= 0.94; du.vy *= 0.94;
      du.r += (du.maxR - du.r) * 1.8 * dt; // expand toward maxR
      du.life -= dt; alive++;
    }
  }
  if(alive === 0) this.board.remove(this);
};

ParticleExplosion.prototype.draw = function(ctx) {
  ctx.save();

  // Draw dust clouds first (behind fire sparks) — irregular blob shapes
  for(var d = 0; d < this.dust.length; d++) {
    var du = this.dust[d];
    if(du.life <= 0) continue;
    var da = du.life / du.maxLife;
    ctx.globalAlpha = 1;
    for(var b = 0; b < du.blobs.length; b++) {
      var bl = du.blobs[b];
      var bx = du.x + bl.ox * du.r;
      var by = du.y + bl.oy * du.r;
      var br = Math.max(1, du.r * bl.rs);
      var grad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      grad.addColorStop(0,    'rgba(' + du.rgb + ',' + (da * 0.40) + ')');
      grad.addColorStop(0.5,  'rgba(' + du.rgb + ',' + (da * 0.20) + ')');
      grad.addColorStop(1,    'rgba(' + du.rgb + ',0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Fire sparks on top
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
// ===================================================================
// MOTHERSHIP IMPACT — big smoke puffs + large sparks when mothership is hit
// ===================================================================
var MotherShipImpact = function(cx, cy) {
  // Large cyan sparks
  this.sparks = [];
  var sc = 10 + Math.floor(Math.random() * 8);
  for(var i = 0; i < sc; i++) {
    var ang = Math.random() * Math.PI * 2;
    var spd = 80 + Math.random() * 180;
    var life = 0.25 + Math.random() * 0.35;
    this.sparks.push({ x:cx, y:cy,
      vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd,
      life:life, maxLife:life,
      size: 3.5 + Math.random() * 5.5 });
  }
  // Expanding smoke puffs
  this.puffs = [];
  var pc = 5 + Math.floor(Math.random() * 4);
  for(var p = 0; p < pc; p++) {
    var ang = Math.random() * Math.PI * 2;
    var spd = 20 + Math.random() * 60;
    this.puffs.push({ x: cx + (Math.random()-0.5)*40, y: cy + (Math.random()-0.5)*30,
      vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd,
      r: 12 + Math.random()*18,        // start radius
      maxR: 55 + Math.random()*60,     // expand to this
      life: 0.55 + Math.random()*0.45, // 0.55-1.0s
      maxLife: 0 });
    this.puffs[this.puffs.length-1].maxLife = this.puffs[this.puffs.length-1].life;
  }
};
MotherShipImpact.prototype.step = function(dt) {
  var alive = 0;
  for(var i = 0; i < this.sparks.length; i++) {
    var s = this.sparks[i];
    if(s.life > 0) { s.x+=s.vx*dt; s.y+=s.vy*dt; s.vx*=0.83; s.life-=dt; alive++; }
  }
  for(var p = 0; p < this.puffs.length; p++) {
    var pf = this.puffs[p];
    if(pf.life > 0) {
      pf.x += pf.vx*dt; pf.y += pf.vy*dt;
      pf.vx *= 0.90; pf.vy *= 0.90;
      var prog = 1 - pf.life / pf.maxLife;
      pf.r = pf.r + (pf.maxR - pf.r) * Math.min(1, prog * 2.5);
      pf.life -= dt;
      alive++;
    }
  }
  if(alive === 0) this.board.remove(this);
};
MotherShipImpact.prototype.draw = function(ctx) {
  ctx.save();
  // Smoke puffs first (behind sparks)
  for(var p = 0; p < this.puffs.length; p++) {
    var pf = this.puffs[p];
    if(pf.life <= 0) continue;
    var a = (pf.life / pf.maxLife) * 0.55;
    var grad = ctx.createRadialGradient(pf.x, pf.y, 0, pf.x, pf.y, pf.r);
    grad.addColorStop(0,    'rgba(140,200,255,' + (a*0.85) + ')');
    grad.addColorStop(0.40, 'rgba(80,160,230,'  + (a*0.50) + ')');
    grad.addColorStop(0.75, 'rgba(30,80,160,'   + (a*0.20) + ')');
    grad.addColorStop(1,    'rgba(0,40,120,0)');
    ctx.beginPath(); ctx.arc(pf.x, pf.y, pf.r, 0, Math.PI*2);
    ctx.fillStyle = grad; ctx.fill();
  }
  // Cyan sparks on top
  ctx.shadowColor = '#00FFFF';
  ctx.shadowBlur = 18;
  for(var i = 0; i < this.sparks.length; i++) {
    var s = this.sparks[i];
    if(s.life <= 0) continue;
    var a = s.life / s.maxLife;
    ctx.globalAlpha = a;
    ctx.fillStyle = a > 0.5 ? '#FFFFFF' : '#00FFFF';
    ctx.beginPath(); ctx.arc(s.x, s.y, s.size * a, 0, Math.PI*2);
    ctx.fill();
  }
  ctx.restore();
};

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
  ctx.font = 'bold ' + sz + 'px Uncial Antiqua, Bangers, Arial';
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
    var heartSz = Math.max(12, Math.floor(Game.width / 38));
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

    var heartSz = Math.max(12, Math.floor(Game.width / 38));
    var levelSz = Math.max(11, Math.floor(Game.width / 45));
    var soundSz = Math.max(9, levelSz - 2);

    ctx.font = 'bold ' + levelSz + 'px Uncial Antiqua, Bangers, Arial';
    ctx.textAlign = 'right';
    ctx.shadowColor = '#FFFF00';
    ctx.shadowBlur = 7;
    ctx.fillStyle = '#FFFF44';
    ctx.fillText('L E V E L  ' + currentLevel, Game.width - 10, 60);

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
// ===================================================================
// PLAYER ROCKET — slow, visible rocket with exhaust flame
// ===================================================================
var PlayerRocket = function(x, y) {
  this.setup('missile', { vy: -340, damage: 80 });
  this.w = 14; this.h = 28;
  this.x = x - this.w / 2;
  this.y = y - this.h;
  this.radius = 95;   // AoE radius
  this.t = 0;
};

PlayerRocket.prototype = new Sprite();
PlayerRocket.prototype.type = OBJECT_PLAYER_PROJECTILE;

PlayerRocket.prototype.step = function(dt) {
  this.t += dt;
  this.y += this.vy * dt;

  var cx = this.x + this.w / 2;
  var cy = this.y + this.h / 2;

  var collision = this.board.collide(this, OBJECT_ENEMY);
  var explodeY  = this.y < -this.h;

  if(collision || explodeY) {
    var ex = cx;
    var ey = explodeY ? 50 : cy;
    // Visual explosion
    this.board.add(new RocketExplosion(ex, ey, this.radius));
    // 28 shrapnel projectiles in all directions
    var shrapCount = 28;
    for(var si = 0; si < shrapCount; si++) {
      var sang = (si / shrapCount) * Math.PI * 2 + (Math.random()-0.5)*0.22;
      var sspd = 260 + Math.random() * 180;
      this.board.add(new Shrapnel(ex, ey, Math.cos(sang)*sspd, Math.sin(sang)*sspd));
    }
    Game.shake(22, 0.55);
    SoundManager.playRocketExplosion();
    this.board.remove(this);
  }
};

PlayerRocket.prototype.draw = function(ctx) {
  ctx.save();
  var cx = this.x + this.w / 2;
  var ty = this.y;
  var by = this.y + this.h;

  // ── Exhaust flame (drawn behind body) ──
  var flicker = 0.65 + Math.random() * 0.35;
  var flameH  = (14 + Math.random() * 10) * flicker;
  var flameGrd = ctx.createLinearGradient(cx, by, cx, by + flameH);
  flameGrd.addColorStop(0,   '#FFFFFF');
  flameGrd.addColorStop(0.25,'#FFFF88');
  flameGrd.addColorStop(0.6, '#FF8800');
  flameGrd.addColorStop(1,   'rgba(255,40,0,0)');
  ctx.globalAlpha = flicker;
  ctx.fillStyle   = flameGrd;
  ctx.shadowColor = '#FF6600';
  ctx.shadowBlur  = 18;
  ctx.beginPath();
  ctx.ellipse(cx, by + 2, 4.5, flameH * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.shadowBlur  = 0;

  // ── Nose cone ──
  ctx.fillStyle = '#FF2200';
  ctx.shadowColor = '#FF6600'; ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(cx,      ty - 5);
  ctx.lineTo(cx - 5,  ty + 8);
  ctx.lineTo(cx + 5,  ty + 8);
  ctx.closePath();
  ctx.fill();

  // ── Body ──
  ctx.fillStyle = '#FF8800';
  ctx.shadowBlur = 6;
  ctx.fillRect(cx - 4, ty + 7, 8, 14);

  // ── White stripe ──
  ctx.fillStyle = '#FFFFFF';
  ctx.globalAlpha = 0.7;
  ctx.fillRect(cx - 1.5, ty + 9, 3, 6);
  ctx.globalAlpha = 1;

  // ── Fins ──
  ctx.fillStyle = '#FF4400';
  ctx.shadowBlur = 4;
  ctx.beginPath();
  ctx.moveTo(cx - 4, by - 6); ctx.lineTo(cx - 10, by); ctx.lineTo(cx - 4, by);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + 4, by - 6); ctx.lineTo(cx + 10, by); ctx.lineTo(cx + 4, by);
  ctx.closePath(); ctx.fill();

  ctx.restore();
};

// ===================================================================
// SHRAPNEL — real projectile fragments from rocket explosion
// ===================================================================
var Shrapnel = function(x, y, vx, vy) {
  this.x = x; this.y = y;
  this.w = 6; this.h = 6;
  this.vx = vx; this.vy = vy;
  this.damage = 40;
  this.life = 0.45 + Math.random() * 0.35; // 0.45–0.8 s
  this.maxLife = this.life;
  this.rot = Math.random() * Math.PI * 2;
  this.rotSpd = (Math.random()-0.5) * 18;
  var colors = ['#FFFFFF','#FFFF88','#FFCC00','#FF8800','#FF4400'];
  this.color = colors[Math.floor(Math.random()*colors.length)];
};
Shrapnel.prototype = new Sprite();
Shrapnel.prototype.type = OBJECT_PLAYER_PROJECTILE;

Shrapnel.prototype.step = function(dt) {
  this.life -= dt;
  if(this.life <= 0) { this.board.remove(this); return; }
  this.x += this.vx * dt;
  this.y += this.vy * dt;
  this.vy += 60 * dt; // light gravity
  this.vx *= 0.985;
  this.rot += this.rotSpd * dt;
  // Kill collision box centered on fragment
  this.x -= this.w/2; // temp adjust for collide
  var hit = this.board.collide(this, OBJECT_ENEMY);
  this.x += this.w/2;
  if(hit) {
    hit.hit(this.damage);
    this.board.remove(this);
  }
};

Shrapnel.prototype.draw = function(ctx) {
  if(this.life <= 0) return;
  var a = this.life / this.maxLife;
  ctx.save();
  ctx.globalAlpha = a;
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rot);
  ctx.fillStyle = this.color;
  ctx.shadowColor = this.color;
  ctx.shadowBlur = 7;
  var sz = 3.5 * Math.max(0.2, a);
  ctx.fillRect(-sz/2, -sz/2, sz, sz);
  // glowing trail line
  ctx.globalAlpha = a * 0.5;
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-this.vx * 0.025, -this.vy * 0.025);
  ctx.stroke();
  ctx.restore();
};

// ===================================================================
// ROCKET EXPLOSION — spectacular multi-phase effect
// ===================================================================
var RocketExplosion = function(cx, cy, radius) {
  this.x = cx; this.y = cy;
  this.radius = radius || 95;
  this.t = 0;
  this.life = 1.5;

  // Three expanding shockwave rings
  this.rings = [
    { r:0, maxR: radius*1.5, alpha:1.0, speed:380, color:'#FFFFFF', lw:9,  delay:0    },
    { r:0, maxR: radius*1.2, alpha:0.9, speed:280, color:'#FFDD00', lw:13, delay:0.04 },
    { r:0, maxR: radius*0.9, alpha:0.8, speed:200, color:'#FF6600', lw:9,  delay:0.09 }
  ];

  // Fire particles
  this.particles = [];
  var fireColors = ['#FFFFFF','#FFFFAA','#FFFF00','#FFCC00','#FF8800','#FF4400','#FF2200','#FF6600','#FFAA44'];
  for(var i = 0; i < 65; i++) {
    var ang = Math.random() * Math.PI * 2;
    var spd = 55 + Math.random() * 300;
    var lf  = 0.45 + Math.random() * 0.85;
    this.particles.push({
      x: cx + (Math.random()-0.5)*10, y: cy + (Math.random()-0.5)*10,
      vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd - 25,
      life: lf, maxLife: lf,
      size: 1.8 + Math.random() * 5.5,
      color: fireColors[Math.floor(Math.random()*fireColors.length)],
      gravity: 35 + Math.random() * 75
    });
  }

  // Debris chunks (spinning rectangles)
  this.debris = [];
  for(var j = 0; j < 10; j++) {
    var a = Math.random() * Math.PI * 2;
    var s = 70 + Math.random() * 180;
    var dl = 0.55 + Math.random() * 0.55;
    this.debris.push({
      x: cx, y: cy,
      vx: Math.cos(a)*s, vy: Math.sin(a)*s - 55,
      life: dl, maxLife: dl,
      rot: Math.random()*Math.PI*2,
      rotSpd: (Math.random()-0.5)*14,
      size: 2.5 + Math.random()*4,
      gravity: 90
    });
  }

  // Smoke puffs
  this.smoke = [];
  for(var k = 0; k < 12; k++) {
    var sa  = Math.random() * Math.PI * 2;
    var ss  = 18 + Math.random() * 55;
    var sl  = 0.9 + Math.random() * 0.9;
    this.smoke.push({
      x: cx + (Math.random()-0.5)*radius*0.5,
      y: cy + (Math.random()-0.5)*radius*0.5,
      vx: Math.cos(sa)*ss, vy: Math.sin(sa)*ss - 18,
      life: sl, maxLife: sl,
      size: 7 + Math.random()*14,
      grow: 4 + Math.random()*5,
      delay: Math.random()*0.18
    });
  }
};

RocketExplosion.prototype.step = function(dt) {
  this.t += dt;
  this.life -= dt;

  for(var i = 0; i < this.rings.length; i++) {
    var ring = this.rings[i];
    if(this.t > ring.delay) {
      ring.r += ring.speed * dt;
      ring.alpha -= dt * 2.2;
    }
  }
  for(var j = 0; j < this.particles.length; j++) {
    var p = this.particles[j];
    if(p.life > 0) {
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vy += p.gravity * dt; p.vx *= 0.972;
      p.life -= dt;
    }
  }
  for(var k = 0; k < this.debris.length; k++) {
    var d = this.debris[k];
    if(d.life > 0) {
      d.x += d.vx*dt; d.y += d.vy*dt;
      d.vy += d.gravity*dt; d.rot += d.rotSpd*dt;
      d.life -= dt;
    }
  }
  for(var m = 0; m < this.smoke.length; m++) {
    var sm = this.smoke[m];
    if(sm.life > 0 && this.t > sm.delay) {
      sm.x += sm.vx*dt; sm.y += sm.vy*dt;
      sm.vy -= 18*dt; sm.size += sm.grow*dt;
      sm.life -= dt;
    }
  }
  if(this.life <= 0) this.board.remove(this);
};

RocketExplosion.prototype.draw = function(ctx) {
  ctx.save();

  // ── Central fireball (0–0.38 s) ──
  if(this.t < 0.38) {
    var fp  = this.t / 0.38;
    var fbR = this.radius * 0.6 * Math.sin(fp * Math.PI);
    var fba = fp < 0.5 ? fp*2 : (1-fp)*2;
    if(fbR > 1) {
      var grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, fbR);
      grd.addColorStop(0,   'rgba(255,255,220,' + (fba*0.97).toFixed(2) + ')');
      grd.addColorStop(0.35,'rgba(255,200,40,'  + (fba*0.88).toFixed(2) + ')');
      grd.addColorStop(0.7, 'rgba(255,80,0,'    + (fba*0.7).toFixed(2)  + ')');
      grd.addColorStop(1,   'rgba(200,20,0,0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = grd;
      ctx.shadowColor = '#FFFF44'; ctx.shadowBlur = 50;
      ctx.beginPath();
      ctx.arc(this.x, this.y, fbR, 0, Math.PI*2);
      ctx.fill();
    }
  }

  // ── Shockwave rings ──
  ctx.shadowBlur = 0;
  for(var i = 0; i < this.rings.length; i++) {
    var ring = this.rings[i];
    var rA = Math.max(0, ring.alpha);
    if(ring.r > 0 && rA > 0) {
      var rr = Math.min(ring.r, ring.maxR);
      var lw = ring.lw * Math.max(0.2, 1 - ring.r / ring.maxR);
      ctx.globalAlpha = rA;
      ctx.strokeStyle = ring.color;
      ctx.shadowColor = ring.color; ctx.shadowBlur = 16;
      ctx.lineWidth = lw;
      ctx.beginPath(); ctx.arc(this.x, this.y, rr, 0, Math.PI*2); ctx.stroke();
    }
  }
  ctx.shadowBlur = 0;

  // ── Smoke puffs ──
  for(var m = 0; m < this.smoke.length; m++) {
    var sm = this.smoke[m];
    if(sm.life > 0 && this.t > sm.delay) {
      ctx.globalAlpha = (sm.life/sm.maxLife) * 0.38;
      ctx.fillStyle = '#888';
      ctx.beginPath(); ctx.arc(sm.x, sm.y, sm.size, 0, Math.PI*2); ctx.fill();
    }
  }

  // ── Fire particles ──
  for(var j = 0; j < this.particles.length; j++) {
    var p = this.particles[j];
    if(p.life > 0) {
      var pa = p.life / p.maxLife;
      ctx.globalAlpha = pa;
      ctx.fillStyle   = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur  = pa > 0.45 ? 9 : 3;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * Math.max(0.15, pa), 0, Math.PI*2);
      ctx.fill();
    }
  }

  // ── Debris chunks ──
  for(var k = 0; k < this.debris.length; k++) {
    var d = this.debris[k];
    if(d.life > 0) {
      var da = d.life / d.maxLife;
      ctx.globalAlpha = da;
      ctx.fillStyle   = '#DD5500';
      ctx.shadowColor = '#FF4400'; ctx.shadowBlur = 5;
      ctx.save();
      ctx.translate(d.x, d.y); ctx.rotate(d.rot);
      ctx.fillRect(-d.size/2, -d.size/2, d.size, d.size);
      ctx.restore();
    }
  }

  ctx.restore();
};

 
 
 
   
    
     
