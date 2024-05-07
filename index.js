import * as THREE from "three";
import { FontLoader, TextGeometry } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight; 
const renderer  = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild( renderer.domElement );

const fov = 100;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 7;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement)
controls.minPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI/2;

var fontLoader = new FontLoader();

        fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
      
            var textGeometry = new TextGeometry("Happy Mothers Day", {
                font: font,
                size:1.2,
                height: .5,
                depth: 0,
            });

           const textMaterial = new THREE.MeshNormalMaterial();
           const textMesh = new THREE.Mesh(textGeometry, textMaterial)
          textMesh.position.x = -5;

            scene.add(textMesh)
        });

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();