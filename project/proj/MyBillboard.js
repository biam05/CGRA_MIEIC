/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
        super(scene);
        this.initMaterials();
        this.plane = new MyPlane(scene);
        // Shader initialization
        this.billboardShader = new CGFshader(scene.gl, 'shaders/billboard.vert', 'shaders/billboard.frag');
	}

	initMaterials() {
        // --- A ALTERAR: MADEIRA COM LETRAS
        this.billboardMaterial = new CGFappearance(this.scene);
        this.billboardMaterial.setAmbient(0.7, 0.7, 0.7, 1);
        this.billboardMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.billboardMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.billboardMaterial.setShininess(10.0);
        this.billboardMaterial.loadTexture('images/billboard_front.jpg');
        this.billboardMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        this.billboardBackMaterial = new CGFappearance(this.scene);
        this.billboardBackMaterial.setAmbient(0.7, 0.7, 0.7, 1);
        this.billboardBackMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.billboardBackMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.billboardBackMaterial.setShininess(10.0);
        this.billboardBackMaterial.loadTexture('images/billboard.jpg');
        this.billboardBackMaterial.setTextureWrap('REPEAT', 'REPEAT');

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
        this.scene.translate(-17.0, 5.0, 0.0);
        this.scene.rotate(Math.PI/2.0, 0.0, 1.0, 0.0);
        this.scene.scale(2.5, 2.5, 2.5); 

        // plano de base deve ter dimensões 2 x 1 unidades
        this.scene.pushMatrix();
        this.scene.translate(0.0, 1.0, 0.0);
        this.scene.scale(2.0, 1.0, 1.0);
        this.billboardMaterial.apply();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.0, 1.0, 0.0);
        this.scene.rotate(Math.PI, 0.0, 1.0, 0.0); 
        this.scene.scale(2.0, 1.0, 1.0);
        this.billboardBackMaterial.apply();
        this.plane.display();
        this.scene.popMatrix();
        
        // traves devem ter altura de uma unidade
        this.scene.pushMatrix();
        this.scene.translate(0.875, 0.0, 0.0);
        this.scene.scale(0.25, 1.0, 1.0);
        this.ironMaterial.apply();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.875, 0.0, 0.0);
        this.scene.scale(0.25, 1.0, 1.0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.875, 0.0, 0.0);
        this.scene.rotate(Math.PI, 0.0, 1.0, 0.0); 
        this.scene.scale(0.25, 1.0, 1.0);
        this.ironMaterial.apply();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.875, 0.0, 0.0);
        this.scene.rotate(Math.PI, 0.0, 1.0, 0.0); 
        this.scene.scale(0.25, 1.0, 1.0);
        this.plane.display();
        this.scene.popMatrix();

        // A barra de progresso deve ser constituída por 
        // um único plano de dimensões 1.5 x 0.2 unidades

        // activate billboard shader
        this.scene.setActiveShader(this.billboardShader);

        this.scene.pushMatrix();           
        this.scene.translate(0.0, 1.0, 0.01);
        this.scene.scale(1.5, 0.2, 1.0);
        this.plane.display();
        this.scene.popMatrix();

        // restore default shader 
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
    }

    update(nSuppliesDelivered){
    	this.billboardShader.setUniformsValues({ suppliesDelivered: nSuppliesDelivered });
    }

}