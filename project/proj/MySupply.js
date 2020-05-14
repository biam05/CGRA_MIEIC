const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
	constructor(scene) {
        super(scene);
        //this.initMaterials();
        this.box = new MyUnitCubeQuad(this.scene);

        // changes when drop() is called, and when position hits Y = 0
        this.state = SupplyStates.INACTIVE;
    
        // position [x, y, z] starts at origin, changes when drop() is called
        this.position = [0, 0, 0];

        // calculated when drop() is called
        this.speed = 0;

        this.previousTime = 0;
	}

    //initMaterials(){
    //}

    update(t){
        if(this.state == SupplyStates.FALLING){
            if(this.previousTime == 0)
                this.previousTime = t;
            var deltaTime = (t - this.previousTime) / 1000; // To obtain deltaTime in seconds
            this.previousTime = t;

            var deltaDistance = deltaTime * this.speed;

            this.position[1] -= deltaDistance;

             if(this.position[1] <= 0.4){
                this.land();
            }
        }
    }

	display(){
        switch(this.state){
            case(SupplyStates.INACTIVE):
                break;
            case(SupplyStates.FALLING):
                this.displayFalling();
                break;
            case(SupplyStates.LANDED):
                this.displayOnLanded();
                break;
            default:
                break;
        }
    }

    displayFalling(){
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]); 
        this.box.display(SupplyStates.FALLING);
        this.scene.popMatrix();

    }

    displayOnLanded(){
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]); 
        this.box.display(SupplyStates.LANDED);
        this.scene.popMatrix();
    }

    drop(dropPosition){
    	this.position[0] = dropPosition[0];
    	this.position[1] = dropPosition[1];
    	this.position[2] = dropPosition[2];
    	this.speed = this.position[1] / 3; // distance / fallTime;
        this.state = SupplyStates.FALLING;
    }

    land(){
    	this.position[1] = 0.6; 
        this.state = SupplyStates.LANDED;  
    }

    reset(){
    	this.position = [0, 0, 0];
    	this.speed = 0;
    	this.state = SupplyStates.INACTIVE;
    	this.previousTime = 0;
    }
}