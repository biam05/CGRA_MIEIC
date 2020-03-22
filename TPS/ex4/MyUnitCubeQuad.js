/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
                super(scene);
                this.quad = new MyQuad(scene);
                this.initBuffers();
                this.initMaterials();
	}

    initMaterials(){
        this.side = new CGFappearance(this.scene);
        this.side.setAmbient(0.1, 0.1, 0.1, 1);
        this.side.setDiffuse(0.9, 0.9, 0.9, 1);
        this.side.setSpecular(0.1, 0.1, 0.1, 1);
        this.side.setShininess(10.0);
        this.side.loadTexture('images/mineSide.png');
        this.side.setTextureWrap('REPEAT', 'REPEAT');

        this.top = new CGFappearance(this.scene);
        this.top.setAmbient(0.1, 0.1, 0.1, 1);
        this.top.setDiffuse(0.9, 0.9, 0.9, 1);
        this.top.setSpecular(0.1, 0.1, 0.1, 1);
        this.top.setShininess(10.0);
        this.top.loadTexture('images/mineTop.png');
        this.top.setTextureWrap('REPEAT', 'REPEAT');

        this.bottom = new CGFappearance(this.scene);
        this.bottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.bottom.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottom.setShininess(10.0);
        this.bottom.loadTexture('images/mineBottom.png');
        this.bottom.setTextureWrap('REPEAT', 'REPEAT');
    }

	display(){

        //frente
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.side.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //direita
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0, 0, 0.5);
        this.side.apply();
        this.quad.display();
        this.scene.popMatrix();

        //esquerda
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.translate(0, 0, 0.5);
        this.side.apply();
        this.quad.display();
        this.scene.popMatrix();

        //cima
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.translate(0, 0, 0.5);
        this.top.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //baixo
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(0, 0, 0.5);
        this.bottom.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //atras
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI,0,1,0);
        this.scene.translate(0, 0, 0.5);
        this.side.apply();
        this.quad.display();
        this.scene.popMatrix();    
    }

    enableNormalViz(){
        this.quad.enableNormalViz();
    }

    disableNormalViz(){
        this.quad.disableNormalViz();
    }
}