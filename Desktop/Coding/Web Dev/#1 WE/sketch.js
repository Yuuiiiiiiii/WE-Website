// // Game Logic

// var cols, rows;
// var w = 40;
// var grid = [];                  // create a array to collect cell
// var current;
// var stack = [];
// const { PI, sin, cos, abs, pow, sqrt } = Math; // Destructure Math object for better performance
// var count = 0;
// const gridMap = {};
// var canvas;
// var keysCollected = JSON.parse(localStorage.getItem("keysCollected")) || { pudding: false, tiramisu: false, souffle: false };
// var pudding, tiramisu, souffle; // Declare global variables

// function preload() {
//     heartShape = loadStrings('heart.txt');
//     avatarGif = createImg("assets/avatar.GIF", "");
//     avatarGif.style("display", "none");
//     onePieceImg = loadImage("assets/dog_processed.png");
//     puddingImg = loadImage("assets/pudding.png");
//     tiramisuImg = loadImage("assets/tiramisu.jpg");
// }

// function setup() {
//     canvas = createCanvas(900, 900);
//     frameRate(200);

//     initializeGrid();
//     loadAvatarPosition();
//     placeRooms();
//     checkOnePiece();

//     current = grid[0] || null;
// }

// function initializeGrid() {
//     let storedGrid = localStorage.getItem("grid");

//     if (storedGrid) {
//         console.log("✅ Restoring grid from localStorage.");
//         let parsedGrid = JSON.parse(storedGrid);
//         grid = parsedGrid.map(cellData => new Cell(cellData.i, cellData.j));
//     } else {
//         console.log("⚠️ No saved grid found, generating new grid.");
//         cols = heartShape[0].length;
//         rows = heartShape.length;
//         w = width / cols;

//         for (var i = 0; i < rows; i++) {
//             for (var j = 0; j < cols; j++) {
//                 if (heartShape[i][j] == "1") {
//                     var cell = new Cell(i, j);
//                     grid.push(cell);
//                     gridMap[`${i},${j}`] = grid.length - 1;
//                 }
//             }
//         }
//         localStorage.setItem("grid", JSON.stringify(grid.map(cell => ({ i: cell.i, j: cell.j }))));
//     }
// }

// function loadAvatarPosition() {
//     let savedI = localStorage.getItem("avatar_i");
//     let savedJ = localStorage.getItem("avatar_j");

//     if (savedI !== null && savedJ !== null) {
//         avatar = new Avatar(parseInt(savedI), parseInt(savedJ));
//     } else {
//         avatar = new Avatar(grid[0].i, grid[0].j);
//     }
// }

// function placeRooms() {
//     console.log("🛠 Running placeRooms()...");

//     let roomData = localStorage.getItem("roomData");

//     if (roomData) {
//         console.log("✅ Restoring room positions from localStorage.");
//         roomData = JSON.parse(roomData);
//         pudding = new Room(roomData.pudding.i, roomData.pudding.j, "pudding", puddingImg);
//         tiramisu = new Room(roomData.tiramisu.i, roomData.tiramisu.j, "tiramisu", tiramisuImg);
//     } else {
//         let availableCells = [...grid];
//         shuffleArray(availableCells);

//         pudding = new Room(availableCells[0].i, availableCells[0].j, "pudding", puddingImg);
//         tiramisu = new Room(availableCells[1].i, availableCells[1].j, "tiramisu", tiramisuImg);

//         let newRoomData = {
//             pudding: { i: pudding.i, j: pudding.j },
//             tiramisu: { i: tiramisu.i, j: tiramisu.j }
//         };
//         localStorage.setItem("roomData", JSON.stringify(newRoomData));
//     }
// }

// function checkOnePiece() {
//     let centerI = floor(rows / 2);
//     let centerJ = floor(cols / 2);
//     let onePieceIndex = index(centerI, centerJ);

//     while (onePieceIndex === -1) {
//         centerI--;
//         onePieceIndex = index(centerI, centerJ);
//     }

