let xSize = 32;
let ySize = 16;
let myGrid = [];
let mouseDown = false;
let myColor = "rgb(112, 112, 112)";
let lastColor = myColor;
let mainBackgroundColor = window.getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color');
let rainbowMode = false;
let eraserMode = false;

function generateGrid(){
    for (y = 0; y < ySize ; y++){
        for (x = 0; x < xSize ; x++){
            if (!myGrid[y]) {myGrid[y] = [];}
            myGrid[y][x] = document.createElement("div");
            myGrid[y][x].addEventListener('mousemove', colorBackground);
            myGrid[y][x].addEventListener('mousedown', startDraw);
            myGrid[y][x].addEventListener('dragstart', (e) => {e.preventDefault()}) //prevents div from being draggable
            //myGrid[y][x].textContent = x+y;
            myGrid[y][x].classList.add("grid")
            myGrid[y][x].style.width = `${sketchGridWidth/xSize}px`;
            myGrid[y][x].style.height = `${sketchGridHeight/ySize}px`;
            
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
        sketchGridElement.appendChild(comment);

        const rowDiv = document.createElement("div");
        sketchGridElement.appendChild(rowDiv);
        rowDiv.classList.add("flex_row");
        for (x = 0; x < xSize ; x++){
            rowDiv.appendChild(myGrid[y][x]);
        }
    }
}

function initializeGrid(){
    ySize = gridSizeSliderElement.value/2;
    xSize = gridSizeSliderElement.value;

    htmlElement.addEventListener('mouseup', stopDraw);

    generateGrid();
    appendGrid();

    gridSizeLabelElement.textContent = `${xSize}x${ySize}`
}

//Event functions for sketch grid
function colorBackground(e) {
    if(e.type!=='mousemove' || mouseDown===false) return; // skip if it's not a transform
    console.log("mouseDown: ", mouseDown);
    if (rainbowMode === true) {
        myColor=`#${Math.floor(Math.random()*16777215).toString(16)}`;
    }
    if (eraserMode === true) {
        myColor = mainBackgroundColor;
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
    clearBtnElement.classList.add('btn-clicked');
}
function updateGridSizeLabel(e){
    if (e.type!=='input') return;
    while(sketchGridElement.firstChild){
        sketchGridElement.removeChild(sketchGridElement.firstChild);
    }
    initializeGrid();
}
function removeTransition(e) {
    if(e.propertyName!=='transform') return; // skip if it's not a transform
    this.classList.remove('btn-clicked');
}
function updateColor(e) {
    if (e.type!=='input') return;  
    myColor = `${colorPickerElement.value}`;
}
function toggleRainbowMode(e) {
    if (e.type!=='click') return; 
    if (rainbowMode === true) {
        turnOffRainbowMode();
    }
    else {
        turnOnRainbowMode();
        turnOffEraserMode();
    }
}
function turnOffRainbowMode() {
    rainbowMode = false;
    rgbBtnElement.classList.remove('btn-clicked');
}
function turnOnRainbowMode() {
    rainbowMode = true;
    rgbBtnElement.classList.add('btn-clicked');
}

function toggleEraserMode(e) {
    if (e.type!=='click') return; 
    //myColor = `${colorPicker_element.value}`;
    if (eraserMode === true) {
        turnOffEraserMode();
    }
    else {
        turnOnEraserMode();
        turnOffRainbowMode();
    }
}
function turnOffEraserMode() {
    myColor = lastColor;
    eraserMode = false;
    eraserBtnElement.classList.remove('btn-clicked');
}
function turnOnEraserMode() {
    lastColor = myColor;
    eraserMode = true;
    eraserBtnElement.classList.add('btn-clicked');
}


//element queries
const htmlElement = document.querySelector("html");
const clearBtnElement = document.getElementById('clear-button');
const eraserBtnElement = document.getElementById('eraser-button');
const sketchGridElement = document.getElementById('sketch-grid');
const gridSizeSliderElement = document.getElementById('grid-size-slider');
const gridSizeLabelElement = document.getElementById('grid-size-label');
const colorPickerElement = document.getElementById('color-picker');
const rgbBtnElement = document.getElementById('rgb-button');
const sketchGridWidth = sketchGridElement.offsetWidth;
const sketchGridHeight = sketchGridElement.offsetHeight;

//event listeners
clearBtnElement.addEventListener("click", resetGrid);
clearBtnElement.addEventListener("transitionend", removeTransition);
gridSizeSliderElement.addEventListener("input", updateGridSizeLabel)
colorPickerElement.addEventListener("input", updateColor);
rgbBtnElement.addEventListener("click", toggleRainbowMode);
eraserBtnElement.addEventListener("click", toggleEraserMode);
//rgbBtn_element.addEventListener("transitionend", removeTransition);

initializeGrid();
