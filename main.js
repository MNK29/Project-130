hp = "";
os = "";
songHP = "";
songOS = "";
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;

function preload(){
    hp = loadSound("Harry-Potter.mp3");
    os = loadSound("One-Shot.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet has been intitialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of the left wrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of  the right wrist = " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        console.log("Left Wrist X = " + leftWristX);
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist Y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        console.log("Right Wrist X = " + rightWristX);
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist Y = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    songHP = hp.isPlaying();
    songOS = os.isPlaying();
    fill("#A020F0");
    stroke("#A020F0");
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        hp.stop();
        if(songOS == false){
            os.play();
            document.getElementById("song").innerHTML = "One Shot (from Avengers: Endgame)";
        }
    }
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        os.stop();
        if(songHP == false){
            hp.play();
            document.getElementById("song").innerHTML = "Harry Potter Theme";
        }
    }
}