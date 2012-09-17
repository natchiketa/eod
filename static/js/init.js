var camera, scene, renderer;
var geometry, material, mesh;

var pyramid = {

    "metadata" :
    {
        "formatVersion" : 3.1,
        "generatedBy"   : "Blender 2.63 Exporter",
        "vertices"      : 5,
        "faces"         : 5,
        "normals"       : 5,
        "colors"        : 0,
        "uvs"           : [],
        "materials"     : 1,
        "morphTargets"  : 0,
        "bones"         : 0
    },

    "scale" : 1.000000,

    "materials": [	{
        "DbgColor" : 15658734,
        "DbgIndex" : 0,
        "DbgName" : "Material",
        "blending" : "NormalBlending",
        "colorAmbient" : [0.6400000190734865, 0.6400000190734865, 0.6400000190734865],
        "colorDiffuse" : [0.6400000190734865, 0.6400000190734865, 0.6400000190734865],
        "colorSpecular" : [0.5, 0.5, 0.5],
        "depthTest" : true,
        "depthWrite" : true,
        "shading" : "Lambert",
        "specularCoef" : 50,
        "transparency" : 1.0,
        "transparent" : false,
        "vertexColors" : false
    }],

    "vertices": [1,0.00185072,-1,1,0.00185078,1,-1,0.00185078,1,-1,0.00185072,-1,0.00556707,1.62695,-0.0055197],

    "morphTargets": [],

    "normals": [0.67156,-0.312967,-0.67156,0.671041,-0.31196,0.672567,-0.672048,-0.310953,0.672018,-0.672567,-0.31196,-0.671041,0.002289,0.999969,-0.002258],

    "colors": [],

    "uvs": [],

    "faces": [35,0,1,2,3,0,0,1,2,3,34,0,4,1,0,0,4,1,34,1,4,2,0,1,4,2,34,2,4,3,0,2,4,3,34,4,0,3,0,4,0,3],

    "bones" : [],

    "skinIndices" : [],

    "skinWeights" : [],

    "animation" : {}


}

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    geometry = new THREE.CubeGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({ color:0xff0000, wireframe:true });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);

}

$(document).ready(function(){
    init();
    animate();
});