//     onePiece = new OnePiece(centerI, centerJ);
// }

// function draw() {
//     clear();
//     grid.forEach(cell => cell.show());
//     avatar.show();
//     if (pudding) pudding.show();
//     if (tiramisu) tiramisu.show();
//     if (onePiece) onePiece.show();

//     [pudding, tiramisu].forEach(room => room?.checkInteraction(avatar));
//     onePiece?.checkKey(avatar);

//     var next = current.checkNeighbors();
//     if (next) {
//         stack.push(current);
//         current.highlight();
//         removeWalls(current, next);
//         current = next;
//     } else if (stack.length > 0) {
//         current = stack.pop();
//     }
// }

// function index(i, j) {
//     return gridMap.hasOwnProperty(`${i},${j}`) ? gridMap[`${i},${j}`] : -1;

// }
// // Define these cell functions in the Cell object means that each instance of cell gets its own copy of these functions
// // So each cell can manage its own behavior
// // So cell.show() will work for each specific cell
// // Otherwise, if we define these functions outside of the Cell object, we would have to pass the cell object to the function
// // Like show(somecell) which is not as clean as cell.show().
// // This is the concept of Object Oriented Programming (OOP)

// function Cell(i, j) {
//     this.i = i;
//     this.j = j;
//     this.walls = [true, true, true, true]
//     this.show = function() {
//         var x = this.j * w;     // Convert column index into x-coordinate    
//         var y = this.i * w;
//         stroke(255);             // Set the border color
//         if (this.walls[0] && index(this.i - 1, this.j) != -1) {
//             line(x  , y  , x+w, y  )
//         }
//         if (this.walls[1] && index(this.i, this.j + 1) != -1) {
//             line(x+w, y  , x+w, y+w)
//         }
//         if (this.walls[2] && index(this.i + 1, this.j) != -1) {
//             line(x+w, y+w, x  , y+w)
//         }
//         if (this.walls[3] && index(this.i, this.j - 1) != -1) {
//             line(x  , y+w, x  , y  )
//         }
        
//         if (this.visited) {
//             noStroke();
//             fill(255,0,255,100);
//             rect(x,y,w,w);
//         }
//         // noFill();               // DO not fill the cell with color 
//         //rect(x,y,w,w);          // draw a square at(x,y) with width w 
//                                 // x,y is the top left corner of the square; w is the width and height of the square                   
//     }

//     this.highlight = function() {
//         console.log("highlight");
//         var x = this.j * w;
//         var y = this.i * w;
//         noStroke();
//         fill(0,255,255,100);
//         rect(x,y,w,w);
//     }

//     this.checkNeighbors = function() {
//         var neighbors = []
        
//         var topIndex = index(this.i - 1, this.j);
//         var rightIndex = index(this.i, this.j + 1);
//         var bottomIndex = index(this.i + 1, this.j);
//         var leftIndex = index(this.i, this.j - 1);

//         var top = (topIndex != -1) ? grid[topIndex] : null          // syntax: Condition ? value_if_true : value_if_false  
//         var right = (rightIndex != -1) ? grid[rightIndex] : null
//         var bottom = (bottomIndex != -1) ? grid[bottomIndex] : null
//         var left = (leftIndex != -1) ? grid[leftIndex] : null

//         if (top && !top.visited) {
//             neighbors.push(top);
//         }
//         if (right && !right.visited) {
//             neighbors.push(right);
//         }
//         if (bottom && !bottom.visited) {
//             neighbors.push(bottom);
//         }
//         if (left && !left.visited) {
//             neighbors.push(left);
//         }

//         if (neighbors.length > 0) {
//             var r = floor(random(0, neighbors.length));  //floor() is to ensure the output is an integer 
//             return neighbors[r];
//         } else {
//             return undefined;
//         }
//     }
// }


// function removeWalls(a, b) {
//     if (!a || !b) {         // if a or b is undefined or null, return
//         return;
//     }

