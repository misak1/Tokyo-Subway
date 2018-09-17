var gui;
var scene;
var camera;
var renderer;
var controls;
var engine;
var clock = new THREE.Clock();
var width = window.innerWidth - 2;
var height = window.innerHeight - 2;
var MAP = ASSETS["map_002.jpg"]; // 空撮写真
var WIREFRAME = true;
var MAPOPACITY = 0.5;
var ROTATE = true;
var TOKYOMETRO = true;
var TOEI = true;
var JR = true;

var dataSet1 = [
    // 日比谷線
    [
        { lat: 35.749412, long: 139.805108, dep: 14.4, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.733336, long: 139.799171, dep: 8, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.729528, long: 139.79133, dep: -10.8, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.720734, long: 139.784542, dep: -9.2, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.713768, long: 139.777254, dep: -13.7, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.706555, long: 139.776202, dep: -9.6, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.698683, long: 139.774219, dep: -12.4, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.690737, long: 139.778433, dep: -9.7, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.686307, long: 139.782285, dep: -10.4, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.679752, long: 139.780005, dep: -8.5, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.674617, long: 139.777705, dep: -12.2, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.668115, long: 139.772603, dep: -10.2, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.669464, long: 139.767253, dep: -15.3, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.671989, long: 139.763965, dep: -15.8, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.675114, long: 139.759765, dep: -18.8, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.673838, long: 139.750899, dep: -16.4, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.662978, long: 139.745069, dep: -11.3, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.662836, long: 139.731443, dep: -11.6, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.652279, long: 139.722227, dep: -10, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.64669, long: 139.710106, dep: -11.2, mag: 6, rosen_type: 'Tokyo-Metro-2' },
        { lat: 35.644307, long: 139.699157, dep: 5.2, mag: 6, rosen_type: 'Tokyo-Metro-2' },
    ],
    // 銀座線
    [
        { lat: 35.712074, long: 139.79843, dep: -8.8, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.709855, long: 139.7908, dep: -7.7, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.711352, long: 139.782734, dep: -6.8, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.713768, long: 139.777254, dep: -10.1, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.70766, long: 139.772977, dep: -8, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.702972, long: 139.771713, dep: -7.4, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.69169, long: 139.770883, dep: -8, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.684888, long: 139.773161, dep: -9.8, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.682413, long: 139.773919, dep: -10.5, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.67685, long: 139.7701, dep: -10.3, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.671989, long: 139.763965, dep: -9.3, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.665498, long: 139.75964, dep: -10, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.670236, long: 139.749832, dep: -8.5, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.673621, long: 139.741419, dep: -9.4, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.677021, long: 139.737047, dep: -11.9, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.672765, long: 139.724159, dep: -7.7, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.670527, long: 139.717857, dep: -9.5, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.665247, long: 139.712314, dep: -8.1, mag: 6, rosen_type: 'Tokyo-Metro-3' },
        { lat: 35.658517, long: 139.701334, dep: 12.1, mag: 6, rosen_type: 'Tokyo-Metro-3' },
    ],
    // 丸ノ内線
    [
        { lat: 35.728926, long: 139.71038, dep: -8.7, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.725793, long: 139.729915, dep: -6.8, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.717305, long: 139.736734, dep: -5.9, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.707337, long: 139.7512, dep: 3.5, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.706671, long: 139.759914, dep: -6.3, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.699855, long: 139.763786, dep: -7.6, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.695434, long: 139.767575, dep: -8.1, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.684801, long: 139.766086, dep: -10.2, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.681382, long: 139.766084, dep: -10.3, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.671989, long: 139.763965, dep: -10.3, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.673838, long: 139.750899, dep: -11.3, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.67393, long: 139.745219, dep: -11.2, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.677021, long: 139.737047, dep: -11.7, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.686014, long: 139.730667, dep: 5.5, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.687958, long: 139.720103, dep: -7.5, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.688588, long: 139.71069, dep: -7.6, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.690616, long: 139.706271, dep: -11, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.690921, long: 139.700258, dep: -11.2, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.694298, long: 139.692778, dep: -10, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.69792, long: 139.68291, dep: -9.8, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.692123, long: 139.673997, dep: -8.2, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.690514, long: 139.666933, dep: -7, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.683496, long: 139.656498, dep: -10.3, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.683496, long: 139.656498, dep: -10.3, mag: 6, rosen_type: 'Tokyo-Metro-4' },
    ],
    // 丸ノ内線
    [
        { lat: 35.69792, long: 139.68291, dep: -9.8, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.697491, long: 139.66903, dep: -7.3, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.697802, long: 139.657822, dep: -6.4, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.697985, long: 139.648068, dep: -7, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.699624, long: 139.63576, dep: -7.7, mag: 6, rosen_type: 'Tokyo-Metro-4' },
        { lat: 35.704632, long: 139.619981, dep: -10.7, mag: 6, rosen_type: 'Tokyo-Metro-4' },
    ],
    // 東西線
    [
        { lat: 35.707452, long: 139.959097, dep: 0.9, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.7032, long: 139.941876, dep: 6.7, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.691613, long: 139.925017, dep: 7.4, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.682558, long: 139.914235, dep: 7.4, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.672687, long: 139.902311, dep: 7.7, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.665743, long: 139.892937, dep: 8.6, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.663523, long: 139.872694, dep: 9, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.664528, long: 139.85937, dep: 10, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.668796, long: 139.83065, dep: -6.2, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.669629, long: 139.817596, dep: -10.9, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.669457, long: 139.806528, dep: -22.4, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.671984, long: 139.795787, dep: -11.4, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.679752, long: 139.780005, dep: -15.3, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.682413, long: 139.773919, dep: -19.1, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.684801, long: 139.766086, dep: -18.4, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.690662, long: 139.756817, dep: -11.1, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.695589, long: 139.751948, dep: -11.4, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.702065, long: 139.745015, dep: -10.8, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.703904, long: 139.734238, dep: -17.5, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.705723, long: 139.721319, dep: -10.8, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.712285, long: 139.703782, dep: -12.9, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.71074, long: 139.686337, dep: -12.6, mag: 6, rosen_type: 'Tokyo-Metro-5' },
        { lat: 35.706032, long: 139.665652, dep: 0.7, mag: 6, rosen_type: 'Tokyo-Metro-5' },
    ],
    // 南北線
    [
        { lat: 35.783417, long: 139.722103, dep: -18, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.777948, long: 139.732599, dep: -16.4, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.765172, long: 139.735933, dep: -20.2, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.752474, long: 139.738139, dep: -17.5, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.745902, long: 139.742302, dep: -14.1, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.736489, long: 139.746875, dep: -16.9, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.724155, long: 139.753828, dep: -19.4, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.717633, long: 139.758025, dep: -21.9, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.707337, long: 139.7512, dep: -37.5, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.702065, long: 139.745015, dep: -20.3, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.691008, long: 139.735585, dep: -20.5, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.686014, long: 139.730667, dep: -21.2, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.678757, long: 139.740258, dep: -26.7, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.673621, long: 139.741419, dep: -16.2, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.665595, long: 139.739, dep: -22.3, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.654682, long: 139.737051, dep: -24.3, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.642903, long: 139.734104, dep: -29.8, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.637917, long: 139.726133, dep: -28.3, mag: 6, rosen_type: 'Tokyo-Metro-7' },
        { lat: 35.633998, long: 139.715828, dep: -19.8, mag: 6, rosen_type: 'Tokyo-Metro-7' },
    ],
    // 有楽町線
    [
        { lat: 35.788515, long: 139.612343, dep: 1.7, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.776557, long: 139.631497, dep: -16.1, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.77053, long: 139.644543, dep: -15.2, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.757863, long: 139.653762, dep: -17.7, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.749822, long: 139.665023, dep: -17.7, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.743803, long: 139.678572, dep: -17.3, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.738418, long: 139.689157, dep: -12.3, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.73323, long: 139.698715, dep: -16.1, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.728926, long: 139.71038, dep: -12.2, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.725362, long: 139.720435, dep: -13.8, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.719044, long: 139.72754, dep: -16.7, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.709495, long: 139.733538, dep: -16, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.702065, long: 139.745015, dep: -19.1, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.691008, long: 139.735585, dep: -8.9, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.684006, long: 139.737613, dep: -15.9, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.678757, long: 139.740258, dep: -23.7, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.677366, long: 139.751757, dep: -17.1, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.675069, long: 139.763328, dep: -19.4, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.67435, long: 139.767045, dep: -23, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.670462, long: 139.773711, dep: -21, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.664871, long: 139.784233, dep: -22.5, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.654908, long: 139.79621, dep: -19, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.645576, long: 139.81052, dep: -21.9, mag: 6, rosen_type: 'Tokyo-Metro-8' },
        { lat: 35.646157, long: 139.827426, dep: 7.8, mag: 6, rosen_type: 'Tokyo-Metro-8' },
    ],
    // 千代田線
    [
        { lat: 35.669062, long: 139.679678, dep: 8.6, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.668954, long: 139.691318, dep: -11.1, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.669071, long: 139.703995, dep: -17.4, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.665247, long: 139.712314, dep: -18.8, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.666572, long: 139.726215, dep: -19.3, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.672371, long: 139.736539, dep: -15, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.67393, long: 139.745219, dep: -37.9, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.673838, long: 139.750899, dep: -8.2, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.675114, long: 139.759765, dep: -14.4, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.680366, long: 139.761615, dep: -15.3, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.684801, long: 139.766086, dep: -14.1, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.698072, long: 139.766014, dep: -24.3, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.708243, long: 139.769916, dep: -12.4, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.717373, long: 139.765741, dep: -15.8, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.725549, long: 139.763243, dep: -15.4, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.732135, long: 139.766787, dep: -15.3, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.742268, long: 139.781435, dep: -16.3, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.749412, long: 139.805108, dep: -11.3, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.762214, long: 139.824914, dep: 7.1, mag: 6, rosen_type: 'Tokyo-Metro-9' },
        { lat: 35.776895, long: 139.8321304, dep: 7, mag: 6, rosen_type: 'Tokyo-Metro-9' },
    ],
    // 半蔵門線
    [
        { lat: 35.658517, long: 139.701334, dep: -14.9, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.665247, long: 139.712314, dep: -8.5, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.672765, long: 139.724159, dep: -14.6, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.678757, long: 139.740258, dep: -36, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.685703, long: 139.741644, dep: -18.3, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.695589, long: 139.751948, dep: -21.9, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.695492, long: 139.75812, dep: -22.1, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.684801, long: 139.766086, dep: -27.1, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.684888, long: 139.773161, dep: -27.8, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.682061, long: 139.786035, dep: -22, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.682105, long: 139.798851, dep: -21.5, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.689071, long: 139.815651, dep: -32.6, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.696437, long: 139.813949, dep: -21.8, mag: 6, rosen_type: 'Tokyo-Metro-11' },
        { lat: 35.710702, long: 139.812935, dep: -21.6, mag: 6, rosen_type: 'Tokyo-Metro-11' },
    ],
    // 副都心線
    [
        { lat: 35.788515, long: 139.612343, dep: 1.7, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.776557, long: 139.631497, dep: -16.1, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.77053, long: 139.644543, dep: -15.2, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.757863, long: 139.653762, dep: -17.7, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.749822, long: 139.665023, dep: -17.7, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.743803, long: 139.678572, dep: -17.3, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.738418, long: 139.689157, dep: -19, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.73323, long: 139.698715, dep: -22, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.728926, long: 139.71038, dep: -25, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.72034, long: 139.715003, dep: -33.6, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.707941, long: 139.709093, dep: -33.8, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.69792, long: 139.707549, dep: -35, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.690616, long: 139.706271, dep: -15.3, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.678156, long: 139.705678, dep: -16.4, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.669071, long: 139.703995, dep: -27.7, mag: 6, rosen_type: 'Tokyo-Metro-13' },
        { lat: 35.658517, long: 139.701334, dep: -28.6, mag: 6, rosen_type: 'Tokyo-Metro-13' },
    ]
];
var dataSet2 = [
    // 中央・総武線
    [
        { lat: 35.702708, long: 139.560831, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.702811, long: 139.579804, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.703842, long: 139.599361, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.704632, long: 139.619981, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.704773, long: 139.635263, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.705385, long: 139.649867, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.706032, long: 139.665652, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.70623, long: 139.685842, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.700722, long: 139.697358, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.690921, long: 139.700258, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.683061, long: 139.702042, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.68117, long: 139.711444, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.68009, long: 139.720243, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.686014, long: 139.730667, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.691008, long: 139.735585, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.702065, long: 139.745015, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.70203, long: 139.753653, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.699855, long: 139.763786, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.698683, long: 139.774219, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.697467, long: 139.785976, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.696123, long: 139.792515, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.696437, long: 139.813949, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.697587, long: 139.826078, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.706434, long: 139.842516, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.716789, long: 139.85828, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.732962, long: 139.881682, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.729277, long: 139.907809, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.720837, long: 139.927441, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.714276, long: 139.943092, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.707452, long: 139.959097, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.701735, long: 139.985218, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.699813, long: 140.004272, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.691228, long: 140.020476, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.672795, long: 140.042241, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.659386, long: 140.057949, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.651828, long: 140.072961, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.637425, long: 140.092404, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.622581, long: 140.103279, dep: 10, mag: 6, rosen_type: 'JR-JB' },
        { lat: 35.612858, long: 140.11434, dep: 10, mag: 6, rosen_type: 'JR-JB' },
    ],
    // 中央線
    [
        { lat: 35.681382, long: 139.766084, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.69169, long: 139.770883, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.699855, long: 139.763786, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.686014, long: 139.730667, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.690921, long: 139.700258, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.706032, long: 139.665652, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.705385, long: 139.649867, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.704773, long: 139.635263, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.704632, long: 139.619981, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.703842, long: 139.599361, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.702811, long: 139.579804, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.702708, long: 139.560831, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.70228, long: 139.54489, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.701743, long: 139.524831, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.701351, long: 139.50645, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.700256, long: 139.480257, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.699769, long: 139.465714, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.699002, long: 139.446385, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.697899, long: 139.413957, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.679245, long: 139.393998, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.659502, long: 139.381495, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.655641, long: 139.338968, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.656777, long: 139.312517, dep: 5, mag: 6, rosen_type: 'JR-JC' },
        { lat: 35.642228, long: 139.281787, dep: 5, mag: 6, rosen_type: 'JR-JC' },
    ],
    // 山手線
    [
        { lat: 35.6197, long: 139.728553, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.626446, long: 139.723444, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.633998, long: 139.715828, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.64669, long: 139.710106, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.658517, long: 139.701334, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.670168, long: 139.702687, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.683061, long: 139.702042, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.690921, long: 139.700258, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.701306, long: 139.700044, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.712285, long: 139.703782, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.721204, long: 139.706587, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.728926, long: 139.71038, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.73159, long: 139.729329, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.733492, long: 139.739345, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.736489, long: 139.746875, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.738062, long: 139.76086, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.732135, long: 139.766787, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.727772, long: 139.770987, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.720495, long: 139.778837, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.713768, long: 139.777254, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.707893, long: 139.774332, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.698683, long: 139.774219, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.69169, long: 139.770883, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.681382, long: 139.766084, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.675069, long: 139.763328, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.665498, long: 139.75964, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.655646, long: 139.756749, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.645736, long: 139.747575, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.630152, long: 139.74044, dep: 5, mag: 6, rosen_type: 'JR-JY' },
        { lat: 35.6197, long: 139.728553, dep: 5, mag: 6, rosen_type: 'JR-JY' },
    ],
    // 京浜東北線
    [
        { lat: 35.906295, long: 139.623999, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.893867, long: 139.633587, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.884393, long: 139.639085, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.872156, long: 139.646196, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.858482, long: 139.657087, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.847681, long: 139.66915, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.828148, long: 139.690443, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.815725, long: 139.704364, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.801922, long: 139.717583, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.778051, long: 139.720856, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.762947, long: 139.727694, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.752474, long: 139.738139, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.746586, long: 139.746927, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.738062, long: 139.76086, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.732135, long: 139.766787, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.727772, long: 139.770987, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.720495, long: 139.778837, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.713768, long: 139.777254, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.707893, long: 139.774332, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.698683, long: 139.774219, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.69169, long: 139.770883, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.681382, long: 139.766084, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.675069, long: 139.763328, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.665498, long: 139.75964, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.655646, long: 139.756749, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.645736, long: 139.747575, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.630152, long: 139.74044, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.606249, long: 139.734855, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.588442, long: 139.727929, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.562479, long: 139.716051, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.531328, long: 139.696899, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.508565, long: 139.676018, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.487106, long: 139.65554, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.477951, long: 139.633347, dep: 5, mag: 6, rosen_type: 'JR-JK' },
        { lat: 35.466188, long: 139.622715, dep: 5, mag: 6, rosen_type: 'JR-JK' },
    ],
    // 埼京線
    [
        { lat: 35.6197, long: 139.728553, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.64669, long: 139.710106, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.658517, long: 139.701334, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.690921, long: 139.700258, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.728926, long: 139.71038, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.746044, long: 139.719523, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.760261, long: 139.722231, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.778051, long: 139.720856, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.786705, long: 139.70619, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.791234, long: 139.691391, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.808037, long: 139.678042, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.817657, long: 139.669592, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.827492, long: 139.660337, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.846114, long: 139.647966, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.853808, long: 139.637444, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.867431, long: 139.631189, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.881146, long: 139.626033, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.89082, long: 139.628663, dep: 5, mag: 6, rosen_type: 'JR-JA' },
        { lat: 35.906295, long: 139.623999, dep: 5, mag: 6, rosen_type: 'JR-JA' },
    ],
    // 京葉線
    [
        { lat: 35.681382, long: 139.766084, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.674617, long: 139.777705, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.667946, long: 139.792713, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.658714, long: 139.817357, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.646157, long: 139.827426, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.644405, long: 139.861602, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.636338, long: 139.883275, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.649451, long: 139.912386, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.666718, long: 139.923571, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.691482, long: 139.959617, dep: 5, mag: 6, rosen_type: 'JR-JE' }, // 線路カーブのため
        { lat: 35.707452, long: 139.959097, dep: 5, mag: 6, rosen_type: 'JR-JE' },
    ], [
        { lat: 35.707452, long: 139.959097, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.691482, long: 139.959617, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.681568, long: 139.996623, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.667431, long: 140.013022, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.64834, long: 140.041889, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.637027, long: 140.059185, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.629531, long: 140.073884, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.606186, long: 140.103399, dep: 5, mag: 6, rosen_type: 'JR-JE' },
        { lat: 35.581481, long: 140.131139, dep: 5, mag: 6, rosen_type: 'JR-JE' },
    ],
    // 武蔵野線
    [
        { lat: 35.666204, long: 139.477203, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.680786, long: 139.471814, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.699769, long: 139.465714, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.73081, long: 139.470512, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.777867, long: 139.493386, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.794612, long: 139.513773, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.803846, long: 139.556364, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.81545, long: 139.587186, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.844214, long: 139.62792, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        // {lat:35.906295, long:139.623999, dep:5, mag:6, rosen_type:'JR-JM'}, // 大宮？
        { lat: 35.846114, long: 139.647966, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.847681, long: 139.66915, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.864129, long: 139.704657, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.875243, long: 139.744142, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.876106, long: 139.790471, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.876353, long: 139.822177, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.876548, long: 139.843742, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.858667, long: 139.869341, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.844845, long: 139.886762, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.838276, long: 139.903505, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.825431, long: 139.921148, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.791944, long: 139.938379, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.770635, long: 139.943807, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.755021, long: 139.95141, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.730851, long: 139.966568, dep: 5, mag: 6, rosen_type: 'JR-JM' },
        { lat: 35.707452, long: 139.959097, dep: 5, mag: 6, rosen_type: 'JR-JM' },
    ]
];
var dataSet3 = [
    // 浅草線
    [
        {lat:35.710702, long:139.812935, dep:-7, mag:6, rosen_type:'TOEI-1'},
        {lat:35.70858, long:139.804624, dep:-9.6, mag:6, rosen_type:'TOEI-1'},
        {lat:35.712074, long:139.79843, dep:-16.6, mag:6, rosen_type:'TOEI-1'},
        {lat:35.703236, long:139.790931, dep:-7.5, mag:6, rosen_type:'TOEI-1'},
        {lat:35.697467, long:139.785976, dep:-11.6, mag:6, rosen_type:'TOEI-1'},
        {lat:35.692126, long:139.784821, dep:-8.6, mag:6, rosen_type:'TOEI-1'},
        {lat:35.686307, long:139.782285, dep:-15.6, mag:6, rosen_type:'TOEI-1'},
        {lat:35.682413, long:139.773919, dep:-12.9, mag:6, rosen_type:'TOEI-1'},
        {lat:35.675461, long:139.771767, dep:-13.6, mag:6, rosen_type:'TOEI-1'},
        {lat:35.669464, long:139.767253, dep:-9.4, mag:6, rosen_type:'TOEI-1'},
        {lat:35.665498, long:139.75964, dep:-13.8, mag:6, rosen_type:'TOEI-1'},
        {lat:35.656785, long:139.75466, dep:-7.9, mag:6, rosen_type:'TOEI-1'},
        {lat:35.64818, long:139.748775, dep:-12.5, mag:6, rosen_type:'TOEI-1'},
        {lat:35.638692, long:139.74002, dep:-11.4, mag:6, rosen_type:'TOEI-1'},
        {lat:35.631679, long:139.730305, dep:-18.2, mag:6, rosen_type:'TOEI-1'},
        {lat:35.626446, long:139.723444, dep:-12.1, mag:6, rosen_type:'TOEI-1'},
        {lat:35.614719, long:139.716398, dep:-11, mag:6, rosen_type:'TOEI-1'},
        {lat:35.605479, long:139.713679, dep:-11, mag:6, rosen_type:'TOEI-1'},
        {lat:35.596435, long:139.711772, dep:-12.7, mag:6, rosen_type:'TOEI-1'},
        {lat:35.586859, long:139.705942, dep:-9, mag:6, rosen_type:'TOEI-1'},
    ],
    // 三田線
    [
        {lat:35.791938, long:139.64589, dep:8.5, mag:6, rosen_type:'TOEI-6'},
        {lat:35.790294, long:139.654267, dep:7.7, mag:6, rosen_type:'TOEI-6'},
        {lat:35.788833, long:139.661172, dep:10.1, mag:6, rosen_type:'TOEI-6'},
        {lat:35.786926, long:139.673987, dep:8.7, mag:6, rosen_type:'TOEI-6'},
        {lat:35.784174, long:139.67904, dep:7.8, mag:6, rosen_type:'TOEI-6'},
        {lat:35.777464, long:139.685962, dep:7.4, mag:6, rosen_type:'TOEI-6'},
        {lat:35.775725, long:139.69538, dep:-11.5, mag:6, rosen_type:'TOEI-6'},
        {lat:35.768782, long:139.702324, dep:-10.6, mag:6, rosen_type:'TOEI-6'},
        {lat:35.761339, long:139.705535, dep:-10.4, mag:6, rosen_type:'TOEI-6'},
        {lat:35.751326, long:139.710166, dep:-10.8, mag:6, rosen_type:'TOEI-6'},
        {lat:35.748802, long:139.719604, dep:-11.5, mag:6, rosen_type:'TOEI-6'},
        {lat:35.743508, long:139.728712, dep:-13.9, mag:6, rosen_type:'TOEI-6'},
        {lat:35.733492, long:139.739345, dep:-13.4, mag:6, rosen_type:'TOEI-6'},
        {lat:35.727957, long:139.744792, dep:-13.3, mag:6, rosen_type:'TOEI-6'},
        {lat:35.72133, long:139.752078, dep:-17.9, mag:6, rosen_type:'TOEI-6'},
        {lat:35.709637, long:139.753261, dep:-13.4, mag:6, rosen_type:'TOEI-6'},
        {lat:35.70203, long:139.753653, dep:-16.7, mag:6, rosen_type:'TOEI-6'},
        {lat:35.695492, long:139.75812, dep:-16, mag:6, rosen_type:'TOEI-6'},
        {lat:35.684801, long:139.766086, dep:-12.9, mag:6, rosen_type:'TOEI-6'},
        {lat:35.675114, long:139.759765, dep:-13.3, mag:6, rosen_type:'TOEI-6'},
        {lat:35.66975, long:139.75561, dep:-21.3, mag:6, rosen_type:'TOEI-6'},
        {lat:35.661215, long:139.751535, dep:-19.1, mag:6, rosen_type:'TOEI-6'},
        {lat:35.654071, long:139.749838, dep:-20.6, mag:6, rosen_type:'TOEI-6'},
        {lat:35.64818, long:139.748775, dep:-23.9, mag:6, rosen_type:'TOEI-6'},
        {lat:35.642903, long:139.734104, dep:-29.8, mag:6, rosen_type:'TOEI-6'},
        {lat:35.637917, long:139.726133, dep:-28.3, mag:6, rosen_type:'TOEI-6'},
        {lat:35.633998, long:139.715828, dep:-19.8, mag:6, rosen_type:'TOEI-6'},
    ],
    // 新宿線
    [
        { lat:35.690921, long:139.700258, dep:-26.5, mag:6, rosen_type:'TOEI-10'},
        { lat:35.690616, long:139.706271, dep:-19.1, mag:6, rosen_type:'TOEI-10'},
        { lat:35.692402, long:139.722881, dep:-17.5, mag:6, rosen_type:'TOEI-10'},
        { lat:35.691008, long:139.735585, dep:-17.4, mag:6, rosen_type:'TOEI-10'},
        { lat:35.695589, long:139.751948, dep:-19.2, mag:6, rosen_type:'TOEI-10'},
        { lat:35.695492, long:139.75812, dep:-9.2, mag:6, rosen_type:'TOEI-10'},
        { lat:35.695434, long:139.767575, dep:-22.1, mag:6, rosen_type:'TOEI-10'},
        { lat:35.695534, long:139.775866, dep:-24.4, mag:6, rosen_type:'TOEI-10'},
        { lat:35.69212, long:139.782768, dep:-17.3, mag:6, rosen_type:'TOEI-10'},
        { lat:35.688516, long:139.788154, dep:-19.9, mag:6, rosen_type:'TOEI-10'},
        { lat:35.68796, long:139.797042, dep:-17.7, mag:6, rosen_type:'TOEI-10'},
        { lat:35.688379, long:139.806016, dep:-17.4, mag:6, rosen_type:'TOEI-10'},
        { lat:35.689071, long:139.815651, dep:-14.9, mag:6, rosen_type:'TOEI-10'},
        { lat:35.689349, long:139.826206, dep:-18.3, mag:6, rosen_type:'TOEI-10'},
        { lat:35.689905, long:139.83565, dep:-14, mag:6, rosen_type:'TOEI-10'},
        { lat:35.690347, long:139.84596, dep:10.1, mag:6, rosen_type:'TOEI-10'},
        { lat:35.683732, long:139.864333, dep:6.9, mag:6, rosen_type:'TOEI-10'},
        { lat:35.686055, long:139.882934, dep:-18.7, mag:6, rosen_type:'TOEI-10'},
        { lat:35.693318, long:139.89761, dep:-12.3, mag:6, rosen_type:'TOEI-10'},
        { lat:35.706017, long:139.903698, dep:-13.2, mag:6, rosen_type:'TOEI-10'},
        { lat:35.720837, long:139.927441, dep:-21, mag:6, rosen_type:'TOEI-10'},
    ],
    // 大江戸線
    [
        {lat:35.758526, long:139.628603, dep:-11.9, mag:6, rosen_type:'TOEI-12'},
        {lat:35.751135, long:139.641058, dep:-18.7, mag:6, rosen_type:'TOEI-12'},
        {lat:35.741964, long:139.647941, dep:-19.5, mag:6, rosen_type:'TOEI-12'},
        {lat:35.73782, long:139.653566, dep:-15.5, mag:6, rosen_type:'TOEI-12'},
        {lat:35.732538, long:139.670653, dep:-12.5, mag:6, rosen_type:'TOEI-12'},
        {lat:35.723608, long:139.683303, dep:-17, mag:6, rosen_type:'TOEI-12'},
        {lat:35.715065, long:139.687264, dep:-35.1, mag:6, rosen_type:'TOEI-12'},
        {lat:35.70623, long:139.685842, dep:-33.8, mag:6, rosen_type:'TOEI-12'},
        {lat:35.69792, long:139.68291, dep:-23.3, mag:6, rosen_type:'TOEI-12'},
        {lat:35.689798, long:139.684304, dep:-33.4, mag:6, rosen_type:'TOEI-12'},
        {lat:35.690551, long:139.69257, dep:-18.8, mag:6, rosen_type:'TOEI-12'},
        {lat:35.690921, long:139.700258, dep:-36.6, mag:6, rosen_type:'TOEI-12'},
        {lat:35.683061, long:139.702042, dep:-20.6, mag:6, rosen_type:'TOEI-12'},
        {lat:35.680059, long:139.714127, dep:-28.4, mag:6, rosen_type:'TOEI-12'},
        {lat:35.672765, long:139.724159, dep:-27, mag:6, rosen_type:'TOEI-12'},
        {lat:35.662836, long:139.731443, dep:-32.8, mag:6, rosen_type:'TOEI-12'},
        {lat:35.654682, long:139.737051, dep:-32.5, mag:6, rosen_type:'TOEI-12'},
        {lat:35.655007, long:139.743642, dep:-21, mag:6, rosen_type:'TOEI-12'},
        {lat:35.656785, long:139.75466, dep:-22.8, mag:6, rosen_type:'TOEI-12'},
        {lat:35.66279, long:139.759848, dep:-17.8, mag:6, rosen_type:'TOEI-12'},
        {lat:35.664895, long:139.766915, dep:-15.7, mag:6, rosen_type:'TOEI-12'},
        {lat:35.658507, long:139.776442, dep:-15.3, mag:6, rosen_type:'TOEI-12'},
        {lat:35.664871, long:139.784233, dep:-15, mag:6, rosen_type:'TOEI-12'},
        {lat:35.671984, long:139.795787, dep:-18.5, mag:6, rosen_type:'TOEI-12'},
        {lat:35.682105, long:139.798851, dep:-14.7, mag:6, rosen_type:'TOEI-12'},
        {lat:35.68796, long:139.797042, dep:-22.5, mag:6, rosen_type:'TOEI-12'},
        {lat:35.696123, long:139.792515, dep:-15.2, mag:6, rosen_type:'TOEI-12'},
        {lat:35.703236, long:139.790931, dep:-17.9, mag:6, rosen_type:'TOEI-12'},
        {lat:35.707055, long:139.78194, dep:-15.5, mag:6, rosen_type:'TOEI-12'},
        {lat:35.707893, long:139.774332, dep:-15.5, mag:6, rosen_type:'TOEI-12'},
        {lat:35.706671, long:139.759914, dep:-23.2, mag:6, rosen_type:'TOEI-12'},
        {lat:35.709637, long:139.753261, dep:-22.3, mag:6, rosen_type:'TOEI-12'},
        {lat:35.702065, long:139.745015, dep:-32.1, mag:6, rosen_type:'TOEI-12'},
        {lat:35.700851, long:139.735802, dep:-20.7, mag:6, rosen_type:'TOEI-12'},
        {lat:35.699518, long:139.725027, dep:-21.2, mag:6, rosen_type:'TOEI-12'},
        {lat:35.699218, long:139.718184, dep:-19.4, mag:6, rosen_type:'TOEI-12'},
        {lat:35.69792, long:139.707549, dep:-18.3, mag:6, rosen_type:'TOEI-12'},
        {lat:35.693315, long:139.699155, dep:-21.9, mag:6, rosen_type:'TOEI-12'},
        {lat:35.690551, long:139.69257, dep:-18.8, mag:6, rosen_type:'TOEI-12'},
    ]
    /*,
    // 東京さくらトラム
    [],
    // 日暮里舎人ライナー
    [],
    */
]

function getColorByMag(rosen_type) {
    var color = 0xffffff;
    if (rosen_type === 'Tokyo-Metro-2') {
        color = 0xb5b5ac;
    } else if (rosen_type === 'Tokyo-Metro-3') {
        color = 0xff9500;
    } else if (rosen_type === 'Tokyo-Metro-4') {
        color = 0xf62e36;
    } else if (rosen_type === 'Tokyo-Metro-5') {
        color = 0x009bbf;
    } else if (rosen_type === 'Tokyo-Metro-7') {
        color = 0x00ac9b;
    } else if (rosen_type === 'Tokyo-Metro-8') {
        color = 0xc1a470;
    } else if (rosen_type === 'Tokyo-Metro-9') {
        color = 0x00bb85;
    } else if (rosen_type === 'Tokyo-Metro-11') {
        color = 0x8f76d6;
    } else if (rosen_type === 'Tokyo-Metro-13') {
        color = 0x9c5e31;
    } else if (rosen_type === 'JR-JB') {
        color = 0xffd400;
    } else if (rosen_type === 'JR-JY') {
        color = 0x80c241;
    } else if (rosen_type === 'JR-JK') {
        color = 0x00b2e5;
    } else if (rosen_type === 'JR-JA') {
        color = 0x00b48d;
    } else if (rosen_type === 'JR-JE') {
        color = 0xc9242f;
    } else if (rosen_type === 'JR-JM') {
        color = 0xf15a22;
    } else if (rosen_type === 'JR-JC') {
        color = 0xf15a22;
    } else if (rosen_type === 'TOEI-1') {
        color = 0xdc435f;
    } else if (rosen_type === 'TOEI-6') {
        color = 0x0079c2;
    } else if (rosen_type === 'TOEI-10') {
        color = 0x6cbb5a;
    } else if (rosen_type === 'TOEI-12') {
        color = 0xb6007a;
    } else {
        color = 0xcccccc;
    }
    return color;
}


// heightMap より標高データを取得する
// 参考：http://danni-three.blogspot.jp/2013/09/threejs-heightmaps.html
function getHeightData(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");

    var size = img.width * img.height;
    var data = new Float32Array(size);

    context.drawImage(img, 0, 0);

    var imgd = context.getImageData(0, 0, img.width, img.height);
    var pix = imgd.data;

    var j = 0;
    for (var i = 0; i < pix.length; i += 4) {
        var k = 1.5; // 起伏の強調度
        var height = (pix[i] + pix[i + 1] + pix[i + 2]) / 3 * 1 / 16 * k;
        data[j++] = height;
    }

    return data;
}

var img = new Image();
var tubes = [];
var cubes = [];
img.onload = function () {
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, -100, 100);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // OrbitControls の準備
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.rotateUp(Math.PI * 0.38);
    controls.autoRotate = ROTATE; //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0; //自動回転する時の速度
    controls.mapTokyoMetro = true; 

    // heightMap より標高データを取得
    var data = getHeightData(img);

    // 標高データを元に地形を生成
    var scale = 4; // メッシュの細かさを調整
    var x1 = 128;
    var y1 = 128;
    var x2 = 256 / scale;
    var y2 = 256 / scale;
    var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    for (var i = 0; i < geometry.vertices.length; i++) {
        var k = Math.floor(i / x2);
        var j = 256 * k * scale + (i % y2) * scale;
        geometry.vertices[i].z = data[j];
    }

    // テクスチャを貼り付け
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(MAP),
        transparent: true,        // 半透明合成のパラメータ
        blending: THREE.NormalBlending,  // 半透明合成の方法
        opacity: 1,                    // 透明度
        wireframe: WIREFRAME
    });
    var plane = new THREE.Mesh(geometry, material);

    // 座標回転
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(plane);


    plot(scene, dataSet1, 'metro');
    plot(scene, dataSet2, 'jr');
    plot(scene, dataSet3, 'toei');

    // GUI
    gui = new dat.GUI();
    var mapSelector = gui.add(window, 'MAP', {
        "通常地図": ASSETS["map_001.jpg"],
        "空撮写真": ASSETS["map_002.jpg"]
    });
    var mapWireframe = gui.add(window, 'WIREFRAME').name('Wireframe');
    var mapOpacity = gui.add( window, 'MAPOPACITY', 0, 1, 0.1, 0.5); 
    var mapRotate = gui.add(window, 'ROTATE').name('Rotate');
    var mapTokyoMetro = gui.add(window, 'TOKYOMETRO').name('TokyoMetro');
    var mapToei = gui.add(window, 'TOEI').name('Toei Subway');
    var mapJR = gui.add(window, 'JR').name('JR');

    mapSelector.onChange(function (value) {
        plane.material.map = THREE.ImageUtils.loadTexture(value);
    });

    mapWireframe.onChange(function (value) {
        plane.material.wireframe = value;
    });
    mapOpacity.onChange(function (value) {
        material.opacity = value;
    });
    mapRotate.onChange(function (value) {
        controls.autoRotate = value;
    });

    mapTokyoMetro.onChange(function (value) {
        var uniqKey = 'metro';
        controls.mapTokyoMetro = value;
        for (var i = 0; i < cubes.length; i++) {
            var cube = cubes[i];
            if (cube.name === 'cube' + uniqKey) {
                cube.visible = value;
            }
        }
        for (var i = 0; i < tubes.length; i++) {
            var tube = tubes[i];
            if (tube.name === 'tube' + uniqKey) {
                tube.visible = value;
            }
        }
    });
    mapToei.onChange(function (value) {
        var uniqKey = 'toei';
        controls.mapTokyoMetro = value;
        for (var i = 0; i < cubes.length; i++) {
            var cube = cubes[i];
            if (cube.name === 'cube' + uniqKey) {
                cube.visible = value;
            }
        }
        for (var i = 0; i < tubes.length; i++) {
            var tube = tubes[i];
            if (tube.name === 'tube' + uniqKey) {
                tube.visible = value;
            }
        }
    });
    mapJR.onChange(function (value) {
        var uniqKey = 'jr';
        controls.mapTokyoMetro = value;
        for (var i = 0; i < cubes.length; i++) {
            var cube = cubes[i];
            if (cube.name === 'cube' + uniqKey) {
                cube.visible = value;
            }
        }
        for (var i = 0; i < tubes.length; i++) {
            var tube = tubes[i];
            if (tube.name === 'tube' + uniqKey) {
                tube.visible = value;
            }
        }
    });

    document.getElementById("webgl").appendChild(renderer.domElement);
    animate();

    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }, false);
};

