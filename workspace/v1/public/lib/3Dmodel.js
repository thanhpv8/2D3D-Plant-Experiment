
function onResize(element, callback) {
var height = element.clientHeight;
var width  = element.clientWidth;

return setInterval(function() {
    if (element.clientHeight != height || element.clientWidth != width) {
      height = element.clientHeight;
      width  = element.clientWidth;
      callback();
    }
  }, 500);
}

var onProgress = function ( xhr ) {
if ( xhr.lengthComputable ) {
  var percentComplete = xhr.loaded / xhr.total * 100;
  var roundedPercent=Math.round(percentComplete);
  console.log( Math.round(roundedPercent, 2) + '% downloaded' );
	 var elem = document.getElementById("myBar"); 
	 elem.style.width = Math.round(roundedPercent,2) + '%'; 
   elem.innerHTML = Math.round(roundedPercent,2)   + '%';
   if(percentComplete==100){
      $('.preloader').fadeOut(1000);
    }
}
};

var onError = function ( xhr ) { };

var canvas, renderer, scene;
var ambient, directionalLight;
var mtlLoader, objLoader;
var controls, stats, render, camera;
function init(){
  canvas = document.getElementById('canvas');
  renderer = new THREE.WebGLRenderer({canvas: canvas});
  canvas.width  = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);

  scene = new THREE.Scene();

  ambient = new THREE.AmbientLight( 0x444444,5 );
  scene.add( ambient );

  THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
  mtlLoader = new THREE.MTLLoader();
  mtlLoader.crossOrigin = '';
  mtlLoader.setPath( ' https://s3.us-west-1.amazonaws.com/plantexperiments/plants/3D/3CR/' );
  mtlLoader.load( '3C_withRuller-1.mtl', function( materials ) {
    materials.preload();
    // materials.magFilter = THREE.NearestFilter;
		// materials.minFilter = THREE.NearestMipMapLinearFilter;
		// materials.anisotropy = renderer.getMaxAnisotropy();
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( 'https://s3.us-west-1.amazonaws.com/plantexperiments/plants/3D/3CR/' );
    objLoader.load( '3C_withRuller-1.obj', function ( object ) {
      object.position.y = 0;
      scene.add( object );
    }, onProgress, onError );
  });

  camera = new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight, 0.1, 1000);
  camera.position.set(100,0,0);
  camera.up = new THREE.Vector3(0,0,1);
  camera.lookAt(new THREE.Vector3(0,0,0));

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableZoom = true;
  
  window.addEventListener( 'resize', onWindowResize, false );
}
     
function onWindowResize() {
camera.aspect = window.innerWidth/ window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize( window.innerWidth, window.innerHeight );
}

function render(){
requestAnimationFrame( render );   
renderer.render(scene, camera);
};
function webglstart(){
init();
render();
}
