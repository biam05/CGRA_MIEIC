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

		// velocidade (inicialmente a zero)
		this.speed = 0;

		// posição (x, y, z)
		this.xPos = 0;
		this.yPos = 0;
		this.zPos = 0;

		// orientação do veículo no plano horizontal (ângulo em torno do eixo YY)
		this.ang = 0;
	}

	display(){
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, this.yPos, this.zPos);
		this.scene.rotate(this.ang, 0, 1, 0);
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

	update(){
		var sa = Math.sin(this.ang);
        var ca = Math.cos(this.ang);
		this.xPos = this.speed * sa;
		this.zPos = this.speed * ca;
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