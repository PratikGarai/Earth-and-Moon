import "./style.css";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


// ============== SETUP

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
camera.position.set(0, 0, 100);

const controls = new OrbitControls(camera, renderer.domElement);
const spaceTexture = new THREE.TextureLoader().load("../images/space.png");
scene.background = spaceTexture;


const pointLight = new THREE.PointLight(
    "white",
    1,
    100
);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(
    "white",
    1
);
scene.add(ambientLight);


// ============== MAIN STUFF

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(30, 64, 64), 
    new THREE.MeshStandardMaterial({
        map : new THREE.TextureLoader().load('../images/earth-spherical.jpg'),
        normalMap : new THREE.TextureLoader().load('../images/earth-normal.jpg'),
    })
);
earth.position.set(0,0,0);
earth.rotateOnAxis(
    new THREE.Vector3(0, 0, 1), 
    0.16
)
scene.add(earth);

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32), 
    new THREE.MeshStandardMaterial({
        map : new THREE.TextureLoader().load('../images/moon-spherical.jpg'),
        normalMap : new THREE.TextureLoader().load('../images/moon-normal.jpg'),
    })
);
moon.position.set(0,0,70);
earth.add(moon);



// ============== STARS

const addStar = () => {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({
        color : 0xffffff
    });
    const star = new THREE.Mesh(geometry, material);

    const arr = [];
    for(let i=0;i<3;i++)
        arr.push(THREE.MathUtils.randFloatSpread(400));
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
    renderer.render(scene, camera);
    controls.update();
    moon.rotateY(0);
    earth.rotateY(0.01);
}

animate();