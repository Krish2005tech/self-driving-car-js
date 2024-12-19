class Road {
    constructor(x, width, lanecount) {
        this.x = x;
        this.width = width;

        this.lanecount = lanecount;
        this.left = this.x - this.width / 2;
        this.right = this.x + this.width / 2;

        const infiniteroad = 10000000;
        this.top = -infiniteroad;
        this.bottom = infiniteroad;


        const topLeft = { x: this.left, y: this.top };
        const topRight = { x: this.right, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom };
        const bottomRight = { x: this.right, y: this.bottom };


        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];



    }
    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white';

        // ctx.beginPath();
        // ctx.moveTo(this.left,this.top);//top left
        // ctx.lineTo(this.left,this.bottom);//bottom left
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(this.right,this.top);//top right
        // ctx.lineTo(this.right,this.bottom);//bottom right
        // ctx.stroke();

        for (let i = 1; i <= this.lanecount - 1; i++) {
            const x = lerp(this.left, this.right, i / this.lanecount);
            ctx.setLineDash([20, 20]); // 20px dashes, 10px spaces

            // if(i>0 && i<this.lanecount){
            //     ctx.setLineDash([20, 20]); // 20px dashes, 10px spaces
            // }
            // else{
            //     ctx.setLineDash([]);
            // }

            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
        ctx.setLineDash([]);
        this.borders.forEach((border) => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });


    }

    getLaneCenter(lane) {
        if (lane < 0 || lane >= this.lanecount) {
            return this.getLaneCenter(0);
        }
        return this.left + this.width / this.lanecount * lane + this.width / (this.lanecount * 2);
    }
}
