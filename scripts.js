let xSize = 32;
let ySize = 16;
let myGrid = [];
let mouseDown = false;
let myColor = "rgb(112, 112, 112)";

function generateGrid(){
    for (y = 0; y < ySize ; y++){
        for (x = 0; x < xSize ; x++){
            
            if (!myGrid[y]) {myGrid[y] = [];}
            myGrid[y][x] = document.createElement("div");
            myGrid[y][x].addEventListener('mousemove', colorBackground);
            myGrid[y][x].addEventListener('mousedown', startDraw);
            myGrid[y][x].addEventListener('mouseup', stopDraw);
            myGrid[y][x].addEventListener('dragstart', (e) => {e.preventDefault()}) //prevents div from being draggable
            //myGrid[y][x].textContent = x+y;
            myGrid[y][x].classList.add("grid")
            myGrid[y][x].style.width = `${sketchGrid_width/xSize}px`;
            myGrid[y][x].style.height = `${sketchGrid_height/ySize}px`;
        }
    }
}

function appendGrid(){
    for (y = 0; y < ySize ; y++){
        const comment = document.createComment(`row ${y}`);
        sketchGrid_element.appendChild(comment);
        const tempDiv = document.createElement("div");
        sketchGrid_element.appendChild(tempDiv);
        tempDiv.classList.add("flex_row");
        for (x = 0; x < xSize ; x++){
    
            tempDiv.appendChild(myGrid[y][x]);
    
            
        }
        
    }
}

//Event functions for sketch grid
function colorBackground(e) {
    if(e.type!=='mousemove' || mouseDown===false) return; // skip if it's not a transform
    console.log("mouseDown: ", mouseDown);
    this.style.backgroundColor=myColor;

}
function startDraw(e) {
    if (e.type!=='mousedown') return;
    mouseDown = true;
}
function stopDraw(e) {
    if (e.type!=='mouseup') return;
    mouseDown = false;
}
function resetGrid(e) {
    if (e.type!=='click') return;
    for (y = 0; y < ySize ; y++){
        for (x = 0; x < xSize ; x++){
            myGrid[y][x].style.backgroundColor = "#D8D8D8"
        }
    }
}
//End of event functions for sketch grid

const resetBtn_element = document.querySelector('#resetBtn');
const sketchGrid_element = document.querySelector('#sketchGrid');
const sketchGrid_width = sketchGrid_element.offsetWidth;
const sketchGrid_height = sketchGrid_element.offsetHeight;

resetBtn_element.addEventListener("click", resetGrid);

generateGrid();
appendGrid();
