const grid = document.querySelector(".grid")
const width = 28
const squares = [];
let score = 0;
const scoreDisplay = document.getElementById("score");
// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty


const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

function createBoard(){
      for(let i=0;i<layout.length;i++) {
        const square = document.createElement("div");
        grid.appendChild(square);
        squares.push(square);

        if(layout[i] === 0) {
            squares[i].classList.add("pac-dot")
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall') 
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair') 
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
    }
}
createBoard()





//starting position of Pacman.
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add("pacman");


// moving the pacman 
document.addEventListener('keydown' , control);
function  control(e) {

        squares[pacmanCurrentIndex].classList.remove("pacman");
        if(e.key === "ArrowUp") {
            if (
                !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width >=0
                ) 
                pacmanCurrentIndex -= width
        } 
        else if(e.key === "ArrowDown") {
            if(
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                pacmanCurrentIndex + width < width * width
                ) 
                pacmanCurrentIndex += width
        }
        else if(e.key === "ArrowRight") {
            if(
                !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
                pacmanCurrentIndex % width < width -1
                ) 
                pacmanCurrentIndex +=1
                if (pacmanCurrentIndex === 391) {
                    pacmanCurrentIndex = 364
                }
        }
        else if(e.key === "ArrowLeft") {
            if( 
                !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
                pacmanCurrentIndex % width !==0
                ) 
                pacmanCurrentIndex -=1
                if (pacmanCurrentIndex === 364) {
                    pacmanCurrentIndex = 391
                }
        }
        squares[pacmanCurrentIndex].classList.add("pacman");
        pacDotEaten();  
        powerPelletEaten();
        gameOver();
        checkForWin();
        gameOver();
    
}

function pacDotEaten() {
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        score++;
        
        scoreDisplay.innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
}

function  powerPelletEaten() {
    if(squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
         //add a score of 10 if pacman has eaten a power pallet
         squares[pacmanCurrentIndex].classList.remove('power-pellet')
        
        score += 10;
        scoreDisplay.innerHTML = score; 
        //change each of the four ghosts to isScared
        ghosts.forEach(ghost => {
            ghost.isScared = true;
        });
        //removing power pallets
       
        //use setTimeout to unscare ghosts after 10 seconds    
        setTimeout(unScareGhosts 
        , 10000);
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

// describing the ghosts. 
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new Ghost('blinky' , 348, 250) ,
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

//putting the ghosts on the board

ghosts.forEach(ghost => {
    squares[ghost.startIndex].classList.add(ghost.className);
    // Invisible class to identify the ghost.
    squares[ghost.currentIndex].classList.add('ghost');
});

// move the ghosts
ghosts.forEach(ghost => {moveGhost(ghost)});

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    
    ghost.timerId = setInterval(() => {

        if(
            ghost.currentIndex + direction >= 0 && 
            ghost.currentIndex + direction < width*width &&
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
          )
        {
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost');
            squares[ghost.currentIndex].classList.remove('scared-ghost');
            ghost.currentIndex += direction;
            squares[ghost.currentIndex].classList.add(ghost.className);
            squares[ghost.currentIndex].classList.add('ghost');
        }
        else {
            direction = directions[Math.floor(Math.random() * directions.length)];
        }

        // if ghost is currently scared 
        if(ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        //if the ghost is currently scared AND pacman is on it
        if(squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
            squares[pacmanCurrentIndex].classList.remove('ghost');
            squares[pacmanCurrentIndex].classList.remove('scared-ghost');
            squares[pacmanCurrentIndex].classList.remove(ghost.className);
            ghost.currentIndex = ghost.startIndex;
            score += 100;
            scoreDisplay.innerHTML = score;
            squares[ghost.currentIndex].classList.add('ghost');
            squares[ghost.currentIndex].classList.add(ghost.className);
        }

    }, ghost.speed);

}

function gameOver() {
    // if the square  pacman is in contains a ghost AND the square does NOT contain a scared ghost
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost') 
     ) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        // document.removeEventListener('keydown',);
        scoreDisplay.innerHTML = "You Lose";
        document.removeEventListener('keydown',control)
    }
}

function checkForWin() {
    if(score >= 300) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));

        scoreDisplay.innerHTML = "You Won";
        document.removeEventListener('keydown',control)
    }
}