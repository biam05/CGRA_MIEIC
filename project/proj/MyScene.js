var N_SUPPLIES = 5;

/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
        //this.texture = null;
		//this.appearance = null;
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

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        //this.sphere = new MySphere(this, 16, 8);
        //this.cylinder = new MyCylinder(this, 6);
        //this.testSemiSphere = new MySemisphere(this, 10, 5);
        this.cube = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);
        this.terrain = new MyTerrain(this);
        this.supplies = [];
        for (var i = 0; i < N_SUPPLIES; i++) {
            this.supplies.push(new MySupply(this));
        }
        this.nSuppliesDelivered = 0;
        this.delay = 0;
        this.billboard = new MyBillboard(this);

        //------ Applied Material
        this.defaultMaterial = new CGFappearance(this);
        this.defaultMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setShininess(10.0);

        this.material = new CGFappearance(this);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/earth.jpg');
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Textures
        this.texture1 = new CGFtexture(this, 'images/earth.jpg');
        this.texture2 = new CGFtexture(this, 'images/cubemap.png');
        this.texture3 = new CGFtexture(this, 'images/forest.png');
        this.texture4 = new CGFtexture(this, 'images/hell.png');
        this.testTexture1 = new CGFtexture(this, 'images/testMap.jpg');
        this.testTexture2 = new CGFtexture(this, 'images/testCubeMap.jpg');
        //-------

        this.textures = [this.texture1, this.texture2, this.texture3, this.texture4, this.testTexture1, this.testTexture2];

        // Labels and ID's for texture selection on MyInterface
        this.textureIDs = { 'Earth': 0 , 'Cube Map': 1 , 'Forest': 2 , 'Hell': 3 , 'Test1': 4 , 'Test2': 5 };

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayVehicle = true;
        this.selectedTexture = 1;
        this.scaleFactor = 1.0; 
        this.speedFactor = 1.0;
    }

    initLights() {
        this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        //this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0)); // código base
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(40, 40, 40), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.vehicle.update(t);
        for(var i = 0; i < N_SUPPLIES; i++){
            this.supplies[i].update(t);
            if(this.supplies[i].state == 2){
                this.nSuppliesDelivered++;
            }
        }
        if (this.delay > 0)
            this.delay--; 
            
        this.billboard.update();
    }

    //Function that resets selected texture in material
    updateAppliedTexture() {
        this.material.setTexture(this.textures[this.selectedTexture]);
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
        
        // Update all lights used
		this.lights[0].update();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

            
        //this.setDefaultAppearance();
        this.defaultMaterial.apply();

        // ---- BEGIN Primitive drawing section

        if (this.displayVehicle){
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.vehicle.display();
            this.popMatrix();
        }

        this.material.apply();
        
        this.updateAppliedTexture();

        this.cube.display();

        //this.terrain.display();

        for(var i = 0; i < N_SUPPLIES; i++){
            this.supplies[i].display();
        }

        this.billboard.display();

        // ---- END Primitive drawing section
    }

    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW") && !this.vehicle.autopilotMode) {
            text+=" W ";
            this.vehicle.accelerate(0.01 * this.speedFactor);
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyS") && !this.vehicle.autopilotMode) {
            text+=" S ";
            this.vehicle.accelerate(-0.01 * this.speedFactor);
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyA") && !this.vehicle.autopilotMode) {
            text+=" A ";
            this.vehicle.turn(Math.PI/50);
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyD") && !this.vehicle.autopilotMode) {
            text+=" D ";
            this.vehicle.turn(-Math.PI/50);
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyR")) {
            text+=" R ";
            this.vehicle.reset();
            for(var i = 0; i < N_SUPPLIES; i++){
                this.supplies[i].reset();
            }
            this.nSuppliesDelivered = 0;
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyP") && this.delay == 0) {
            text+=" P ";
            this.delay = 20; // aproximadamente 1 segundo
            this.vehicle.autopilot();
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyL") && !this.vehicle.autopilotMode && this.delay == 0) {
            text+=" L ";
            this.delay = 20; // aproximadamente 1 segundo
            for(var i = 0; i < N_SUPPLIES; i++){
                if(this.supplies[i].state == 0){
                    this.supplies[i].drop(this.vehicle.position);
                    //this.nSuppliesDelivered++;
                    break;
                }
            }
            keysPressed=true;
        }

        if (keysPressed){
            console.log(text);
        } else if (!this.vehicle.autopilotMode){
            this.vehicle.turn(0.0); // reset orientação dos lemes
        }
    }
}