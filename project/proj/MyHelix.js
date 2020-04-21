/**
 * MyHelix
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHelix extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
        this.sphere = new MySphere(this.scene,16,8);
        this.cylinder = new MyCylinder(this.scene,120,1);
        this.quad = new MyQuad(this.scene);
    }
    
    display(){

        //Helix's Main Body -> "cilindro"
        this.scene.pushMatrix();
        this.scene.scale(0.1,0.1,0.9);
        this.cylinder = new MyCylinder(this.scene,100,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.cylinder.display(); 
        this.scene.popMatrix();

        //Helix's Tip (front) -> esfera 
        this.scene.pushMatrix(); 
        this.scene.scale(0.1,0.1,0.1);
        this.sphere.display();
        this.scene.popMatrix();

        //Helix's Tip (back) -> esfera 
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.9);
        this.scene.scale(0.1,0.1,0.1);
        this.sphere.display();
        this.scene.popMatrix();

        //Helix's Left Motot -> Quad que gira
        this.scene.pushMatrix();
        this.scene.translate(0.1,0,0);
        this.scene.scale(0.05,0.05,0.12);
        this.sphere.display();
        this.scene.popMatrix();

        //Helix's Right Motor -> Quad que gira
        this.scene.pushMatrix();
        this.scene.translate(-0.12,0,0);
        this.scene.scale(0.05,0.05,0.12);
        this.sphere.display();
        this.scene.popMatrix();
    }
}