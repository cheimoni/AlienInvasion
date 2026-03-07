// Object type constants - MUST be defined first!
var OBJECT_PLAYER = 1,
    OBJECT_PLAYER_PROJECTILE = 2,
    OBJECT_ENEMY = 4,
    OBJECT_ENEMY_PROJECTILE = 8,
    OBJECT_POWERUP = 16,
    OBJECT_BOSS_SHIELD = 32; // Final Boss Stage shield walls

// Performance: cache 2*PI to avoid repeated constant multiplication in hot draw loops
var TAU = Math.PI * 2;

// ===================================================================
// CONSTELLATION DATA — 20 major constellations as stick figures
// Source: d3-celestial (MIT), RA/Dec in degrees (range -180..+180)
// ===================================================================
var _CR = {
  Ori:{n:'ΩΡΙΩΝΑΣ',s:[[[91.893,14.769],[88.596,20.276],[90.980,20.139],[92.985,14.209],[90.596,9.647],[88.793,7.407],[81.283,6.350],[73.724,10.151]],[[74.637,1.714],[73.563,2.441],[72.802,5.605],[72.460,6.961],[72.653,8.900],[73.724,10.151],[74.093,13.515],[76.142,15.404],[77.425,15.597]],[[78.635,-8.202],[81.119,-2.397],[83.002,-0.299],[81.283,6.350],[83.785,9.934],[88.793,7.407],[85.190,-1.943],[86.939,-9.670]],[[85.190,-1.943],[84.053,-1.202],[83.002,-0.299]]]},
  UMa:{n:'ΜΕΓΆΛΗ ΆΡΚΤΟΣ',s:[[[-176.144,57.033],[165.932,61.751],[165.460,56.382],[178.458,53.695],[-176.144,57.033],[-166.493,55.960],[-159.019,54.925],[-153.115,49.313]],[[178.458,53.695],[176.513,47.779],[169.620,33.094],[169.547,31.531]],[[176.513,47.779],[167.416,44.499],[155.582,41.500]],[[167.416,44.499],[154.274,42.914]],[[165.932,61.751],[142.882,63.062],[127.566,60.718],[147.747,59.039],[165.460,56.382]],[[165.460,56.382],[148.027,54.064],[143.214,51.677],[134.802,48.042]],[[135.906,47.157],[143.214,51.677]]]},
  Cas:{n:'ΚΑΣΣΙΟΠΗ',s:[[[28.599,63.670],[21.454,60.235],[14.177,60.717],[10.127,56.537],[2.295,59.150]]]},
  Sco:{n:'ΣΚΟΡΠΙΟΣ',s:[[[-120.287,-26.114],[-119.917,-22.622],[-118.641,-19.806]],[[-119.917,-22.622],[-114.703,-25.593],[-112.648,-26.432],[-111.029,-28.216],[-107.459,-34.293],[-107.032,-38.047],[-106.354,-42.361],[-101.962,-43.239],[-95.670,-42.998],[-93.104,-40.127],[-94.378,-39.030],[-96.598,-37.104]]]},
  Leo:{n:'ΛΕΩΝ',s:[[[152.093,11.967],[151.833,16.763],[154.993,19.842],[168.527,20.524],[177.265,14.572],[168.560,15.430],[152.093,11.967]],[[154.993,19.842],[154.173,23.417],[148.191,26.007],[146.463,23.774]]]},
  Gem:{n:'ΔΙΔΥΜΟΙ',s:[[[93.719,22.507],[95.740,22.514],[100.983,25.131],[107.785,30.245],[113.649,31.888],[116.329,28.026],[113.981,26.896],[110.031,21.982],[106.027,20.570],[99.428,16.399],[101.322,12.896]],[[110.031,21.982],[109.523,16.540]]]},
  Tau:{n:'ΤΑΥΡΟΣ',s:[[[84.411,21.143],[68.980,16.509],[67.166,15.871],[64.948,15.628],[65.734,17.543],[67.154,19.180],[81.573,28.608]],[[64.948,15.628],[60.170,12.490],[51.792,9.733],[60.789,5.989]],[[51.792,9.733],[51.203,9.029],[54.218,0.402]]]},
  Cyg:{n:'ΚΥΚΝΟΣ',s:[[[-41.766,30.227],[-48.447,33.970],[-54.443,40.257],[-63.756,45.131],[-67.574,51.730],[-70.724,53.369]],[[-49.642,45.280],[-54.443,40.257],[-60.924,35.083],[-67.320,27.960]]]},
  Per:{n:'ΠΕΡΣΕΑΣ',s:[[[56.080,32.288],[58.533,31.884],[59.741,35.791],[59.464,40.010],[56.299,42.579],[55.731,47.788],[54.122,48.193],[51.081,49.861],[46.199,53.506],[42.674,55.896],[43.564,52.763],[47.267,49.613],[47.374,44.858],[47.042,40.956],[47.822,39.612],[46.294,38.840],[44.690,39.663],[44.916,41.033],[47.042,40.956]],[[61.646,50.351],[63.724,48.409],[62.165,47.713],[55.731,47.788]],[[47.267,49.613],[41.050,49.228],[25.915,50.689]]]},
  Lyr:{n:'ΛΥΡΑ',s:[[[-78.807,37.605],[-78.905,39.613],[-80.765,38.784],[-78.807,37.605],[-76.374,36.899],[-75.264,32.690],[-77.480,33.363],[-78.807,37.605]]]},
  Aql:{n:'ΑΕΤΟΣ',s:[[[-63.435,10.613],[-62.304,8.868],[-61.172,6.407],[-57.174,-0.822],[-61.882,1.006],[-68.625,3.115],[-73.648,13.864],[-62.304,8.868],[-68.625,3.115],[-73.438,-4.883]]]},
  Sgr:{n:'ΤΟΞΟΤΗΣ',s:[[[-85.593,-36.762],[-83.957,-34.385],[-84.752,-29.828],[-83.007,-25.422],[-86.559,-21.059]],[[-69.340,-44.459],[-69.028,-40.616],[-74.347,-29.880],[-78.586,-26.991],[-83.007,-25.422]],[[-61.185,-41.868],[-60.066,-35.276],[-61.040,-26.300],[-65.823,-24.884],[-68.681,-24.509],[-71.115,-25.257],[-76.184,-26.297],[-78.586,-26.991],[-84.752,-29.828],[-88.548,-30.424],[-83.957,-34.385],[-74.347,-29.880],[-73.265,-27.670],[-76.184,-26.297],[-73.829,-21.742],[-72.559,-21.024],[-70.591,-18.953],[-69.582,-17.847],[-69.568,-15.955]],[[-73.829,-21.742],[-75.568,-21.107],[-76.458,-22.745],[-76.184,-26.297]]]},
  Vir:{n:'ΠΑΡΘΕΝΟΣ',s:[[[176.465,6.529],[177.674,1.765],[-175.024,-0.667],[-169.585,-1.449],[-162.513,-5.539],[-158.702,-11.161],[-145.996,-6.001],[-139.235,-5.658]],[[-164.456,10.959],[-166.099,3.398],[-169.585,-1.449]],[[-162.513,-5.539],[-156.327,-0.596],[-149.588,1.545],[-138.438,1.893]]]},
  Her:{n:'ΗΡΑΚΛΗΣ',s:[[[-114.520,19.153],[-112.445,21.490],[-109.679,31.603],[-109.276,38.922],[-111.474,42.437],[-115.065,46.313],[-117.808,44.935],[-121.831,42.452]],[[-109.679,31.603],[-104.928,30.926]],[[-109.276,38.922],[-101.238,36.809]],[[-90.937,37.251],[-99.079,37.146],[-101.238,36.809],[-104.928,30.926],[-101.242,24.839],[-93.385,27.721],[-90.559,29.248],[-88.114,28.763]],[[-101.338,14.390],[-112.445,21.490]]]},
  Boo:{n:'ΒΟΩΤΗΣ',s:[[[-153.184,17.457],[-151.329,18.398],[-146.085,19.182],[-142.043,30.371],[-141.981,38.308],[-134.514,40.391],[-131.124,33.315],[-138.753,27.074],[-146.085,19.182],[-139.713,13.728]],[[-141.981,38.308],[-145.904,46.088],[-146.634,51.788],[-143.701,51.851],[-145.904,46.088]]]},
  CrB:{n:'ΒΟΡ.ΣΤΕΦΑΝΟΣ',s:[[[-126.768,31.359],[-128.043,29.106],[-126.328,26.715],[-124.314,26.296],[-122.602,26.068],[-120.603,26.878],[-119.639,29.851]]]},
  Peg:{n:'ΠΗΓΑΣΟΣ',s:[[[-27.503,33.178],[-19.249,30.221],[-14.056,28.083],[2.097,29.090],[3.309,15.184],[-13.810,15.205],[-18.327,12.173],[-19.635,10.831],[-27.450,6.198],[-33.954,9.875]],[[-13.810,15.205],[-14.056,28.083],[-17.499,24.602],[-18.367,23.566],[-28.247,25.345],[-33.839,25.645]]]},
  And:{n:'ΑΝΔΡΟΜΕΔΑ',s:[[[30.975,42.330],[17.433,35.621],[9.832,30.861],[2.097,29.090]],[[14.302,23.418],[11.835,24.267],[9.639,29.312],[9.832,30.861],[9.220,33.719],[-5.466,43.268],[-14.520,42.326]],[[-5.466,43.268],[-4.898,44.334],[-5.609,46.458]],[[17.433,35.621],[14.188,38.499],[12.454,41.079],[17.376,47.242],[24.498,48.628]]]},
  Cen:{n:'ΚΕΝΤΑΥΡΟΣ',s:[[[170.252,-54.491],[-177.910,-50.722],[-172.990,-50.231],[-169.621,-48.960],[-155.028,-53.466],[-151.115,-47.288],[-152.596,-42.474],[-152.624,-41.688],[-148.329,-36.370],[-141.123,-42.158],[-135.210,-42.104]],[[-152.624,-41.688],[-159.851,-36.712]],[[-140.104,-60.837],[-155.028,-53.466],[-149.044,-60.373]],[[-172.990,-50.231],[-177.087,-52.369],[172.942,-59.442]]]},
  Cru:{n:'ΝΟΤΙΟΣ ΣΤΑΥΡΟΣ',s:[[[-168.070,-59.689],[-176.214,-58.749]],[[-173.350,-63.099],[-172.209,-57.113]]]},
  Ari:{n:'ΚΡΙΟΣ',s:[[[31.8,23.5],[28.7,20.8],[28.4,19.3]],[[28.7,20.8],[44.8,21.0]]]},
  Psc:{n:'ΙΧΘΥΕΣ',s:[[[30.5,2.8],[23.4,3.3],[20.0,7.9],[21.2,6.9],[23.6,5.6],[26.0,9.2],[30.5,2.8]],[[-2.6,3.5],[-8.0,1.3],[-9.5,4.5],[-12.0,5.0],[-9.0,8.0],[-6.0,7.0],[-2.6,3.5]],[[30.5,2.8],[-2.6,3.5]]]},
  Aqr:{n:'ΥΔΡΟΧΟΟΣ',s:[[[-37.1,-5.6],[-28.6,-0.3],[-19.3,-1.4],[-23.9,0.0]],[[-28.6,-0.3],[-18.5,-13.0],[-14.9,-15.8],[-28.1,-16.8]],[[-19.3,-1.4],[-16.3,-4.2],[-5.8,-8.8]]]},
  Cap:{n:'ΑΙΓΟΚΕΡΩΣ',s:[[[-115.7,-16.0],[-113.5,-12.5],[-108.6,-17.2],[-104.7,-25.3],[-108.5,-27.0],[-115.7,-16.0]],[[-104.7,-25.3],[-100.2,-26.9],[-96.2,-21.1],[-99.7,-16.4],[-108.6,-17.2]]]},
  Lib:{n:'ΖΥΓΟΣ',s:[[[-138.0,-8.9],[-140.4,-15.6],[-147.0,-9.4],[-138.0,-8.9]],[[-138.0,-8.9],[-135.3,-3.4]],[[-140.4,-15.6],[-143.3,-25.2]]]},
  Cnc:{n:'ΚΑΡΚΙΝΟΣ',s:[[[130.8,21.5],[127.3,27.9]],[[130.8,21.5],[133.0,18.2]],[[127.3,27.9],[124.0,28.8]],[[133.0,18.2],[124.0,28.8]]]},
  Oph:{n:'ΟΦΙΟΥΧΟΣ',s:[[[-72.8,2.5],[-75.1,4.6],[-72.2,9.4],[-67.4,12.6],[-62.0,9.6],[-61.8,4.8],[-72.8,2.5]],[[-72.8,2.5],[-76.6,-8.1],[-79.7,-14.0]],[[-62.0,9.6],[-54.0,4.4]]]},
  Ser:{n:'ΟΦΙΣ',s:[[[-83.2,6.4],[-79.6,6.0],[-77.9,15.4],[-81.2,18.9],[-79.9,22.5]],[[-77.9,15.4],[-73.1,24.7],[-77.4,19.5]]]},
  Aur:{n:'ΗΝΙΟΧΟΣ',s:[[[79.2,45.9],[73.4,41.2],[74.2,33.2],[88.2,37.2],[89.9,44.9],[79.2,45.9]],[[88.2,37.2],[84.4,21.1]]]},
  CMa:{n:'ΚΥΩΝ ΜΕΓΑΣ',s:[[[101.3,-16.7],[99.6,-22.9],[105.4,-17.8],[98.2,-8.0]],[[99.6,-22.9],[104.0,-28.9],[105.7,-26.4]],[[101.3,-16.7],[97.0,-11.1]]]},
  CMi:{n:'ΚΥΩΝ ΜΙΚΡΟΣ',s:[[[114.8,5.2],[111.8,8.3]]]},
  Lep:{n:'ΛΑΓΩΣ',s:[[[83.0,-14.8],[78.9,-16.2],[76.5,-14.2],[83.0,-14.8]],[[83.0,-14.8],[85.2,-20.8],[88.8,-20.9]],[[85.2,-20.8],[84.6,-22.4]]]},
  Eri:{n:'ΗΡΙΔΑΝΟΣ',s:[[[76.0,-5.1],[74.3,-9.8],[62.2,-16.5],[55.7,-14.4],[47.4,-16.1],[40.7,-20.0],[35.2,-23.6],[26.5,-29.8],[15.7,-39.9],[5.3,-43.1],[-4.2,-53.8],[-10.0,-57.2],[3.6,-57.2],[18.0,-56.5],[25.0,-51.5]]]},
  UMi:{n:'ΜΙΚΡΑ ΑΡΚΤΟΣ',s:[[[37.9,89.3],[-108.5,82.0],[-124.0,77.8],[-115.6,75.8],[-137.3,74.2],[-129.8,71.8],[-115.6,75.8]]]},
  Dra:{n:'ΔΡΑΚΩΝ',s:[[[-77.3,51.5],[-82.6,52.3],[-92.5,56.9],[-103.0,61.5],[-118.1,65.4],[-131.3,69.3],[-131.6,64.4],[-118.1,65.4]],[[-77.3,51.5],[-67.4,56.8],[-62.4,61.5],[-68.0,65.7],[-82.6,72.0],[-88.8,75.2]]]},
  Cep:{n:'ΚΗΦΕΥΣ',s:[[[21.0,62.6],[16.0,70.6],[19.5,77.6],[41.0,73.1],[52.8,65.0],[21.0,62.6]],[[41.0,73.1],[38.9,77.7]]]},
  CrA:{n:'ΝΟΤΙΟΣ ΣΤΕΦΑΝΟΣ',s:[[[-120.7,-37.1],[-118.2,-40.5],[-116.3,-41.9],[-113.2,-42.1],[-110.2,-41.9],[-106.9,-38.7],[-105.7,-37.1]]]},
  PsA:{n:'ΝΟΤΙΟΣ ΙΧΘΥΣ',s:[[[-27.5,-29.6],[-34.2,-32.5],[-26.0,-32.9],[-27.5,-29.6]],[[-27.5,-29.6],[-20.8,-27.0]]]},
  Lup:{n:'ΛΥΚΟΣ',s:[[[-142.6,-47.4],[-148.7,-44.7],[-154.2,-47.4],[-157.8,-41.2],[-148.7,-44.7]],[[-142.6,-47.4],[-138.8,-41.2],[-133.5,-38.4],[-127.8,-41.0]],[[-133.5,-38.4],[-128.5,-47.4]]]},
  Ara:{n:'ΑΡΑΣ',s:[[[-116.2,-49.9],[-113.3,-56.4],[-108.7,-60.3]],[[-113.3,-56.4],[-109.4,-50.9]],[[-116.2,-49.9],[-120.6,-46.0],[-121.0,-50.1],[-116.2,-49.9]]]},
  Tri:{n:'ΤΡΙΓΩΝΟ',s:[[[25.0,33.7],[31.8,23.5],[28.7,29.6],[25.0,33.7]]]},
  Del:{n:'ΔΕΛΦΙΝΟΣ',s:[[[-48.8,10.8],[-48.3,15.9],[-49.6,16.1],[-50.0,11.8],[-48.8,10.8]],[[-48.3,15.9],[-47.5,14.6]]]},
  Sge:{n:'ΒΕΛΟΣ',s:[[[-72.7,18.0],[-71.5,20.3],[-69.3,19.5],[-66.6,21.2]],[[-71.5,20.3],[-68.8,17.5]]]},
  Vul:{n:'ΑΛΩΠΕΚΙΣ',s:[[[-62.4,27.8],[-64.7,24.7],[-67.9,25.4]]]},
  Equ:{n:'ΠΩΛΙΣΚΟΣ',s:[[[-50.7,5.2],[-51.0,10.0],[-53.8,10.0]],[[-53.8,10.0],[-53.1,6.8],[-50.7,5.2]]]},
  Col:{n:'ΠΕΡΙΣΤΕΡΑ',s:[[[84.9,-35.5],[82.8,-33.4],[82.0,-34.1],[84.9,-35.5]],[[84.9,-35.5],[88.5,-35.5],[90.5,-33.4]],[[82.8,-33.4],[81.9,-28.5],[83.9,-26.8]]]},
  Pup:{n:'ΠΡΥΜΝΑ',s:[[[120.0,-24.3],[121.7,-24.9],[122.8,-30.6],[119.5,-28.1],[120.0,-24.3]],[[120.0,-24.3],[116.6,-21.5],[111.8,-24.3]]]},
  Vel:{n:'ΙΣΤΙΑ',s:[[[131.2,-43.2],[137.9,-46.9],[140.5,-43.4],[136.0,-47.1]],[[131.2,-43.2],[132.6,-47.3],[137.9,-46.9]]]},
  Crv:{n:'ΚΟΡΑΚΑΣ',s:[[[-177.4,-16.5],[178.3,-12.6],[179.0,-17.5],[-175.1,-23.4],[-177.4,-16.5]],[[-175.1,-23.4],[179.0,-17.5]]]},
  Crt:{n:'ΚΡΑΤΗΡ',s:[[[-168.5,-22.8],[-166.4,-18.3],[-162.3,-17.2],[-158.2,-22.8],[-165.0,-27.1],[-168.5,-22.8]]]},
  Hya:{n:'ΥΔΡΑ',s:[[[128.3,-8.7],[125.7,-7.6],[126.9,2.0],[130.6,5.7],[134.1,6.4],[139.9,5.8],[147.9,2.6],[153.8,2.3],[159.0,-3.2],[165.5,-5.6],[171.1,-12.4],[175.5,-14.8],[179.5,-16.4],[-175.2,-22.7],[-163.0,-29.2],[-157.4,-29.9],[-149.6,-25.2]],[[128.3,-8.7],[125.6,-5.5],[126.3,-3.4]]]},
  Mon:{n:'ΜΟΝΟΚΕΡΩΣ',s:[[[103.4,-8.7],[102.2,-2.1],[98.0,4.2],[93.7,9.8]],[[102.2,-2.1],[112.5,-0.5]]]},
  Lyn:{n:'ΛΥΓΞ',s:[[[124.4,59.0],[117.0,49.2],[108.7,48.7],[99.0,55.3],[90.0,49.8],[87.7,36.8]]]},
  LMi:{n:'ΜΙΚΡΟΣ ΛΕΩΝ',s:[[[145.3,36.7],[149.0,34.2],[154.2,33.8],[158.6,29.2]],[[154.2,33.8],[162.3,33.8]]]},
  Com:{n:'ΚΟΜΗ ΒΕΡΕΝΙΚΗΣ',s:[[[-174.4,27.5],[-177.5,17.5],[-171.6,28.3],[-174.4,27.5]]]},
  CVn:{n:'ΚΥΝΗΓΕΤΙΚΟΙ',s:[[[-154.5,38.3],[-148.0,41.4]]]},
  Car:{n:'ΤΡΟΠΙΣ',s:[[[95.0,-52.7],[101.6,-61.7],[108.0,-64.4],[124.9,-59.5],[130.0,-52.9],[125.6,-59.8],[121.2,-58.8]]]},
  Mus:{n:'ΜΥΙΑ',s:[[[-162.7,-64.1],[-164.6,-66.7],[-168.5,-67.9],[-169.4,-65.4],[-162.7,-64.1]],[[-162.7,-64.1],[-158.8,-62.5]]]},
  Cir:{n:'ΔΙΑΒΗΤΗΣ',s:[[[-140.8,-64.3],[-136.0,-63.6],[-138.8,-58.8]]]},
  Nor:{n:'ΓΝΩΜΩΝ',s:[[[-123.3,-42.8],[-121.0,-47.6],[-116.6,-50.2],[-119.6,-42.8],[-123.3,-42.8]]]},
  TrA:{n:'ΝΟΤΙΟΣ ΤΡΙΓΩΝΟ',s:[[[-118.4,-63.4],[-131.3,-66.2],[-143.4,-68.7],[-118.4,-63.4]]]},
  Tel:{n:'ΤΗΛΕΣΚΟΠΙΟ',s:[[[-110.7,-45.9],[-112.6,-51.5],[-111.6,-56.0]],[[-112.6,-51.5],[-106.0,-53.4]]]},
  Mic:{n:'ΜΙΚΡΟΣΚΟΠΙΟ',s:[[[-74.0,-29.3],[-72.0,-32.3],[-75.5,-36.5],[-80.1,-38.5]],[[-72.0,-32.3],[-67.8,-31.8]]]},
  Scl:{n:'ΓΛΥΠΤΗΣ',s:[[[-10.0,-31.8],[5.0,-29.4],[10.5,-28.0],[3.5,-24.0]]]},
  Phe:{n:'ΦΟΙΝΙΞ',s:[[[-15.5,-49.1],[-10.5,-46.2],[-6.0,-44.0],[0.0,-46.0],[-10.5,-55.7],[-15.5,-49.1]],[[-10.5,-46.2],[-12.0,-57.5]]]},
  For:{n:'ΚΛΙΒΑΝΟΣ',s:[[[45.3,-33.8],[42.5,-28.5],[37.0,-24.0],[32.5,-28.0]]]},
  Cet:{n:'ΚΗΤΟΣ',s:[[[-2.3,-3.0],[-5.9,3.3],[-13.5,-0.4],[-14.1,-8.7],[-4.2,-10.7],[-2.3,-3.0]],[[26.0,-8.8],[17.0,-3.4],[7.0,-7.0],[-2.3,-3.0]]]},
  Oct:{n:'ΩΚΤΑΝΗΣ',s:[[[-60.3,-77.1],[-98.2,-85.1],[-116.7,-88.1],[-60.3,-77.1]]]},
  Hyi:{n:'ΥΔΑΤΟΦΙΔΟ',s:[[[-20.0,-77.3],[-13.8,-74.9],[-5.0,-72.1],[5.0,-68.7],[6.5,-66.4],[-0.5,-62.0]],[[5.0,-68.7],[15.5,-71.0]]]},
  Ret:{n:'ΑΜΦΙΒΛΗΣΤΡΟ',s:[[[55.8,-62.5],[60.3,-64.1],[64.4,-62.5],[62.0,-58.4],[55.8,-62.5]]]},
  Pic:{n:'ΖΩΓΡΑΦΟΣ',s:[[[82.0,-47.9],[84.4,-51.1],[86.0,-56.2]],[[84.4,-51.1],[80.0,-55.5]]]},
  Dor:{n:'ΔΟΡΑΔΑ',s:[[[65.2,-51.5],[68.5,-55.0],[75.0,-57.5],[79.4,-62.5],[75.0,-65.7]],[[65.2,-51.5],[70.0,-49.0]]]},
  Vol:{n:'ΙΠΤΑΜΕΝΟΣ',s:[[[104.5,-69.4],[108.5,-73.0],[115.0,-72.9],[120.5,-70.8],[115.5,-67.9],[104.5,-69.4]]]},
  Pyx:{n:'ΠΥΞΙΔΑ',s:[[[130.9,-20.9],[131.5,-27.7],[133.0,-35.3]]]},
  Ant:{n:'ΤΡΟΜΠΑ',s:[[[148.4,-27.8],[155.0,-35.9],[161.8,-31.1],[159.0,-36.8]]]},
  Sex:{n:'ΣΕΞΤΑΝΤΗΣ',s:[[[152.2,-0.4],[157.0,-5.2],[160.0,-2.7]],[[152.2,-0.4],[148.5,-8.1]]]},
  Cha:{n:'ΧΑΜΑΙΛΕΩΝ',s:[[[-158.9,-76.9],[-148.8,-75.4],[-134.8,-78.3],[-128.0,-78.7]],[[-148.8,-75.4],[-140.5,-77.0]]]},
  Men:{n:'ΤΡΑΠΕΖΑ',s:[[[-72.5,-71.3],[-66.9,-74.9],[-71.0,-80.5],[-79.5,-80.2],[-72.5,-71.3]]]},
  Ind:{n:'ΙΝΔΙΑΝΟΣ',s:[[[-69.0,-47.3],[-67.5,-58.5],[-55.6,-66.0],[-58.0,-60.0],[-69.0,-47.3]]]},
  Gru:{n:'ΓΕΡΑΝΟΣ',s:[[[-8.5,-37.5],[-8.0,-47.0],[0.0,-41.5],[3.5,-43.5],[-8.0,-57.0],[-10.4,-47.4],[-8.0,-47.0]]]},
  Tuc:{n:'ΤΟΥΚΑΝΟΣ',s:[[[-56.2,-60.3],[-46.9,-65.5],[-37.8,-65.2],[-37.5,-58.2],[-56.2,-60.3]]]},
  Pav:{n:'ΠΑΟΝΑΣ',s:[[[-111.1,-56.7],[-110.6,-65.1],[-100.4,-72.7],[-92.2,-70.3],[-88.8,-64.7],[-100.4,-72.7]],[[-110.6,-65.1],[-114.3,-62.0],[-111.1,-56.7]]]},
  Sgr2:{n:'2ος ΤΟΞΟΤΗΣ',s:[[[-85.6,-36.8],[-83.9,-34.4],[-84.8,-29.8],[-83.0,-25.4],[-86.6,-21.1]],[[-69.3,-44.5],[-74.3,-29.9],[-83.0,-25.4]]]},
  Cen2:{n:'2ος ΚΕΝΤΑΥΡΟΣ',s:[[[170.3,-54.5],[-177.9,-50.7],[-152.6,-42.5],[-148.3,-36.4],[-141.1,-42.2],[-135.2,-42.1]]]}
};

// Converts raw RA/Dec segments to pixel coords centered at (0,0)
function _buildConstShape(raw, sz) {
  var allPts=[], i, j;
  for(i=0;i<raw.s.length;i++) for(j=0;j<raw.s[i].length;j++) allPts.push(raw.s[i][j]);
  var rMin=Infinity,rMax=-Infinity,dMin=Infinity,dMax=-Infinity;
  for(i=0;i<allPts.length;i++){
    if(allPts[i][0]<rMin)rMin=allPts[i][0]; if(allPts[i][0]>rMax)rMax=allPts[i][0];
    if(allPts[i][1]<dMin)dMin=allPts[i][1]; if(allPts[i][1]>dMax)dMax=allPts[i][1];
  }
  var raOff=0;
  if(rMax-rMin>180){ // wraparound: negative RA values get +360
    raOff=360; rMin=Infinity; rMax=-Infinity;
    for(i=0;i<allPts.length;i++){
      var r=allPts[i][0]<0?allPts[i][0]+360:allPts[i][0];
      if(r<rMin)rMin=r; if(r>rMax)rMax=r;
    }
  }
  var rng=Math.max(rMax-rMin, dMax-dMin)*1.18; if(rng<2)rng=2;
  var pad=rng*0.09;
  function pt2xy(p){
    var ra=p[0]<0?p[0]+raOff:p[0];
    return [(ra-rMin+pad)/rng*sz-sz/2, ((dMax+pad)-p[1])/rng*sz-sz/2];
  }
  var segs=[];
  for(i=0;i<raw.s.length;i++){
    var seg=[];
    for(j=0;j<raw.s[i].length;j++) seg.push(pt2xy(raw.s[i][j]));
    segs.push(seg);
  }
  return {segs:segs, name:raw.n};
}

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

    // ===== CLOUDS — disabled (images deleted, placeholder prevents 404) =====
  cloud_majestic: { sx:0, sy:0, w:520, h:310, frames:1, file:'images/Remove_background_to_create_transparent_PNG-1771177489342.webp' },
  cloud_storm:    { sx:0, sy:0, w:560, h:330, frames:1, file:'images/Remove_background_to_create_transparent_PNG-1771177489342.webp' },


// ===== BACKGROUND OBJECTS (πλανήτες, αστεροειδείς, αστέρια, motherships) - ΜΕΓΑΛΑ! =====
 // Planets (BIG!) — folder: images/Νέοι πλανήτες και αστέρια/
 bg_planet_1: { sx: 0, sy: 0, w: 300, h: 300, frames: 1, file: 'images/Νέοι πλανήτες και αστέρια/remove_background_keep_planet_only_with_transpare-1771437623912.webp' },
 bg_planet_2: { sx: 0, sy: 0, w: 350, h: 350, frames: 1, file: 'images/Νέοι πλανήτες και αστέρια/remove_background_keep_planet_only_with_transpare-1771437627114.webp' },
 bg_planet_3: { sx: 0, sy: 0, w: 280, h: 280, frames: 1, file: 'images/Νέοι πλανήτες και αστέρια/remove_background_keep_planet_only_with_transpare-1771437632686.webp' },
 bg_planet_4: { sx: 0, sy: 0, w: 320, h: 320, frames: 1, file: 'images/Νέοι πλανήτες και αστέρια/remove_background_keep_planet_only_with_transpare-1771437636117.webp' },
 bg_planet_5: { sx: 0, sy: 0, w: 250, h: 250, frames: 1, file: 'images/Νέοι πλανήτες και αστέρια/remove_background_keep_planet_only_with_transpare-1771437640044.webp' },
 bg_planet_6: { sx: 0, sy: 0, w: 300, h: 300, frames: 1, file: 'images/Νέοι πλανήτες και αστέρια/Remove_background-1771769373900.webp' },
 bg_planet_7: { sx: 0, sy: 0, w: 300, h: 300, frames: 1, file: 'images/Νέοι πλανήτες και αστέρια/Remove_background-1771769485044.webp' },

 // Draki Coins — slowly rotating background collectibles
 draki_coin_1: { sx:0, sy:0, w:120, h:120, frames:1, file:"images/draki coine/envato-labs-image-edit (3).webp" },
 draki_coin_2: { sx:0, sy:0, w:120, h:120, frames:1, file:"images/draki coine/envato-labs-image-edit (5).webp" },
 draki_coin_3: { sx:0, sy:0, w:120, h:120, frames:1, file:"images/draki coine/envato-labs-image-edit (6).webp" },

 // Asteroids/Rocks — folder: images/petromata/
 bg_asteroid_1: { sx: 0, sy: 0, w: 180, h: 150, frames: 1, file: 'images/petromata/remove_background_keep_asteroid_only_with_transpa-1771437878608.webp' },
 bg_asteroid_2: { sx: 0, sy: 0, w: 200, h: 160, frames: 1, file: 'images/petromata/remove_background_keep_asteroid_only_with_transpa-1771437889459.webp' },
 bg_asteroid_3: { sx: 0, sy: 0, w: 160, h: 130, frames: 1, file: 'images/petromata/remove_background_keep_asteroid_only_with_transpa-1771437893911.webp' },
 bg_asteroid_4: { sx: 0, sy: 0, w: 190, h: 145, frames: 1, file: 'images/petromata/remove_background_keep_asteroid_only_with_transpa-1771437899883.webp' },
 bg_asteroid_5: { sx: 0, sy: 0, w: 220, h: 175, frames: 1, file: 'images/petromata/remove_background_keep_asteroid_only_with_transpa-1771437906511.webp' },
 // New asteroids — converted from PNG (1024x1024 square rocks + 1376x768 wide rocks)
 bg_asteroid_6:  { sx: 0, sy: 0, w: 200, h: 200, frames: 1, file: 'images/petromata/Remove_background_from_volcanic_asteroid_image_to_-1772481728494.webp' },
 bg_asteroid_7:  { sx: 0, sy: 0, w: 200, h: 200, frames: 1, file: 'images/petromata/Remove_background_from_volcanic_meteorite_image_to-1772481733660.webp' },
 bg_asteroid_8:  { sx: 0, sy: 0, w: 200, h: 200, frames: 1, file: 'images/petromata/Remove_background_from_spherical_asteroid_image_to-1772481737562.webp' },
 bg_asteroid_9:  { sx: 0, sy: 0, w: 200, h: 200, frames: 1, file: 'images/petromata/Remove_background_from_jagged_space_rock_image_to_-1772481741509.webp' },
 bg_asteroid_10: { sx: 0, sy: 0, w: 240, h: 134, frames: 1, file: 'images/petromata/Remove_background_from_wide_format_volcanic_astero-1772481867798.webp' },
 bg_asteroid_11: { sx: 0, sy: 0, w: 240, h: 134, frames: 1, file: 'images/petromata/Remove_background_from_wide_format_volcanic_meteor-1772481870966.webp' },
 bg_asteroid_12: { sx: 0, sy: 0, w: 240, h: 134, frames: 1, file: 'images/petromata/Remove_background_from_wide_format_asteroid_image_-1772481876115.webp' },
 bg_asteroid_13: { sx: 0, sy: 0, w: 240, h: 134, frames: 1, file: 'images/petromata/Remove_background_from_wide_format_space_rock_imag-1772481881950.webp' },
 bg_asteroid_14: { sx: 0, sy: 0, w: 240, h: 134, frames: 1, file: 'images/petromata/Remove_background_from_volcanic_asteroid_image_to_-1772481728494.webp' },
 bg_asteroid_15: { sx: 0, sy: 0, w: 240, h: 134, frames: 1, file: 'images/petromata/Remove_background_from_volcanic_meteorite_image_to-1772481733660.webp' },
 bg_asteroid_16: { sx: 0, sy: 0, w: 240, h: 134, frames: 1, file: 'images/petromata/Remove_background_from_spherical_asteroid_image_to-1772481737562.webp' },
 bg_asteroid_17: { sx: 0, sy: 0, w: 240, h: 134, frames: 1, file: 'images/petromata/Remove_background_from_jagged_space_rock_image_to_-1772481741509.webp' },
 
 // Stars (BIG!) — folder: images/Νέοι πλανήτες και αστέρια/
 bg_star_1: { sx: 0, sy: 0, w: 120, h: 120, frames: 1, file: 'images/Νέοι πλανήτες και αστέρια/remove_background_keep_star_only_with_transparent-1771438014717.webp' },
 bg_star_2: { sx: 0, sy: 0, w: 100, h: 100, frames: 1, file: 'images/Νέοι πλανήτες και αστέρια/remove_background_keep_star_only_with_transparent-1771438021672.webp' },
 bg_star_3: { sx: 0, sy: 0, w: 140, h: 140, frames: 1, file: 'images/Νέοι πλανήτες και αστέρια/remove_background_keep_star_only_with_transparent-1771438025866.webp' },
 bg_star_4: { sx: 0, sy: 0, w: 150, h: 150, frames: 1, file: 'images/Νέοι πλανήτες και αστέρια/remove_background_keep_star_only_with_transparent-1771438033273.webp' },



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
nea_t_9:  { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771768972441.webp" },
nea_t_10: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nea terata/Remove_background-1771768972441.webp" },

// ===== TERATA POLEMISTES (Alien Warrior Monsters) — Topia Bonus Stage enemies =====
terata_p_1:  { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771992115960.webp" },
terata_p_2:  { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771992226443.webp" },
terata_p_3:  { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771992509144.webp" },
terata_p_4:  { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771992513723.webp" },
terata_p_5:  { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771992517809.webp" },
terata_p_6:  { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771992522178.webp" },
terata_p_7:  { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771992526544.webp" },
terata_p_8:  { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771994177127.webp" },
terata_p_9:  { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771994182963.webp" },
terata_p_10: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771994188335.webp" },
terata_p_11: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771994194141.webp" },
terata_p_12: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771994203016.webp" },
terata_p_13: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771994208028.webp" },
terata_p_14: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background-1771994213869.webp" },
terata_p_15: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_image-1771992811210.webp" },
terata_p_16: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_image-1771992815595.webp" },
terata_p_17: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_image-1771992819829.webp" },
terata_p_18: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_image-1771992833744.webp" },
terata_p_19: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_image-1771993078917.webp" },
terata_p_20: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_image-1771993081885.webp" },
terata_p_21: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_image-1771993086784.webp" },
terata_p_22: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_image-1771993091208.webp" },
terata_p_23: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_image-1771993095933.webp" },
terata_p_24: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_image-1771993100658.webp" },
terata_p_25: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_with_weapon-1771993284429.webp" },
terata_p_26: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_with_weapon-1771993289144.webp" },
terata_p_27: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_with_weapon-1771993303504.webp" },
terata_p_28: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_with_weapon-1771993304699.webp" },
terata_p_29: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_creature_with_weapon-1771993309754.webp" },
terata_p_30: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_warrior_creature-1771993522412.webp" },
terata_p_31: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_warrior_creature-1771993528276.webp" },
terata_p_32: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_warrior_creature-1771993536634.webp" },
terata_p_33: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_warrior_creature-1771993542076.webp" },
terata_p_34: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_warrior_creature-1771993626881.webp" },
terata_p_35: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_warrior_creature-1771993632473.webp" },
terata_p_36: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_warrior_creature-1771993777284.webp" },
terata_p_37: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_warrior_creature-1771993783545.webp" },
terata_p_38: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_warrior_creature-1771993787930.webp" },
terata_p_39: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_warrior_creature-1771993797346.webp" },
terata_p_40: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_warrior_creature-1771993802661.webp" },
terata_p_41: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/terata polemistes/Remove_background_from_alien_warrior_creature-1771993809412.webp" },

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

 // ===== POWER-UP COINS — images/nea cois/ =====
 nea_coin_01: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560363560.webp' },
 nea_coin_02: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560390448.webp' },
 nea_coin_03: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560393922.webp' },
 nea_coin_04: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560397912.webp' },
 nea_coin_05: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560401212.webp' },
 nea_coin_06: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560404998.webp' },
 nea_coin_07: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560408900.webp' },
 nea_coin_08: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560412764.webp' },
 nea_coin_09: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560416998.webp' },
 nea_coin_10: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560421312.webp' },
 nea_coin_11: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560424897.webp' },
 nea_coin_12: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560429263.webp' },
 nea_coin_13: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560432980.webp' },
 nea_coin_14: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560436596.webp' },
 nea_coin_15: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560440515.webp' },
 nea_coin_16: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560443998.webp' },
 nea_coin_17: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560536002.webp' },
 nea_coin_18: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560539991.webp' },
 nea_coin_19: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560544170.webp' },
 nea_coin_20: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560553758.webp' },
 nea_coin_21: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560557742.webp' },
 nea_coin_22: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560561469.webp' },
 nea_coin_23: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560569671.webp' },
 nea_coin_24: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560573687.webp' },
 nea_coin_25: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560578437.webp' },
 nea_coin_26: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560581771.webp' },
 nea_coin_27: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560585924.webp' },
 nea_coin_28: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560589937.webp' },
 nea_coin_29: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560593821.webp' },
 nea_coin_30: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560597406.webp' },
 nea_coin_31: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560602189.webp' },
 nea_coin_32: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560605875.webp' },
 nea_coin_33: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560609773.webp' },
 nea_coin_34: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560613838.webp' },
 nea_coin_35: { sx:0, sy:0, w:79, h:79, frames:1, file:'images/nea cois/remove_background-1772560758443.webp' },

 // ===== WEAPON ICONS — images/nea cois/ — 128×128 weapon illustration icons =====
 icon_s:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560397912.webp' },
 icon_w:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560393922.webp' },
 icon_p:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560581771.webp' },
 icon_l:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560401212.webp' },
 icon_b:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560404998.webp' },
 icon_r:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560408900.webp' },
 icon_x:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560412764.webp' },
 icon_i:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560416998.webp' },
 icon_t:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560597406.webp' },
 icon_m:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560593821.webp' },
 icon_g:  { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560432980.webp' },
 icon_ap: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560421312.webp' },
 icon_az: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560424897.webp' },
 icon_ce: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560605875.webp' },
 icon_ck: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560436596.webp' },
 icon_ch: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560602189.webp' },
 icon_eg: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560613838.webp' },
 icon_et: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560440515.webp' },
 icon_gr: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560443998.webp' },
 icon_jp: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560557742.webp' },
 icon_ma: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560561469.webp' },
 icon_mo: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560569671.webp' },
 icon_ro: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560609773.webp' },
 icon_ta: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560573687.webp' },
 icon_vi: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560589937.webp' },
 icon_zu: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560390448.webp' },
 icon_in: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560758443.webp' },
 icon_my: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560544170.webp' },
 icon_pe: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560553758.webp' },
 icon_si: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560578437.webp' },
 icon_to: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/nea cois/remove_background-1772560585924.webp' },

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

 // ===== NEES 2 — new bosses (each a DIFFERENT alien image for variety) =====
 alien_boss_n2_cockroach: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515561638.webp" },
 alien_boss_n2_beetle:    { sx:0, sy:0, w:480, h:480, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515726838.webp" },

 // ===== EXTHOS boss sprites (480×480 — for mothership variety) =====
 alien_boss_ex_1: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/exthos/A_nightmarish_alien_with_two_heads_side-by-side_in-1771750286615.webp" },
 alien_boss_ex_2: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/exthos/A_nightmarish_fuzzy_alien_based_on_a_cockroach-dra-1771750293849.webp" },
 alien_boss_ex_3: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/exthos/A_terrifying_alien_with_two_heads_side-by-side_ins-1771750311641.webp" },
 alien_boss_ex_4: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/exthos/Remove_background-1771768977965.webp" },
 alien_boss_ex_5: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/exthos/Remove_background-1771768982481.webp" },
 alien_boss_ex_6: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/exthos/Remove_background-1771768987505.webp" },
 alien_boss_ex_7: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/exthos/Remove_background-1771768993659.webp" },
 alien_boss_ex_8: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/exthos/Remove_background-1771768999233.webp" },
 alien_boss_ex_9: { sx:0, sy:0, w:480, h:480, frames:1, file:"images/exthos/Remove_background-1771769004255.webp" },
 alien_boss_ex_10:{ sx:0, sy:0, w:480, h:480, frames:1, file:"images/exthos/Remove_background-1771769010023.webp" },

 // ===== Mothership split mini-boss sprites (8 varieties) =====
 alien_boss_cockroach:  { sx:0, sy:0, w:128, h:128, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515477303.webp" },
 alien_boss_ant:        { sx:0, sy:0, w:128, h:128, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515726838.webp" },
 alien_boss_flea:       { sx:0, sy:0, w:128, h:128, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515742407.webp" },
 alien_boss_ladybug:    { sx:0, sy:0, w:128, h:128, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771515893532.webp" },
 alien_boss_cricket:    { sx:0, sy:0, w:128, h:128, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516060084.webp" },
 alien_boss_stinkbug:   { sx:0, sy:0, w:128, h:128, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516075540.webp" },
 alien_boss_leafhopper: { sx:0, sy:0, w:128, h:128, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516103301.webp" },
 alien_boss_termite:    { sx:0, sy:0, w:128, h:128, frames:1, file:"images/nees 2/Remove_background_keep_only_the_alien_creature_is-1771516924585.webp" },

// ===== NEES 2 — new insect aliens (64x64, PNG) =====
 alien_n2_24: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618088939.png" },
 alien_n2_25: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618091861.png" },
 alien_n2_26: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618094794.png" },
 alien_n2_27: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618098074.png" },
 alien_n2_28: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618103454.png" },
 alien_n2_29: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618110920.png" },
 alien_n2_30: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618111476.png" },
 alien_n2_31: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618114492.png" },
 alien_n2_32: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618118304.png" },
 alien_n2_33: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618122712.png" },
 alien_n2_34: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618127029.png" },
 alien_n2_35: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618131810.png" },
 alien_n2_36: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618135196.png" },
 alien_n2_37: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618138242.png" },
 alien_n2_38: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618141861.png" },
 alien_n2_39: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618145396.png" },
 alien_n2_40: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618149860.png" },
 alien_n2_41: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618155785.png" },
 alien_n2_42: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618163878.png" },
 alien_n2_43: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618168305.png" },
 alien_n2_44: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618173037.png" },
 alien_n2_45: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618176912.png" },
 alien_n2_46: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618181247.png" },
 alien_n2_47: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618185194.png" },
 alien_n2_48: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618192453.png" },
 alien_n2_49: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618196765.png" },
 alien_n2_50: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618201368.png" },
 alien_n2_51: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618207274.png" },
 alien_n2_52: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618211162.png" },
 alien_n2_53: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618215196.png" },
 alien_n2_54: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618218517.png" },
 alien_n2_55: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618222318.png" },
 alien_n2_56: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618225713.png" },
 alien_n2_57: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618228964.png" },
 alien_n2_58: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618232402.png" },
 alien_n2_59: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618235550.png" },
 alien_n2_60: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618239351.png" },
 alien_n2_61: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618244898.png" },
 alien_n2_62: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618248967.png" },
 alien_n2_63: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618252166.png" },
 alien_n2_64: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618256337.png" },
 alien_n2_65: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618264168.png" },
 alien_n2_66: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618265606.png" },
 alien_n2_67: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618270129.png" },
 alien_n2_68: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_to_create_100_transp-1772618270571.png" },
 alien_n2_69: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367546994.webp" },
 alien_n2_70: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367549858.webp" },
 alien_n2_71: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367524732.webp" },
 alien_n2_72: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367528021.webp" },
 alien_n2_73: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367515604.webp" },
 alien_n2_74: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367520846.webp" },
 alien_n2_75: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367524732.webp" },
 alien_n2_76: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367528021.webp" },
 alien_n2_77: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367537260.webp" },
 alien_n2_78: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367538752.webp" },
 alien_n2_79: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367540393.webp" },
 alien_n2_80: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367546284.webp" },
 alien_n2_81: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367546994.webp" },
 alien_n2_82: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nees 2/Remove_background_completely_transparent_PNG_outp-1772367549858.webp" },

// ===== NENES 3 — alien creatures (64x64) =====
 alien_n3_01: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_make_transparent_PNG-1772367557167 (1).webp" },
 alien_n3_02: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_make_transparent_PNG-1772382834884.webp" },
 alien_n3_03: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_make_transparent_PNG-1772382843642.webp" },
 alien_n3_04: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382855829.webp" },
 alien_n3_05: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382861632.webp" },
 alien_n3_06: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382873107.webp" },
 alien_n3_07: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382878448.webp" },
 alien_n3_08: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382888880.webp" },
 alien_n3_09: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382893646.webp" },
 alien_n3_10: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382900957.webp" },
 alien_n3_11: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382906793.webp" },
 alien_n3_12: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382915530.webp" },
 alien_n3_13: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382921146.webp" },
 alien_n3_14: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382933461.webp" },
 alien_n3_15: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382938046.webp" },
 alien_n3_16: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382947536.webp" },
 alien_n3_17: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382951964.webp" },
 alien_n3_18: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382966302.webp" },
 alien_n3_19: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382973281.webp" },
 alien_n3_20: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382987732.webp" },
 alien_n3_21: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772382993983.webp" },
 alien_n3_22: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383005764.webp" },
 alien_n3_23: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383019485.webp" },
 alien_n3_24: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383034198.webp" },
 alien_n3_25: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383039605.webp" },
 alien_n3_26: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383049215.webp" },
 alien_n3_27: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383053724.webp" },
 alien_n3_28: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383063234.webp" },
 alien_n3_29: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383069634.webp" },
 alien_n3_30: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383080304.webp" },
 alien_n3_31: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383084956.webp" },
 alien_n3_32: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383155459.webp" },
 alien_n3_33: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383159814.webp" },
 alien_n3_34: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383175188.webp" },
 alien_n3_35: { sx:0, sy:0, w:64, h:64, frames:1, file:"images/nenes 3/Remove_background_completely_transparent_PNG-1772383175426.webp" },

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
exthos_f_15: { sx:0, sy:0, w:64, h:64, frames:1, file:'images/exthos/Remove_background-1771769103073.webp' },
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
 spaceman_4: { sx:0, sy:0, w:140, h:140, frames:1, file:'images/space man/envato-labs-image-edit.webp' },
 spaceman_5: { sx:0, sy:0, w:140, h:140, frames:1, file:'images/space man/envato-labs-image-edit (1).webp' },
 spaceman_6: { sx:0, sy:0, w:140, h:140, frames:1, file:'images/space man/envato-labs-image-edit (2).webp' },

// ===== FROUTA — Bonus fruit collectibles (1 per stage, 1000/2000/3000 pts) =====
fruit_1:  { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_cherry_image_to_create_tran-1772480585399.png' },
fruit_2:  { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_banana_image_to_create_tran-1772480754925.png' },
fruit_3:  { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_pineapple_image_to_create_t-1772480879565.png' },
fruit_4:  { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_watermelon_slice_image_to_c-1772481177742.png' },
fruit_5:  { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_cantaloupe_melon_slice_imag-1772481180798.png' },
fruit_6:  { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_pear_image_to_create_transp-1772481184998.png' },
fruit_7:  { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_mango_half_image_to_create_-1772481188048.png' },
fruit_8:  { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_strawberry_image_to_create_-1772481191918.png' },
fruit_9:  { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_grape_cluster_image_to_crea-1772481196146.png' },
fruit_10: { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_kiwi_half_image_to_create_t-1772481525204.png' },
fruit_11: { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_red_grapefruit_slice_image_-1772481528953.png' },
fruit_12: { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_mandarin_orange_image_to_cr-1772481532533.png' },
fruit_13: { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_lemon_slice_image_to_create-1772481537037.png' },
fruit_14: { sx:0, sy:0, w:80, h:80, frames:1, file:'FROUTA/Remove_background_from_coconut_half_image_to_creat-1772481540765.png' }
};

// ===================================================================
// ALIEN SPRITE POOL — nees 2 + nees 3 sprites
// Sliding window: every level introduces 2 new aliens, phases out 2 old
// ===================================================================
var allAlienPool = [
  // === Levels 1-5 window (positions 0-9): nees 2 early sprites ===
  'alien_n2_01','alien_n2_02','alien_n2_03','alien_n2_04',
  'alien_n2_05','alien_n2_06','alien_n2_07','alien_n2_08',
  'alien_n2_09','alien_n2_10',

  // === Level 6+ window (positions 10-29): classic sprites + nees 2 continued ===
  'enemy_alien_red',     'alien_n2_11',       // level 6
  'enemy_mech_boss',     'alien_n2_12',       // level 7
  'enemy_green_creature','alien_n2_13',       // level 8
  'enemy_blue_ship',     'alien_n2_14',       // level 9
    'alien_n2_15',                             // level 10
    'alien_n2_16',                             // level 11
  'enemy_new_1',         'alien_n2_17',       // level 12
           'alien_n2_18',                     // level 13
           'alien_n2_19',                     // level 14
           'alien_n2_20',                     // level 15

  // === Level 16+ window (positions 30-56): classic sprite sheet + nees 2 ===
  'enemy_purple',        'alien_n2_21',       // level 16
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
  'alien_n2_23',                                    // level 29

  // === Level 30–64: nees 2 extended paired with nenes 3 (fresh faces every level) ===
  'alien_n2_24','alien_n3_01',
  'alien_n2_25','alien_n3_02',
  'alien_n2_26','alien_n3_03',
  'alien_n2_27','alien_n3_04',
  'alien_n2_28','alien_n3_05',
  'alien_n2_29','alien_n3_06',
  'alien_n2_30','alien_n3_07',
  'alien_n2_31','alien_n3_08',
  'alien_n2_32','alien_n3_09',
  'alien_n2_33','alien_n3_10',
  'alien_n2_34','alien_n3_11',
  'alien_n2_35','alien_n3_12',
  'alien_n2_36','alien_n3_13',
  'alien_n2_37','alien_n3_14',
  'alien_n2_38','alien_n3_15',
  'alien_n2_39','alien_n3_16',
  'alien_n2_40','alien_n3_17',
  'alien_n2_41','alien_n3_18',
  'alien_n2_42','alien_n3_19',
  'alien_n2_43','alien_n3_20',
  'alien_n2_44','alien_n3_21',
  'alien_n2_45','alien_n3_22',
  'alien_n2_46','alien_n3_23',
  'alien_n2_47','alien_n3_24',
  'alien_n2_48','alien_n3_25',
  'alien_n2_49','alien_n3_26',
  'alien_n2_50','alien_n3_27',
  'alien_n2_51','alien_n3_28',
  'alien_n2_52','alien_n3_29',
  'alien_n2_53','alien_n3_30',
  'alien_n2_54','alien_n3_31',
  'alien_n2_55','alien_n3_32',
  'alien_n2_56','alien_n3_33',
  'alien_n2_57','alien_n3_34',
  'alien_n2_58','alien_n3_35',

  // === Level 65–76: remaining nees 2 sprites ===
  'alien_n2_59','alien_n2_60',
  'alien_n2_61','alien_n2_62',
  'alien_n2_63','alien_n2_64',
  'alien_n2_65','alien_n2_66',
  'alien_n2_67','alien_n2_68',
  'alien_n2_69','alien_n2_70',
  'alien_n2_71','alien_n2_72',
  'alien_n2_73','alien_n2_74',
  'alien_n2_75','alien_n2_76',
  'alien_n2_77','alien_n2_78',
  'alien_n2_79','alien_n2_80',
  'alien_n2_81','alien_n2_82'
  // Level 77+: cycles back to start (fresh rotation)
];

// Active species pool for dedicated species stages (null = use allAlienPool)
var currentLevelPool = null;

// Returns movement-speed multiplier for the current level.
// Levels 1-5: moderate (0.55). Rises to 0.90 by level ~25.
// "Breathing room" dip of 12% right after every bonus stage (levels 6, 11, 16...).
function _getDiffMult() {
  var lv = currentLevel;
  if(lv <= 5) return 0.55;
  var _base = Math.min(0.90, 0.55 + (lv - 5) * 0.023);
  if((lv - 1) % 5 === 0) _base *= 0.88; // gentler restart after bonus stage
  return _base;
}

// Returns grid shoot-cooldown multiplier (higher = slower fire).
// Early levels: 1.5× (grid shoots slowly). Ramps down to 0.52× by level 25+.
function _getGridCooldownMult() {
  var lv = currentLevel;
  if(lv <= 5)  return 1.5;
  if(lv <= 10) return 1.0;
  if(lv <= 15) return 0.78;
  return Math.max(0.52, 0.78 - (lv - 15) * 0.026);
}

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

  // ===== MOTHER SHIPS =====
  mother_small: function() {
    var pool = ['alien_boss_n2_cockroach','alien_boss_n2_beetle','alien_boss_n2_cicada',
                'alien_boss_ex_1','alien_boss_ex_2','alien_boss_ex_4','alien_boss_ex_5',
                'alien_boss_ex_6','alien_boss_ex_7','alien_boss_ex_8'];
    var spr  = pool[Math.floor(Math.random() * pool.length)];
    return {
      x: Game.width * 0.3, y: -500, sprite: spr, health: 250,
      movementType: 'mothership',
      motherTargetY: 100, motherSpeed: 300,
      isMotherShip: true, spawnRate: 5, spawnType: 'cork_left', points: 500, missiles: 2
    };
  },
  mother_medium: function() {
    var pool = ['alien_boss_n2_cicada','alien_boss_n2_cockroach','alien_boss_n2_beetle',
                'alien_boss_ex_1','alien_boss_ex_2','alien_boss_ex_3','alien_boss_ex_5',
                'alien_boss_ex_7','alien_boss_ex_9','alien_boss_ex_10'];
    var spr  = pool[Math.floor(Math.random() * pool.length)];
    return {
      x: Game.width * 0.3, y: -500, sprite: spr, health: 500,
      movementType: 'mothership',
      motherTargetY: 80, motherSpeed: 280,
      isMotherShip: true, spawnRate: 4, spawnType: 'swoop_left', points: 800, missiles: 3
    };
  },
  mother_large: function() {
    var pool = ['alien_boss_n2_cockroach','alien_boss_n2_beetle','alien_boss_n2_cicada',
                'alien_boss_ex_1','alien_boss_ex_2','alien_boss_ex_3','alien_boss_ex_4',
                'alien_boss_ex_6','alien_boss_ex_8','alien_boss_ex_10'];
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
    var pool = ['alien_boss_ex_1','alien_boss_ex_2','alien_boss_ex_3',
                'alien_boss_n2_cicada','alien_boss_n2_cockroach','alien_boss_n2_beetle',
                'alien_boss_ex_4','alien_boss_ex_9','alien_boss_ex_10'];
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

  var _gridLvlM = currentLevel <= 5 ? 0.55 : Math.min(0.90, 0.55 + (currentLevel - 5) * 0.023);
  // Ταχύτητα ± 15% τυχαία — also scale by spriteScale so larger grids move proportionally
  this.speed = (opts.initial_speed || 40) * _gridLvlM * 2.2 * (0.85 + Math.random() * 0.30) * _ss;
  this.stepDownPx = opts.step_down_pixels || 16;
  this.marginL = 16;
  this.marginR = 16;

  // Auto-fit cols: ensure the grid doesn't exceed screen width (critical on mobile)
  var _sprW = Math.round(64 * _ss);
  var _maxCols = Math.floor((Game.width - this.marginL - this.marginR - _sprW) / this.spacingX) + 1;
  if(this.cols > _maxCols) this.cols = Math.max(4, _maxCols);

  // Auto-fit rows: ensure the grid bottom doesn't reach the player zone (+50px extra buffer)
  var _topY = (opts.start_y || 30) + 10; // conservative top estimate
  var _playerSafeY = Game.height - (Game.playerOffset || 10) - 32 - 80;
  var _maxRows = Math.min(5, Math.max(3, Math.floor((_playerSafeY - _topY) / this.spacingY)));
  if(this.rows > _maxRows) this.rows = _maxRows;

  // Shoot timing ± 20% τυχαία
  var _cdBase = (opts.cooldown_ms || 1200) * (0.80 + Math.random() * 0.40);
  this.shootCooldown = _cdBase / 1000;
  this.minCooldown = (opts.min_cooldown_ms || 250) / 1000;
  this.shootTimer = this.shootCooldown;
  // Y start ± 10px τυχαία — shifted 20px higher so formation sits near the top
  this.gridY = Math.max(4, (opts.start_y || 30) + Math.floor(Math.random() * 21) - 10 - 20);

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

  // Continuous morph: all enemies cycle sprites from a fixed pool every 3s
  this.continuousMorph     = opts.continuousMorph     || false;
  this.continuousMorphPool = opts.continuousMorphPool  || null;

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
  this._aliveBuffer = []; // pre-allocated, reused every step (avoids GC)
  // Entry fly-in: enemies rush in one-by-one from a random side
  this.entryDir = ['left', 'right', 'top'][Math.floor(Math.random() * 3)];
  this.allEntered = false;
  this.enteredCount = 0;
};

GridFormation.prototype.init = function(board) {
  SoundManager.playDiveBuzz(); // entry buzz — enemies flying to position
  var _ss = Game.spriteScale || 1.0;
  var _sprW = Math.round(64 * _ss);
  var _entrySpd = 480 + Math.random() * 120;
  // Galaga-style single entry point: all enemies come from ONE spot, one after another.
  // Each launches 0.22s after the previous — clear visual separation, no stacking.
  var _interval = 0.22;
  // For top: all start from center-top (Galaga fountain).
  // For left/right: each enemy starts at its own row height along the edge — never stacked.
  var _topEntryX = Math.round(Game.width * 0.5);
  for(var i = 0; i < this.positions.length; i++) {
    var pos = this.positions[i];
    var spr = this.spriteList[Math.floor(pos.row) % this.spriteList.length];
    var ge = new GridEnemy(spr, pos.row, pos.col, this);
    var tX = this.gridX + pos.col * this.spacingX;
    var tY = this.gridY + pos.row * this.spacingY;
    var eX, eY;
    if(this.entryDir === 'left')       { eX = -_sprW - 20;            eY = tY; } // own row height
    else if(this.entryDir === 'right') { eX = Game.width + _sprW + 20; eY = tY; } // own row height
    else                               { eX = _topEntryX; eY = -_sprW - 20; } // center-top fountain
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
  // Reuse pre-allocated buffer — avoids array allocation + GC every frame
  var alive = this._aliveBuffer;
  alive.length = 0;
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
  this.gridY += 11 * dt;

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

  // Update all enemy positions (cache properties to avoid repeated object lookups)
  var _gx = this.gridX, _gy = this.gridY, _sx = this.spacingX, _sy = this.spacingY;
  for(var i = 0; i < alive.length; i++) {
    var e = alive[i];
    e.x = _gx + e.gridCol * _sx;
    e.y = _gy + e.gridRow * _sy;
  }

  // === ATTACK: random single-enemy pattern (dive / sweep / snake / return) ===
  if(!this.diveTimer) this.diveTimer = 0;
  if(!this.diveInterval) this.diveInterval = this.diveCooldown || 3.5;
  this.diveTimer += dt;
  if(this.diveTimer >= this.diveInterval && alive.length > 1) {
    this.diveTimer = 0;
    var pick = alive[Math.floor(Math.random() * alive.length)];
    pick.dead = true;
    this.board.remove(pick);
    var _ar = Math.random();
    if(_ar < 0.28) {
      this.board.add(new DivingEnemy(pick.sprite, pick.x, pick.y));   // straight dive
    } else if(_ar < 0.52) {
      this.board.add(new SweepEnemy(pick.sprite, pick.x, pick.y));    // diagonal sweep
    } else if(_ar < 0.76) {
      this.board.add(new SnakeEnemy(pick.sprite, pick.x, pick.y));    // sinusoidal descent
    } else {
      this.board.add(new ReturnEnemy(pick.sprite, pick.x, pick.y));   // dive + return + dive
    }
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

  // === WING ATTACK: 2-3 enemies from the same row dive together ===
  if(!this.wingTimer) this.wingTimer = 0;
  if(!this.wingInterval) this.wingInterval = 11 + Math.random() * 7;
  this.wingTimer += dt;
  if(this.wingTimer >= this.wingInterval && alive.length > 3) {
    this.wingTimer = 0;
    this.wingInterval = 11 + Math.random() * 7;
    // Group alive enemies by gridRow
    var _rowMap = {}, _rk;
    for(var _ri = 0; _ri < alive.length; _ri++) {
      var _rr = alive[_ri].gridRow;
      if(!_rowMap[_rr]) _rowMap[_rr] = [];
      _rowMap[_rr].push(alive[_ri]);
    }
    // Find the row with the most members (need ≥2)
    var _wingRow = null, _wingMax = 1;
    for(_rk in _rowMap) {
      if(_rowMap[_rk].length > _wingMax) { _wingMax = _rowMap[_rk].length; _wingRow = _rk; }
    }
    if(_wingRow !== null && _rowMap[_wingRow].length >= 2) {
      var _wingArr = _rowMap[_wingRow].slice(0, 3);
      for(var _wi = 0; _wi < _wingArr.length; _wi++) {
        var _wp = _wingArr[_wi];
        _wp.dead = true;
        this.board.remove(_wp);
        this.board.add(new DivingEnemy(_wp.sprite, _wp.x, _wp.y));
      }
      SoundManager.playDiveBuzz();
    }
  }

  // === BOOMERANG ATTACK: enemy dives, exits, re-enters from opposite side ===
  if(!this.boomTimer) this.boomTimer = 0;
  if(!this.boomInterval) this.boomInterval = 18 + Math.random() * 10;
  this.boomTimer += dt;
  if(this.boomTimer >= this.boomInterval && alive.length > 2) {
    this.boomTimer = 0;
    this.boomInterval = 18 + Math.random() * 10;
    var _bpick = alive[Math.floor(Math.random() * alive.length)];
    _bpick.dead = true;
    this.board.remove(_bpick);
    this.board.add(new BoomerangEnemy(_bpick.sprite, _bpick.x, _bpick.y));
    SoundManager.playDiveBuzz();
  }

  // Shooting from bottom of columns (fire rate scales with difficulty)
  this.shootTimer -= dt;
  var cooldown = Math.max(this.minCooldown, this.shootCooldown * ratio * _getGridCooldownMult());
  if(this.shootTimer <= 0) {
    this.shootTimer = cooldown;
    // Find bottom enemy per column — avoid Object.keys() allocation
    var _colBest = this._colBestBuffer || (this._colBestBuffer = {});
    var _shooters = this._shootersBuffer || (this._shootersBuffer = []);
    _shooters.length = 0;
    for(var _bk in _colBest) delete _colBest[_bk]; // clear without realloc
    for(var i = 0; i < alive.length; i++) {
      var e = alive[i];
      if(!_colBest[e.gridCol] || e.gridRow > _colBest[e.gridCol].gridRow)
        _colBest[e.gridCol] = e;
    }
    for(var _ck in _colBest) _shooters.push(_colBest[_ck]);
    if(_shooters.length > 0) {
      var shooter = _shooters[Math.floor(Math.random() * _shooters.length)];
      this.board.add(new EnemyMissile(shooter.x + shooter.w/2, shooter.y + shooter.h));
    }
  }
};

GridFormation.prototype.draw = function(ctx) { };

// ===== SIREN PORTRAIT (Gauntlet stage) =====
var SirenPortrait = function(opts) {
  opts = opts || {};
  this.x = 0;
  this.y = 0;
  this.w = Game.width;
  this.h = Math.round(Game.height * 0.65);
  this.type = OBJECT_ENEMY;

  this.img = new Image();
  this.imgLoaded = false;
  var _self = this;
  this.img.onload = function() { _self.imgLoaded = true; };
  this.img.src = opts.portraitFile || _sirenPortraitFiles[0];

  this.health    = opts.health    || 350;
  this.maxHealth = this.health;
  this.hitFlash  = 0;
  this.dead      = false;
  this.points    = opts.points    || 800;

  this.spawnTimer = opts.spawnDelay || 1.5;
  this.spawnRate  = opts.spawnRate  || 3.5;
  this.spawnType  = opts.spawnType  || 'swoop_left';

  this.nextPortrait = opts.next || null;
  this.deathTimer   = -1;

  // Pre-generate 12 crack paths revealed progressively as health drops
  this.cracks = [];
  for(var i = 0; i < 12; i++) {
    var _cx = Game.width  * (0.1 + Math.random() * 0.8);
    var _cy = Game.height * (0.05 + Math.random() * 0.55);
    var segs = [];
    var nx = _cx, ny = _cy;
    for(var s = 0; s < 4; s++) {
      nx += (Math.random() - 0.5) * 55;
      ny += Math.random() * 35 + 8;
      segs.push([nx, ny]);
    }
    this.cracks.push({ x: _cx, y: _cy, segs: segs });
  }
};

SirenPortrait.prototype.hit = function(damage) {
  if(this.dead) return;
  this.health -= (damage || 1);
  this.hitFlash = 1.0;
  if(this.health <= 0) {
    this.health = 0;
    this.dead = true;
    Game.score += this.points;
    if(this.board) {
      for(var i = 0; i < 6; i++) {
        this.board.add(new ParticleExplosion(
          Math.random() * Game.width,
          Math.random() * this.h,
          80
        ));
      }
    }
    Game.shake(10, 0.8);
    SoundManager.playEnemyDeath();
    this.deathTimer = 1.5;
  }
};

SirenPortrait.prototype.step = function(dt) {
  if(this.dead) {
    if(this.deathTimer > 0) {
      this.deathTimer -= dt;
      if(this.deathTimer <= 0) {
        if(this.nextPortrait && this.board) {
          this.board.add(new SirenPortrait(this.nextPortrait));
        }
        this.board.remove(this);
      }
    }
    return;
  }

  if(this.hitFlash > 0) this.hitFlash = Math.max(0, this.hitFlash - dt * 4);

  this.spawnTimer -= dt;
  if(this.spawnTimer <= 0) {
    this.spawnTimer = this.spawnRate * (0.8 + Math.random() * 0.4);
    this._spawnWave();
  }
};

SirenPortrait.prototype._spawnWave = function() {
  var count = 1 + Math.floor(Math.random() * 2);
  for(var i = 0; i < count; i++) {
    var blueprint = enemies[this.spawnType];
    if(typeof blueprint === 'function') blueprint = blueprint.call(enemies);
    if(blueprint && this.board) this.board.add(new Enemy(blueprint, {}));
  }
  SoundManager.playAlienAttack();
};

SirenPortrait.prototype.draw = function(ctx) {
  var w = Game.width, h = this.h;
  var healthRatio = this.health / this.maxHealth;

  // Portrait image — semi-transparent
  if(this.imgLoaded) {
    ctx.save();
    ctx.globalAlpha = this.dead ? Math.max(0, this.deathTimer / 1.5) * 0.60 : 0.62;
    ctx.drawImage(this.img, 0, 0, w, h);
    ctx.restore();
  } else {
    ctx.save();
    ctx.fillStyle = 'rgba(20,0,30,0.5)';
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  // Progressive crack overlay
  var cracksVisible = Math.floor((1 - healthRatio) * this.cracks.length);
  if(cracksVisible > 0) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth   = 1.5;
    ctx.shadowColor = '#AACCFF';
    ctx.shadowBlur  = 5;
    for(var i = 0; i < cracksVisible; i++) {
      var c = this.cracks[i];
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      for(var s = 0; s < c.segs.length; s++) ctx.lineTo(c.segs[s][0], c.segs[s][1]);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Hit flash overlay
  if(this.hitFlash > 0) {
    ctx.save();
    ctx.globalAlpha = this.hitFlash * 0.28;
    ctx.fillStyle   = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  // Health bar (top, centered)
  if(!this.dead) {
    var barW = Math.round(w * 0.55);
    var barX = Math.round((w - barW) / 2);
    var barH = 7, barY = 8;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = healthRatio > 0.5 ? '#FF44AA' : (healthRatio > 0.25 ? '#FF8800' : '#FF2200');
    ctx.fillRect(barX, barY, Math.round(barW * healthRatio), barH);
    ctx.strokeStyle = 'rgba(255,80,180,0.5)';
    ctx.lineWidth   = 1;
    ctx.strokeRect(barX, barY, barW, barH);
    ctx.restore();
  }
};

// Individual enemy inside a grid formation
var GridEnemy = function(spriteType, row, col, formation) {
  this.setup(spriteType, { health: 10, points: 50 });
  this.w = Math.round(this.w * 0.81);
  this.h = Math.round(this.h * 0.81);
  this.gridRow = row;
  this.gridCol = col;
  this.formation = formation;
  this.dead = false;
  // Individual sway motion (slow and subtle)
  this.swayAngle = 0;
  this.swaySpeed = 0.6 + Math.random() * 0.4;
  this.swayOffset = Math.random() * Math.PI * 2;
  this.t = 0;

  // Random base rotation for visual variety (30% straight, others tilted 30°/45°/180°)
  var _gBaseRots = [0, 0, 0, Math.PI/6, -Math.PI/6, Math.PI/4, -Math.PI/4, Math.PI, Math.PI, Math.PI/3, -Math.PI/3];
  this.baseRotation = _gBaseRots[Math.floor(Math.random() * _gBaseRots.length)];

  // Entry spin: 22% chance to spin 180° while flying to formation position
  this.doEntryFlip = Math.random() < 0.22;
  this.entrySpinAngle = 0;
  this.entryElapsed = 0;

  // Random 180° flip animation (some enemies do this)
  this.canFlip = Math.random() < 0.3; // 30% chance to be a flipper
  this.flipAngle = 0;
  this.flipSpeed = 0;
  this.isFlipping = false;
  this.flipCooldown = 3 + Math.random() * 5; // Wait before first flip

  // Morph effect setup
  var _fContinuous = (formation && formation.continuousMorph);
  if(_fContinuous) {
    // CONTINUOUS MODE: near-instant restart after crossfade — always changing faces
    this._morphEnabled    = true;
    this._morphContinuous = true;
    this._morphAlpha      = 1.0;
    this._morphState      = 'idle';
    this._morphTimer      = Math.random() * 1.5; // stagger start so not all change at once
    this._morphSprite     = spriteType;
    this._morphOldSprite  = null;
    this._morphList       = formation.continuousMorphPool; // pre-set pool (nenes3)
    this._morphIdx        = Math.floor(Math.random() * (formation.continuousMorphPool ? formation.continuousMorphPool.length : 1));
    this._morphCount      = 0;
    this._morphMax        = 99999; // unlimited
    // ~35% of continuous-morph enemies are 30% bigger (when settled in formation)
    this._bigEnemy = (Math.random() < 0.35);
  } else {
    this._bigEnemy = false;
    // REGULAR MODE: always enabled — every enemy morphs up to 3 times during its lifetime
    this._morphEnabled    = true;
    this._morphContinuous = false;
    this._morphAlpha      = 1.0;
    this._morphState      = 'idle';
    this._morphTimer      = 2 + Math.random() * 3;
    this._morphSprite     = spriteType;
    this._morphOldSprite  = null;
    this._morphList       = null; // built lazily
    this._morphIdx        = 0;
    this._morphCount      = 0;
    this._morphMax        = 3;
  }
};

GridEnemy.prototype = new Sprite();
GridEnemy.prototype.type = OBJECT_ENEMY;

GridEnemy.prototype.step = function(dt) {
  // Entry fly-in: rush straight to target position
  if(this.entering) {
    if(this.entryDelay > 0) { this.entryDelay -= dt; return; }
    // Animate 180° entry spin while flying to position
    this.entryElapsed += dt;
    if(this.doEntryFlip) {
      this.entrySpinAngle = Math.min(Math.PI, this.entryElapsed * 3.2);
    }
    var _dx = this.targetX - this.x, _dy = this.targetY - this.y;
    var _d = Math.sqrt(_dx*_dx + _dy*_dy);
    var _spd = this.entrySpeed || 500;
    var _move = _spd * dt;
    // Cap: snap if close enough OR if step would overshoot (prevents oscillation at low FPS)
    if(_d < 2 || _move >= _d) {
      this.x = this.targetX; this.y = this.targetY;
      this.entering = false;
      this.t = -this.swayOffset / this.swaySpeed; // sync phase so sway starts smoothly
      // Lock the entry spin into baseRotation so enemy stays at its final angle
      if(this.doEntryFlip) { this.baseRotation += Math.PI; }
      this.entrySpinAngle = 0;
      this.formation.enteredCount++;
      if(this.formation.enteredCount >= this.formation.totalEnemies) {
        this.formation.allEntered = true;
        SoundManager.playEnemyLand();
      }
    } else {
      this.x += (_dx / _d) * _move;
      this.y += (_dy / _d) * _move;
    }
    return;
  }

  this.t += dt;
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;

  // Individual sway motion (±5° — subtle alive feel, not dramatic rocking)
  this.swayAngle = Math.sin(this.t * this.swaySpeed + this.swayOffset) * (Math.PI / 36);

  // Random 180° flip animation
  if(this.canFlip && !this.isFlipping) {
    this.flipCooldown -= dt;
    if(this.flipCooldown <= 0) {
      this.isFlipping = true;
      this.flipSpeed = 4 + Math.random() * 2; // Random flip speed
      this.flipCooldown = 4 + Math.random() * 6; // Next flip
      SoundManager.playVoidCollapse(); // H — Void Collapse: 180° rotation
    }
  }
  if(this.isFlipping) {
    this.flipAngle += this.flipSpeed * dt;
    if(this.flipAngle >= Math.PI) { // 180° done
      this.flipAngle = 0;
      this.isFlipping = false;
    }
  }

  // Morph effect: cross-fade to a different creature sprite (max 4 morphs per enemy)
  if (this._morphEnabled) {
    // Build the morph sprite list lazily (needs pool globals fully initialised)
    if (!this._morphList) {
      var _mp = _getMorphSpritePool();
      this._morphList = [];
      var _tries = 0;
      while (this._morphList.length < 4 && _tries < 60) {
        _tries++;
        var _cand = _mp[Math.floor(Math.random() * _mp.length)];
        if (_cand !== this.sprite && this._morphList.indexOf(_cand) < 0) {
          this._morphList.push(_cand);
        }
      }
    }
    var _ms = this._morphState;
    if (_ms === 'idle') {
      this._morphTimer -= dt;
      if (this._morphTimer <= 0 && this._morphCount < this._morphMax) {
        // Begin true cross-dissolve: old fades out while new fades in simultaneously
        this._morphOldSprite = this._morphSprite;
        this._morphSprite    = this._morphList[this._morphIdx % this._morphList.length];
        this._morphIdx++;
        this._morphCount++;
        this._morphAlpha = 0; // 0 = fully showing old; 1 = fully showing new
        this._morphState = 'crossfade';
      }
    } else { // crossfade
      // Continuous: 1.5s crossfade (0.67/s). Regular: 4s (0.25/s)
      var _cRate = this._morphContinuous ? 0.67 : 0.25;
      this._morphAlpha += _cRate * dt;
      if (this._morphAlpha >= 1) {
        this._morphAlpha     = 1;
        this._morphOldSprite = null;
        this._morphState     = 'idle';
        // Continuous: exactly 2s pause then next change. Regular: 3-9s pause
        this._morphTimer = this._morphContinuous ? 2.0 : (3 + Math.random() * 6);
      }
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
  // Morph: _morphSprite = new (fading in), _morphOldSprite = old (fading out)
  var _drawSpr   = (this._morphEnabled ? this._morphSprite : this.sprite) || this.sprite;
  var _morphAlph = this._morphEnabled ? this._morphAlpha : 1.0;
  var _morphOld  = this._morphEnabled ? this._morphOldSprite : null;

  // Horizontal motion ghost trail — appears behind lateral movement direction
  var _vx = this.x - (this._lastDrawX !== undefined ? this._lastDrawX : this.x);
  this._lastDrawX = this.x;
  if(Math.abs(_vx) > 0.15) {
    var _ghostDir = _vx > 0 ? 1 : -1;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    // Two ghost copies: one close (8px), one far (18px) — fades from near to far
    ctx.globalAlpha = 0.38 * _morphAlph;
    SpriteSheet.draw(ctx, _drawSpr, this.x - _ghostDir * 8,  this.y, this.frame, this.w, this.h);
    ctx.globalAlpha = 0.20 * _morphAlph;
    SpriteSheet.draw(ctx, _drawSpr, this.x - _ghostDir * 18, this.y, this.frame, this.w, this.h);
    ctx.restore();
  }

  // Main enemy
  ctx.save();
  var gCx = this.x + this.w / 2, gCy = this.y + this.h / 2;

  // Combine base tilt + entry spin + sway + banking + flip animation
  var totalRotation = this.baseRotation + (this.entrySpinAngle || 0) + this.swayAngle + (this.bankAngle || 0) + this.flipAngle;
  ctx.translate(gCx, gCy);
  ctx.rotate(totalRotation);

  // Subtle breathing pulse — barely visible (±2% scale)
  var pulse = 1.0 + 0.02 * Math.sin(this.t * 2.8 + this.swayOffset);
  // Big enemies: 30% larger when settled in formation (not entering)
  var _bigS = (this._bigEnemy && !this.entering) ? 1.3 : 1.0;
  // Scale pop during morph crossfade: bell-curve +9% at midpoint
  var _morphPop = _morphOld ? (1.0 + 0.12 * Math.sin(_morphAlph * Math.PI)) : 1.0;
  ctx.scale(pulse * _bigS * _morphPop, pulse * _bigS * _morphPop);

  ctx.translate(-gCx, -gCy);

  if(_morphOld) {
    // True cross-dissolve: old fades out while new fades in simultaneously
    ctx.globalAlpha = 1 - _morphAlph;
    SpriteSheet.draw(ctx, _morphOld, this.x, this.y, this.frame, this.w, this.h);
    ctx.globalAlpha = _morphAlph;
    SpriteSheet.draw(ctx, _drawSpr, this.x, this.y, this.frame, this.w, this.h);
  } else {
    ctx.globalAlpha = _morphAlph;
    SpriteSheet.draw(ctx, _drawSpr, this.x, this.y, this.frame, this.w, this.h);
  }
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
  this.health -= (Game.pharaohActive&&this.type===OBJECT_ENEMY?damage*3:damage);
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      this.dead = true;
      SoundManager.playEnemyDeath();
      var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
      earnPoints(this.board, ecx, this.y, this.points || 100, '#FFFFFF');
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
// MORPH HELPERS — shared by all diving/attacking enemy types
// ===================================================================
function _initEnemyMorph(obj, spriteType) {
  obj._morphEnabled   = true;
  obj._morphSprite    = spriteType;
  obj._morphOldSprite = null;
  obj._morphAlpha     = 1.0;
  obj._morphState     = 'idle';
  obj._morphTimer     = 1.5 + Math.random() * 3;
  obj._morphList      = null; // built lazily
  obj._morphIdx       = 0;
  obj._morphCount     = 0;
  obj._morphMax       = 3;
}
function _stepEnemyMorph(obj, dt) {
  if (!obj._morphEnabled) return;
  if (!obj._morphList) {
    var _hmp = _getMorphSpritePool();
    obj._morphList = [];
    var _ht = 0;
    while (obj._morphList.length < 4 && _ht < 60) {
      _ht++;
      var _hc = _hmp[Math.floor(Math.random() * _hmp.length)];
      if (_hc !== obj.sprite && obj._morphList.indexOf(_hc) < 0) obj._morphList.push(_hc);
    }
  }
  if (obj._morphState === 'idle') {
    obj._morphTimer -= dt;
    if (obj._morphTimer <= 0 && obj._morphCount < obj._morphMax) {
      obj._morphOldSprite = obj._morphSprite;
      obj._morphSprite    = obj._morphList[obj._morphIdx % obj._morphList.length];
      obj._morphIdx++;
      obj._morphCount++;
      obj._morphAlpha = 0;
      obj._morphState = 'crossfade';
    }
  } else {
    obj._morphAlpha += 0.67 * dt;
    if (obj._morphAlpha >= 1) {
      obj._morphAlpha     = 1;
      obj._morphOldSprite = null;
      obj._morphState     = 'idle';
      obj._morphTimer     = 3 + Math.random() * 4;
    }
  }
}

// ===================================================================
// DIVING ENEMY (detaches from grid and swoops toward player)
// ===================================================================
var DivingEnemy = function(spriteType, startX, startY) {
  this.setup(spriteType, { health: 10, points: 3000 });
  SoundManager.playAlienAttack();
  this.x = startX;
  this.y = startY;
  this.startX = startX;
  this.startY = startY;
  this.t = 0;
  this.phase = 0; // 0=dive toward player, 1=curve and exit right
  // Dive speed scales with difficulty (includes breathing-room dips after bonus stages)
  var levelSpeedMult = _getDiffMult();
  this.diveSpeed = 120 * (Game.width / 320) * levelSpeedMult;
  this.hasShot = false;
  this.targetX = Game.width * 0.5; // Will update to player pos
  this.trail = [];
  this._trailPx = null; this._trailPy = null; // distance-based trail sampling
  this.bankAngle = 0;
  // Individual sway motion (slow and subtle)
  this.swayAngle = 0;
  this.swaySpeed = 0.6 + Math.random() * 0.4;
  this.swayOffset = Math.random() * Math.PI * 2;
  // Random base rotation for visual variety
  var _dBaseRots = [0, 0, Math.PI/6, -Math.PI/6, Math.PI/4, -Math.PI/4, Math.PI, Math.PI/3, -Math.PI/3];
  this.baseRotation = _dBaseRots[Math.floor(Math.random() * _dBaseRots.length)];
  // Color effect: 30% πιθανότητα να ενεργοποιηθεί
  this.colorEffect = Math.random() < 0.3;
  // Morph: always active — cross-fades between sprite types (3 morphs per lifetime)
  if (true) {
    this._morphEnabled   = true;
    this._morphSprite    = spriteType;
    this._morphOldSprite = null;
    this._morphAlpha     = 1.0;
    this._morphState     = 'idle';
    this._morphTimer     = 2 + Math.random() * 3;
    this._morphList      = null; // built lazily in step()
    this._morphIdx       = 0;
    this._morphCount     = 0;
    this._morphMax       = 3;
  } else {
    this._morphEnabled = false;
  }
};

DivingEnemy.prototype = new Sprite();
DivingEnemy.prototype.type = OBJECT_ENEMY;

DivingEnemy.prototype.step = function(dt) {
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;
  this.t += dt;

  // Individual sway motion (±5° — subtle, not dramatic)
  this.swayAngle = Math.sin(this.t * this.swaySpeed + this.swayOffset) * (Math.PI / 36);

  // Trail: dense sampling (every 4px) — 35 points = long glowing aura
  var _tdx = this.x - (this._trailPx !== null ? this._trailPx : this.x);
  var _tdy = this.y - (this._trailPy !== null ? this._trailPy : this.y);
  if(this._trailPx === null || _tdx*_tdx + _tdy*_tdy >= 16) {
    this.trail.push({ x: this.x, y: this.y });
    if(this.trail.length > 35) this.trail.shift();
    this._trailPx = this.x; this._trailPy = this.y;
  }

  // Morph step: cross-fade to a different sprite every few seconds
  if (this._morphEnabled) {
    if (!this._morphList) {
      var _mp = _getMorphSpritePool();
      this._morphList = [];
      var _tries = 0;
      while (this._morphList.length < 4 && _tries < 60) {
        _tries++;
        var _cand = _mp[Math.floor(Math.random() * _mp.length)];
        if (_cand !== this.sprite && this._morphList.indexOf(_cand) < 0) this._morphList.push(_cand);
      }
    }
    if (this._morphState === 'idle') {
      this._morphTimer -= dt;
      if (this._morphTimer <= 0 && this._morphCount < this._morphMax) {
        this._morphOldSprite = this._morphSprite;
        this._morphSprite    = this._morphList[this._morphIdx % this._morphList.length];
        this._morphIdx++;
        this._morphCount++;
        this._morphAlpha = 0;
        this._morphState = 'crossfade';
      }
    } else {
      this._morphAlpha += 0.67 * dt;
      if (this._morphAlpha >= 1) {
        this._morphAlpha     = 1;
        this._morphOldSprite = null;
        this._morphState     = 'idle';
        this._morphTimer     = 3 + Math.random() * 4;
      }
    }
  }

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
      _spawnEnemyShot(this.board, this.x + this.w/2, this.y + this.h);
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
  var _zigLvlMult = _getDiffMult();
  this.speed = (60 + Math.random() * 30) * _zigLvlMult;
  this.acceleration = 8 + Math.random() * 5;
  this.zigFreq = 2.5 + Math.random() * 2.0;  // oscillation frequency
  this.zigAmp  = 55 + Math.random() * 45;    // oscillation width
  this.hasShot = false;
  this.hitFlash = 0;
  // Morph: always active — use level pool if set, else global alien pool (built lazily)
  this._morphEnabled   = true;
  this._morphSprite    = spriteType;
  this._morphOldSprite = null;
  this._morphAlpha     = 1.0;
  this._morphState     = 'idle';
  this._morphTimer     = 0.5 + Math.random() * 1.5;
  var _zmPool = currentLevelPool || null;
  this._morphList      = _zmPool || null; // null = built lazily in step()
  this._morphIdx       = Math.floor(Math.random() * 10);
  this._morphCount     = 0;
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
    _spawnEnemyShot(this.board, this.x + this.w/2, this.y + this.h);
  }

  // Collision with player
  var col = this.board.collide(this, OBJECT_PLAYER);
  if(col) { col.hit(8); this.board.remove(this); return; }

  if(this.y > Game.height + 60) this.board.remove(this);

  // Continuous morph step
  if (this._morphEnabled) {
    if (!this._morphList) {
      var _zmp = _getMorphSpritePool();
      this._morphList = [];
      var _ztries = 0;
      while (this._morphList.length < 4 && _ztries < 60) {
        _ztries++;
        var _zcand = _zmp[Math.floor(Math.random() * _zmp.length)];
        if (_zcand !== this.sprite && this._morphList.indexOf(_zcand) < 0) this._morphList.push(_zcand);
      }
    }
    if (this._morphState === 'idle') {
      this._morphTimer -= dt;
      if (this._morphTimer <= 0) {
        this._morphOldSprite = this._morphSprite;
        this._morphSprite    = this._morphList[this._morphIdx % this._morphList.length];
        this._morphIdx++;
        this._morphAlpha     = 0;
        this._morphState     = 'crossfade';
      }
    } else {
      this._morphAlpha += 0.67 * dt;
      if (this._morphAlpha >= 1) {
        this._morphAlpha     = 1;
        this._morphOldSprite = null;
        this._morphState     = 'idle';
        this._morphTimer     = 2.0;
      }
    }
  }
};

ZigZagEnemy.prototype.draw = function(ctx) {
  var _drawSpr   = (this._morphEnabled && this._morphSprite) ? this._morphSprite : this.sprite;
  var _morphAlph = this._morphEnabled ? this._morphAlpha : 1.0;
  var _morphOld  = this._morphEnabled ? this._morphOldSprite : null;

  if(this.hitFlash > 0) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = this.hitFlash * 0.6;
    SpriteSheet.draw(ctx, _drawSpr, this.x, this.y, this.frame, this.w, this.h);
    ctx.restore();
  }
  ctx.save();
  if (_morphOld) {
    var _zcx = this.x + this.w / 2, _zcy = this.y + this.h / 2;
    ctx.translate(_zcx, _zcy);
    var _zpop = 1.0 + 0.12 * Math.sin(_morphAlph * Math.PI);
    ctx.scale(_zpop, _zpop);
    ctx.translate(-_zcx, -_zcy);
    ctx.globalAlpha = 1 - _morphAlph;
    SpriteSheet.draw(ctx, _morphOld, this.x, this.y, this.frame, this.w, this.h);
    ctx.globalAlpha = _morphAlph;
    SpriteSheet.draw(ctx, _drawSpr, this.x, this.y, this.frame, this.w, this.h);
    ctx.globalAlpha = 1.0;
  } else {
    ctx.globalAlpha = _morphAlph;
    SpriteSheet.draw(ctx, _drawSpr, this.x, this.y, this.frame, this.w, this.h);
    ctx.globalAlpha = 1.0;
  }
  ctx.restore();
};

ZigZagEnemy.prototype.hit = function(damage) {
  this.hitFlash = 1.0;
  this.health -= (Game.pharaohActive&&this.type===OBJECT_ENEMY?damage*3:damage);
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      SoundManager.playEnemyDeath();
      var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
      earnPoints(this.board, ecx, this.y, this.points || 200, '#00FFEE');
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
  var _spiralLvlMult = _getDiffMult();
  this.speed = (80 + Math.random() * 40) * _spiralLvlMult;
  this.hasShot = false;
  this.hitFlash = 0;
  // Morph: always active — use level pool if set, else global alien pool (built lazily)
  this._morphEnabled   = true;
  this._morphSprite    = spriteType;
  this._morphOldSprite = null;
  this._morphAlpha     = 1.0;
  this._morphState     = 'idle';
  this._morphTimer     = 0.5 + Math.random() * 1.5;
  var _smPool = currentLevelPool || null;
  this._morphList      = _smPool || null; // null = built lazily in step()
  this._morphIdx       = Math.floor(Math.random() * 10);
  this._morphCount     = 0;
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
    _spawnEnemyShot(this.board, this.x + this.w/2, this.y + this.h);
  }

  var col = this.board.collide(this, OBJECT_PLAYER);
  if(col) { col.hit(10); this.board.remove(this); return; }

  if(this.y > Game.height + 80 || this.x < -100 || this.x > Game.width + 100) {
    this.board.remove(this);
  }

  // Continuous morph step
  if (this._morphEnabled) {
    if (!this._morphList) {
      var _smp = _getMorphSpritePool();
      this._morphList = [];
      var _stries = 0;
      while (this._morphList.length < 4 && _stries < 60) {
        _stries++;
        var _scand = _smp[Math.floor(Math.random() * _smp.length)];
        if (_scand !== this.sprite && this._morphList.indexOf(_scand) < 0) this._morphList.push(_scand);
      }
    }
    if (this._morphState === 'idle') {
      this._morphTimer -= dt;
      if (this._morphTimer <= 0) {
        this._morphOldSprite = this._morphSprite;
        this._morphSprite    = this._morphList[this._morphIdx % this._morphList.length];
        this._morphIdx++;
        this._morphAlpha     = 0;
        this._morphState     = 'crossfade';
      }
    } else {
      this._morphAlpha += 0.67 * dt;
      if (this._morphAlpha >= 1) {
        this._morphAlpha     = 1;
        this._morphOldSprite = null;
        this._morphState     = 'idle';
        this._morphTimer     = 2.0;
      }
    }
  }
};

SpiralEnemy.prototype.draw = function(ctx) {
  var _drawSpr   = (this._morphEnabled && this._morphSprite) ? this._morphSprite : this.sprite;
  var _morphAlph = this._morphEnabled ? this._morphAlpha : 1.0;
  var _morphOld  = this._morphEnabled ? this._morphOldSprite : null;

  if(this.hitFlash > 0) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = this.hitFlash * 0.6;
    SpriteSheet.draw(ctx, _drawSpr, this.x, this.y, this.frame, this.w, this.h);
    ctx.restore();
  }
  ctx.save();
  if (_morphOld) {
    var _scx = this.x + this.w / 2, _scy = this.y + this.h / 2;
    ctx.translate(_scx, _scy);
    var _spop = 1.0 + 0.12 * Math.sin(_morphAlph * Math.PI);
    ctx.scale(_spop, _spop);
    ctx.translate(-_scx, -_scy);
    ctx.globalAlpha = 1 - _morphAlph;
    SpriteSheet.draw(ctx, _morphOld, this.x, this.y, this.frame, this.w, this.h);
    ctx.globalAlpha = _morphAlph;
    SpriteSheet.draw(ctx, _drawSpr, this.x, this.y, this.frame, this.w, this.h);
    ctx.globalAlpha = 1.0;
  } else {
    ctx.globalAlpha = _morphAlph;
    SpriteSheet.draw(ctx, _drawSpr, this.x, this.y, this.frame, this.w, this.h);
    ctx.globalAlpha = 1.0;
  }
  ctx.restore();
};

SpiralEnemy.prototype.hit = function(damage) {
  this.hitFlash = 1.0;
  this.health -= (Game.pharaohActive&&this.type===OBJECT_ENEMY?damage*3:damage);
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      SoundManager.playExplosion();
      var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
      earnPoints(this.board, ecx, this.y, this.points || 400, '#00FF88');
      if(Math.random() < 0.2) this.board.add(new PowerUp(ecx, ecy));
    }
  } else {
    this.board.add(new MissileImpactSpark(this.x + this.w/2, this.y + this.h/2));
    SoundManager.playFastEnemyHit(); // E — Boss Death: fast spiral enemies
  }
};

DivingEnemy.prototype.hit = function(damage) {
  this.hitFlash = 1.0;
  this.health -= (Game.pharaohActive&&this.type===OBJECT_ENEMY?damage*3:damage);
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      SoundManager.playExplosion();
      var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
      earnPoints(this.board, ecx, this.y, this.points || 3000, '#FF8800', true);
      if(Math.random() < 0.2) {
        this.board.add(new PowerUp(ecx, ecy));
      }
    }
  } else {
    var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
    this.board.add(new MissileImpactSpark(ecx, ecy));
    SoundManager.playFastEnemyHit(); // E — Boss Death: fast diving enemies
  }
};

DivingEnemy.prototype.draw = function(ctx) {
  // Glowing trail: draws fading copies along the Z/P/snake attack path
  var _tLen = this.trail ? this.trail.length : 0;
  if(_tLen > 1) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for(var _ti = 0; _ti < _tLen; _ti++) {
      var _pt = this.trail[_ti];
      var _fade = (_ti / _tLen); // oldest=0 (invisible) → newest=1 (bright)
      ctx.globalAlpha = _fade * 0.50;
      SpriteSheet.draw(ctx, this.sprite, _pt.x, _pt.y, this.frame, this.w, this.h);
    }
    ctx.restore();
  }

  var _drawSpr   = (this._morphEnabled && this._morphSprite) ? this._morphSprite : this.sprite;
  var _morphAlph = this._morphEnabled ? this._morphAlpha : 1.0;
  var _morphOld  = (this._morphEnabled && this._morphOldSprite) ? this._morphOldSprite : null;

  ctx.save();
  var dCx = this.x + this.w / 2;
  var dCy = this.y + this.h / 2;

  // Combine base tilt + sway + banking rotation
  var totalRotation = (this.baseRotation || 0) + this.swayAngle + (this.bankAngle || 0);
  ctx.translate(dCx, dCy);
  ctx.rotate(totalRotation);
  // Scale pop during crossfade: bell-curve +9% at midpoint
  if (_morphOld) { var _pop = 1.0 + 0.12 * Math.sin(_morphAlph * Math.PI); ctx.scale(_pop, _pop); }
  ctx.translate(-dCx, -dCy);

  if (_morphOld) {
    ctx.globalAlpha = 1 - _morphAlph;
    SpriteSheet.draw(ctx, _morphOld, this.x, this.y, this.frame, this.w, this.h);
    ctx.globalAlpha = _morphAlph;
    SpriteSheet.draw(ctx, _drawSpr, this.x, this.y, this.frame, this.w, this.h);
  } else if(this.colorEffect) {
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.filter = 'hue-rotate(120deg) brightness(1.3)';
    SpriteSheet.draw(ctx, _drawSpr, this.x, this.y, this.frame, this.w, this.h);
    ctx.filter = 'none';
    ctx.restore();
  } else {
    SpriteSheet.draw(ctx, _drawSpr, this.x, this.y, this.frame, this.w, this.h);
  }
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
  this.setup(spriteType, { health: 10, points: 3000 });
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
  this._trailPx = null; this._trailPy = null; // distance-based trail sampling
  this.bankAngle = 0;
  this.rotation = 0;
  this.spinRotation = 0; // 360° spin during dive
  // Individual sway motion (slow and subtle)
  this.swayAngle = 0;
  this.swaySpeed = 0.6 + Math.random() * 0.4;
  this.swayOffset = Math.random() * Math.PI * 2;
  // Morph: always active — cross-fades between sprite types (3 morphs per lifetime)
  if (true) {
    this._morphEnabled   = true;
    this._morphSprite    = spriteType;
    this._morphOldSprite = null;
    this._morphAlpha     = 1.0;
    this._morphState     = 'idle';
    this._morphTimer     = 1.5 + Math.random() * 2.5;
    this._morphList      = null; // built lazily in step()
    this._morphIdx       = 0;
    this._morphCount     = 0;
    this._morphMax       = 3;
  } else {
    this._morphEnabled = false;
  }
};

KamikazeEnemy.prototype = new Sprite();
KamikazeEnemy.prototype.type = OBJECT_ENEMY;

KamikazeEnemy.prototype.step = function(dt) {
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;
  this.t += dt;

  // Individual sway motion (±5° — subtle)
  this.swayAngle = Math.sin(this.t * this.swaySpeed + this.swayOffset) * (Math.PI / 36);

  // Trail: dense sampling (every 4px) — 35 points = long glowing aura
  var _tkdx = this.x - (this._trailPx !== null ? this._trailPx : this.x);
  var _tkdy = this.y - (this._trailPy !== null ? this._trailPy : this.y);
  if(this._trailPx === null || _tkdx*_tkdx + _tkdy*_tkdy >= 16) {
    this.trail.push({ x: this.x, y: this.y });
    if(this.trail.length > 35) this.trail.shift();
    this._trailPx = this.x; this._trailPy = this.y;
  }

  // Morph step: cross-fade to a different sprite every few seconds
  if (this._morphEnabled) {
    if (!this._morphList) {
      var _kmp = _getMorphSpritePool();
      this._morphList = [];
      var _ktries = 0;
      while (this._morphList.length < 4 && _ktries < 60) {
        _ktries++;
        var _kcand = _kmp[Math.floor(Math.random() * _kmp.length)];
        if (_kcand !== this.sprite && this._morphList.indexOf(_kcand) < 0) this._morphList.push(_kcand);
      }
    }
    if (this._morphState === 'idle') {
      this._morphTimer -= dt;
      if (this._morphTimer <= 0 && this._morphCount < this._morphMax) {
        this._morphOldSprite = this._morphSprite;
        this._morphSprite    = this._morphList[this._morphIdx % this._morphList.length];
        this._morphIdx++;
        this._morphCount++;
        this._morphAlpha = 0;
        this._morphState = 'crossfade';
      }
    } else {
      this._morphAlpha += 0.67 * dt;
      if (this._morphAlpha >= 1) {
        this._morphAlpha     = 1;
        this._morphOldSprite = null;
        this._morphState     = 'idle';
        this._morphTimer     = 3 + Math.random() * 4;
      }
    }
  }

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
  this.health -= (Game.pharaohActive&&this.type===OBJECT_ENEMY?damage*3:damage);
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      SoundManager.playExplosion();
      var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
      earnPoints(this.board, ecx, this.y, this.points || 3000, '#FF2200', true);
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
  // Glowing trail: fading copies along kamikaze attack path
  var _tkLen = this.trail ? this.trail.length : 0;
  if(_tkLen > 1) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for(var _tki = 0; _tki < _tkLen; _tki++) {
      var _tpt = this.trail[_tki];
      var _tfade = (_tki / _tkLen);
      ctx.globalAlpha = _tfade * 0.50;
      SpriteSheet.draw(ctx, this.sprite, _tpt.x, _tpt.y, this.frame, this.w, this.h);
    }
    ctx.restore();
  }

  var _kdrawSpr  = (this._morphEnabled && this._morphSprite) ? this._morphSprite : this.sprite;
  var _kmorphAlph = this._morphEnabled ? this._morphAlpha : 1.0;
  var _kmorphOld  = (this._morphEnabled && this._morphOldSprite) ? this._morphOldSprite : null;

  ctx.save();
  var dCx = this.x + this.w / 2;
  var dCy = this.y + this.h / 2;

  // Combine sway + banking + rotation + 360° spin during dive
  var totalRotation = this.swayAngle + (this.bankAngle || 0) + (this.rotation || 0) + (this.spinRotation || 0);
  ctx.translate(dCx, dCy);
  ctx.rotate(totalRotation);
  // Scale pop during crossfade: bell-curve +9% at midpoint
  if (_kmorphOld) { var _kpop = 1.0 + 0.12 * Math.sin(_kmorphAlph * Math.PI); ctx.scale(_kpop, _kpop); }
  ctx.translate(-dCx, -dCy);

  if (_kmorphOld) {
    ctx.globalAlpha = 1 - _kmorphAlph;
    SpriteSheet.draw(ctx, _kmorphOld, this.x, this.y, this.frame, this.w, this.h);
    ctx.globalAlpha = _kmorphAlph;
    SpriteSheet.draw(ctx, _kdrawSpr, this.x, this.y, this.frame, this.w, this.h);
  } else {
    SpriteSheet.draw(ctx, _kdrawSpr, this.x, this.y, this.frame, this.w, this.h);
  }
  if(this.hitFlash > 0) {
    ctx.globalAlpha = Math.min(1, this.hitFlash) * 0.75;
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  ctx.restore();
};

// ===================================================================
// BOOMERANG ENEMY — dives toward player, exits bottom, re-enters from
// the opposite-X side at the top, dives again (shoots twice)
// ===================================================================
var BoomerangEnemy = function(spriteType, startX, startY) {
  this.setup(spriteType, { health: 15, points: 6000 });
  SoundManager.playAlienAttack();
  this.x = startX;
  this.y = startY;
  this.t = 0;
  this.phase = 0; // 0=first dive, 1=second dive from opposite side
  var _bLvlMult = _getDiffMult();
  this.speed = 150 * (Game.width / 320) * _bLvlMult;
  this.targetX = Game.width * 0.5;
  this.reentryX = Math.max(30, Math.min(Game.width - 30, Game.width - startX));
  this.hasShot1 = false;
  this.hasShot2 = false;
  this.trail = [];
  this._trailPx = null; this._trailPy = null;
  this.bankAngle = 0;
  this.swayAngle = 0;
  this.swaySpeed = 0.6 + Math.random() * 0.4;
  this.swayOffset = Math.random() * Math.PI * 2;
  var _bRots = [0, 0, Math.PI/6, -Math.PI/6, Math.PI/4, -Math.PI/4, Math.PI, Math.PI/3];
  this.baseRotation = _bRots[Math.floor(Math.random() * _bRots.length)];
  this.hitFlash = 0;
  _initEnemyMorph(this, spriteType);
};
BoomerangEnemy.prototype = new Sprite();
BoomerangEnemy.prototype.type = OBJECT_ENEMY;

BoomerangEnemy.prototype.step = function(dt) {
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;
  this.t += dt;
  this.swayAngle = Math.sin(this.t * this.swaySpeed + this.swayOffset) * (Math.PI / 36);

  // Dense trail sampling (every 4px) — 35 points = long glowing aura
  var _bmdx = this.x - (this._trailPx !== null ? this._trailPx : this.x);
  var _bmdy = this.y - (this._trailPy !== null ? this._trailPy : this.y);
  if(this._trailPx === null || _bmdx*_bmdx + _bmdy*_bmdy >= 16) {
    this.trail.push({ x: this.x, y: this.y });
    if(this.trail.length > 35) this.trail.shift();
    this._trailPx = this.x; this._trailPy = this.y;
  }

  if(this.phase === 0) {
    // Lock on player once at the start
    if(this.t < 0.12) {
      var _bpl = this.board.detect(function() { return this.type === OBJECT_PLAYER; });
      if(_bpl) this.targetX = _bpl.x + _bpl.w / 2;
    }
    this.y += this.speed * dt;
    this.x += (this.targetX - this.x) * 1.3 * dt;
    if(!this.hasShot1 && this.y > Game.height * 0.45) {
      this.hasShot1 = true;
      _spawnEnemyShot(this.board, this.x + this.w/2, this.y + this.h);
    }
    if(this.y > Game.height + 60) {
      // Teleport to opposite side at top — second pass
      this.phase = 1;
      this.x = this.reentryX;
      this.y = -60;
    }
  } else {
    // Second dive: aim at screen center
    this.y += this.speed * dt;
    this.x += (Game.width * 0.5 - this.x) * 1.0 * dt;
    if(!this.hasShot2 && this.y > Game.height * 0.35) {
      this.hasShot2 = true;
      _spawnEnemyShot(this.board, this.x + this.w/2, this.y + this.h);
    }
    if(this.y > Game.height + 60) { this.board.remove(this); return; }
  }

  var _bcol = this.board.collide(this, OBJECT_PLAYER);
  if(_bcol) { _bcol.hit(12); this.board.remove(this); return; }

  var _bpbx = this.x - (this._prevBX !== undefined ? this._prevBX : this.x);
  var _bpby = this.y - (this._prevBY !== undefined ? this._prevBY : this.y);
  this.bankAngle = this.bankAngle * 0.80 + (_bpbx * 0.10 + _bpby * 0.04) * 0.20;
  this._prevBX = this.x;
  this._prevBY = this.y;
  _stepEnemyMorph(this, dt);
};

// Reuse DivingEnemy visual style (trail + rotation)
BoomerangEnemy.prototype.draw = DivingEnemy.prototype.draw;
BoomerangEnemy.prototype.hit = DivingEnemy.prototype.hit;

// ===================================================================
// SWEEP ENEMY — crosses the screen diagonally (right→left or left→right)
// while slowly descending; shoots 2-3 times during the sweep
// ===================================================================
var SweepEnemy = function(spriteType, startX, startY) {
  this.setup(spriteType, { health: 10, points: 4000 });
  SoundManager.playAlienAttack();
  this.sweepDir = (startX < Game.width * 0.5) ? 1 : -1; // 1=L→R, -1=R→L
  this.x = this.sweepDir > 0 ? -this.w - 20 : Game.width + 20;
  this.y = startY || Game.height * 0.15;
  this.t = 0;
  var _lv = _getDiffMult();
  this.sweepSpeedX = (190 + Math.random() * 70) * _lv * this.sweepDir;
  this.sweepSpeedY = (35 + Math.random() * 20) * _lv;
  this.shotsFired = 0; this.maxShots = 2 + Math.floor(Math.random() * 2);
  this.shotCooldown = 0.4 + Math.random() * 0.3;
  this.hitFlash = 0;
  this.trail = []; this._trailPx = null; this._trailPy = null;
  this.bankAngle = 0; this.swayAngle = 0;
  this.swaySpeed = 0.6 + Math.random() * 0.4;
  this.swayOffset = Math.random() * Math.PI * 2;
  var _br = [0, 0, Math.PI/6, -Math.PI/6, Math.PI/4, -Math.PI/4];
  this.baseRotation = _br[Math.floor(Math.random() * _br.length)];
  // Color effect: 30% πιθανότητα να ενεργοποιηθεί
  this.colorEffect = Math.random() < 0.3;
  _initEnemyMorph(this, spriteType);
};
SweepEnemy.prototype = new Sprite();
SweepEnemy.prototype.type = OBJECT_ENEMY;
SweepEnemy.prototype.step = function(dt) {
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;
  this.t += dt;
  this.swayAngle = Math.sin(this.t * this.swaySpeed + this.swayOffset) * (Math.PI / 36);
  var _swdx = this.x - (this._trailPx !== null ? this._trailPx : this.x);
  var _swdy = this.y - (this._trailPy !== null ? this._trailPy : this.y);
  if(this._trailPx === null || _swdx*_swdx + _swdy*_swdy >= 16) {
    this.trail.push({ x: this.x, y: this.y });
    if(this.trail.length > 35) this.trail.shift();
    this._trailPx = this.x; this._trailPy = this.y;
  }
  this.x += this.sweepSpeedX * dt;
  this.y += this.sweepSpeedY * dt;
  if(this.shotsFired < this.maxShots) {
    this.shotCooldown -= dt;
    if(this.shotCooldown <= 0) {
      this.shotCooldown = 0.55 + Math.random() * 0.35;
      _spawnEnemyShot(this.board, this.x + this.w/2, this.y + this.h);
      this.shotsFired++;
    }
  }
  var _swcol = this.board.collide(this, OBJECT_PLAYER);
  if(_swcol) { _swcol.hit(10); this.board.remove(this); return; }
  var _swpbx = this.x - (this._prevBX !== undefined ? this._prevBX : this.x);
  this.bankAngle = this.bankAngle * 0.80 + _swpbx * 0.015;
  this._prevBX = this.x; this._prevBY = this.y;
  if(this.x > Game.width + 100 || this.x < -100 || this.y > Game.height + 80) this.board.remove(this);
  _stepEnemyMorph(this, dt);
};
SweepEnemy.prototype.draw = DivingEnemy.prototype.draw;
SweepEnemy.prototype.hit  = DivingEnemy.prototype.hit;

// ===================================================================
// SNAKE ENEMY — sinusoidal (S/zigzag) descent while tracking down
// ===================================================================
var SnakeEnemy = function(spriteType, startX, startY) {
  this.setup(spriteType, { health: 10, points: 3500 });
  SoundManager.playAlienAttack();
  this.x = startX;
  this.y = startY || -40;
  this.startX = startX;
  this.t = 0;
  var _lv = _getDiffMult();
  this.snakeSpeedY = (95 + Math.random() * 45) * _lv;
  this.snakeFreq   = 2.2 + Math.random() * 1.8;
  this.snakeAmp    = Math.min(Game.width * 0.22, 75 + Math.random() * 65);
  this.hasShot1 = false; this.hasShot2 = false;
  this.hitFlash = 0;
  this.trail = []; this._trailPx = null; this._trailPy = null;
  this.bankAngle = 0; this.swayAngle = 0;
  this.swaySpeed = 0.6 + Math.random() * 0.4;
  this.swayOffset = Math.random() * Math.PI * 2;
  var _br = [0, 0, Math.PI/6, -Math.PI/6, Math.PI/4, -Math.PI/4, Math.PI];
  this.baseRotation = _br[Math.floor(Math.random() * _br.length)];
  // Color effect: 30% πιθανότητα να ενεργοποιηθεί
  this.colorEffect = Math.random() < 0.3;
  _initEnemyMorph(this, spriteType);
};
SnakeEnemy.prototype = new Sprite();
SnakeEnemy.prototype.type = OBJECT_ENEMY;
SnakeEnemy.prototype.step = function(dt) {
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;
  this.t += dt;
  this.swayAngle = Math.sin(this.t * this.swaySpeed + this.swayOffset) * (Math.PI / 36);
  var _sndx = this.x - (this._trailPx !== null ? this._trailPx : this.x);
  var _sndy = this.y - (this._trailPy !== null ? this._trailPy : this.y);
  if(this._trailPx === null || _sndx*_sndx + _sndy*_sndy >= 16) {
    this.trail.push({ x: this.x, y: this.y });
    if(this.trail.length > 35) this.trail.shift();
    this._trailPx = this.x; this._trailPy = this.y;
  }
  // Sinusoidal X, steady Y descent
  this.y += this.snakeSpeedY * dt;
  this.x  = this.startX + Math.sin(this.t * this.snakeFreq) * this.snakeAmp;
  if(!this.hasShot1 && this.y > Game.height * 0.30) {
    this.hasShot1 = true;
    _spawnEnemyShot(this.board, this.x + this.w/2, this.y + this.h);
  }
  if(!this.hasShot2 && this.y > Game.height * 0.58) {
    this.hasShot2 = true;
    _spawnEnemyShot(this.board, this.x + this.w/2, this.y + this.h);
  }
  var _sncol = this.board.collide(this, OBJECT_PLAYER);
  if(_sncol) { _sncol.hit(10); this.board.remove(this); return; }
  var _snpbx = this.x - (this._prevBX !== undefined ? this._prevBX : this.x);
  this.bankAngle = this.bankAngle * 0.80 + _snpbx * 0.015;
  this._prevBX = this.x; this._prevBY = this.y;
  if(this.y > Game.height + 80) this.board.remove(this);
  _stepEnemyMorph(this, dt);
};
SnakeEnemy.prototype.draw = DivingEnemy.prototype.draw;
SnakeEnemy.prototype.hit  = DivingEnemy.prototype.hit;

// ===================================================================
// RETURN ENEMY — dives toward player, pulls back up, dives again faster
// ===================================================================
var ReturnEnemy = function(spriteType, startX, startY) {
  this.setup(spriteType, { health: 12, points: 5000 });
  SoundManager.playAlienAttack();
  this.x = startX; this.y = startY;
  this.t = 0;
  this.phase = 0; // 0=first dive, 1=pull up, 2=second dive
  var _lv = _getDiffMult();
  this.speed = 140 * (Game.width / 320) * _lv;
  this.targetX = Game.width * 0.5;
  this.pullUpTargetY = (startY || 0) + this.h; // return to near starting Y
  this.hasShot1 = false; this.hasShot2 = false;
  this.hitFlash = 0;
  this.trail = []; this._trailPx = null; this._trailPy = null;
  this.bankAngle = 0; this.swayAngle = 0;
  this.swaySpeed = 0.6 + Math.random() * 0.4;
  this.swayOffset = Math.random() * Math.PI * 2;
  var _br = [0, 0, Math.PI/6, -Math.PI/6, Math.PI/4, Math.PI];
  this.baseRotation = _br[Math.floor(Math.random() * _br.length)];
  _initEnemyMorph(this, spriteType);
};
ReturnEnemy.prototype = new Sprite();
ReturnEnemy.prototype.type = OBJECT_ENEMY;
ReturnEnemy.prototype.step = function(dt) {
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;
  this.t += dt;
  this.swayAngle = Math.sin(this.t * this.swaySpeed + this.swayOffset) * (Math.PI / 36);
  var _redx = this.x - (this._trailPx !== null ? this._trailPx : this.x);
  var _redy = this.y - (this._trailPy !== null ? this._trailPy : this.y);
  if(this._trailPx === null || _redx*_redx + _redy*_redy >= 16) {
    this.trail.push({ x: this.x, y: this.y });
    if(this.trail.length > 35) this.trail.shift();
    this._trailPx = this.x; this._trailPy = this.y;
  }
  if(this.phase === 0) {
    if(this.t < 0.12) {
      var _rpl = this.board.detect(function() { return this.type === OBJECT_PLAYER; });
      if(_rpl) this.targetX = _rpl.x + _rpl.w / 2;
    }
    this.y += this.speed * dt;
    this.x += (this.targetX - this.x) * 1.5 * dt;
    if(!this.hasShot1 && this.y > Game.height * 0.40) {
      this.hasShot1 = true;
      _spawnEnemyShot(this.board, this.x + this.w/2, this.y + this.h);
    }
    if(this.y > Game.height * 0.62) { this.phase = 1; }
  } else if(this.phase === 1) {
    this.y -= this.speed * 1.2 * dt;
    this.x += (Game.width * 0.5 - this.x) * 0.5 * dt;
    if(this.y <= this.pullUpTargetY || this.y < Game.height * 0.18) { this.phase = 2; }
  } else {
    this.y += this.speed * 1.5 * dt; // faster second pass
    if(!this.hasShot2 && this.y > Game.height * 0.38) {
      this.hasShot2 = true;
      _spawnEnemyShot(this.board, this.x + this.w/2, this.y + this.h);
    }
    if(this.y > Game.height + 80) { this.board.remove(this); return; }
  }
  var _recol = this.board.collide(this, OBJECT_PLAYER);
  if(_recol) { _recol.hit(12); this.board.remove(this); return; }
  var _repbx = this.x - (this._prevBX !== undefined ? this._prevBX : this.x);
  var _repby = this.y - (this._prevBY !== undefined ? this._prevBY : this.y);
  this.bankAngle = this.bankAngle * 0.80 + (_repbx * 0.10 + _repby * 0.04) * 0.20;
  this._prevBX = this.x; this._prevBY = this.y;
  _stepEnemyMorph(this, dt);
};
ReturnEnemy.prototype.draw = DivingEnemy.prototype.draw;
ReturnEnemy.prototype.hit  = DivingEnemy.prototype.hit;

// ===================================================================
// POWER-UP SYSTEM (falling balls with letters)
// ===================================================================
var POWERUP_TYPES = [
  // sprite = falling coin pickup; icon = HUD/notification weapon illustration
  { letter: 'S',  color: '#00FF00', name: 'Speed Boost',       sprite: 'nea_coin_01', icon: 'icon_s'  },
  { letter: 'W',  color: '#00AAFF', name: 'Wingmen',           sprite: 'nea_coin_02', icon: 'icon_w'  },
  { letter: 'P',  color: '#FF4400', name: 'Power Shot',        sprite: 'nea_coin_03', icon: 'icon_p'  },
  { letter: 'L',  color: '#FF00FF', name: 'Extra Life',        sprite: 'nea_coin_04', icon: 'icon_l'  },
  { letter: 'B',  color: '#FFFF00', name: 'Bomb',              sprite: 'nea_coin_05', icon: 'icon_b'  },
  { letter: 'R',  color: '#FF8800', name: 'Rapid Fire',        sprite: 'nea_coin_06', icon: 'icon_r'  },
  { letter: 'X',  color: '#00FFFF', name: 'Triple Shot',       sprite: 'nea_coin_07', icon: 'icon_x'  },
  { letter: 'I',  color: '#AAEEFF', name: 'Invincible Shield', sprite: 'nea_coin_08', icon: 'icon_i'  },
  { letter: 'T',  color: '#AA00FF', name: 'Time Slow',         sprite: 'nea_coin_09', icon: 'icon_t'  },
  { letter: 'M',  color: '#FFCC00', name: 'Magnet',            sprite: 'nea_coin_10', icon: 'icon_m'  },
  { letter: 'G',  color: '#FF0044', name: 'Giant Laser',       sprite: 'nea_coin_11', icon: 'icon_g'  },
  { letter: 'AP', color: '#FF6600', name: 'Homing Missiles',   sprite: 'nea_coin_12', icon: 'icon_ap' },
  { letter: 'AZ', color: '#FFD700', name: 'Sun Burst',         sprite: 'nea_coin_13', icon: 'icon_az' },
  { letter: 'CE', color: '#00FF88', name: 'Reflect Shield',    sprite: 'nea_coin_14', icon: 'icon_ce' },
  { letter: 'CK', color: '#FF8844', name: 'Tomahawk',          sprite: 'nea_coin_15', icon: 'icon_ck' },
  { letter: 'CH', color: '#FF2200', name: 'Dragon Fire',       sprite: 'nea_coin_16', icon: 'icon_ch' },
  { letter: 'EG', color: '#FFAA00', name: "Pharaoh's Curse",   sprite: 'nea_coin_17', icon: 'icon_eg' },
  { letter: 'ET', color: '#44FF44', name: 'Heal',              sprite: 'nea_coin_18', icon: 'icon_et' },
  { letter: 'GR', color: '#88CCFF', name: 'Zeus Lightning',    sprite: 'nea_coin_19', icon: 'icon_gr' },
  { letter: 'IN', color: '#FFD700', name: 'Gold Rush',         sprite: 'nea_coin_20', icon: 'icon_in' },
  { letter: 'JP', color: '#FFFFFF', name: 'Bullet Clear',      sprite: 'nea_coin_21', icon: 'icon_jp' },
  { letter: 'MA', color: '#FF4488', name: 'Piercing Spear',    sprite: 'nea_coin_22', icon: 'icon_ma' },
  { letter: 'MY', color: '#AAFFFF', name: 'Star Burst',        sprite: 'nea_coin_23', icon: 'icon_my' },
  { letter: 'MO', color: '#FFBB00', name: 'Twin Arrows',       sprite: 'nea_coin_24', icon: 'icon_mo' },
  { letter: 'PE', color: '#FF4400', name: 'Fire Trail',        sprite: 'nea_coin_25', icon: 'icon_pe' },
  { letter: 'RO', color: '#CC4400', name: 'Legion',            sprite: 'nea_coin_26', icon: 'icon_ro' },
  { letter: 'SI', color: '#AADDFF', name: 'Ghost Walk',        sprite: 'nea_coin_27', icon: 'icon_si' },
  { letter: 'TA', color: '#FF0000', name: 'Berserker',         sprite: 'nea_coin_28', icon: 'icon_ta' },
  { letter: 'TO', color: '#CC44FF', name: 'Spiral Shot',       sprite: 'nea_coin_29', icon: 'icon_to' },
  { letter: 'VI', color: '#4488FF', name: 'Axe Storm',         sprite: 'nea_coin_30', icon: 'icon_vi' },
  { letter: 'ZU', color: '#44FFAA', name: 'War Shield',        sprite: 'nea_coin_31', icon: 'icon_zu' }
];

// Letters that use the shot-queue system (only one active at a time)
var _QUEUABLE_POWERS = ['S','P','R','X','T','M','AP','MY','MO','PE','CH','EG','IN','SI','TA','TO','VI'];
// Maps each queuable letter → its primary shot-counter property name
var _POWER_TIMER_PROP = {
  'S':  'speedBoostTimer',  'P':  'powerShotTimer',   'R':  'rapidFireTimer',
  'X':  'tripleShotTimer',  'T':  'timeSlowTimer',     'M':  'magnetTimer',
  'AP': 'homingTimer',      'MY': 'starBurstTimer',    'MO': 'twinArrowTimer',
  'PE': 'fireTrailTimer',   'CH': 'dragonTimer',       'EG': 'pharaohTimer',
  'IN': 'goldRushTimer',    'SI': 'ghostTimer',        'TA': 'berserkerTimer',
  'TO': 'spiralTimer',      'VI': 'axeStormTimer'
};

// ─── STAGE CODE SYSTEM ─────────────────────────────────────────────────────────
// 5-char base-36 code (4 data + 1 checksum) encodes: stage, active weapon, queue len, wingmen count
var _SC_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function _genStageCode(stage, activePowerIdx, queueLen, wingmenCount) {
  // Pack 18 bits: stage(7) | activePower(5) | queueLen(3) | wingmen(3)
  var n = ((Math.min(stage, 128) - 1) & 127)
        | ((Math.min(activePowerIdx, 31) & 31) << 7)
        | ((Math.min(queueLen, 7) & 7) << 12)
        | ((Math.min(wingmenCount, 7) & 7) << 15);
  var code = '', tmp = n;
  for(var i = 0; i < 4; i++) { code += _SC_CHARS[tmp % 36]; tmp = Math.floor(tmp / 36); }
  var sum = 0;
  for(var j = 0; j < 4; j++) sum += _SC_CHARS.indexOf(code[j]);
  code += _SC_CHARS[sum % 36];
  return code;
}

function _decodeStageCode(raw) {
  var code = (raw || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
  if(code.length !== 5) return null;
  var sum = 0;
  for(var i = 0; i < 4; i++) {
    var ci = _SC_CHARS.indexOf(code[i]);
    if(ci < 0) return null;
    sum += ci;
  }
  if(_SC_CHARS[sum % 36] !== code[4]) return null;
  var n = 0;
  for(var k = 3; k >= 0; k--) n = n * 36 + _SC_CHARS.indexOf(code[k]);
  return {
    stage:          (n & 127) + 1,
    activePowerIdx: (n >> 7) & 31,
    queueLen:       (n >> 12) & 7,
    wingmenCount:   (n >> 15) & 7
  };
}

function _buildSavedPowerUpsFromCode(decoded) {
  var sp = {
    speedBoostTimer:0, powerShotTimer:0, rapidFireTimer:0, tripleShotTimer:0,
    timeSlowTimer:0, magnetTimer:0, homingTimer:0, reflectShield:0, dragonTimer:0,
    pharaohTimer:0, goldRushTimer:0, starBurstTimer:0, twinArrowTimer:0,
    fireTrailTimer:0, ghostTimer:0, berserkerTimer:0, spiralTimer:0, axeStormTimer:0,
    warShield:0, wingmanLeftTimer:0, wingmanRightTimer:0, wingmanLeft2Timer:0,
    wingmanRight2Timer:0, activePowerType:null, powerUpQueue:[]
  };
  if(decoded.activePowerIdx > 0 && decoded.activePowerIdx <= POWERUP_TYPES.length) {
    var apt = POWERUP_TYPES[decoded.activePowerIdx - 1];
    sp.activePowerType = apt;
    var tp = _POWER_TIMER_PROP[apt.letter];
    if(tp) sp[tp] = 150;  // generous 150 shots
    if(apt.letter === 'CE') sp.reflectShield = 5;
    if(apt.letter === 'ZU') sp.warShield = 5;
    // Fill queue with same weapon type
    for(var q = 0; q < decoded.queueLen; q++) sp.powerUpQueue.push(apt);
  }
  if(decoded.wingmenCount >= 1) sp.wingmanLeftTimer  = 1;
  if(decoded.wingmenCount >= 2) sp.wingmanRightTimer = 1;
  if(decoded.wingmenCount >= 3) sp.wingmanLeft2Timer = 1;
  if(decoded.wingmenCount >= 4) sp.wingmanRight2Timer = 1;
  return sp;
}

// localStorage save / load
var _LS_KEY = 'alieninvasion_save_v1';

function _saveProgressToStorage() {
  try {
    var wingCount = 0, activeIdx = 0, qLen = 0;
    if(playerShip) {
      if(playerShip.wingmanLeft)   wingCount++;
      if(playerShip.wingmanRight)  wingCount++;
      if(playerShip.wingmanLeft2)  wingCount++;
      if(playerShip.wingmanRight2) wingCount++;
      if(playerShip._activePowerType) {
        var ai = POWERUP_TYPES.indexOf(playerShip._activePowerType);
        if(ai >= 0) activeIdx = ai + 1;
      }
      qLen = playerShip._powerUpQueue ? playerShip._powerUpQueue.length : 0;
    } else if(_savedPowerUps) {
      wingCount = (_savedPowerUps.wingmanLeftTimer  > 0 ? 1 : 0)
               + (_savedPowerUps.wingmanRightTimer > 0 ? 1 : 0)
               + (_savedPowerUps.wingmanLeft2Timer > 0 ? 1 : 0)
               + (_savedPowerUps.wingmanRight2Timer > 0 ? 1 : 0);
      if(_savedPowerUps.activePowerType) {
        var ai2 = POWERUP_TYPES.indexOf(_savedPowerUps.activePowerType);
        if(ai2 >= 0) activeIdx = ai2 + 1;
      }
      qLen = _savedPowerUps.powerUpQueue ? _savedPowerUps.powerUpQueue.length : 0;
    }
    var code = _genStageCode(currentLevel, activeIdx, qLen, wingCount);
    localStorage.setItem(_LS_KEY, JSON.stringify({
      stage: currentLevel, code: code,
      activeIdx: activeIdx, queueLen: qLen, wingmen: wingCount, ts: Date.now()
    }));
  } catch(e) {}
}

function _loadProgressFromStorage() {
  try { var r = localStorage.getItem(_LS_KEY); return r ? JSON.parse(r) : null; }
  catch(e) { return null; }
}

function _clearProgressFromStorage() {
  try { localStorage.removeItem(_LS_KEY); } catch(e) {}
}
// ────────────────────────────────────────────────────────────────────────────────

var PowerUp = function(x, y) {
  // Weighted random selection happens first so we know the type
  var _pw = [1,1,1,3,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1];
  var _pt = 0; for(var _i=0;_i<_pw.length;_i++) _pt += _pw[_i];
  var _r = Math.random() * _pt, _idx = 0;
  while(_r > 0) { _r -= _pw[_idx]; if(_r > 0) _idx++; }
  this.powerType = POWERUP_TYPES[_idx];
  this.w = 87;  // all coins same size, 10% larger than original 79
  this.h = 87;
  this.x = x - this.w / 2;
  this.y = y;
  this.vy = 60;
  this.t = 0;
  // Weighted random: 'L' (Extra Life, index 3) is 3× more likely than others
  // weights: [1,1,1,3,1,1,1,1,1,1,1] → total 13
  var _pw = [1,1,1,3,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1];
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
  var f = Math.sin(this.t * 24); // fast flash ~3.8 Hz
  ctx.globalAlpha = 0.28 + 0.72 * Math.abs(f);
  if(f > 0) { ctx.shadowColor = this.powerType.color; ctx.shadowBlur = 32 * f; }
  // Scale pulse only — no rotation
  var _scale = 1.0 + 0.07 * Math.sin(this.t * 20);
  var _pw = this.w * _scale;
  var _ph = this.h * _scale;
  var _cx = this.x + this.w / 2;
  var _cy = this.y + this.h / 2;
  SpriteSheet.draw(ctx, this.powerType.sprite, _cx - _pw / 2, _cy - _ph / 2, 0, _pw, _ph);
  ctx.restore();
};

// ===================================================================
// DRAKI COIN PICKUP — falling collectible that queues the Topia bonus stage
// Appears once per level (via DrakiCoinSpawner). When caught → topia fires.
// ===================================================================
var _drakiCoinSprites = ['draki_coin_1', 'draki_coin_2', 'draki_coin_3'];
var DrakiCoinPickup = function(x) {
  this.sprite = _drakiCoinSprites[Math.floor(Math.random() * _drakiCoinSprites.length)];
  this.w = 88; this.h = 88;
  this.x = x - this.w / 2;
  this.y = -this.h;
  this.vy = 55 + Math.random() * 20; // 55-75 px/s — slow drift down
  this.t = 0;
  this.isDrakiCoin = true;
};
DrakiCoinPickup.prototype.type = OBJECT_POWERUP;
DrakiCoinPickup.prototype.step = function(dt) {
  this.t += dt;
  if(playerShip && playerShip.magnetTimer > 0) {
    var pcx = playerShip.x + playerShip.w/2, pcy = playerShip.y + playerShip.h/2;
    var mcx = this.x + this.w/2,            mcy = this.y + this.h/2;
    var dx = pcx - mcx, dy = pcy - mcy;
    var dist = Math.sqrt(dx*dx + dy*dy) || 1;
    this.x += (dx/dist)*200*dt; this.y += (dy/dist)*200*dt;
  } else {
    this.y += this.vy * dt;
    this.x += Math.sin(this.t * 1.4) * 28 * dt; // gentle side sway
  }
  if(this.y > Game.height + 60) this.board.remove(this);
};
DrakiCoinPickup.prototype.draw = function(ctx) {
  ctx.save();
  // Fast golden flash — same feel as other coins but golden glow
  var f = Math.sin(this.t * 24);
  ctx.globalAlpha = 0.28 + 0.72 * Math.abs(f);
  if(f > 0) { ctx.shadowColor = '#FFD700'; ctx.shadowBlur = 38 * f; }
  var cx = this.x + this.w/2, cy = this.y + this.h/2;
  ctx.translate(cx, cy);
  ctx.rotate(this.t * 2.2);
  ctx.translate(-cx, -cy);
  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, 0, this.w, this.h);
  ctx.restore();
};

// Spawns one DrakiCoinPickup every 2 stages, near the end of the stage (32-40s)
var DrakiCoinSpawner = function() {
  this.x = 0; this.y = 0; this.w = 1; this.h = 1;
  // Only active on even-numbered stage counts (2nd, 4th, 6th…)
  this._active = (_drakiStageCount % 2 === 0);
  this._timer = 32 + Math.random() * 8; // 32-40s — near the end of the stage
  this._spawned = false;
};
DrakiCoinSpawner.prototype.step = function(dt) {
  if(this._spawned || !this._active) return;
  if(_topiaExtraBonusQueued) { this._spawned = true; return; } // already queued — skip
  this._timer -= dt;
  if(this._timer <= 0) {
    this._spawned = true;
    var px = Game.width * (0.15 + Math.random() * 0.70);
    this.board.add(new DrakiCoinPickup(px));
  }
};
DrakiCoinSpawner.prototype.draw = function() {};

// ===================================================================
// FRUIT BONUS — falls once per stage, gives 1000/2000/3000 pts (red flash)
// ===================================================================
var _fruitSpriteList = [
  'fruit_1','fruit_2','fruit_3','fruit_4','fruit_5','fruit_6','fruit_7',
  'fruit_8','fruit_9','fruit_10','fruit_11','fruit_12','fruit_13','fruit_14'
];
var FruitBonus = function(x, spriteKey, pts) {
  this.sprite = spriteKey;
  this.w = 80; this.h = 80;
  this.x = x - this.w / 2;
  this.y = -this.h;
  this.vy = 52 + Math.random() * 18; // 52-70 px/s
  this.t = 0;
  this.pts = pts;
  this.isFruit = true;
};
FruitBonus.prototype.type = OBJECT_POWERUP;
FruitBonus.prototype.step = function(dt) {
  this.t += dt;
  if(playerShip && playerShip.magnetTimer > 0) {
    var pcx = playerShip.x + playerShip.w/2, pcy = playerShip.y + playerShip.h/2;
    var mcx = this.x + this.w/2,            mcy = this.y + this.h/2;
    var dx = pcx - mcx, dy = pcy - mcy;
    var dist = Math.sqrt(dx*dx + dy*dy) || 1;
    this.x += (dx/dist)*200*dt; this.y += (dy/dist)*200*dt;
  } else {
    this.y += this.vy * dt;
    this.x += Math.sin(this.t * 1.1) * 22 * dt; // gentle sway
  }
  if(this.y > Game.height + 60) this.board.remove(this);
};
FruitBonus.prototype.draw = function(ctx) {
  ctx.save();
  var f = Math.sin(this.t * 18); // pulsing glow
  ctx.globalAlpha = 0.35 + 0.65 * Math.abs(f);
  if(f > 0) { ctx.shadowColor = '#FF3300'; ctx.shadowBlur = 30 * f; }
  var sc = 1.0 + 0.09 * Math.sin(this.t * 14);
  var pw = this.w * sc, ph = this.h * sc;
  SpriteSheet.draw(ctx, this.sprite, this.x + (this.w - pw)/2, this.y + (this.h - ph)/2, 0, pw, ph);
  ctx.restore();
};

// Spawns one FruitBonus per stage at a random time (15-35s into the level)
var FruitBonusSpawner = function() {
  this.x = 0; this.y = 0; this.w = 1; this.h = 1;
  this._timer = 15 + Math.random() * 20; // 15-35s
  this._spawned = false;
  var _idx = ((currentLevel || 1) - 1) % _fruitSpriteList.length;
  this._sprite = _fruitSpriteList[_idx];
  var _ptsChoices = [1000, 2000, 3000];
  this._pts = _ptsChoices[Math.floor(Math.random() * _ptsChoices.length)];
};
FruitBonusSpawner.prototype.step = function(dt) {
  if(this._spawned) return;
  this._timer -= dt;
  if(this._timer <= 0) {
    this._spawned = true;
    var px = Game.width * (0.15 + Math.random() * 0.70);
    this.board.add(new FruitBonus(px, this._sprite, this._pts));
  }
};
FruitBonusSpawner.prototype.draw = function() {};

// ===================================================================
// WINGMAN SHIPS (escort ships that shoot with player)
// ===================================================================
var WingmanShip = function(player, side) {
  this.setup(player.sprite, { health: 1, points: 0 });
  this.player = player;
  this.side = side; // -1 = left, 1 = right
  this.scale = 0.6; // Draw smaller (must be set before offsetY calc)
  this.w = player.w;
  this.h = player.h;
  this.offsetX = side * 55;
  // Align wingman bottom edge with player bottom edge (accounts for scaled ship height)
  this.offsetY = player.h * (1 - this.scale);
  this.x = player.x + this.offsetX;
  this.y = player.y + this.offsetY;
  this.reload = 0;
  this.reloadTime = 0.35;
};

WingmanShip.prototype = new Sprite();
WingmanShip.prototype.type = OBJECT_PLAYER;

WingmanShip.prototype.step = function(dt) {
  // No timer — wingmen stay until destroyed by enemy fire

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
  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame, drawW, drawH);
  ctx.restore();
};

WingmanShip.prototype.hit = function(damage) {
  if(this.board.remove(this)) {
    if(this.side === -1 && this.player) this.player.wingmanLeft = null;
    if(this.side === 1 && this.player) this.player.wingmanRight = null;
    if(this.side === -2.2 && this.player) this.player.wingmanLeft2 = null;
    if(this.side === 2.2 && this.player) this.player.wingmanRight2 = null;
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
  this.health -= (Game.pharaohActive&&this.type===OBJECT_ENEMY?damage*3:damage);
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      SoundManager.playBonusShip();
      var bcx = this.x + this.w/2;
      this.board.add(new Explosion(bcx, this.y + this.h/2));
      earnPoints(this.board, bcx, this.y, this.points || 1000, '#FFEE00');
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
  this._trail = []; this._trailPx = null; this._trailPy = null; // speed trail
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
  _initEnemyMorph(this, spr);
};

AlienHeadEnemy.prototype = new Sprite();
AlienHeadEnemy.prototype.type = OBJECT_ENEMY;

AlienHeadEnemy.prototype.step = function(dt) {
  this.t += dt;
  if(this.hitFlash > 0) this.hitFlash -= dt * 3;

  // Speed trail — distance-based, same as DivingEnemy/KamikazeEnemy
  var _atdx = this.x - (this._trailPx !== null ? this._trailPx : this.x);
  var _atdy = this.y - (this._trailPy !== null ? this._trailPy : this.y);
  if(this._trailPx === null || _atdx*_atdx + _atdy*_atdy >= 144) {
    this._trail.push({ x: this.x, y: this.y });
    if(this._trail.length > 6) this._trail.shift();
    this._trailPx = this.x; this._trailPy = this.y;
  }

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
        if(this.y > -10) _spawnEnemyShot(this.board, this.x + this.w/2, this.y + this.h);
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
      _spawnEnemyShot(this.board, this.x + this.w/2, this.y + this.h);
    }
  }

  // Player collision
  var player = this.board.collide(this, OBJECT_PLAYER);
  if(player) {
    player.hit(1);
    var ecx = this.x + this.w/2;
    this.board.add(new Explosion(ecx, this.y + this.h/2));
    earnPoints(this.board, ecx, this.y, this.points || 500, '#CC44FF');
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
  _stepEnemyMorph(this, dt);
};

AlienHeadEnemy.prototype.hit = function(damage) {
  this.health -= (Game.pharaohActive&&this.type===OBJECT_ENEMY?damage*3:damage);
  this.hitFlash = 1.0;
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      var ecx = this.x + this.w/2;
      var ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
      earnPoints(this.board, ecx, this.y, this.points || 500, '#CC44FF');
      if(Math.random() < 0.25) this.board.add(new PowerUp(ecx, ecy));
    }
  }
};

AlienHeadEnemy.prototype.draw = function(ctx) {
  var _ahDrawSpr  = (this._morphEnabled && this._morphSprite) ? this._morphSprite : this.sprite;
  var _ahMorphAlph = this._morphEnabled ? this._morphAlpha : 1.0;
  var _ahMorphOld  = (this._morphEnabled && this._morphOldSprite) ? this._morphOldSprite : null;

  ctx.save();
  // Rock ±30° (π/6 rad) around the sprite center
  var rcx = this.x + this.w / 2, rcy = this.y + this.h / 2;
  ctx.translate(rcx, rcy);
  ctx.rotate(Math.sin(this.t * 3) * Math.PI / 6);
  // Scale pop during crossfade
  if (_ahMorphOld) { var _ahpop = 1.0 + 0.12 * Math.sin(_ahMorphAlph * Math.PI); ctx.scale(_ahpop, _ahpop); }
  ctx.translate(-rcx, -rcy);
  if(this.hitFlash > 0) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = this.hitFlash * 0.65;
    SpriteSheet.draw(ctx, _ahDrawSpr, this.x, this.y, 0, this.w, this.h);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }
  if (_ahMorphOld) {
    ctx.globalAlpha = 1 - _ahMorphAlph;
    SpriteSheet.draw(ctx, _ahMorphOld, this.x, this.y, 0, this.w, this.h);
    ctx.globalAlpha = _ahMorphAlph;
    SpriteSheet.draw(ctx, _ahDrawSpr, this.x, this.y, 0, this.w, this.h);
    ctx.globalAlpha = 1.0;
  } else {
    SpriteSheet.draw(ctx, _ahDrawSpr, this.x, this.y, 0, this.w, this.h);
  }
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
    earnPoints(this.board, ecx, this.y, this.points || 1000, '#FFAA00');
    if(this.parentStage) this.parentStage.bonusKills++;
    this.board.remove(this);
    return;
  }

  if(this.y > Game.height + 100) this.board.remove(this);
};

BonusAlienHead.prototype.hit = function(damage) {
  this.health -= (Game.pharaohActive&&this.type===OBJECT_ENEMY?damage*3:damage);
  this.hitFlash = 1.0;
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      var ecx = this.x + this.w/2;
      var ecy = this.y + this.h/2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, BONUS_HEAD_SIZE));
      earnPoints(this.board, ecx, this.y, this.points || 1000, '#FFAA00');
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

// ===================================================================
// FLOWER BURST ENEMY — emerges from a flower at bottom, flies UP, then dives at player
// ===================================================================
// Spawn points picked with flower_picker.html — 4 flowers, one per wave
var BONUS_FLOWER_POS = [
  { x: 0.594, y: 0.49  },  // wave 1 — formation: line_drop
  { x: 0.091, y: 0.556 },  // wave 2 — formation: spiral
  { x: 0.362, y: 0.552 },  // wave 3 — formation: zigzag
  { x: 0.978, y: 0.535 }   // wave 4 — formation: fan
];

// Μόνο πεταλούδες και μέλισσες στα λουλούδια (καταρχήν)
var BONUS_FLOWER_ALIEN_POOL = [
  'butterfly_1','butterfly_2','butterfly_3','butterfly_4',
  'butterfly_5','butterfly_6','butterfly_7','butterfly_8',
  'bee_s_1','bee_s_2','bee_s_3','bee_s_4','bee_s_5',
  'bee_s_6','bee_s_7','bee_s_8','bee_s_9','bee_s_10'
];

// One formation per wave, in order
var _BONUS_FORMATIONS = ['line_drop', 'spiral', 'zigzag', 'fan'];

// FlowerBurstEnemy — εκρηκτική ανάβαση → καθυστέρηση ψηλά → κινήσεις formation
// Πεταλούδες & μέλισσες: 30% μικρότερες, χρωματισμός μπλε-λιλά για συνάφεια με το τοπίο
var FlowerBurstEnemy = function(spriteType, fx, fy, formType) {
  this.setup(spriteType, { health: 10, points: 100 });
  this.w = Math.floor(this.w * 0.60);  // μείωση 40% (ακόμα 10% πιο μικρό)
  this.h = Math.floor(this.h * 0.60);
  this.x = fx - this.w / 2;
  this.y = fy - this.h / 2;
  this.t = 0;
  this.phase = 0; // 0=rise, 1=delay at top, 2=formation (ή μέσα στο 1 με _formationStarted)
  this.formType = formType || 'fan';
  // Πολύ γρήγορη κίνηση προς τα πάνω — σαν έκρηξη
  var _spd = 1100 + Math.random() * 250;
  var _ang = (25 + Math.random() * 25) * Math.PI / 180;
  this.vx = (Math.random() > 0.5 ? 1 : -1) * _spd * Math.sin(_ang);
  this.vy = -_spd * Math.cos(_ang);
  this.hitFlash = 0;
  this.hasShot  = false;
  this._phaseT   = 0;
  this._formT    = 0;
  this._formationStarted = false;
  this._delayAtTop = 0.48;
  // Per-formation params (set when delay ends)
  this._spinAngle  = 0;
  this._spinSpeed  = (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 3);
  this._spinRadius = 10;
  this._spinCX = 0; this._spinCY = 0;
  this._zigAmp    = 85 + Math.random() * 50;
  this._zigFreq   = 2.2 + Math.random() * 1.2;
  this._zigOffset = Math.random() * Math.PI * 2;
  this._zigStartX = 0;
  _initEnemyMorph(this, spriteType);
};

FlowerBurstEnemy.prototype = new Sprite();
FlowerBurstEnemy.prototype.type = OBJECT_ENEMY;

FlowerBurstEnemy.prototype.step = function(dt) {
  if(this.hitFlash > 0) this.hitFlash -= dt * 9;
  this.t += dt;

  if(this.phase === 0) {
    // Rise: near-vertical fast stream upward
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Φτάνουν ψηλά → καθυστέρηση (επιβράδυνση) → μετά formation
    if(this.y + this.h * 0.5 < Game.height * 0.16) {
      this.phase = 1;
      this._phaseT = 0;
      // Αμέσως επιβράδυνση — "καθυστερούν λίγο" στην κορυφή
      this.vx *= 0.12;
      this.vy *= 0.12;
    }

  } else {
    this._phaseT += dt;

    // Πρώτα: σύντομη καθυστέρηση ψηλά (επιβράδυνση, σχεδόν σταματούν)
    if(!this._formationStarted) {
      if(this._phaseT >= this._delayAtTop) {
        this._formationStarted = true;
        this._formT = 0;
        var cx = this.x + this.w / 2, cy = this.y + this.h / 2;
        if(this.formType === 'line_drop') {
          this.vx *= 0.08; this.vy = 0;
        } else if(this.formType === 'spiral') {
          this._spinCX = cx; this._spinCY = cy;
          this._spinAngle = Math.atan2(this.vy, this.vx);
          this._spinRadius = 10;
        } else if(this.formType === 'zigzag') {
          this._zigStartX = cx;
          this.vy = 190;
          this.vx = 0;
        } else {
          var ang = Math.random() * Math.PI * 2;
          var spd = 300 + Math.random() * 160;
          this.vx = Math.cos(ang) * spd;
          this.vy = Math.abs(Math.sin(ang) * spd) + 80;
        }
      } else {
        this.vx *= 0.88;
        this.vy *= 0.88;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
      }
    } else {
      this._formT += dt;

      if(this.formType === 'line_drop') {
        if(this._formT < 0.35) {
          // Σύντομη παύση μετά την καθυστέρηση
        } else {
          this.vy = Math.min(500, this.vy + 400 * dt);
          this.x += this.vx * dt;
          this.y += this.vy * dt;
        }
      } else if(this.formType === 'spiral') {
        this._spinAngle  += this._spinSpeed * dt;
        this._spinRadius += 120 * dt;
        this.x = this._spinCX + Math.cos(this._spinAngle) * this._spinRadius - this.w / 2;
        this.y = this._spinCY + Math.sin(this._spinAngle) * this._spinRadius - this.h / 2;
      } else if(this.formType === 'zigzag') {
        this.vy = Math.min(400, this.vy + 85 * dt);
        this.y += this.vy * dt;
        var cx2 = this._zigStartX + Math.sin(this._formT * this._zigFreq + this._zigOffset) * this._zigAmp;
        this.x = cx2 - this.w / 2;
      } else {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
      }

      if(!this.hasShot && this.vy > 0 && this.y > Game.height * 0.10 && this.y < Game.height * 0.60) {
        this.hasShot = true;
        _spawnEnemyShot(this.board, this.x + this.w / 2, this.y + this.h);
      }
    }
  }

  var collision = this.board.collide(this, OBJECT_PLAYER);
  if(collision) { collision.hit(10); this.board.remove(this); return; }

  if(this.y > Game.height + 90 || this.x < -200 || this.x > Game.width + 200 || this.y < -400) {
    this.board.remove(this);
  }
  _stepEnemyMorph(this, dt);
};

FlowerBurstEnemy.prototype.hit = function(damage) {
  this.hitFlash = 1.0;
  this.health -= (Game.pharaohActive && this.type === OBJECT_ENEMY ? damage * 3 : damage);
  if(this.health <= 0) {
    if(this.board.remove(this)) {
      SoundManager.playExplosion();
      var ecx = this.x + this.w / 2, ecy = this.y + this.h / 2;
      this.board.add(new Explosion(ecx, ecy));
      this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
      earnPoints(this.board, ecx, this.y, this.points || 300, '#FF66CC');
      if(Math.random() < 0.25) this.board.add(new PowerUp(ecx, ecy));
    }
  } else {
    this.board.add(new MissileImpactSpark(this.x + this.w / 2, this.y + this.h / 2));
    SoundManager.playImpact();
  }
};

FlowerBurstEnemy.prototype.draw = function(ctx) {
  var _fbDrawSpr  = (this._morphEnabled && this._morphSprite) ? this._morphSprite : this.sprite;
  var _fbMorphAlph = this._morphEnabled ? this._morphAlpha : 1.0;
  var _fbMorphOld  = (this._morphEnabled && this._morphOldSprite) ? this._morphOldSprite : null;

  ctx.save();
  if (_fbMorphOld) {
    var _fbcx = this.x + this.w / 2, _fbcy = this.y + this.h / 2;
    ctx.translate(_fbcx, _fbcy);
    var _fbpop = 1.0 + 0.12 * Math.sin(_fbMorphAlph * Math.PI);
    ctx.scale(_fbpop, _fbpop);
    ctx.translate(-_fbcx, -_fbcy);
    ctx.globalAlpha = 1 - _fbMorphAlph;
    SpriteSheet.draw(ctx, _fbMorphOld, this.x, this.y, this.frame || 0, this.w, this.h);
    ctx.globalAlpha = _fbMorphAlph;
    SpriteSheet.draw(ctx, _fbDrawSpr, this.x, this.y, this.frame || 0, this.w, this.h);
    ctx.globalAlpha = 1.0;
  } else {
    SpriteSheet.draw(ctx, _fbDrawSpr, this.x, this.y, this.frame || 0, this.w, this.h);
  }
  if(this.hitFlash > 0) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = this.hitFlash * 0.7;
    SpriteSheet.draw(ctx, _fbDrawSpr, this.x, this.y, this.frame || 0, this.w, this.h);
  }
  ctx.restore();
};

// ===================================================================
// VIDEO BONUS STAGE — alien flower world video background + FlowerBurstEnemies
// ===================================================================
var VideoBonusStage = function(onComplete) {
  this.spawnTimer  = 1.5;  // first wave fires after 1.5s
  this.active      = true;
  this.onComplete  = onComplete;
  this.startPoints = 0;
  this.startKills  = 0;
  this._vid        = null;
  this._vidReady   = false;
  this._waveIndex  = 0;   // 0–3, one per flower
  this._endTimer   = -1;  // counts down after last wave is spawned
  this._fadeOutDur = 3.0; // τελευταία 3s: νύχτωμα σιγά-σιγά πριν την αλλαγή (όχι εκτίναξη)
  this._fadeInAlpha = 1;  // στην αρχή: σκοτάδι, μετά δίνεται φως σιγά-σιγά
  this._fadeInDur   = 1.8;
};

VideoBonusStage.prototype.init = function(board) {
  this.board       = board;
  this.startPoints = Game.points;
  this.startKills  = sessionKills;
  // Χρόνος bonus stage — μάξιμουμ 30 δευτερόλεπτα
  this.timer       = 30;

  var v = document.createElement('video');
  v.src        = 'images/video/Google Gemini_2.mp4';
  v.loop       = true;
  v.muted      = true;
  v.autoplay   = true;
  v.playsInline = true;
  v.setAttribute('playsinline', '');
  v.style.position = 'absolute';
  v.style.left     = '-9999px'; // hidden but in DOM (required for autoplay)
  document.body.appendChild(v);

  var self = this;
  var tryPlay = function() {
    var p = v.play();
    if(p && p.then) {
      p.then(function() { self._vidReady = true; })
       .catch(function() { setTimeout(tryPlay, 300); });
    } else {
      self._vidReady = true;
    }
  };
  v.addEventListener('loadeddata', tryPlay);
  tryPlay(); // also try immediately
  this._vid = v;
};

VideoBonusStage.prototype.spawnWave = function() {
  if(this._waveIndex >= BONUS_FLOWER_POS.length) return;

  var pos = BONUS_FLOWER_POS[this._waveIndex];
  this._waveIndex++;

  // 8–9 εχθροί ανά κύμα, εκκρίνονται από το λουλούδι και πάνε ψηλά, μετά περιστροφή και κινήσεις αριστερά/δεξιά
  var form = _BONUS_FORMATIONS[(this._waveIndex - 1) % _BONUS_FORMATIONS.length];
  var count = 8 + Math.floor(Math.random() * 2);
  for(var i = 0; i < count; i++) {
    var spr = BONUS_FLOWER_ALIEN_POOL[Math.floor(Math.random() * BONUS_FLOWER_ALIEN_POOL.length)];
    if(!SpriteSheet.map[spr]) spr = 'butterfly_1'; // fallback
    var fx = pos.x * Game.width  + (Math.random() - 0.5) * 18;
    var fy = pos.y * Game.height + (Math.random() - 0.5) * 10;
    this.board.add(new FlowerBurstEnemy(spr, fx, fy, form));
  }
};

VideoBonusStage.prototype._endStage = function() {
  if(!this.active) return;
  this.active = false;
  if(this._vid) {
    this._vid.pause();
    this._vid.src = '';
    if(this._vid.parentNode) this._vid.parentNode.removeChild(this._vid);
    this._vid = null;
  }
  var bonusPts   = Game.points - this.startPoints;
  var bonusKills = sessionKills - this.startKills;
  this.board.remove(this);
  if(this.onComplete) this.onComplete(bonusKills, bonusPts);
};

VideoBonusStage.prototype.step = function(dt) {
  if(!this.active) return;

  this.timer      -= dt;
  this.spawnTimer -= dt;

  // Spawn next wave on timer (4 κύματα μέσα σε 30s)
  if(this.spawnTimer <= 0 && this._waveIndex < BONUS_FLOWER_POS.length) {
    this.spawnWave();
    this.spawnTimer = 6 + Math.random() * 3; // ~6–9s ανάμεσα σε κύματα
  }

  if(this.timer <= 0) { this._endStage(); }
};

VideoBonusStage.prototype.draw = function(ctx) {
  // Video background (drawn first — under all game objects)
  if(this._vidReady && this._vid && this._vid.readyState >= 2) {
    ctx.drawImage(this._vid, 0, 0, Game.width, Game.height);
  } else {
    ctx.fillStyle = '#050010';
    ctx.fillRect(0, 0, Game.width, Game.height);
  }

  // Θόλωμα προς το τέλος: νύχτωμα πριν αλλάξει η οθόνη (όχι απότομη αλλαγή)
  if(this.timer < this._fadeOutDur && this.timer > 0) {
    var fadeOutAlpha = 1 - (this.timer / this._fadeOutDur);
    ctx.fillStyle = 'rgba(0,0,0,' + fadeOutAlpha + ')';
    ctx.fillRect(0, 0, Game.width, Game.height);
  }
  // Fade-in handled by ScreenFade (slot 20) — no dark overlay needed here

  // HUD overlay
  var sec = Math.ceil(Math.max(0, this.timer));
  ctx.save();
  ctx.textAlign   = 'center';
  var _hs = Math.min(1.5, Math.max(1.0, Game.width / 640));
  var bx  = Game.width / 2;

  ctx.font        = 'bold ' + Math.round(13 * _hs) + 'px monospace';
  ctx.fillStyle   = '#FFD700';
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur  = 12;
  ctx.fillText('\u2736 BONUS STAGE \u2736', bx, 18);

  ctx.font        = 'bold ' + Math.round(11 * _hs) + 'px monospace';
  var flash = sec <= 10 && Math.floor(this.timer * 4) % 2 === 0;
  ctx.fillStyle   = sec <= 10 ? '#FF4444' : '#00FFFF';
  ctx.shadowColor = ctx.fillStyle;
  ctx.shadowBlur  = 10;
  if(!flash) ctx.fillText(sec + 's', bx, 18 + Math.round(14 * _hs));
  ctx.restore();
};

// ===== TOPIA BACKGROUND — cross-dissolve landscape slideshow =====
// Board object placed at slot 2.9 (above planets/stars, below enemies/player)
var TopiaBackground = function(imagePaths) {
  this._paths  = imagePaths;
  this._imgs   = [];
  this._loaded = 0;
  this._cur    = 0;
  this._next   = imagePaths.length > 1 ? 1 : 0;
  this._alpha  = 0;      // 0 = fully cur, 1 = fully next (during crossfade)
  this._hold   = 3.5;    // seconds each image is fully shown
  this._trans  = 1.5;    // seconds of crossfade
  this._timer  = 1.5;    // start first image after brief fade-in
  this._fading = false;
  this._t      = 0;      // running time for animated effects
};

TopiaBackground.prototype.init = function() {
  var self = this;
  for (var i = 0; i < this._paths.length; i++) {
    (function(idx) {
      var img = new Image();
      img.onload = function() { self._loaded++; };
      img.src = self._paths[idx];
      self._imgs[idx] = img;
    })(i);
  }
};

TopiaBackground.prototype.step = function(dt) {
  this._t += dt;
  if (this._paths.length < 2) return;
  if (this._fading) {
    this._alpha += dt / this._trans;
    if (this._alpha >= 1) {
      this._alpha  = 0;
      this._cur    = this._next;
      this._next   = (this._next + 1) % this._paths.length;
      this._fading = false;
      this._timer  = this._hold;
    }
  } else {
    this._timer -= dt;
    if (this._timer <= 0) {
      this._fading = true;
      this._alpha  = 0;
    }
  }
};

TopiaBackground.prototype.draw = function(ctx) {
  var w = Game.width, h = Game.height;
  var curImg  = this._imgs[this._cur];
  var nextImg = this._imgs[this._next];

  // Dark base fill — always visible even before images load
  ctx.fillStyle = '#000510';
  ctx.fillRect(0, 0, w, h);

  if (!curImg || !curImg.complete || curImg.naturalWidth === 0) return;

  // ── Draw images (+20% brighter again: 79%→95%) ──
  var _dim = 0.95;
  ctx.globalAlpha = this._fading ? (1 - this._alpha) * _dim : _dim;
  ctx.drawImage(curImg, 0, 0, w, h);

  if (this._fading && nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
    ctx.globalAlpha = this._alpha * _dim;
    ctx.drawImage(nextImg, 0, 0, w, h);
  }

  ctx.globalAlpha = 1;

  // ── Dark blue-black flat overlay (−15% darker: 0.22→0.07) ───────────────
  ctx.fillStyle = 'rgba(0, 2, 18, 0.07)';
  ctx.fillRect(0, 0, w, h);

  // ── Vignette: dark at edges, transparent in centre ────────────────────────
  var _cx = w / 2, _cy = h / 2;
  var _vg = ctx.createRadialGradient(_cx, _cy, 0, _cx, _cy, Math.max(w, h) * 0.68);
  _vg.addColorStop(0,   'rgba(0,0,0,0)');
  _vg.addColorStop(0.6, 'rgba(0,0,0,0)');
  _vg.addColorStop(1,   'rgba(0,0,12,0.82)');
  ctx.fillStyle = _vg;
  ctx.fillRect(0, 0, w, h);

  // ── Animated mystical tint: slow-pulsing purple/indigo shimmer ────────────
  var _pulse = 0.07 + 0.04 * Math.sin(this._t * 0.40);
  ctx.fillStyle = 'rgba(28, 0, 55, ' + _pulse.toFixed(3) + ')';
  ctx.fillRect(0, 0, w, h);

  // ── Slow horizontal scanline haze (very subtle, reinforces the dark mood) ─
  var _haze = 0.025 + 0.015 * Math.sin(this._t * 0.25 + 1.2);
  ctx.fillStyle = 'rgba(0, 10, 40, ' + _haze.toFixed(3) + ')';
  ctx.fillRect(0, 0, w, h);
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
    ctx.fillStyle = 'rgba(0,0,16,0.72)';
    ctx.fillRect(0, 0, _W, _H);

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

var earnPoints = function(board, cx, cy, base, color, flash) {
  comboCount++;
  comboTimer = COMBO_WINDOW;
  comboMult = Math.min(8, 1 + Math.floor((comboCount - 1) / 3));
  var earned = base * comboMult * (Game.goldRushMultiplier || 1);
  var prevScore = Game.points;
  Game.points += earned;

  // Score milestone: extra life every 120,000 points
  var _lifeThresh = 120000;
  if(Math.floor(Game.points / _lifeThresh) > Math.floor(prevScore / _lifeThresh)) {
    playerLives = Math.min(playerLives + 1, 9);
    board.add(new ExtraLifeFlash());
  }

  board.add(new ScorePopup(cx, cy, earned, comboMult, color, flash));

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

// Power-up state saved between stages (so they carry over to next level)
var _savedPowerUps = null;
// Πόσα queuable coins έχουν μαζευτεί αυτή τη σειρά — καθορίζει πόσες δυνάμεις μπορείς να κρατήσεις (όχι πλέον μόνο 4)
var sessionQueuablePowerUpsCollected = 0;

var _savePowerUpsFromCurrentShip = function() {
  if(!playerShip) { _savedPowerUps = null; return; }
  _savedPowerUps = {
    speedBoostTimer:   playerShip.speedBoostTimer,
    powerShotTimer:    playerShip.powerShotTimer,
    rapidFireTimer:    playerShip.rapidFireTimer,
    tripleShotTimer:   playerShip.tripleShotTimer,
    timeSlowTimer:     playerShip.timeSlowTimer,
    magnetTimer:       playerShip.magnetTimer,
    homingTimer:       playerShip.homingTimer,
    reflectShield:     playerShip.reflectShield,
    dragonTimer:       playerShip.dragonTimer,
    pharaohTimer:      playerShip.pharaohTimer,
    goldRushTimer:     playerShip.goldRushTimer,
    starBurstTimer:    playerShip.starBurstTimer,
    twinArrowTimer:    playerShip.twinArrowTimer,
    fireTrailTimer:    playerShip.fireTrailTimer,
    ghostTimer:        playerShip.ghostTimer,
    berserkerTimer:    playerShip.berserkerTimer,
    spiralTimer:       playerShip.spiralTimer,
    axeStormTimer:     playerShip.axeStormTimer,
    warShield:         playerShip.warShield,
    wingmanLeftTimer:  playerShip.wingmanLeft   ? 1 : 0,
    wingmanRightTimer: playerShip.wingmanRight  ? 1 : 0,
    wingmanLeft2Timer: playerShip.wingmanLeft2  ? 1 : 0,
    wingmanRight2Timer:playerShip.wingmanRight2 ? 1 : 0,
    activePowerType:   playerShip._activePowerType,
    powerUpQueue:      playerShip._powerUpQueue ? playerShip._powerUpQueue.slice() : []
  };
};

var _restoreWingmenToBoard = function(board) {
  if(!_savedPowerUps || !playerShip) return;
  if(_savedPowerUps.wingmanLeftTimer > 0) {
    playerShip.wingmanLeft = new WingmanShip(playerShip, -1);
    playerShip.wingmanLeft.lifeTimer = _savedPowerUps.wingmanLeftTimer;
    board.add(playerShip.wingmanLeft);
  }
  if(_savedPowerUps.wingmanRightTimer > 0) {
    playerShip.wingmanRight = new WingmanShip(playerShip, 1);
    playerShip.wingmanRight.lifeTimer = _savedPowerUps.wingmanRightTimer;
    board.add(playerShip.wingmanRight);
  }
  if(_savedPowerUps.wingmanLeft2Timer > 0) {
    playerShip.wingmanLeft2 = new WingmanShip(playerShip, -2.2);
    playerShip.wingmanLeft2.lifeTimer = _savedPowerUps.wingmanLeft2Timer;
    board.add(playerShip.wingmanLeft2);
  }
  if(_savedPowerUps.wingmanRight2Timer > 0) {
    playerShip.wingmanRight2 = new WingmanShip(playerShip, 2.2);
    playerShip.wingmanRight2.lifeTimer = _savedPowerUps.wingmanRight2Timer;
    board.add(playerShip.wingmanRight2);
  }
  _savedPowerUps = null;
};

// ===================================================================
// MAVRIS TRIBES BACKDROP — black holes grow → ~1000px → shrink & vanish
// Board slot 1.85
// Φάσεις: grow → shrink (περιστρέφεται στη θέση του & μικραίνει) → gone
// Τυχαία θέση κάθε φορά
// ===================================================================
var MavrisRotatingBackdrop = function() {
  this.x = 0; this.y = 0; this.w = 1; this.h = 1;
  this._imgs = [new Image(), new Image()];
  this._imgs[0].src = 'images/Mavris Tribes/Remove_background-1771770063733.webp';
  this._imgs[1].src = 'images/Mavris Tribes/Remove_background-1771770070431.webp';
  this._items  = [null, null];
  this._timers = [3, 18 + Math.random() * 8]; // staggered
};
MavrisRotatingBackdrop.prototype._spawn = function(idx) {
  var w = Game.width, h = Game.height;
  // Τυχαία θέση στην οθόνη (αποφεύγουμε τις ακριανές ζώνες)
  var cx = w * (0.15 + Math.random() * 0.70);
  var cy = h * (0.12 + Math.random() * 0.76);
  var targetSize = 950 + Math.random() * 100;  // ~950-1050px
  return {
    cx: cx, cy: cy,
    size:       55 + Math.random() * 30,         // αρχικό μέγεθος (55-85px)
    targetSize: targetSize,
    growSpeed:  60 + Math.random() * 40,         // px/sec ανάπτυξη (~14-18s ως πλήρες)
    shrinkSpeed: 30 + Math.random() * 25,        // px/sec συρρίκνωση (πιο αργή από grow)
    selfRot:      Math.random() * Math.PI * 2,
    selfRotSpeed: 0.04 + Math.random() * 0.08,  // αργή περιστροφή (0.04-0.12 rad/sec)
    alpha:    0,
    maxAlpha: 0.50 + Math.random() * 0.15,      // 0.50-0.65
    phase:    'grow'  // 'grow' | 'shrink'
  };
};
MavrisRotatingBackdrop.prototype.step = function(dt) {
  for(var i = 0; i < 2; i++) {
    if(!this._items[i]) {
      this._timers[i] -= dt;
      if(this._timers[i] <= 0) this._items[i] = this._spawn(i);
      continue;
    }
    var it = this._items[i];
    // Αργή περιστροφή σε όλες τις φάσεις
    it.selfRot += it.selfRotSpeed * dt;

    if(it.phase === 'grow') {
      it.size  = Math.min(it.targetSize, it.size + it.growSpeed * dt);
      it.alpha = Math.min(it.maxAlpha,   it.alpha + 0.014 * dt);
      if(it.size >= it.targetSize) it.phase = 'shrink';

    } else { // shrink — μικραίνει αργά ώσπου εξαφανιστεί
      it.size  -= it.shrinkSpeed * dt;
      it.alpha -= 0.008 * dt; // ξεθωριάζει παράλληλα
      if(it.size <= 0 || it.alpha <= 0) {
        this._items[i] = null;
        this._timers[i] = 10 + Math.random() * 18; // αναμονή πριν ξαναεμφανιστεί
      }
    }
  }
};
MavrisRotatingBackdrop.prototype.draw = function(ctx) {
  for(var i = 0; i < 2; i++) {
    var it = this._items[i];
    if(!it || it.alpha <= 0 || it.size <= 0) continue;
    var img = this._imgs[i];
    if(!img.complete || !img.naturalWidth) continue;
    var s = it.size;
    ctx.save();
    ctx.globalAlpha = it.alpha;
    ctx.translate(it.cx, it.cy);
    ctx.rotate(it.selfRot);
    ctx.drawImage(img, -s/2, -s/2, s, s);
    ctx.restore();
  }
};

// ─── PAUSE + CODE SCREEN (Escape during gameplay) ────────────────────────────
var PauseCodeScreen = function() {
  Game.paused = true;
  var _wingCount = 0;
  if(playerShip) {
    if(playerShip.wingmanLeft)   _wingCount++;
    if(playerShip.wingmanRight)  _wingCount++;
    if(playerShip.wingmanLeft2)  _wingCount++;
    if(playerShip.wingmanRight2) _wingCount++;
  }
  var _activeIdx = 0;
  if(playerShip && playerShip._activePowerType) {
    var _ai = POWERUP_TYPES.indexOf(playerShip._activePowerType);
    if(_ai >= 0) _activeIdx = _ai + 1;
  }
  var _qLen = (playerShip && playerShip._powerUpQueue) ? playerShip._powerUpQueue.length : 0;
  var _code = _genStageCode(currentLevel, _activeIdx, _qLen, _wingCount);
  _saveProgressToStorage();

  var _epl = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
  if(_epl) _epl.call(document);
  Game.canvas.style.cursor = 'default';

  var _t = 0, _done = false;
  var _self = this;

  var _resume = function() {
    if(_done) return; _done = true;
    Game.setBoard(12, null);
    Game.paused = false;
    Game.canvas.style.cursor = 'none';
    if(!Game.mobile) {
      var _rpl = Game.canvas.requestPointerLock || Game.canvas.mozRequestPointerLock || Game.canvas.webkitRequestPointerLock;
      if(_rpl) _rpl.call(Game.canvas);
    }
    window.removeEventListener('keydown', _pauseKeyH);
  };
  var _pauseKeyH = function(e) {
    if(e.keyCode === 27 || e.keyCode === 13 || e.keyCode === 32) { e.preventDefault(); _resume(); }
  };
  window.addEventListener('keydown', _pauseKeyH);

  this.step = function(dt) {
    _t += dt;
    if(Game.keys['fire'] && _t > 0.5) _resume();
  };
  this.draw = function(ctx) {
    var W = Game.width, H = Game.height, cx = W / 2;
    ctx.save();
    ctx.fillStyle = 'rgba(0,2,16,0.82)'; ctx.fillRect(0, 0, W, H);
    var pw = Math.min(W * 0.75, 440), ph = 290;
    var px = (W - pw) / 2, py = (H - ph) / 2;
    var r = 14, pulse = 0.7 + 0.3 * Math.sin(_t * 2.5);
    ctx.fillStyle = 'rgba(0,10,40,0.93)';
    ctx.strokeStyle = 'rgba(0,136,255,0.8)'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px+r,py); ctx.lineTo(px+pw-r,py); ctx.quadraticCurveTo(px+pw,py,px+pw,py+r);
    ctx.lineTo(px+pw,py+ph-r); ctx.quadraticCurveTo(px+pw,py+ph,px+pw-r,py+ph);
    ctx.lineTo(px+r,py+ph); ctx.quadraticCurveTo(px,py+ph,px,py+ph-r);
    ctx.lineTo(px,py+r); ctx.quadraticCurveTo(px,py,px+r,py); ctx.closePath();
    ctx.fill(); ctx.globalAlpha = 0.75; ctx.stroke(); ctx.globalAlpha = 1;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 22px Arial'; ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#00AAFF'; ctx.shadowBlur = 18 * pulse;
    ctx.fillText('\u23F8 GAME PAUSED', cx, py + 38); ctx.shadowBlur = 0;
    ctx.font = '14px Arial'; ctx.fillStyle = '#88AACC';
    ctx.fillText('Stage ' + currentLevel + '  \u2022  Progress saved automatically', cx, py + 68);
    ctx.font = 'bold 12px Arial'; ctx.fillStyle = '#6688AA';
    ctx.fillText('YOUR STAGE CODE:', cx, py + 100);
    var cbW = 190, cbH = 54, cbX = cx - cbW/2, cbY = py + 112;
    ctx.fillStyle = 'rgba(0,18,55,0.92)'; ctx.strokeStyle = 'rgba(0,200,255,0.75)'; ctx.lineWidth = 1.5;
    ctx.fillRect(cbX, cbY, cbW, cbH); ctx.strokeRect(cbX, cbY, cbW, cbH);
    ctx.font = 'bold 30px monospace'; ctx.fillStyle = '#00FFFF';
    ctx.shadowColor = '#00FFFF'; ctx.shadowBlur = 12;
    ctx.fillText(_code, cx, cbY + cbH/2); ctx.shadowBlur = 0;
    ctx.font = '11px Arial'; ctx.fillStyle = '#6688AA';
    ctx.fillText('Write this code to resume from this stage on any device', cx, py + 184);
    ctx.globalAlpha = 0.55 + 0.45 * Math.sin(_t * 3.2);
    ctx.font = 'bold 13px Arial'; ctx.fillStyle = '#FFFF44';
    ctx.shadowColor = '#FFFF00'; ctx.shadowBlur = 10;
    ctx.fillText('Press FIRE \u2022 ENTER \u2022 ESC to continue playing', cx, py + 250);
    ctx.shadowBlur = 0; ctx.globalAlpha = 1;
    ctx.restore();
  };
  this.remove = function() { window.removeEventListener('keydown', _pauseKeyH); };
};

// ─── SAVED FLASH NOTIFICATION (brief on-screen "SAVED" banner) ───────────────
var SavedFlashNotification = function() { this._t = 0; };
SavedFlashNotification.prototype.step = function(dt) {
  this._t += dt;
  if(this._t >= 2.5) Game.setBoard(14, null);
};
SavedFlashNotification.prototype.draw = function(ctx) {
  var p = this._t / 2.5;
  var alpha = p < 0.15 ? p / 0.15 : p > 0.70 ? 1 - (p - 0.70) / 0.30 : 1.0;
  if(alpha <= 0) return;
  var W = Game.width, sz = Math.round(Math.max(20, W / 20));
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = 'bold ' + sz + 'px Arial';
  ctx.fillStyle = '#44FF88'; ctx.shadowColor = '#00FF44'; ctx.shadowBlur = 20;
  ctx.fillText('\u2714  SAVED', W / 2, Game.height * 0.10);
  ctx.restore();
};

// ─── CODE INPUT SCREEN (from title screen) ────────────────────────────────────
var CodeInputScreen = function(onConfirm, onCancel, hintCode) {
  var _input = '', _t = 0, _error = '', _errorTimer = 0, _done = false;
  var _tryConfirm = function() {
    var decoded = _decodeStageCode(_input);
    if(!decoded) { _error = 'Invalid code — check and try again'; _errorTimer = 2.5; _input = ''; return; }
    _done = true;
    window.removeEventListener('keydown', _codeKeyH);
    if(onConfirm) onConfirm(decoded);
  };
  var _codeKeyH = function(e) {
    if(_done) return;
    if(e.keyCode === 27) { e.preventDefault(); _done = true; window.removeEventListener('keydown', _codeKeyH); if(onCancel) onCancel(); return; }
    if(e.keyCode === 8 || e.keyCode === 46) { e.preventDefault(); _input = _input.slice(0, -1); _error = ''; return; }
    if(e.keyCode === 13) { e.preventDefault(); _tryConfirm(); return; }
    var k = e.key;
    if(k && k.length === 1 && /[0-9a-zA-Z]/.test(k) && _input.length < 5) {
      _input += k.toUpperCase(); _error = '';
      if(_input.length === 5) _tryConfirm();
    }
  };
  window.addEventListener('keydown', _codeKeyH);
  this.step = function(dt) { _t += dt; if(_errorTimer > 0) _errorTimer -= dt; };
  this.draw = function(ctx) {
    var W = Game.width, H = Game.height, cx = W/2, cy = H/2;
    ctx.save();
    ctx.fillStyle = 'rgba(0,2,18,0.90)'; ctx.fillRect(0, 0, W, H);
    var pulse = 0.7 + 0.3 * Math.sin(_t * 2.1);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 26px Arial'; ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#00AAFF'; ctx.shadowBlur = 20 * pulse;
    ctx.fillText('ENTER STAGE CODE', cx, cy - 85); ctx.shadowBlur = 0;
    ctx.font = '13px Arial'; ctx.fillStyle = '#88AACC';
    ctx.fillText('Type your 5-character code to resume from a saved stage', cx, cy - 55);
    if(hintCode) {
      ctx.font = 'bold 14px Arial'; ctx.fillStyle = '#FFFF55';
      ctx.shadowColor = '#AAAA00'; ctx.shadowBlur = 8;
      ctx.fillText('Saved code: ' + hintCode + '  (just press Enter to use it, or type a new one)', cx, cy - 34);
      ctx.shadowBlur = 0;
    }
    var bW = 250, bH = 68, bX = cx-bW/2, bY = cy-34;
    ctx.fillStyle = 'rgba(0,14,50,0.92)'; ctx.strokeStyle = '#0099FF'; ctx.lineWidth = 2;
    ctx.fillRect(bX,bY,bW,bH); ctx.strokeRect(bX,bY,bW,bH);
    var display = _input + (_t % 1 < 0.5 ? '_' : ' ');
    ctx.font = 'bold 36px monospace'; ctx.fillStyle = '#00FFFF';
    ctx.shadowColor = '#00FFFF'; ctx.shadowBlur = 10;
    ctx.fillText(display, cx, cy); ctx.shadowBlur = 0;
    if(_errorTimer > 0) {
      ctx.font = 'bold 13px Arial'; ctx.fillStyle = '#FF4444';
      ctx.shadowColor = '#FF0000'; ctx.shadowBlur = 8;
      ctx.fillText(_error, cx, cy + 56); ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 0.65; ctx.font = '12px Arial'; ctx.fillStyle = '#AAAAAA';
    ctx.fillText('Press ENTER to confirm  \u2022  ESC to cancel', cx, cy + 85);
    ctx.globalAlpha = 1;
    ctx.restore();
  };
  this.remove = function() { window.removeEventListener('keydown', _codeKeyH); };
};

// ─── INSTRUCTIONS SCREEN ──────────────────────────────────────────────────────
// Egyptian figures pool
var _egyptFigFiles = [
  'Remove_background-1772028766307.webp','Remove_background-1772028991962.webp',
  'Remove_background-1772028995896.webp','Remove_background-1772029008340.webp',
  'Remove_background-1772029013872.webp','Remove_background-1772029022632.webp',
  'Remove_background-1772029029705.webp','Remove_background-1772029038540.webp',
  'Remove_background-1772029043726.webp','Remove_background-1772029051124.webp',
  'Remove_background-1772029056895.webp','Remove_background-1772029287920.webp',
  'Remove_background-1772029298760.webp','Remove_background-1772029304297.webp',
  'Remove_background-1772029309740.webp','Remove_background-1772029328040.webp',
  'Remove_background-1772029332155.webp','Remove_background-1772029339522.webp',
  'Remove_background-1772029345240.webp','Remove_background-1772029352100.webp',
  'Remove_background-1772029358051.webp','Remove_background-1772029552640.webp',
  'Remove_background-1772029558225.webp','Remove_background-1772029564852.webp',
  'Remove_background-1772029569978.webp','Remove_background-1772029582614.webp',
  'Remove_background-1772029586419.webp','Remove_background-1772029599353.webp',
  'Remove_background-1772029611422.webp','Remove_background-1772029617999.webp',
  'Remove_background-1772029622160.webp','Remove_background-1772029901224.webp',
  'Remove_background-1772029901225.webp','Remove_background-1772029907042.webp',
  'Remove_background-1772029913544.webp','Remove_background-1772029921496.webp',
  'Remove_background-1772029928461.webp','Remove_background-1772029935964.webp',
  'Remove_background-1772029942620.webp','Remove_background-1772029950957.webp',
  'Remove_background-1772029959741.webp','Remove_background-1772029966948.webp',
  'Remove_background-1772029978010.webp','Remove_background-1772029978298.webp',
  'Remove_background-1772029984049.webp','Remove_background-1772029990794.webp',
  'Remove_background-1772029998319.webp','Remove_background-1772030005156.webp',
  'Remove_background-1772030666769.webp'
];
var _egyptDir = 'images/\u0391\u03c1\u03c7\u03b1\u03af\u03b5\u03c2 \u03b1\u03b9\u03b3\u03c5\u03c0\u03c4\u03b9\u03b1\u03ba\u03ad\u03c2 \u03c6\u03b9\u03b3\u03bf\u03cd\u03c1\u03b5\u03c2/';

var InstructionsScreen = function(onStart) {
  var _t = 0, _done = false;

  // Pick 2 DIFFERENT Egyptian figures (inside panel, left & right of text)
  var _idxL = Math.floor(Math.random() * _egyptFigFiles.length);
  var _idxR;
  do { _idxR = Math.floor(Math.random() * _egyptFigFiles.length); } while(_idxR === _idxL);
  var _figL = new Image(); _figL.src = _egyptDir + _egyptFigFiles[_idxL];
  var _figR = new Image(); _figR.src = _egyptDir + _egyptFigFiles[_idxR];

  // Pick 2 DIFFERENT enemy sprites (outer frame columns, very large)
  var _ep = allAlienPool;
  var _eiL = Math.floor(Math.random() * _ep.length);
  var _eiR;
  do { _eiR = Math.floor(Math.random() * _ep.length); } while(_eiR === _eiL);
  var _leftEnemyKey  = _ep[_eiL];
  var _rightEnemyKey = _ep[_eiR];

  // Random frame image for the outer column strips
  var _frameImg = new Image();
  _frameImg.src = _transitionFrameFiles[Math.floor(Math.random() * _transitionFrameFiles.length)];

  // Twinkling stars (fixed positions)
  var _stars = [];
  for(var _si = 0; _si < 100; _si++) {
    _stars.push({ x: Math.random(), y: Math.random(), spd: 0.4 + Math.random() * 2.2, sz: Math.random() < 0.15 ? 2 : 1 });
  }

  var _keyH = function(e) {
    if(e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 27) {
      e.preventDefault();
      if(_done) return;
      _done = true;
      window.removeEventListener('keydown', _keyH);
      Game.setBoard(9, null);
      if(onStart) onStart();
    }
  };
  window.addEventListener('keydown', _keyH);

  this.step = function(dt) { _t += dt; };
  this.remove = function() { window.removeEventListener('keydown', _keyH); };

  this.draw = function(ctx) {
    var W = Game.width, H = Game.height, cx = W / 2;

    // ─── Deep space background ─────────────────────────────────────
    ctx.fillStyle = '#020814';
    ctx.fillRect(0, 0, W, H);
    var _neb = ctx.createRadialGradient(cx, H*0.4, 0, cx, H*0.4, W*0.6);
    _neb.addColorStop(0, 'rgba(0,30,80,0.20)');
    _neb.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = _neb; ctx.fillRect(0, 0, W, H);

    // Stars
    ctx.save();
    for(var si2 = 0; si2 < _stars.length; si2++) {
      var st = _stars[si2];
      var br = 0.20 + 0.80 * Math.abs(Math.sin(_t * st.spd + si2 * 1.3));
      ctx.globalAlpha = br * 0.85;
      ctx.fillStyle = si2 % 7 === 0 ? '#AADDFF' : '#FFFFFF';
      ctx.fillRect(Math.round(st.x * W), Math.round(st.y * H), st.sz, st.sz);
    }
    ctx.restore();

    // ─── Layout: outer frame columns + inner panel ─────────────────
    var colW = Math.round(Math.min(W * 0.22, 200)); // outer frame column width
    var pad  = 8;
    var panX = colW + pad, panW = W - colW*2 - pad*2;
    var panY = pad,        panH = H - pad*2;

    // ── OUTER COLUMNS: frame image + very large enemy sprite ───────
    // Frame strips
    if(_frameImg.complete && _frameImg.naturalWidth) {
      ctx.save(); ctx.globalAlpha = 0.82;
      ctx.drawImage(_frameImg, 0, 0, colW, H);
      ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1);
      ctx.drawImage(_frameImg, 0, 0, colW, H);
      ctx.restore(); ctx.restore();
    }

    // Large enemy sprites — clipped to their column, centred, very zoomed
    var _drawEnemy = function(key, side) {
      if(!key || !SpriteSheet.map[key]) return;
      var eSize = Math.round(Math.min(colW * 1.30, H * 0.72)); // deliberately oversized / cropped
      var ex = side === 'left' ? Math.round((colW - eSize) / 2)
                               : Math.round(W - colW + (colW - eSize) / 2);
      var ey = Math.round((H - eSize) / 2);
      ctx.save();
      ctx.beginPath();
      ctx.rect(side === 'left' ? 0 : W - colW, 0, colW, H);
      ctx.clip();
      ctx.shadowColor = '#00BBFF'; ctx.shadowBlur = 26;
      ctx.globalAlpha = 0.92;
      SpriteSheet.draw(ctx, key, ex, ey, 0, eSize, eSize);
      ctx.restore();
    };
    _drawEnemy(_leftEnemyKey,  'left');
    _drawEnemy(_rightEnemyKey, 'right');

    // ── CENTER PANEL background ────────────────────────────────────
    var cr2 = 16;
    ctx.save();
    ctx.globalAlpha = 0.88;
    ctx.fillStyle = '#010C20';
    ctx.beginPath();
    ctx.moveTo(panX+cr2,panY); ctx.lineTo(panX+panW-cr2,panY);
    ctx.quadraticCurveTo(panX+panW,panY,panX+panW,panY+cr2);
    ctx.lineTo(panX+panW,panY+panH-cr2);
    ctx.quadraticCurveTo(panX+panW,panY+panH,panX+panW-cr2,panY+panH);
    ctx.lineTo(panX+cr2,panY+panH);
    ctx.quadraticCurveTo(panX,panY+panH,panX,panY+panH-cr2);
    ctx.lineTo(panX,panY+cr2);
    ctx.quadraticCurveTo(panX,panY,panX+cr2,panY);
    ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(80,180,255,0.50)'; ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // ── INSIDE PANEL: Egyptian figures left & right of the text ────
    // Figures are large (40% of panel width each), anchored near the edges.
    // Text is always drawn on top in the fixed center 36%.
    var figW = Math.round(panW * 0.40);

    var _drawEgypt = function(img, side) {
      if(!img || !img.complete || !img.naturalWidth) return;
      var ar = img.naturalWidth / img.naturalHeight;
      var fW = figW;
      var fH = Math.round(fW / ar);
      if(fH > Math.round(panH * 0.92)) { fH = Math.round(panH * 0.92); fW = Math.round(fH * ar); }
      var fy = Math.round(panY + (panH - fH) / 2);
      var fx = side === 'left'
        ? Math.round(panX + panW * 0.01)
        : Math.round(panX + panW * 0.99 - fW);
      ctx.save();
      ctx.beginPath(); ctx.rect(panX, panY, panW, panH); ctx.clip();
      ctx.shadowColor = '#FFD700'; ctx.shadowBlur = 16;
      ctx.globalAlpha = 0.95;
      ctx.drawImage(img, fx, fy, fW, fH);
      ctx.restore();
    };
    _drawEgypt(_figL, 'left');
    _drawEgypt(_figR, 'right');

    // ── TEXT AREA: fixed center 36% — drawn on top of figures ───────
    var textX  = panX + Math.round(panW * 0.32);
    var textW  = Math.round(panW * 0.36);
    var textCX = panX + Math.round(panW / 2);

    // Title
    var pulse   = 0.80 + 0.20 * Math.sin(_t * 2.0);
    var titleSz = Math.round(Math.min(36, textW / 6));
    ctx.save();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold ' + titleSz + 'px Uncial Antiqua, Arial Black, Arial';
    // Gold glow layer
    ctx.globalAlpha = 0.50 * pulse;
    ctx.shadowColor = '#FFD700'; ctx.shadowBlur = 28;
    ctx.fillStyle = '#FFD700';
    ctx.fillText('HOW  TO  PLAY', textCX, panY + titleSz * 1.10);
    // White main layer
    ctx.globalAlpha = 1;
    ctx.shadowColor = '#00AAFF'; ctx.shadowBlur = 16 * pulse;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('HOW  TO  PLAY', textCX, panY + titleSz * 1.10);
    ctx.shadowBlur = 0;

    // Gold divider
    var divY = panY + titleSz * 2.20;
    var gDiv = ctx.createLinearGradient(textX, 0, textX + textW, 0);
    gDiv.addColorStop(0,'rgba(255,215,0,0)');
    gDiv.addColorStop(0.25,'rgba(255,215,0,0.75)');
    gDiv.addColorStop(0.75,'rgba(255,215,0,0.75)');
    gDiv.addColorStop(1,'rgba(255,215,0,0)');
    ctx.strokeStyle = gDiv; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(textX+8, divY); ctx.lineTo(textX+textW-8, divY); ctx.stroke();

    // Controls table
    var rows = [
      { k: '\u2190 \u2192 / Mouse',  d: 'Move your ship',               c: '#55CCFF' },
      { k: 'SPACE / Click',          d: 'Fire main weapon',              c: '#55CCFF' },
      { k: 'X',                      d: 'Launch rocket (limited)',       c: '#FFAA33' },
      { k: 'M',                      d: 'Mute / unmute music',           c: '#FFEE44' },
      null,
      { k: 'S',          d: 'Save  +  change ship',                     c: '#33FF88' },
      { k: 'O',          d: 'Enter code — return to stage',             c: '#33FFEE' },
      { k: 'ESC',        d: 'Pause  \u2022  see stage code',           c: '#FF9944' },
      null,
      { k: 'Coins \u25BC', d: 'Power-up weapons',                       c: '#FFD700' },
      { k: 'Lives \u2665', d: '3 lives — top-right',                    c: '#FF5577' },
      { k: 'Wingmen',      d: 'Backup ships beside you',                c: '#66FFCC' },
      { k: 'Code',         d: 'Write it down to return!',               c: '#CC77FF' },
    ];

    var availH = panH - titleSz * 2.4 - 34;
    var fsSm = Math.round(Math.min(13, textW / 18, availH / rows.length * 0.56));
    fsSm = Math.max(fsSm, 9);
    var rowH = Math.round(availH / rows.length);
    var startY = divY + rowH * 0.58;

    // Key pills right-aligned at textX + textW*0.44, descriptions from there
    var kRightX = textX + Math.round(textW * 0.44);
    var dLeftX  = kRightX + Math.round(fsSm * 0.65);

    for(var ri = 0; ri < rows.length; ri++) {
      var row = rows[ri];
      var ry = startY + ri * rowH;
      if(!row) continue;

      ctx.font = 'bold ' + fsSm + 'px Arial';
      var kTw   = ctx.measureText(row.k).width;
      var kPad  = Math.round(fsSm * 0.50);
      var pillW = kTw + kPad * 2;
      var pillX = kRightX - pillW - 2;
      var pillY = ry - Math.round(fsSm * 0.68);
      var pillH = Math.round(fsSm * 1.42);

      ctx.save();
      ctx.globalAlpha = 0.90;
      ctx.fillStyle = 'rgba(0,20,55,0.95)';
      ctx.strokeStyle = row.c; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.rect(pillX, pillY, pillW, pillH);
      ctx.fill(); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = row.c; ctx.shadowColor = row.c; ctx.shadowBlur = 6;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(row.k, pillX + pillW/2, ry);
      ctx.restore();

      ctx.font = fsSm + 'px Arial';
      ctx.fillStyle = '#E8F4FF';
      ctx.shadowColor = 'rgba(100,180,255,0.35)'; ctx.shadowBlur = 3;
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(row.d, dLeftX, ry);
      ctx.shadowBlur = 0;
    }

    // "Press SPACE" prompt
    var cp = 0.40 + 0.60 * Math.sin(_t * 3.0);
    var promptSz = Math.round(Math.min(15, fsSm * 1.15));
    ctx.globalAlpha = cp;
    ctx.font = 'bold ' + promptSz + 'px Arial';
    ctx.fillStyle = '#FFFFFF'; ctx.shadowColor = '#00AAFF'; ctx.shadowBlur = 10;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('\u25BA  PRESS  SPACE  TO  START  \u25C4', textCX, panY + panH - Math.round(promptSz * 1.5));
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    ctx.restore();
  };
};
// ────────────────────────────────────────────────────────────────────────────────

var startGame = function() {
  // Initialize sound system and immediately attempt to start music.
  // If autoplay is blocked, sound.js will retry on the first user gesture.
  SoundManager.init();
  SoundManager.startMusic();

  var ua = navigator.userAgent.toLowerCase();

  // Εμφανές τεστ: κάνε το background κόκκινο
  var canvas = document.getElementById('game');
  if(canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ff2222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
  // Starfields + Background objects (all behind enemies)
  Game.setBoard(0,new Starfield(20,0.5,350,true));
  Game.setBoard(1,new Starfield(50,0.7,280));
  Game.setBoard(1.5,new StarFlareSystem());        // Soft distant star light pulses — behind everything
  Game.setBoard(1.8,new PixelCloudSystem(false));  // Deep background pixel clouds (behind planets)
  Game.setBoard(1.85,new MavrisRotatingBackdrop()); // Tribal symbols — slow rotation, every 3 levels
  // CloudSystem disabled — cloud images deleted
  Game.setBoard(2,new BackgroundObjectsSystem()); // Planets, asteroids, rocks + shooting stars/comets
  if(!Game.mobile) {
    Game.setBoard(2.5,new EnergyParticlesSystem()); // Desktop only (performance)
  }
  var startPrompt = Game.mobile
    ? ["Tap FIRE button to start", "Tap \u2630 to change ship"]
    : ["Press fire to start playing", "Press [S] to change ship anytime"];

  // Check for saved progress in localStorage
  var _savedGame = _loadProgressFromStorage();
  if(_savedGame && _savedGame.stage > 0) {
    if(Game.mobile) {
      startPrompt = startPrompt.concat(['\u25B6 SAVED: Stage ' + _savedGame.stage]);
    } else {
      startPrompt = startPrompt.concat(
        ['\u25B6 SAVED: Stage ' + _savedGame.stage + '   Code: ' + (_savedGame.code || ''),
         'Press [O] to open  \u2022  [V] for different code']);
    }
  } else {
    if(!Game.mobile) startPrompt = startPrompt.concat(['Press [V] to enter a stage code']);
  }

  // Title screen keydown handler for C (continue) and V (enter code)
  var _titleKeyH = function(e) {
    // O = open code input screen (with saved code pre-shown as hint)
    if((e.key === 'o' || e.key === 'O')) {
      e.preventDefault();
      window.removeEventListener('keydown', _titleKeyH);
      Game.setBoard(9.1, null);
      var _hint = (_savedGame && _savedGame.code) ? _savedGame.code : '';
      Game.setBoard(10, new CodeInputScreen(
        function(decoded) {
          Game.setBoard(10, null);
          _isNewGame = false;
          playerLives = PLAYER_LIVES; Game.points = 0; sessionKills = 0;
          _savedPowerUps = _buildSavedPowerUpsFromCode(decoded);
          currentLevel = decoded.stage;
          SoundManager.resume(); SoundManager.ensureMusic(); SoundManager.playTitleIntro();
          Game.setBoard(9, new LevelTransitionScreen(currentLevel - 1, currentLevel, playGame, allAlienPool.slice(0, 6)));
        },
        function() {
          Game.setBoard(10, null);
          window.addEventListener('keydown', _titleKeyH);
        },
        _hint
      ));
    }
    // C = continue from localStorage save
    if(e.keyCode === 67 && _savedGame && _savedGame.stage > 1) {
      e.preventDefault();
      window.removeEventListener('keydown', _titleKeyH);
      Game.setBoard(9.1, null);
      var decoded = { stage: _savedGame.stage, activePowerIdx: _savedGame.activeIdx || 0,
                      queueLen: _savedGame.queueLen || 0, wingmenCount: _savedGame.wingmen || 0 };
      _isNewGame = false;  // prevent playGame() from wiping _savedPowerUps
      playerLives = PLAYER_LIVES; Game.points = 0; sessionKills = 0; // fresh run from saved stage
      _savedPowerUps = _buildSavedPowerUpsFromCode(decoded);
      currentLevel = _savedGame.stage;
      SoundManager.resume(); SoundManager.ensureMusic(); SoundManager.playTitleIntro();
      var _pool = allAlienPool.slice(0, 6);
      Game.setBoard(9, new LevelTransitionScreen(currentLevel - 1, currentLevel, playGame, _pool));
    }
    // V = open code input screen
    if(e.keyCode === 86) {
      e.preventDefault();
      window.removeEventListener('keydown', _titleKeyH);
      Game.setBoard(9.1, null);
      Game.setBoard(10, new CodeInputScreen(
        function(decoded) {
          Game.setBoard(10, null);
          _isNewGame = false;  // prevent playGame() from wiping _savedPowerUps
          playerLives = PLAYER_LIVES; Game.points = 0; sessionKills = 0;
          _savedPowerUps = _buildSavedPowerUpsFromCode(decoded);
          currentLevel = decoded.stage;
          SoundManager.resume(); SoundManager.ensureMusic(); SoundManager.playTitleIntro();
          var _pool = allAlienPool.slice(0, 6);
          Game.setBoard(9, new LevelTransitionScreen(currentLevel - 1, currentLevel, playGame, _pool));
        },
        function() {
          Game.setBoard(10, null);
          window.addEventListener('keydown', _titleKeyH);
        }
      ));
    }
  };
  window.addEventListener('keydown', _titleKeyH);

  Game.setBoard(9,new TitleScreen("Alien Invasion", startPrompt, function() {
    _isNewGame = true;
    window.removeEventListener('keydown', _titleKeyH);
    Game.setBoard(9.1, null); // remove key legend
    // First user gesture — start music immediately and play an intro creature sound
    SoundManager.resume();         // un-suspend AudioContext (needed for SFX)
    SoundManager.ensureMusic();    // force-play if autoplay was blocked
    SoundManager.playTitleIntro(); // dragon / spirit sound right as game begins
    var _initPool = allAlienPool.slice(0, 6); // first 6 sprites = level 1 enemies
    // Show Instructions screen first, then go to Level 1 transition
    Game.setBoard(9, new InstructionsScreen(function() {
      Game.setBoard(9, new LevelTransitionScreen(0, 1, playGame, _initPool));
    }));
  }, { titleY: Game.height * 0.18 }));
};

// Current level tracker
var currentLevel = 1;
var _levelsSinceLastWheel = 0; // guarantee: wheel appears at least once every 10 levels
var _isNewGame = true; // true only when starting fresh from title screen / after loss / after win
var _drakiStageCount = 0; // counts every playGame call — draki coin spawns every 2 stages
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

// ============================================================
// ===== FINAL BOSS STAGE =====================================
// Appears after every bonus stage. Large boss + shield walls.
// ============================================================

var _FINAL_BOSS_ENEMY_DIR = 'images/EXTHRI KIA TA TELIKA STAGE/';
var _FINAL_BOSS_BG_DIR    = 'images/STAGE OF THE FINELS STAPS/';

var _FINAL_BOSS_ENEMY_FILES = [
  'Remove_background-1772876154694.webp',
  'Remove_background-1772876175262.webp',
  'Remove_background-1772876180432.webp',
  'Remove_background-1772876184580.webp',
  'Remove_background-1772876188247.webp',
  'Remove_background-1772876192050.webp',
  'Remove_background-1772876196081.webp',
  'Remove_background-1772876200279.webp',
  'Remove_background-1772876207351.webp',
  'Remove_background-1772876214000.webp',
  'Remove_background-1772876218047.webp',
  'Remove_background-1772876222084.webp',
  'Remove_background-1772876225700.webp',
  'Remove_background-1772876230034.webp',
  'Remove_background-1772876233618.webp',
  'Remove_background_from_this_image_to_create_a_full-1772862301193.webp',
  'Remove_background_from_this_image_to_create_transp-1772835057964.webp',
  'Remove_background_from_this_image_to_create_transp-1772835091812.webp',
  'Remove_background_from_this_image_to_create_transp-1772835136764.webp',
  'Remove_background_from_this_image_to_create_transp-1772835185422.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862306443.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862311027.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862315377.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862319016.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862322894.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862326327.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862330928.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862334259.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862338827.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862342049.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862346931.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862350912.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862354730.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862358726.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862362532.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862365759.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862369778.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862373396.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862377096.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862380514.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862385098.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862389267.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862393617.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862398064.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862401449.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862405814.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862410246.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862413982.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862417815.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862422866.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862427432.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862431135.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862435301.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862439851.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862443784.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862447717.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862451716.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862455216.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862459334.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862463417.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862467967.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862471952.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862476068.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862480220.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862484137.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862487519.webp',
  'Remove_background_to_create_fully_transparent_PNG-1772862491103.webp',
  'Remove_background_to_create_transparent_PNG-1772829975817.webp',
  'Remove_background_to_create_transparent_PNG-1772829993531.webp',
  'Remove_background_to_create_transparent_PNG-1772830264765.webp',
  'Remove_background_to_create_transparent_PNG-1772830295212.webp',
  'Remove_background_to_create_transparent_PNG-1772831404984.webp',
  'Remove_background_to_create_transparent_PNG-1772832330168.webp',
  'Remove_background_to_create_transparent_PNG-1772832454780.webp'
];

var _FINAL_BOSS_BG_FILES = [
  'Alien_supernatural_hovering_creature_with_enormous-1772880535742.webp',
  'Awe-inspiring_alien_supernatural_hovering_being_wi-1772880556772.webp',
  'Awe-inspiring_alien_supernatural_hovering_being_wi-1772880564242.webp',
  'Powerful_alien_supernatural_creature_floating_weig-1772880547180.webp',
  'Mystical_alien_supernatural_hovering_entity_with_i-1772880552355.webp',
  'Ethereal_alien_supernatural_hovering_being_with_co-1772880541274.webp',
  'Transcendent_alien_supernatural_hovering_being_wit-1772880571143.webp',
  'Celestial_alien_supernatural_creature_hovering_wei-1772880576360.webp',
  'Majestic_alien_supernatural_creature_floating_weig-1772880582527.webp',
  'Spectacular_alien_supernatural_hovering_being_with-1772880587412.webp',
  'Celestial_alien_supernatural_creature_hovering_wei-1772880596327.webp',
  'Spectacular_alien_supernatural_hovering_entity_wit-1772880602458.webp',
  'Majestic_alien_supernatural_creature_floating_with-1772880608361.webp',
  'Legendary_alien_supernatural_creature_levitating_g-1772880613627.webp',
  'Spectacular_alien_supernatural_hovering_being_with-1772880622696.webp',
  'Celestial_alien_supernatural_creature_hovering_wei-1772880629564.webp',
  'Divine_alien_supernatural_creature_floating_with_m-1772880636765.webp',
  'Spectacular_alien_supernatural_hovering_being_with-1772880640747.webp',
  'Transcendent_alien_supernatural_hovering_entity_wi-1772880646965.webp',
  'Legendary_alien_supernatural_creature_levitating_w-1772880653763.webp',
  'Transcendent_alien_supernatural_hovering_entity_wi-1772880664547.webp',
  'A_breathtaking_alien_supernatural_being_hovering_g-1772880812024.webp',
  'An_imposing_alien_supernatural_entity_suspended_el-1772880834856.webp',
  'A_breathtaking_alien_supernatural_being_hovering_g-1772880844143.webp',
  'A_majestic_alien_supernatural_being_floating_seren-1772880848774.webp',
  'A_spectacular_alien_supernatural_being_hovering_ma-1772880853626.webp',
  'A_commanding_alien_supernatural_entity_floating_po-1772880857526.webp',
  'A_magnificent_alien_supernatural_being_suspended_g-1772880863196.webp',
  'A_breathtaking_alien_supernatural_being_hovering_m-1772880867527.webp',
  'A_spectacular_alien_supernatural_entity_floating_s-1772880871349.webp',
  'A_majestic_alien_supernatural_being_suspended_powe-1772880875326.webp',
  'A_commanding_alien_supernatural_being_hovering_maj-1772880879560.webp',
  'A_breathtaking_alien_supernatural_being_hovering_g-1772880886541.webp',
  'An_imposing_alien_supernatural_entity_suspended_el-1772880891244.webp',
  'A_majestic_alien_supernatural_being_floating_seren-1772880896531.webp',
  'A_spectacular_alien_supernatural_being_hovering_ma-1772880901112.webp',
  'A_commanding_alien_supernatural_entity_floating_po-1772880904246.webp',
  'A_magnificent_alien_supernatural_being_suspended_g-1772880909277.webp',
  'A_breathtaking_alien_supernatural_being_hovering_m-1772880913329.webp',
  'A_spectacular_alien_supernatural_entity_floating_s-1772880916749.webp',
  'A_majestic_alien_supernatural_being_suspended_powe-1772880920483.webp',
  'A_commanding_alien_supernatural_being_hovering_maj-1772880924583.webp',
  'A_breathtaking_alien_supernatural_being_hovering_g-1772880931878.webp',
  'An_imposing_alien_supernatural_entity_suspended_el-1772880937470.webp',
  'A_majestic_alien_supernatural_being_floating_seren-1772880941063.webp',
  'A_spectacular_alien_supernatural_being_hovering_ma-1772880945928.webp',
  'A_commanding_alien_supernatural_entity_floating_po-1772880950930.webp',
  'A_magnificent_alien_supernatural_being_suspended_g-1772880956666.webp',
  'A_breathtaking_alien_supernatural_being_hovering_m-1772880961180.webp',
  'A_spectacular_alien_supernatural_entity_floating_s-1772880965495.webp',
  'A_majestic_alien_supernatural_being_suspended_powe-1772880970047.webp',
  'A_commanding_alien_supernatural_being_hovering_maj-1772880973746.webp',
  'Photorealistic_supernatural_alien_figure_floating_-1772881035584.webp',
  'Photorealistic_alien_supernatural_entity_in_floati-1772881042309.webp',
  'Majestic_alien_supernatural_celestial_being_floati-1772881100469.webp',
  'Otherworldly_alien_supernatural_divine_entity_hove-1772881105054.webp',
  'Majestic_alien_supernatural_celestial_being_floati-1772881143505.webp',
  'Otherworldly_alien_supernatural_divine_entity_hove-1772881147707.webp',
  'A_full-body_hunched_demonic_skeleton_vampire_creat-1772881320952.webp',
  'A_full-body_curled_demonic_skeleton_vampire_creatu-1772881324441.webp',
  'A_full-body_crouched_demonic_skeleton_vampire_crea-1772881332000.webp',
  'A_full-body_hunched_demonic_skeleton_vampire_creat-1772881335831.webp',
  'Remove_only_the_outer_background_keep_the_glowing-1772881346154.webp',
  'A_full-body_coiled_demonic_skeleton_vampire_creatu-1772881356552.webp',
  'A_full-body_coiled_demonic_skeleton_vampire_creatu-1772881358154.webp',
  'A_full-body_demonic_skeleton_vampire_creature_with-1772881368334.webp',
  'A_full-body_demonic_skeleton_vampire_creature_with-1772881370202.webp',
  'Remove_only_the_outer_background_keep_the_glowing-1772881382773.webp',
  'Remove_background-1772881396537.webp',
  'Remove_background-1772881401998.webp',
  'Remove_background-1772881415790.webp',
  'Remove_background-1772881418771.webp',
  'Remove_background-1772881426772.webp',
  'A_full-body_demonic_skeleton_vampire_creature_with-1772881435089.webp',
  'A_full-body_demonic_skeleton_vampire_creature_with-1772881444926.webp',
  'A_full-body_demonic_skeleton_vampire_creature_with-1772881455353.webp',
  'A_full-body_demonic_skeleton_vampire_creature_with-1772881466078.webp',
  'Remove_background-1772881471442.webp',
  'A_full-body_demonic_skeleton_vampire_creature_with-1772881488497.webp',
  'A_full-body_demonic_skeleton_vampire_creature_with-1772881499300.webp',
  'A_full-body_demonic_skeleton_vampire_creature_with-1772881500679.webp',
  'Remove_background-1772881508513.webp',
  'A_full-body_demonic_skeleton_vampire_creature_with-1772881516573.webp',
  'A_full-body_demonic_skeleton_vampire_creature_with-1772881531156.webp',
  'Remove_background-1772881542483.webp',
  'A_full-body_demonic_skeleton_vampire_creature_with-1772881546722.webp',
  'Remove_background-1772881563362.webp',
  'A_full-body_frontal_portrait_of_a_demonic_skeleton-1772881284892.webp',
  'Remove_background-1772881291782.webp',
  'Remove_only_the_outer_background_keep_the_blood-r-1772881303917.webp',
  'Remove_only_the_outer_background_keep_the_glowing-1772881307565.webp'
];

var _finalBossAppearanceCount = 0;
var _finalBossEnemyOrderIdx = 0;
var _finalBossEnemyOrder = [];
var _finalBossBgOrderIdx = 0;
var _finalBossBgOrder = [];

function _fbShuffleArr(arr) {
  for(var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
}
function _fbNextEnemy() {
  if(!_finalBossEnemyOrder.length) {
    for(var i = 0; i < _FINAL_BOSS_ENEMY_FILES.length; i++) _finalBossEnemyOrder.push(i);
    _fbShuffleArr(_finalBossEnemyOrder);
  }
  var idx = _finalBossEnemyOrder[_finalBossEnemyOrderIdx];
  _finalBossEnemyOrderIdx = (_finalBossEnemyOrderIdx + 1) % _finalBossEnemyOrder.length;
  if(_finalBossEnemyOrderIdx === 0) _fbShuffleArr(_finalBossEnemyOrder);
  return _FINAL_BOSS_ENEMY_DIR + _FINAL_BOSS_ENEMY_FILES[idx];
}
function _fbNextBg() {
  if(!_finalBossBgOrder.length) {
    for(var i = 0; i < _FINAL_BOSS_BG_FILES.length; i++) _finalBossBgOrder.push(i);
    _fbShuffleArr(_finalBossBgOrder);
  }
  var idx = _finalBossBgOrder[_finalBossBgOrderIdx];
  _finalBossBgOrderIdx = (_finalBossBgOrderIdx + 1) % _finalBossBgOrder.length;
  if(_finalBossBgOrderIdx === 0) _fbShuffleArr(_finalBossBgOrder);
  return _FINAL_BOSS_BG_DIR + _FINAL_BOSS_BG_FILES[idx];
}

// --- Shield wall colors ---
var _SHIELD_COLORS = ['#FF1166','#00FFB3','#FFEE00','#FF6600','#9900FF','#00AAFF'];

// --- BossShieldWall ---
// Blocks PLAYER_PROJECTILE shots but lets ENEMY_PROJECTILE pass through.
var BossShieldWall = function(x, y, w, h, color) {
  this.x = x; this.y = y;
  this.w = w; this.h = h;
  this.color = color;
  this.type = OBJECT_BOSS_SHIELD;
  this._pulseT = Math.random() * TAU;
  this._mutateTimer = 3 + Math.random() * 4;
};
BossShieldWall.prototype.step = function(dt) {
  this._pulseT += dt * 2.5;
  this._mutateTimer -= dt;
  if(this._mutateTimer <= 0) {
    var nc; do { nc = _SHIELD_COLORS[Math.floor(Math.random() * _SHIELD_COLORS.length)]; } while(nc === this.color);
    this.color = nc;
    this._mutateTimer = 2 + Math.random() * 3;
  }
  // Absorb one player shot per frame
  var shot = this.board.collide(this, OBJECT_PLAYER_PROJECTILE);
  if(shot) this.board.remove(shot);
};
BossShieldWall.prototype.draw = function(ctx) {
  var pulse = 0.72 + 0.28 * Math.abs(Math.sin(this._pulseT));
  ctx.save();
  ctx.globalAlpha = pulse;
  ctx.fillStyle = this.color;
  ctx.shadowColor = this.color;
  ctx.shadowBlur = 20;
  ctx.fillRect(this.x, this.y, this.w, this.h);
  ctx.globalAlpha = pulse * 0.45;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(this.x, this.y, this.w, Math.min(5, Math.round(this.h * 0.3)));
  ctx.restore();
};

// --- FinalBossEnemy ---
var FinalBossEnemy = function(img, duration) {
  var bossW = Math.round(Game.width * 0.28);
  this.w = bossW; this.h = bossW;
  this.type = OBJECT_ENEMY;
  var basehp = 350 + _finalBossAppearanceCount * 100;
  this.health = basehp; this.maxHealth = basehp;
  this._shootTimer = 1.5;
  this._baseShootInterval = Math.max(0.5, 1.8 - _finalBossAppearanceCount * 0.1);
  this._hitFlash = 0;
  this._t = 0;
  this._dead = false;
  this._drawW = bossW; this._drawH = bossW;
  this._img = img;
  this._imgReady = false;
  // Waypoint steering movement
  this._vx = 0; this._vy = 0;
  this._wx = Game.width * 0.5;       // current waypoint x (center of boss)
  this._wy = Game.height * 0.15;     // current waypoint y
  this._wpTimer = 0;                 // time until next waypoint
  this._speedPhase = Math.random() * TAU;
  this._baseSpeed = 160 + _finalBossAppearanceCount * 10;
  // Sway oscillation on top of steering
  this._swayPh = Math.random() * TAU;
  this._swayFr = 1.1 + Math.random() * 0.8;
  this.x = Game.width / 2 - bossW / 2;
  this.y = Game.height * 0.06;
  var self = this;
  if(img && img.complete && img.naturalWidth) {
    var ar = img.naturalWidth / img.naturalHeight;
    self._drawH = Math.round(bossW / ar);
    self._imgReady = true;
  } else if(img) {
    img.onload = function() {
      var ar = img.naturalWidth / img.naturalHeight;
      self._drawH = Math.round(bossW / ar);
      self._imgReady = true;
    };
  }
};
FinalBossEnemy.prototype.step = function(dt) {
  if(this._dead) return;
  this._t += dt;

  // ---- Waypoint steering ----
  this._wpTimer -= dt;
  if(this._wpTimer <= 0) {
    // Pick a new random waypoint in upper 58% of screen
    var attempts = 0, nx, ny;
    do {
      nx = Game.width  * (0.06 + Math.random() * 0.88) - this._drawW / 2;
      ny = Game.height * (0.04 + Math.random() * 0.52);
      attempts++;
      // Avoid getting within 160px of player
    } while(playerShip &&
      Math.abs((nx + this._drawW / 2) - (playerShip.x + 20)) < 160 &&
      Math.abs((ny + this._drawH / 2) - (playerShip.y + 20)) < 160 &&
      attempts < 12);
    this._wx = nx;
    this._wy = ny;
    // Randomise hold time: sometimes quick burst, sometimes lingers
    this._wpTimer = 0.6 + Math.random() * 2.2;
  }

  // Speed oscillation: sometimes fast surge, sometimes slow drift
  var speedMul = 0.45 + 0.80 * (0.5 + 0.5 * Math.sin(this._t * 0.55 + this._speedPhase))
                      + 0.35 * Math.abs(Math.sin(this._t * 1.3));
  var spd = this._baseSpeed * speedMul;

  // Steer toward waypoint with smooth acceleration
  var dx = this._wx - this.x;
  var dy = this._wy - this.y;
  var dist = Math.sqrt(dx * dx + dy * dy) || 1;
  var nx2 = dx / dist, ny2 = dy / dist;
  var accel = 3.5 + 1.5 * speedMul; // snappier when fast
  this._vx += (nx2 * spd - this._vx) * Math.min(1, accel * dt);
  this._vy += (ny2 * spd - this._vy) * Math.min(1, accel * dt);

  // Small sideways sway on top (organic feel)
  var sway = Math.sin(this._t * this._swayFr + this._swayPh) * 28;
  this.x += (this._vx + sway) * dt;
  this.y += this._vy * dt;

  // Player repulsion — never slam into the player
  if(playerShip) {
    var px = playerShip.x + 20, py = playerShip.y + 20;
    var bx = this.x + this._drawW / 2, by = this.y + this._drawH / 2;
    var sep = Math.sqrt((bx - px) * (bx - px) + (by - py) * (by - py));
    if(sep < 140) {
      var rx = (bx - px) / sep, ry = (by - py) / sep;
      this._vx += rx * 380 * dt;
      this._vy += ry * 380 * dt;
      // Redirect waypoint away from player
      this._wx = Math.max(4, Math.min(Game.width - this._drawW - 4, this.x + rx * 220));
      this._wy = Math.max(4, Math.min(Game.height * 0.56, this.y + ry * 180));
      this._wpTimer = 0.4;
    }
  }

  // Clamp to screen
  this.x = Math.max(4, Math.min(Game.width  - this._drawW - 4, this.x));
  this.y = Math.max(4, Math.min(Game.height * 0.60, this.y));

  // ---- Shooting ----
  this._shootTimer -= dt;
  if(this._shootTimer <= 0) {
    var interval = Math.max(0.38, this._baseShootInterval - this._t * 0.008);
    this._shootTimer = interval;
    var sx = this.x + this._drawW / 2, sy = this.y + this._drawH;
    // Always aimed, spread at low HP
    this.board.add(new EnemyMissile(sx, sy, { aimed: true, shotType: 'aimed', speed: 230 }));
    if(this.health < this.maxHealth * 0.65) {
      this.board.add(new EnemyMissile(sx, sy, { aimed: true, angleOffset: -0.28, shotType: 'spread', speed: 210 }));
      this.board.add(new EnemyMissile(sx, sy, { aimed: true, angleOffset:  0.28, shotType: 'spread', speed: 210 }));
    }
  }

  if(this._hitFlash > 0) this._hitFlash -= dt * 5;

  // Collision damage on player touch
  var pHit = this.board.collide(this, OBJECT_PLAYER);
  if(pHit && pHit.hit) pHit.hit(20);

  if(this.health <= 0 && !this._dead) {
    this._dead = true;
    Game.points += 2500 + _finalBossAppearanceCount * 500;
    for(var _e = 0; _e < 8; _e++) {
      this.board.add(new Explosion(this.x + Math.random() * this._drawW, this.y + Math.random() * this._drawH));
    }
    Game.shake(14, 0.7);
    this.board.remove(this);
  }
};
FinalBossEnemy.prototype.hit = function(dmg) {
  if(this._dead) return;
  this.health -= (Game.pharaohActive ? dmg * 3 : dmg);
  this._hitFlash = 1;
  SoundManager.playImpact();
  Game.shake(3, 0.12);
};
FinalBossEnemy.prototype.draw = function(ctx) {
  if(this._dead) return;
  if(!this._imgReady) return;
  ctx.save();
  var imgX = Math.round(this.x);
  var imgY = Math.round(this.y);
  ctx.globalAlpha = 1;
  if(this._hitFlash > 0) ctx.filter = 'brightness(' + (1 + this._hitFlash * 3.0) + ') saturate(0.05)';
  ctx.drawImage(this._img, imgX, imgY, this._drawW, this._drawH);
  ctx.filter = 'none';
  ctx.restore();
};

// --- FinalBossStage manager ---
var _BOSS_PLANET_COLORS = ['#4466FF','#FF6633','#88FFCC','#FFD700','#CC88FF','#FF88BB'];

var FinalBossStage = function(bgImg, onComplete) {
  this._bgImg = bgImg;
  this._bgReady = !!(bgImg && bgImg.complete && bgImg.naturalWidth);
  this.onComplete = onComplete;
  this.active = true;
  _finalBossAppearanceCount++;
  this.duration = Math.min(50, 29 + _finalBossAppearanceCount); // 30s first, +1s each, max 50s at stage 21
  this.timer = this.duration;
  this._fadeInAlpha = 1;
  this._fadeInDur   = 1.5;
  this._coinTimer = 2.0;
  this._boss = null;

  this._bossKilledTimer = 0;
  if(bgImg && !bgImg.complete) {
    var self = this;
    bgImg.onload = function() { self._bgReady = true; };
  }
};
FinalBossStage.prototype.init = function(board) {
  this.board = board;
  // Spawn boss (image loaded in startFinalBossStage)
  var bossImg = new Image();
  this._boss = new FinalBossEnemy(bossImg, this.duration);
  bossImg.src = _fbNextEnemy();
  board.add(this._boss);
};
FinalBossStage.prototype._endStage = function() {
  if(!this.active) return;
  this.active = false;
  this.board.remove(this);
  if(this.onComplete) this.onComplete();
};
FinalBossStage.prototype.step = function(dt) {
  if(!this.active) return;
  this.timer -= dt;
  this._fadeInAlpha = Math.max(0, this._fadeInAlpha - dt / this._fadeInDur);
  // Coin drops
  this._coinTimer -= dt;
  if(this._coinTimer <= 0) {
    this._coinTimer = 1.8 + Math.random() * 1.5;
    this.board.add(new PowerUp(Game.width * (0.1 + Math.random() * 0.8), -40));
  }
  // Early end if boss killed
  if(this._boss && this._boss._dead) {
    if(!this._bossKilledTimer) this._bossKilledTimer = 2.0;
    this._bossKilledTimer -= dt;
    if(this._bossKilledTimer <= 0) { this._endStage(); return; }
  }
  if(this.timer <= 0) this._endStage();
};
FinalBossStage.prototype.draw = function(ctx) {
  var gw = Game.width, gh = Game.height;
  // Background — solid fill so no underlying boards show through
  ctx.fillStyle = '#04000A';
  ctx.fillRect(0, 0, gw, gh);
  if(this._bgReady && this._bgImg && this._bgImg.naturalWidth) {
    var iw = this._bgImg.naturalWidth, ih = this._bgImg.naturalHeight;
    // Cover mode: image fills entire screen, cropped if needed
    var scale = Math.max(gw / iw, gh / ih);
    var dw = iw * scale, dh = ih * scale;
    var dx = (gw - dw) / 2, dy = (gh - dh) / 2;
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, gw, gh); ctx.clip();
    ctx.drawImage(this._bgImg, dx, dy, dw, dh);
    ctx.restore();
  }
  // Big countdown number (no bar)
  ctx.save();
  ctx.textAlign = 'center';
  var secs = Math.ceil(Math.max(0, this.timer));
  var numSz = Math.round(gw * 0.13);
  ctx.font = 'bold ' + numSz + 'px Arial Black, Arial';
  ctx.globalAlpha = 0.88;
  ctx.fillStyle = secs <= 10 ? '#FF4400' : '#FF3388';
  ctx.shadowColor = ctx.fillStyle;
  ctx.shadowBlur = 22;
  ctx.textBaseline = 'top';
  ctx.fillText(secs, gw / 2, 8);
  ctx.restore();
  // Fade-in overlay
  if(this._fadeInAlpha > 0) {
    ctx.globalAlpha = this._fadeInAlpha;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, gw, gh);
    ctx.globalAlpha = 1;
  }
};

var startFinalBossStage = function(onDone) {
  if(!SoundManager.isMusicPlaying()) SoundManager.startMusic();
  if(playerShip) _savePowerUpsFromCurrentShip();
  var bgImg = new Image();
  var stage = new FinalBossStage(bgImg, function() {
    SoundManager.playLevelComplete();
    var prompt = Game.mobile ? 'Tap FIRE to continue' : 'Press FIRE to continue';
    var _cont = function() {
      Game.setBoard(20, new ScreenFade('out', 0.4, function() {
        if(onDone) onDone(); else playGame();
      }));
    };
    Game.setBoard(9, new TitleScreen('\u2605 BOSS STAGE CLEAR! \u2605', prompt, _cont, {
      fadeIn: true, fadeInDuration: 2.0, duration: 4, showProgressBar: true
    }));
  });
  bgImg.src = _fbNextBg();
  var board = new GameBoard();
  board.add(stage);
  stage.init(board);
  board.add(new PlayerShip());
  Game.setBoard(9, board);
  Game.setBoard(15, new GamePoints(0));
  Game.setBoard(16, new GameLives());
  Game.setBoard(17, null);
  Game.setBoard(18, null);
  Game.setBoard(20, new ScreenFade('in', 0.6));
};

// ============================================================

var startBonusStage = function() {
  if(!SoundManager.isMusicPlaying()) SoundManager.startMusic();
  if(playerShip) _savePowerUpsFromCurrentShip(); // μόνο αν μπαίνουμε από debug (B)· αλλιώς _savedPowerUps ήδη από level complete
  var board = new GameBoard();
  // VideoBonusStage added FIRST so its draw() runs before PlayerShip/enemies (= video is background)
  var vbs = new VideoBonusStage(function(kills, bonusPts) {
    SoundManager.playLevelComplete();
    var msg = 'Kills: ' + kills + '   +' + bonusPts + ' pts';
    var prompt = Game.mobile ? 'Tap FIRE for Level ' + currentLevel : 'Press fire for Level ' + currentLevel;
    var onContinue = function() {
      Game.setBoard(20, new ScreenFade('out', 0.45, function() {
        Game.setBoard(9.5, null); // αφαίρεση κοπελών μόνο όταν φεύγει η οθόνη «Τέλος Bonus Stage»
        startFinalBossStage(playGame); // Final Boss Stage after every bonus stage
      }));
    };
    Game.setBoard(9, new TitleScreen('\u03a4\u03ad\u03bb\u03bf\u03c2 Bonus Stage!', msg + '  |  ' + prompt, onContinue, {
      fadeIn: true,
      fadeInDuration: 2.5,
      duration: 5,
      showProgressBar: true
    }));
  });
  board.add(vbs);
  vbs.init(board); // must call init() explicitly — board.add() does NOT call init()
  board.add(new PlayerShip());
  _restoreWingmenToBoard(board);
  Game.setBoard(9, board);
  // No AtmosphericCloudSystem — video IS the background
  Game.setBoard(15, new GamePoints(0));
  Game.setBoard(16, new GameLives());
  Game.setBoard(17, new GameLevel());
  Game.setBoard(18, new ActivePowerQueueDisplay());
  Game.setBoard(20, new ScreenFade('in', 0.55));
};

// Escape during gameplay → pause + show stage code
window.addEventListener('keydown', function(e) {
  if(e.keyCode === 27 && Game.playing && !Game.paused && !Game.shipSelectOpen && playerShip) {
    e.preventDefault();
    Game.setBoard(12, new PauseCodeScreen());
  }
});

// DEBUG shortcut: press 'B' during gameplay to jump straight to bonus stage
window.addEventListener('keydown', function(e) {
  if(e.keyCode === 66 && Game.playing && !Game.paused) {
    startBonusStage();
  }
  // DEBUG: press 'P' anytime to jump straight to video/flower bonus stage
  if(e.keyCode === 80) {
    startBonusStage();
  }
  // DEBUG: press 'F' anytime to jump straight to Final Boss Stage (secret test key)
  if(e.keyCode === 70) {
    startFinalBossStage(playGame);
  }
  // DEBUG: press 'Y' during gameplay to trigger a random Topia Bonus Stage (no fade — instant switch for testing)
  if(e.keyCode === 89 && Game.playing && !Game.paused) {
    var _dbgFolder = _topiaNextFolder();
    startTopiaExtraBonusStage(_dbgFolder, true);
  }
  // DEBUG: press 'W' anytime to jump straight to Wheel of Fortune
  if(e.keyCode === 87) {
    Game.setBoard(9, new WheelBonusScreen(currentLevel || 8, playGame));
    Game.setBoard(20, new ScreenFade('in', 0.5));
  }
  // DEBUG: press 'X' to jump straight to level 5 (nenes3 continuous morph stage)
  if(e.keyCode === 88) {
    _isNewGame = false;
    currentLevel = 5;
    playGame();
  }
});

// ===== TOPIA EXTRA BONUS STAGE =====
var _topiaExtraBonusQueued = false;

var startTopiaExtraBonusStage = function(folderImages, _noFadeIn) {
  if(!SoundManager.isMusicPlaying()) SoundManager.startMusic();
  _topiaExtraBonusQueued = false; // safety reset — topia is now starting
  SoundManager.playPortalOpen();   // A — Portal Open: entering photo stage
  SoundManager.setTopiaMode(true); // G — Meteor Impact: player shoot sound in topia
  _culturalCoinSpawnedThisStage = false;
  if(playerShip) _savePowerUpsFromCurrentShip();
  // Pick a random enemy pool each time — so every topia visit has different enemies
  var _topiaCandidatePools = [
    pool_terata_p, pool_nea_terata, pool_exthos_a, pool_exthos_b, pool_exthos_c,
    pool_exthos_d, pool_exthos_e, pool_exthos_f, pool_butterflies, pool_beetles,
    pool_spiders, pool_bats, pool_chameleons, pool_strange, pool_nees2,
    pool_lions, pool_bees, pool_monsters, pool_hawks
  ];
  currentLevelPool = _topiaCandidatePools[Math.floor(Math.random() * _topiaCandidatePools.length)];

  // Cross-dissolve landscape background (covers stars/planets/tribes)
  var topiaBg = new TopiaBackground(folderImages);
  topiaBg.init();
  Game.setBoard(1.85, null);  // no tribal images during topia
  Game.setBoard(8.8, null);   // no atmospheric clouds
  Game.setBoard(9.5, null);   // clear any lingering slot
  Game.setBoard(2.9, topiaBg);

  var board = new GameBoard();
  board.add(new PlayerShip());
  _restoreWingmenToBoard(board);

  // Medium-difficulty wave set with terata_p enemies
  var topiaLevelData = _buildRandomLevel(4).data;

  board.add(new Level(topiaLevelData, function() {
    _savePowerUpsFromCurrentShip();
    playerShip = null;
    SoundManager.playLevelComplete();
    var prompt = Game.mobile ? 'Tap FIRE for Level ' + currentLevel : 'Press fire for Level ' + currentLevel;
    var onContinue = function() {
      Game.setBoard(20, new ScreenFade('out', 0.45, function() {
        Game.setBoard(2.9, null); // clear topia background
        SoundManager.setTopiaMode(false); // restore Electric Shock shoot sound
        playGame();
      }));
    };
    Game.setBoard(9, new TitleScreen('★ BONUS STAGE CLEAR! ★', prompt, onContinue, {
      fadeIn: true,
      fadeInDuration: 2.5,
      duration: 5,
      showProgressBar: true
    }));
  }));

  Game.setBoard(9, board);
  Game.setBoard(15, new GamePoints(0));
  Game.setBoard(16, new GameLives());
  Game.setBoard(17, new GameLevel());
  Game.setBoard(18, new ActivePowerQueueDisplay());
  if(!_noFadeIn) Game.setBoard(20, new ScreenFade('in', 0.55));
};

// ===== ENEMY FILLER — keeps enemies on screen throughout a stage =====
// Monitors the live enemy count; when it drops below the threshold and the level
// still has non-boss waves pending, spawns a quick ZigZag or Spiral filler enemy.
// When only the boss (or bonus flyby) entries remain in levelData, it goes quiet
// so the last enemy's death can cleanly trigger the level-complete callback.
var _FILLER_BOSS_TAGS = { mother_small:1, mother_medium:1, mother_large:1,
                          siren_portrait:1, bonus_flyby:1 };
var EnemyFiller = function(levelRef) {
  this._level = levelRef;
  this._cd    = 1.5; // initial delay before first check
};
EnemyFiller.prototype.step = function(dt) {
  if(!this._level || this._level.done) return;
  this._cd -= dt;
  if(this._cd > 0) return;
  this._cd = 0.8; // check again in 0.8s

  // Near the end? → only boss / flyby entries left in levelData
  var _nearEnd = true;
  for(var _li = 0; _li < this._level.levelData.length; _li++) {
    if(!_FILLER_BOSS_TAGS[this._level.levelData[_li][3]]) { _nearEnd = false; break; }
  }
  if(_nearEnd) return; // let the remaining enemies die naturally to end the level

  var cnt = this.board.cnt[OBJECT_ENEMY] || 0;
  if(cnt < 3) {
    var _fx = Game.width * (0.1 + Math.random() * 0.8);
    if(Math.random() < 0.5) {
      this.board.add(new ZigZagEnemy(pickAlien(2), _fx));
    } else {
      this.board.add(new SpiralEnemy(pickAlien(5), _fx));
    }
    this._cd = 1.2; // wait 1.2s before potentially spawning another
  }
};
EnemyFiller.prototype.draw = function() {};

var playGame = function() {
  _drakiStageCount++;  // track stages for draki coin every-2-stages logic
  SoundManager.setTopiaMode(false); // ensure Electric Shock shoot sound on all regular stages
  Game.playing = true;
  Game.paused = false;
  // Request pointer lock (desktop only)
  if(!Game.mobile) {
    var _rpl = Game.canvas.requestPointerLock || Game.canvas.mozRequestPointerLock || Game.canvas.webkitRequestPointerLock;
    if(_rpl) _rpl.call(Game.canvas);
  }
  // Reset lives/points ONLY on genuine new game start (from title screen / after loss / after win)
  if(_isNewGame) {
    _isNewGame = false;
    playerLives = PLAYER_LIVES;
    sessionKills = 0;
    nextLifeKills = 25;
    Game.points = 0;
    Game.godMode = false;
    sessionQueuablePowerUpsCollected = 0;
    Game._godComboHeld = false;
    Game._godMsgTimer = 0;
    _savePowerUpsFromCurrentShip(); // clear any stale saved state for new game
  }
  if(!SoundManager.isMusicPlaying()) SoundManager.startMusic();
  Game.setBoard(9.5, null); // ensure bonus-stage girls never leak into normal gameplay
  var board = new GameBoard();
  board.add(new PlayerShip());
  _restoreWingmenToBoard(board);

  // Level roster: plain arrays = normal levels, objects {pool, data} = species stages
  // spacemen are background objects now — NOT enemies
  var levels = [
    // Levels 1-8: randomly generated each new game from the full enemy-type pool
    _buildRandomLevel(1), _buildRandomLevel(2), _buildRandomLevel(3), _buildRandomLevel(4),
    { pool: pool_nenes3, data: level_nenes3_data }, // Level 5 — nenes3 continuous face-swap
    _buildRandomLevel(6), _buildRandomLevel(7),
    { pool: pool_special_bonus, data: level_special_bonus_data },
    _buildRandomLevel(8),
    { pool: pool_spiders,     data: level_spiders_data },
    { pool: pool_beetles,    data: level_beetles_data },
    level_boss_medium_data,
    { pool: pool_bats,        data: level_bats_data },
    { pool: pool_chameleons,  data: level_chameleons_data },
    level_boss_large_data,
    { pool: pool_strange,     data: level_strange_data },
    { pool: pool_nees2,       data: level_nees2_data },
    { pool: pool_lions,       data: level_lions_data },
    level_boss_large_data,
    { pool: pool_butterflies,  data: level_butterflies_data },
    { pool: pool_bees,        data: level_bees_data },
    { pool: pool_monsters,    data: level_monsters_data },
    { pool: pool_hawks,       data: level_hawks_data },
    level_boss_large_data,
    { pool: pool_exthos_a,    data: level_exthos_a_data },
    { pool: pool_exthos_b,    data: level_exthos_b_data },
    { pool: pool_exthos_c,    data: level_exthos_c_data },
    { pool: pool_exthos_d,    data: level_exthos_d_data },
    { pool: pool_exthos_e,    data: level_exthos_e_data },
    { pool: pool_nenes3,      data: level_nenes3_data },    // Stage 30 — new enemies join
    { pool: pool_nea_terata,  data: level_nea_terata_data },
    { pool: pool_skoures,     data: level_skoures_data },
    { pool: pool_mavris_tribes, data: level_mavris_tribes_data },
    { pool: pool_exthos_f,    data: level_exthos_f1_data },
    { pool: pool_exthos_f,    data: level_exthos_f2_data },
    { pool: pool_exthos_f,    data: level_exthos_f3_data },
    { pool: pool_exthos_f,    data: level_exthos_f4_data },
    level_final_boss_data
  ];
  var levelIndex = (currentLevel - 1) % levels.length;
  var levelEntry = levels[levelIndex];

  // Handle species levels vs regular/random levels
  var levelData;
  if(Array.isArray(levelEntry)) {
    currentLevelPool = null;        // Plain array: normal level
    levelData = levelEntry;
  } else if(levelEntry.isRandom) {
    currentLevelPool = null;        // Random levels use allAlienPool sliding window
    levelData = levelEntry.data;
  } else {
    currentLevelPool = levelEntry.pool || null;  // Species stage: lock to species pool
    levelData = levelEntry.data;
  }

  // Capture whether this is the special bonus level — used to queue topia
  var _isSpecialBonusLevel = (levelEntry.pool === pool_special_bonus);

  var _lvlObj = new Level(levelData, function() {
    // Level complete callback — αποθήκευση wingmen/power-ups πριν αλλάξει οθόνη (να μένουν σε όλα τα stage μέχρι να χτυπηθούν)
    _savePowerUpsFromCurrentShip();
    playerShip = null; // Prevent S-key ship select during transition/wheel screens
    // Queue topia bonus stage after completing the special bonus level
    if(_isSpecialBonusLevel) _topiaExtraBonusQueued = true;
    if(infiniteLoopMode || currentLevel < maxLevel) {
      currentLevel++;
      _saveProgressToStorage(); // auto-save progress to localStorage (stage = next to play)
      SoundManager.playLevelComplete();
      // Every 5 levels → +1 life bonus
      if((currentLevel - 1) % 5 === 0) {
        playerLives = Math.min(playerLives + 1, 9);
      }
      var completedLvl = currentLevel - 1;
      // Compute preview pool for the upcoming level
      var _nextLvlIdx = (currentLevel - 1) % levels.length;
      var _nextEntry  = levels[_nextLvlIdx];
      var _previewPool = (!Array.isArray(_nextEntry) && _nextEntry.pool) ? _nextEntry.pool : null;
      // isRandom levels (from _buildRandomLevel) carry their own pre-computed pool
      if(!_previewPool && !Array.isArray(_nextEntry) && _nextEntry.isRandom) _previewPool = _nextEntry.pool || null;
      var doTransition = function() {
        if(completedLvl % 5 === 0) {
          Game.setBoard(9, new LevelTransitionScreen(completedLvl, currentLevel, startBonusStage, _previewPool));
        } else {
          Game.setBoard(9, new LevelTransitionScreen(completedLvl, currentLevel, playGame, _previewPool));
        }
      };
      // Fade out, then show next screen
      Game.setBoard(20, new ScreenFade('out', 0.45, function() {
        // Topia Extra Bonus Stage takes priority if queued
        if(_topiaExtraBonusQueued) {
          _topiaExtraBonusQueued = false;
          var _topiaFolder = _topiaNextFolder();
          startTopiaExtraBonusStage(_topiaFolder); // adds its own fade in
        } else {
          // Wheel of Fortune: guaranteed at least once every 10 levels
          // also random ~20% chance after min 3 levels since last wheel
          _levelsSinceLastWheel++;
          var _showWheel = (_levelsSinceLastWheel >= 10) ||
                           (_levelsSinceLastWheel >= 3 && Math.random() < 0.20);
          if(_showWheel) {
            _levelsSinceLastWheel = 0;
            Game.setBoard(9, new WheelBonusScreen(completedLvl, doTransition));
            Game.setBoard(20, new ScreenFade('in', 0.5));
          } else {
            doTransition();
            Game.setBoard(20, new ScreenFade('in', 0.5));
          }
        }
      }));
    } else {
      // Won the game!
      currentLevel = 1; // Reset for next play
      Game.motherShipCount = 0;
      winGame();
    }
  });
  board.add(_lvlObj);
  board.add(new EnemyFiller(_lvlObj)); // keeps enemies on screen; stops near boss phase

  // CloudSystem disabled — cloud images deleted
  board.add(new DrakiCoinSpawner()); // Spawns 1 draki coin per level → triggers topia on catch
  board.add(new FruitBonusSpawner()); // Spawns 1 fruit per stage → 1000/2000/3000 pts red flash
  Game.setBoard(9,board);
  Game.setBoard(8.8, new AtmosphericCloudSystem()); // Atmospheric clouds — behind enemies
  Game.setBoard(15,new GamePoints(0));
  Game.setBoard(16,new GameLives());
  Game.setBoard(17,new GameLevel()); // Show current level
  Game.setBoard(18,new ActivePowerQueueDisplay());
  Game.setBoard(20, new ScreenFade('in', 0.55));
};

// ===== RANDOMIZED LEVEL GENERATOR (levels 1-8) =====
// Draws from the full enemy-type pool. Called fresh each new game so no two
// playthroughs have the same wave sequence.
function _buildRandomLevel(levelNum) {
  // All wave types the game knows how to spawn
  var _PAIRS = [
    ['swoop_left',    'swoop_right'   ],
    ['fig8_left',     'fig8_right'    ],
    ['scurve_left',   'scurve_right'  ],
    ['cork_left',     'cork_right'    ],
    ['boomerang_left','boomerang_right'],
    ['pendulum'                        ],
    ['zigzag_enemy'                    ],
    ['spiral_enemy'                    ],
    ['falling_row'                     ]
  ];

  // Fisher-Yates shuffle
  function _shuf(arr) {
    var a = arr.slice();
    for(var i = a.length-1; i > 0; i--) {
      var j = Math.floor(Math.random()*(i+1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var data = [];
  var n = levelNum; // 1-8

  // ── Grid formation (always first) ───────────────────────────────────────
  var cols         = Math.min(11, 6 + n);                  // 7 → 11 cols
  var rows         = Math.min(8,  4 + Math.floor(n/2));    // 4 → 8 rows
  var gridSpeed    = 44 + n * 4;   // faster entry (was 25+n*4)
  var cooldownMs   = Math.max(400, 1800 - n * 150);
  var spacingX     = Math.max(44,  70  - n * 2);
  var startX       = Math.max(16,  64  - n * 3);
  var diveCd       = Math.max(1.2, 3.0 - n * 0.3); // more frequent dives (was 4.0)
  data.push([0, 1000, 99999, 'grid_formation', {
    rows: rows, columns: cols,
    spacing_x: spacingX, spacing_y: 55,
    start_x: startX, start_y: 30,
    initial_speed: gridSpeed,
    cooldown_ms: cooldownMs,
    diveCooldown: diveCd
  }]);

  // ── Bonus flyby ─────────────────────────────────────────────────────────
  var flySpeed = 65 + n * 7;
  var flyGap   = Math.max(3500, 7000 - n * 400);
  data.push([5000, 55000, flyGap, 'bonus_flyby', { speed: flySpeed }]);

  // ── Random waves ─────────────────────────────────────────────────────────
  var waveCount  = 6 + Math.floor(n / 2); // 6 for lvl 1, up to 10 for lvl 8
  var shuffled   = _shuf(_PAIRS).slice(0, waveCount);
  var interval   = Math.max(450, 1600 - n * 130);
  var t          = 2500;  // first wave at 2.5s (was 8s)

  for(var w = 0; w < shuffled.length; w++) {
    var types    = shuffled[w];
    var waveStart = t + 400;  // tighter gap (was 1500ms)

    if(types[0] === 'falling_row') {
      var frCols   = Math.min(10, 4 + Math.round(n * 0.7));
      var downSpd  = 44 + n * 3;
      data.push([waveStart, waveStart + 800, 99999, 'falling_row',
                 { columns: frCols, spacing_x: 50, down_speed: downSpd }]);
      t = waveStart + 2000;
    } else {
      var dur = 6000 + Math.random() * 3000;
      for(var ti = 0; ti < types.length; ti++) {
        data.push([waveStart + ti*500, waveStart + ti*500 + dur, interval, types[ti]]);
      }
      t = waveStart + dur;
    }
  }

  // ── Boss at the end ─────────────────────────────────────────────────────
  var bossType = n <= 2 ? 'mother_small' : (n <= 5 ? 'mother_medium' : 'mother_large');
  var bossStart = Math.round(t + 2000);
  data.push([bossStart, bossStart + 1500, 2000, bossType]);

  // Pre-select enemy sprites for the level preview (sliding window same as pickAlien)
  var _sprPool = [];
  var _base = ((levelNum - 1) * 2) % allAlienPool.length;
  for (var _si = 0; _si < 6; _si++) {
    var _sp = allAlienPool[(_base + _si) % allAlienPool.length];
    if (_sprPool.indexOf(_sp) < 0) _sprPool.push(_sp);
  }
  return { pool: _sprPool, data: data, isRandom: true };
}

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
  'alien_n2_21','alien_n2_22','alien_n2_23',
  'alien_n2_24','alien_n2_25','alien_n2_26','alien_n2_27','alien_n2_28',
  'alien_n2_29','alien_n2_30','alien_n2_31','alien_n2_32','alien_n2_33',
  'alien_n2_34','alien_n2_35','alien_n2_36','alien_n2_37','alien_n2_38',
  'alien_n2_39','alien_n2_40','alien_n2_41','alien_n2_42','alien_n2_43',
  'alien_n2_44','alien_n2_45','alien_n2_46','alien_n2_47','alien_n2_48',
  'alien_n2_49','alien_n2_50','alien_n2_51','alien_n2_52','alien_n2_53',
  'alien_n2_54','alien_n2_55','alien_n2_56','alien_n2_57','alien_n2_58',
  'alien_n2_59','alien_n2_60','alien_n2_61','alien_n2_62','alien_n2_63',
  'alien_n2_64','alien_n2_65','alien_n2_66','alien_n2_67','alien_n2_68',
  'alien_n2_69','alien_n2_70','alien_n2_71','alien_n2_72','alien_n2_73',
  'alien_n2_74','alien_n2_75','alien_n2_76','alien_n2_77','alien_n2_78',
  'alien_n2_79','alien_n2_80','alien_n2_81','alien_n2_82'
];
var pool_nenes3 = [
  'alien_n3_01','alien_n3_02','alien_n3_03','alien_n3_04','alien_n3_05',
  'alien_n3_06','alien_n3_07','alien_n3_08','alien_n3_09','alien_n3_10',
  'alien_n3_11','alien_n3_12','alien_n3_13','alien_n3_14','alien_n3_15',
  'alien_n3_16','alien_n3_17','alien_n3_18','alien_n3_19','alien_n3_20',
  'alien_n3_21','alien_n3_22','alien_n3_23','alien_n3_24','alien_n3_25',
  'alien_n3_26','alien_n3_27','alien_n3_28','alien_n3_29','alien_n3_30',
  'alien_n3_31','alien_n3_32','alien_n3_33','alien_n3_34','alien_n3_35'
];

// ===== NENES 3 STAGE — enemies continuously cycle faces every ~3s =====
var level_nenes3_data = [
  [ 0,    1000,  99999, 'grid_formation', { rows: 7, columns: 9, spacing_x: 55, spacing_y: 50, start_y: 30, initial_speed: 42, cooldown_ms: 1000, diveCooldown: 3, continuousMorph: true, continuousMorphPool: pool_nenes3 } ],
  [ 4000, 55000, 1400,  'zigzag_enemy' ],
  [ 5000, 55000, 1600,  'spiral_enemy' ],
  [ 16000, 17000, 99999, 'falling_row', { columns: 7, spacing_x: 50, down_speed: 58 } ],
  [ 28000, 29000, 99999, 'grid_formation', { rows: 5, columns: 8, spacing_x: 55, spacing_y: 50, start_y: 30, initial_speed: 48, cooldown_ms: 900, diveCooldown: 2.5, continuousMorph: true, continuousMorphPool: pool_nenes3 } ],
  [ 38000, 39500, 2000,  'mother_medium' ]
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
  'nea_t_1','nea_t_2','nea_t_3','nea_t_4','nea_t_5','nea_t_6','nea_t_7','nea_t_8','nea_t_9','nea_t_10'
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

// ===== TERATA POLEMISTES pool (for Topia Bonus Stages) =====
var pool_terata_p = [
  'terata_p_1','terata_p_2','terata_p_3','terata_p_4','terata_p_5','terata_p_6','terata_p_7',
  'terata_p_8','terata_p_9','terata_p_10','terata_p_11','terata_p_12','terata_p_13','terata_p_14',
  'terata_p_15','terata_p_16','terata_p_17','terata_p_18','terata_p_19','terata_p_20','terata_p_21',
  'terata_p_22','terata_p_23','terata_p_24','terata_p_25','terata_p_26','terata_p_27','terata_p_28',
  'terata_p_29','terata_p_30','terata_p_31','terata_p_32','terata_p_33','terata_p_34','terata_p_35',
  'terata_p_36','terata_p_37','terata_p_38','terata_p_39','terata_p_40','terata_p_41'
];

// ===== MORPH SPRITE POOL — flat list of all enemy sprite keys for cross-species morphing =====
var _morphSpritePoolCache = null;
function _getMorphSpritePool() {
  if (_morphSpritePoolCache) return _morphSpritePoolCache;
  var _allPools = [
    pool_butterflies, pool_beetles, pool_spiders, pool_bats, pool_chameleons,
    pool_strange, pool_nees2, pool_nenes3, pool_lions, pool_bees, pool_monsters, pool_hawks,
    pool_exthos_a, pool_exthos_b, pool_exthos_c, pool_exthos_d, pool_exthos_e,
    pool_exthos_f, pool_nea_terata, pool_terata_p
  ];
  _morphSpritePoolCache = [];
  for (var _pi = 0; _pi < _allPools.length; _pi++) {
    for (var _si = 0; _si < _allPools[_pi].length; _si++) {
      _morphSpritePoolCache.push(_allPools[_pi][_si]);
    }
  }
  return _morphSpritePoolCache;
}

// ===== TOPIA STAGE CATALOG — auto-generated from images/topia/1..82 =====
// Each entry = array of image paths for one landscape folder (cross-dissolve slideshow)
var TOPIA_STAGE_CATALOG = [
  [ // 1 (6 slides)
    "images/topia/1/Change_only_the_sky_and_distant_crystal_mountains_01.webp",
    "images/topia/1/Change_only_the_sky_and_distant_crystal_mountains_02.webp",
    "images/topia/1/Change_only_the_sky_and_distant_crystal_mountains_03.webp",
    "images/topia/1/Change_only_the_sky_and_distant_crystal_mountains_04.webp",
    "images/topia/1/Change_only_the_sky_and_distant_crystal_mountains_05.webp",
    "images/topia/1/Change_only_the_sky_and_distant_crystal_mountains_06.webp"
  ],
  [ // 2 (25 slides)
    "images/topia/2/Alien_megacity_planet_after_catastrophic_bombardme-1772345134144.webp",
    "images/topia/2/An_epic_photorealistic_apocalyptic_sci-fi_scene_of-1772354838148.webp",
    "images/topia/2/An_epic_photorealistic_apocalyptic_sci-fi_scene_of-1772355098996.webp",
    "images/topia/2/Apocalyptic_devastated_alien_planet_landscape_afte-1772342253794.webp",
    "images/topia/2/Apocalyptic_war-torn_Earth_cityscape_devastated_by-1772398522535.webp",
    "images/topia/2/Apocalyptic_war-torn_Paris_France_scene_Eiffel_To-1772446211565.webp",
    "images/topia/2/Keep_ALL_foreground_elements_identical_-_same_skel-1772398529920.webp",
    "images/topia/2/Keep_ALL_foreground_elements_identical_-_same_skel-1772398538788.webp",
    "images/topia/2/Keep_ALL_foreground_elements_identical_-_same_skel-1772398541722.webp",
    "images/topia/2/Keep_ALL_foreground_elements_identical_-_same_skel-1772398543391.webp",
    "images/topia/2/Keep_all_foreground_elements_identical_-_the_crash-1772354855269.webp",
    "images/topia/2/Keep_all_foreground_elements_identical_-_the_crash-1772354860050.webp",
    "images/topia/2/Keep_all_foreground_elements_identical_-_the_crash-1772354864234.webp",
    "images/topia/2/Keep_all_foreground_energy_shield_ruins_dead_alie-1772345016521.webp",
    "images/topia/2/Keep_all_foreground_energy_shield_ruins_dead_alie-1772345095780.webp",
    "images/topia/2/Keep_all_foreground_energy_shield_ruins_dead_alie-1772345105889.webp",
    "images/topia/2/Keep_all_foreground_energy_shield_ruins_dead_alie-1772345106303.webp",
    "images/topia/2/Keep_all_foreground_ruins_alien_corpses_and_debri-1772342262440.webp",
    "images/topia/2/Keep_all_foreground_ruins_alien_corpses_and_debri-1772342267261.webp",
    "images/topia/2/Keep_all_foreground_ruins_alien_corpses_and_debri-1772342273231.webp",
    "images/topia/2/Keep_all_foreground_ruins_alien_corpses_and_debri-1772342282187.webp",
    "images/topia/2/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772446216001.webp",
    "images/topia/2/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772446222872.webp",
    "images/topia/2/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772446231542.webp",
    "images/topia/2/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772446358706.webp"
  ],
  [ // 3 (6 slides)
    "images/topia/3/Apocalyptic_war-torn_Moscow_Russia_scene_Kremlin_-1772447181303.webp",
    "images/topia/3/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447189204.webp",
    "images/topia/3/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447194188.webp",
    "images/topia/3/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447200580.webp",
    "images/topia/3/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447205271.webp",
    "images/topia/3/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447219236.webp"
  ],
  [ // 4 (21 slides)
    "images/topia/4/Apocalyptic_war-torn_Berlin_Germany_scene_Branden-1772447249956.webp",
    "images/topia/4/Apocalyptic_war-torn_medieval_castle_devastated_by-1772398806347.webp",
    "images/topia/4/Devastated_alien_ringworld_fragment_after_bombardm-1772347743142.webp",
    "images/topia/4/Devastated_alien_ringworld_fragment_after_bombardm-1772347755391.webp",
    "images/topia/4/Hellish_bombed_alien_planet_surface_after_planetar-1772342341105.webp",
    "images/topia/4/Keep_ALL_foreground_elements_identical_-_same_skel-1772398811889.webp",
    "images/topia/4/Keep_ALL_foreground_elements_identical_-_same_skel-1772398817514.webp",
    "images/topia/4/Keep_ALL_foreground_elements_identical_-_same_skel-1772398821850.webp",
    "images/topia/4/Keep_ALL_foreground_elements_identical_-_same_skel-1772398826541.webp",
    "images/topia/4/Keep_all_foreground_industrial_ruins_alien_soldie-1772342351614.webp",
    "images/topia/4/Keep_all_foreground_industrial_ruins_alien_soldie-1772342360287.webp",
    "images/topia/4/Keep_all_foreground_industrial_ruins_alien_soldie-1772342370350.webp",
    "images/topia/4/Keep_all_foreground_industrial_ruins_alien_soldie-1772342377154.webp",
    "images/topia/4/Keep_all_foreground_ringworld_ruins_dead_alien_en-1772345303755.webp",
    "images/topia/4/Keep_all_foreground_ringworld_ruins_dead_alien_en-1772347760322.webp",
    "images/topia/4/Keep_all_foreground_ringworld_ruins_dead_alien_en-1772347766129.webp",
    "images/topia/4/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447261558.webp",
    "images/topia/4/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447265593.webp",
    "images/topia/4/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447269808.webp",
    "images/topia/4/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447274327.webp",
    "images/topia/4/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447395113.webp"
  ],
  [ // 5 (21 slides)
    "images/topia/5/Alien_methane_ocean_planet_after_bombardment_with_-1772347877070.webp",
    "images/topia/5/Alien_methane_ocean_planet_after_bombardment_with_-1772348034829.webp",
    "images/topia/5/Apocalyptic_war-torn_New_York_City_scene_Times_Sq-1772398973178.webp",
    "images/topia/5/Apocalyptic_war-torn_New_York_City_scene_Times_Sq-1772398979887.webp",
    "images/topia/5/Apocalyptic_war-torn_New_York_City_scene_Times_Sq-1772398984373.webp",
    "images/topia/5/Apocalyptic_war-torn_New_York_City_scene_Times_Sq-1772398989227.webp",
    "images/topia/5/Apocalyptic_war-torn_New_York_City_scene_Times_Sq-1772398995864.webp",
    "images/topia/5/Apocalyptic_war-torn_Rome_Italy_scene_Colosseum_p-1772447441816.webp",
    "images/topia/5/Frozen_post-bombardment_alien_planet_landscape_in_-1772342393254.webp",
    "images/topia/5/Keep_all_foreground_frozen_coastal_ruins_ice-cove-1772342418719.webp",
    "images/topia/5/Keep_all_foreground_frozen_coastal_ruins_ice-cove-1772342423938.webp",
    "images/topia/5/Keep_all_foreground_frozen_coastal_ruins_ice-cove-1772342432528.webp",
    "images/topia/5/Keep_all_foreground_frozen_coastal_ruins_ice-cove-1772342438798.webp",
    "images/topia/5/Keep_all_foreground_methane_ocean_ruins_dead_cold-1772347886327.webp",
    "images/topia/5/Keep_all_foreground_methane_ocean_ruins_dead_cold-1772347893756.webp",
    "images/topia/5/Keep_all_foreground_methane_ocean_ruins_dead_cold-1772347899022.webp",
    "images/topia/5/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447454355.webp",
    "images/topia/5/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447459269.webp",
    "images/topia/5/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447463918.webp",
    "images/topia/5/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447468852.webp",
    "images/topia/5/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447475554.webp"
  ],
  [ // 6 (15 slides)
    "images/topia/6/.png.webp",
    "images/topia/6/Apocalyptic_war-torn_Madrid_Spain_scene_Royal_Pal-1772447622429.webp",
    "images/topia/6/Apocalyptic_war-torn_Tokyo_Japan_scene_Shibuya_Cr-1772399078799.webp",
    "images/topia/6/Apocalyptic_war-torn_Tokyo_Japan_scene_Shibuya_Cr-1772399113535.webp",
    "images/topia/6/Apocalyptic_war-torn_Tokyo_Japan_scene_Shibuya_Cr-1772399118502.webp",
    "images/topia/6/Apocalyptic_war-torn_Tokyo_Japan_scene_Shibuya_Cr-1772399123544.webp",
    "images/topia/6/Apocalyptic_war-torn_Tokyo_Japan_scene_Shibuya_Cr-1772399207722.webp",
    "images/topia/6/Keep_all_foreground_desert_ruins_sand_dunes_alie-1772342496127.webp",
    "images/topia/6/Keep_all_foreground_desert_ruins_sand_dunes_alie-1772342503471.webp",
    "images/topia/6/Keep_all_foreground_desert_ruins_sand_dunes_alie-1772342509675.webp",
    "images/topia/6/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447632877.webp",
    "images/topia/6/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447636492.webp",
    "images/topia/6/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447640359.webp",
    "images/topia/6/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447646492.webp",
    "images/topia/6/Sunset-lit_devastated_alien_planet_after_catastrop-1772342472355.webp"
  ],
  [ // 7 (26 slides)
    "images/topia/7/An_epic_photorealistic_apocalyptic_war-torn_scene_-1772394448591.webp",
    "images/topia/7/Apocalyptic_devastated_alien_planet_with_massive_c-1772344299635.webp",
    "images/topia/7/Apocalyptic_war-torn_Barcelona_Spain_scene_Sagrad-1772447671195.webp",
    "images/topia/7/Apocalyptic_war-torn_Rio_de_Janeiro_Brazil_scene_-1772399300560.webp",
    "images/topia/7/Devastated_alien_quantum_research_facility_on_dime-1772348113438.webp",
    "images/topia/7/Keep_all_foreground_crashed_mothership_city_ruins-1772344311987.webp",
    "images/topia/7/Keep_all_foreground_crashed_mothership_city_ruins-1772344317797.webp",
    "images/topia/7/Keep_all_foreground_crashed_mothership_city_ruins-1772344322503.webp",
    "images/topia/7/Keep_all_foreground_crashed_mothership_city_ruins-1772344328119.webp",
    "images/topia/7/Keep_all_foreground_elements_identical_-_destroyed-1772394466831.webp",
    "images/topia/7/Keep_all_foreground_elements_identical_-_destroyed-1772394473245.webp",
    "images/topia/7/Keep_all_foreground_elements_identical_-_destroyed-1772394478026.webp",
    "images/topia/7/Keep_all_foreground_elements_identical_-_destroyed-1772394482900.webp",
    "images/topia/7/Keep_all_foreground_quantum_facility_ruins_dead_a-1772348120473.webp",
    "images/topia/7/Keep_all_foreground_quantum_facility_ruins_dead_a-1772348131514.webp",
    "images/topia/7/Keep_all_foreground_quantum_facility_ruins_dead_a-1772348136651.webp",
    "images/topia/7/Keep_all_foreground_quantum_facility_ruins_dead_a-1772348137167.webp",
    "images/topia/7/Same_exact_composition_and_foreground_as_reference-1772399347281.webp",
    "images/topia/7/Same_exact_composition_and_foreground_as_reference-1772399353446.webp",
    "images/topia/7/Same_exact_composition_and_foreground_as_reference-1772399359114.webp",
    "images/topia/7/Same_exact_composition_and_foreground_as_reference-1772399364278.webp",
    "images/topia/7/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447683311.webp",
    "images/topia/7/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447687251.webp",
    "images/topia/7/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447691163.webp",
    "images/topia/7/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447695647.webp",
    "images/topia/7/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447706215.webp"
  ],
  [ // 8 (26 slides)
    "images/topia/8/Alien_planetary_forge_world_after_bombardment_with-1772348615130.webp",
    "images/topia/8/An_epic_photorealistic_apocalyptic_war-torn_scene_-1772394500066.webp",
    "images/topia/8/Apocalyptic_war-torn_Amsterdam_Netherlands_scene_-1772447747237.webp",
    "images/topia/8/Apocalyptic_war-torn_Dubai_UAE_scene_Burj_Khalifa-1772399518845.webp",
    "images/topia/8/Keep_all_foreground_elements_identical_-_destroyed-1772394516411.webp",
    "images/topia/8/Keep_all_foreground_elements_identical_-_destroyed-1772394522281.webp",
    "images/topia/8/Keep_all_foreground_elements_identical_-_destroyed-1772394527047.webp",
    "images/topia/8/Keep_all_foreground_elements_identical_-_destroyed-1772394533343.webp",
    "images/topia/8/Keep_all_foreground_forge_world_ruins_dead_alien_-1772348636546.webp",
    "images/topia/8/Keep_all_foreground_forge_world_ruins_dead_alien_-1772348645245.webp",
    "images/topia/8/Keep_all_foreground_forge_world_ruins_dead_alien_-1772348650026.webp",
    "images/topia/8/Keep_all_foreground_forge_world_ruins_dead_alien_-1772348656697.webp",
    "images/topia/8/Keep_all_foreground_underground_city_ruins_sinkho-1772344351239.webp",
    "images/topia/8/Keep_all_foreground_underground_city_ruins_sinkho-1772344361508.webp",
    "images/topia/8/Keep_all_foreground_underground_city_ruins_sinkho-1772344367087.webp",
    "images/topia/8/Keep_all_foreground_underground_city_ruins_sinkho-1772344372900.webp",
    "images/topia/8/Post-bombardment_alien_planet_surface_with_destroy-1772344340410.webp",
    "images/topia/8/Same_exact_composition_and_foreground_as_reference-1772399377321.webp",
    "images/topia/8/Same_exact_composition_and_foreground_as_reference-1772399527254.webp",
    "images/topia/8/Same_exact_composition_and_foreground_as_reference-1772399533345.webp",
    "images/topia/8/Same_exact_composition_and_foreground_as_reference-1772399538340.webp",
    "images/topia/8/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447757398.webp",
    "images/topia/8/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447761152.webp",
    "images/topia/8/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447765200.webp",
    "images/topia/8/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447769372.webp",
    "images/topia/8/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447776485.webp"
  ],
  [ // 9 (26 slides)
    "images/topia/9/An_epic_photorealistic_apocalyptic_war-torn_scene_-1772394555287.webp",
    "images/topia/9/Apocalyptic_war-torn_Mumbai_India_scene_Gateway_o-1772399557283.webp",
    "images/topia/9/Apocalyptic_war-torn_Zurich_Switzerland_scene_Swi-1772447819421.webp",
    "images/topia/9/Dark_mystical_alien_planet_filled_with_countless_d-1772348697529.webp",
    "images/topia/9/Frozen_alien_planet_wasteland_after_bombardment_wi-1772344388757.webp",
    "images/topia/9/Keep_all_foreground_corpse-covered_landscape_dead-1772348707199.webp",
    "images/topia/9/Keep_all_foreground_corpse-covered_landscape_dead-1772348715768.webp",
    "images/topia/9/Keep_all_foreground_corpse-covered_landscape_dead-1772348724450.webp",
    "images/topia/9/Keep_all_foreground_corpse-covered_landscape_dead-1772348729766.webp",
    "images/topia/9/Keep_all_foreground_elements_identical_-_destroyed-1772394573662.webp",
    "images/topia/9/Keep_all_foreground_elements_identical_-_destroyed-1772394580912.webp",
    "images/topia/9/Keep_all_foreground_elements_identical_-_destroyed-1772394587013.webp",
    "images/topia/9/Keep_all_foreground_elements_identical_-_destroyed-1772394590124.webp",
    "images/topia/9/Keep_all_foreground_ice_fortress_ruins_frozen_ali-1772344408564.webp",
    "images/topia/9/Keep_all_foreground_ice_fortress_ruins_frozen_ali-1772344415779.webp",
    "images/topia/9/Keep_all_foreground_ice_fortress_ruins_frozen_ali-1772344421371.webp",
    "images/topia/9/Keep_all_foreground_ice_fortress_ruins_frozen_ali-1772344430344.webp",
    "images/topia/9/Same_exact_composition_and_foreground_as_reference-1772399543940.webp",
    "images/topia/9/Same_exact_composition_and_foreground_as_reference-1772399550302.webp",
    "images/topia/9/Same_exact_composition_and_foreground_as_reference-1772399595019.webp",
    "images/topia/9/Same_exact_composition_and_foreground_as_reference-1772399600130.webp",
    "images/topia/9/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447849889.webp",
    "images/topia/9/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447855669.webp",
    "images/topia/9/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447859055.webp",
    "images/topia/9/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447862288.webp",
    "images/topia/9/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447868606.webp"
  ],
  [ // 10 (26 slides)
    "images/topia/10/An_epic_photorealistic_apocalyptic_war-torn_scene_-1772394620052.webp",
    "images/topia/10/Apocalyptic_war-torn_Shanghai_China_scene_Orienta-1772399656706.webp",
    "images/topia/10/Apocalyptic_war-torn_Vienna_Austria_scene_Schonbr-1772447942975.webp",
    "images/topia/10/Devastated_alien_swamp_planet_after_orbital_strike-1772344450424.webp",
    "images/topia/10/Keep_all_foreground_bio-dome_ruins_swamp_water_a-1772344462173.webp",
    "images/topia/10/Keep_all_foreground_bio-dome_ruins_swamp_water_a-1772344467216.webp",
    "images/topia/10/Keep_all_foreground_bio-dome_ruins_swamp_water_a-1772344472721.webp",
    "images/topia/10/Keep_all_foreground_bio-dome_ruins_swamp_water_a-1772344477328.webp",
    "images/topia/10/Keep_all_foreground_corpse-filled_landscape_dead_-1772348751906.webp",
    "images/topia/10/Keep_all_foreground_corpse-filled_landscape_dead_-1772348758906.webp",
    "images/topia/10/Keep_all_foreground_corpse-filled_landscape_dead_-1772348764371.webp",
    "images/topia/10/Keep_all_foreground_corpse-filled_landscape_dead_-1772348770038.webp",
    "images/topia/10/Keep_all_foreground_elements_identical_-_destroyed-1772394644302.webp",
    "images/topia/10/Keep_all_foreground_elements_identical_-_destroyed-1772394645447.webp",
    "images/topia/10/Keep_all_foreground_elements_identical_-_destroyed-1772394648320.webp",
    "images/topia/10/Keep_all_foreground_elements_identical_-_destroyed-1772394652485.webp",
    "images/topia/10/Same_exact_composition_and_foreground_as_reference-1772399607106.webp",
    "images/topia/10/Same_exact_composition_and_foreground_as_reference-1772399612687.webp",
    "images/topia/10/Same_exact_composition_and_foreground_as_reference-1772399616523.webp",
    "images/topia/10/Same_exact_composition_and_foreground_as_reference-1772399669458.webp",
    "images/topia/10/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447962946.webp",
    "images/topia/10/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447967144.webp",
    "images/topia/10/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447970878.webp",
    "images/topia/10/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447975461.webp",
    "images/topia/10/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447979345.webp",
    "images/topia/10/Sinister_alien_world_covered_entirely_by_dead_extr-1772348744295.webp"
  ],
  [ // 11 (26 slides)
    "images/topia/11/Alien_planet_crystalline_wasteland_after_devastati-1772344488526.webp",
    "images/topia/11/An_epic_photorealistic_apocalyptic_war-torn_scene_-1772394670853.webp",
    "images/topia/11/Apocalyptic_war-torn_Seoul_South_Korea_scene_N_Se-1772399714806.webp",
    "images/topia/11/Apocalyptic_war-torn_Warsaw_Poland_scene_Palace_o-1772448005246.webp",
    "images/topia/11/Keep_all_foreground_corpse-covered_wasteland_dead-1772348806059.webp",
    "images/topia/11/Keep_all_foreground_corpse-covered_wasteland_dead-1772348813018.webp",
    "images/topia/11/Keep_all_foreground_corpse-covered_wasteland_dead-1772348817783.webp",
    "images/topia/11/Keep_all_foreground_corpse-covered_wasteland_dead-1772348829588.webp",
    "images/topia/11/Keep_all_foreground_crystalline_city_ruins_shatte-1772344503359.webp",
    "images/topia/11/Keep_all_foreground_crystalline_city_ruins_shatte-1772344509139.webp",
    "images/topia/11/Keep_all_foreground_crystalline_city_ruins_shatte-1772344514778.webp",
    "images/topia/11/Keep_all_foreground_crystalline_city_ruins_shatte-1772344523001.webp",
    "images/topia/11/Keep_all_foreground_elements_identical_-_destroyed-1772394694192.webp",
    "images/topia/11/Keep_all_foreground_elements_identical_-_destroyed-1772394698626.webp",
    "images/topia/11/Keep_all_foreground_elements_identical_-_destroyed-1772394698866.webp",
    "images/topia/11/Keep_all_foreground_elements_identical_-_destroyed-1772394708688.webp",
    "images/topia/11/Nightmarish_alien_planet_blanketed_with_dead_alien-1772348790685.webp",
    "images/topia/11/Same_exact_composition_and_foreground_as_reference-1772399675990.webp",
    "images/topia/11/Same_exact_composition_and_foreground_as_reference-1772399681909.webp",
    "images/topia/11/Same_exact_composition_and_foreground_as_reference-1772399687778.webp",
    "images/topia/11/Same_exact_composition_and_foreground_as_reference-1772399692910.webp",
    "images/topia/11/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448028915.webp",
    "images/topia/11/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448033299.webp",
    "images/topia/11/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448036932.webp",
    "images/topia/11/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448041120.webp",
    "images/topia/11/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448045547.webp"
  ],
  [ // 12 (26 slides)
    "images/topia/12/An_epic_photorealistic_apocalyptic_war-torn_scene_-1772394720891.webp",
    "images/topia/12/Apocalyptic_alien_world_completely_covered_by_coun-1772348922942.webp",
    "images/topia/12/Apocalyptic_war-torn_New_York_City_USA_scene_Time-1772448091921.webp",
    "images/topia/12/Devastated_alien_planet_with_destroyed_floating_ci-1772344532474.webp",
    "images/topia/12/Keep_all_foreground_crashed_floating_platforms_al-1772344539931.webp",
    "images/topia/12/Keep_all_foreground_crashed_floating_platforms_al-1772344548855.webp",
    "images/topia/12/Keep_all_foreground_crashed_floating_platforms_al-1772344553766.webp",
    "images/topia/12/Keep_all_foreground_crashed_floating_platforms_al-1772344559345.webp",
    "images/topia/12/Keep_all_foreground_elements_identical_-_destroyed-1772394733922.webp",
    "images/topia/12/Keep_all_foreground_elements_identical_-_destroyed-1772394738074.webp",
    "images/topia/12/Keep_all_foreground_elements_identical_-_destroyed-1772394746429.webp",
    "images/topia/12/Keep_all_foreground_elements_identical_-_destroyed-1772394756852.webp",
    "images/topia/12/Keep_all_foreground_ocean_of_corpses_dead_aliens_-1772348939157.webp",
    "images/topia/12/Keep_all_foreground_ocean_of_corpses_dead_aliens_-1772348946827.webp",
    "images/topia/12/Keep_all_foreground_ocean_of_corpses_dead_aliens_-1772348951672.webp",
    "images/topia/12/Keep_all_foreground_ocean_of_corpses_dead_aliens_-1772348954203.webp",
    "images/topia/12/Same_exact_composition_and_foreground_as_reference-1772399743536.webp",
    "images/topia/12/Same_exact_composition_and_foreground_as_reference-1772399748627.webp",
    "images/topia/12/Same_exact_composition_and_foreground_as_reference-1772399754954.webp",
    "images/topia/12/Same_exact_composition_and_foreground_as_reference-1772399760212.webp",
    "images/topia/12/Same_exact_composition_and_foreground_as_reference-1772399766637.webp",
    "images/topia/12/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448120586.webp",
    "images/topia/12/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448124304.webp",
    "images/topia/12/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448127954.webp",
    "images/topia/12/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448131670.webp",
    "images/topia/12/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448135865.webp"
  ],
  [ // 13 (27 slides)
    "images/topia/13/An_epic_photorealistic_apocalyptic_war-torn_scene_-1772394771975.webp",
    "images/topia/13/Apocalyptic_alien_ocean_planet_after_bombardment_w-1772344568812.webp",
    "images/topia/13/Apocalyptic_war-torn_Berlin_Germany_scene_Branden-1772399868933.webp",
    "images/topia/13/Apocalyptic_war-torn_Warsaw_Poland_scene_Palace_o-1772448161788.webp",
    "images/topia/13/Cursed_alien_planet_overflowing_with_dead_alien_co-1772348966952.webp",
    "images/topia/13/Keep_all_foreground_drained_ocean_floor_underwate-1772344579414.webp",
    "images/topia/13/Keep_all_foreground_drained_ocean_floor_underwate-1772344584250.webp",
    "images/topia/13/Keep_all_foreground_drained_ocean_floor_underwate-1772344590235.webp",
    "images/topia/13/Keep_all_foreground_drained_ocean_floor_underwate-1772344598974.webp",
    "images/topia/13/Keep_all_foreground_elements_identical_-_destroyed-1772394792462.webp",
    "images/topia/13/Keep_all_foreground_elements_identical_-_destroyed-1772394802655.webp",
    "images/topia/13/Keep_all_foreground_elements_identical_-_destroyed-1772394802868.webp",
    "images/topia/13/Keep_all_foreground_elements_identical_-_destroyed-1772394807700.webp",
    "images/topia/13/Keep_all_foreground_hellscape_of_corpses_dead_ali-1772348980940.webp",
    "images/topia/13/Keep_all_foreground_hellscape_of_corpses_dead_ali-1772348986260.webp",
    "images/topia/13/Keep_all_foreground_hellscape_of_corpses_dead_ali-1772348991370.webp",
    "images/topia/13/Keep_all_foreground_hellscape_of_corpses_dead_ali-1772349002295.webp",
    "images/topia/13/Same_exact_composition_and_foreground_as_reference-1772399923732.webp",
    "images/topia/13/Same_exact_composition_and_foreground_as_reference-1772399928939.webp",
    "images/topia/13/Same_exact_composition_and_foreground_as_reference-1772399933840.webp",
    "images/topia/13/Same_exact_composition_and_foreground_as_reference-1772399940574.webp",
    "images/topia/13/Same_exact_composition_and_foreground_as_reference-1772399953242.webp",
    "images/topia/13/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448181991.webp",
    "images/topia/13/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448185507.webp",
    "images/topia/13/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448189643.webp",
    "images/topia/13/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448193155.webp",
    "images/topia/13/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772448197355.webp"
  ],
  [ // 14 (16 slides)
    "images/topia/14/Alien_jungle_planet_devastated_by_orbital_strike_w-1772344615203.webp",
    "images/topia/14/An_epic_photorealistic_apocalyptic_sci-fi_scene_of-1772349026620.webp",
    "images/topia/14/Apocalyptic_war-torn_New_York_City_USA_scene_Time-1772463256004.webp",
    "images/topia/14/Keep_all_foreground_burning_jungle_ruins_bio-faci-1772344631550.webp",
    "images/topia/14/Keep_all_foreground_burning_jungle_ruins_bio-faci-1772344641904.webp",
    "images/topia/14/Keep_all_foreground_burning_jungle_ruins_bio-faci-1772344650361.webp",
    "images/topia/14/Keep_all_foreground_burning_jungle_ruins_bio-faci-1772344660630.webp",
    "images/topia/14/Keep_all_foreground_elements_identical_-_the_crash-1772349033950.webp",
    "images/topia/14/Keep_all_foreground_elements_identical_-_the_crash-1772349042338.webp",
    "images/topia/14/Keep_all_foreground_elements_identical_-_the_crash-1772349048999.webp",
    "images/topia/14/Keep_all_foreground_elements_identical_-_the_crash-1772349054871.webp",
    "images/topia/14/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463299724.webp",
    "images/topia/14/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463304139.webp",
    "images/topia/14/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463309289.webp",
    "images/topia/14/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463313239.webp",
    "images/topia/14/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463318556.webp"
  ],
  [ // 15 (12 slides)
    "images/topia/15/Apocalyptic_war-torn_Rio_de_Janeiro_Brazil_scene_-1772463399210.webp",
    "images/topia/15/Devastated_alien_mining_colony_on_asteroid_surface-1772344674052.webp",
    "images/topia/15/Keep_all_foreground_asteroid_mining_ruins_dead_al-1772344692974.webp",
    "images/topia/15/Keep_all_foreground_asteroid_mining_ruins_dead_al-1772344698267.webp",
    "images/topia/15/Keep_all_foreground_asteroid_mining_ruins_dead_al-1772344702723.webp",
    "images/topia/15/Keep_all_foreground_asteroid_mining_ruins_dead_al-1772344707751.webp",
    "images/topia/15/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463419226.webp",
    "images/topia/15/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463426327.webp",
    "images/topia/15/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463431312.webp",
    "images/topia/15/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463435450.webp",
    "images/topia/15/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463438897.webp",
    "images/topia/15/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463504932.webp"
  ],
  [ // 16 (10 slides)
    "images/topia/16/Alien_volcanic_planet_after_devastating_bombardmen-1772344719906.webp",
    "images/topia/16/Apocalyptic_war-torn_Toronto_Canada_scene_CN_Towe-1772463470813.webp",
    "images/topia/16/Keep_all_foreground_volcanic_lava-harvesting_ruins-1772344735881.webp",
    "images/topia/16/Keep_all_foreground_volcanic_lava-harvesting_ruins-1772344740657.webp",
    "images/topia/16/Keep_all_foreground_volcanic_lava-harvesting_ruins-1772344747074.webp",
    "images/topia/16/Keep_all_foreground_volcanic_lava-harvesting_ruins-1772344755010.webp",
    "images/topia/16/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463488578.webp",
    "images/topia/16/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463492031.webp",
    "images/topia/16/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463496262.webp",
    "images/topia/16/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463500799.webp"
  ],
  [ // 17 (11 slides)
    "images/topia/17/Apocalyptic_war-torn_Mexico_City_Mexico_scene_Teo-1772463541432.webp",
    "images/topia/17/Devastated_alien_planet_with_destroyed_energy_shie-1772344766040.webp",
    "images/topia/17/Keep_all_foreground_energy_shield_ruins_dead_alie-1772344772861.webp",
    "images/topia/17/Keep_all_foreground_energy_shield_ruins_dead_alie-1772344777552.webp",
    "images/topia/17/Keep_all_foreground_energy_shield_ruins_dead_alie-1772344788344.webp",
    "images/topia/17/Keep_all_foreground_energy_shield_ruins_dead_alie-1772344792844.webp",
    "images/topia/17/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463565384.webp",
    "images/topia/17/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463569452.webp",
    "images/topia/17/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463573501.webp",
    "images/topia/17/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463577422.webp",
    "images/topia/17/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463581333.webp"
  ],
  [ // 18 (6 slides)
    "images/topia/18/Apocalyptic_war-torn_Buenos_Aires_Argentina_scene-1772463619121.webp",
    "images/topia/18/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463633286.webp",
    "images/topia/18/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463637609.webp",
    "images/topia/18/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463642090.webp",
    "images/topia/18/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463647039.webp",
    "images/topia/18/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463651157.webp"
  ],
  [ // 19 (6 slides)
    "images/topia/19/Apocalyptic_war-torn_Sao_Paulo_Brazil_scene_Cated-1772463669207.webp",
    "images/topia/19/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463685526.webp",
    "images/topia/19/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463689362.webp",
    "images/topia/19/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463693573.webp",
    "images/topia/19/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463697693.webp",
    "images/topia/19/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463701223.webp"
  ],
  [ // 20 (6 slides)
    "images/topia/20/Apocalyptic_war-torn_Santiago_Chile_scene_Andes_m-1772463798013.webp",
    "images/topia/20/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463830431.webp",
    "images/topia/20/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463835250.webp",
    "images/topia/20/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463839314.webp",
    "images/topia/20/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463842551.webp",
    "images/topia/20/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463846897.webp"
  ],
  [ // 21 (6 slides)
    "images/topia/21/Apocalyptic_war-torn_Las_Vegas_USA_scene_casinos_-1772463919018.webp",
    "images/topia/21/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463949373.webp",
    "images/topia/21/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463953635.webp",
    "images/topia/21/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463958152.webp",
    "images/topia/21/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463962171.webp",
    "images/topia/21/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772463966439.webp"
  ],
  [ // 22 (6 slides)
    "images/topia/22/Apocalyptic_war-torn_San_Francisco_USA_scene_Gold-1772464016940.webp",
    "images/topia/22/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464042113.webp",
    "images/topia/22/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464046088.webp",
    "images/topia/22/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464049507.webp",
    "images/topia/22/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464054460.webp",
    "images/topia/22/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464058949.webp"
  ],
  [ // 23 (6 slides)
    "images/topia/23/Apocalyptic_war-torn_Chicago_USA_scene_Willis_Tow-1772464124013.webp",
    "images/topia/23/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464143003.webp",
    "images/topia/23/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464146965.webp",
    "images/topia/23/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464150165.webp",
    "images/topia/23/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464154198.webp",
    "images/topia/23/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464158995.webp"
  ],
  [ // 24 (6 slides)
    "images/topia/24/Apocalyptic_war-torn_Miami_USA_scene_Art_Deco_bui-1772464189518.webp",
    "images/topia/24/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464286873.webp",
    "images/topia/24/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464291523.webp",
    "images/topia/24/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464295104.webp",
    "images/topia/24/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464299072.webp",
    "images/topia/24/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464303191.webp"
  ],
  [ // 25 (6 slides)
    "images/topia/25/Apocalyptic_war-torn_Los_Angeles_USA_scene_Hollyw-1772464334107.webp",
    "images/topia/25/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464361207.webp",
    "images/topia/25/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464580035.webp",
    "images/topia/25/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464585121.webp",
    "images/topia/25/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464589422.webp",
    "images/topia/25/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464593655.webp"
  ],
  [ // 26 (6 slides)
    "images/topia/26/Apocalyptic_war-torn_Dubai_UAE_scene_Burj_Khalifa-1772464654809.webp",
    "images/topia/26/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464713179.webp",
    "images/topia/26/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464716579.webp",
    "images/topia/26/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464720850.webp",
    "images/topia/26/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464723992.webp",
    "images/topia/26/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464729845.webp"
  ],
  [ // 27 (6 slides)
    "images/topia/27/Apocalyptic_war-torn_Mumbai_India_scene_Gateway_o-1772464806494.webp",
    "images/topia/27/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464827049.webp",
    "images/topia/27/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464830820.webp",
    "images/topia/27/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464834735.webp",
    "images/topia/27/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464837964.webp",
    "images/topia/27/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464842103.webp"
  ],
  [ // 28 (6 slides)
    "images/topia/28/Apocalyptic_war-torn_Shanghai_China_scene_Orienta-1772464877050.webp",
    "images/topia/28/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464894386.webp",
    "images/topia/28/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464897590.webp",
    "images/topia/28/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464900898.webp",
    "images/topia/28/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464904792.webp",
    "images/topia/28/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464908573.webp"
  ],
  [ // 29 (6 slides)
    "images/topia/29/Apocalyptic_war-torn_Seoul_South_Korea_scene_N_Se-1772464961925.webp",
    "images/topia/29/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464987026.webp",
    "images/topia/29/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772464993758.webp",
    "images/topia/29/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772465008358.webp",
    "images/topia/29/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772465013877.webp",
    "images/topia/29/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772465019127.webp"
  ],
  [ // 30 (6 slides)
    "images/topia/30/Apocalyptic_war-torn_Sydney_Australia_scene_Sydne-1772465046928.webp",
    "images/topia/30/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772465067813.webp",
    "images/topia/30/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772465071360.webp",
    "images/topia/30/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772465074481.webp",
    "images/topia/30/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772465078280.webp",
    "images/topia/30/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772465081398.webp"
  ],
  [ // 31 (6 slides)
    "images/topia/31/Apocalyptic_war-torn_Las_Vegas_scene_casino_strip-1772465373744.webp",
    "images/topia/31/Apocalyptic_war-torn_Las_Vegas_scene_casino_strip-1772465380146.webp",
    "images/topia/31/Apocalyptic_war-torn_Las_Vegas_scene_casino_strip-1772465382860.webp",
    "images/topia/31/Apocalyptic_war-torn_Las_Vegas_scene_casino_strip-1772465386900.webp",
    "images/topia/31/Apocalyptic_war-torn_Las_Vegas_scene_casino_strip-1772465390362.webp",
    "images/topia/31/Apocalyptic_war-torn_Las_Vegas_scene_casino_strip-1772465394978.webp"
  ],
  [ // 32 (6 slides)
    "images/topia/32/Apocalyptic_war-torn_San_Francisco_scene_Golden_G-1772465413532.webp",
    "images/topia/32/Apocalyptic_war-torn_San_Francisco_scene_Golden_G-1772465425497.webp",
    "images/topia/32/Apocalyptic_war-torn_San_Francisco_scene_Golden_G-1772465430366.webp",
    "images/topia/32/Apocalyptic_war-torn_San_Francisco_scene_Golden_G-1772465433431.webp",
    "images/topia/32/Apocalyptic_war-torn_San_Francisco_scene_Golden_G-1772465437144.webp",
    "images/topia/32/Apocalyptic_war-torn_San_Francisco_scene_Golden_G-1772465441648.webp"
  ],
  [ // 33 (6 slides)
    "images/topia/33/Apocalyptic_war-torn_Chicago_scene_Willis_Tower_t-1772465453551.webp",
    "images/topia/33/Apocalyptic_war-torn_Chicago_scene_Willis_Tower_t-1772465458400.webp",
    "images/topia/33/Apocalyptic_war-torn_Chicago_scene_Willis_Tower_t-1772465461535.webp",
    "images/topia/33/Apocalyptic_war-torn_Chicago_scene_Willis_Tower_t-1772465465136.webp",
    "images/topia/33/Apocalyptic_war-torn_Chicago_scene_Willis_Tower_t-1772465468502.webp",
    "images/topia/33/Apocalyptic_war-torn_Chicago_scene_Willis_Tower_t-1772465472367.webp"
  ],
  [ // 34 (6 slides)
    "images/topia/34/Apocalyptic_war-torn_Miami_scene_Art_Deco_buildin-1772465487936.webp",
    "images/topia/34/Apocalyptic_war-torn_Miami_scene_Art_Deco_buildin-1772465493969.webp",
    "images/topia/34/Apocalyptic_war-torn_Miami_scene_Art_Deco_buildin-1772465498253.webp",
    "images/topia/34/Apocalyptic_war-torn_Miami_scene_Art_Deco_buildin-1772465501220.webp",
    "images/topia/34/Apocalyptic_war-torn_Miami_scene_Art_Deco_buildin-1772465504702.webp",
    "images/topia/34/Apocalyptic_war-torn_Miami_scene_Art_Deco_buildin-1772465508217.webp"
  ],
  [ // 35 (6 slides)
    "images/topia/35/Apocalyptic_war-torn_Los_Angeles_scene_Hollywood_-1772465520285.webp",
    "images/topia/35/Apocalyptic_war-torn_Los_Angeles_scene_Hollywood_-1772465526023.webp",
    "images/topia/35/Apocalyptic_war-torn_Los_Angeles_scene_Hollywood_-1772465529870.webp",
    "images/topia/35/Apocalyptic_war-torn_Los_Angeles_scene_Hollywood_-1772465548473.webp",
    "images/topia/35/Apocalyptic_war-torn_Los_Angeles_scene_Hollywood_-1772465552255.webp",
    "images/topia/35/Apocalyptic_war-torn_Los_Angeles_scene_Hollywood_-1772465556056.webp"
  ],
  [ // 36 (6 slides)
    "images/topia/36/Apocalyptic_war-torn_Tokyo_scene_Tokyo_Tower_coll-1772465980676.webp",
    "images/topia/36/Apocalyptic_war-torn_Tokyo_scene_Tokyo_Tower_coll-1772465994895.webp",
    "images/topia/36/Apocalyptic_war-torn_Tokyo_scene_Tokyo_Tower_coll-1772465998695.webp",
    "images/topia/36/Apocalyptic_war-torn_Tokyo_scene_Tokyo_Tower_coll-1772466002059.webp",
    "images/topia/36/Apocalyptic_war-torn_Tokyo_scene_Tokyo_Tower_coll-1772466005176.webp",
    "images/topia/36/Apocalyptic_war-torn_Tokyo_scene_Tokyo_Tower_coll-1772466008646.webp"
  ],
  [ // 37 (6 slides)
    "images/topia/37/Apocalyptic_war-torn_Dubai_scene_Burj_Khalifa_top-1772466018945.webp",
    "images/topia/37/Apocalyptic_war-torn_Dubai_scene_Burj_Khalifa_top-1772466023307.webp",
    "images/topia/37/Apocalyptic_war-torn_Dubai_scene_Burj_Khalifa_top-1772466026311.webp",
    "images/topia/37/Apocalyptic_war-torn_Dubai_scene_Burj_Khalifa_top-1772466029396.webp",
    "images/topia/37/Apocalyptic_war-torn_Dubai_scene_Burj_Khalifa_top-1772466032564.webp",
    "images/topia/37/Apocalyptic_war-torn_Dubai_scene_Burj_Khalifa_top-1772466036064.webp"
  ],
  [ // 38 (4 slides)
    "images/topia/38/Change_only_the_sky_and_distant_crystal_mountains_07.webp",
    "images/topia/38/Change_only_the_sky_and_distant_crystal_mountains_08.webp",
    "images/topia/38/Change_only_the_sky_and_distant_crystal_mountains_09.webp",
    "images/topia/38/Change_only_the_sky_and_distant_crystal_mountains_10.webp"
  ],
  [ // 39 (5 slides)
    "images/topia/39/Change_only_the_sky_and_distant_crystal_mountains_11.webp",
    "images/topia/39/Change_only_the_sky_and_distant_crystal_mountains_12.webp",
    "images/topia/39/Change_only_the_sky_and_distant_crystal_mountains_13.webp",
    "images/topia/39/Change_only_the_sky_and_distant_crystal_mountains_14.webp",
    "images/topia/39/Change_only_the_sky_and_distant_crystal_mountains_15.webp"
  ],
  [ // 40 (6 slides)
    "images/topia/40/Apocalyptic_war-torn_Cape_Town_South_Africa_scene-1772400339612.webp",
    "images/topia/40/Same_exact_composition_and_foreground_as_reference-1772400345853.webp",
    "images/topia/40/Same_exact_composition_and_foreground_as_reference-1772400351879.webp",
    "images/topia/40/Same_exact_composition_and_foreground_as_reference-1772400357266.webp",
    "images/topia/40/Same_exact_composition_and_foreground_as_reference-1772400367766.webp",
    "images/topia/40/Same_exact_composition_and_foreground_as_reference-1772400372998.webp"
  ],
  [ // 41 (4 slides)
    "images/topia/41/Devastated_alien_ringworld_fragment_after_bombardm-1772345146363.webp",
    "images/topia/41/Keep_all_foreground_ringworld_ruins_dead_alien_en-1772345286316.webp",
    "images/topia/41/Keep_all_foreground_ringworld_ruins_dead_alien_en-1772345291951.webp",
    "images/topia/41/Keep_all_foreground_ringworld_ruins_dead_alien_en-1772345297819.webp"
  ],
  [ // 42 (4 slides)
    "images/topia/42/Keep_all_foreground_elements_identical_-_the_crash-1772355235485.webp",
    "images/topia/42/Keep_all_foreground_elements_identical_-_the_crash-1772355242520.webp",
    "images/topia/42/Keep_all_foreground_elements_identical_-_the_crash-1772355246386.webp",
    "images/topia/42/Keep_all_foreground_elements_identical_-_the_crash-1772355251387.webp"
  ],
  [ // 43 (5 slides)
    "images/topia/43/Change_only_the_sky_and_distant_mountains_keep_al06.webp",
    "images/topia/43/Change_only_the_sky_and_distant_mountains_keep_al07.webp",
    "images/topia/43/Change_only_the_sky_and_distant_mountains_keep_al08.webp",
    "images/topia/43/Change_only_the_sky_and_distant_mountains_keep_al09.webp",
    "images/topia/43/Change_only_the_sky_and_distant_mountains_keep_al10.webp"
  ],
  [ // 44 (4 slides)
    "images/topia/44/Change_only_the_sky_and_distant_mountains_while_ke06.webp",
    "images/topia/44/Change_only_the_sky_and_distant_mountains_while_ke07.webp",
    "images/topia/44/Change_only_the_sky_and_distant_mountains_while_ke08.webp",
    "images/topia/44/Change_only_the_sky_and_distant_mountains_while_ke09.webp"
  ],
  [ // 45 (5 slides)
    "images/topia/45/Change_only_the_sky_and_distant_mountains_keep_al16.webp",
    "images/topia/45/Change_only_the_sky_and_distant_mountains_keep_al17.webp",
    "images/topia/45/Change_only_the_sky_and_distant_mountains_keep_al18.webp",
    "images/topia/45/Change_only_the_sky_and_distant_mountains_keep_al19.webp",
    "images/topia/45/Change_only_the_sky_and_distant_mountains_keep_al20.webp"
  ],
  [ // 46 (5 slides)
    "images/topia/46/Change_only_the_sky_and_distant_mountains_keep_al11.webp",
    "images/topia/46/Change_only_the_sky_and_distant_mountains_keep_al12.webp",
    "images/topia/46/Change_only_the_sky_and_distant_mountains_keep_al13.webp",
    "images/topia/46/Change_only_the_sky_and_distant_mountains_keep_al14.webp",
    "images/topia/46/Change_only_the_sky_and_distant_mountains_keep_al15.webp"
  ],
  [ // 47 (5 slides)
    "images/topia/47/Change_only_the_sky_and_distant_mountains_while_ke33.webp",
    "images/topia/47/Change_only_the_sky_and_distant_mountains_while_ke34.webp",
    "images/topia/47/Change_only_the_sky_and_distant_mountains_while_ke35.webp",
    "images/topia/47/Change_only_the_sky_and_distant_mountains_while_ke36.webp",
    "images/topia/47/Change_only_the_sky_and_distant_mountains_while_ke37.webp"
  ],
  [ // 48 (6 slides)
    "images/topia/48/Apocalyptic_war-torn_Rome_Italy_scene_Colosseum_-1772399956700.webp",
    "images/topia/48/Same_exact_composition_and_foreground_as_reference-1772399987883.webp",
    "images/topia/48/Same_exact_composition_and_foreground_as_reference-1772399994581.webp",
    "images/topia/48/Same_exact_composition_and_foreground_as_reference-1772400000481.webp",
    "images/topia/48/Same_exact_composition_and_foreground_as_reference-1772400006349.webp",
    "images/topia/48/Same_exact_composition_and_foreground_as_reference-1772400010364.webp"
  ],
  [ // 49 (5 slides)
    "images/topia/49/Change_only_the_sky_and_distant_mountains_while_ke01.webp",
    "images/topia/49/Change_only_the_sky_and_distant_mountains_while_ke02.webp",
    "images/topia/49/Change_only_the_sky_and_distant_mountains_while_ke03.webp",
    "images/topia/49/Change_only_the_sky_and_distant_mountains_while_ke04.webp",
    "images/topia/49/Change_only_the_sky_and_distant_mountains_while_ke05.webp"
  ],
  [ // 50 (10 slides)
    "images/topia/50/Change_only_the_sky_and_distant_mountains_keep_th06.webp",
    "images/topia/50/Change_only_the_sky_and_distant_mountains_keep_th07.webp",
    "images/topia/50/Change_only_the_sky_and_distant_mountains_keep_th08.webp",
    "images/topia/50/Change_only_the_sky_and_distant_mountains_keep_th09.webp",
    "images/topia/50/Change_only_the_sky_and_distant_mountains_keep_th10.webp",
    "images/topia/50/Change_only_the_sky_and_distant_mountains_keep_th11.webp",
    "images/topia/50/Change_only_the_sky_and_distant_mountains_keep_th12.webp",
    "images/topia/50/Change_only_the_sky_and_distant_mountains_keep_th13.webp",
    "images/topia/50/Change_only_the_sky_and_distant_mountains_keep_th14.webp",
    "images/topia/50/Change_only_the_sky_and_distant_mountains_keep_th15.webp"
  ],
  [ // 51 (3 slides)
    "images/topia/51/Apocalyptic_war-torn_Earth_cityscape_devastated_by-1772398650123.webp",
    "images/topia/51/Keep_ALL_foreground_elements_identical_-_same_skel-1772398699030.webp",
    "images/topia/51/Keep_ALL_foreground_elements_identical_-_same_skel-1772398708513.webp"
  ],
  [ // 52 (5 slides)
    "images/topia/52/Change_only_the_sky_and_distant_mountains_while_ke23.webp",
    "images/topia/52/Change_only_the_sky_and_distant_mountains_while_ke24.webp",
    "images/topia/52/Change_only_the_sky_and_distant_mountains_while_ke25.webp",
    "images/topia/52/Change_only_the_sky_and_distant_mountains_while_ke26.webp",
    "images/topia/52/Change_only_the_sky_and_distant_mountains_while_ke27.webp"
  ],
  [ // 53 (4 slides)
    "images/topia/53/Change_only_the_sky_and_distant_mountains_keep_al21.webp",
    "images/topia/53/Change_only_the_sky_and_distant_mountains_keep_al22.webp",
    "images/topia/53/Change_only_the_sky_and_distant_mountains_keep_al23.webp",
    "images/topia/53/Change_only_the_sky_and_distant_mountains_keep_al24.webp"
  ],
  [ // 54 (5 slides)
    "images/topia/54/Change_only_the_sky_and_distant_mountains_keep_al01.webp",
    "images/topia/54/Change_only_the_sky_and_distant_mountains_keep_al02.webp",
    "images/topia/54/Change_only_the_sky_and_distant_mountains_keep_al03.webp",
    "images/topia/54/Change_only_the_sky_and_distant_mountains_keep_al04.webp",
    "images/topia/54/Change_only_the_sky_and_distant_mountains_keep_al05.webp"
  ],
  [ // 55 (4 slides)
    "images/topia/55/Change_only_the_sky_and_distant_mountains_while_ke15.webp",
    "images/topia/55/Change_only_the_sky_and_distant_mountains_while_ke16.webp",
    "images/topia/55/Change_only_the_sky_and_distant_mountains_while_ke17.webp",
    "images/topia/55/Change_only_the_sky_and_distant_mountains_while_ke18.webp"
  ],
  [ // 56 (5 slides)
    "images/topia/56/Change_only_the_sky_and_distant_mountains_while_ke10.webp",
    "images/topia/56/Change_only_the_sky_and_distant_mountains_while_ke11.webp",
    "images/topia/56/Change_only_the_sky_and_distant_mountains_while_ke12.webp",
    "images/topia/56/Change_only_the_sky_and_distant_mountains_while_ke13.webp",
    "images/topia/56/Change_only_the_sky_and_distant_mountains_while_ke14.webp"
  ],
  [ // 57 (6 slides)
    "images/topia/57/Apocalyptic_war-torn_Mexico_City_scene_Teotihuaca-1772400293287.webp",
    "images/topia/57/Same_exact_composition_and_foreground_as_reference-1772400304588.webp",
    "images/topia/57/Same_exact_composition_and_foreground_as_reference-1772400310499.webp",
    "images/topia/57/Same_exact_composition_and_foreground_as_reference-1772400317217.webp",
    "images/topia/57/Same_exact_composition_and_foreground_as_reference-1772400325163.webp",
    "images/topia/57/Same_exact_composition_and_foreground_as_reference-1772400331744.webp"
  ],
  [ // 58 (6 slides)
    "images/topia/58/Apocalyptic_war-torn_Buenos_Aires_Argentina_scene-1772400378101.webp",
    "images/topia/58/Same_exact_composition_and_foreground_as_reference-1772400383128.webp",
    "images/topia/58/Same_exact_composition_and_foreground_as_reference-1772400389184.webp",
    "images/topia/58/Same_exact_composition_and_foreground_as_reference-1772400394235.webp",
    "images/topia/58/Same_exact_composition_and_foreground_as_reference-1772400400191.webp",
    "images/topia/58/Same_exact_composition_and_foreground_as_reference-1772400406156.webp"
  ],
  [ // 59 (6 slides)
    "images/topia/59/Apocalyptic_war-torn_London_UK_scene_Big_Ben_cloc-1772446029757.webp",
    "images/topia/59/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772446037794.webp",
    "images/topia/59/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772446042947.webp",
    "images/topia/59/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772446047563.webp",
    "images/topia/59/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772446051528.webp",
    "images/topia/59/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772446159027.webp"
  ],
  [ // 60 (6 slides)
    "images/topia/60/A_sophisticated_alien_crystal_planet_landscape_pr-1772246552104.webp",
    "images/topia/60/Change_only_the_sky_and_distant_mountains_keep_al-1772211121188.webp",
    "images/topia/60/Change_only_the_sky_and_distant_mountains_keep_al-1772211126249.webp",
    "images/topia/60/Change_only_the_sky_and_distant_mountains_keep_al-1772211133551.webp",
    "images/topia/60/Keep_ALL_foreground_elements_identical_-_same_skel-1772398692823.webp",
    "images/topia/60/Keep_ALL_foreground_elements_identical_-_same_skel-1772398703436.webp"
  ],
  [ // 61 (4 slides)
    "images/topia/61/Alien_planet_of_exotic_strange_flowers_surreal_la-1772210772579.webp",
    "images/topia/61/Change_only_the_sky_and_distant_mountains_keep_al-1772210916022.webp",
    "images/topia/61/Change_only_the_sky_and_distant_mountains_keep_al-1772210919589.webp",
    "images/topia/61/Change_only_the_sky_and_distant_mountains_keep_al-1772210926905.webp"
  ],
  [ // 62 (5 slides)
    "images/topia/62/A_sophisticated_alien_crystal_planet_landscape_pr-1772246554037.webp",
    "images/topia/62/Change_only_the_sky_and_distant_crystalline_mounta-1772246855938.webp",
    "images/topia/62/Change_only_the_sky_and_distant_crystalline_mounta-1772272148419.webp",
    "images/topia/62/Change_only_the_sky_and_distant_crystalline_mounta-1772272158512.webp",
    "images/topia/62/Change_only_the_sky_and_distant_crystalline_mounta-1772272171833.webp"
  ],
  [ // 63 (4 slides)
    "images/topia/63/Alien_planet_of_dead_dry_trees_and_fallen_leaves_-1772211954555.webp",
    "images/topia/63/Change_only_the_sky_and_distant_hills_keep_all_de-1772211994309.webp",
    "images/topia/63/Change_only_the_sky_and_distant_hills_keep_all_de-1772211998711.webp",
    "images/topia/63/Change_only_the_sky_and_distant_hills_keep_all_de-1772212004761.webp"
  ],
  [ // 64 (5 slides)
    "images/topia/64/A_breathtaking_cinematic_fantasy_frozen_landscape-1772273116277.webp",
    "images/topia/64/Change_only_the_sky_and_distant_mountains_while_ke-1772273120797.webp",
    "images/topia/64/Change_only_the_sky_and_distant_mountains_while_ke-1772273127050.webp",
    "images/topia/64/Change_only_the_sky_and_distant_mountains_while_ke-1772273132634.webp",
    "images/topia/64/Change_only_the_sky_and_distant_mountains_while_ke-1772273136715.webp"
  ],
  [ // 65 (4 slides)
    "images/topia/65/Change_only_the_sky_and_distant_mountains_keep_al-1772212233355.webp",
    "images/topia/65/Change_only_the_sky_and_distant_mountains_keep_al-1772212236372.webp",
    "images/topia/65/Change_only_the_sky_and_distant_mountains_keep_al-1772212240161.webp",
    "images/topia/65/Dark_alien_planet_of_skeletons_eerie_landscape_co-1772212184186.webp"
  ],
  [ // 66 (8 slides)
    "images/topia/66/Apocalyptic_war-torn_Athens_Greece_scene_Partheno-1772465222090.webp",
    "images/topia/66/Apocalyptic_war-torn_Athens_Greece_scene_Partheno-1772465226573.webp",
    "images/topia/66/Apocalyptic_war-torn_Athens_Greece_scene_Partheno-1772465231102.webp",
    "images/topia/66/Apocalyptic_war-torn_Athens_Greece_scene_Partheno-1772465235618.webp",
    "images/topia/66/Change_only_the_sky_and_distant_mountains_on_the_h-1772211311292.webp",
    "images/topia/66/Change_only_the_sky_and_distant_mountains_on_the_h-1772211319457.webp",
    "images/topia/66/Change_only_the_sky_and_distant_mountains_on_the_h-1772211329502.webp",
    "images/topia/66/Planet_of_strange_exotic_alien_creatures_surreal_-1772211285355.webp"
  ],
  [ // 67 (21 slides)
    "images/topia/67/New folder (8)01.webp",
    "images/topia/67/New folder (8)02.webp",
    "images/topia/67/New folder (8)03.webp",
    "images/topia/67/New folder (8)04.webp",
    "images/topia/67/New folder (8)05.webp",
    "images/topia/67/New folder (8)06.webp",
    "images/topia/67/New folder (8)07.webp",
    "images/topia/67/New folder (8)08.webp",
    "images/topia/67/New folder (8)09.webp",
    "images/topia/67/New folder (8)10.webp",
    "images/topia/67/New folder (8)11.webp",
    "images/topia/67/New folder (8)12.webp",
    "images/topia/67/New folder (8)13.webp",
    "images/topia/67/New folder (8)14.webp",
    "images/topia/67/New folder (8)15.webp",
    "images/topia/67/New folder (8)16.webp",
    "images/topia/67/New folder (8)17.webp",
    "images/topia/67/New folder (8)18.webp",
    "images/topia/67/New folder (8)19.webp",
    "images/topia/67/New folder (8)20.webp",
    "images/topia/67/New folder (8)21.webp"
  ],
  [ // 68 (4 slides)
    "images/topia/68/Keep_all_foreground_elements_identical_-_the_crash-1772354909352.webp",
    "images/topia/68/Keep_all_foreground_elements_identical_-_the_crash-1772354913402.webp",
    "images/topia/68/Keep_all_foreground_elements_identical_-_the_crash-1772354917818.webp",
    "images/topia/68/Keep_all_foreground_elements_identical_-_the_crash-1772354922536.webp"
  ],
  [ // 69 (4 slides)
    "images/topia/69/Apocalyptic_war-torn_Mumbai_scene_Gateway_of_Indi-1772466049647.webp",
    "images/topia/69/Apocalyptic_war-torn_Mumbai_scene_Gateway_of_Indi-1772466059595.webp",
    "images/topia/69/Apocalyptic_war-torn_Mumbai_scene_Gateway_of_Indi-1772466063015.webp",
    "images/topia/69/Apocalyptic_war-torn_Mumbai_scene_Gateway_of_Indi-1772466066848.webp"
  ],
  [ // 70 (5 slides)
    "images/topia/70/Same_exact_composition_and_foreground_as_reference-1772400432993.webp",
    "images/topia/70/Same_exact_composition_and_foreground_as_reference-1772400438636.webp",
    "images/topia/70/Same_exact_composition_and_foreground_as_reference-1772400443302.webp",
    "images/topia/70/Same_exact_composition_and_foreground_as_reference-1772400448301.webp",
    "images/topia/70/Same_exact_composition_and_foreground_as_reference-1772400454023.webp"
  ],
  [ // 71 (5 slides)
    "images/topia/71/Change_only_the_sky_and_distant_mountains_while_ke28.webp",
    "images/topia/71/Change_only_the_sky_and_distant_mountains_while_ke29.webp",
    "images/topia/71/Change_only_the_sky_and_distant_mountains_while_ke30.webp",
    "images/topia/71/Change_only_the_sky_and_distant_mountains_while_ke31.webp",
    "images/topia/71/Change_only_the_sky_and_distant_mountains_while_ke32.webp"
  ],
  [ // 72 (5 slides)
    "images/topia/72/An_epic_photorealistic_apocalyptic_war-torn_scene_-1772393807721.webp",
    "images/topia/72/Keep_all_foreground_elements_identical_-_destroyed-1772355281890.webp",
    "images/topia/72/Keep_all_foreground_elements_identical_-_destroyed-1772355287203.webp",
    "images/topia/72/Keep_all_foreground_elements_identical_-_destroyed-1772393839880.webp",
    "images/topia/72/Keep_all_foreground_elements_identical_-_destroyed-1772393847210.webp"
  ],
  [ // 73 (5 slides)
    "images/topia/73/Change_only_the_sky_and_distant_mountains_keep_th01.webp",
    "images/topia/73/Change_only_the_sky_and_distant_mountains_keep_th02.webp",
    "images/topia/73/Change_only_the_sky_and_distant_mountains_keep_th03.webp",
    "images/topia/73/Change_only_the_sky_and_distant_mountains_keep_th04.webp",
    "images/topia/73/Change_only_the_sky_and_distant_mountains_keep_th05.webp"
  ],
  [ // 74 (6 slides)
    "images/topia/74/Apocalyptic_war-torn_Toronto_Canada_scene_CN_Towe-1772400244037.webp",
    "images/topia/74/Same_exact_composition_and_foreground_as_reference-1772400249291.webp",
    "images/topia/74/Same_exact_composition_and_foreground_as_reference-1772400256761.webp",
    "images/topia/74/Same_exact_composition_and_foreground_as_reference-1772400271426.webp",
    "images/topia/74/Same_exact_composition_and_foreground_as_reference-1772400279731.webp",
    "images/topia/74/Same_exact_composition_and_foreground_as_reference-1772400286694.webp"
  ],
  [ // 75 (5 slides)
    "images/topia/75/An_epic_photorealistic_apocalyptic_war-torn_scene_-1772393866413.webp",
    "images/topia/75/Keep_all_foreground_elements_identical_-_destroyed-1772393882356.webp",
    "images/topia/75/Keep_all_foreground_elements_identical_-_destroyed-1772393890295.webp",
    "images/topia/75/Keep_all_foreground_elements_identical_-_destroyed-1772393895363.webp",
    "images/topia/75/Keep_all_foreground_elements_identical_-_destroyed-1772393900213.webp"
  ],
  [ // 76 (5 slides)
    "images/topia/76/An_epic_photorealistic_apocalyptic_war-torn_scene_-1772394822811.webp",
    "images/topia/76/Keep_all_foreground_elements_identical_-_destroyed-1772394835011.webp",
    "images/topia/76/Keep_all_foreground_elements_identical_-_destroyed-1772394840259.webp",
    "images/topia/76/Keep_all_foreground_elements_identical_-_destroyed-1772394842662.webp",
    "images/topia/76/Keep_all_foreground_elements_identical_-_destroyed-1772394844249.webp"
  ],
  [ // 77 (4 slides)
    "images/topia/77/Change_only_the_sky_and_distant_mountains_while_ke19.webp",
    "images/topia/77/Change_only_the_sky_and_distant_mountains_while_ke20.webp",
    "images/topia/77/Change_only_the_sky_and_distant_mountains_while_ke21.webp",
    "images/topia/77/Change_only_the_sky_and_distant_mountains_while_ke22.webp"
  ],
  [ // 78 (4 slides)
    "images/topia/78/Keep_all_foreground_cliff_ruins_alien_corpses_and-1772342306346.webp",
    "images/topia/78/Keep_all_foreground_cliff_ruins_alien_corpses_and-1772342311496.webp",
    "images/topia/78/Keep_all_foreground_cliff_ruins_alien_corpses_and-1772342321204.webp",
    "images/topia/78/Keep_all_foreground_cliff_ruins_alien_corpses_and-1772342324947.webp"
  ],
  [ // 79 (4 slides)
    "images/topia/79/Change_only_the_sky_and_distant_mountains_while_ke45.webp",
    "images/topia/79/Change_only_the_sky_and_distant_mountains_while_ke46.webp",
    "images/topia/79/Change_only_the_sky_and_distant_mountains_while_ke47.webp",
    "images/topia/79/Change_only_the_sky_and_distant_mountains_while_ke48.webp"
  ],
  [ // 80 (2 slides)
    "images/topia/80/Change_only_the_sky_and_distant_mountains_while_ke38.webp",
    "images/topia/80/Change_only_the_sky_and_distant_mountains_while_ke39.webp"
  ],
  [ // 81 (5 slides)
    "images/topia/81/Change_only_the_sky_and_distant_mountains_while_ke40.webp",
    "images/topia/81/Change_only_the_sky_and_distant_mountains_while_ke41.webp",
    "images/topia/81/Change_only_the_sky_and_distant_mountains_while_ke42.webp",
    "images/topia/81/Change_only_the_sky_and_distant_mountains_while_ke43.webp",
    "images/topia/81/Change_only_the_sky_and_distant_mountains_while_ke44.webp"
  ],
  [ // 82 (2 slides)
    "images/topia/82/Apocalyptic_war-torn_Athens_Greece_scene_Acropoli-1772447495770.webp",
    "images/topia/82/SAME_EXACT_COMPOSITION_AS_REFERENCE_IMAGE_Keep_al-1772447509205.webp"
  ],
];

// ===== NO-REPEAT TOPIA SHUFFLER =====
// Picks a random folder each time; only repeats after all have been played.
var _topiaShuffleQueue = [];
function _topiaNextFolder() {
  if (_topiaShuffleQueue.length === 0) {
    // Refill: create indices 0..N-1 and Fisher-Yates shuffle
    var n = TOPIA_STAGE_CATALOG.length;
    var arr = [];
    for (var i = 0; i < n; i++) arr.push(i);
    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    _topiaShuffleQueue = arr;
  }
  return TOPIA_STAGE_CATALOG[_topiaShuffleQueue.pop()];
}

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
// LEVEL Ε — ΕΧΘΡΟΙ E (Exthos Group E) — 26 sprites
// ===================================================================
var level_exthos_e_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 6, columns: 9, spacing_x: 50, spacing_y: 48, start_y: 25, initial_speed: 50, cooldown_ms: 950, diveCooldown: 2.0 } ],
  [ 3000,    60000, 6000,  'bonus_flyby',    { speed: 95 } ],
  [ 5000,    6000,  99999, 'falling_row',    { columns: 8, spacing_x: 46, down_speed: 60 } ],
  [ 7000,    15000, 1500,  'zigzag_enemy' ],
  [ 7000,    15000, 1500,  'spiral_enemy' ],
  [ 16000,   17000, 99999, 'grid_formation', { rows: 4, columns: 10, spacing_x: 48, spacing_y: 46, start_y: 22, initial_speed: 52, cooldown_ms: 900, diveCooldown: 1.8 } ],
  [ 20000,   28000, 1500,  'scurve_left' ],
  [ 20000,   28000, 1500,  'scurve_right' ],
  [ 28000,   36000, 1400,  'cork_left' ],
  [ 28000,   36000, 1400,  'cork_right' ],
  [ 36000,   44000, 1400,  'fig8_left' ],
  [ 36000,   44000, 1400,  'fig8_right' ],
  [ 44000,   52000, 1300,  'boomerang_left' ],
  [ 44000,   52000, 1300,  'boomerang_right' ],
  [ 53000,   54500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL — ΝΕΑ ΤΕΡΑΤΑ (32 sprites)
// ===================================================================
var level_nea_terata_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 6, columns: 9, spacing_x: 52, spacing_y: 50, start_y: 26, initial_speed: 48, cooldown_ms: 1000, diveCooldown: 2.2 } ],
  [ 3000,    55000, 6500,  'bonus_flyby',    { speed: 90 } ],
  [ 6000,    7000,  99999, 'falling_row',    { columns: 7, spacing_x: 50, down_speed: 55 } ],
  [ 8000,    16000, 1700,  'fig8_left' ],
  [ 8000,    16000, 1700,  'fig8_right' ],
  [ 16000,   24000, 1500,  'zigzag_enemy' ],
  [ 17000,   25000, 1600,  'spiral_enemy' ],
  [ 24000,   32000, 1500,  'scurve_left' ],
  [ 24000,   32000, 1500,  'scurve_right' ],
  [ 32000,   40000, 1400,  'cork_left' ],
  [ 32000,   40000, 1400,  'cork_right' ],
  [ 40000,   48000, 1300,  'boomerang_left' ],
  [ 40000,   48000, 1300,  'boomerang_right' ],
  [ 49000,   50500, 2000,  'mother_large' ]
];

// ===================================================================
// LEVEL — ΣΚΟΥΡΕΣ (3 sprites)
// ===================================================================
var level_skoures_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 5, columns: 7, spacing_x: 62, spacing_y: 55, start_y: 30, initial_speed: 50, cooldown_ms: 900, diveCooldown: 2.5 } ],
  [ 3000,    45000, 6000,  'bonus_flyby',    { speed: 92 } ],
  [ 8000,    16000, 1200,  'swoop_left' ],
  [ 8000,    16000, 1200,  'swoop_right' ],
  [ 16000,   24000, 1400,  'boomerang_left' ],
  [ 16000,   24000, 1400,  'boomerang_right' ],
  [ 24000,   32000, 1500,  'fig8_left' ],
  [ 24000,   32000, 1500,  'fig8_right' ],
  [ 33000,   40500, 2000,  'mother_medium' ]
];

// ===================================================================
// LEVEL — ΜΑΥΡΙΣ ΦΥΛΕΣ (2 sprites)
// ===================================================================
var level_mavris_tribes_data = [
  [ 0,       1000,  99999, 'grid_formation', { rows: 6, columns: 8, spacing_x: 60, spacing_y: 52, start_y: 30, initial_speed: 48, cooldown_ms: 950, diveCooldown: 2.8 } ],
  [ 3000,    45000, 6500,  'bonus_flyby',    { speed: 95 } ],
  [ 8000,    9000,  99999, 'falling_row',    { columns: 6, spacing_x: 54, down_speed: 55 } ],
  [ 12000,   20000, 2000,  'scurve_left' ],
  [ 12000,   20000, 2000,  'scurve_right' ],
  [ 20000,   28000, 1800,  'fig8_left' ],
  [ 20000,   28000, 1800,  'fig8_right' ],
  [ 28000,   36000, 1500,  'spiral_enemy' ],
  [ 29000,   37000, 1500,  'zigzag_enemy' ],
  [ 37000,   44500, 2000,  'mother_large' ]
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

// ===== SPECIAL BONUS STAGE — 7α — crystal mountains, terata_p enemies =====
var pool_special_bonus = [
  'nea_t_1','nea_t_2','nea_t_3','nea_t_4','nea_t_5','nea_t_6','nea_t_7','nea_t_8','nea_t_9','nea_t_10'
];
var level_special_bonus_data = [
  [ 0,       800,   99999, 'grid_formation', { rows: 5, columns: 7, spacing_x: 56, spacing_y: 52, start_y: 30, initial_speed: 48, cooldown_ms: 950, diveCooldown: 3.2 } ],
  [ 3000,    26000, 4500,  'bonus_flyby',    { speed: 90 } ],
  [ 6000,    12000, 1400,  'zigzag_enemy' ],
  [ 6500,    12500, 1500,  'spiral_enemy' ],
  [ 11000,   18000, 1200,  'swoop_left' ],
  [ 11000,   18000, 1200,  'swoop_right' ],
  [ 16000,   23000, 1300,  'boomerang_left' ],
  [ 16000,   23000, 1300,  'boomerang_right' ],
  [ 20000,   26000, 99999, 'falling_row',    { columns: 6, spacing_x: 50, down_speed: 50 } ],
  [ 22000,   28000, 1100,  'cork_left' ],
  [ 22000,   28000, 1100,  'cork_right' ]
];

// ===== SIREN GAUNTLET — portrait images =====
var _sirenPortraitFiles = [
  'images/\u03a0\u03c1\u03cc\u03c3\u03c9\u03c0\u03b1 \u03ba\u03bf\u03c0\u03ad\u03bb\u03bf\u03c5/Extreme_close-up_portrait_of_a_breathtakingly_beau-1771968651599.webp',
  'images/\u03a0\u03c1\u03cc\u03c3\u03c9\u03c0\u03b1 \u03ba\u03bf\u03c0\u03ad\u03bb\u03bf\u03c5/Extreme_tight_portrait_stunning_Indian_woman_with-1771970827668.webp',
  'images/\u03a0\u03c1\u03cc\u03c3\u03c9\u03c0\u03b1 \u03ba\u03bf\u03c0\u03ad\u03bb\u03bf\u03c5/Macro_beauty_portrait_gorgeous_Nigerian_woman_wit-1771970839935.webp',
  'images/\u03a0\u03c1\u03cc\u03c3\u03c9\u03c0\u03b1 \u03ba\u03bf\u03c0\u03ad\u03bb\u03bf\u03c5/Ultra-close_beauty_portrait_beautiful_Korean_woma-1771970833019.webp',
  'images/\u03a0\u03c1\u03cc\u03c3\u03c9\u03c0\u03b1 \u03ba\u03bf\u03c0\u03ad\u03bb\u03bf\u03c5/Extreme_close-up_portrait_of_a_stunning_Scandinavi-1771969542916.webp',
  'images/\u03a0\u03c1\u03cc\u03c3\u03c9\u03c0\u03b1 \u03ba\u03bf\u03c0\u03ad\u03bb\u03bf\u03c5/Macro_close-up_portrait_gorgeous_Brazilian_woman_-1771970823985.webp',
  'images/\u03a0\u03c1\u03cc\u03c3\u03c9\u03c0\u03b1 \u03ba\u03bf\u03c0\u03ad\u03bb\u03bf\u03c5/Extreme_close-up_portrait_stunning_French_woman_w-1771970814733.webp',
  'images/\u03a0\u03c1\u03cc\u03c3\u03c9\u03c0\u03b1 \u03ba\u03bf\u03c0\u03ad\u03bb\u03bf\u03c5/Ultra_close-up_portrait_beautiful_Swedish_woman_w-1771970819220.webp'
];

// SIREN GAUNTLET — 3 portrait chain (each portrait summons enemies; destroy all 3 to clear)
var level_siren_data = [
  // Intro swoop waves to welcome the player before the first portrait appears
  [ 0,    2800, 1100, 'swoop_left'  ],
  [ 0,    2800, 1100, 'swoop_right' ],
  // Portrait chain — spawns at t=3s, entry expires at t=4s (one-time spawn)
  // Portrait 1 → 2 → 3 are chained via 'next' opts; last portrait has no 'next'
  [ 3000, 4000, 9999, 'siren_portrait', {
    portraitFile: _sirenPortraitFiles[0],
    health:       280,
    spawnRate:    4.0,
    spawnType:    'swoop_left',
    points:       600,
    next: {
      portraitFile: _sirenPortraitFiles[1],
      health:       420,
      spawnRate:    3.2,
      spawnType:    'zigzag_enemy',
      points:       900,
      next: {
        portraitFile: _sirenPortraitFiles[2],
        health:       600,
        spawnRate:    2.5,
        spawnType:    'spiral_enemy',
        points:       1400
      }
    }
  }]
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


var LevelTransitionScreen = function(fromLevel, toLevel, callback, previewPool) {
  var t = 0;
  var duration = 3.0;
  var done = false;
  // Random frame each time — different every game restart and every level
  var _frameIdx = Math.floor(Math.random() * _transitionFrameFiles.length);

  // Pick up to 8 unique sprites from the next level's pool — shown as mini vertical columns
  var _prevSprites = [];
  if(previewPool && previewPool.length >= 1) {
    var _poolCopy = previewPool.slice();
    // Shuffle
    for(var _si = _poolCopy.length - 1; _si > 0; _si--) {
      var _sj = Math.floor(Math.random() * (_si + 1));
      var _tmp = _poolCopy[_si]; _poolCopy[_si] = _poolCopy[_sj]; _poolCopy[_sj] = _tmp;
    }
    // Deduplicate and take up to 8
    var _seen = {};
    for(var _si2 = 0; _si2 < _poolCopy.length && _prevSprites.length < 8; _si2++) {
      if(!_seen[_poolCopy[_si2]]) {
        _seen[_poolCopy[_si2]] = true;
        _prevSprites.push(_poolCopy[_si2]);
      }
    }
  }
  var frameFile = _transitionFrameFiles[_frameIdx];
  var frameImg = new Image();
  var frameLoaded = false;
  frameImg.onload = function() { frameLoaded = true; };
  frameImg.src = frameFile;

  // (Side figures removed from transition screen)

  // Pick 7 unique random enemies from all pools — different every time
  var _rowEnemies = [];
  var _rp = _getMorphSpritePool().slice();
  for(var _ri = _rp.length - 1; _ri > 0; _ri--) {
    var _rj = Math.floor(Math.random() * (_ri + 1));
    var _rt = _rp[_ri]; _rp[_ri] = _rp[_rj]; _rp[_rj] = _rt;
  }
  var _rseen = {};
  for(var _ri2 = 0; _ri2 < _rp.length && _rowEnemies.length < 7; _ri2++) {
    if(!_rseen[_rp[_ri2]]) { _rseen[_rp[_ri2]] = true; _rowEnemies.push(_rp[_ri2]); }
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

    // Semi-transparent overlay — stars show through from boards 0/1
    ctx.fillStyle = 'rgba(0,0,12,0.38)';
    ctx.fillRect(0, 0, w, h);

    // Decorative frame — scale to cover screen maintaining aspect ratio (no distortion)
    // _dx/_dw declared here so enemy columns can use them even if frame not loaded yet
    var _dx = w * 0.15, _dw = w * 0.70; // defaults — updated when frameLoaded
    if(frameLoaded) {
      ctx.save();
      ctx.globalAlpha = 0.95;
      var _iw = frameImg.naturalWidth  || w;
      var _ih = frameImg.naturalHeight || h;
      // contain: scale to fit entirely within screen (no overflow)
      var _scale = Math.min(w / _iw, h / _ih);
      _dw = _iw * _scale; var _dh = _ih * _scale;
      _dx = (w - _dw) / 2;
      var _dy = (h - _dh) / 2;
      ctx.drawImage(frameImg, _dx, _dy, _dw, _dh);
      ctx.restore();
    }

    // All text grouped in lower portion of frame, close together
    var titleSize = Math.max(16, Math.min(Math.floor(h * 0.052), 64)); // 20% smaller
    var subSize   = Math.max(10, Math.min(Math.floor(h * 0.032), 40));
    var lineGap   = titleSize * 0.22; // tight gap between lines

    // Group lower on screen — near the girls' knees
    var barH2 = 5;
    var totalGroupH = titleSize + lineGap + subSize + lineGap + barH2 + 4;
    var groupTopY  = h * 0.75 - totalGroupH / 2;
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

    // Row of 7 random enemies below the text group
    if(_rowEnemies.length > 0 && SpriteSheet && SpriteSheet.map) {
      var _rSz  = Math.round(Math.min(h * 0.07, w / 10, 52));
      var _rGap = Math.round(_rSz * 0.40);
      var _rTotalW = _rowEnemies.length * _rSz + (_rowEnemies.length - 1) * _rGap;
      var _rStartX = (w - _rTotalW) / 2;
      var _rY = barBottomY + _rSz * 0.5 + 18;
      for(var _rei = 0; _rei < _rowEnemies.length; _rei++) {
        var _re = _rowEnemies[_rei];
        if(!SpriteSheet.map[_re]) continue;
        var _rx = _rStartX + _rei * (_rSz + _rGap);
        var _rg = 0.70 + 0.25 * Math.sin(t * 1.6 + _rei * 0.9);
        ctx.save();
        ctx.globalAlpha = _rg;
        ctx.shadowColor = '#FFAACC';
        ctx.shadowBlur = 14;
        SpriteSheet.draw(ctx, _re, _rx, _rY - _rSz * 0.5, 0, _rSz, _rSz);
        ctx.restore();
      }
    }

    // Enemy preview columns — centered in the gap on each side of the central frame
    var figWL = 0, figWR = 0; // no side figures
    if(_prevSprites.length > 0 && SpriteSheet && SpriteSheet.map) {
      var _sprSz   = Math.round(Math.min(h * 0.10, w * 0.08));
      var _colGapY = Math.round(_sprSz * 0.20);

      // Split sprite list in half: first half → left column, rest → right column
      var _half = Math.ceil(_prevSprites.length / 2);
      var _lCol = _prevSprites.slice(0, _half);
      var _rCol = _prevSprites.slice(_half);

      // Centre each column in its gap: midpoint between warrior edge and frame edge
      // Left gap: figWL → _dx  |  Right gap: (_dx+_dw) → (w-figWR)
      var _lGapCx = (figWL + _dx) / 2;                   // centre X of left gap
      var _rGapCx = (_dx + _dw + w - figWR) / 2;         // centre X of right gap
      var _lColX  = Math.max(2, _lGapCx - _sprSz / 2);
      var _rColX  = Math.min(w - _sprSz - 2, _rGapCx - _sprSz / 2);

      var _drawPreviewCol = function(col, baseX) {
        var _colH = col.length * _sprSz + (col.length - 1) * _colGapY;
        var _sy0  = (h - _colH) / 2;
        for(var _ci = 0; _ci < col.length; _ci++) {
          var _spr = col[_ci];
          if(!SpriteSheet.map[_spr]) continue;
          var _spY  = _sy0 + _ci * (_sprSz + _colGapY);
          var _glow = 0.65 + 0.25 * Math.sin(t * 1.8 + _ci * 1.1);
          ctx.save();
          ctx.globalAlpha = _glow;
          ctx.shadowColor = '#AACCFF';
          ctx.shadowBlur = 12;
          SpriteSheet.draw(ctx, _spr, baseX, _spY, 0, _sprSz, _sprSz);
          ctx.restore();
        }
      };

      if(_lCol.length > 0) _drawPreviewCol(_lCol, _lColX);
      if(_rCol.length > 0) _drawPreviewCol(_rCol, _rColX);
    }

  };
};

var winGame = function() {
  Game.playing = false;
  Game.paused = false;
  _isNewGame = true;
  _clearProgressFromStorage(); // game complete — remove save
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
  _isNewGame = true;
  _clearProgressFromStorage(); // game over — remove save
  currentLevel = 1; // Reset level on game over
  Game.motherShipCount = 0;
  var isNewHighScore = saveHighScore(Game.points);
  var again = Game.mobile ? "Tap FIRE to play again" : "Press fire to play again";
  var subtitle = isNewHighScore ?
    "NEW HIGH SCORE: " + Game.points + "! " + again :
    "Score: " + Game.points + " | High Score: " + highScore + " \u2013 " + again;
  SoundManager.playGameOver();
  SoundManager.playAlienTaunt(); // aliens gloat on game over
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

  // ---- Constellation setup (only needed on the background clear layer) ----
  var _constKeys = [
    'Ori','UMa','Cas','Leo','Gem','Tau','Cyg','Per','Lyr','Aql',
    'Sgr','Vir','Her','Boo','CrB','Peg','And','Cen','Cru','Sco',
    'Ari','Psc','Aqr','Cap','Lib','Cnc','Oph','Ser','Aur','CMa',
    'CMi','Lep','Eri','UMi','Dra','Cep','CrA','PsA','Lup','Ara',
    'Tri','Del','Sge','Vul','Equ','Col','Pup','Vel','Crv','Crt',
    'Hya','Mon','Lyn','LMi','Com','CVn','Car','Mus','Cir','Nor',
    'TrA','Tel','Mic','Scl','Phe','For','Cet','Oct','Hyi','Ret',
    'Pic','Dor','Vol','Pyx','Ant','Sex','Cha','Men','Ind','Gru'
  ];
  var _constShapes = [];
  for(var _ci = 0; _ci < _constKeys.length; _ci++) {
    _constShapes.push(_buildConstShape(_CR[_constKeys[_ci]], 88));
  }
  // Positions on the rotating big canvas (offsets from screen center)
  var _constPos = [
    [-130,-160],[140,-150],[-200,-30],[190,-50],[-100,120],[110,130],[10,-200],[-180,120],[170,140],[-20,200],
    [-60,-100],[80,-80],[-150,50],[130,10],[-30,160],[50,140],[-100,-200],[100,200],[-200,-120],[200,120],
    [-50,-50],[160,-80],[70,170],[-170,60],[30,-150],[120,-170],[-90,80],[180,-160],[-20,-80],[90,-30],
    [-140,100],[60,-180],[200,50],[-80,190],[140,80],[-160,-40],[0,120],[-110,-130],[150,-60],[220,80],
    [-220,30],[70,-120],[-30,200],[160,160],[-190,140],[110,-90],[40,80],[-120,170],[200,-80],[-60,60],
    [-200,80],[100,-200],[170,-20],[-150,-100],[20,160],[-80,-160],[130,-130],[-40,40],[80,120],[-180,-60],
    [50,-80],[200,160],[-140,30],[90,80],[-100,-50],[170,100],[-60,-130],[140,50],[-20,-180],[110,170],
    [-170,-160],[60,200],[-100,150],[30,-230],[-150,200],[180,70],[100,60],[-130,-20],[-230,100],[150,-200]
  ];

  this.draw = function(ctx) {
    // Rotate the star canvas around the screen centre
    ctx.save();
    ctx.translate(_cx, _cy);
    ctx.rotate(_angle);
    ctx.drawImage(stars, -_big / 2, -_big / 2);

    // Draw constellation for current stage (one per level, cycles through all 80)
    if(clear) {
      var _lvl = (typeof currentLevel !== 'undefined') ? currentLevel : 1;
      var _cidx = (_lvl - 1) % _constKeys.length;
      var _shape = _constShapes[_cidx];
      var _pos   = _constPos[_cidx];

      ctx.strokeStyle = 'rgba(160,185,255,0.22)';
      ctx.lineWidth   = 1;
      ctx.lineCap     = 'round';
      ctx.shadowColor = 'rgba(120,160,255,0.35)';
      ctx.shadowBlur  = 3;
      ctx.save();
      ctx.translate(_pos[0], _pos[1]);

      for(var _csi = 0; _csi < _shape.segs.length; _csi++) {
        var _cseg = _shape.segs[_csi];
        if(_cseg.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(_cseg[0][0], _cseg[0][1]);
        for(var _csj = 1; _csj < _cseg.length; _csj++)
          ctx.lineTo(_cseg[_csj][0], _cseg[_csj][1]);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(200,220,255,0.50)';
      ctx.shadowBlur = 5;
      for(var _csi2 = 0; _csi2 < _shape.segs.length; _csi2++) {
        for(var _csj2 = 0; _csj2 < _shape.segs[_csi2].length; _csj2++) {
          var _cpt = _shape.segs[_csi2][_csj2];
          ctx.beginPath();
          ctx.arc(_cpt[0], _cpt[1], 1.8, 0, TAU);
          ctx.fill();
        }
      }

      ctx.fillStyle = 'rgba(140,165,255,0.28)';
      ctx.shadowBlur = 0;
      ctx.font = '7px sans-serif';
      ctx.fillText(_shape.name, -14, 54);
      ctx.restore();
      ctx.shadowBlur = 0;
    }

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
  this.stars  = [];
  this.flares = []; // ignition bursts when a meteor burns up
  // Pre-allocate flare object pool — reuse to avoid GC during meteor showers
  this._flarePool = [];
  for(var _fp = 0; _fp < 300; _fp++)
    this._flarePool.push({x:0,y:0,vx:0,vy:0,life:0,maxLife:1,size:0,_pooled:true});
  this._fpNext = 0;
  // First shower quickly, then periodic 30-150s gaps (max ~3-4 min total)
  this.showerTimer  = 8 + Math.random() * 12;
  this.showerActive = false;
  this.showerLeft   = 0;
  this.showerSpawn  = 0;
  this.showerVx = 0; this.showerVy = 0;
};

ShootingStarSystem.prototype._startShower = function() {
  // 30% chance: vertical rain (straight down, like a star shower curtain)
  // 70% chance: classic diagonal meteor streak
  var isVertical = Math.random() < 0.30;
  var ang, flip, spd;
  if(isVertical) {
    // Nearly straight down: 83-90° from horizontal → vx very small, vy dominant
    ang  = (83 + Math.random() * 7) * Math.PI / 180;
    flip = Math.random() < 0.5 ? 1 : -1;
    spd  = 200 + Math.random() * 180;
    this.showerLeft = 35 + Math.floor(Math.random() * 25); // denser: 35-59 meteors
  } else {
    // Diagonal angle: 45-70° from horizontal → noticeable slant, not vertical
    ang  = (45 + Math.random() * 25) * Math.PI / 180;
    flip = Math.random() < 0.5 ? 1 : -1;
    spd  = 320 + Math.random() * 260;
    this.showerLeft = 20 + Math.floor(Math.random() * 20); // 20-39 meteors
  }
  this.showerVx   = flip * spd * Math.cos(ang);
  this.showerVy   = spd * Math.sin(ang);           // always downward
  this.showerSpawn  = 0;
  this.showerActive = true;
  // Next gap: 30-150s → max total cycle (shower ~8s + wait) ≈ 3-4 min
  this.showerTimer = 30 + Math.random() * 120;
};

ShootingStarSystem.prototype.step = function(dt) {
  this.showerTimer -= dt;
  if(this.showerTimer <= 0 && !this.showerActive) this._startShower();

  if(this.showerActive && this.showerLeft > 0) {
    this.showerSpawn -= dt;
    if(this.showerSpawn <= 0) {
      this.showerSpawn = 0.12 + Math.random() * 0.18; // spawn every 0.12-0.30s
      this.showerLeft--;
      // All start from top edge, spread across full width
      var sx = Math.random() * Game.width;
      var sy = -8;
      var dv = (Math.random() - 0.5) * 0.15; // tiny angle variation within shower
      var cv = Math.cos(dv), sv = Math.sin(dv);
      var vx = this.showerVx*cv - this.showerVy*sv;
      var vy = this.showerVx*sv + this.showerVy*cv;
      var rnd = Math.random();
      var sz, trail, isLarge;
      if(rnd < 0.50) {       // small meteor (50%)
        sz = 0.8 + Math.random() * 1.0; trail = 35 + Math.random() * 45;   isLarge = false;
      } else if(rnd < 0.78) {// medium (28%)
        sz = 1.4 + Math.random() * 1.4; trail = 65 + Math.random() * 75;   isLarge = false;
      } else if(rnd < 0.93) {// large — fat cloud trail (15%)
        sz = 2.2 + Math.random() * 2.2; trail = 130 + Math.random() * 140; isLarge = true;
      } else {               // comet — very long cloud trail (7%)
        sz = 2.8 + Math.random() * 2.8; trail = 260 + Math.random() * 220; isLarge = true;
      }
      var _phase = Math.random() * TAU;
      var _nDots = isLarge ? 32 : 18;
      var _tOffX = new Float32Array(_nDots);
      var _tOffY = new Float32Array(_nDots);
      for(var _td = 0; _td < _nDots; _td++) {
        _tOffX[_td] = Math.sin(_td * 2.31 + _phase);
        _tOffY[_td] = Math.cos(_td * 1.73 + _phase * 0.9);
      }
      var _sp = Math.sqrt(vx*vx + vy*vy);
      this.stars.push({ x:sx, y:sy, vx:vx, vy:vy,
        trail: trail, size: sz, isLarge: isLarge,
        phase: _phase, life: 4 + Math.random() * 2,
        speed: _sp,        // cached — avoids sqrt in draw()
        trailOffX: _tOffX, // pre-computed — avoids sin/cos in draw()
        trailOffY: _tOffY
      });
      if(this.showerLeft <= 0) this.showerActive = false;
    }
  }

  for(var i = this.stars.length-1; i >= 0; i--) {
    var s = this.stars[i];
    s.x += s.vx*dt; s.y += s.vy*dt; s.life -= dt;
    s.speed = Math.sqrt(s.vx*s.vx + s.vy*s.vy); // update cached speed
    var offScreen = (s.x > Game.width+400 || s.y > Game.height+400 || s.x < -400 || s.y < -400);
    if(s.life <= 0 || offScreen) {
      // Ignition burst — only if star is still visible on screen (not off-screen)
      if(!offScreen && s.isLarge && Math.random() < 0.75) {
        for(var p = 0; p < 14; p++) {
          var pang = Math.random() * TAU;
          var pspd = 40 + Math.random() * 100;
          var _fl = this._flarePool[this._fpNext]; this._fpNext = (this._fpNext+1) % 300;
          _fl.x=s.x; _fl.y=s.y; _fl.vx=Math.cos(pang)*pspd; _fl.vy=Math.sin(pang)*pspd;
          _fl.life=0.5+Math.random()*0.5; _fl.maxLife=1.0; _fl.size=s.size*(0.4+Math.random()*0.8);
          this.flares.push(_fl);
        }
      } else if(!offScreen && Math.random() < 0.35) {
        for(var p = 0; p < 6; p++) {
          var pang = Math.random() * TAU;
          var _fl = this._flarePool[this._fpNext]; this._fpNext = (this._fpNext+1) % 300;
          _fl.x=s.x; _fl.y=s.y; _fl.vx=Math.cos(pang)*(30+Math.random()*60); _fl.vy=Math.sin(pang)*(30+Math.random()*60);
          _fl.life=0.3+Math.random()*0.3; _fl.maxLife=0.6; _fl.size=s.size*(0.3+Math.random()*0.5);
          this.flares.push(_fl);
        }
      }
      this.stars.splice(i, 1);
    }
  }
  // Update flares
  for(var j = this.flares.length-1; j >= 0; j--) {
    var f = this.flares[j];
    f.x += f.vx * dt; f.y += f.vy * dt;
    f.vx *= (1 - dt * 2.5); f.vy *= (1 - dt * 2.5); // drag
    f.life -= dt;
    if(f.life <= 0) this.flares.splice(j, 1);
  }
};

ShootingStarSystem.prototype.draw = function(ctx) {
  if(!this.stars.length) return;
  ctx.save();
  for(var i = 0; i < this.stars.length; i++) {
    var s   = this.stars[i];
    var sp  = s.speed || Math.sqrt(s.vx*s.vx + s.vy*s.vy); // use cached speed
    var nx  = s.vx/sp, ny = s.vy/sp;
    var a   = Math.min(1, s.life * 0.65);
    var nDots = s.isLarge ? 32 : 18;
    var _tOffX = s.trailOffX, _tOffY = s.trailOffY;

    // Cloud-dot trail: many tiny dots with stable jitter (no flicker)
    for(var d = 0; d < nDots; d++) {
      var t  = d / (nDots - 1); // 0 = head, 1 = tail
      // Use pre-computed offsets — no sin/cos in draw loop
      var jw = s.size * (s.isLarge ? 4.5 : 2.2) * t;
      var jx = (_tOffX ? _tOffX[d] : Math.sin(d * 2.31 + s.phase)) * jw;
      var jy = (_tOffY ? _tOffY[d] : Math.cos(d * 1.73 + s.phase * 0.9)) * jw * 0.5;
      var px = s.x - nx * s.trail * t + jx;
      var py = s.y - ny * s.trail * t + jy;

      // Color: head = warm yellow-white → orange → orange-red at tail
      var cr, cg, cb;
      if(t < 0.35) {
        var tf = t / 0.35;
        cr = 255; cg = Math.round(240 - tf * 80); cb = Math.round(160 - tf * 130);
      } else {
        var tf = (t - 0.35) / 0.65;
        cr = Math.round(255 - tf * 60); cg = Math.round(160 - tf * 120); cb = Math.round(30 - tf * 28);
      }

      var dotAlpha = (1 - t) * a * (s.isLarge ? 0.50 : 0.38);
      var dotR     = s.size * (1 - t * 0.5) * (s.isLarge ? 1.4 : 1.0);

      // Soft halo around each dot (cloud feel)
      ctx.globalAlpha = dotAlpha * 0.28;
      ctx.fillStyle = 'rgb(' + cr + ',' + cg + ',' + cb + ')';
      ctx.beginPath();
      ctx.arc(px, py, dotR * 3.2, 0, TAU);
      ctx.fill();
      // Dot core
      ctx.globalAlpha = dotAlpha;
      ctx.beginPath();
      ctx.arc(px, py, dotR, 0, TAU);
      ctx.fill();
    }

    // Bright head glow (warm white-yellow)
    var hr = s.size * (s.isLarge ? 5 : 3);
    var hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, hr);
    hg.addColorStop(0,   'rgba(255,250,210,' + (a * 0.95) + ')');
    hg.addColorStop(0.3, 'rgba(255,180, 60,' + (a * 0.45) + ')');
    hg.addColorStop(1,   'rgba(220, 80, 10,0)');
    ctx.beginPath(); ctx.arc(s.x, s.y, hr, 0, TAU);
    ctx.fillStyle = hg; ctx.fill();
  }

  // Draw ignition flares (fire burst particles)
  for(var fi = 0; fi < this.flares.length; fi++) {
    var f  = this.flares[fi];
    var ft = f.life / f.maxLife; // 1=fresh, 0=dead
    // Color shifts: white-yellow → orange → red as it fades
    var fcr = 255, fcg = Math.round(220 * ft), fcb = Math.round(60 * ft * ft);
    var fa  = ft * 0.85;
    var fr  = f.size * (0.5 + ft * 1.5);
    // Glow halo
    ctx.globalAlpha = fa * 0.30;
    ctx.fillStyle = 'rgb(' + fcr + ',' + fcg + ',' + fcb + ')';
    ctx.beginPath(); ctx.arc(f.x, f.y, fr * 3.5, 0, TAU); ctx.fill();
    // Core spark
    ctx.globalAlpha = fa;
    ctx.beginPath(); ctx.arc(f.x, f.y, fr, 0, TAU); ctx.fill();
  }
  ctx.restore();
};

// ===================================================================
// LARGE NEBULA SYSTEM — big amorphous blue/silver blobs at screen edges
// Appear every 5-7 min, 2-3 at a time, up to 60s visible, then fade out
// ===================================================================
var LargeNebulaSystem = function() {
  this.nebulae = [];
  this.timer = 4 + Math.random() * 6; // first batch 4-10s in
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
  this.timer = 45 + Math.random() * 30; // re-spawn every 45-75s
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
      ctx.beginPath(); ctx.arc(bx, by, bl.r, 0, TAU);
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
    { sprite: 'cloud_majestic', w: 780, h: 465 },  // τεράστια πραγματικά σύννεφα (1.5× scale)
    { sprite: 'cloud_storm',    w: 840, h: 495 }
  ];
  var t = types[Math.floor(Math.random() * types.length)];
  var goRight = Math.random() > 0.5;  // true = left→right, false = right→left
  var speed = 5 + Math.random() * 6;  // αργή, βασιλική κίνηση 5–11 px/s
  var x, y;
  if(startOffscreen) {
    x = goRight ? -(t.w + Math.random() * Game.width) : (Game.width + Math.random() * Game.width);
  } else {
    x = goRight ? -t.w : Game.width;
  }
  y = 15 + Math.random() * (Game.height * 0.55 - Math.min(t.h, Game.height * 0.5));
  return {
    sprite: t.sprite,
    w: t.w, h: t.h,
    x: x, y: y,
    speed: speed,
    dir: goRight ? 1 : -1,
    opacity: 0.52 + Math.random() * 0.28,  // πιο ορατά αλλά όχι κουφά
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


// ===================================================================
// STAR FLARE SYSTEM — Soft distant star light pulses, always behind everything
// Board 1.5 — after starfields, before planets/enemies
// ===================================================================
var StarFlareSystem = function() {
  var _flares   = [];
  var _nextSpawn = 1.8 + Math.random() * 3.0; // first flare in 1.8-4.8s

  function _spawn() {
    var sz      = 12 + Math.random() * 6;          // glow radius 12-18px — ~15px
    var fadeIn  = 0.04 + Math.random() * 0.08;    // 0.04-0.12s — near-instant flash
    var fadeOut = 2.8  + Math.random() * 2.2;     // 2.8-5.0s — long slow fade
    var hold    = 0.4  + Math.random() * 1.0;     // 0.4-1.4s at peak brightness
    _flares.push({
      x:       12 + Math.random() * (Game.width - 24),
      y:        8 + Math.random() * (Game.height * 0.80),
      sz:      sz,
      mAlpha:  0.45 + Math.random() * 0.20,       // 0.45-0.65 — bright
      life:    0,
      maxLife: fadeIn + hold + fadeOut,
      fadeIn:  fadeIn,
      fadeOut: fadeOut
    });
  }

  this.step = function(dt) {
    _nextSpawn -= dt;
    if (_nextSpawn <= 0) {
      if (_flares.length < 3) _spawn();          // at most 3 simultaneous flares
      _nextSpawn = 3.0 + Math.random() * 5.5;   // next in 3-8.5s — sporadic
    }
    for (var i = _flares.length - 1; i >= 0; i--) {
      _flares[i].life += dt;
      if (_flares[i].life >= _flares[i].maxLife) {
        _flares.splice(i, 1);
      }
    }
  };

  this.draw = function(ctx) {
    if (_flares.length === 0) return;
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (var i = 0; i < _flares.length; i++) {
      var f = _flares[i];

      // --- Lazy-create gradients once per flare (positions never change) ---
      if (!f._g1) {
        var fx = f.x, fy = f.y, sz = f.sz;
        // Wide outer haze — very diffuse blue-white
        f._g1 = ctx.createRadialGradient(fx, fy, 0, fx, fy, sz * 2.6);
        f._g1.addColorStop(0,    'rgba(160,210,255,0.28)');
        f._g1.addColorStop(0.50, 'rgba(130,190,255,0.09)');
        f._g1.addColorStop(1,    'rgba(110,175,255,0)');
        // Medium soft glow
        f._g2 = ctx.createRadialGradient(fx, fy, 0, fx, fy, sz);
        f._g2.addColorStop(0,    'rgba(245,252,255,0.92)');
        f._g2.addColorStop(0.20, 'rgba(210,235,255,0.52)');
        f._g2.addColorStop(0.60, 'rgba(165,215,255,0.16)');
        f._g2.addColorStop(1,    'rgba(130,195,255,0)');
        // Bright pinpoint center — tiny, sharp
        var pin = Math.max(2.0, sz * 0.13);
        f._g3 = ctx.createRadialGradient(fx, fy, 0, fx, fy, pin);
        f._g3.addColorStop(0, 'rgba(255,255,255,1.0)');
        f._g3.addColorStop(1, 'rgba(230,246,255,0)');
      }

      // --- Alpha envelope: fade-in → hold → fade-out ---
      var t           = f.life / f.maxLife;
      var fadeInFrac  = f.fadeIn  / f.maxLife;
      var fadeOutFrac = f.fadeOut / f.maxLife;
      var alpha;
      if (t < fadeInFrac) {
        alpha = (t / fadeInFrac) * f.mAlpha;
      } else if (t > 1.0 - fadeOutFrac) {
        alpha = ((1.0 - t) / fadeOutFrac) * f.mAlpha;
      } else {
        alpha = f.mAlpha;
      }
      if (alpha < 0.004) continue;

      var sz26 = f.sz * 2.6;
      var pin  = Math.max(2.0, f.sz * 0.13);

      // Wide outer haze (very faint)
      ctx.globalAlpha = alpha * 0.70;
      ctx.fillStyle   = f._g1;
      ctx.beginPath();
      ctx.arc(f.x, f.y, sz26, 0, TAU);
      ctx.fill();

      // Medium core glow
      ctx.globalAlpha = alpha;
      ctx.fillStyle   = f._g2;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.sz, 0, TAU);
      ctx.fill();

      // Tiny bright pinpoint
      ctx.globalAlpha = Math.min(alpha * 3.5, 0.88);
      ctx.fillStyle   = f._g3;
      ctx.beginPath();
      ctx.arc(f.x, f.y, pin, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  };
};

// ===================================================================
// PIXEL CLOUD SYSTEM — Tiny 1px particles drifting to form soft cloud wisps
// Two instances: board 1.8 (behind planets) and board 9.5 (in front of enemies)
// ===================================================================
var PixelCloudSystem = function(inFront) {
  var _clouds    = [];
  var _nextSpawn = 2.5 + Math.random() * 4.5;
  var _maxClouds = inFront ? 2 : 3;

  // Sort pixels into 4 alpha buckets at spawn time so we can batch-render per frame
  function _buildBuckets(pixels) {
    var bkts = [[], [], [], []];
    for (var i = 0; i < pixels.length; i++) {
      var b = Math.min(3, Math.floor(pixels[i].a * 4));
      bkts[b].push(pixels[i]);
    }
    return bkts;
  }

  function _spawn() {
    var W  = 75  + Math.random() * 105;             // cloud width  75-180px
    var H  = 16  + Math.random() * 26;              // cloud height 16-42px
    var N  = Math.floor(85 + Math.random() * 115);  // pixel count  85-200
    var vx = (0.9 + Math.random() * 1.3) * (Math.random() < 0.5 ? 1 : -1); // drift speed
    var vy = (Math.random() - 0.5) * 0.45;          // gentle vertical drift
    // Enter from off-screen edge in direction of travel
    var cx = vx > 0 ? -(W * 0.6) : (Game.width + W * 0.6);
    var cy = 8 + Math.random() * (Game.height * (inFront ? 0.72 : 0.86));

    var pixels = [];
    for (var i = 0; i < N; i++) {
      // Sum-of-3 uniforms → bell-curve (natural cloud shape)
      var rx = ((Math.random() + Math.random() + Math.random()) - 1.5) * W * 0.50;
      var ry = ((Math.random() + Math.random() + Math.random()) - 1.5) * H * 0.50;
      // Density falls off with distance from center (ellipse)
      var dist = Math.sqrt((rx / (W * 0.45)) * (rx / (W * 0.45)) +
                           (ry / (H * 0.45)) * (ry / (H * 0.45)));
      var pAlpha = Math.max(0.08, 1.0 - dist * 0.75); // dense center, sparse edges
      pixels.push({ ox: rx, oy: ry, a: pAlpha });
    }

    var maxAlpha = (inFront ? 0.05 : 0.07) + Math.random() * 0.05;
    var life     = 11 + Math.random() * 9;           // 11-20s lifetime
    _clouds.push({
      cx: cx, cy: cy, vx: vx, vy: vy,
      pixels:  pixels,
      buckets: _buildBuckets(pixels),
      life: 0, maxLife: life,
      fadeIn: 2.2, fadeOut: 2.8,
      maxAlpha: maxAlpha,
      // Alternate between cool blue-white and near-neutral white
      color: Math.random() < 0.55 ? '#C8DCF0' : '#E0EBF2'
    });
  }

  this.step = function(dt) {
    _nextSpawn -= dt;
    if (_nextSpawn <= 0) {
      if (_clouds.length < _maxClouds) _spawn();
      _nextSpawn = 5.5 + Math.random() * 7.5;  // sporadic: every 5.5-13s
    }
    for (var i = _clouds.length - 1; i >= 0; i--) {
      var c = _clouds[i];
      c.cx  += c.vx * dt;
      c.cy  += c.vy * dt;
      c.life += dt;
      if (c.life >= c.maxLife) _clouds.splice(i, 1);
    }
  };

  // Alpha at the centre of each of the 4 buckets (bucket 0 = sparse, 3 = dense)
  var BUCKET_A = [0.18, 0.42, 0.68, 0.90];

  this.draw = function(ctx) {
    if (_clouds.length === 0) return;
    for (var i = 0; i < _clouds.length; i++) {
      var c = _clouds[i];
      var t    = c.life / c.maxLife;
      var fiF  = c.fadeIn  / c.maxLife;
      var foF  = c.fadeOut / c.maxLife;
      var alpha;
      if      (t < fiF)           alpha = (t / fiF)            * c.maxAlpha;
      else if (t > 1.0 - foF)     alpha = ((1.0 - t) / foF)   * c.maxAlpha;
      else                         alpha = c.maxAlpha;
      if (alpha < 0.003) continue;

      ctx.save();
      ctx.fillStyle = c.color;
      var bkts = c.buckets;
      for (var b = 0; b < 4; b++) {
        var bkt = bkts[b];
        if (bkt.length === 0) continue;
        ctx.globalAlpha = alpha * BUCKET_A[b];
        ctx.beginPath();
        for (var j = 0; j < bkt.length; j++) {
          ctx.rect(Math.floor(c.cx + bkt[j].ox), Math.floor(c.cy + bkt[j].oy), 1, 1);
        }
        ctx.fill();
      }
      ctx.restore();
    }
  };
};

// ===================================================================
// ATMOSPHERIC CLOUD SYSTEM — large explosion-style dust puffs drifting
// slowly across the foreground.  Semi-transparent (max α 0.20-0.28) so
// enemies remain fully visible through them.
// ===================================================================
var AtmosphericCloudSystem = function() {
  var _clouds    = [];
  var _nextSpawn = 1.5 + Math.random() * 3.5;
  var MAX_CLOUDS = 3;

  var _palettes = [
    ['255,245,230', '240,225,205', '220,205,185'],
    ['210,225,250', '190,210,245', '170,195,240'],
    ['225,225,232', '205,205,218', '185,188,205'],
    ['250,230,210', '235,210,185', '215,190,165']
  ];

  function _spawn() {
    var blobCount = 8 + Math.floor(Math.random() * 7);
    var vx  = (9 + Math.random() * 13) * (Math.random() < 0.5 ? 1 : -1);
    var vy  = (Math.random() - 0.5) * 5;
    var cx  = vx > 0 ? -Game.width * 0.35 : Game.width * 1.35;
    var cy  = Game.height * (0.04 + Math.random() * 0.80);
    var life     = 18 + Math.random() * 10;
    var maxAlpha = 0.20 + Math.random() * 0.08;
    var pal = _palettes[Math.floor(Math.random() * _palettes.length)];
    var blobs = [];
    for (var b = 0; b < blobCount; b++) {
      blobs.push({
        ox:  (Math.random() - 0.5) * 360,
        oy:  (Math.random() - 0.5) * 100,
        r:   75 + Math.random() * 140,
        rgb: pal[Math.floor(Math.random() * pal.length)]
      });
    }
    _clouds.push({ cx: cx, cy: cy, vx: vx, vy: vy,
      blobs: blobs, life: 0, maxLife: life,
      fadeIn: 3.0, fadeOut: 4.0, maxAlpha: maxAlpha });
  }

  this.step = function(dt) {
    _nextSpawn -= dt;
    if (_nextSpawn <= 0) {
      if (_clouds.length < MAX_CLOUDS) _spawn();
      _nextSpawn = 7 + Math.random() * 9;
    }
    for (var i = _clouds.length - 1; i >= 0; i--) {
      var c = _clouds[i];
      c.cx += c.vx * dt;
      c.cy += c.vy * dt;
      c.life += dt;
      if (c.life >= c.maxLife ||
          (c.vx > 0 && c.cx > Game.width  * 1.45) ||
          (c.vx < 0 && c.cx < -Game.width * 0.45)) {
        _clouds.splice(i, 1);
      }
    }
  };

  this.draw = function(ctx) {
    for (var i = 0; i < _clouds.length; i++) {
      var c    = _clouds[i];
      var t    = c.life / c.maxLife;
      var fiF  = c.fadeIn  / c.maxLife;
      var foF  = c.fadeOut / c.maxLife;
      var alpha = t < fiF        ? (t / fiF)       * c.maxAlpha
                : t > (1 - foF) ? ((1 - t) / foF) * c.maxAlpha
                : c.maxAlpha;
      if (alpha < 0.005) continue;
      ctx.save();
      ctx.globalAlpha = alpha;
      for (var b = 0; b < c.blobs.length; b++) {
        var bl = c.blobs[b];
        var bx = c.cx + bl.ox, by = c.cy + bl.oy;
        var gr = ctx.createRadialGradient(bx, by, 0, bx, by, bl.r);
        gr.addColorStop(0,    'rgba(' + bl.rgb + ',0.80)');
        gr.addColorStop(0.42, 'rgba(' + bl.rgb + ',0.48)');
        gr.addColorStop(0.76, 'rgba(' + bl.rgb + ',0.18)');
        gr.addColorStop(1,    'rgba(' + bl.rgb + ',0)');
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(bx, by, bl.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  };
};

// BACKGROUND OBJECTS SYSTEM - Planets, Asteroids, Stars (NO clouds, NO motherships)
// Πάντα πίσω από τους εχθρούς! ΛΙΓΑ, ΑΡΓΑ, ΧΩΡΙΣ ΠΕΡΙΣΤΡΟΦΗ
// ===================================================================
var BackgroundObjectsSystem = function() {
  this.objects = [];
  this.ss  = new ShootingStarSystem();  // embedded — board loop only handles integers
  this.ns  = new LargeNebulaSystem();   // embedded — same reason
  this.sky = new SkyColorSystem();      // embedded — same reason
  var hugeObjectExists = false;

  // Era (scene) change system — new background scene every level
  this._eraLastLevel  = 1;
  this._eraLevelCount = 0;             // levels elapsed since last era change
  this._eraInterval   = 1; // background refreshes every level

  // Periodic background darkening effect
  this._darkAlpha  = 0;      // current overlay alpha (0=transparent, 1=full black)
  this._darkTarget = 0;      // target alpha we're lerping toward
  this._darkTimer  = 30 + Math.random() * 40; // seconds until first dark event
  this._darkPhase  = 'wait'; // 'wait' | 'darken' | 'hold' | 'clear'
  this._darkHold   = 0;      // how long to hold at peak darkness

  // Periodic alien ambient voice
  this._voiceTimer = 20 + Math.random() * 25; // first voice in 20-45 seconds

  // Regular objects scale (mobile-friendly, capped at 1.0 for non-planets)
  var _screenScale = Math.min(1.0, Game.width / 800);
  this._screenScale = _screenScale;

  // Planets scale UP dramatically on large screens — some fill a chunk of the screen
  var _planetScale = Math.max(0.25, Game.width / 700); // 1920→2.74, 1366→1.95, 800→1.14, 320→0.46
  this._planetScale = _planetScale; // needed by _doReset for size re-randomization

  var planetTypes = ['bg_planet_1', 'bg_planet_2', 'bg_planet_3', 'bg_planet_4', 'bg_planet_5', 'bg_planet_6', 'bg_planet_7'];
  var stationTypes = ['bg_station_1','bg_station_2','bg_station_3','bg_station_4','bg_station_5',
                      'bg_station_6','bg_station_8','bg_station_9','bg_station_10',
                      'bg_station_11','bg_station_12','bg_station_13'];
  var asteroidTypes = [
    'bg_asteroid_1', 'bg_asteroid_2', 'bg_asteroid_3', 'bg_asteroid_4', 'bg_asteroid_5',
    'bg_asteroid_6', 'bg_asteroid_7', 'bg_asteroid_8', 'bg_asteroid_9', 'bg_asteroid_10',
    'bg_asteroid_11', 'bg_asteroid_12', 'bg_asteroid_13', 'bg_asteroid_14', 'bg_asteroid_15',
    'bg_asteroid_16', 'bg_asteroid_17'
  ];
  var starTypes = ['bg_star_1', 'bg_star_2', 'bg_star_3', 'bg_star_4'];
  var astronautTypes = ['spaceman_1','spaceman_2','spaceman_3','spaceman_4','spaceman_5','spaceman_6'];
  var allTypes = [
    { types: planetTypes,    count: 4, scale: 1.0, opacity: 1.0, canRotate: false, isPlanet: true },
    { types: stationTypes,   count: 2, scale: 1.0, opacity: 1.0, canRotate: false, isPlanet: true },
    { types: starTypes,      count: 2, scale: 1.0, opacity: 1.0, canRotate: false, isPlanet: true },
    { types: asteroidTypes,  count: 5, scale: 1.1, opacity: 1.0, canRotate: true,  isAsteroid: true },
    { types: astronautTypes, count: 2, scale: 1.0, opacity: 1.0, canRotate: false, isAstronaut: true }
  ];

  // Store type arrays on instance so step() can access them for shuffle-bag respawns
  this._planetTypes  = planetTypes;
  this._starTypes    = starTypes;
  this._stationTypes = stationTypes;
  // Shuffle bags — cycle through ALL planet/star/station types before repeating (like mothership)
  this._planetBag  = [];
  this._starBag    = [];
  this._stationBag = [];
  this._pickBag = function(bag, pool) {
    if(bag.length === 0) {
      var tmp = pool.slice();
      for(var _ii = tmp.length-1; _ii > 0; _ii--) {
        var _jj = Math.floor(Math.random()*(_ii+1));
        var _tv = tmp[_ii]; tmp[_ii] = tmp[_jj]; tmp[_jj] = _tv;
      }
      for(var _kk = 0; _kk < tmp.length; _kk++) bag.push(tmp[_kk]);
    }
    return bag.shift();
  };
  // Picks a sprite from pool that is NOT already visible on screen — no duplicates!
  this._pickUnique = function(pool, bag) {
    var _inUse = {};
    for(var _oi = 0; _oi < this.objects.length; _oi++) _inUse[this.objects[_oi].sprite] = true;
    // Build list of available (not on screen) sprites
    var _avail = [];
    for(var _aj = 0; _aj < pool.length; _aj++) { if(!_inUse[pool[_aj]]) _avail.push(pool[_aj]); }
    // If all are in use, fall back to bag/random
    if(_avail.length === 0) return bag ? this._pickBag(bag, pool) : pool[Math.floor(Math.random()*pool.length)];
    // Pick randomly from available
    return _avail[Math.floor(Math.random() * _avail.length)];
  };

  // Count how many asteroid trail objects we allow (max 2)
  var asteroidTrailCount = 0;

  for(var g = 0; g < allTypes.length; g++) {
    var group = allTypes[g];
    for(var i = 0; i < group.count; i++) {
      var spriteName;
      if(g === 0)      spriteName = this._pickUnique(planetTypes,   this._planetBag);
      else if(g === 1) spriteName = this._pickUnique(stationTypes, this._stationBag);
      else if(g === 2) spriteName = this._pickUnique(starTypes,    this._starBag);
      else             spriteName = this._pickUnique(group.types,  null);
      var sprite = SpriteSheet.map[spriteName];
      if(!sprite) continue;

      var baseW = sprite.w;
      var baseH = sprite.h;

      // Planet sizing: big/small tier, no isHuge multiplier
      var isPlanet = group.isPlanet || false;
      var isHuge, sizeBoost, targetScale;
      var _isGuaranteedPlanet = (g === 0 && i === 0); // first planet is always large + on-screen
      if(isPlanet) {
        // ~30% of planets/stars/stations grow to 2.5×–4× normal size — randomized giant system
        var _isGiant   = !_isGuaranteedPlanet && Math.random() < 0.30;
        var _giantMult = _isGiant ? (2.5 + Math.random() * 1.5) : 1.0;
        var bigPlanet  = _isGuaranteedPlanet ? true : Math.random() < 0.60;
        targetScale = bigPlanet ? (_planetScale * (1.3 + Math.random() * 0.45) * _giantMult)
                                : (_planetScale * (0.60 + Math.random() * 0.22) * _giantMult);
      } else {
        isHuge = !hugeObjectExists && Math.random() < 0.15;
        if(isHuge) hugeObjectExists = true;
        // ~25% of asteroids grow to 2×–3× their normal size
        var _isGiantAst = !isHuge && Math.random() < 0.25;
        sizeBoost = isHuge ? 2.4 : _isGiantAst ? (2.0 + Math.random() * 1.0) : (Math.random() < 0.3 ? 1.2 : 1.0);
        targetScale = group.scale * (0.8 + Math.random() * 0.4) * sizeBoost * _screenScale;
      }

      // ALL objects MUST start small and grow - NEVER start at full size
      var isZooming = true;
      // Guaranteed planet starts already large (55-75% of target) — visible and impressive immediately
      var startScale = _isGuaranteedPlanet ? (targetScale * (0.55 + Math.random() * 0.2)) : (0.05 + Math.random() * 0.1);

      // Βάση ταχύτητας: πολύ αργά στο level 1, +1 ανά level
      var baseSpeed = 0.2 + Math.random() * 0.05; // 0.2-0.25 px/sec (tight range for uniform feel)

      // Random direction
      var dir = Math.floor(Math.random() * 4); // 0=left->right, 1=right->left, 2=up->down, 3=down->up

      // 60% start from edges (off-screen), 40% start from center (but SMALL)
      // Guaranteed large planet always starts on-screen
      var fromEdge = _isGuaranteedPlanet ? false : Math.random() < 0.6;
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
      var objBaseSpeed   = isAstronaut   ? (13 + Math.random() * 9)
                         : (group.isAsteroid || group.isDecorative) ? (12 + Math.random() * 13) // 12-25 px/s — visibly drifting
                         : baseSpeed;  // planets/stars: very slow orbital
      var objGrowSpeed   = isAstronaut ? (0.10 + Math.random() * 0.07) : (0.15 + Math.random() * 0.1);
      var objTargetScale = isAstronaut ? ((0.75 + Math.random() * 0.35) * _screenScale) : targetScale;

      // Asteroid trail disabled — was producing a visible line artifact
      var isAsteroidGroup = group.isAsteroid === true;
      var hasTrail = false;

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
                     : isPlanet ? (0.004 + Math.random() * 0.006) * (Math.random() < 0.5 ? 1 : -1) // slow axial spin for planets
                     : (group.canRotate ? (0.008 + Math.random() * 0.020) * (Math.random() < 0.5 ? 1 : -1) : 0),
        growSpeed: objGrowSpeed,
        hasTrail: hasTrail,
        trailLen: hasTrail ? (80 + Math.random() * 70) : 0,
        isAstronaut: isAstronaut,
        isPlanetObj: isPlanet,
        isStation: (g === 1),
        staticTimer: isPlanet ? (70 + Math.random() * 50) : 0,
        isMoving: !isPlanet,   // planets/stars start static; others move immediately
        // Cloud ring properties (planets only)
        cloudAngle:    isPlanet ? (Math.random() * Math.PI * 2) : 0,
        cloudDir:      isPlanet ? (Math.random() < 0.5 ? 1 : -1) : 0,
        cloudColorT:   isPlanet ? (Math.random() * 6) : 0,
        cloudColorSpd: isPlanet ? (0.12 + Math.random() * 0.20) : 0,
        // Orbital float (planets only) — slow circular drift while in position
        orbitAngle:    isPlanet ? (Math.random() * Math.PI * 2) : 0,
        orbitSpeed:    isPlanet ? (0.005 + Math.random() * 0.010) : 0, // ~0.3-0.9 deg/sec
        orbitRadius:   0,          // set when planet first reaches targetScale
        orbitAnchorX:  0,
        orbitAnchorY:  0,
        orbitActive:   false,
        // Era-change departure system
        typePool:      group.types,   // so reset can pick a fresh sprite
        isGuaranteed:  _isGuaranteedPlanet, // always restart visibly large
        normalSpeed:   objBaseSpeed,  // remember baseline for reset
        departing:     false,
        departDelay:   0
      });
    }
  }
  // Dirty flag: re-sort draw order only when a scale changes
  this._sortDirty = true;
};

BackgroundObjectsSystem.prototype.step = function(dt) {
  var _bgSelf = this; // capture for closures (_doReset uses shuffle bags)
  this.sky.step(dt);
  this.ss.step(dt);
  this.ns.step(dt);

  // Periodic alien ambient voice (every 20-45 seconds during gameplay)
  if(Game.playing && !Game.paused) {
    this._voiceTimer -= dt;
    if(this._voiceTimer <= 0) {
      this._voiceTimer = 20 + Math.random() * 25;
      SoundManager.playAlienAmbient();
    }
  }

  // Era (scene) change: detect level advance, trigger every 6-7 levels
  if(currentLevel !== this._eraLastLevel) {
    this._eraLevelCount += (currentLevel - this._eraLastLevel);
    this._eraLastLevel = currentLevel;
    if(this._eraLevelCount >= this._eraInterval) {
      this._eraLevelCount = 0;
      this._eraInterval   = 1; // every level
      // Stagger departure of every bg object over 0-6 seconds
      for(var _ei = 0; _ei < this.objects.length; _ei++) {
        var _eo = this.objects[_ei];
        if(!_eo.isAstronaut) {
          _eo.departing   = true;
          _eo.departDelay = Math.random() * 6; // staggered 0-6s
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
      this._sortDirty = true; // scale changed → redraw order may change
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

    // Static timer: planets float in a slow circle while in position, then depart
    if(obj.isPlanetObj && !obj.isMoving) {
      if(obj.scale >= obj.targetScale * 0.97) {
        // First frame at full size: lock the anchor point
        if(!obj.orbitActive) {
          obj.orbitActive = true;
          obj.orbitRadius = 10 + Math.random() * 18; // 10-28px gentle orbit
          // Back-compute anchor so the FIRST orbit position == current position (no snap)
          obj.orbitAnchorX = obj.x - Math.cos(obj.orbitAngle) * obj.orbitRadius;
          obj.orbitAnchorY = obj.y - Math.sin(obj.orbitAngle) * obj.orbitRadius;
        }
        obj.staticTimer -= dt;
        // Slow circular float around the anchor
        obj.orbitAngle += obj.orbitSpeed * dt;
        obj.x = obj.orbitAnchorX + Math.cos(obj.orbitAngle) * obj.orbitRadius;
        obj.y = obj.orbitAnchorY + Math.sin(obj.orbitAngle) * obj.orbitRadius;
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
        var _newSprite;
        if(obj.typePool === _bgSelf._planetTypes)       _newSprite = _bgSelf._pickUnique(_bgSelf._planetTypes,   _bgSelf._planetBag);
        else if(obj.typePool === _bgSelf._starTypes)    _newSprite = _bgSelf._pickUnique(_bgSelf._starTypes,    _bgSelf._starBag);
        else if(obj.typePool === _bgSelf._stationTypes) _newSprite = _bgSelf._pickUnique(_bgSelf._stationTypes, _bgSelf._stationBag);
        else                                             _newSprite = _bgSelf._pickUnique(obj.typePool, null);
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
        // Re-randomize size on respawn — 30% chance of growing to giant scale
        if(obj.isPlanetObj && !obj.isGuaranteed) {
          var _rGiant = Math.random() < 0.30;
          var _rGM    = _rGiant ? (2.5 + Math.random() * 1.5) : 1.0;
          var _rBig   = Math.random() < 0.60;
          var _rPS    = _bgSelf._planetScale;
          obj.targetScale = _rBig ? (_rPS * (1.3 + Math.random() * 0.45) * _rGM)
                                  : (_rPS * (0.60 + Math.random() * 0.22) * _rGM);
        }
      }
      obj.x = newX; obj.y = newY;
      obj.scale = obj.isGuaranteed ? (obj.targetScale * (0.4 + Math.random() * 0.2))
                : obj.isAstronaut  ? 0.02
                : (0.05 + Math.random() * 0.06);
      obj.isZooming = true;
      if(obj.isPlanetObj) {
        obj.staticTimer = 70 + Math.random() * 50;
        obj.isMoving    = false;
        obj.orbitActive = false;
        obj.orbitRadius = 0;
      }
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
    ctx.arc(bx, by, br, 0, TAU);
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
    ctx.arc(obx, oby, obr, 0, TAU);
    ctx.fill();
  }
}

BackgroundObjectsSystem.prototype.draw = function(ctx) {
  this.sky.draw(ctx); // sky color first (behind everything)
  this.ns.draw(ctx);  // then nebulae
  ctx.save();
  ctx.lineCap = 'round';
  // Depth rule: bigger = closer = drawn last (in front). Sort by max dimension.
  // Only re-sort when scale changes (dirty flag set in step)
  if(this._sortDirty) {
    for(var _si=0;_si<this.objects.length;_si++){
      var _so=this.objects[_si];
      _so._sortSize = Math.max(_so.baseWidth*_so.scale, _so.baseHeight*_so.scale);
    }
    this.objects.sort(function(a,b){ return a._sortSize - b._sortSize; });
    this._sortDirty = false;
  }
  var _drawObjs = this.objects;
  // Three-pass rendering — strict depth order per user spec:
  //   pass 0: asteroids only (behind everything)
  //   pass 1: astronauts + stations (after shooting stars)
  //   pass 2: planets + stars (FRONTMOST — cover all other bg objects)
  for(var _pass = 0; _pass < 3; _pass++) {
    if(_pass === 1) { ctx.restore(); this.ss.draw(ctx); ctx.save(); ctx.lineCap = 'round'; }
  for(var i = 0; i < _drawObjs.length; i++) {
    var obj = _drawObjs[i];
    var _isPlanetOrStar   = obj.isPlanetObj && !obj.isStation;
    var _isAstroOrStation = obj.isAstronaut || obj.isStation;
    if(_pass === 0 && (_isPlanetOrStar || _isAstroOrStation)) continue; // pass 0: asteroids only
    if(_pass === 1 && !_isAstroOrStation) continue;                      // pass 1: astronauts + stations
    if(_pass === 2 && !_isPlanetOrStar) continue;                        // pass 2: planets + stars (frontmost)
    var currentW = obj.baseWidth * obj.scale;
    var currentH = obj.baseHeight * obj.scale;

    ctx.save(); // isolate each object's transforms and alpha

    // Planet z-crossing fade: when a station grows past a planet's size the z-order
    // switches abruptly. Smooth it with a bell-curve fade on the planet.
    var _alphamod = 1.0;
    if(obj.isPlanetObj) {
      var _pSz = Math.max(currentW, currentH);
      for(var _fi = 0; _fi < _drawObjs.length; _fi++) {
        var _fo = _drawObjs[_fi];
        if(_fo === obj || _fo.isPlanetObj) continue;
        var _foW = _fo.baseWidth * _fo.scale;
        var _foH = _fo.baseHeight * _fo.scale;
        var _ratio = Math.max(_foW, _foH) / _pSz;
        if(_ratio < 0.58 || _ratio > 1.15) continue; // outside crossing zone
        // Spatial proximity check (center distance vs combined radii)
        var _pcx = obj.x + currentW/2, _pcy = obj.y + currentH/2;
        var _fcx = _fo.x + _foW/2,     _fcy = _fo.y + _foH/2;
        var _dist = Math.sqrt((_pcx-_fcx)*(_pcx-_fcx)+(_pcy-_fcy)*(_pcy-_fcy));
        if(_dist > (_pSz + Math.max(_foW,_foH)) * 0.55) continue; // not overlapping
        // Bell curve: max fade (opacity ~0.12) when ratio=0.865 (midpoint)
        var _t = Math.max(0, Math.min(1, (_ratio - 0.58) / 0.57));
        var _fade = 1 - 0.88 * Math.sin(_t * Math.PI);
        _alphamod = Math.min(_alphamod, _fade);
      }
    }
    ctx.globalAlpha = obj.opacity * _alphamod;

    // Self-rotation: isolated per object (no accumulation)
    if(obj.rotationSpeed !== 0) {
      var rcx = obj.x + currentW / 2;
      var rcy = obj.y + currentH / 2;
      ctx.translate(rcx, rcy);
      ctx.rotate(obj.rotation);
      ctx.translate(-rcx, -rcy);
    }

    SpriteSheet.draw(ctx, obj.sprite, obj.x, obj.y, 0, currentW, currentH);

    // Smoke cloud haze + outer dust ring
    if(obj.isPlanetObj) _drawPlanetCloud(ctx, obj, currentW);

    ctx.restore(); // restore after each object — transforms don't bleed into next
  }
  } // end pass loop
  ctx.restore(); // outer restore (pass 1 ctx.save)

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
// Uses Float32Array for contiguous memory layout — faster iteration & less GC
// Layout per particle (stride 6): [x, y, vx, vy, size, alpha]
// ===================================================================
var _EP_N = 35, _EP_S = 6; // count, stride
var _EP_COLORS = ['#00FFFF','#FF44FF','#FFFF44','#FF8800','#00FF88','#FF4466'];

var EnergyParticlesSystem = function() {
  this.pData   = new Float32Array(_EP_N * _EP_S);
  this.pColors = [];
  this.t = 0;
  var d = this.pData;
  for(var i = 0; i < _EP_N; i++) {
    var b = i * _EP_S;
    d[b+0] = Math.random() * Game.width;         // x
    d[b+1] = Math.random() * Game.height;        // y
    d[b+2] = (Math.random() - 0.5) * 15;         // vx
    d[b+3] = -(3 + Math.random() * 12);          // vy
    d[b+4] = 0.6 + Math.random() * 1.8;          // size
    d[b+5] = 0.25 + Math.random() * 0.45;        // alpha
    this.pColors[i] = _EP_COLORS[Math.floor(Math.random() * 6)];
  }
};

EnergyParticlesSystem.prototype.step = function(dt) {
  this.t += dt;
  var d = this.pData, gw = Game.width, gh = Game.height;
  for(var i = 0; i < _EP_N; i++) {
    var b = i * _EP_S;
    d[b+0] += d[b+2] * dt; // x += vx*dt
    d[b+1] += d[b+3] * dt; // y += vy*dt
    if(d[b+1] < -6) { d[b+1] = gh + 6; d[b+0] = Math.random() * gw; }
    if(d[b+0] < 0)  d[b+0] = gw;
    if(d[b+0] > gw) d[b+0] = 0;
  }
};

EnergyParticlesSystem.prototype.draw = function(ctx) {
  ctx.save();
  ctx.shadowBlur = 6;
  var d = this.pData, t15 = this.t * 1.5;
  for(var i = 0; i < _EP_N; i++) {
    var b = i * _EP_S;
    var flicker = 0.4 + 0.6 * Math.abs(Math.sin(t15 + i * 0.7));
    ctx.globalAlpha = d[b+5] * flicker;
    ctx.fillStyle   = this.pColors[i];
    ctx.shadowColor = this.pColors[i];
    ctx.beginPath();
    ctx.arc(d[b+0], d[b+1], d[b+4], 0, TAU);
    ctx.fill();
  }
  ctx.restore();
};

var PlayerShip = function() {
  playerShip = this;
  var _defaultShip = Game._selectedShip || 'player_ship_1';
  this.setup(_defaultShip, { vx: 0, reloadTime: 0.25, maxVel: 200 });

  // Scale to consistent play size (~30px on mobile, larger on desktop)
  var _ss = Game.spriteScale || 1.0;
  var _base = 37 * _ss * 0.88;
  this.w = Math.round(_base);
  this.h = Math.round(_base);

  this.reload = this.reloadTime;
  this.rocketReload = 0;
  this.rocketReloadTime = 2; // 2 seconds between rockets
  this.x = Game.width/2 - this.w / 2;
  this.y = Game.height - Game.playerOffset - this.h;
  if(!Game.mobile) Game.mouseX = Game.width / 2; // sync mouse target to ship spawn so it doesn't lurch at level start

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
  // Cultural power-up timers
  this.homingTimer    = 0;
  this.reflectShield  = 0;
  this.dragonTimer    = 0;
  this.pharaohTimer   = 0;
  this.goldRushTimer  = 0;
  this.starBurstTimer = 0;
  this.twinArrowTimer = 0;
  this.fireTrailTimer = 0;
  this.ghostTimer     = 0;
  this.berserkerTimer = 0;
  this.spiralTimer    = 0;
  this._spiralAngle   = 0;
  this.axeStormTimer  = 0;
  this.warShield      = 0;
  this.wingmanLeft2   = null;
  this.wingmanRight2  = null;
  Game.pharaohActive      = false;
  Game.goldRushMultiplier = 1;

  // Restore power-ups carried over from previous stage
  if(_savedPowerUps) {
    this.speedBoostTimer  = _savedPowerUps.speedBoostTimer  || 0;
    this.powerShotTimer   = _savedPowerUps.powerShotTimer   || 0;
    this.rapidFireTimer   = _savedPowerUps.rapidFireTimer   || 0;
    this.tripleShotTimer  = _savedPowerUps.tripleShotTimer  || 0;
    this.timeSlowTimer    = _savedPowerUps.timeSlowTimer    || 0;
    this.magnetTimer      = _savedPowerUps.magnetTimer      || 0;
    this.homingTimer      = _savedPowerUps.homingTimer      || 0;
    this.reflectShield    = _savedPowerUps.reflectShield    || 0;
    this.dragonTimer      = _savedPowerUps.dragonTimer      || 0;
    this.pharaohTimer     = _savedPowerUps.pharaohTimer     || 0;
    this.goldRushTimer    = _savedPowerUps.goldRushTimer    || 0;
    this.starBurstTimer   = _savedPowerUps.starBurstTimer   || 0;
    this.twinArrowTimer   = _savedPowerUps.twinArrowTimer   || 0;
    this.fireTrailTimer   = _savedPowerUps.fireTrailTimer   || 0;
    this.ghostTimer       = _savedPowerUps.ghostTimer       || 0;
    this.berserkerTimer   = _savedPowerUps.berserkerTimer   || 0;
    this.spiralTimer      = _savedPowerUps.spiralTimer      || 0;
    this.axeStormTimer    = _savedPowerUps.axeStormTimer    || 0;
    this.warShield        = _savedPowerUps.warShield        || 0;
    if(this.timeSlowTimer > 0) Game.timeSlowFactor = 0.35;
    if(this.pharaohTimer  > 0) Game.pharaohActive = true;
    if(this.goldRushTimer > 0) Game.goldRushMultiplier = 3;
    this._activePowerType = _savedPowerUps.activePowerType || null;
    this._powerUpQueue    = _savedPowerUps.powerUpQueue    ? _savedPowerUps.powerUpQueue.slice() : [];
  } else {
    // Power-up queue (duration powers queue up, activate one at a time)
    this._powerUpQueue    = [];
    this._activePowerType = null;
  }

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

    // Power-up counters are now shot-based (see _onShotFired).
    // Only update global state flags and timer-based invincibility here.
    if(this.ghostTimer > 0) { this.invincible = 9999; } // ghost keeps player invincible
    else if(this.invincible > 0) { this.invincible -= dt; }
    Game.pharaohActive      = this.pharaohTimer > 0;
    Game.goldRushMultiplier = this.goldRushTimer > 0 ? 3 : 1;
    Game.timeSlowFactor     = this.timeSlowTimer > 0 ? 0.35 : 1.0;

    if (Game.mobile) {
      // Mobile: analog drag control via MOVE zone
      var spd = this.speedBoostTimer > 0 ? 320 : 240;
      var moveX = Game.mobileMoveX || 0;
      if (moveX !== 0) this.x += spd * moveX * dt;
    } else {
      // Desktop: fast spring — responsive but smooth glide (no discrete pixel-stepping)
      if (typeof Game.mouseX !== 'undefined') {
        var _targetX = Game.mouseX - this.w / 2;
        var _followSpeed = this.speedBoostTimer > 0 ? 40 : 22;
        this.x += (_targetX - this.x) * Math.min(1.0, _followSpeed * dt);
      }
    }

    // Keep ship on screen
    if(this.x < 0) { this.x = 0; }
    else if(this.x > Game.width - this.w) {
      this.x = Game.width - this.w;
    }

    this.reload-=dt;
    this.rocketReload -= dt;

    // Normal fire
    if(Game.keys['fire'] && this.reload < 0) {
      this.reload = (this.rapidFireTimer > 0 || this.berserkerTimer > 0) ? 0.07 : this.reloadTime;
      var dmg = (this.powerShotTimer > 0 || this.berserkerTimer > 0) ? 20 : 10;
      var _cx = this.x + this.w / 2;
      if(this.axeStormTimer > 0) {
        var _axv=[-290,-175,-75,75,175,290];
        for(var _ai=0;_ai<6;_ai++){var _am=new PlayerMissile(_cx,this.y);_am.damage=dmg;_am.vx=_axv[_ai];this.board.add(_am);}
      } else if(this.dragonTimer > 0) {
        var _dvx=[-290,-145,0,145,290];
        for(var _di=0;_di<5;_di++){var _dm=new PlayerMissile(_cx,this.y);_dm.damage=dmg;_dm.vx=_dvx[_di];this.board.add(_dm);}
      } else if(this.starBurstTimer > 0) {
        var _svx=[0,-220,220,-180,180],_svy=[-700,-580,-580,-380,-380];
        for(var _si=0;_si<5;_si++){var _sm=new PlayerMissile(_cx,this.y);_sm.damage=dmg;_sm.vx=_svx[_si];_sm.vy=_svy[_si];this.board.add(_sm);}
      } else if(this.twinArrowTimer > 0) {
        var _tdat=[[-300,-650],[0,-700],[300,-650]];
        for(var _ti=0;_ti<3;_ti++){var _tm=new PlayerMissile(_cx,this.y);_tm.damage=dmg;_tm.vx=_tdat[_ti][0];_tm.vy=_tdat[_ti][1];this.board.add(_tm);}
      } else if(this.spiralTimer > 0) {
        this._spiralAngle+=0.44;
        var _sp1=new PlayerMissile(_cx,this.y);_sp1.damage=dmg;_sp1.vx=Math.sin(this._spiralAngle)*340;_sp1.vy=-700;this.board.add(_sp1);
        var _sp2=new PlayerMissile(_cx,this.y);_sp2.damage=dmg;_sp2.vx=-Math.sin(this._spiralAngle)*340;_sp2.vy=-700;this.board.add(_sp2);
      } else {
        var m1=new PlayerMissile(_cx-6,this.y);var m2=new PlayerMissile(_cx+6,this.y);
        m1.damage=dmg;m2.damage=dmg;
        if(this.tripleShotTimer>0){m1.vx=-200;m2.vx=200;var m3=new PlayerMissile(_cx,this.y);m3.damage=dmg;this.board.add(m3);}
        if(this.homingTimer>0){var _hm=new HomingMissile(_cx,this.y,dmg,this.board);this.board.add(_hm);}
        this.board.add(m1);this.board.add(m2);
      }
      SoundManager.playShoot();
      this._onShotFired();
    }

    // Right click = rocket (bomb)
    if(Game.keys['rocket'] && this.rocketReload <= 0) {
      Game.keys['rocket'] = false;
      this.rocketReload = this.rocketReloadTime;

      this.board.add(new PlayerRocket(this.x + this.w/2, this.y));
      SoundManager.playRocket();
    }

    // ZU War Shield
    if(this.warShield>0){var _wsm=this.board.collide(this,OBJECT_ENEMY_PROJECTILE);if(_wsm){this.board.remove(_wsm);this.warShield--;Game.shake(3,0.15);}}
    // CE Reflect Shield
    if(this.reflectShield>0){var _rsm=this.board.collide(this,OBJECT_ENEMY_PROJECTILE);if(_rsm){this.board.remove(_rsm);this.reflectShield--;var _ref=new PlayerMissile(_rsm.x+(_rsm.w||0)/2,_rsm.y);_ref.damage=25;this.board.add(_ref);Game.shake(2,0.1);}}
    // Fire Trail — spawn flame particles at ship bottom while active
    if(this.fireTrailTimer > 0) {
      this._fireTrailPuff = (this._fireTrailPuff || 0) - dt;
      if(this._fireTrailPuff <= 0) {
        this._fireTrailPuff = 0.10;
        this.board.add(new FireTrailParticle(this.x + this.w / 2, this.y + this.h));
      }
    }

    // === COLLECT POWER-UPS (κεντρικό πλοίο ή οποιοδήποτε αεροπλανάκι αγγίζει το coin) ===
    var powerup = this.board.collide(this, OBJECT_POWERUP);
    if(!powerup && this.wingmanLeft)  powerup = this.board.collide(this.wingmanLeft,  OBJECT_POWERUP);
    if(!powerup && this.wingmanRight) powerup = this.board.collide(this.wingmanRight, OBJECT_POWERUP);
    if(!powerup && this.wingmanLeft2) powerup = this.board.collide(this.wingmanLeft2, OBJECT_POWERUP);
    if(!powerup && this.wingmanRight2) powerup = this.board.collide(this.wingmanRight2, OBJECT_POWERUP);
    if(powerup) {
      this.board.remove(powerup);
      if(powerup.isFruit) {
        // Fruit bonus → red flashing score popup
        SoundManager.playFruitCollect();
        earnPoints(this.board, powerup.x + powerup.w/2, powerup.y + powerup.h/2, powerup.pts, '#FF2200', true);
      } else if(powerup.isDrakiCoin) {
        // Draki coin → immediate fade out → topia bonus stage
        if(!_topiaExtraBonusQueued) {
          _topiaExtraBonusQueued = true; // prevent double-trigger
          SoundManager.playPowerUp();
          var _tf = _topiaNextFolder();
          Game.setBoard(20, new ScreenFade('out', 0.5, function() {
            startTopiaExtraBonusStage(_tf);
          }));
        }
      } else {
        this.applyPowerUp(powerup.powerType);
      }
    }
  };
};

PlayerShip.prototype = new Sprite();
PlayerShip.prototype.type = OBJECT_PLAYER;

PlayerShip.prototype.applyPowerUp = function(pType) {
  var letter = pType.letter;
  SoundManager.playPowerUp();
  if(this.board) {
    if(_activePowerNotif && _activePowerNotif.board) _activePowerNotif.board.remove(_activePowerNotif);
    this.board.add(new PowerUpNotification(pType));
  }
  // Duration powers: queue αν ήδη έχεις ενεργό· μέγιστο μέγεθος queue = όσα queuable coins έχεις μαζέψει − 1 (για το ενεργό)
  if(_QUEUABLE_POWERS.indexOf(letter) !== -1) {
    sessionQueuablePowerUpsCollected = (sessionQueuablePowerUpsCollected || 0) + 1;
    var maxQueue = Math.max(0, sessionQueuablePowerUpsCollected - 1);
    if(this._activePowerType !== null) {
      if(this._powerUpQueue.length < maxQueue) this._powerUpQueue.push(pType);
      return;
    }
    this._activePowerType = pType;
  }
  this._applyEffect(letter);
};

// Apply only the effect (no queueing logic) — used both on pickup and on queue activation
PlayerShip.prototype._applyEffect = function(letter) {
  if(letter === 'S') {
    this.speedBoostTimer = 30;
  } else if(letter === 'W') {
    if(!this.wingmanLeft)  { this.wingmanLeft  = new WingmanShip(this, -1);  this.board.add(this.wingmanLeft);  }
    if(!this.wingmanRight) { this.wingmanRight = new WingmanShip(this,  1);  this.board.add(this.wingmanRight); }
  } else if(letter === 'P') {
    this.powerShotTimer = 20;
  } else if(letter === 'L') {
    playerLives++;
  } else if(letter === 'B') {
    var toHit = [];
    for(var i = 0; i < this.board.objects.length; i++) { if(this.board.objects[i].type === OBJECT_ENEMY) toHit.push(this.board.objects[i]); }
    for(var i = 0; i < toHit.length; i++) toHit[i].hit(50);
    this.board.add(new BombFlash());
  } else if(letter === 'R') {
    this.rapidFireTimer = 25;
  } else if(letter === 'X') {
    this.tripleShotTimer = 25;
  } else if(letter === 'I') {
    this.invincible = 7;
  } else if(letter === 'T') {
    this.timeSlowTimer = 25;
  } else if(letter === 'M') {
    this.magnetTimer = 30;
  } else if(letter === 'G') {
    this.board.add(new GiantLaser(this.x + this.w / 2));
  } else if(letter === 'AP') {
    this.homingTimer = 20;
  } else if(letter === 'AZ') {
    var _azO=this.board.objects.slice();for(var _azi=0;_azi<_azO.length;_azi++){if(_azO[_azi].type===OBJECT_ENEMY)_azO[_azi].hit(200);}
    this.board.add(new SunBurst());Game.shake(18,1.0);
  } else if(letter === 'CE') {
    this.reflectShield=(this.reflectShield||0)+8;
  } else if(letter === 'CK') {
    for(var _cki=0;_cki<3;_cki++){var _ck=new HomingMissile(this.x+this.w/2+(_cki-1)*22,this.y,35,this.board);this.board.add(_ck);}
  } else if(letter === 'CH') {
    this.dragonTimer=15;
  } else if(letter === 'EG') {
    this.pharaohTimer=15;Game.pharaohActive=true;
  } else if(letter === 'ET') {
    playerLives++;
  } else if(letter === 'GR') {
    this.board.add(new ZeusLightning(this.board,this.x+this.w/2,this.y));
  } else if(letter === 'IN') {
    this.goldRushTimer=30;Game.goldRushMultiplier=3;
  } else if(letter === 'JP') {
    var _jpO=this.board.objects.slice();for(var _jpi=0;_jpi<_jpO.length;_jpi++){if(_jpO[_jpi].type===OBJECT_ENEMY_PROJECTILE)this.board.remove(_jpO[_jpi]);}
    this.board.add(new BulletClearFlash());
  } else if(letter === 'MA') {
    this.board.add(new SpearMissile(this.x+this.w/2,this.y));
  } else if(letter === 'MY') {
    this.starBurstTimer=15;
  } else if(letter === 'MO') {
    this.twinArrowTimer=25;
  } else if(letter === 'PE') {
    this.fireTrailTimer=30;
  } else if(letter === 'RO') {
    if(!this.wingmanLeft)  {this.wingmanLeft  =new WingmanShip(this,-1);  this.board.add(this.wingmanLeft);}
    if(!this.wingmanRight) {this.wingmanRight =new WingmanShip(this,1);   this.board.add(this.wingmanRight);}
    if(!this.wingmanLeft2) {this.wingmanLeft2 =new WingmanShip(this,-2.2);this.board.add(this.wingmanLeft2);}
    if(!this.wingmanRight2){this.wingmanRight2=new WingmanShip(this,2.2); this.board.add(this.wingmanRight2);}
  } else if(letter === 'SI') {
    this.ghostTimer=20;this.invincible=9999;
  } else if(letter === 'TA') {
    this.berserkerTimer=15;this.rapidFireTimer=Math.max(this.rapidFireTimer,15);
    this.powerShotTimer=Math.max(this.powerShotTimer,15);this.speedBoostTimer=Math.max(this.speedBoostTimer,15);
  } else if(letter === 'TO') {
    this.spiralTimer=20;this._spiralAngle=0;
  } else if(letter === 'VI') {
    this.axeStormTimer=15;
  } else if(letter === 'ZU') {
    this.warShield=(this.warShield||0)+10;
  }
};

// Decrement all shot-based power-up counters by 1 each time player fires
PlayerShip.prototype._onShotFired = function() {
  if(this.speedBoostTimer  > 0) this.speedBoostTimer--;
  if(this.powerShotTimer   > 0) this.powerShotTimer--;
  if(this.rapidFireTimer   > 0) this.rapidFireTimer--;
  if(this.tripleShotTimer  > 0) this.tripleShotTimer--;
  if(this.magnetTimer      > 0) this.magnetTimer--;
  if(this.homingTimer      > 0) this.homingTimer--;
  if(this.dragonTimer      > 0) this.dragonTimer--;
  if(this.starBurstTimer   > 0) this.starBurstTimer--;
  if(this.twinArrowTimer   > 0) this.twinArrowTimer--;
  if(this.fireTrailTimer   > 0) this.fireTrailTimer--;
  if(this.berserkerTimer   > 0) this.berserkerTimer--;
  if(this.spiralTimer      > 0) this.spiralTimer--;
  if(this.axeStormTimer    > 0) this.axeStormTimer--;
  if(this.goldRushTimer    > 0) this.goldRushTimer--;
  if(this.pharaohTimer     > 0) this.pharaohTimer--;
  if(this.timeSlowTimer    > 0) this.timeSlowTimer--;
  if(this.ghostTimer > 0) {
    this.ghostTimer--;
    if(this.ghostTimer <= 0) this.invincible = 0;
  }

  // Check if the active queued power just expired → activate next
  if(this._activePowerType) {
    var _tp = _POWER_TIMER_PROP[this._activePowerType.letter];
    if(_tp && this[_tp] <= 0) {
      this._activePowerType = null;
      if(this._powerUpQueue.length > 0) {
        var _next = this._powerUpQueue.shift();
        this._activePowerType = _next;
        // Show left notification for newly activated power
        if(this.board) {
          if(_activePowerNotif && _activePowerNotif.board) _activePowerNotif.board.remove(_activePowerNotif);
          this.board.add(new PowerUpNotification(_next));
        }
        this._applyEffect(_next.letter);
      }
    }
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

// ===================================================================
// HOMING MISSILE (Apache AP)
// ===================================================================
var HomingMissile = function(x, y, dmg, board) {
  this.x=x-8;this.y=y;this.w=16;this.h=20;
  this.vx=0;this.vy=-680;this.damage=dmg||15;this.t=0;
  this.type=OBJECT_PLAYER_PROJECTILE;
};
HomingMissile.prototype.step=function(dt){
  this.t+=dt;
  var cx=this.x+this.w/2,cy=this.y+this.h/2,nearest=null,nearDist=99999;
  var objs=this.board.objects;
  for(var i=0;i<objs.length;i++){
    if(objs[i].type!==OBJECT_ENEMY)continue;
    var ox=objs[i].x+(objs[i].w||0)/2,oy=objs[i].y+(objs[i].h||0)/2;
    var d=Math.sqrt((ox-cx)*(ox-cx)+(oy-cy)*(oy-cy));
    if(d<nearDist){nearDist=d;nearest=objs[i];}
  }
  if(nearest){
    var ang=Math.atan2(nearest.y+(nearest.h||0)/2-cy,nearest.x+(nearest.w||0)/2-cx),spd=640;
    this.vx+=(Math.cos(ang)*spd-this.vx)*dt*5.5;
    this.vy+=(Math.sin(ang)*spd-this.vy)*dt*5.5;
  }
  this.x+=this.vx*dt;this.y+=this.vy*dt;
  var hit=this.board.collide(this,OBJECT_ENEMY);
  if(hit){hit.hit(this.damage);this.board.remove(this);return;}
  if(this.y<-60||this.y>Game.height+60||this.x<-60||this.x>Game.width+60)this.board.remove(this);
};
HomingMissile.prototype.draw=function(ctx){
  var cx=this.x+this.w/2,cy=this.y+this.h/2;
  var ang=Math.atan2(this.vy,this.vx)+Math.PI/2;
  ctx.save();ctx.translate(cx,cy);ctx.rotate(ang);
  ctx.shadowColor='#FF6600';ctx.shadowBlur=14;
  ctx.fillStyle='#FF6600';ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(5,8);ctx.lineTo(-5,8);ctx.closePath();ctx.fill();
  ctx.fillStyle='#FFDD00';ctx.beginPath();ctx.moveTo(0,-7);ctx.lineTo(3,4);ctx.lineTo(-3,4);ctx.closePath();ctx.fill();
  ctx.restore();
};

// ===================================================================
// SUN BURST (Aztec AZ)
// ===================================================================
var SunBurst=function(){this.alpha=1.6;this.r=5;};
SunBurst.prototype.step=function(dt){this.alpha-=dt*2.2;this.r+=dt*520;if(this.alpha<=0)this.board.remove(this);};
SunBurst.prototype.draw=function(ctx){
  var a=Math.max(0,Math.min(1,this.alpha)),cx=Game.width/2,cy=Game.height/2;
  ctx.save();
  var g=ctx.createRadialGradient(cx,cy,0,cx,cy,this.r);
  g.addColorStop(0,'rgba(255,255,200,'+a+')');g.addColorStop(0.35,'rgba(255,180,0,'+(a*0.8)+')');g.addColorStop(1,'rgba(255,60,0,0)');
  ctx.fillStyle=g;ctx.fillRect(0,0,Game.width,Game.height);ctx.restore();
};

// ===================================================================
// ZEUS LIGHTNING (Greek GR)
// ===================================================================
var ZeusLightning=function(board,sx,sy){
  this.segs=[];this.alpha=1.3;
  var enemies=[];
  for(var i=0;i<board.objects.length;i++){if(board.objects[i].type===OBJECT_ENEMY)enemies.push(board.objects[i]);}
  enemies.sort(function(a,b){
    var da=(a.x+(a.w||0)/2-sx)*(a.x+(a.w||0)/2-sx)+(a.y+(a.h||0)/2-sy)*(a.y+(a.h||0)/2-sy);
    var db=(b.x+(b.w||0)/2-sx)*(b.x+(b.w||0)/2-sx)+(b.y+(b.h||0)/2-sy)*(b.y+(b.h||0)/2-sy);
    return da-db;
  });
  var px=sx,py=sy;
  for(var j=0;j<Math.min(5,enemies.length);j++){
    var ex=enemies[j].x+(enemies[j].w||0)/2,ey=enemies[j].y+(enemies[j].h||0)/2;
    this.segs.push({x1:px,y1:py,x2:ex,y2:ey});enemies[j].hit(65);px=ex;py=ey;
  }
  if(this.segs.length===0){for(var k=0;k<3;k++)this.segs.push({x1:sx+(Math.random()-.5)*50,y1:sy,x2:sx+(Math.random()-.5)*110,y2:Math.random()*Game.height*0.45});}
  SoundManager.playRocket();
};
ZeusLightning.prototype.step=function(dt){this.alpha-=dt*4;if(this.alpha<=0)this.board.remove(this);};
ZeusLightning.prototype.draw=function(ctx){
  var a=Math.max(0,Math.min(1,this.alpha));
  ctx.save();ctx.lineWidth=4;ctx.shadowColor='#88CCFF';ctx.shadowBlur=24;
  ctx.strokeStyle='rgba(140,200,255,'+a+')';
  for(var i=0;i<this.segs.length;i++){var s=this.segs[i];ctx.beginPath();ctx.moveTo(s.x1,s.y1);ctx.lineTo(s.x2,s.y2);ctx.stroke();}
  ctx.strokeStyle='rgba(255,255,255,'+a+')';ctx.lineWidth=1.5;
  for(var i=0;i<this.segs.length;i++){var s=this.segs[i];ctx.beginPath();ctx.moveTo(s.x1,s.y1);ctx.lineTo(s.x2,s.y2);ctx.stroke();}
  ctx.restore();
};

// ===================================================================
// BULLET CLEAR FLASH (Japanese JP)
// ===================================================================
var BulletClearFlash=function(){this.alpha=1;};
BulletClearFlash.prototype.step=function(dt){this.alpha-=dt*5;if(this.alpha<=0)this.board.remove(this);};
BulletClearFlash.prototype.draw=function(ctx){ctx.save();ctx.globalAlpha=Math.max(0,this.alpha*0.32);ctx.fillStyle='#FFFFFF';ctx.fillRect(0,0,Game.width,Game.height);ctx.restore();};

// ===================================================================
// SPEAR MISSILE (Masai MA)
// ===================================================================
var SpearMissile=function(cx,y){
  this.x=cx-4;this.y=y;this.w=8;this.h=44;
  this.vy=-920;this.vx=0;this.damage=55;this.t=0;
  this.type=OBJECT_PLAYER_PROJECTILE;this._hitSet=[];
};
SpearMissile.prototype.step=function(dt){
  this.t+=dt;this.x+=this.vx*dt;this.y+=this.vy*dt;
  var objs=this.board.objects;
  for(var i=0;i<objs.length;i++){
    var o=objs[i];if(o.type!==OBJECT_ENEMY)continue;
    if(this._hitSet.indexOf(o)!==-1)continue;
    if(this.x<o.x+(o.w||0)&&this.x+this.w>o.x&&this.y<o.y+(o.h||0)&&this.y+this.h>o.y){this._hitSet.push(o);o.hit(this.damage);}
  }
  if(this.y<-70)this.board.remove(this);
};
SpearMissile.prototype.draw=function(ctx){
  var cx=this.x+this.w/2;
  ctx.save();ctx.shadowColor='#FF4488';ctx.shadowBlur=20;
  var gr=ctx.createLinearGradient(cx-4,this.y,cx+4,this.y);
  gr.addColorStop(0,'rgba(255,68,136,0)');gr.addColorStop(0.5,'#FF88CC');gr.addColorStop(1,'rgba(255,68,136,0)');
  ctx.fillStyle=gr;ctx.fillRect(cx-3,this.y,6,this.h);
  ctx.fillStyle='#FFFFFF';ctx.beginPath();ctx.moveTo(cx,this.y-10);ctx.lineTo(cx+5,this.y+8);ctx.lineTo(cx-5,this.y+8);ctx.closePath();ctx.fill();
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
  SoundManager.playAlienTaunt(); // aliens taunt the player on hit
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
    ctx.ellipse(cx, this.y + this.h * 0.44, this.w * 0.65, this.h * 0.68, 0, 0, TAU);
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

  // SI Ghost Walk
  if(this.ghostTimer > 0) {
    ctx.save();ctx.globalAlpha=0.10+0.07*Math.sin(Date.now()*0.009);ctx.fillStyle='#AADDFF';ctx.fillRect(0,0,Game.width,Game.height);ctx.restore();
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
  ctx.shadowColor = this.berserkerTimer  > 0 ? '#FF0000' :
                    this.ghostTimer      > 0 ? '#AADDFF' :
                    this.pharaohTimer    > 0 ? '#FFAA00' :
                    this.goldRushTimer   > 0 ? '#FFD700' :
                    this.axeStormTimer   > 0 ? '#4488FF' :
                    this.dragonTimer     > 0 ? '#FF2200' :
                    this.homingTimer     > 0 ? '#FF6600' :
                    this.timeSlowTimer   > 0 ? '#AA00FF' :
                    this.magnetTimer     > 0 ? '#FFCC00' :
                    this.rapidFireTimer  > 0 ? '#FF8800' :
                    this.tripleShotTimer > 0 ? '#00FFFF' :
                    this.speedBoostTimer > 0 ? '#00FF88' :
                    this.powerShotTimer  > 0 ? '#FF6600' : '#4499FF';
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
  this.vx = 0; // horizontal spread velocity (set by triple shot)
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

  // Angled tip when vx is non-zero (triple-shot spread)
  var tipX = cx;
  if(this.vx) {
    var _vMag = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    tipX = cx + (this.vx / _vMag) * this.h;
  }

  // Outer glow beam
  ctx.strokeStyle = outerColor;
  ctx.lineWidth = beamWidth;
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 14 + sl * 2;
  ctx.beginPath();
  ctx.moveTo(cx, bot);
  ctx.lineTo(tipX, top);
  ctx.stroke();

  // Bright white core
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.moveTo(cx, bot);
  ctx.lineTo(tipX, top);
  ctx.stroke();

  ctx.restore();
};

PlayerMissile.prototype.step = function(dt)  {
  this.y += this.vy * dt;
  if(this.vx) this.x += this.vx * dt;
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

// ===== FIRE TRAIL PARTICLE (PE power) =====
var FireTrailParticle = function(cx, cy) {
  this.x = cx - 10;
  this.y = cy - 8;
  this.w = 20;
  this.h = 20;
  this.type = OBJECT_PLAYER_PROJECTILE;
  this.damage = 12;
  this.life = 0.65;
  this.maxLife = 0.65;
  this.vx = (Math.random() - 0.5) * 50;
  this.vy = 55 + Math.random() * 35;
};
FireTrailParticle.prototype.step = function(dt) {
  this.life -= dt;
  this.x += this.vx * dt;
  this.y += this.vy * dt;
  if(this.life <= 0) { this.board.remove(this); return; }
  var hit = this.board.collide(this, OBJECT_ENEMY);
  if(hit) { hit.hit(this.damage); this.board.remove(this); }
};
FireTrailParticle.prototype.draw = function(ctx) {
  var t = this.life / this.maxLife;
  ctx.save();
  ctx.globalAlpha = t * 0.82;
  var cx = this.x + this.w / 2, cy = this.y + this.h / 2;
  var r = 5 + (1 - t) * 6;
  var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, '#FFFFFF');
  grad.addColorStop(0.25, '#FFEE44');
  grad.addColorStop(0.6, '#FF6600');
  grad.addColorStop(1, 'rgba(255,30,0,0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

var Enemy = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
  this.maxHealth = this.health; // Store for health bar
  this.hitFlash = 0;
  // Sway motion - individual left-right rotation (slow and subtle)
  this.swayAngle = 0;
  this.swaySpeed = 0.6 + Math.random() * 0.4; // Random speed for each enemy
  this.swayOffset = Math.random() * Math.PI * 2; // Random starting phase
  // Track active motherships for sky red tint
  if(this.isMotherShip) { Game.motherShipCount = (Game.motherShipCount || 0) + 1; }
  // Motherships sway slower than regular enemies
  if(this.isMotherShip || this.isBossShip) {
    this.swaySpeed = 0.3 + Math.random() * 0.15; // 0.3-0.45 rad/s (very slow)
    // Scale down 30%, then cap to 65% of screen width for mobile
    var _mW = Math.round(Math.min(this.w * 0.63, Game.width * 0.65));
    this.w = _mW;
    this.h = _mW; // square
    // Center horizontally on screen
    this.x = Math.round(Game.width / 2 - this.w / 2);
    // Mothership morph: face changes slowly and visibly throughout the fight
    this._morphEnabled   = true;
    this._morphAlpha     = 1.0;
    this._morphState     = 'idle';
    this._morphTimer     = 6 + Math.random() * 5; // 6–11s before first change
    this._morphSprite    = this.sprite;
    this._morphOldSprite = null;
    this._morphList      = null;
    this._morphIdx       = 0;
  } else {
    this._morphEnabled   = false;
  }
  // Scale non-boss enemy speed with difficulty (breathing-room dips after bonus stages)
  if(!this.isMotherShip && !this.isBossShip) {
    var _lvlM = _getDiffMult();
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

  // ===== INDIVIDUAL SWAY MOTION (±5° — subtle alive feel) =====
  this.swayAngle = Math.sin(this.t * this.swaySpeed + this.swayOffset) * (Math.PI / 36);

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
        SoundManager.playBossAmbience(); // eerie atmospheric sound on mothership arrival
        SoundManager.playAlienTaunt();   // boss announces its presence
        // arrival — no shake (shake only on player hit or mothership kill)
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

  } else if(this.movementType === 'split_flee') {
    // SPLIT BOSS: burst outward from mothership, arc up, then fall back down toward player
    this.vx *= Math.pow(0.03, dt);    // rapid horizontal deceleration
    if(this.t > 0.6) this.vy += 110 * dt; // gravity kicks in after initial upward burst
    this.x += this.vx * dt;
    this.y += this.vy * dt;

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

  // Mothership / BossShip: slow face-changing morph (very visible on large sprite)
  if(this._morphEnabled && this.motherArrived) {
    if(!this._morphList) {
      var _mmp = _getMorphSpritePool();
      this._morphList = [];
      var _mt = 0;
      while(this._morphList.length < 12 && _mt < 100) {
        _mt++;
        var _mc = _mmp[Math.floor(Math.random() * _mmp.length)];
        if(_mc !== this.sprite && this._morphList.indexOf(_mc) < 0) this._morphList.push(_mc);
      }
    }
    if(this._morphState === 'idle') {
      this._morphTimer -= dt;
      if(this._morphTimer <= 0) {
        this._morphOldSprite = this._morphSprite;
        this._morphSprite    = this._morphList[this._morphIdx % this._morphList.length];
        this._morphIdx++;
        this._morphAlpha = 0;
        this._morphState = 'crossfade';
      }
    } else {
      this._morphAlpha += 0.20 * dt; // ~5s crossfade — clearly visible on big boss
      if(this._morphAlpha >= 1) {
        this._morphAlpha     = 1;
        this._morphOldSprite = null;
        this._morphState     = 'idle';
        this._morphTimer     = 5 + Math.random() * 7; // pause 5–12s before next change
      }
    }
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
  this.health -= (Game.pharaohActive&&this.type===OBJECT_ENEMY?damage*3:damage);
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
        earnPoints(this.board, cx, cy - 50, this.points || 5000, '#FF0000');
        this.board.add(new PowerUp(cx, cy));

        // Split mechanic: 65% chance mothership breaks into 2 mini-bosses
        if(this.isMotherShip && Math.random() < 0.65) {
          var _splitPool = ['alien_boss_cockroach','alien_boss_ant','alien_boss_flea',
                            'alien_boss_ladybug','alien_boss_cricket','alien_boss_stinkbug',
                            'alien_boss_leafhopper','alien_boss_termite'];
          var _splitSz  = Math.round(Math.min(this.w * 0.40, 90));
          var _splitH   = Math.round((this.maxHealth || 800) * 0.30);
          var _splitPts = Math.round((this.points || 500) * 0.18);
          var _spB = this.board;
          function _rndSpl() { return _splitPool[Math.floor(Math.random() * _splitPool.length)]; }
          // Left mini-boss
          _spB.add(new Enemy(
            { sprite: _rndSpl(), health: _splitH, points: _splitPts,
              movementType: 'split_flee', missiles: 1, reloadTime: 2.2, damage: 1 },
            { x: cx - _splitSz, y: cy - _splitSz * 0.5,
              vx: -220, vy: -100, w: _splitSz, h: _splitSz }
          ));
          // Right mini-boss
          _spB.add(new Enemy(
            { sprite: _rndSpl(), health: _splitH, points: _splitPts,
              movementType: 'split_flee', missiles: 1, reloadTime: 2.2, damage: 1 },
            { x: cx + _splitSz * 0.5, y: cy - _splitSz * 0.5,
              vx:  220, vy: -100, w: _splitSz, h: _splitSz }
          ));
        }
      } else {
        SoundManager.playEnemyDeath();
        var ecx = this.x + this.w/2, ecy = this.y + this.h/2;
        this.board.add(new Explosion(ecx, ecy));
        this.board.add(new ParticleExplosion(ecx, ecy, this.w, this.sprite));
        earnPoints(this.board, ecx, this.y, this.points || 200, '#44AAFF');
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
    ctx.arc(mCx, mCy, _auraR, 0, TAU);
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
      ctx.arc(_tCX, _tCY, _tClipR, 0, TAU);
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
    ctx.arc(_bossCX, _bossCY, _clipR, 0, TAU);
    ctx.clip();
    // Mothership is always fully opaque — use stack-over morph (new fades in on top of old)
    ctx.globalAlpha = 1.0;
    var _mDrawKey = (this._morphEnabled && this._morphSprite) ? this._morphSprite : this.sprite;
    if(this._morphEnabled && this._morphOldSprite) {
      // Draw old sprite at full opacity first
      var _oldInfo = SpriteSheet.map[this._morphOldSprite];
      if (_oldInfo && _oldInfo.blackBg) { ctx.globalCompositeOperation = 'screen'; }
      else { ctx.globalCompositeOperation = 'source-over'; }
      SpriteSheet.draw(ctx, this._morphOldSprite, this.x, this.y, this.frame, this.w, this.h);
      // Fade new sprite in on top — always opaque underneath
      var _newInfo = SpriteSheet.map[_mDrawKey];
      if (_newInfo && _newInfo.blackBg) { ctx.globalCompositeOperation = 'screen'; }
      else { ctx.globalCompositeOperation = 'source-over'; }
      ctx.globalAlpha = this._morphAlpha;
      SpriteSheet.draw(ctx, _mDrawKey, this.x, this.y, this.frame, this.w, this.h);
      ctx.globalAlpha = 1.0;
    } else {
      var _sprInfo = SpriteSheet.map[_mDrawKey];
      if (_sprInfo && _sprInfo.blackBg) { ctx.globalCompositeOperation = 'screen'; }
      SpriteSheet.draw(ctx, _mDrawKey, this.x, this.y, this.frame, this.w, this.h);
    }
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
      ctx.arc(dotX, dotY, dotSize, 0, TAU);
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
    ctx.arc(ringCX, ringCY, ringR, 0, TAU);
    ctx.stroke();
  }

  ctx.restore();
};

// Progressive enemy shot spawner.
// Levels  1-6  : standard straight-down red plasma
// Levels  7-12 : aimed blue orb (tracks player position)
// Levels 13-17 : aimed + faster yellow orb
// Levels 18-23 : aimed 3-spread green pellets
// Levels 24+   : faster aimed 3-spread
// After every bonus stage the shot type reverts one tier (breathing room).
function _spawnEnemyShot(board, x, y) {
  var lv = currentLevel;
  var _breather = (lv > 5 && (lv - 1) % 5 === 0); // level right after bonus stage
  var _tier = _breather ? Math.max(0, Math.floor((lv - 5) / 5) - 1)
                        :                            Math.floor((lv - 1) / 6);
  if(lv <= 5) _tier = 0;

  if(_tier <= 0) {
    // Standard: straight down
    board.add(new EnemyMissile(x, y));
  } else if(_tier === 1) {
    // Aimed
    board.add(new EnemyMissile(x, y, { aimed: true, shotType: 'aimed', speed: 215 }));
  } else if(_tier === 2) {
    // Aimed + fast
    board.add(new EnemyMissile(x, y, { aimed: true, shotType: 'fast', speed: 265 }));
  } else if(_tier === 3) {
    // 3-spread (aimed center + two angled)
    var _off = 0.28;
    board.add(new EnemyMissile(x, y, { aimed: true, angleOffset: -_off, shotType: 'spread', speed: 230 }));
    board.add(new EnemyMissile(x, y, { aimed: true,                     shotType: 'spread', speed: 230 }));
    board.add(new EnemyMissile(x, y, { aimed: true, angleOffset:  _off, shotType: 'spread', speed: 230 }));
  } else {
    // Fast 3-spread
    var _off2 = 0.24;
    board.add(new EnemyMissile(x, y, { aimed: true, angleOffset: -_off2, shotType: 'spread', speed: 290 }));
    board.add(new EnemyMissile(x, y, { aimed: true,                      shotType: 'aimed',  speed: 290 }));
    board.add(new EnemyMissile(x, y, { aimed: true, angleOffset:  _off2, shotType: 'spread', speed: 290 }));
  }
}

var EnemyMissile = function(x, y, opts) {
  opts = opts || {};
  this.setup('enemy_missile', { damage: 10 });
  this.x = x - this.w / 2;
  this.y = y;
  this.shotType = opts.shotType || 'standard';
  var _speed = opts.speed || 200;
  // Direction: straight down by default, or aimed at player
  var _angle = Math.PI / 2; // default: straight down
  if(opts.aimed && playerShip) {
    var _px = playerShip.x + playerShip.w / 2;
    var _py = playerShip.y + playerShip.h / 2;
    _angle = Math.atan2(_py - y, _px - x);
  }
  _angle += (opts.angleOffset || 0);
  this.vx = Math.cos(_angle) * _speed;
  this.vy = Math.sin(_angle) * _speed;
};

EnemyMissile.prototype = new Sprite();
EnemyMissile.prototype.type = OBJECT_ENEMY_PROJECTILE;

EnemyMissile.prototype.draw = function(ctx) {
  ctx.save();
  var cx = this.x + this.w / 2;
  var cy = this.y + this.h * 0.3;

  // Color scheme per shot type
  var _outer, _core, _trail1, _trail2, _glow;
  if(this.shotType === 'aimed') {
    _outer = '#0088FF'; _core = '#AADDFF'; _trail1 = '#0055CC'; _trail2 = '#003399'; _glow = '#0066FF';
  } else if(this.shotType === 'fast') {
    _outer = '#FFD700'; _core = '#FFFAAA'; _trail1 = '#FF8800'; _trail2 = '#FF5500'; _glow = '#FFCC00';
  } else if(this.shotType === 'spread') {
    _outer = '#00DD44'; _core = '#AAFFCC'; _trail1 = '#009922'; _trail2 = '#005511'; _glow = '#00CC33';
  } else {
    // standard: red plasma (original)
    _outer = '#FF5500'; _core = '#FFCC88'; _trail1 = '#FF4400'; _trail2 = '#FF2200'; _glow = '#FF3300';
  }

  // Outer glow orb
  ctx.shadowColor = _glow;
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, TAU);
  ctx.fillStyle = _outer;
  ctx.fill();

  // Bright hot core
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, TAU);
  ctx.fillStyle = _core;
  ctx.fill();

  // Trailing sparks
  ctx.globalAlpha = 0.5;
  ctx.shadowBlur = 9;
  ctx.beginPath();
  ctx.arc(cx, cy - 9, 4, 0, TAU);
  ctx.fillStyle = _trail1;
  ctx.fill();

  ctx.globalAlpha = 0.22;
  ctx.beginPath();
  ctx.arc(cx, cy - 17, 2.5, 0, TAU);
  ctx.fillStyle = _trail2;
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
    var _rgb = dustPalette[Math.floor(Math.random() * dustPalette.length)];
    this.dust.push({
      x: cx + (Math.random() - 0.5) * size * 0.28,
      y: cy + (Math.random() - 0.5) * size * 0.28,
      vx: Math.cos(da) * ds, vy: Math.sin(da) * ds - 14,
      r: size * (0.16 + Math.random() * 0.16),
      maxR: size * (0.52 + Math.random() * 0.72),
      life: dl, maxLife: dl,
      rgb: _rgb,
      // Pre-built gradient stop strings — zero string concat in draw()
      rgba40: 'rgba(' + _rgb + ',0.40)',
      rgba20: 'rgba(' + _rgb + ',0.20)',
      rgba0:  'rgba(' + _rgb + ',0)',
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
  // Use ctx.globalAlpha for per-puff fade + pre-cached fillStyle (no per-blob string concat)
  for(var d = 0; d < this.dust.length; d++) {
    var du = this.dust[d];
    if(du.life <= 0) continue;
    var da = du.life / du.maxLife;
    for(var b = 0; b < du.blobs.length; b++) {
      var bl = du.blobs[b];
      var bx = du.x + bl.ox * du.r;
      var by = du.y + bl.oy * du.r;
      var br = Math.max(1, du.r * bl.rs);
      var grad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      // Pre-built strings at init — zero string allocation in draw loop
      grad.addColorStop(0,   du.rgba40);
      grad.addColorStop(0.5, du.rgba20);
      grad.addColorStop(1,   du.rgba0);
      ctx.globalAlpha = da;
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(bx, by, br, 0, TAU); ctx.fill();
    }
  }

  // Fire sparks on top — shadowBlur set once outside loop
  ctx.shadowBlur = 5;
  for(var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    if(p.life > 0) {
      var a = p.life / p.maxLife;
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * Math.max(0.2, a), 0, TAU);
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
    var _lastPuff = this.puffs[this.puffs.length-1];
    _lastPuff.maxLife = _lastPuff.life;
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
    ctx.beginPath(); ctx.arc(pf.x, pf.y, pf.r, 0, TAU);
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
    ctx.beginPath(); ctx.arc(s.x, s.y, s.size * a, 0, TAU);
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
      ctx.arc(p.x, p.y, p.size, 0, TAU);
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
// ===== POWER-UP PICKUP NOTIFICATION (top-left, next to power bars) =====
var _activePowerNotif = null; // only one notification at a time

var PowerUpNotification = function(pType) {
  this.type = 0;
  this.x = 0; this.y = 0; this.w = 1; this.h = 1;
  this.pType = pType;
  this.name  = pType.name  || '?';
  this.color = pType.color || '#FF2200';
  this.icon  = pType.sprite || null;  // coin sprite only — no placeholder circles
  this.life  = 2.8;
  _activePowerNotif = this;
};

PowerUpNotification.prototype.step = function(dt) {
  this.life -= dt;
  if(this.life <= 0 && this.board) this.board.remove(this);
};

PowerUpNotification.prototype.draw = function(ctx) {
  var alpha = this.life > 2.3 ? (2.8 - this.life) / 0.5  // fade in 0.5s
            : this.life < 0.6 ? this.life / 0.6           // fade out 0.6s
            : 1.0;
  var w = Game.width;
  var scoreSz = Math.max(14, Math.floor(w / 32));
  var hiSz    = Math.max(9,  Math.floor(w / 55));
  var barBaseY = scoreSz + hiSz + 52;
  var sz = Math.max(11, Math.floor(w / 30));
  var pulse = 1.0 + 0.12 * Math.sin(this.life * 18);

  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.textAlign    = 'left';
  ctx.textBaseline = 'top';
  ctx.font = 'bold ' + Math.round(sz * pulse) + 'px "Uncial Antiqua", Bangers, Arial';
  ctx.fillStyle   = '#FF2200';
  ctx.shadowColor = '#FF6600';
  ctx.shadowBlur  = 16;
  ctx.strokeStyle = 'rgba(0,0,0,0.6)';
  ctx.lineWidth   = 3;
  var _txt = '\u2736 ' + this.name.toUpperCase();
  ctx.strokeText(_txt, 10, barBaseY);
  ctx.fillText(_txt, 10, barBaseY);

  // Coin sprite below the text — bounces gently
  if(this.icon && SpriteSheet.map[this.icon]) {
    var _iconSz  = Math.round(Math.max(28, w / 20) * pulse);
    var _iconX   = 10;
    var _iconY   = barBaseY + sz + 8;
    ctx.shadowBlur = 22;
    ctx.shadowColor = this.color;
    SpriteSheet.draw(ctx, this.icon, _iconX, _iconY, 0, _iconSz, _iconSz);
  }
  ctx.restore();
};

// ===================================================================
// EXTRA LIFE FLASH — center-screen notification when crossing 120k pts
// Two hearts flanking text, flashing like coin-collect effect for 3s
// ===================================================================
var ExtraLifeFlash = function() {
  this.x = 0; this.y = 0; this.w = 1; this.h = 1;
  this.t = 0;
  this.life = 3.2;
};
ExtraLifeFlash.prototype.step = function(dt) {
  this.t += dt;
  this.life -= dt;
  if(this.life <= 0 && this.board) this.board.remove(this);
};
ExtraLifeFlash.prototype.draw = function(ctx) {
  var w = Game.width, h = Game.height;
  var pulse = Math.abs(Math.sin(this.t * 16));
  var fadeAlpha = Math.min(1, this.life) * Math.min(1, this.t * 3);
  var alpha = fadeAlpha * (0.55 + 0.45 * pulse);
  if(alpha <= 0) return;

  var cy = h * 0.44;
  var sz = Math.max(22, Math.floor(h * 0.072));
  var flashRed = Math.sin(this.t * 16) > 0;
  var mainColor = flashRed ? '#FF0000' : '#FF5577';
  // Scale pulses between 0.85 and 1.05 in sync with color flash
  var scaleFactor = 0.85 + 0.20 * pulse;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Apply scale from center of text
  ctx.translate(w / 2, cy);
  ctx.scale(scaleFactor, scaleFactor);

  ctx.font = 'bold ' + sz + 'px "Uncial Antiqua", Bangers, Arial';
  ctx.shadowColor = '#FF0000';
  ctx.shadowBlur = 22 * pulse;
  ctx.fillStyle = mainColor;
  ctx.fillText('\u2665\u2665  EXTRA LIFE!  \u2665\u2665', 0, 0);

  ctx.font = 'bold ' + Math.round(sz * 0.55) + 'px "Uncial Antiqua", Bangers, Arial';
  ctx.shadowBlur = 10 * pulse;
  ctx.fillStyle = '#FFAAAA';
  ctx.fillText('+1 \u2665', 0, sz * 1.1);

  ctx.restore();
};

// ===================================================================
// SCREEN FADE — full-screen black overlay for stage transitions
// mode 'out': fades clear→black (0.45s), fires callback, stays black
// mode 'in' : fades black→clear (0.55s), removes itself when done
// Usage: Game.setBoard(20, new ScreenFade('out', 0.45, function(){ ... }))
//        Game.setBoard(20, new ScreenFade('in', 0.55))
// ===================================================================
var ScreenFade = function(mode, duration, callback) {
  this.x = 0; this.y = 0; this.w = 1; this.h = 1;
  this._mode = mode;           // 'in' or 'out'
  this._duration = duration || 0.5;
  this._callback = callback || null;
  this._t = 0;
  this._done = false;
};
ScreenFade.prototype.step = function(dt) {
  if(this._done) return;
  this._t += dt;
  if(this._t >= this._duration) {
    this._t = this._duration;
    this._done = true;
    if(this._mode === 'in') {
      Game.setBoard(20, null); // fully transparent — clear overlay
    }
    if(this._callback) {
      var cb = this._callback;
      this._callback = null;
      cb();
    }
  }
};
ScreenFade.prototype.draw = function(ctx) {
  var progress = this._duration > 0 ? Math.min(1, this._t / this._duration) : 1;
  var alpha = this._mode === 'out' ? progress : (1 - progress);
  if(alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, Game.width, Game.height);
  ctx.restore();
};

var ScorePopup = function(x, y, points, mult, color, flash) {
  this.x = x;
  this.y = y;
  this.points = points;
  this.mult = mult || 1;
  this.color = color || '#FFFF00';
  this.flash = !!flash; // only DivingEnemy / KamikazeEnemy pass true
  this.life = 2.5;
  this.vy = -32 - (this.mult > 1 ? 10 : 0); // always float upward
};

ScorePopup.prototype.step = function(dt) {
  this.y += this.vy * dt;
  this.life -= dt;
  if(this.life <= 0) {
    this.board.remove(this);
  }
};

ScorePopup.prototype.draw = function(ctx) {
  // Flash mode (trail enemies only): fast on/off ~8Hz, slows to 4Hz near end
  if(this.flash) {
    var elapsed = 2.5 - this.life;
    var flashHz = this.life > 0.8 ? 8 : 4;
    if(Math.sin(elapsed * flashHz * Math.PI) < 0) return;
  }

  // Fade out in last 0.5 seconds
  var fade = this.life < 0.5 ? this.life / 0.5 : 1.0;

  ctx.save();
  ctx.globalAlpha = fade;

  // Size: bigger for flash/high-point enemies or combos
  var sz = this.mult >= 4 ? 24 : this.mult > 1 ? 20 : this.flash ? 22 : 17;
  ctx.font = 'bold ' + sz + 'px "Uncial Antiqua", Bangers, Arial';

  // Color: combo overrides per-enemy color
  var col = this.mult >= 6 ? '#FF4400'
          : this.mult >= 4 ? '#FF8800'
          : this.mult >= 2 ? '#FFCC00'
          : this.color;
  ctx.fillStyle = col;
  ctx.shadowColor = col;
  ctx.shadowBlur = this.flash ? 18 : 8;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  var label = '+' + Math.round(this.points);
  if(this.mult > 1) label += '  x' + this.mult + '!';
  ctx.fillText(label, this.x, this.y);
  ctx.restore();
};

window.addEventListener("load", function() {
  activateInfiniteLoop();
  Game.initialize("game",sprites,startGame);
});

// ─── Ship select + Save: press S at any time during gameplay ────────────────
window.addEventListener('keydown', function(e) {
  if((e.key === 's' || e.key === 'S') &&
      Game.playing && !Game.paused && !Game.shipSelectOpen && playerShip) {
    e.preventDefault();
    _saveProgressToStorage(); // S = save progress
    Game.setBoard(14, new SavedFlashNotification()); // show "SAVED" flash on screen
    Game.setBoard(11, new ShipSelectScreen(function(key) {
      Game._selectedShip = key;
      if(playerShip) playerShip.changeShip(key);
    }));
  }
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

// ===== ACTIVE POWER QUEUE DISPLAY (right side, below sound indicator) =====
var ActivePowerQueueDisplay = function() {
  this.x = 0; this.y = 0; this.w = 1; this.h = 1;
  this.type = 0;
  this._lastActive = null;
  this._activeSince = 0;
};
ActivePowerQueueDisplay.prototype.step = function(dt) {
  if(!playerShip) return;
  var cur = playerShip._activePowerType;
  if(cur !== this._lastActive) {
    this._lastActive = cur;
    this._activeSince = Date.now();
  }
};
ActivePowerQueueDisplay.prototype.draw = function(ctx) {
  if(!playerShip) return;
  var ship   = playerShip;
  var active = ship._activePowerType;
  var queue  = ship._powerUpQueue;
  if(!active && queue.length === 0) return;
  if(!active) return;

  var w  = Game.width;
  var sz = Math.max(9, Math.floor(w / 40));
  var x  = w - 8;
  var y  = 156;

  ctx.save();
  ctx.textAlign    = 'right';
  ctx.textBaseline = 'top';

  // Pulse/fade animation — loops so the name keeps blinking while power is active
  var elapsed = (Date.now() - this._activeSince) / 1000;
  var life    = 2.5 - (elapsed % 2.5);
  var alpha   = life > 2.0 ? (2.5 - life) / 0.5
              : life < 0.6 ? life / 0.6
              : 1.0;
  var pulse = 1.0 + 0.12 * Math.sin(life * 18);

  // Active power name
  ctx.font        = 'bold ' + Math.round(sz * pulse) + 'px "Uncial Antiqua", Bangers, Arial';
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.fillStyle   = '#00FF66';
  ctx.shadowColor = '#00AA44';
  ctx.shadowBlur  = 16;
  ctx.strokeStyle = 'rgba(0,0,0,0.6)';
  ctx.lineWidth   = 3;
  var _atxt = '\u2736 ' + active.name.toUpperCase();
  ctx.strokeText(_atxt, x, y);
  ctx.fillText(_atxt, x, y);

  // Active power coin icon (below name, right-aligned, pulses with name)
  var _iconSz  = Math.round(Math.max(28, w / 20) * pulse);
  var _coinKey = active.sprite;
  if(_coinKey && SpriteSheet.map[_coinKey]) {
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.shadowBlur  = 20;
    ctx.shadowColor = active.color || '#00FF66';
    SpriteSheet.draw(ctx, _coinKey, x - _iconSz, y + sz + 6, 0, _iconSz, _iconSz);
  }

  // Queued powers — coin sprites, 2 per row (3→2+1, 4→2+2), blinking
  if(queue.length > 0) {
    var _qSz  = Math.max(18, Math.round(w / 38));
    var _gap  = 3;
    var _qBaseY = y + sz + 8 + _iconSz + 8;
    var _cols = queue.length === 1 ? 1 : 2;  // always 2 per row
    var _blinkA = 0.35 + 0.65 * Math.abs(Math.sin(Date.now() / 260));
    ctx.shadowBlur = 8;
    for(var _qi = 0; _qi < queue.length; _qi++) {
      var _qp      = queue[_qi];
      var _qSprite = _qp.sprite;
      var _row     = Math.floor(_qi / _cols);
      var _col     = _qi % _cols;
      // right-align the row
      var _rowCount = (_row === Math.floor((queue.length - 1) / _cols))
                      ? queue.length - _row * _cols : _cols;
      var _rowW    = _rowCount * _qSz + (_rowCount - 1) * _gap;
      var _qx      = x - _rowW + _col * (_qSz + _gap);
      var _qy      = _qBaseY + _row * (_qSz + _gap);
      ctx.globalAlpha = _blinkA;
      ctx.shadowColor = _qp.color || '#FFFFFF';
      if(_qSprite && SpriteSheet.map[_qSprite]) {
        SpriteSheet.draw(ctx, _qSprite, _qx, _qy, 0, _qSz, _qSz);
      }
    }
  }

  ctx.restore();
};

// ===== BONUS STAGE SIDE FIGURES =====
var _DEMONIK_DIR = 'images/title_figures/';
var _DEMONIK_FILES = [
  'Remove_background_to_create_transparent_PNG-1771905800584.webp',
  'Remove_background_to_create_transparent_PNG-1771905806565.webp',
  'Remove_background_to_create_transparent_PNG-1771905811996.webp',
  'Remove_background_to_create_transparent_PNG-1771905820684.webp',
  'Remove_background_to_create_transparent_PNG-1771905823234.webp',
  'Remove_background_to_create_transparent_PNG-1771906020814.webp',
  'Remove_background_to_create_transparent_PNG-1771906030109.webp',
  'Remove_background_to_create_transparent_PNG-1771906033656.webp',
  'Remove_background_to_create_transparent_PNG-1771906039131.webp',
  'Remove_background_to_create_transparent_PNG-1771906042082.webp',
  'Remove_background_to_create_transparent_PNG-1771906042193.webp',
  'Remove_background_to_create_transparent_PNG-1771906046420.webp',
  'Remove_background_to_create_transparent_PNG-1771906052029.webp',
  'fig_06.webp',
  'fig_07.webp'
];

var BonusStageFigures = function() {
  this.x = 0; this.y = 0; this.w = 1; this.h = 1;
  this.type = 0;
  var shuffled = _DEMONIK_FILES.slice().sort(function() { return Math.random() - 0.5; });
  this._leftImg  = new Image();
  this._rightImg = new Image();
  this._leftImg.src  = _DEMONIK_DIR + shuffled[0];
  this._rightImg.src = _DEMONIK_DIR + shuffled[1];
};
BonusStageFigures.prototype.step = function(dt) {};
BonusStageFigures.prototype.draw = function(ctx) {
  var w = Game.width, h = Game.height;
  var figW = Math.round(w * 0.25);
  var figH = Math.round(h * 0.65);
  var yOff = Math.round(h * 0.30);
  ctx.save();
  ctx.globalAlpha = 0.88;
  if(this._leftImg.complete  && this._leftImg.naturalWidth)
    ctx.drawImage(this._leftImg,  0, yOff, figW, figH);
  if(this._rightImg.complete && this._rightImg.naturalWidth)
    ctx.drawImage(this._rightImg, w - figW, yOff, figW, figH);
  ctx.restore();
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
  ctx.ellipse(cx, by + 2, 4.5, flameH * 0.55, 0, 0, TAU);
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
      ctx.arc(this.x, this.y, fbR, 0, TAU);
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
      ctx.beginPath(); ctx.arc(this.x, this.y, rr, 0, TAU); ctx.stroke();
    }
  }
  ctx.shadowBlur = 0;

  // ── Smoke puffs ──
  for(var m = 0; m < this.smoke.length; m++) {
    var sm = this.smoke[m];
    if(sm.life > 0 && this.t > sm.delay) {
      ctx.globalAlpha = (sm.life/sm.maxLife) * 0.38;
      ctx.fillStyle = '#888';
      ctx.beginPath(); ctx.arc(sm.x, sm.y, sm.size, 0, TAU); ctx.fill();
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
      ctx.arc(p.x, p.y, p.size * Math.max(0.15, pa), 0, TAU);
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

 
 
 
   
    
     
