let xSize = 32;
let ySize = 16;
let myGrid = [];
let mouseDown = false;
let myColor = "rgb(112, 112, 112)";
let rainbowMode = false;

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
    myGrid[ySize-1][xSize-1].style.setProperty('border-bottom-right-radius', "20px");
    myGrid[ySize-1][0].style.setProperty('border-bottom-left-radius', "20px");
    myGrid[0][xSize-1].style.setProperty('border-top-right-radius', "20px");
    myGrid[0][0].style.setProperty('border-top-left-radius', "20px");
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

function initializeGrid(){
    console.log(gridSizeSlider_element.value);
    ySize = gridSizeSlider_element.value/2;
    xSize = gridSizeSlider_element.value;

    generateGrid();
    appendGrid();

    gridSizeLabel_element.textContent = `${xSize}x${ySize}`
}

//Event functions for sketch grid
function colorBackground(e) {
    if(e.type!=='mousemove' || mouseDown===false) return; // skip if it's not a transform
    console.log("mouseDown: ", mouseDown);
    if (rainbowMode === true) {
        myColor=`#${Math.floor(Math.random()*16777215).toString(16)}`;
    }
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
    resetBtn_element.classList.add('btnClicked');
}
function updateGridSizeLabel(e){
    if (e.type!=='input') return;
    while(sketchGrid_element.firstChild){
        sketchGrid_element.removeChild(sketchGrid_element.firstChild);
    }
    initializeGrid();
}
function removeTransition(e) {
    if(e.propertyName!=='transform') return; // skip if it's not a transform
    this.classList.remove('btnClicked');
}
function updateColor(e) {
    if (e.type!=='input') return;  
    myColor = `${colorPicker_element.value}`;
}
function toggleRainbow(e) {
    if (e.type!=='click') return; 
    //myColor = `${colorPicker_element.value}`;
    if (rainbowMode === true) {
        rainbowMode = false;
        rgbBtn_element.classList.remove('btnClicked');
    }
    else {
        rainbowMode = true;
        rgbBtn_element.classList.add('btnClicked');
    }
}
//End of event functions for sketch grid


//element queries
const sketchBody_element = document.querySelector('#sketchBody');
const resetBtn_element = document.querySelector('#resetBtn');
const sketchGrid_element = document.querySelector('#sketchGrid');
const gridSizeSlider_element = document.querySelector('#gridSizeSlider');
const gridSizeLabel_element = document.querySelector('#gridSizeLabel');
const colorPicker_element = document.querySelector('#colorPicker');
const rgbBtn_element = document.querySelector('#rgbBtn');
const sketchGrid_width = sketchGrid_element.offsetWidth;
const sketchGrid_height = sketchGrid_element.offsetHeight;

//event listeners
sketchBody_element.addEventListener('mouseup', stopDraw);
resetBtn_element.addEventListener("click", resetGrid);
resetBtn_element.addEventListener("transitionend", removeTransition);
gridSizeSlider_element.addEventListener("input", updateGridSizeLabel)
colorPicker_element.addEventListener("input", updateColor);
rgbBtn_element.addEventListener("click", toggleRainbow);
//rgbBtn_element.addEventListener("transitionend", removeTransition);

initializeGrid();
