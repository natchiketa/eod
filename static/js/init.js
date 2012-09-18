

$(document).ready(function () {

    $(document).keydown(function (event) {
        var code = null;
        code = (event.keyCode ? event.keyCode : event.which);
        var codeIndex = [37,38,39,40].indexOf(code);
        if (codeIndex >= 0) {
            event.preventDefault();
/*
            console.log(['left','up','right','down'][codeIndex]);
            switch(code){
                case 37:
                    camval -= .1;
                    console.log('cosine',Math.cos( camval ));
                    console.log('sine', Math.sin( camval ));
                    break;
                case 39:
                    camval += .1;
                    console.log('sine',Math.cos( camval ));
                    console.log('cosine', Math.sin( camval ));
                    break;
            }
            console.log(camval);
*/
        }
    });

});

