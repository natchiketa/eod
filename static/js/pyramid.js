if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats;

var camera, controls, scene, renderer;

//constructs and empty object and attach controls to it
var dummy = new THREE.Object3D();

var headerPlane, pyramid;

var camval = 0.5;

function init() {

    container = document.getElementById('container');

    renderer = new THREE.CanvasRenderer({ antialias:true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(0, 100, 2000);
    scene.add(camera);

/*
    controls = new THREE.FlyControls(camera, container);
    controls.movementSpeed = 10;
    controls.rollSpeed = 0.005;
    controls.autoForward = false;
    controls.dragToLook = true;
*/

    var light, headerPlaneMaterials, pyramidMaterials;

    scene.add(new THREE.AmbientLight(0x404040));

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 0);
    scene.add(light);

    headerPlaneMaterials = [
        new THREE.MeshBasicMaterial({ color:0x404040, wireframe:false, transparent:true, opacity:0.7, side:THREE.DoubleSide })
    ];

    pyramidMaterials = [
        new THREE.MeshBasicMaterial({ color:0xffffff, wireframe:false, transparent:true, opacity:0.8, side:THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color:0x000000, wireframe:true, transparent:true, opacity:1.0, side:THREE.DoubleSide })
    ];

    headerPlane = THREE.SceneUtils.createMultiMaterialObject(new THREE.PlaneGeometry(5000, 300, 6, 2), headerPlaneMaterials);
    headerPlane.position.set(0, 300, 0);
    headerPlane.dynamic = true;
    headerPlane.rotation.x =90;
    scene.add(headerPlane);

//    camera.lookAt( headerPlane.position );

    /*
     pyramid = THREE.SceneUtils.createMultiMaterialObject( new THREE.PyramidGeometry( 75, 1 ), pyramidMaterials );
     pyramid.position.set( 0, 0, 0 );
     scene.add( pyramid );
     */


    // Render stats
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('scroll', onWindowScroll, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onWindowScroll() {

    camera.position.y = 100 - $(document).scrollTop();

}


function animate() {

    requestAnimationFrame(animate);

    controls.update(1);
    render();

    if (stats) stats.update();

}

function render() {

    /*    camera.position.x = Math.cos( camval ) ;
     camera.position.y = Math.sin( camval );*/


    /*    for ( var i = 0, l = scene.children.length; i < l; i ++ ) {

     var object = scene.children[ i ];

     object.rotation.x = timer * 5;
     object.rotation.y = timer * 2.5;

     }*/

    renderer.render(scene, camera);

}