//     var x = a.j - b.j;
//     var y = a.i - b.i;
//     if (x == 1) {
//         a.walls[3] = false;
//         b.walls[1] = false;
//     } else if (x == -1) {
//         a.walls[1] = false;
//         b.walls[3] = false;
//     }
//     if (y == 1) {
//         a.walls[0] = false;
//         b.walls[2] = false;
//     } else if (y == -1) {
//         a.walls[2] = false;
//         b.walls[0] = false;
//     }
// }

// class Avatar {
//     constructor(i, j) {
//         this.i = i;
//         this.j = j;
//         this.x = this.j * w + w / 2;      // center the avatar in the cell
//         this.y = this.i * w + w / 2;
//         this.size = w; 
//         avatarGif.position(this.x, this.y);
//         avatarGif.size(this.size, this.size)
//         avatarGif.style("display", "block");
//     }
    
//     show() {
//         let canvasX = canvas.elt.offsetLeft;
//         let canvasY = canvas.elt.offsetTop;
    
//         avatarGif.position(
//             canvasX + this.x - this.size / 2,  // Adjust for the canvas
//             canvasY + this.y - this.size / 2
//         );
        
//         avatarGif.size(this.size, this.size);
//     }
    

//     move(di, dj) {
//         let newI = this.i + di;
//         let newJ = this.j + dj;

//         let neighborIndex = index(newI, newJ);
//         if (neighborIndex != -1) {
//             let nextCell = grid[neighborIndex];
//             if (!this.checkWall(nextCell)) {
//                 this.i = newI;
//                 this.j = newJ;
//                 this.x = this.j * w + w / 2;
//                 this.y = this.i * w + w / 2;
                
//                 if (pudding) pudding.checkInteraction(this);
//                 if (tiramisu) tiramisu.checkInteraction(this);
//                 if (souffle) souffle.checkInteraction(this);
    
//                 onePiece.checkKey(this);
//             }
//         }
//     }

//     checkWall(nextCell) {
//         let currentCell = grid[index(this.i, this.j)];

//         if(!currentCell || !nextCell) return true;

//         if(nextCell.i > currentCell.i && currentCell.walls[2]) return true;
//         if(nextCell.i < currentCell.i && currentCell.walls[0]) return true;
//         if(nextCell.j > currentCell.j && currentCell.walls[1]) return true;
//         if(nextCell.j < currentCell.j && currentCell.walls[3]) return true;

//         return false;
//     }
// }

// class Room {
//     constructor(i, j, type, img) {
//         this.i = i;
//         this.j = j;
//         this.x = this.j * w + w / 2;
//         this.y = this.i * w + w / 2;
//         this.size = w;
//         this.type = type;
//         this.img = img;
//         this.visited = localStorage.getItem(type) === "true";
//     }

//     show() {
//         if (!this.visited) {
//             imageMode(CENTER);
//             image(this.img, this.x, this.y, this.size, this.size);
//         }
//     }

//     checkInteraction(avatar) {
//         if (avatar.i === this.i && avatar.j === this.j && !this.visited) {
//             this.visited = true;
//             localStorage.setItem(this.type, "true");
//             localStorage.setItem("avatar_i", avatar.i);
//             localStorage.setItem("avatar_j", avatar.j);

//             let keys = JSON.parse(localStorage.getItem("keysCollected")) || {};
//             keys[this.type] = true;
//             localStorage.setItem("keysCollected", JSON.stringify(keys));

//             setTimeout(() => window.location.href = `${this.type}.html`, 100);
//         }
//     }
// }

// class OnePiece {
//     constructor(i, j) {
//         this.i = i;
//         this.j = j;
//         this.x = this.j * w + w / 2;
//         this.y = this.i * w + w / 2;
//         this.size = w;
//         this.locked = true;
//     }

//     show() {
//         imageMode(CENTER);
//         if (this.locked) {
//             fill(150);
//             rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
//         } else {
//             image(onePieceImg, this.x, this.y, this.size, this.size);
//         }
//     }

