/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
    constructor(scene) {
		super(scene);
		this.sphere = new MySphere(scene, 16, 8);
		this.helix = new MyHelix(scene);
		this.leme = new MyLeme(scene);
		this.flag = new MyFlag(scene);
		this.initMaterials();
		this.lastUpdate = 0;

		// velocidade (inicialmente a zero)
		this.speed = 0;

		// posição (x, y, z)
		this.position = [0, 10, 0];

		// orientação do veículo no plano horizontal (ângulo em torno do eixo YY)
		this.orientation = 0;

        // modo piloto automático (ativado/desativado)
		this.autopilotMode = false;

        // posição centro da animação circular (x, y, z)
		this.centerPosition = [0, 0, 0];

		// ângulo das hélices 
		this.helixAngle = 0;

		// orientação dos lemes (inclinação na direção oposta da rotação)
		this.lemeOrientation = 0;
	} 

	initMaterials(){
		this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(0.7, 0.7, 0.7, 1);
        this.redMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.redMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.redMaterial.setShininess(10.0);
		this.redMaterial.loadTexture('images/governoPortugal.jpg');
		this.redMaterial.setTextureWrap('REPEAT', 'REPEAT');
				
		this.ironMaterial = new CGFappearance(this.scene);
        this.ironMaterial.setAmbient(0.7, 0.7, 0.7, 1);
        this.ironMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.ironMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.ironMaterial.setShininess(10.0);
		this.ironMaterial.loadTexture('images/gray.jpg');
		this.ironMaterial.setTextureWrap('REPEAT', 'REPEAT');
	}

	display(){
		this.scene.pushMatrix();

        this.scene.translate(this.position[0], this.position[1], this.position[2]);
		this.scene.rotate(this.orientation, 0.0, 1.0, 0.0);
		this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        
        // Corpo
        this.scene.pushMatrix();
		this.scene.scale(1,1,2);
		this.redMaterial.apply();
        this.sphere.display();
		this.scene.popMatrix();
		
		// Gondola e Hélices
		this.scene.pushMatrix();
		this.scene.translate(0,-1.08,-0.40);
		this.ironMaterial.apply();
		this.helix.display();
		this.scene.popMatrix();

		// Leme Direita 
		this.scene.pushMatrix();
		this.scene.translate(0.5,0,-1.55);
		this.scene.scale(0.5, 0.5, 0.5);
		this.ironMaterial.apply();
		this.leme.display();
		this.scene.popMatrix();

		//Leme Esquerda
		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,-1.55);
		this.scene.scale(0.5, 0.5, 0.5);
		this.ironMaterial.apply();
		this.leme.display();
		this.scene.popMatrix();

		//Leme Inferior
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.translate(-0.5,0,-1.55);
		this.scene.scale(0.5, 0.5, 0.5);
		this.scene.rotate(this.lemeOrientation, 1, 0, 0); 
		this.ironMaterial.apply();
		this.leme.display();
		this.scene.popMatrix();

		//Leme Superior
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.translate(0.5,0,-1.55);
		this.scene.scale(0.5, 0.5, 0.5);
		this.scene.rotate(this.lemeOrientation, 1, 0, 0); 
		this.ironMaterial.apply();
		this.leme.display();
		this.scene.popMatrix();

        // Bandeira
		this.flag.display();

		this.scene.popMatrix();
	}

	update(t){
		if(this.lastUpdate == 0)
            this.lastUpdate = t;
        var elapsedTime = t - this.lastUpdate;
        this.lastUpdate = t;

		if (this.autopilotMode){
			this.position[0] = -5 * Math.cos(this.orientation) + this.centerPosition[0];
            this.position[2] = 5 * Math.sin(this.orientation) + this.centerPosition[2];
            this.turn((2 * Math.PI * 50 / 5000) * (elapsedTime / 50));
            this.helixAngle += 0.1 * (elapsedTime / 50) * (2 * Math.PI);
            this.flag.update(elapsedTime, 0.1);
		} else {
			this.position[0] += this.speed * Math.sin(this.orientation) * (elapsedTime / 50);
		    this.position[2] += this.speed * Math.cos(this.orientation) * (elapsedTime / 50);
		    this.helixAngle += this.speed * (elapsedTime / 50) * (2 * Math.PI);
		    this.flag.update(elapsedTime, this.speed);
		}
	}

	turn(val) {
        this.orientation += val;
        this.lemeOrientation = 5 * val * (-1);
    }

    accelerate(val) {
        this.speed += val;
        if (this.speed < 0){
        	this.speed = 0;
		}
    }

    reset() {
		this.position = [0, 10, 0];
		this.orientation = 0;
		this.speed = 0;
		this.autopilotMode = false;
		this.helixAngle = 0;
		this.lemeOrientation = 0;
	}

	autopilot() {
		if (this.autopilotMode){
			this.autopilotMode = false;
		} else {
			this.autopilotMode = true;    
            this.centerPosition[0] = this.position[0] + 5 * Math.sin(this.orientation + (Math.PI / 2));
            this.centerPosition[2] = this.position[2] + 5 * Math.cos(this.orientation + (Math.PI / 2));
		}
    }
}