img.src = ASSETS["heightmap.png"]; // heightMap.png

function plot(scene, dataSet1, uniqKey) {
    for (var ii = 0; ii < dataSet1.length; ii++) {
        var dataSet = dataSet1[ii];
        var lines = [];
        var rosen_type = '';
        for (var i = 0; i < dataSet.length; i++) {
            var data = dataSet[i];
            // 表示範囲
            // TODO 通常地図を使って位置合わせ
            var offset = 375;
            var x = ((data.long - 139.5) / 2.788) * offset;
            //var z = (-(data.lat - 35.666) / 2.34) * offset;
            var z = (-(data.lat - 35.666) / 2.0) * offset;
            var o = 20; // ラインの高低差の強度
            var y = (data.dep / o);
            var w = (data.mag) / 20;
            var color = getColorByMag(data.rosen_type);
            var geometry = new THREE.BoxGeometry(w, w, w);
            var material = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,        // 半透明合成のパラメータ
                blending: THREE.NormalBlending,  // 半透明合成の方法
                opacity: 0.5,                    // 透明度
            });
            var cube = new THREE.Mesh(geometry, material);
            rosen_type = data.rosen_type;
            lines.push(new THREE.Vector3(x, y, z));
            cube.position.set(x, y, z);
            cube.name = "cube" + uniqKey;
            scene.add(cube);
            cubes.push(cube);

        }

        var path = new THREE.SplineCurve3(lines);
        var tubeGeo = new THREE.TubeGeometry(path, 32, 0.1, 8, false);
        // pathに沿って32点で、太さ9・断面円の分割数8(つまり正8角形)の、開いた管を作る。デバッグ用オブジェクト作る。
        var tube = new THREE.Mesh(
            tubeGeo,
            new THREE.MeshLambertMaterial({ color: getColorByMag(data.rosen_type) })
        );
        tube.name = "tube" + uniqKey;
        scene.add(tube);
        tubes.push(tube);
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    var dt = clock.getDelta();
    renderer.render(scene, camera);
}
