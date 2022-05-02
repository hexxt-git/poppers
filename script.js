function rdm(max){
    return Math.floor(Math.random()*(max +1));
};
function random( min, max, floor){
    if (floor) return Math.floor((Math.random()*(max - min + 1)) + min);
    return (Math.random()*(max - min)) + min;
};
function around(x){
    return Math.random()* x * 2 - x
}
function write(input){
    console.log('%c' + input, 'color: #AEF');
    return void 0;
};
function error(input){
    console.log('%c' + input, 'color: #F54;');
    return void 0;
};
function $(id){
    return document.getElementById(id);
};

let canvas = $('canvas')
let c = canvas.getContext('2d')
let width = window.innerWidth
let height = window.innerHeight - 9

canvas.width = width
canvas.height = height

c.fillStyle = '#BBB'
c.strokeStyle = '#BBB'

let gravity = 0.1;
let friction = 0.5
let veritcalFriction = 0.9
let decay = 4

function drawCircle( circle){
    if (circle.age < 60){
        c.strokeStyle = 'hsl('+ circle.age / decay + ', '+ circle.age/1.5 +'%, 50%'
        c.fillStyle = 'hsl('+ circle.age / decay + ', '+ circle.age/1.5 +'%, 50%'
    }
    if (circle.age > 60){
        c.strokeStyle = 'hsl('+ circle.age / decay + ', 40%, 50%'
        c.fillStyle = 'hsl('+ circle.age / decay + ', 40%, 50%'
    }
    if (circle.age > 1000){
        c.strokeStyle = '#181615'
        c.fillStyle = '#181615'
    }
    c.beginPath()
    c.arc( circle.x, circle.y, circle.r, 0, 8, false)
//  c.fill()
    c.stroke()

}

function update (circle){
    circle.x += circle.vx
    circle.y += circle.vy
    circle.vy += gravity
    if( circle.x + circle.r > width){
        circle.vx = -Math.abs(circle.vx * friction)
        circle.x = width - circle.r
    }
    if( circle.x < circle.r ){
        circle.x = circle.r
        circle.vx = Math.abs(circle.vx * friction)
    }
    if( circle.y + circle.r > height){
        circle.vy = -Math.abs(circle.vy * friction)
        circle.y = height - circle.r
        circle.vx = circle.vx * veritcalFriction
    }
    if( circle.y < circle.r ){
        circle.y = circle.r
        circle.vy = Math.abs(circle.vy * friction)
    }
}

class circle {
    constructor( x, y, r, vx, vy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = vx;
        this.vy = vy;
        this.age = 0;
    }
}

let arr = []

let add = false
let x = 100
let y = 100

function loop(){
    requestAnimationFrame(loop)
    c.clearRect( 0, 0, width, height)
    for ( let i in arr ){
        update(arr[i])
        drawCircle(arr[i])
        arr[i].age++
    }
    if ( add & !rdm(1)){
        arr.push(new circle( x, y, random( 10, 30), around(5), around(5)))
        if (rdm(1) == 1){
            if (rdm(1) == 1){
                new Audio('./pop2.mp3').play()
            } else{
                new Audio('./pop1.mp3').play()
            }
        }
    }
    c.fillStyle = '#AAA'
    c.fillRect( 0, height-1, width-1, height+5)
}



window.addEventListener('mousedown',()=>{
    add = true
})
window.addEventListener('mouseup',()=>{
    add = false
})
window.addEventListener('mousemove',(mouse)=>{
    x = mouse.x
    y = mouse.y
})

loop()



































