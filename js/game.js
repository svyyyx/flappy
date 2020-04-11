var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var button = new Image();

bird.src = "img/bird2.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp3.png";
pipeBottom.src = "img/pipeBottom2.png";

//button
var d = document.getElementById("div");
var b = document.getElementById("btn");

b.onclick = function() {
       isPause = !isPause;
}

var gap = 90;

//Подпрыгивание
document.addEventListener("mousedown", moveUp);

function moveUp() {
	yPos -= 43;
}


//Создание препятствий (pipe)
var pipe = [];
	pipe[0] = {
	x : cvs.width,
	y : -110,
}


//Позиция bird
var xPos = 10;
var yPos = 150;
var grav = 2.1;


var speed = 1;
var difficult = 585;
var score = 0;

var isPause = true;

	function draw() {
		ctx.drawImage(bg, 0, 0);


		for(var i = 0; i < pipe.length; i++){
			ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
			ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

			if(!isPause) {
				pipe[i].x -= speed;
			}


			if(pipe[i].x == difficult ) {
				pipe.push({
					x : cvs.width,
					y : Math.floor(Math.random() * (pipeUp.height - 70)) - (pipeUp.height - 70) - 60,
				})
			}

			if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width 
				&& (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) 
				|| yPos + bird.height >= cvs.height - fg.height) {
				location.reload();
				start == false;
			}

			if(pipe[i].x == 2) {
				score++;
			}
		}
	

		ctx.drawImage(fg, 0, cvs.height - fg.height);
		ctx.drawImage(bird, xPos, yPos);

		if(!isPause) {
			yPos += grav;
		}


		ctx.fillStyle = "#000";
		ctx.font = "24px Verdana";
		ctx.fillText("Счёт: " + score, 10, cvs.height - 20);

		requestAnimationFrame(draw);
	}
	pipeBottom.onload = draw;

  //window.focus();
  //window.addEventListener('keydown', function(e){
    //if(e.keyCode===27){
      //  isPause = !isPause;
    //}
//});