//     checkKey(avatar) {
//         let keys = JSON.parse(localStorage.getItem("keysCollected")) || {};
//         if (keys.pudding && keys.tiramisu) {
//             this.locked = false;
//             setTimeout(() => window.location.href = "onePiece.html", 500);
//         }
//     }
// }


// function keyPressed() {             // The keyPressed() function is called once every time a key is pressed
//     if (key === "W" || key ==="w") avatar.move(-1, 0);
//     if (key === "S" || key ==="s") avatar.move(1, 0);  
//     if (key === "A" || key ==="a") avatar.move(0, -1);
//     if (key === "D" || key ==="d") avatar.move(0, 1);
// }

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }

// function restartGame() {
//     localStorage.clear(); // 🔹 Clear everything
//     window.location.reload();
// }











// // Game Logic
// console.log("🛠 Generating Maze...");

// // Global variables
// var cols, rows;
// var w = 40;
// var grid = [];  
// var current;
// var stack = [];
// const { PI, sin, cos, abs, pow, sqrt } = Math; 
// var count = 0;
// const gridMap = {};
// var canvas;

// // Load assets properly
// function preload() {
//     heartShape = loadStrings('heart.txt')
//     avatarGif = createImg("assets/avatar.GIF", "");
//     avatarGif.style("display", "none");
//     onePieceImg = loadImage("assets/dog_processed.png");
//     puddingImg = loadImage("assets/pudding.png");
//     tiramisuImg = loadImage("assets/tiramisu.jpg");
// }

// function setup() {
//     canvas = createCanvas(900, 900);  // create a canvas with width and height of the window
//     frameRate(200);          // set the frame rate of the canvas
    
//     initializeGrid();    // 🔹 Setup grid
//     loadAvatarPosition(); // 🔹 Load or create avatar
//     checkOnePiece();    // 🔹 Find One Piece location
//     checkPudding();     // 🔹 Find Pudding location

//     current = grid[0];
// }

// function initializeGrid() {
//     cols = heartShape[0].length;
//     rows = heartShape.length;
//     w = width / cols;

//     for (var i = 0; i < rows; i++) {
//         for (var j = 0; j < cols; j++) {
//             if (heartShape[i][j] == "1") {
//                 var cell = new Cell(i, j);
//                 grid.push(cell);
//                 gridMap[`${i},${j}`] = count;
//                 count++;
//             }
//         }
//     }
// }

// function loadAvatarPosition() {
//     let savedI = localStorage.getItem("avatar_i");
//     let savedJ = localStorage.getItem("avatar_j");

//     if (savedI !== null && savedJ !== null) {
//         avatar = new Avatar(parseInt(savedI), parseInt(savedJ)); // 🔹 Restore position
//     } else {
//         avatar = new Avatar(grid[0].i, grid[0].j); // 🔹 Default start
//     }

//     // 🔹 Remove stored position after using it
//     localStorage.removeItem("avatar_i");
//     localStorage.removeItem("avatar_j");
// }

// function checkOnePiece() {
//     let centerI = floor(rows / 2);
//     let centerJ = floor(cols / 2);
//     let onePieceIndex = index(centerI, centerJ);

//     while (onePieceIndex === -1) {
//         centerI--;
//         onePieceIndex = index(centerI, centerJ);
//     }

//     onePiece = new OnePiece(centerI, centerJ);
// }

// function checkPudding() {
//     let puddingCell = null;

//     for (let i = 0; i < grid.length; i++) {
//         if (grid[i].i >= rows * 0.5 && grid[i].j <= cols * 0.5) {
//             puddingCell = grid[i];
//             break;
//         }
//     }

//     if (puddingCell) {
//         pudding = new Pudding(puddingCell.i, puddingCell.j);
//     } else {
//         console.warn("⚠️ No valid pudding location found!");
//     }
// }


// function draw() {               //The Draw function is automatically called repeatedly by p5.js
//     clear();
//     for (var i = 0; i < grid.length; i++) {
//         grid[i].show()          //The purpose is to draw the cell on the canvas (will be defined in the Cell())
//     }

