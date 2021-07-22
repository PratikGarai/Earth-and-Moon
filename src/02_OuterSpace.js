import "./style.css";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({
    canvas : document.querySelector("#bg")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const controls = new OrbitControls(camera, renderer.domElement);
const spaceTexture = new THREE.TextureLoader().load("../images/space.png");
scene.background = spaceTexture;


// Custom code begins here

const geometry = new THREE.TorusGeometry(8, 3, 30, 30);
const material = new THREE.MeshStandardMaterial({
    color : "red",
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(
    "white",
    10,
    100
);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(
    "white",
    1
);
scene.add(ambientLight);

const lighthelper = new THREE.PointLightHelper(pointLight);
scene.add(lighthelper);
const gridhelper = new THREE.GridHelper(200, 50);
scene.add(gridhelper);

const addStar = () => {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({
        color : 0xffffff
    });
    const star = new THREE.Mesh(geometry, material);

    const arr = [];
    for(let i=0;i<3;i++)
        arr.push(THREE.MathUtils.randFloatSpread(100));
    const [x,y,z] = arr;
    star.position.set(x,y,z);
    scene.add(star);
}

for(let i=0;i<200;i++)
{
    addStar();    
}


// Animate fuction

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    renderer.render(scene, camera);
    controls.update();
}

animate();