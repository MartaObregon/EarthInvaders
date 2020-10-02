# Earth´s Invaders

## Description
Earth´s Invaders is a game where the player has to move a UFO vertically trying to avoid colliding with birds and shoot down a beam on incoming cows.  The game ends when a bird collides with the UFO. After that, the score is calculated based on the number of cows beamed up.


## MVP (DOM - CANVAS)
- game has random cows poping on the ground level
- max of 2 birds on screen moving horizontally
- UFO moves vertically and when beam displayed, UFO stops moving
- UFO's beam when displayed on the area a cow pops, cow moves vertically downsizing towards the UFO
- add audio when cow is being beam up




## Backlog
- add scoreboard
- add walking cows
- ability to start the game with dificulty level
- Increasing difficulty by adding colliding enemies (planes, falcons...) with diferent speeds,along with birds

## Data structure

# main.js

- buildSplashScreen (){}
- buildGameScreen (){}
- buildGameOverScreen (){}

# game.js

- Game(){}
- startGame(){}
- addCow (){}
- clearCanvas (){}
- updateCanvas (){}
- drawCanvas (){}
- GameOver (){}

# ufo.js

- ufo() {this.x,this.y,this.isMoving},
- draw (){}
- move(){}
- shoot(){}
- checkScreenBeam(){}

# cow.js

- Cow (){this.x;this.y;this.isBeaming; this.size}
- draw (){}
- appear(){}
- checkBeamArea (){}

# beam.js
- Beam (){this.x;this.y;this.direction}
- draw(){}
- checkBeamBottom (){}

# bird.js
- bird (){this.x;this.y;this.direction)
- draw (){}
- move (){}
- checkCollision(){}

## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen


## Task
- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- game - startGame (loop)
- game - buildCanvas
- game - drawCanvas
- ufo - draw
- ufo - move
- ufo - shoot
- game - addUfo
- cow - draw
- cow - move(beam)
- game - addCow
- beam - draw
- beam - move
- bird - draw
- bird - move
- game - checkCollision
- game - GameOver
- game - addEventListener

## Links


### Trello
[Link url](https://trello.com/b/9lbQsShn/earths-invaders)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/MartaObregon/EarthInvaders)
[Link Deploy](https://martaobregon.github.io/EarthInvaders)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/19bcwjftJCuNp9vkZlWXhZBaLpR-Mt0hzTBrEctsD8yI/edit#slide=id.g9da97e0795_0_0)
