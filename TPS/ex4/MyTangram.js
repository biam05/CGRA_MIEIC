/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
                super(scene);
                this.diamond = new MyDiamond(scene);
                this.triangle = new MyTriangle(scene);
                this.parallelogram = new MyParallelogram(scene);
                this.initBuffers();
                this.initMaterials();
	}

        initMaterials(){
                /*this.redMaterial = new CGFappearance(this.scene);
                this.redMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
                this.redMaterial.setDiffuse(1, 12/255, 12/255, 1.0);
                this.redMaterial.setSpecular(0.9,0.9,0,1.0);
                this.redMaterial.setShininess(10.0);*/  

                /*this.greenMaterial = new CGFappearance(this.scene);
                this.greenMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
                this.greenMaterial.setDiffuse(0, 1, 0, 1.0);
                this.greenMaterial.setSpecular(0.9,0.9,0,1.0);
                this.greenMaterial.setShininess(10.0);*/ 
                
                /*this.purpleMaterial = new CGFappearance(this.scene);
                this.purpleMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
                this.purpleMaterial.setDiffuse(171/255, 78/255, 195/255, 1.0);
                this.purpleMaterial.setSpecular(0.9,0.9,0,1.0);
                this.purpleMaterial.setShininess(10.0); */

                /*this.orangeMaterial = new CGFappearance(this.scene);
                this.orangeMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
                this.orangeMaterial.setDiffuse(1, 157/255, 0, 1.0);
                this.orangeMaterial.setSpecular(0.9,0.9,0,1.0);
                this.orangeMaterial.setShininess(10.0); */

                /*this.blueMaterial = new CGFappearance(this.scene);
                this.blueMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
                this.blueMaterial.setDiffuse(0, 157/255, 1, 1.0);
                this.blueMaterial.setSpecular(0.9,0.9,0,1.0);
                this.blueMaterial.setShininess(10.0); */

                /*this.pinkMaterial = new CGFappearance(this.scene);
                this.pinkMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
                this.pinkMaterial.setDiffuse(1, 157/255, 211/255, 1.0);
                this.pinkMaterial.setSpecular(0.9,0.9,0,1.0);
                this.pinkMaterial.setShininess(10.0); */

                /*this.yellowMaterial = new CGFappearance(this.scene);
                this.yellowMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
                this.yellowMaterial.setDiffuse(1, 1, 0, 1.0);
                this.yellowMaterial.setSpecular(0.9,0.9,0,1.0);
                this.yellowMaterial.setShininess(10.0); */           

        }

	display(){

        //GREEN DIAMOND -> Custom Material
        var matriz2 = [1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    -2.5, 0.5, 0.0, 1.0];
                    
        this.scene.pushMatrix();
        this.scene.multMatrix(matriz2);
        this.scene.newMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();
        
        //PURPLE TRIANGLE
        var texCoords = [
                0, 0,
                0, 0,
                0.25, 0.25,
                0.25, 0.25,
                0, 0.5,
                0, 0.5,
        ]
        this.scene.pushMatrix();
        this.scene.translate(-1,0,0);
        this.scene.scale(2/Math.sqrt(8),2/Math.sqrt(8),2/Math.sqrt(8))
        this.scene.rotate(Math.PI/4,0,0,1);
        //this.purpleMaterial.apply();
        this.triangle.updateTexCoords(texCoords);
        this.scene.newMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        //RED TRIANGLE
        texCoords = [
                0.5, 0.5,
                0.5, 0.5,
                0.75, 0.75,
                0.75, 0.75,
                0.25, 0.75,
                0.25, 0.75,
        ]
        this.scene.pushMatrix();
        this.scene.translate(0,-1,0);
        this.scene.scale(2/Math.sqrt(8),2/Math.sqrt(8),2/Math.sqrt(8))
        this.scene.rotate(5*Math.PI/4,0,0,1);
        //this.redMaterial.apply();
        this.triangle.updateTexCoords(texCoords);
        this.scene.newMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        //ORANGE TRIANGLE
        texCoords = [
                1, 0,
                1, 0,
                0.5, 0.5,
                0.5, 0.5,
                1, 1,
                1, 1,
        ]
        this.scene.pushMatrix();
        this.scene.translate(2,0,0);
        this.scene.scale(4/Math.sqrt(8),4/Math.sqrt(8),4/Math.sqrt(8))
        this.scene.rotate(-Math.PI/4,0,0,1);
        //this.orangeMaterial.apply();
        this.triangle.updateTexCoords(texCoords);
        this.scene.newMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        //BLUE TRIANGLE
        texCoords = [
                0, 0,
                0, 0,
                0.5, 0.5,
                0.5, 0.5,
                1, 0,
                1, 0,
        ]
        this.scene.pushMatrix();
        this.scene.translate(2,0,0);
        this.scene.scale(4/Math.sqrt(8),4/Math.sqrt(8),4/Math.sqrt(8))
        this.scene.rotate(3*Math.PI/4,0,0,1);
        //this.blueMaterial.apply();
        this.triangle.updateTexCoords(texCoords);
        this.scene.newMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        //PINK TRIANGLE
        texCoords = [
                0, 0.5,
                0, 0.5,
                0, 1,
                0, 1,
                0.5, 1,
                0.5, 1,
        ]
        this.scene.pushMatrix();
        this.scene.translate(3.5,2,0);
        this.scene.scale(3/Math.sqrt(8),3/Math.sqrt(8),3/Math.sqrt(8))
        this.scene.rotate(-3*Math.PI/4,0,0,1);
        //this.pinkMaterial.apply();
        this.triangle.updateTexCoords(texCoords);
        this.scene.newMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        //YELLOW PARALLELOGRAM
        this.scene.pushMatrix();
        this.scene.translate(2,2,0);
        this.scene.scale(-1,1,1)
        //this.yellowMaterial.apply();
        this.scene.newMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
        }

        enableNormalViz(){
                this.diamond.enableNormalViz();
                this.parallelogram.enableNormalViz();
                this.triangle.enableNormalViz();
        }

        disableNormalViz(){
                this.diamond.disableNormalViz();
                this.parallelogram.disableNormalViz();
                this.triangle.disableNormalViz();
        }
}