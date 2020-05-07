
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

        this.box = new MyUnitCubeQuad(this.scene);

        this.state = SupplyStates.INACTIVE;

        this.x = 0;
        this.y = 10;
        this.z = 0;

        this.previousTime = 0; //ms
        this.deltaTime = 0; //seconds
	}

    initMaterials(){
        
    }

    drop(xDrop, zDrop){
        // when land, y = 0 -> only matters x and z
        this.state = SupplyStates.FALLING;
        this.x = xDrop;
        this.z = zDrop;
    }

    land(){
        this.y = 0.9; //unico valor com que consegui ver a caixa no chao
        this.previousTime = 0
        this.state = SupplyStates.LANDED;  
    }

    update(t){
        if(this.state == SupplyStates.FALLING){
            if(this.previousTime == 0)
                this.previousTime = t;

            this.deltaTime = (t-this.previousTime)/1000;
            this.previousTime = t;

            this.y -= (10/3 * this.deltaTime); //i t should take 3 seconds to hit the floor

            if(this.y <= 0.9){
                this.land();
            }
        }
    }

    displayFalling(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z); 
        this.box.display(SupplyStates.FALLING);
        this.scene.popMatrix();

    }
    displayOnLanded(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z); 
        this.box.display(SupplyStates.LANDED);
        this.scene.popMatrix();
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
}