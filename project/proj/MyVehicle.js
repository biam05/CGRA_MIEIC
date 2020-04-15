/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - x value (position)
 * @param y - y value (position)
 * @param z - z value (position)
 * @param angle - orientation
 */
class MyVehicle extends CGFobject {
    constructor(scene) {
		super(scene);
		// velocidade (inicialmente a 0)
		this.v = 1;
		// posicao
		this.x = 0;
		this.y = 0;
		this.z = 0;
		//orientacao (angulo dem torno do eixo YY)
		this.angle = 0;
		this.triangle = new MyTriangle(scene);
		this.initBuffers();
	}

	update(){
		this.x = this.v * Math.sin(this.angle*Math.PI/180.0);
		this.z = this.v * Math.cos(this.angle*Math.PI/180.0);
	}

	turn(val){
		this.angle += val;
	}

	accelerate(val){
		this.v += val;
	}

	reset(){
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.v = 0;
		this.angle = 0;
	}
	
	display(){
		this.scene.pushMatrix();
		
		this.scene.translate(this.x, this.y, this.z);
		this.scene.rotate(this.angle * Math.PI/180.0, 1, 0);
		
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