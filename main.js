import * as THREE from 'three'
import "./style.css"
import gsap from 'gsap'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//Making Scene
const scene = new THREE.Scene();

//Creating Shape
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
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
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 10

const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}

loop()

const tl = gasp.timeline({defaults: {duration: 1} })
 tl.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1})