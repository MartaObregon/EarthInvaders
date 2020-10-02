// BuildDom function
let timer = 0
let gameScreen
let trackAudio = new Audio("sounds/track.mp3")
function buildDom(htmlString){
    var div = document.createElement("div");
    div.innerHTML = htmlString;
    return div.children[0];
}

//Main game to load onto page
function main(){
    let game;
    let splashScreen;
    let gameOverScreen;
    let winScreen;
    
    createSplashScreen();
    trackAudio.play();
    trackAudio.volume = 0.4;
    
    


    function createSplashScreen(){
        splashScreen = buildDom(`
        <main>
          <div class ="splash">
            <header>
                <div class="container">
                    <div class="container2">
                        <img src="images/logo2.png" alt="logo" class="logo">
                    </div>
                </div>
            </header>
            <hr>
            <section id="mid-section">
                <div class = "left-side">
                    <div class="btn-section">
                        <button type="button" class="btn btn-secondary" id="start-btn">Start Game</button>
                    </div>
                    <img src="images/alien2.png">
                </div>
                <img src="images/alienworld.jpg" class="alien-world">
                <div class = "right-side">
                    <div class = "cloud-text">
                        <article class="instructions">
                            <h6>HELLO TERRICOLEAN!</h6>
                            <p>We´ve learnt that humans are eating cows!<br>
                            THIS MUST BE STOP!<br>
                            Help us free 5 cows from their fatal fate...
                            </p>
                        </article>
                    </div>
                    <img src ="images/alien1.png" alt="alien1" class="alien1">
                </div>    
            </section>
          </div>  
        </main>`);
    document.body.appendChild(splashScreen);
    let startButton = splashScreen.querySelector("#start-btn");
     
    startButton.addEventListener ("click", function (){
        removeSplashScreen()
        createGameScreen();
        
        startGame();
    });

    }

    // take away splash screen
    function removeSplashScreen(){
        splashScreen.remove();
    }

    // create game screen

function createGameScreen(){
    gameScreen = buildDom(`
     <main class="game game-container">
        <header>
            <div class="container">
                <div class="container2">
                    <img src="images/logo2.png" alt="logo" class="logo">
                </div>
            
            </div>
            
        </header>
        <hr>
        <section id="mid-section">
            <div class = "left-side">
                <div class="btn-section">
                    
                    
                </div>
                <img src="images/alien2.png">
            </div>
            <canvas id="gameCanvas" width="690" height="500"></canvas>
            <div class = "right-side">
                <div class = "cloud-text">
                    <article class="instructions">
                        <h6>How to Play</h6>
                        <ul>
                            <li>Press the arrow keys to move the spaceship</li>
                            <li>Press the space bar to shoot the beam ray on cows</li>
                            <li>Try to avoid birds!</li>
                        </ul>
                    </article>
                        
                </div>
                <img src ="images/alien1.png" alt="alien1" class="alien1">
            </div>
        </section>
     </main>`);

    document.body.appendChild(gameScreen);

       
}
    function startGame(){
        removeSplashScreen();
        trackAudio.volume = 0.3;
        start();
    }

    
    
    
}

function removeWinScreen(){
    winScreen.remove();

}
function createWinScreen(){
    winScreen = buildDom (`
    <main>
    <div class ="game-over">
      <header>
          <div class="container">
              <div class="container2">
                  <img src="images/logo2.png" alt="logo" class="logo">
              </div>
          </div>
      </header>
       
      <section id="mid-section">
          <div class = "left-side">
              <div class="btn-section">
                  <button type="button" class="btn btn-secondary" id="restart-btn">Restart</button>
              </div>
              <img src="images/alien2.png">
          </div>
          <div class="cow-img">
          <div class="title container">
              <h1 class="winner">WINNER</h1>
          </div>
          <img src = "images/dancing.gif" alt="dancingCow" class="dancing-cow">
      </div>
          <div class = "right-side">
              <div class = "cloud-text">
                  <article class="instructions">
                      <h2>YOU ARE A TRUE HERO!</h2>
                  </article>
              </div>
              <img src ="images/alien1.png" alt="alien1" class="alien1">
          </div>    
      </section>
    </div>  
  </main>`);

   document.body.appendChild(winScreen);

   let restartBtn = winScreen.querySelector("button");
   restartBtn.addEventListener("click", function (){
        removeWinScreen();
        main()
 });
}
function removeGameScreen(){
    gameScreen.remove();
    trackAudio.pause();
}
function removeGameOverScreen(){
    gameOverScreen.remove();
}

function createGameOverScreen(){
    gameOverScreen = buildDom (`
  <main>
  <div class ="game-over">
    <header>
        <div class="container">
            <div class="container2">
                <img src="images/logo2.png" alt="logo" class="logo">
            </div>
        </div>
    </header>
    
    <p class="end-score"></p>
    <section id="mid-section">
        <div class = "left-side">
            <div class="btn-section">
                <button type="button" class="btn btn-secondary" id="restart-btn">Restart</button>
            </div>
            
        </div>
        <div class="cow-img">
            <div class="title container">
                <h1 class="gameover">GAME OVER!</h1>
            </div>
            <img src = "images/crazycow.png" alt="cow2" class="crazy-cow">
        </div>
        <div class = "right-side">

            <div class = "cloud-text">
                <article class="instructions">
                    <h2>NICE TRY!</h2>
                </article>
            </div>
            
        </div>    
    </section>
  </div>  
</main>`);

 document.body.appendChild(gameOverScreen);


 let restartBtn = gameOverScreen.querySelector("button");
 restartBtn.addEventListener("click", function (){
   removeGameOverScreen()
   main()
   
});
}
window.addEventListener("load", main);
