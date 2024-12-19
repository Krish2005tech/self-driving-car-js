class Controls{
    constructor(type){
        this.forward = false;
        this.reverse = false;
        this.left = false;
        this.right = false;


        switch(type){
            case "KEYS":
                this.#addKeyboaardListeners(); // private method 
                break
            case "DUMMY":
                this.forward=true;
                break;

        }
        // why in constructor?
        // because it is a class method
        // and it is called when the class is instantiated
        // and it is called only once
        // and it is called before any other method is called
    }

    #addKeyboaardListeners(){
        document.addEventListener('keydown', (event) => {
            switch(event.key){
                case 'ArrowUp':
                    this.forward = true;
                    break;
                case 'ArrowDown':
                    this.reverse = true;
                    break;
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch(event.key){
                case 'ArrowUp':
                    this.forward = false;
                    break;
                case 'ArrowDown':
                    this.reverse = false;
                    break;
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
            }
        });
    }
}