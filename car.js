class Car {
    constructor(x, y, width, height,controlType) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.controls = new Controls(controlType);

        this.speed = 1;
        this.acceleration = 0.2;

        switch(controlType){
            case "KEYS":
                this.maxSpeed = 5;
                // this.sensor = new Sensor(this);
                break
            case "DUMMY":
                this.maxSpeed = 3;
                break;
            case "SelfDriving":
                this.maxSpeed = 5;
                this.sensor = new Sensor(this);
                this.brain = new neuralNetwork([this.sensor.rayCount,6,4]);
        }



        this.friction=0.1;
        this.angle = 0;
        this.damage=false;


    }

    draw(ctx,color,drawSensor=false) {

        // using rect to draw the car
        
         /*
        ctx.save();// save the current state of the canvas
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = 'red'; // fill color
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        //alter
        ctx.beginPath();
        ctx.rect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.fill();
        

        // draw a yellow circle at head of car
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y -this.height/4,this.height/8, 0, 2*Math.PI);// x, y, radius, startAngle, endAngle
        ctx.fill();
        ctx.restore();// restore the saved state of the canvas
        */

        // using polygon to draw the car
        
        if(this.damage){
            ctx.fillStyle='gray';
        }
        //set color to blue if dummy check using control type
        else{
            ctx.fillStyle = color;
        }


        if(this.sensor && drawSensor){
            this.sensor.draw(ctx);// draw the sensor
        }

        
        
        
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        // ctx.closePath();
        ctx.fill();

    }

    update(roadBorders,traffic) {
        if(this.damage){
            this.speed=-this.speed;
            // this.speed=0;
        }
        this.#move();
        this.polygon=this.#createPolygon();
        if(this.sensor){
            this.sensor.update(roadBorders,traffic);
            this.damage=this.#accessDamage(roadBorders,traffic);
            const offsets=this.sensor.readings.map((reading)=>reading==null?0:1-reading.offset);
            const outputs=neuralNetwork.forwardPropagate(offsets,this.brain);
            // console.log(outputs);
            this.controls.forward=outputs[0]>0.5;
            this.controls.reverse=outputs[3]>0.5;
            this.controls.left=outputs[1]>0.5;
            this.controls.right=outputs[2]>0.5;}

    }


    #accessDamage(roadBorders,traffic){
        for(let i=0;i<roadBorders.length;i++){
            if(polyIntersect(this.polygon, roadBorders[i])){// check if the car is intersecting with the road
                return true;
            }
        }
        for(let i=0;i<traffic.length;i++){
            if(polyIntersect(this.polygon, traffic[i].polygon)){// check if the car is intersecting with the road
                return true;
            }
        }
        return false;
    }






    #createPolygon(){
        const points = [];
        const rad=Math.hypot(this.width/2, this.height/2);// distance from center to corner
        const alpha=Math.atan(this.height/this.width);// angle between center to corner and center to side

        points.push({x:this.x+rad*Math.cos(this.angle+alpha), y:this.y+rad*Math.sin(this.angle+alpha)});
        points.push({x:this.x+rad*Math.cos(this.angle-alpha), y:this.y+rad*Math.sin(this.angle-alpha)});
        points.push({x:this.x-rad*Math.cos(this.angle+alpha), y:this.y-rad*Math.sin(this.angle+alpha)});
        points.push({x:this.x-rad*Math.cos(this.angle-alpha), y:this.y-rad*Math.sin(this.angle-alpha)});
        return points;
    }

    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration;
            if (this.speed > this.maxSpeed) {
                this.speed = this.maxSpeed;
            }
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
            if (this.speed < -this.maxSpeed) {
                this.speed = -this.maxSpeed;
            }
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if (this.speed) {

            const flip = this.speed < 0 ? -1 : 1;
            if (this.angle > Math.PI) {
                this.angle = -Math.PI;
            }
            if (this.angle < -Math.PI) {
                this.angle = Math.PI;
            }

            if (this.controls.left) {
                this.angle -= 0.05;
            }
            if (this.controls.right) {
                this.angle += 0.05;
            }
        }




        this.y -= this.speed * Math.cos(this.angle);
        this.x += this.speed * Math.sin(this.angle);
    }

}