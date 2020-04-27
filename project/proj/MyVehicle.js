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
		this.leme = new MyLeme(this.scene);
	}
	
	display(){
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, this.yPos, this.zPos);
		this.scene.rotate(this.ang, 0, 1, 0);

		// Corpo
        this.scene.pushMatrix();
        this.scene.scale(1,1,2);
        this.sphere.display();
		this.scene.popMatrix();
		
		// Gondola e Hélices
		this.scene.pushMatrix();
		this.scene.translate(0,-1.08,-0.40);
		this.helix.display();
		this.scene.popMatrix();

		// Leme Direita 
		this.scene.pushMatrix();
		this.scene.translate(0.5,0,-1.55);
		this.scene.scale(0.5, 0.5, 0.5);
		this.leme.display();
		this.scene.popMatrix();

		//Leme Esquerda
		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,-1.55);
		this.scene.scale(0.5, 0.5, 0.5);
		this.leme.display();
		this.scene.popMatrix();

		//Leme Inferior
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.translate(-0.5,0,-1.55);
		this.scene.scale(0.5, 0.5, 0.5);
		this.leme.display();
		this.scene.popMatrix();

		//Leme Superior
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.translate(0.5,0,-1.55);
		this.scene.scale(0.5, 0.5, 0.5);
		this.leme.display();
		this.scene.popMatrix();
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