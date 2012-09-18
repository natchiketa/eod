if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var camera, scene, renderer;

init();
animate();

var pyramid;

var camval = 0.5;

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.y = 400;

    scene = new THREE.Scene();

    var light, materials;

    scene.add( new THREE.AmbientLight( 0x404040 ) );

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 0 );
    scene.add( light );

    materials = [
        new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true, opacity: 1.0, side: THREE.DoubleSide } ),
        new THREE.MeshBasicMaterial({ color:0xffffff, wireframe:false, transparent:true, opacity:0.7, side:THREE.DoubleSide })
    ];

    pyramid = THREE.SceneUtils.createMultiMaterialObject( new THREE.TetrahedronGeometry( 75, 0 ), materials );
    pyramid.position.set( 0, 0, 0 );
    scene.add( pyramid );

    var points = [];

    for ( var i = 0; i < 50; i ++ ) {

        points.push( new THREE.Vector3( Math.sin( i * 0.2 ) * 15 + 50, 0, ( i - 5 ) * 2 ) );

    }

    renderer = new THREE.CanvasRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( renderer.domElement );

    // Render stats
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );

    render();

    if (stats) stats.update();

}

function render() {

    camera.position.x = Math.cos( camval ) ;
    camera.position.y = Math.sin( camval );

    camera.lookAt( pyramid.position );

/*    for ( var i = 0, l = scene.children.length; i < l; i ++ ) {

        var object = scene.children[ i ];

        object.rotation.x = timer * 5;
        object.rotation.y = timer * 2.5;

    }*/

    renderer.render( scene, camera );

}