//Draw Canvas ---------
let canvas = document.querySelector('canvas');
canvas.style.border= '5px solid #fe59d7';
let ctx = canvas.getContext('2d')
let intervalId = 0
let score = 0



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


// Images variables --------
let ufoWidth= 100
let ufoHeight= 70
let fgWidth = 700
let fgHeight = 80
let birdWidth = 80
let birdHeight = 100

let ufoX = 100;
let ufoY = 100
let ufoIncrement = 1
let ufoDecrement = -1
let isRightArrow = false;
let isLeftArrow = false;
let isUpArrow = false;
let isDownArrow = false;

let bird1X = 600
let bird1Y = 100
let bird2X = 600


let birds = [
    {x:canvas.width-10, y:0}
]

// document.addEventListener('mousedown', () =>{
//    ufoIncrement = -1
// })

// document.addEventListener('mouseup', () =>{
//     ufoIncrement = 1
// })

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

function moveUfo (){
    if (isRightArrow && (ufoX + ufoWidth < canvas.width)){
        ufoX += ufoIncrement
    } else if (isLeftArrow){
        ufoX += ufoDecrement
    }else if (isUpArrow ){
         ufoY += ufoDecrement
    }else if (isDownArrow && ufoY+ ufoWidth< canvas.height){
        ufoY += ufoIncrement
    }

}

document.addEventListener('keyup', (event)=>{
    isRightArrow= false;
    isLeftArrow = false
})

function startGame(){
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(ufo, ufoX, ufoY, ufoWidth, ufoHeight);
    ctx.drawImage(fg,0,canvas.height-50, fgWidth,fgHeight)

    // ufoY += ufoIncrement
    
    
    for (let i = 0; birds.length; i++){
        let constant = bird1Y + 50
        ctx.drawImage(bird1, birds[i].x, birds[i].y, birdWidth,birdHeight)
        ctx.drawImage(bird2, birds[i].x, birds[i].y + constant, birdWidth, birdHeight)
        birds[i].x--
        if (birds[i].x == 30){
            birds.push({
                x: canvas.width,
                y: (Math.floor(Math.random()* 300)) - fg.height
            })
        }

       
    }

    
    
    
   
   
    ctx.font ='25px  Verdana '
    ctx.fillStyle = 'white'
    ctx.fillText('Score:' + score, 20, 30)
}

intervalId = setInterval(()=>{
    requestAnimationFrame(startGame)
},5)


