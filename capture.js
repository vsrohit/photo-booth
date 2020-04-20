(function(){
    // The width and height of the cpture photo
    // We will set width and calculate heightt based on the aspect ratio of the input stream

    var width = 320;
    var height = 0;

    // isStreaming tells us if we are currently streaming
    var isStreaming = false;

    // Configure HTML elements

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');

        navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            console.log("An error occured: " + err);
        });

        video.addEventListener('canplay', function(ev){
            if(!isStreaming) {
                height = video.videoHeight / (video.videoWidth/width);

                // Address Firefox bug : It cannot determine height from the video. If this happens
                if(isNaN(height)) {
                    height = width / (4/3);
                }

                video.setAttribute('Width', width);
                video.setAttribute('Height', height);
                
                canvas.setAttribute('Width', width);
                canvas.setAttribute('Height', height);
                isStreaming = true;
            }
        }, false);

        clearphoto();
        
    }

    // Fill the photo with an indication that none has been captured

    function clearphoto() {
        var context = canvas. getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    // Capture photo
    // Fetch the current contents of the video and draw it into a canvas. Convert that into PNG format data URL.
    // Draw it on an offscreen canvas. Change it's size and then draw it to the screen

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute(src, data);
        } else {
            clearphoto();
        }
    }



    // Setup event listener to run the startup process once the loading is complete
    window.addEventListener('load', startup, false);
})();