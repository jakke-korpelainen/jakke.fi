import * as THREE from "three";

("use strict");

let t = 0.0;

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2(
  window.innerWidth / 2,
  window.innerHeight / 2
);

let scene;
let camera;
let renderer;
let geometry;
let group;

let edges = [];
let vertexCoords = [];
let vertexCoords2 = [];
let vertexJoins = [];

const onResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  windowHalf.set(width / 2, height / 2);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const onMouseMove = event => {
  const x = event.clientX - windowHalf.x;
  const y = event.clientY * 1.2 - windowHalf.x;

  if (y > 200) {
    mouse.y = 200;
  } else if (y < -200) {
    mouse.y = -200;
  } else {
    mouse.y = y;
  }

  if (x > 200) {
    mouse.x = 200;
  } else if (x < -200) {
    mouse.x = -200;
  } else {
    mouse.x = x;
  }
};

const onMouseWheel = event => {
  camera.position.z += event.deltaY * 0.1; // move camera along z-axis
};

const path = (p1, p2, p3, p4, i) => {
  let vec = new THREE.Vector3(0, 0, 0);

  if (i >= 0 && i < 0.25) {
    vec.x = p4.x + (p1.x - p4.x) * i * 4;
    vec.y = p4.y + (p1.y - p4.y) * i * 4;
    vec.z = p4.z + (p1.z - p4.z) * i * 4;
  } else if (i >= 0.25 && i < 0.5) {
    vec.x = p1.x + (p2.x - p1.x) * (i - 0.25) * 4;
    vec.y = p1.y + (p2.y - p1.y) * (i - 0.25) * 4;
    vec.z = p1.z + (p2.z - p1.z) * (i - 0.25) * 4;
  } else if (i >= 0.5 && i < 0.75) {
    vec.x = p2.x + (p3.x - p2.x) * (i - 0.5) * 4;
    vec.y = p2.y + (p3.y - p2.y) * (i - 0.5) * 4;
    vec.z = p2.z + (p3.z - p2.z) * (i - 0.5) * 4;
  } else if (i >= 0.75 && i < 1.0) {
    vec.x = p3.x + (p4.x - p3.x) * (i - 0.75) * 4;
    vec.y = p3.y + (p4.y - p3.y) * (i - 0.75) * 4;
    vec.z = p3.z + (p4.z - p3.z) * (i - 0.75) * 4;
  }

  return vec;
};

const init = () => {
  vertexCoords[0] = new THREE.Vector3(-50, -50, -50);
  vertexCoords[1] = new THREE.Vector3(50, -50, -50);
  vertexCoords[2] = new THREE.Vector3(50, 50, -50);
  vertexCoords[3] = new THREE.Vector3(-50, 50, -50);
  vertexCoords[4] = new THREE.Vector3(-50, -50, 50);
  vertexCoords[5] = new THREE.Vector3(50, -50, 50);
  vertexCoords[6] = new THREE.Vector3(50, 50, 50);
  vertexCoords[7] = new THREE.Vector3(-50, 50, 50);
  vertexCoords[8] = new THREE.Vector3(-100, -100, -100);
  vertexCoords[9] = new THREE.Vector3(100, -100, -100);
  vertexCoords[10] = new THREE.Vector3(100, 100, -100);
  vertexCoords[11] = new THREE.Vector3(-100, 100, -100);
  vertexCoords[12] = new THREE.Vector3(-100, -100, 100);
  vertexCoords[13] = new THREE.Vector3(100, -100, 100);
  vertexCoords[14] = new THREE.Vector3(100, 100, 100);
  vertexCoords[15] = new THREE.Vector3(-100, 100, 100);

  vertexJoins = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],

    [0, 8],
    [1, 9],
    [2, 10],
    [3, 11],
    [4, 12],
    [5, 13],
    [6, 14],
    [7, 15],

    [8, 9],
    [9, 10],
    [10, 11],
    [11, 8],
    [8, 12],
    [9, 13],
    [10, 14],
    [11, 15],
    [12, 13],
    [13, 14],
    [14, 15],
    [15, 12]
  ];

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x232323);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // camera

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.y = 0;
  camera.position.x = 0;
  camera.position.z = 250;
  camera.aspect = window.innerWidth / window.innerHeight;

  group = new THREE.Group();

  vertexJoins.forEach((vertexJoin, i) => {
    geometry = new THREE.Geometry();
    geometry.vertices.push(vertexCoords[vertexJoin[0]]);
    geometry.vertices.push(vertexCoords[vertexJoin[1]]);

    let line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        color: new THREE.Color(0xf91f78),
        linewidth: 1
      })
    );

    group.add(line);
    edges[i] = line;
  });

  scene.add(group);
  document.getElementById("hypercube").appendChild(renderer.domElement);

  window.addEventListener("resize", onResize, false);
  window.addEventListener("mousemove", onMouseMove, false);
  window.addEventListener("wheel", onMouseWheel, false);
};