//     avatar.show();
//     onePiece.show();
//     pudding.show();
//     pudding.checkInteraction(avatar);
//     onePiece.checkKey(avatar);


//     current.visited = true;
//     // Step 1
//     var next = current.checkNeighbors();
//     if (next) {
//         next.visited = true;
//         //Step 2
//         stack.push(current)
//         // Step 3
//         current.highlight();
//         removeWalls(current, next);

//         current = next;
//     } else if (stack.length > 0) {
//         current = stack.pop();
//     }
// }


// function index(i, j) {
//     return gridMap.hasOwnProperty(`${i},${j}`) ? gridMap[`${i},${j}`] : -1;

// }
// // Define these cell functions in the Cell object means that each instance of cell gets its own copy of these functions
// // So each cell can manage its own behavior
// // So cell.show() will work for each specific cell
// // Otherwise, if we define these functions outside of the Cell object, we would have to pass the cell object to the function
// // Like show(somecell) which is not as clean as cell.show().
// // This is the concept of Object Oriented Programming (OOP)

// function Cell(i, j) {
//     this.i = i;
//     this.j = j;
//     this.walls = [true, true, true, true]
//     this.show = function() {
//         var x = this.j * w;     // Convert column index into x-coordinate    
//         var y = this.i * w;
//         stroke(255);             // Set the border color
//         if (this.walls[0] && index(this.i - 1, this.j) != -1) {
//             line(x  , y  , x+w, y  )
//         }
//         if (this.walls[1] && index(this.i, this.j + 1) != -1) {
//             line(x+w, y  , x+w, y+w)
//         }
//         if (this.walls[2] && index(this.i + 1, this.j) != -1) {
//             line(x+w, y+w, x  , y+w)
//         }
//         if (this.walls[3] && index(this.i, this.j - 1) != -1) {
//             line(x  , y+w, x  , y  )
//         }
        
//         if (this.visited) {
//             noStroke();
//             fill(255,0,255,100);
//             rect(x,y,w,w);
//         }
//         // noFill();               // DO not fill the cell with color 
//         //rect(x,y,w,w);          // draw a square at(x,y) with width w 
//                                 // x,y is the top left corner of the square; w is the width and height of the square                   
//     }

//     this.highlight = function() {
//         console.log("highlight");
//         var x = this.j * w;
//         var y = this.i * w;
//         noStroke();
//         fill(0,255,255,100);
//         rect(x,y,w,w);
//     }

//     this.checkNeighbors = function() {
//         var neighbors = []
        
//         var topIndex = index(this.i - 1, this.j);
//         var rightIndex = index(this.i, this.j + 1);
//         var bottomIndex = index(this.i + 1, this.j);
//         var leftIndex = index(this.i, this.j - 1);

//         var top = (topIndex != -1) ? grid[topIndex] : null          // syntax: Condition ? value_if_true : value_if_false  
//         var right = (rightIndex != -1) ? grid[rightIndex] : null
//         var bottom = (bottomIndex != -1) ? grid[bottomIndex] : null
//         var left = (leftIndex != -1) ? grid[leftIndex] : null

//         if (top && !top.visited) {
//             neighbors.push(top);
//         }
//         if (right && !right.visited) {
//             neighbors.push(right);
//         }
//         if (bottom && !bottom.visited) {
//             neighbors.push(bottom);
//         }
//         if (left && !left.visited) {
//             neighbors.push(left);
//         }

//         if (neighbors.length > 0) {
//             var r = floor(random(0, neighbors.length));  //floor() is to ensure the output is an integer 
//             return neighbors[r];
//         } else {
//             return undefined;
//         }
//     }
// }


// function removeWalls(a, b) {
//     if (!a || !b) {         // if a or b is undefined or null, return
//         return;
//     }

