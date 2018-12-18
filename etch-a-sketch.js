const container = document.querySelector("#container");
const colors = ["red", "green", "blue", "pink", "purple", "black", "cyan", 
"purple", "yellow", "orange"];
const shades = ["rgb(255, 255, 255)", "rgb(230, 230, 230)", "rgb(204, 204, 204)", 
"rgb(179, 179, 179)", "rgb(153, 153, 153)", "rgb(128, 128, 128)", "rgb(102, 102, 102)",
"rgb(77, 77, 77)", "rgb(51, 51, 51)", "rgb(26, 26, 26)", "rgb(0, 0, 0)"];

function randomColor(){
    let num = Math.floor(Math.random()*colors.length);
    return colors[num];
}
function darken(shade){
    if (shade=="#000000"){
        return "#000000";
    }
    else if (shade=="" || shade==shades[0]){
        return shades[1];
    }
    else{
        let i = shades.indexOf(shade);
        return shades[i+1];
    }
}

function populateGrid(size){
    var blocks = [];
    for (let i=1; i<=size*size; i++){
        let block = document.createElement("div");
        blocks.push(block);
        block.style.cssFloat = "left";
        block.style.height = `${640/size}px`;
        block.style.width = `${640/size}px`;
        block.style.border = "none";
        block.addEventListener("mouseenter", function(e){
            let shade = e.target.style.backgroundColor;
            e.target.style.backgroundColor = darken(shade);
        })
        

        container.appendChild(block);
        if (i%size==0){
            let br = document.createElement("br");
            br.style.clear = "left";
            container.appendChild(br);
            blocks.push(br);
        }
    }
    return blocks;
}

function clearGrid(grid){
    for (let i=0; i<grid.length; i++){
        grid[i].parentNode.removeChild(grid[i]);
    }
}

var blocks = populateGrid(16);
const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", function(){
    let size = prompt("Enter dimension for new grid. Must be a divisor of 640.", "16");
    if (size != null){
        while (640%size != 0 || size>128){
            if (size > 128){
                size = prompt("Too large! Enter a size: ", "16");
            }
            else {
                size = prompt("Incompatible size. Enter a divisor of 640: ", "16");
            }
            if (size==null)
            {
                break;
            }
        }
    if (size != null){
        clearGrid(blocks);
        blocks = populateGrid(size);
    }
    }
});

