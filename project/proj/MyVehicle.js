/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
    constructor(scene) {
		super(scene);
		this.triangle = new MyTriangle(this.scene);
		this.initBuffers();

		// velocidade (inicialmente a zero)
		this.speed = 0;

		// posição (x, y, z)
		this.xPos = 0;
		this.yPos = 0;
		this.zPos = 0;

		// orientação do veículo no plano horizontal (ângulo em torno do eixo YY)
		this.ang = 0;

		this.time = Date.now();
	}

	display(){
        this.scene.pushMatrix();
		this.scene.translate(this.xPos, this.yPos, this.zPos);
		this.scene.pushMatrix();
        this.scene.rotate(this.ang * Math.PI / 180.0, 0, 1, 0);
        this.triangle.display();
		this.scene.popMatrix();
		this.scene.popMatrix();

	}

	enableNormalViz(){
    	this.triangle.enableNormalViz();
    }

    disableNormalViz(){
        this.triangle.disableNormalViz();
    }

	updateBuffers(){}

	update(t){
		this.xPos += this.speed * Math.sin(this.ang * Math.PI/180);
        this.zPos += this.speed * Math.cos(this.ang * Math.PI/180);
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