THREE.PyramidGeometry = function ( radius, detail ) {

    var vertices = [
        [0.000747455,0.0388997,-3.21199],[0.000744951,1.0389,-2.212],[0.866774,0.0388964,-1.712],[-0.865285,0.0388964,-1.71199]
    ];

    var faces = [
        [ 0.28868, 0.16667, -0.16667 ], [ 0.000004, -0.33333, -0.16667 ], [ -0.28868, 0.16667, -0.16667 ], [ 0.000001, 0.000003, -0.50000 ]

/*
        [ 0.28868, 0.16667, -0.16667 ], [ 0.000004, -0.33333, -0.16667 ], [ -0.28868, 0.16667, -0.16667 ], [ 0.000001, 0.000003, -0.50000 ]
*/

    ];

    THREE.PolyhedronGeometry.call( this, vertices, faces, radius, detail );

};

THREE.PyramidGeometry.prototype = Object.create( THREE.Geometry.prototype );