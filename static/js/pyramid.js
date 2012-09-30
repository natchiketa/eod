if (!Detector.webgl) Detector.addGetWebGLMessage();

var DEFAULT_CAMERA_Y = 400,
    DEFAULT_CAMERA_SCROLL_SCALE = 50;

var container, stats;

var camera, controls, scene, renderer;

//constructs and empty object and attach controls to it
var dummy = new THREE.Object3D();

var bgPlane, headerPlane, pyramid;

var camval = 0.5;

function init() {

    container = document.getElementById('container');

    renderer = new THREE.CanvasRenderer({ antialias:true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(0, DEFAULT_CAMERA_Y + normalizedScrollTop(), 1000);
    camera.lookAt(scene.position)
    scene.add(camera);

    var light, headerPlaneMaterials, pyramidMaterials;

    scene.add(new THREE.AmbientLight(0x404040));

    light = new THREE.AmbientLight(0xffffff);
    light.position.set(0, 300, 0);
    scene.add(light);

    headerPlaneMaterials = [
        new THREE.MeshBasicMaterial({ color:0x404040, wireframe:false, transparent:true, opacity:0.7, side:THREE.DoubleSide })
    ];

    pyramidMaterials = [
        new THREE.MeshBasicMaterial({ color:0xff0000, wireframe:false, transparent:false, opacity:1.0 }),
        new THREE.MeshBasicMaterial({ color:0x0000ff, wireframe:false, transparent:false, opacity:0.7 }),
        new THREE.MeshBasicMaterial({ color:0xffff00, wireframe:false, transparent:false, opacity:0.7 }),
        new THREE.MeshBasicMaterial({ color:0x0000ff, wireframe:false, transparent:false, opacity:1.0 })
    ];

    headerPlane = THREE.SceneUtils.createMultiMaterialObject(new THREE.PlaneGeometry(5000, 200, 6, 2), headerPlaneMaterials);
    headerPlane.position.set(0, 200, 0);
    headerPlane.dynamic = true;
    headerPlane.rotation.x = 90 * Math.PI / 180;
    scene.add(headerPlane);

    var pg = new THREE.Geometry();
    pg.vertices = [
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(-0.86603, 0, -0.5),
        new THREE.Vector3(0.86603, 0, -0.5),
        new THREE.Vector3(0, 0.86603, 0)
    ];
    pg.faces = [
        new THREE.Face3(0, 1, 3),
        new THREE.Face3(1, 2, 3),
        new THREE.Face3(2, 0, 3),
        new THREE.Face3(0, 1, 2)
    ];
    pg.materials = pyramidMaterials;

    pyramid = new THREE.Mesh(pg, THREE.MeshFaceMaterial());
    pyramid.position.set(250, 225, 0);
    pyramid.dynamic = true;
    pyramid.rotation.x = 0 * Math.PI / 180;
    pyramid.scale.x = pyramid.scale.y = pyramid.scale.z = 100;
    scene.add(pyramid);

    // Render stats
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    $('#bgBlock').css('top', -100 + normalizedScrollTop() * 0.01);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('scroll', onWindowScroll, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function normalizedScrollTop(scale) {
    scale = (typeof scale == 'undefined') ? DEFAULT_CAMERA_SCROLL_SCALE : scale;
    var docSt = $(document).scrollTop(), docHt = $(document).height();
    var norm = Math.sqrt(docHt * docHt - docSt * docSt);
    return (scale * (docHt - docSt) / norm);
}

function onWindowScroll() {

    camera.position.y = DEFAULT_CAMERA_Y + normalizedScrollTop();
    $('#bgBlock').css('top', -100 + normalizedScrollTop());

}


function animate() {

    requestAnimationFrame(animate);

//    controls.update(1);
    render();

    if (stats) stats.update();

}

function render() {

    pyramid.rotation.y = Math.sin(Date.now() * 0.002) * 0.5;

    renderer.render(scene, camera);

}