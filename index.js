import * as THREE from "three";
import { FontLoader, TextGeometry } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';


let w = window.innerWidth;
let  h = window.innerHeight;
const renderer  = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h)
renderer.setClearColor(new THREE.Color('#5FE7E7'));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement)


const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement)
controls.minPolarAngle = Math.PI/2.85;
controls.maxPolarAngle = Math.PI/1.85;
controls.minDistance = 2;
controls.maxDistance = 10.5;
controls.enableDamping = true;
controls.enablePan = false;
let textMaterial;
let textMesh;


const geometry = new THREE.PlaneGeometry( 7, 4  );
const material = new THREE.MeshStandardMaterial( {color:'lightgreen', side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.rotation.x = Math.PI / 2;
plane.position.y = -.5
plane.receiveShadow = true;
scene.add( plane );


let ambiantlight = new THREE.AmbientLight('#ffffff',1)
scene.add(ambiantlight)


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 0);
light.castShadow = true; 
scene.add(light);


var fontLoader = new FontLoader();


        fontLoader.load('Ubuntu_Regular.json', function(font) {
     
            var textGeometry = new TextGeometry( 'Happy ' + 'Mothers ' + ' Day', {
                font: font,
                size:.5,
                height: .3,
                depth: 0,
               
            });
            textMaterial = new THREE.MeshStandardMaterial({color:'#FF0362'})
            textMesh = new THREE.Mesh(textGeometry, textMaterial)
            textMesh.position.set(-3, 0, 0);    
              textMesh.receiveShadow = true;
              textMesh.castShadow = true;
           
            scene.add(textMesh)
var boundingBox = new THREE.Box3().setFromObject(textMesh);
var center = boundingBox.getCenter(new THREE.Vector3());
 let size = boundingBox.getSize(new THREE.Vector3());
let  maxDim = Math.max(size.x, size.y, size.z);
let  fov1 = camera.fov * (Math.PI / 180);
let  distance = Math.abs(maxDim / Math.sin(fov1 / 2));
camera.position.copy(center);
camera.position.z = -4;
 distance += Math.abs(2.5/ Math.sin(fov1 / 2));
camera.position.z += distance;


controls.update();


        });


        function onWindowResize() {
            w = window.innerWidth;
            h = window.innerHeight;
       
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
       
           
    renderer.setSize(w, h);



    scene.remove(textMesh);
   

    scene.remove(plane);
    createPlane();
        }
       
        window.addEventListener('resize', onWindowResize);


function animate() {
    requestAnimationFrame( animate );
controls.update()
    renderer.render( scene, camera );
    light.position.copy(camera.position);

    light.position.copy(camera.position);

  light.position.y = 10;
    console.log(camera.position.z)
}


animate();