//     var x = a.j - b.j;
//     var y = a.i - b.i;
//     if (x == 1) {
//         a.walls[3] = false;
//         b.walls[1] = false;
//     } else if (x == -1) {
//         a.walls[1] = false;
//         b.walls[3] = false;
//     }
//     if (y == 1) {
//         a.walls[0] = false;
//         b.walls[2] = false;
//     } else if (y == -1) {
//         a.walls[2] = false;
//         b.walls[0] = false;
//     }
// }

// class Avatar {
//     constructor(i, j) {
//         this.i = i;
//         this.j = j;
//         this.x = this.j * w + w / 2;      // center the avatar in the cell
//         this.y = this.i * w + w / 2;
//         this.size = w; 
//         avatarGif.position(this.x, this.y);
//         avatarGif.size(this.size, this.size)
//         avatarGif.style("display", "block");
//     }
    
//     show() {
//         let canvasX = canvas.elt.offsetLeft;
//         let canvasY = canvas.elt.offsetTop;
    
//         avatarGif.position(
//             canvasX + this.x - this.size / 2,  // Adjust for the canvas
//             canvasY + this.y - this.size / 2
//         );
        
//         avatarGif.size(this.size, this.size);
//     }
    

//     move(di, dj) {
//         let newI = this.i + di;
//         let newJ = this.j + dj;

//         let neighborIndex = index(newI, newJ);
//         if (neighborIndex != -1) {
//             let nextCell = grid[neighborIndex];
//             if (!this.checkWall(nextCell)) {
//                 this.i = newI;
//                 this.j = newJ;
//                 this.x = this.j * w + w / 2;
//                 this.y = this.i * w + w / 2;
                
//                 localStorage.setItem("pudding_activated", "false");
//                 onePiece.checkKey(this);
//                 pudding.checkInteraction(this);
//             }
//         }
//     }

//     checkWall(nextCell) {
//         let currentCell = grid[index(this.i, this.j)];

//         if(!currentCell || !nextCell) return true;

//         if(nextCell.i > currentCell.i && currentCell.walls[2]) return true;
//         if(nextCell.i < currentCell.i && currentCell.walls[0]) return true;
//         if(nextCell.j > currentCell.j && currentCell.walls[1]) return true;
//         if(nextCell.j < currentCell.j && currentCell.walls[3]) return true;

//         return false;
//     }
// }

// class OnePiece {
//     constructor(i, j) {
//         this.i = i;
//         this.j = j;
//         this.x = this.j * w + w / 2;
//         this.y = this.i * w + w / 2;
//         this.size = w;
//         this.keyGet = false;
//      }

//      show() {
//         if (!this.keyGet) {
//             imageMode(CENTER);
//             image(onePieceImg, this.x, this.y, this.size, this.size);
//         }
//      }

//     checkKey(avatar) {
//         if (avatar.i == this.i && avatar.j == this.j) {
//             this.keyGet = true;
//             noLoop();  // Stop draw() from running
//             document.location.href = "onePiece.html";  // Fastest redirect
//         }
//     }
// }

// function keyPressed() {             // The keyPressed() function is called once every time a key is pressed
//     if (key === "W" || key ==="w") avatar.move(-1, 0);
//     if (key === "S" || key ==="s") avatar.move(1, 0);  
//     if (key === "A" || key ==="a") avatar.move(0, -1);
//     if (key === "D" || key ==="d") avatar.move(0, 1);
// }

// class Pudding {
//     constructor(i, j) {
//         this.i = i;
//         this.j = j;
//         this.x = this.j * w + w / 2;
//         this.y = this.i * w + w / 2;
//         this.size = w;
//         this.activated = localStorage.getItem("pudding_activated") === "true";  // Prevent multiple triggers
//     }

//     show() {
//         fill(255, 204, 0); // Pudding color
//         noStroke();
//         ellipse(this.x, this.y, this.size, this.size);
//     }

//     checkInteraction(avatar) {
//         if (avatar.i === this.i && avatar.j === this.j && !this.activated) {
            
