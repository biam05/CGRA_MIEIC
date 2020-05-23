/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
        this.initMaterials();
        this.flagSide1 = new MyPlane(scene, 20);
        this.flagSide2 = new MyPlane(scene, 20); // bandeira com duas faces
        this.flagSupport = new MyCylinder(scene, 5); // ligação da bandeira ao dirigível

        // valor (inicialmente a zero) atualizado em função do tempo e da velocidade do dirigível
        // utilizado para deslocar a posição da onda horizontalmente (offset no eixo do X)
        this.phase = 0.0;

        // Texture initialization
        this.flagTexture = new CGFtexture(scene, 'images/earth.jpg'); // ALTERAR IMAGEM!!!

        // Shader initialization
        this.flagShader = new CGFshader(scene.gl, 'shaders/flag.vert', 'shaders/flag.frag');
        this.flagShader.setUniformsValues({ uSampler1: 1 });
        this.flagShader.setUniformsValues({ phase: this.phase });
	}
    
    initMaterials() {
    	this.supportMaterial = new CGFappearance(this.scene);
        this.supportMaterial.setAmbient(0.7, 0.7, 0.7, 1);
        this.supportMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.supportMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.supportMaterial.setShininess(10.0);
		this.supportMaterial.loadTexture('images/red.jpg'); // ALTERAR IMAGEM!!!
        this.supportMaterial.setTextureWrap('REPEAT', 'REPEAT');      
    }

    update(elapsedTime, speed){
        var deltaX = 100.0 * speed * (elapsedTime / 1000);
        this.phase += deltaX;
        this.flagShader.setUniformsValues({ phase: this.phase });
    }

    display() {
    	//------ Bandeira
    	// activate flag shader
        this.scene.setActiveShader(this.flagShader);
        this.flagTexture.bind(1);

        this.flagShader.setUniformsValues({ side: 1 });

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, -4.0);
        this.scene.scale(1.0, 1.0, 2.0);
        this.scene.rotate(Math.PI/2.0, 0.0, 1.0, 0.0);
        this.flagSide1.display();
        this.scene.popMatrix();

        this.flagShader.setUniformsValues({ side: 2 });

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, -4.0);
        this.scene.scale(1.0, 1.0, 2.0);
        this.scene.rotate(-Math.PI/2.0, 0.0, 1.0, 0.0);
        this.flagSide2.display();
        this.scene.popMatrix();

        // restore default shader 
        this.scene.setActiveShader(this.scene.defaultShader);
        //------
       
        //------ Suporte da Bandeira
        this.supportMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.0, -0.2, -2.25);
        this.scene.scale(0.01, 0.01, 1.5);
        this.scene.rotate(Math.PI/2.0, 1.0, 0.0, 0.0);
        this.scene.translate(0.0, -0.5, 0.0);
        this.flagSupport.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.2, -2.25);
        this.scene.scale(0.01, 0.01, 1.5);
        this.scene.rotate(Math.PI/2.0, 1.0, 0.0, 0.0);
        this.scene.translate(0.0, -0.5, 0.0);
        this.flagSupport.display();
        this.scene.popMatrix();
        //------
    }

}