/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
        super(scene);
        this.initMaterials();
        this.nSuppliesDelivered = 0;

        this.quad = new MyQuad(this.scene);
        this.progress = new MyQuad(this.scene);
        
        // --- ALTERAR: NAO ESTA A FUNCIONAR!
        this.progressShader = new CGFshader(scene.gl, 'shaders/progress.vert', 'shaders/progress.frag');
        this.progressShader.setUniformsValues({ nSuppliesDelivered: 0});
	}

	initMaterials() {
        // --- A ALTERAR: MADEIRA COM LETRAS
        this.billboardMaterial = new CGFappearance(this.scene);
        this.billboardMaterial.setAmbient(0.7, 0.7, 0.7, 1);
        this.billboardMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.billboardMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.billboardMaterial.setShininess(10.0);
        this.billboardMaterial.loadTexture('images/wood.jpg'); // --- ALTERAR
        this.billboardMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        this.ironMaterial = new CGFappearance(this.scene);
        this.ironMaterial.setAmbient(0.7, 0.7, 0.7, 1);
        this.ironMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.ironMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.ironMaterial.setShininess(10.0);
		this.ironMaterial.loadTexture('images/gray.jpg');
        this.ironMaterial.setTextureWrap('REPEAT', 'REPEAT');
        

        
				
    }

    update(){
        this.progressShader.setUniformsValues({nSuppliesDelivered: ++this.nSuppliesDelivered});
    }

    reset(){
        this.nSuppliesDelivered = 0;
        this.progressShader.setUniformsValues({ nSuppliesDelivered: 0});
    }
    
    display(){

        // --- "deve ser colocado no terreno numa posição bem visível no 
        // ponto de vista inicial da câmara" -> ALTERAR: FALTA TERRENO NESTA 
        // VERSAO

        this.scene.pushMatrix();
        this.scene.translate(5, 0, 0); // !!! ALTERAR

            // --- "O plano de base deve ter dimensões 2 x 1 unidades"
            this.scene.pushMatrix();
            this.scene.scale(2, 1, 1);
            this.scene.translate(0,1,0);
            this.billboardMaterial.apply();
            this.quad.display();
            this.scene.popMatrix();

            // --- "as traves devem ter altura de uma unidade"
            this.scene.pushMatrix();
            this.scene.scale(0.25,1,1);
            this.scene.translate(3.5, 0, 0);
            this.ironMaterial.apply();
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(0.25,1,1);
            this.scene.translate(-3.5, 0, 0);
            this.quad.display();
            this.scene.popMatrix();

            // --- "A barra de progresso deve ser constituída por 
            // um único plano de dimensões 1.5 x 0.2 unidades"

            this.scene.setActiveShader(this.progressShader);
            this.scene.pushMatrix();           
            this.scene.translate(0,1,0.01);
            this.scene.scale(1.5, 0.2, 1);
            this.quad.display();
            this.scene.popMatrix();
            this.scene.setActiveShader(this.scene.defaultShader);


        this.scene.popMatrix();

    }
}