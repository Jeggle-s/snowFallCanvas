let canvas = document.getElementById('snow-canvas');
let snowCheck = document.getElementById('stopSnow')
let ctx = canvas.getContext('2d');
let particlesOnScreen = 50;
let particlesArray = [];
let width,height;
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;

document.getElementById('stopSnow').onclick = function() {
    if ( this.checked ) {
        console.log('checked');
        stopSnow();
    } else {
        createSnowFlakes();
    }
};

function stopSnow() {
    particlesArray.length = 0;
}


// Zufällige Zahl in Abhängigkeit von der Breite des Fensters generieren
function random(min, max) {
    return min + Math.random() * (max - min + 1);
};

// Veränderung der Gräße des Fensters => neue Höhe und Breite berechnen
function clientResize(ev){
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
};
window.addEventListener("resize", clientResize);

function createSnowFlakes() {
    for(var i = 0; i < particlesOnScreen; i++){
        particlesArray.push({
            // x und y Position der Schneeflocke
            x: Math.random() * width,  
            y: Math.random() * height,
            // zufällige Attribute für eine einzelne Schneeflocke  
            opacity: Math.random(), 
            speedX: random(-5, 5),  
            speedY: random(2, 5),    
            radius:random(0.5, 4.2),
        })
    }
};

function drawSnowFlakes(){
    for(var i = 0; i < particlesArray.length; i++){  
        // Schneeflocke rendern mit den generierten Werten aus createSnowFlakes()  
        var gradient = ctx.createRadialGradient(  
            particlesArray[i].x,   
            particlesArray[i].y,   
            0,                     
            particlesArray[i].x,   
            particlesArray[i].y,   
            particlesArray[i].radius  
            );

            // Füge der Schneeflocke eine Position, einen Farbwert und die zufällige opacity hinzu
            gradient.addColorStop(0, 'rgba(255, 255, 255,' + particlesArray[i].opacity + ')');  // white
            gradient.addColorStop(.8, 'rgba(210, 236, 242,' + particlesArray[i].opacity + ')');  // bluish
            gradient.addColorStop(1, 'rgba(237, 247, 249,' + particlesArray[i].opacity + ')');   // lighter bluish
          
            ctx.beginPath(); 
            ctx.arc(
            particlesArray[i].x,  
            particlesArray[i].y,  
            particlesArray[i].radius,  
            0,                         
            Math.PI*2,                 
            false                     
            );

        ctx.fillStyle = gradient;   
        ctx.fill();                 
    }
};

function moveSnowFlakes(){
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].x += particlesArray[i].speedX;     
        particlesArray[i].y += particlesArray[i].speedY; 
        console.log('snow');    

        // Solange die Schneeflocke zu sehen ist, ändere ihre x und y Position
        if (particlesArray[i].y > height) {                                                                               
            particlesArray[i].x = Math.random() * width * 1.5;
            particlesArray[i].y = -50;
        }
    }
};

function updateSnowFall() {
    ctx.clearRect(0, 0, width, height);
    drawSnowFlakes();
    moveSnowFlakes();
};
setInterval(updateSnowFall,50);
createSnowFlakes();