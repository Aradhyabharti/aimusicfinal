song = ""
song2 = ""
lwx = 0
lwy = 0
rwx = 0
rwy = 0
srw = 0
slw = 0
s1st = ""
s2st = ""
function start() {
    song.setVolume(1)
    song.rate(1)
    song.play()
}
function preload() {
    song = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}


function setup() {
    canvas = createCanvas(400, 400)
    canvas.center()
    video = createCapture(VIDEO)
    video.center()
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotposes)
}

function modelLoaded() {
    console.log("posenet is intialized")
}




function draw() {
    s1st = song.isPlaying()
    s2st = song2.isPlaying()
    image(video, 0, 0, 400, 400)
    fill('#800080')
    stroke('#243678')
    if (srw > 0.2) {
        circle(rwx, rwy, 20);
        song2.stop();
        if (s1st == false) {
            song.play();
            document.getElementById("songname").innerHTML = "Playing Hedwig's theme song";
        }

    }


    if (slw > 0.2) {
        circle(lwx, lwy, 20);
        song.stop();
        if (s2st == false) {
            song2.play();
            document.getElementById("songname").innerHTML = "Playing Peter Pan song";
        }

    }
}




function gotposes(poses, error) {
    if (error) {
        console.error(error);
    }
    if (poses.length > 0) {
        console.log(poses)
        slw = poses[0].pose.keypoints[9].score;
        srw = poses[0].pose.keypoints[10].score;
    
        lwx = poses[0].pose.leftWrist.x;
        lwy = poses[0].pose.leftWrist.y;
        console.log("leftwristx " + lwx + "leftwristy " + lwy);

        rwx = poses[0].pose.rightWrist.x;
        rwy = poses[0].pose.rightWrist.y;
        console.log("rightWristx " + rwx + "rightWristy " + rwy);

    }
}