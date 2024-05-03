import * as THREE from 'three'
import "./style.css"
import gsap from 'gsap'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const loader = new GLTFLoader();
loader.load( 'assets/need_some_space.glb', 
function ( gltf ) {
    const model = gltf.scene
	scene.add( model );
    model.position.set(-700, -700, 700)
    model.scale.set(500, 500, 500  )
})

//Making Scene
const scene = new THREE.Scene();

//Creating Shape
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color: "green",
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)




//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Adding Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 15
scene.add(camera)

//Adding Lights
const light = new THREE.PointLight(0xffffff, 77, 100)
light.position.set(7, 10, 10)
scene.add(light)




//Adding Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //update camera
    camera.updateProjectionMatrix()
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height)
})


//Controls yippie
const controls = new OrbitControls (camera, canvas)
controls.enableDamping = true   
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 1



const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)

}

loop()

window.addEventListener('load', function() {
    // Add a delay of 1000 milliseconds (1 second) before hiding the loading screen
    setTimeout(function() {
      // Hide the loading screen after the delay
      document.getElementById('loading-screen').style.display = 'none';
      // Show the background (assuming it has the ID 'bg')
      document.getElementById('bg').style.display = 'block';
    }, 1000); // Adjust the delay time as needed
  });

const tl = gsap.timeline({ defaults: {duration: 1 } })
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0}, { z: 1, x: 1, y: 1})
tl.fromTo("nav", { y: "-100%" }, { y: "0%" })
tl.fromTo(".title", { opacity: 0 }, {opacity: 1})