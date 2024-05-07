import * as THREE from "three";
import { FontLoader, TextGeometry } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight; 
const renderer  = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild( renderer.domElement );

const fov = 70;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const scene = new THREE.Scene();
camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement)
controls.minPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI/2;
controls.enableDamping = true;
let textMaterial;
let textMesh;

var fontLoader = new FontLoader();

        fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
      
            var textGeometry = new TextGeometry( 'Happy ' + 'Mothers ' + '\nDay', {
                font: font,
                size:.5,
                height: .4,
                depth: 0,
            });

            textMaterial = new THREE.MeshNormalMaterial();
            textMesh = new THREE.Mesh(textGeometry, textMaterial)
            textMesh.position.set(-4, 0, 0);

            scene.add(textMesh)
           
            // Calculate the bounding box of the text mesh
var boundingBox = new THREE.Box3().setFromObject(textMesh);
var center = boundingBox.getCenter(new THREE.Vector3());

// Calculate the distance from the camera to the object based on the bounding box size
 let size = boundingBox.getSize(new THREE.Vector3());
let  maxDim = Math.max(size.x, size.y, size.z);
let  fov1 = camera.fov * (Math.PI / 180);
let  distance = Math.abs(maxDim / Math.sin(fov1 / 2));

// Set the camera position and target
camera.position.copy(center);
camera.position.z += distance;

controls.target.copy(center);
controls.update();
        });

function animate() {
	requestAnimationFrame( animate );
controls.update()
	renderer.render( scene, camera );
    console.log(camera.position.z)
}

animate();