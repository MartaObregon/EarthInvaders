
function start(){
    
    //Draw Canvas ---------
    let canvas = document.querySelector('canvas');
    canvas.style.border= '5px groove white';
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
    cowImage.src ='images/cow2.png'

    let explosion = document.createElement('img')
    explosion.src='images/Explosion.png'

    let beam = document.createElement('img')
    beam.src= 'images/beam.png'

    // Load Audio -----

    let mooAudio = new Audio('sounds/moo.mp3')
    let winnerAudio= new Audio ('sounds/tada.mp3') 
    let ufoAudio = new Audio ('sounds/ufo.mp3')
    let explosionAudio = new Audio ('sounds/explosion.mp3')


    // Images variables --------
    let ufoWidth= 100
    let ufoHeight= 70
    let fgWidth = 700
    let fgHeight = 80
    let birdWidth = 80
    let birdHeight = 100
    let cowWidth = 60
    let cowHeight = 60
    // let timer = 0


    let ufoX = 100;
    let ufoY = 100
    let cowX = 100
    let cowY = canvas.height -60
    let ufoIncrement = 10
    let ufoDecrement = -10
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

    // let cow =[{
    //     x:cowX, y:cowY
    // }]
   
    function drawCanvas (){
        ctx.drawImage(bg, 0, 0)
        ctx.drawImage(ufo, ufoX, ufoY, ufoWidth, ufoHeight);
        ctx.drawImage(fg,0,canvas.height-50, fgWidth,fgHeight)
        ctx.drawImage(cowImage, cowX, cowY, cowWidth, cowHeight)
        
    
        ctx.font ='25px  Verdana '
        ctx.fillStyle = 'white'
        ctx.fillText('Score:' + score, 20, 30)
    
    
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
    function drawCow (){
        
        if(!IsBeamAiming){
            cowX = cowWidth + Math.floor(Math.random()*canvas.width-cowWidth);
        }
        else{
            cowX == cowX
    
        }
    }
    function displayBeam(){
        // ctx.drawImage(beam, ufoX, ufoY - 45, 100, 300);
        console.log(ufoY)
        if(ufoY > 180 &&((ufoX >= cowX && ufoX <= cowX + cowWidth) || (ufoX +ufoWidth >= cowX && ufoX +ufoWidth <= cowX +cowWidth))){
            IsBeamAiming = true
            console.log(IsBeamAiming)
            
            ufoAudio.play()
            ufoAudio.volume = 0.1
        }else{
            IsBeamAiming=false
            console.log(IsBeamAiming)
        }
    
    }
    
    function beamCow(){
        //    stop beaming, change to false in keydown
        if (IsBeamAiming){
            cowY = cowY-7
            mooAudio.play()
            
            //    cowHeight = cowHeight-10
            //    cowWidth = cowHeight -10
            console.log(cowY)
        }else{
            cowX == cowX
            cowY = canvas.height -60
        }
        }
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
            IsBeamAiming = false;
        })

        document.addEventListener('keypress', (event)=>{
            if(event.key == ' '){
                
                isSpacebar = true;
                displayBeam()
                
                
            }
        })

    function startLoop(){

        drawCanvas();
        moveUfo()
        if(isSpacebar){
            ctx.drawImage(beam, ufoX, ufoY - 45, 100, 300);
        }
    
        if(timer%80 === 0 ){
            drawCow() 
        }
        if(ufoY > cowY &&  cowY > 100){
            cowX = -10
        score = score +1
        }
        beamCow()

        if ( score >= 5 &&  cowY > 100){
            clearInterval(intervalId)
            alert("WINNER")
            winnerAudio.play()
        }

        for (let i = 0; i<birds.length; i++){
            let constant = 300
            
            if (birds[i].x == 30){
                birds.push({
                    x: canvas.width+birdHeight,
                    y: (Math.floor(Math.random()* canvas.height +250)) 
                })

            }

            ctx.drawImage(bird1, birds[i].x, birds[i].y, birdWidth,birdHeight)
            ctx.drawImage(bird2, birds[i].x, birds[i].y - constant, birdWidth, birdHeight)
            birds[i].x = birds[i].x-10

        

        

            // if the ufo hits a bird
        
            if (ufoX < birds[i].x + birdWidth&&
                ufoX + ufoWidth > birds[i].x &&
                ufoY < birds[i].y + birdHeight &&
                ufoY+ ufoHeight > birds[i].y) {
                    ctx.drawImage(explosion,ufoX, ufoY, 100, 100)
                    explosionAudio.play()
                    explosionAudio.volume= 0.1
                    clearInterval(intervalId)
                    setTimeout(()=>{
                        alert('HIT')
                    },100)
            }
            
                // if the ufo crashes 
                if (ufoY > canvas.height-50 ){
                    ctx.drawImage(explosion,ufoX-40, ufoY-50, 100, 100)
                    explosionAudio.play()
                    clearInterval(intervalId)
                    
                    setTimeout(()=>{
                        alert('CRASHED')
                    },100)
                }
            }
            
            

            
        }
        // startLoop()
        intervalId = setInterval(()=>{
            timer++
            requestAnimationFrame(startLoop)
        },40)
    }