const animate = () => {
  t = (t + 0.002) % 1;

  vertexCoords2[0] = path(
    vertexCoords[8],
    vertexCoords[9],
    vertexCoords[1],
    vertexCoords[0],
    t
  );
  vertexCoords2[1] = path(
    vertexCoords[0],
    vertexCoords[8],
    vertexCoords[9],
    vertexCoords[1],
    t
  );
  vertexCoords2[9] = path(
    vertexCoords[1],
    vertexCoords[0],
    vertexCoords[8],
    vertexCoords[9],
    t
  );
  vertexCoords2[8] = path(
    vertexCoords[9],
    vertexCoords[1],
    vertexCoords[0],
    vertexCoords[8],
    t
  );

  vertexCoords2[3] = path(
    vertexCoords[11],
    vertexCoords[10],
    vertexCoords[2],
    vertexCoords[3],
    t
  );
  vertexCoords2[2] = path(
    vertexCoords[3],
    vertexCoords[11],
    vertexCoords[10],
    vertexCoords[2],
    t
  );
  vertexCoords2[10] = path(
    vertexCoords[2],
    vertexCoords[3],
    vertexCoords[11],
    vertexCoords[10],
    t
  );
  vertexCoords2[11] = path(
    vertexCoords[10],
    vertexCoords[2],
    vertexCoords[3],
    vertexCoords[11],
    t
  );

  vertexCoords2[4] = path(
    vertexCoords[12],
    vertexCoords[13],
    vertexCoords[5],
    vertexCoords[4],
    t
  );
  vertexCoords2[5] = path(
    vertexCoords[4],
    vertexCoords[12],
    vertexCoords[13],
    vertexCoords[5],
    t
  );
  vertexCoords2[13] = path(
    vertexCoords[5],
    vertexCoords[4],
    vertexCoords[12],
    vertexCoords[13],
    t
  );
  vertexCoords2[12] = path(
    vertexCoords[13],
    vertexCoords[5],
    vertexCoords[4],
    vertexCoords[12],
    t
  );

  vertexCoords2[7] = path(
    vertexCoords[15],
    vertexCoords[14],
    vertexCoords[6],
    vertexCoords[7],
    t
  );
  vertexCoords2[6] = path(
    vertexCoords[7],
    vertexCoords[15],
    vertexCoords[14],
    vertexCoords[6],
    t
  );
  vertexCoords2[14] = path(
    vertexCoords[6],
    vertexCoords[7],
    vertexCoords[15],
    vertexCoords[14],
    t
  );
  vertexCoords2[15] = path(
    vertexCoords[14],
    vertexCoords[6],
    vertexCoords[7],
    vertexCoords[15],
    t
  );

  requestAnimationFrame(animate);

  edges.forEach((edge, i) => {
    edge.geometry.vertices[0] = vertexCoords2[vertexJoins[i][0]];
    edge.geometry.vertices[1] = vertexCoords2[vertexJoins[i][1]];
    edge.rotation.x = 0;
    edge.rotation.y = 0;
    edge.rotation.z = 0;
    edge.geometry.verticesNeedUpdate = true;
  });

  target.x = (1 - mouse.x) * 0.002;
  target.y = (1 - mouse.y) * 0.002;

  camera.rotation.x += 0.05 * (target.y - camera.rotation.x);
  camera.rotation.y += 0.05 * (target.x - camera.rotation.y);

  renderer.render(scene, camera);
};

window.addEventListener(
  "load",
  () => {
    init();
    animate();
  },
  false
);
