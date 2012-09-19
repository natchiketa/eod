THREE.PyramidGeometry = function (radius, detail) {

    var vertices = [
        [0, 0, 1],
        [-0.86603, 0, -0.5],
        [0.86603, 0, -0.5],
        [0, 1, 0]
    ];

    var faces = [
        [0, 1, 3],
        [1, 2, 3],
        [2, 0, 3],
        [0, 1, 2]
    ];

    THREE.Geometry.call(this, vertices, faces);

};

THREE.PyramidGeometry.prototype = Object.create(THREE.Geometry.prototype);