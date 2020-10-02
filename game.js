
function start(){
    
    //Draw Canvas ---------
    let canvas = document.querySelector('canvas');
    canvas.style.border= '5px groove white';
    let ctx = canvas.getContext('2d')
    let intervalId = 0
    let intervalIdTwo = 0 
    let score = 0
    let IsBeamAiming = false
    let isCowBeam = false
    let numberOfLives = 3
    
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
    let alienAudio = new Audio ('sounds/loserAlien.mp3');
    let sadLoserAudio = new Audio ('sounds/SadLoser.mp3');
    let duckAudio = new Audio ('sounds/duck.mp3')


    // Images variables --------
    let ufoWidth= 100
    let ufoHeight= 70
    let fgWidth = 700
    let fgHeight = 80
    let birdWidth = 80
    let birdHeight = 100
    let cowWidth = 60
    let cowHeight = 60

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
    let isSpacebar = false;

    let birds = [
        {x:canvas.width-10, y:0}
    ]

    //All events listed  
    document.addEventListener('keydown', (event)=>{
        if (event.key == 'ArrowRight'){
            isRightArrow = true;
            moveUfo();
            
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
            beamAim()
        }
    })
   
    //movement of the spaceship in 4 different directions
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

    // To randomize cows in the same X variable, but only when the beam ray is not activated
    function drawCow (){
        
        if(!IsBeamAiming){
            cowX = cowWidth + Math.floor(Math.random()*canvas.width-cowWidth);
        }
        else{
            cowX == canvas.height - 60
    
        }
    }

    // check if the beam ray is targeting a cow correctly.
    function beamAim(){
    
        if(ufoY > 180 && ufoX - 20<= cowX && ufoX+ 20+ufoWidth >= cowX+cowWidth){
            IsBeamAiming = true
            console.log(IsBeamAiming)
            ctx.drawImage(beam, ufoX, ufoY - 45, 100, 300);
            ufoAudio.play()
            ufoAudio.volume = 0.1
        }else{
            console.log(IsBeamAiming)
            IsBeamAiming=false
            
            
        }
    
    }
    
    // action of beaming a cow and moving it upwards
    function beamCow(){
        if (IsBeamAiming){
            cowY = cowY -5
            mooAudio.play()
       

        }else{
            cowY = canvas.height -60
        }
    }

    // check collision of UFO with birds and if detected then take a live from the counter.
    function checkBirdCollision(){
        for(let i = 0; i<birds.length;i++){
        if (ufoX < birds[i].x + birdWidth&&
            ufoX + ufoWidth > birds[i].x &&
            ufoY < birds[i].y + birdHeight &&
            ufoY+ ufoHeight > birds[i].y) {
                ctx.drawImage(explosion,ufoX, ufoY, 100, 100);
                duckAudio.play()
                duckAudio.volume= 0.7
                
                takeLive()
                birds[i].x = -50

              
            }
                
               
            }
    }

    // check collision of the cow with spaceship to start again random cows appearing.
    function checkCowCollision(){

        if(cowY<canvas.height-200){
            score++
            cowY = canvas.height -60
            cowX = cowWidth + Math.floor(Math.random()*canvas.width-cowWidth)
        }

     
    }

    function checkUfoCollision(){
        if (ufoY+ufoHeight>= canvas.height){
            ctx.drawImage(explosion,ufoX, ufoY, 100, 100)
                explosionAudio.play()
                explosionAudio.volume= 0.1
                takeLive()
                setTimeout(()=>{
                    ufoY = 100
                    drawBirds()
                    
                },100)
               
        }
    }

    // randomize birds and check their collision
    function drawBirds(){
        for (let i = 0; i<birds.length; i++){
            let constant = 200
            
            if (birds[i].x == -50){
                birds.push({
                    x: canvas.width+birdHeight,
                    y: (Math.floor(150 +Math.random()* 200 )) 
                })

            }

            ctx.drawImage(bird1, birds[i].x, birds[i].y, birdWidth,birdHeight)
            ctx.drawImage(bird2, birds[i].x, birds[i].y - constant, birdWidth, birdHeight)
            birds[i].x = birds[i].x-5;
        }    

        checkBirdCollision()
    }

    function takeLive () {
        if(numberOfLives>0){
            numberOfLives--
        }else if(numberOfLives<=1){
           clearInterval(intervalId)
           alienAudio.play()
           

           setTimeout(()=>{
            sadLoserAudio.play()   
            removeGameScreen();
            createGameOverScreen();
           }, 1000)
        }
    }    
  
    
    function checkScore(){
        if (score >= 5){
            clearInterval(intervalId)
            
            setTimeout(()=>{
                winnerAudio.play();
                removeGameScreen();
                createWinScreen();
                trackAudio.play();
            })

        }
    }
       
    function drawCanvas (){
        ctx.drawImage(bg, 0, 0)
        ctx.drawImage(ufo, ufoX, ufoY, ufoWidth, ufoHeight);
        ctx.drawImage(fg,0,canvas.height-50, fgWidth,fgHeight);
        ctx.drawImage(cowImage, cowX, cowY, cowWidth, cowHeight);
        ctx.font = '25px Verdana'
        ctx.fillStyle = 'white'
        ctx.fillText(`Score:${score}  |  Lives: ${numberOfLives}`, 20, 30)
        moveUfo();
        checkUfoCollision();
        if(isSpacebar){ctx.drawImage(beam, ufoX, ufoY - 45, 100, 300);}
        if(timer%100 === 0 ){drawCow()}
        beamCow();
        checkCowCollision();
        drawBirds(); 
        checkScore(); 
    }      
        
    intervalId = setInterval(()=>{
        timer++
        requestAnimationFrame(drawCanvas)
        
    },20) 




       
}




