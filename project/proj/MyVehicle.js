/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
    constructor(scene) {
		super(scene);
		this.initBuffers();

		// velocidade (inicialmente a zero)
		this.speed = 0;

		// posição (x, y, z)
		this.xPos = 0;
		this.yPos = 0;
		this.zPos = 0;

		// orientação do veículo no plano horizontal (ângulo em torno do eixo YY)
		this.ang = 0;
	}

	initBuffers(){
		this.sphere = new MySphere(this.scene,16,8);
		this.helix = new MyHelix(this.scene);
	}
	
	display(){
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, this.yPos, this.zPos);
		this.scene.rotate(this.ang, 0, 1, 0);

		// Gôndolasw
        this.scene.pushMatrix();
        this.scene.scale(1,1,2);
        this.sphere.display();
		this.scene.popMatrix();
		
		 //Hélice
		 this.scene.pushMatrix(); /// START HELICE TRANSFORM
		 this.scene.translate(0,-1.08,-0.35);
		 this.helix.display();
		 this.scene.popMatrix(); ///// FINISH HELICE TRANSFORM
	}

	enableNormalViz(){
    	this.sphere.enableNormalViz();
    }

    disableNormalViz(){
        this.sphere.disableNormalViz();
    }

	updateBuffers(){}

	update(elapsedTime){
		this.xPos += this.speed * Math.sin(this.ang) * (elapsedTime / 50);
		this.zPos += this.speed * Math.cos(this.ang) * (elapsedTime / 50);
	}

	turn(val) {
        this.ang += val;
    }

    accelerate(val) {
        this.speed += val;
    }

    reset(){
		this.xPos = 0;
		this.yPos = 0;
		this.zPos = 0;
		this.ang = 0;
		this.speed = 0;
	}
}