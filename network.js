class neuralNetwork{

constructor(neuronCountArray){
    this.layers=[];
    for(let i=0;i<neuronCountArray.length-1;i++){
        this.layers.push(new Layer(neuronCountArray[i],neuronCountArray[i+1]));
    }
}

static forwardPropagate(inputs,network){
    let outputs=Layer.feedForward(inputs,network.layers[0]);//explain the significance of this line : This line initializes the first layer of the network with the given inputs.
    for(let i=1;i<network.layers.length;i++){
        outputs=Layer.feedForward(outputs,network.layers[i]);//explain the significance of this line : This line feeds the outputs of the previous layer into the next layer of the network.
    }
    return outputs;

}
    static mutate(network,amount=0.9){
        network.layers.forEach((layer)=>{
            
            for(let i=0;i<layer.biases.length;i++){
                layer.biases[i]=lerp(layer.biases[i],Math.random()*2-1,amount);
                
            }
            for(let i=0;i<layer.weights.length;i++){
                for(let j=0;j<layer.weights[i].length;j++){
                    layer.weights[i][j]=lerp(layer.weights[i][j],Math.random()*2-1,amount);
                    }
                }
            }
        )


}}





class Layer{
    constructor(inputCount,outputCount){
        this.inputs=new Array(inputCount);
        this.outputs=new Array(outputCount);

        this.weights=[];
        this.biases=new Array(outputCount);
        for(let i=0;i<inputCount;i++){
            this.weights[i]=new Array(outputCount);
        }

        Layer.randomize(this);// this is a static method so syntax is different
    }

    static randomize(layer){
        for(let i=0;i<layer.weights.length;i++){
            for(let j=0;j<layer.weights[i].length;j++){
                layer.weights[i][j]=Math.random()*2-1;
            }
        }

        for(let i=0;i<layer.biases.length;i++){
            layer.biases[i]=Math.random()*2-1;
        }
    }



// what is static method?
// Static methods are called without creating an instance of the class.
// Static methods are often used to create utility functions.
// Static methods are defined on the class itself, and not on the prototype.

    static feedForward(givenInputs,layer){

    for(let i=0;i<layer.inputs.length;i++){
        layer.inputs[i]=givenInputs[i];
    }

    for(let i=0;i<layer.outputs.length;i++){
        // layer.outputs[i]=0;
        let sum=0
        for(let j=0;j<layer.inputs.length;j++){
            sum+=layer.inputs[j]*layer.weights[j][i];
        }
        sum+=layer.biases[i];


        if(sigmoid(sum)>0.5){
            layer.outputs[i]=1;
        }
        else{
            layer.outputs[i]=0;
        }
    }
    return layer.outputs;

    // alter instead of sigmoid for binary value we could return the w*x+b directly
}

}

















/*
class Network{
    constructor(layerSizes){
        this.layers=[];
        for(let i=0;i<layerSizes.length-1;i++){
            this.layers.push(new Layer(layerSizes[i],layerSizes[i+1]));
        }
    }

    forward(inputs){
        this.layers[0].inputs=inputs;
        for(let i=0;i<this.layers.length-1;i++){
            const layer=this.layers[i];
            const nextLayer=this.layers[i+1];

            for(let j=0;j<nextLayer.inputs.length;j++){
                nextLayer.inputs[j]=0;
                for(let k=0;k<layer.inputs.length;k++){
                    nextLayer.inputs[j]+=layer.inputs[k]*layer.weights[k][j];
                }
                nextLayer.inputs[j]+=nextLayer.biases[j];
                nextLayer.outputs[j]=sigmoid(nextLayer.inputs[j]);
            }
        }

        return this.layers[this.layers.length-1].outputs;
    }
}
    */