import "./style.css"



const space = new GLTFLoader();
space.load( 'koolsite/assets/need_some_space.glb', 
function ( gltf ) {
	scene.add( gltf.scene );
})