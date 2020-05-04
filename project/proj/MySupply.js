
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
        this.x = 0;
        this.y = 9;
        this.z = 0;
        this.passedTime = 0;
        this.state=SupplyStates.INACTIVE;
        this.box = new MyUnitCubeQuad(this.scene);
        this.initMaterials();
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
        this.y = 0.6; //floor position -> TESTING
        this.state = SupplyStates.LANDED;
    }

    update(elapsedTime){
        if(this.state === SupplyStates.FALLING)
        {
            this.passedTime += elapsedTime;
            this.y = 9 - (this.passedTime * 0.05);
            if(this.y <= 0.4)
                this.land();
        }
    }

    displayFalling(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z); 
        this.box.display(SupplyStates.FALLING);
        this.scene.popMatrix();

    }
    displayOnLanded(){
        this.pushMatrix();
        this.scene.translate(0, -0.09, 0);
        this.scene.translate(this.x, this.y, this.z); 
        this.box.display(SupplyStates.LANDED);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y - 0.23, this.z);
        this.scene.scale(0.7, 0.7, 0.7);
        this.package.display(1);
        this.scene.popMatrix();
    }

	display(){

        switch(this.state){
            case(SupplyStates.INACTIVE):
                // --- TESTING
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

    enableNormalViz(){
        this.quad.enableNormalViz();
    }

    disableNormalViz(){
        this.quad.disableNormalViz();
    }
}