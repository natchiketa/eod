if (!Detector.webgl) Detector.addGetWebGLMessage();

var DEFAULT_CAMERA_Y = 100,
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

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(0, normalizedScrollTop(), 500);
    scene.add(camera);

    var light, headerPlaneMaterials, pyramidMaterials;


    scene.add(new THREE.AmbientLight(0x404040));

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 0);
    scene.add(light);

    headerPlaneMaterials = [
        new THREE.MeshBasicMaterial({ color:0x404040, wireframe:false, transparent:true, opacity:0.7, side:THREE.DoubleSide })
    ];

    pyramidMaterials = [
        new THREE.MeshBasicMaterial({ color:0xffffff, wireframe:false, transparent:true, opacity:0.5, side:THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color:0x000000, wireframe:true, transparent:true, opacity:1.0, side:THREE.DoubleSide })
    ];

    var bgTexture = new THREE.MeshBasicMaterial({
        map:THREE.ImageUtils.loadTexture('/static/images/fol_bg.png128x128.jpg')
    });
    bgTexture.map.wrapS = bgTexture.map.wrapT = THREE.RepeatWrapping;
    bgTexture.map.repeat.set(128, 128);
    bgTexture.map.needsUpdate = true;

    // background
    bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), bgTexture);
    bgPlane.overdraw = true;
    bgPlane.position.set(0, 300, -100);

    scene.add(bgPlane);

    headerPlane = THREE.SceneUtils.createMultiMaterialObject(new THREE.PlaneGeometry(5000, 200, 6, 2), headerPlaneMaterials);
    headerPlane.position.set(0, 300, 0);
    headerPlane.dynamic = true;
    headerPlane.rotation.x = 90;
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

    pyramid = THREE.SceneUtils.createMultiMaterialObject(pg, pyramidMaterials);
    pyramid.position.set(300, 340, 0);
    pyramid.dynamic = true;
    pyramid.rotation.x = 300;
    pyramid.scale.x = pyramid.scale.y = pyramid.scale.z = 70
    scene.add(pyramid);

    // init pyramid controls
    /*    controls = new THREE.FlyControls(pyramid, container);
     controls.movementSpeed = 0;
     controls.rollSpeed = 0.001;
     controls.autoForward = false;
     controls.dragToLook = true;*/

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

function normalizedScrollTop(scale) {
    scale = (typeof scale == 'undefined') ? DEFAULT_CAMERA_SCROLL_SCALE : scale;
    var docSt = $(document).scrollTop(), docHt = $(document).height();
    var norm = Math.sqrt(docHt * docHt - docSt * docSt);
    return DEFAULT_CAMERA_Y + (scale * (docHt - docSt) / norm);
}

function onWindowScroll() {

    camera.position.y = normalizedScrollTop();

}


function animate() {

    requestAnimationFrame(animate);

//    controls.update(1);
    render();

    if (stats) stats.update();

}

function render() {

    renderer.render(scene, camera);

}