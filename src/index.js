import {
  Scene,
  Geometry,
  Vector3,
  OrthographicCamera,
  Line,
  LineBasicMaterial,
  Color,
  WebGLRenderer
} from "three";

("use strict");

let t = 0.0;

let scene, camera, renderer;
let geometry;
let multiplier;

let edges = [];
let vertexCoords = [];
let vertexCoords2 = [];
let vertexJoins = [];

const path = (p1, p2, p3, p4, i) => {
  let vec = new Vector3(0, 0, 0);

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

const setSize = () => {
  if (window.innerWidth > 600) {
    multiplier = 5;
  } else {
    multiplier = 3;
  }

  camera = new OrthographicCamera(
    (window.innerWidth / multiplier) * -1,
    window.innerWidth / multiplier,
    window.innerHeight / multiplier,
    (window.innerHeight / multiplier) * -1,
    1,
    1000
  );
  camera.position.set(200, -100, -300);
  camera.lookAt(new Vector3(0, 0, 0));

  renderer.setSize(window.innerWidth, window.innerHeight);
};

const init = () => {
  vertexCoords[0] = new Vector3(-50, -50, -50);
  vertexCoords[1] = new Vector3(50, -50, -50);
  vertexCoords[2] = new Vector3(50, 50, -50);
  vertexCoords[3] = new Vector3(-50, 50, -50);
  vertexCoords[4] = new Vector3(-50, -50, 50);
  vertexCoords[5] = new Vector3(50, -50, 50);
  vertexCoords[6] = new Vector3(50, 50, 50);
  vertexCoords[7] = new Vector3(-50, 50, 50);
  vertexCoords[8] = new Vector3(-100, -100, -100);
  vertexCoords[9] = new Vector3(100, -100, -100);
  vertexCoords[10] = new Vector3(100, 100, -100);
  vertexCoords[11] = new Vector3(-100, 100, -100);
  vertexCoords[12] = new Vector3(-100, -100, 100);
  vertexCoords[13] = new Vector3(100, -100, 100);
  vertexCoords[14] = new Vector3(100, 100, 100);
  vertexCoords[15] = new Vector3(-100, 100, 100);

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

  scene = new Scene();
  renderer = new WebGLRenderer({ alpha: true, antialias: true });

  setSize();

  document.getElementById("hypercube").appendChild(renderer.domElement);

  vertexJoins.forEach((vertexJoin, i) => {
    geometry = new Geometry();
    geometry.vertices.push(vertexCoords[vertexJoin[0]]);
    geometry.vertices.push(vertexCoords[vertexJoin[1]]);
    let line = new Line(
      geometry,
      new LineBasicMaterial({
        color: new Color(0xffffff),
        linewidth: 4
      })
    );
    scene.add(line);
    edges[i] = line;
  });
};

const render = () => {
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

  requestAnimationFrame(render);

  edges.forEach((edge, i) => {
    edge.geometry.vertices[0] = vertexCoords2[vertexJoins[i][0]];
    edge.geometry.vertices[1] = vertexCoords2[vertexJoins[i][1]];
    edge.rotation.x = 0;
    edge.rotation.y = 0;
    edge.rotation.z = 0;
    edge.geometry.verticesNeedUpdate = true;
  });

  renderer.render(scene, camera);
};

window.addEventListener(
  "load",
  () => {
    init();
    render();
  },
  false
);

window.addEventListener("resize", setSize);
