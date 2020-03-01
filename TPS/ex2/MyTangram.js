/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.greenDiamond = new MyDiamond(scene);
        this.redTriangle = new MyTriangle(scene);
        this.purpleTriangle = new MyTriangle(scene);
        this.orangeTriangle = new MyTriangle(scene);
        this.blueTriangle = new MyTriangle(scene);
        this.yellowParallelogram = new MyParallelogram(scene);
        this.pinkTriangle = new MyTriangle(scene);
	}
	display(){

        // -- green diamond

        var translate_green_diamond = [ 1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-5, 1, 0.0, 1.0];

		this.scene.pushMatrix();
		this.scene.multMatrix(translate_green_diamond);                                
		this.greenDiamond.display();
		this.scene.popMatrix();

		// -- red triangle

		this.scene.pushMatrix();
		this.scene.scale(2,2,2);
		this.redTriangle.display();
		this.scene.popMatrix();

		// -- purple triangle

		this.scene.pushMatrix();
		this.scene.translate(-2,-2,0);
		this.scene.scale(2,-2,2);
		this.purpleTriangle.display();
		this.scene.popMatrix();

		// -- orange triangle

		this.scene.pushMatrix();
		this.scene.scale(4,4,4);
		this.scene.rotate(Math.PI/2.0, 0, 0, 1.0);
		this.orangeTriangle.display();
		this.scene.popMatrix();

		// -- blue triangle

		this.scene.pushMatrix();
		this.scene.translate(8,0,0);
		this.scene.scale(-4,4,4);
		this.scene.rotate(Math.PI/2.0, 0, 0, 1.0);
		this.blueTriangle.display();
		this.scene.popMatrix();

		// -- yellow parallelogram

		this.scene.pushMatrix();
		this.scene.translate(4,4,0);
		this.scene.scale(-2.0,2.0,2.0);
		this.yellowParallelogram.display();
		this.scene.popMatrix();

		// -- pink triangle

		this.scene.pushMatrix();
		this.scene.translate(7,7,0);
		this.scene.scale(3,3,3);
		this.pinkTriangle.display();
		this.scene.popMatrix();
	}
}

