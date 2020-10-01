// BuildDom function
let timer = 0
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
                            <p>We learnt that humans are eating cows!<br>
                            THIS MUST BE STOP!
                            Help us free the cows from their fatal fate
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
    let gameScreen = buildDom(`
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
                    
                    <button type="button" class="btn btn-secondary" class="menu-btn">Go to Menu</button>
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
    // let pauseBtn = gameScreen.querySelector(".pause-btn")
    // pauseBtn.addEventListener("click", function (){
    //     game.clearinterval(intervalId)
    // })
    // let menuBtn = gameScreen.querySelector(".menu-btn")
    // menuBtn.addEventListener("click", function (){
    //     removeGameScreen()
    //     createSplashScreen()
    // })

   
    
}
    function removeGameScreen(){
        gameScreen.remove();
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
         <h1>GAME OVER!</h1>
         <p class="end-score"></p>
         <section id="mid-section">
             <div class = "left-side">
                 <div class="btn-section">
                     <button type="button" class="btn btn-secondary" id="restart-btn">Restart</button>
                 </div>
                 <img src="images/alien2.png">
             </div>
             <img src="images/alienworld.jpg" class="alien-world">
             <div class = "right-side">
                 <div class = "cloud-text">
                     <article class="instructions">
                         <h2>NICE TRY!</h2>
                     </article>
                 </div>
                 <img src ="images/alien1.png" alt="alien1" class="alien1">
             </div>    
         </section>
       </div>  
     </main>`);

      document.body.appendChild(gameOverScreen);

      let restartBtn = gameOverScreen.querySelector("button");
      restartBtn.addEventListener("click", function (){
        gameOverScreen.remove();
        createGameScreen()
        startGame();
    });
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
          <h1>WINNER</h1>
          <p class="end-score"></p>
          <section id="mid-section">
              <div class = "left-side">
                  <div class="btn-section">
                      <button type="button" class="btn btn-secondary" id="restart-btn">Restart</button>
                  </div>
                  <img src="images/alien2.png">
              </div>
              <img src="images/alienworld.jpg" class="alien-world">
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
            winScreen.remove();
            createGameScreen();
            startGame();
     });
    }
  
    function startGame(){
        removeSplashScreen();
        start()
    }
  
    createSplashScreen();
}

window.addEventListener("load", main);