//             this.activated = true;
//             localStorage.setItem("pudding_activated", "true"); 
//             localStorage.setItem("avatar_i", avatar.i);
//             localStorage.setItem("avatar_j", avatar.j);

//             setTimeout(() => {
//                 window.location.href = "pudding.html"; // Redirect once
//             }, 100);
//         }
//     }
// }



// Game Logic
console.log("🛠 Generating Maze...");

// Global variables
var cols, rows;
var w = 40;
var grid = [];  
var current;
var stack = [];
const { PI, sin, cos, abs, pow, sqrt } = Math; 
var count = 0;
const gridMap = {};
var canvas;
var keyCount = 0; // Track how many keys (Pudding + Tiramisu) have been collected

// Load assets properly
function preload() {
    heartShape = loadStrings('heart.txt');
    avatarGif = createImg("assets/avatar.GIF", "");
    avatarGif.style("display", "none");
    onePieceImg = loadImage("assets/dog_processed.png");
    puddingImg = loadImage("assets/pudding.png");
    tiramisuImg = loadImage("assets/tiramisu.jpg");
}

function setup() {
    canvas = createCanvas(900, 900);  
    frameRate(200); 
    
    initializeGrid();    
    loadAvatarPosition(); 
    checkOnePiece();    
    checkPudding();     
    checkTiramisu();   

    current = grid[0];
}

function initializeGrid() {
    cols = heartShape[0].length;
    rows = heartShape.length;
    w = width / cols;

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (heartShape[i][j] == "1") {
                var cell = new Cell(i, j);
                grid.push(cell);
                gridMap[`${i},${j}`] = count;
                count++;
            }
        }
    }
}

function loadAvatarPosition() {
    avatar = new Avatar(grid[0].i, grid[0].j);
}

function checkOnePiece() {
    let centerI = floor(rows / 2);
    let centerJ = floor(cols / 2);
    let onePieceIndex = index(centerI, centerJ);

    while (onePieceIndex === -1) {
        centerI--;
        onePieceIndex = index(centerI, centerJ);
    }

    onePiece = new OnePiece(centerI, centerJ);
}

function checkPudding() {
    let puddingCell = grid[floor(random(grid.length))];
    pudding = new Pudding(puddingCell.i, puddingCell.j);
}

function checkTiramisu() {
    let tiramisuCell = grid[floor(random(grid.length))];
    tiramisu = new Tiramisu(tiramisuCell.i, tiramisuCell.j);
}

function draw() {               
    clear();
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();          
    }

    avatar.show();
    onePiece.show();
    pudding.show();
    tiramisu.show();

    pudding.checkInteraction(avatar);
    tiramisu.checkInteraction(avatar);
    onePiece.checkKey(avatar);

    current.visited = true;
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        stack.push(current);
        current.highlight();
        removeWalls(current, next);
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }
}

// ✅ Cell function to generate maze properly
function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];

    this.show = function() {
        var x = this.j * w;
        var y = this.i * w;
        stroke(255);
        if (this.walls[0]) line(x, y, x + w, y);
        if (this.walls[1]) line(x + w, y, x + w, y + w);
        if (this.walls[2]) line(x + w, y + w, x, y + w);
        if (this.walls[3]) line(x, y + w, x, y);
        
        if (this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, w, w);
        }
    };

    this.highlight = function() {
        var x = this.j * w;
        var y = this.i * w;
        noStroke();
        fill(0, 255, 255, 100);
        rect(x, y, w, w);
    };

    this.checkNeighbors = function() {
        var neighbors = [];
        var directions = [
            [this.i - 1, this.j],
            [this.i, this.j + 1],
            [this.i + 1, this.j],
            [this.i, this.j - 1]
        ];
        
        for (let dir of directions) {
            let neighborIndex = index(dir[0], dir[1]);
            if (neighborIndex != -1 && !grid[neighborIndex].visited) {
                neighbors.push(grid[neighborIndex]);
            }
        }

        return neighbors.length > 0 ? random(neighbors) : undefined;
    };
}

