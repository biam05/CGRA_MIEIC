/**
 * MyHelix
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHelix extends CGFobject {
	constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 16, 8);
        this.cylinder = new MyCylinder(scene, 6);
        this.quad = new MyQuad(scene);
	}
	
    display(){
        //Gondola Main Body
        this.scene.pushMatrix();
        this.scene.scale(0.1,0.1,0.9);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.cylinder.display(); 
        this.scene.popMatrix();

        //Gondola Tip front
        this.scene.pushMatrix(); 
        this.scene.scale(0.1,0.1,0.1);
        this.sphere.display();
        this.scene.popMatrix();

        //Gondola Tip front 
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.9);
        this.scene.scale(0.1,0.1,0.1);
        this.sphere.display();
        this.scene.popMatrix();

        //Left Helix 1 (Base)
        this.scene.pushMatrix();
        this.scene.translate(0.1,0,0);
        this.scene.scale(0.05,0.05,0.12);
        this.sphere.display();
        this.scene.popMatrix();

        //Left Helix 2 (Rotation)
        this.scene.pushMatrix();
        this.scene.translate(0.1,0,-0.12);
        this.scene.rotate(this.scene.vehicle.helixAngle, 0, 0, 1);
        this.scene.scale(0.05,0.2,0.05);
        this.quad.display();
        this.scene.rotate(Math.PI,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Right Helix 1 (Base)
        this.scene.pushMatrix();
        this.scene.translate(-0.12,0,0);
        this.scene.scale(0.05,0.05,0.12);
        this.sphere.display();
        this.scene.popMatrix();

        //Right Helix 2 (Rotation)
        this.scene.pushMatrix();
        this.scene.translate(-0.12,0,-0.12);
        this.scene.rotate(this.scene.vehicle.helixAngle, 0, 0, 1);
        this.scene.scale(0.05,0.2,0.05);
        this.quad.display();
        this.scene.rotate(Math.PI,0,1,0);
        this.quad.display();
        this.scene.popMatrix();
    }
}