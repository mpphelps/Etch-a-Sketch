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
        const tempDiv = document.createElement("div");
        sketchGridElement.appendChild(tempDiv);
        tempDiv.classList.add("flex_row");
        for (x = 0; x < xSize ; x++){
            tempDiv.appendChild(myGrid[y][x]);
        }
        
    }
}

function initializeGrid(){
    console.log(gridSizeSliderElement.value);
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
    resetBtnElement.classList.add('btn-clicked');
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
function toggleRainbow(e) {
    if (e.type!=='click') return; 
    //myColor = `${colorPicker_element.value}`;
    if (rainbowMode === true) {
        rainbowMode = false;
        rgbBtnElement.classList.remove('btn-clicked');
    }
    else {
        rainbowMode = true;
        rgbBtnElement.classList.add('btn-clicked');
    }
}
//End of event functions for sketch grid


//element queries
const htmlElement = document.querySelector("html");
const resetBtnElement = document.querySelector('#reset-button');
const sketchGridElement = document.querySelector('#sketch-grid');
const gridSizeSliderElement = document.querySelector('#grid-size-slider');
const gridSizeLabelElement = document.querySelector('#grid-size-label');
const colorPickerElement = document.querySelector('#color-picker');
const rgbBtnElement = document.querySelector('#rgb-button');
const sketchGridWidth = sketchGridElement.offsetWidth;
const sketchGridHeight = sketchGridElement.offsetHeight;

//event listeners
resetBtnElement.addEventListener("click", resetGrid);
resetBtnElement.addEventListener("transitionend", removeTransition);
gridSizeSliderElement.addEventListener("input", updateGridSizeLabel)
colorPickerElement.addEventListener("input", updateColor);
rgbBtnElement.addEventListener("click", toggleRainbow);
//rgbBtn_element.addEventListener("transitionend", removeTransition);

initializeGrid();
