const car_canvas = document.getElementById('carCanvas');
car_canvas.width = 400;
const car_ctx = car_canvas.getContext('2d');// 2d rendering context

const network_canvas = document.getElementById('networkCanvas');
network_canvas.width = 600;
const network_ctx = network_canvas.getContext('2d');// 2d rendering context




const lanes=5;
const road = new Road(car_canvas.width / 2, car_canvas.width * 0.9, lanes);// x, width

// const car = new Car(road.getLaneCenter(1), 300, 30, 50,"SelfDriving");// x, y, width, height,type


const N=100;
const cars=generateCars(N);
let bestCar = cars[0];
// car.draw(ctx);
const traffic=[
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY"),
    new Car(road.getLaneCenter(2),-500,30,50,"DUMMY"),
    new Car(road.getLaneCenter(1),-1000,30,50,"DUMMY"),
    new Car(road.getLaneCenter(3),-2000,30,50,"DUMMY"),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY"),
    new Car(road.getLaneCenter(3),-600,30,50,"DUMMY")
]

animate();


if(localStorage.getItem("bestBrain")){
    // bestCar.brain=JSON.parse(localStorage.getItem("bestBrain"));
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(localStorage.getItem("bestBrain"));
        neuralNetwork.mutate(cars[i].brain,0.15);
    }
}


function save(){
    localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");}


function generateCars(n){
    const cars=[];
    for(let i=0;i<n;i++){
        cars.push(new Car(road.getLaneCenter(2),-100,30,50,"SelfDriving"));
    }
    return cars;
}






function animate(time) {

    traffic.forEach((dummy)=>{
        dummy.update(road.borders,[]);
    })

    for(let i=0;i<cars.length;i++){
    cars[i].update(road.borders, traffic);
    }

     bestCar = cars.find(
        c=>c.y===Math.min(...cars.map(c=>c.y))// find the car with minimum y value
        // fitness function
        // could be changed for better results
    )





    car_canvas.height = window.innerHeight;
    network_canvas.height = window.innerHeight;
    // ctx.clearRect(0,0,canvas.width,canvas.height);

    car_ctx.save();
    car_ctx.translate(0, -bestCar.y + car_canvas.height * (0.75));

    road.draw(car_ctx);

    car_ctx.globalAlpha = 0.2;
    for(let i=0;i<cars.length;i++){
    cars[i].draw(car_ctx, "red");}
    car_ctx.globalAlpha = 1;
    bestCar.draw(car_ctx, "green",true);


    traffic.forEach((dummy)=>{
        dummy.draw(car_ctx,"blue");
    })


    // add roadmarking with number at gap of 50 in the centre lane
    let car_y_position = Math.round((bestCar.y - 300) / 100) *100;
        car_ctx.translate(0,300)
        for (let j = -600+car_y_position; j < 300+car_y_position; j += 100) {
            car_ctx.font = "30px Arial";
            car_ctx.fillStyle = "white";
            car_ctx.fillText(-j/10, road.getLaneCenter(Math.floor(lanes-1))-20, j);
        }


        /*
        const vertical_distance = -(car.y-300)/10;   
        // use this as a feature in neural network
        */    

    car_ctx.restore();


        network_ctx.lineDashOffset = -time / 100;
        Visualiser.drawNetwork(network_ctx,bestCar.brain);   



    requestAnimationFrame(animate);
}


