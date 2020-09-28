//Draw Canvas ---------
let canvas = document.querySelector('canvas');
canvas.style.border= '5px solid #fe59d7';
let ctx = canvas.getContext('2d')
let intervalId = 0
let score = 0
let IsBeamAiming = false



// load Images -----------
let bg = document.createElement('img')
bg.src="images/bg.png"

let ufo = document.createElement('img')
ufo.src="images/ufo1.png"

let fg = document.createElement('img')
fg.src="images/fg.png"

let bird1 = document.createElement('img')
bird1.src ="images/swan.png"
let bird2 = document.createElement('img')
bird2.src ="images/swan.png"

let cowImage = document.createElement('img')
cowImage.src ='images/cow1.png'

let explosion = document.createElement('img')
explosion.src='images/Explosion.png'

let beam = document.createElement('img')
beam.src= 'images/beam.png'

// Images variables --------
let ufoWidth= 100
let ufoHeight= 70
let fgWidth = 700
let fgHeight = 80
let birdWidth = 80
let birdHeight = 100
let cowWidth = 80
let cowHeight = 90
let timer = 0


let ufoX = 100;
let ufoY = 100
let cowX = 100
let cowY = canvas.height -90
let ufoIncrement = 20
let ufoDecrement = -20
let isRightArrow = false;
let isLeftArrow = false;
let isUpArrow = false;
let isDownArrow = false;
let isSpacebar = false

let bird1X = 600
let bird1Y = 100
let bird2X = 600


let birds = [
    {x:canvas.width-10, y:0}
]

let cow =[{
    x:cowX, y:cowY
}]



document.addEventListener('keydown', (event)=>{
        console.log(event)
    if (event.key == 'ArrowRight'){
        isRightArrow = true;
        moveUfo()
    }else if(event.key == 'ArrowLeft'){
        isLeftArrow = true
        moveUfo()
    }else if(event.key == 'ArrowUp'){
        isUpArrow = true;
        moveUfo()
    }else if(event.key == 'ArrowDown'){
        isDownArrow = true;
        moveUfo()
    }
})
document.addEventListener('keyup', (event)=>{
    isRightArrow = false;
    isLeftArrow = false;
    isUpArrow = false;
    isDownArrow = false;
    isSpacebar = false
})

document.addEventListener('keypress', (event)=>{
    if(event.key == ' '){
        displayBeam()
        isSpacebar = true;
        
    }
})

function drawCow (){
        
        cowX = cowWidth + Math.floor(Math.random()*canvas.width-cowWidth);
}

function moveUfo (){
    if (isRightArrow && (ufoX + ufoWidth < canvas.width)){
        ufoX += ufoIncrement
    } else if (isLeftArrow && ufoX>0 ){
        ufoX += ufoDecrement
    }else if (isUpArrow && ufoY > 0 ){
         ufoY += ufoDecrement
    }else if (isDownArrow && ufoY+ ufoWidth< canvas.height+50){
        ufoY += ufoIncrement
    }

}

function displayBeam(){
    ctx.drawImage(beam, ufoX, ufoY - 45, 100, 300);
    if((beam.y+ beam.height == cowY-20)&&isSpacebar){
        IsBeamAiming = true
        console.log(IsBeamAiming)
    }else{
        IsBeamAiming=false
        console.log(IsBeamAiming)
    }
    
}

function BeamCow(){
   
    for (i=0; i<cow.length; i++){
        
        if(IsBeamAiming){
            cow.push({
                x:cowX, 
                y: cowY-10

            })
            score++

        }else{
            ctx.font = "40px Verdana "
            ctx.fillStyle = "white"
            ctx.fillText("You need to better your aim", 200, 200)
        }
    
    
    }
}

function drawCanvas (){
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(ufo, ufoX, ufoY, ufoWidth, ufoHeight);
    ctx.drawImage(fg,0,canvas.height-50, fgWidth,fgHeight)
    ctx.drawImage(cowImage, cowX, canvas.height -80, 80, 90)
    

    ctx.font ='25px  Verdana '
    ctx.fillStyle = 'white'
    ctx.fillText('Score:' + score, 20, 30)


}



// let numberOfLives = 5

// function drawLive(numberOfLives){
//     for(let i=0; i<numberOfLives; i++){
//     let num = i*31;
//     ctx.beginPath();
//     ctx.moveTo(20+num,420);
//     ctx.lineTo(50+num,420);
//     ctx.lineTo(50+num,435);
//     ctx.lineTo(20+num,435);
//     ctx.lineTo(20+num,420);
//     ctx.fillStyle = "#7bff3d";
//     ctx.fill();
//     ctx.stroke();
//     ctx.closePath();
//     }


function startGame(){

    drawCanvas()
    moveUfo()
    

    if(timer%90 === 0){
        drawCow()
        
    }
   
    for (let i = 0; i<birds.length; i++){
        let constant = bird1Y + 100
        
        if (birds[i].x == 30){
            birds.push({
                x: canvas.width,
                y: (Math.floor(Math.random()* 300)) - fg.height
            })

        }

        if (ufoY > canvas.height-50 ){
            ctx.drawImage(explosion,ufoX-40, ufoY-50, 100, 100)
            clearInterval(intervalId)
            
            setTimeout(()=>{
                alert('game over')
            },100)
        }
        if (ufoX===birds[i].x){
            ctx.drawImage(explosion,ufoX, ufoY, 100, 100)
            clearInterval(intervalId)
            setTimeout(()=>{
                alert('game over')
            },100)
        }
        
       

        ctx.drawImage(bird1, birds[i].x, birds[i].y, birdWidth,birdHeight)
        ctx.drawImage(bird2, birds[i].x, birds[i].y + constant, birdWidth, birdHeight)
        birds[i].x = birds[i].x-10
        
    
    
        }
        
       
          
    }



intervalId = setInterval(()=>{
    timer++
    requestAnimationFrame(startGame)
},40)


