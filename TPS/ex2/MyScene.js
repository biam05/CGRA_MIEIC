/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.tangram = new MyTangram(this);
        this.unitCube = new MyUnitCube(this);
        /*
        this.greenDiamond = new MyDiamond(this);
        this.redTriangle = new MyTriangle(this);
        this.purpleTriangle = new MyTriangle(this);
        this.orangeTriangle = new MyTriangle(this);
        this.blueTriangle = new MyTriangle(this);
        this.yellowParallelogram = new MyParallelogram(this);
        this.pinkTriangle = new MyTriangle(this);
        */
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayTangram = true;
        this.displayUnitCube = true;
        this.scaleFactor = 1;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();    

        this.setDefaultAppearance();

        //Função de *escalamento* de uma variável armazenada
        var sca = [this.scaleFactor, 0.0,              0.0,              0.0,
                    0.0,             this.scaleFactor, 0.0,              0.0,
                    0.0,             0.0,              this.scaleFactor, 0.0,
                    0.0,             0.0,              0.0,              1.0];

        this.multMatrix(sca);

        // ---- BEGIN Primitive drawing section
        
        if(this.displayTangram)
        {
            this.pushMatrix();
            this.rotate(-Math.PI/2.0, 1.0, 0, 0);
            this.translate(7, -7, 0);
            this.tangram.display();
            this.popMatrix();
        }
            

        /*
        // -- green diamond

        var translate_green_diamond = [ 1.0, 0.0, 0.0, 0.0,
                                        0.0, 1.0, 0.0, 0.0,
                                        0.0, 0.0, 1.0, 0.0,
                                        -5, 1, 0.0, 1.0];

        this.pushMatrix();
        this.multMatrix(translate_green_diamond);                                
        this.greenDiamond.display();
        this.popMatrix();

        // -- red triangle

        this.pushMatrix();
        this.scale(2,2,2);
        this.redTriangle.display();
        this.popMatrix();

        // -- purple triangle

        this.pushMatrix();
        this.translate(-2,-2,0);
        this.scale(2,-2,2);
        this.purpleTriangle.display();
        this.popMatrix();

        // -- orange triangle

        this.pushMatrix();
        this.scale(4,4,4);
        this.rotate(Math.PI/2.0, 0, 0, 1.0);
        this.orangeTriangle.display();
        this.popMatrix();

        // -- blue triangle

        this.pushMatrix();
        this.translate(8,0,0);
        this.scale(-4,4,4);
        this.rotate(Math.PI/2.0, 0, 0, 1.0);
        this.blueTriangle.display();
        this.popMatrix();
        
        // -- yellow parallelogram
        
        this.pushMatrix();
        this.translate(4,4,0);
        this.scale(-2.0,2.0,2.0);
        this.yellowParallelogram.display();
        this.popMatrix();

        // -- pink triangle

        this.pushMatrix();
        this.translate(7,7,0);
        this.scale(3,3,3);
        this.pinkTriangle.display();
        this.popMatrix();
        */

       if(this.displayUnitCube)
       {
           this.pushMatrix();
           this.rotate(-Math.PI/2.0, 1.0, 0, 0);
           this.translate(8.5,-5.5,-0.51); 
           this.scale(17, 11, 1);
           this.unitCube.display();
           this.popMatrix();
       }            

        // ---- END Primitive drawing section
    }
}
