/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
	}

	display(){

        //GREEN DIAMOND
        var sca2 = [1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    -2.5, 0.5, 0.0, 1.0];
                    
        this.scene.pushMatrix();
        this.scene.multMatrix(sca2);
        this.diamond.display();
        this.scene.popMatrix();
        
        //PURPLE TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(-1,0,0);
        this.scene.scale(2/Math.sqrt(8),2/Math.sqrt(8),2/Math.sqrt(8))
        this.scene.rotate(Math.PI/4,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        //RED TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(0,-1,0);
        this.scene.scale(2/Math.sqrt(8),2/Math.sqrt(8),2/Math.sqrt(8))
        this.scene.rotate(5*Math.PI/4,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        //ORANGE TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(2,0,0);
        this.scene.scale(4/Math.sqrt(8),4/Math.sqrt(8),4/Math.sqrt(8))
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        //BLUE TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(2,0,0);
        this.scene.scale(4/Math.sqrt(8),4/Math.sqrt(8),4/Math.sqrt(8))
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        //PINK TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(3.5,2,0);
        this.scene.scale(3/Math.sqrt(8),3/Math.sqrt(8),3/Math.sqrt(8))
        this.scene.rotate(-3*Math.PI/4,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        //YELLOW PARALLELOGRAM
        this.scene.pushMatrix();
        this.scene.translate(2,2,0);
        this.scene.scale(-1,1,1)
        this.parallelogram.display();
        this.scene.popMatrix();
	}
}