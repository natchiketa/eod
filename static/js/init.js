

$(document).ready(function () {

    init();
    animate();

/*    $(document).keydown(function (event) {
        var code = null;
        code = (event.keyCode ? event.keyCode : event.which);
        var codeIndex = [37,38,39,40].indexOf(code);
        if (codeIndex >= 0) {
            event.preventDefault();
            console.log(['left','up','right','down'][codeIndex]);
            switch(code){
                case 37:
                    camera.position.y += 1;
                    break;
                case 39:
                    camval += .1;
                    console.log('sine',Math.cos( camval ));
                    console.log('cosine', Math.sin( camval ));
                    break;
            }
            console.log(camval);
        }
    });*/

    $(window).scroll(function(){

    });

});

