/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
    constructor(scene) {
		super(scene);
		this.triangle = new MyTriangle(scene);
		this.initBuffers();
	}

	display(){
        this.scene.pushMatrix();
        this.triangle.display();
        this.scene.popMatrix();
	}

	enableNormalViz(){
    	this.triangle.enableNormalViz();
    }

    disableNormalViz(){
        this.triangle.disableNormalViz();
    }

	updateBuffers(){}
}