function removeWalls(a, b) {
    var x = a.j - b.j;
    var y = a.i - b.i;
    if (x == 1) { a.walls[3] = false; b.walls[1] = false; }
    else if (x == -1) { a.walls[1] = false; b.walls[3] = false; }
    if (y == 1) { a.walls[0] = false; b.walls[2] = false; }
    else if (y == -1) { a.walls[2] = false; b.walls[0] = false; }
}

class Avatar {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.x = this.j * w + w / 2;      // center the avatar in the cell
        this.y = this.i * w + w / 2;
        this.size = w; 
        avatarGif.position(this.x, this.y);
        avatarGif.size(this.size, this.size)
        avatarGif.style("display", "block");
    }
    
    show() {
        let canvasX = canvas.elt.offsetLeft;
        let canvasY = canvas.elt.offsetTop;
    
        avatarGif.position(
            canvasX + this.x - this.size / 2,  // Adjust for the canvas
            canvasY + this.y - this.size / 2
        );
        
        avatarGif.size(this.size, this.size);
    }
    

    move(di, dj) {
        let newI = this.i + di;
        let newJ = this.j + dj;

        let neighborIndex = index(newI, newJ);
        if (neighborIndex != -1) {
            let nextCell = grid[neighborIndex];
            if (!this.checkWall(nextCell)) {
                this.i = newI;
                this.j = newJ;
                this.x = this.j * w + w / 2;
                this.y = this.i * w + w / 2;
                
                localStorage.setItem("pudding_activated", "false");
                onePiece.checkKey(this);
                pudding.checkInteraction(this);
            }
        }
    }

    checkWall(nextCell) {
        let currentCell = grid[index(this.i, this.j)];

        if(!currentCell || !nextCell) return true;

        if(nextCell.i > currentCell.i && currentCell.walls[2]) return true;
        if(nextCell.i < currentCell.i && currentCell.walls[0]) return true;
        if(nextCell.j > currentCell.j && currentCell.walls[1]) return true;
        if(nextCell.j < currentCell.j && currentCell.walls[3]) return true;

        return false;
    }
}

class OnePiece {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.x = this.j * w + w / 2;
        this.y = this.i * w + w / 2;
        this.size = w;
        this.keyGet = false;
        }

        show() {
        if (!this.keyGet) {
            imageMode(CENTER);
            image(onePieceImg, this.x, this.y, this.size, this.size);
        }
        }

    checkKey(avatar) {
        if (avatar.i == this.i && avatar.j == this.j) {
            this.keyGet = true;
            noLoop();  // Stop draw() from running
            document.location.href = "onePiece.html";  // Fastest redirect
        }
    }
}

class Pudding {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.size = w;
    }

    show() {
        imageMode(CENTER); // ✅ Center the image inside the cell
        image(puddingImg, this.j * w + w / 2, this.i * w + w / 2, this.size, this.size);
    }

    checkInteraction(avatar) {
        if (avatar.i === this.i && avatar.j === this.j) {
            keyCount++;
            noLoop();
            document.location.href = "pudding.html";
        }
    }
}

class Tiramisu {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.size = w;
    }

    show() {
        imageMode(CENTER); // ✅ Center the image inside the cell
        image(tiramisuImg, this.j * w + w / 2, this.i * w + w / 2, this.size, this.size);
    }

    checkInteraction(avatar) {
        if (avatar.i === this.i && avatar.j === this.j) {
            keyCount++;
            noLoop();
            document.location.href = "tiramisu.html";
        }
    }
}

function keyPressed() {             // The keyPressed() function is called once every time a key is pressed
    if (key === "W" || key ==="w") avatar.move(-1, 0);
    if (key === "S" || key ==="s") avatar.move(1, 0);  
    if (key === "A" || key ==="a") avatar.move(0, -1);
    if (key === "D" || key ==="d") avatar.move(0, 1);
}




function index(i, j) {
    return gridMap.hasOwnProperty(`${i},${j}`) ? gridMap[`${i},${j}`] : -1;

}
