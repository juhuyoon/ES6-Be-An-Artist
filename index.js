const canvas = document.querySelector('#draw') //grabbing the canvas element


//changes the canvas width and height to the full size of the screen
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 

const ctx = canvas.getContext('2d'); //to draw in 2d context
//base settings of the stroke style
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 80;
// ctx.globalCompositeOperation = 'multiply' //to make things blend overtop of each other adobe function


//this is so that when you hold down, you'll draw, but when you let go, it doesn't.
//set it to false first
let dragDraw = false;

//give it a starting x and y of where it starts
let lastX = 0;
let lastY = 0;

let hue= 0;
//will build up. 
let direction = true;

//to see that the mouse moving is being logged with addEventListener
function draw(e) {
    if(!dragDraw) return; //stops the function from running when they are not moused down. 
    console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)` //http://mothereffinghsl.com/

    ctx.lineWidth = hue;
    ctx.beginPath();
    //starts from so when lastX is set to 0, then it will always start at 0
    ctx.moveTo(lastX, lastY);
    //goes to 
    ctx.lineTo(e.offsetX, e.offsetY) //offsets come from the actual console log value
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY] //destructuring an array. 
    // lastX = e.offsetX;
    // lastY = e.offsetY; //since it's let, you can update it here

    //to change when it reverts back to norm
    hue++;
    if(hue >= 360) {
        hue = 0;
    }
    //to make the linewidth not too big. 
    //if greater than 100 or less than 1, flip direction.
    if(ctx.linewidth >= 100 || ctx.lindWitdh <= 1) {
        direction = !direction;
    }

    if(direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    dragDraw = true;
    [lastX, lastY] = [e.offsetX, e.offsetY] 
});
canvas.addEventListener('mouseup', () => dragDraw = false);
canvas.addEventListener('mouseout', () => dragDraw = false);


