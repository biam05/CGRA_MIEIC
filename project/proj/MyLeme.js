
/**
 * MyLeme
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeme extends CGFobject {
	constructor(scene) {
        super(scene);
		this.triangle = new MyTriangle(this.scene);
        this.quad = new MyQuad(this.scene);
	}

    display(){

        this.scene.pushMatrix();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(0,-1,0);
        this.quad.display();
        this.scene.popMatrix();
    }

    
}