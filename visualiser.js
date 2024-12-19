class Visualiser {
    static drawNetwork(ctx, brain) {
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = ctx.canvas.width - 2 * margin;
        const height = ctx.canvas.height - 2 * margin;

        const layer_height = (height) / (brain.layers.length)


        ctx.setLineDash([20,2]);//7px line, 3px space
        for (let i = 0; i < brain.layers.length; i++) {
           const levelTop = top + lerp(height- layer_height, 0,
             brain.layers.length==1?0.5:i / (brain.layers.length - 1));
             Visualiser.drawLayer(ctx, brain.layers[i], left, levelTop, width, layer_height,
                i==brain.layers.length-1
                    ?['🠉','🠈','🠊','🠋']
                    :[]
             );
        }
    }


    static drawLayer(ctx, layer, left, top, width, height,outputLabels) {
        const right = left + width;
        const bottom = top + height;

        const { inputs, outputs,weights } = layer;

        const neuronRadius = 20;

        for (let i = 0; i < inputs.length; i++) {
            for (let j = 0; j < outputs.length; j++) {
                const x1 = Visualiser.#getNodeX(inputs, i, left, right);
                const y1 = bottom;
                const x2 = Visualiser.#getNodeX(outputs, j, left, right);
                const y2 = top;


                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                const value = weights[i][j];
                ctx.strokeStyle = getRGBA(value);
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        for (let i = 0; i < inputs.length; i++) {
            const x =Visualiser.#getNodeX(inputs, i, left, right);
            ctx.beginPath();
            ctx.fillStyle = "rgba(255,255,0,0.5)";
            ctx.arc(x, bottom, 25, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(x, bottom, 22, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.beginPath();
            ctx.fillStyle = getRGBA(inputs[i],1);
            ctx.arc(x, bottom, neuronRadius, 0, 2 * Math.PI);
            ctx.fill();
        }

        for (let i = 0; i < outputs.length; i++) {
            const x = Visualiser.#getNodeX(outputs, i, left, right);

            ctx.beginPath();
            ctx.fillStyle = "rgba(255,255,0,0.5)";
            ctx.arc(x, top, 25, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(x, top, 22, 0, 2 * Math.PI);
            ctx.fill();





            ctx.beginPath();
            ctx.fillStyle=getRGBA(outputs[i],1);
            ctx.arc(x, top, neuronRadius, 0, 2 * Math.PI);
            ctx.fill();
        

        if(outputLabels[i]){
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.fillStyle="black";
            ctx.strokeStyle="white";
            ctx.font=(neuronRadius*1.5)+"px Arial";
            ctx.fillText(outputLabels[i],x,top+neuronRadius*0.1);
            ctx.lineWidth=0.5;
            ctx.strokeText(outputLabels[i],x,top+neuronRadius*0.1);
        }
    }
        
    }
    static #getNodeX(nodes, i, left, right) {
        return lerp(left, right,
            nodes.length === 1 ? 0.5 : i / (nodes.length - 1));
    }

}