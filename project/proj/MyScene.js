const N_SUPPLIES = 5; // número de mantimentos

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

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        // Initialize scene objects
        this.axis = new CGFaxis(this);
        //this.sphere = new MySphere(this, 16, 8);
        //this.cylinder = new MyCylinder(this, 6);
        this.cube = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);
        this.terrain = new MyTerrain(this);
        this.billboard = new MyBillboard(this);
        this.supplies = [];
        for (var i = 0; i < N_SUPPLIES; i++) {
            this.supplies.push(new MySupply(this));
        }
        this.nSuppliesDelivered = 0;
        this.delay = 0; 

        //------ Applied Material
        this.defaultMaterial = new CGFappearance(this);
        this.defaultMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setShininess(10.0);
        this.defaultMaterial.loadTexture('images/cubemap.png');
        this.defaultMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Textures
        this.texture1 = new CGFtexture(this, 'images/cubemap.png');
        this.texture2 = new CGFtexture(this, 'images/forest.png'); // ALTERAR!!!
        this.texture3 = new CGFtexture(this, 'images/hell.png'); // ALTERAR!!!
        //this.texture4 = new CGFtexture(this, 'images/earth.jpg');
        //-------

        this.textures = [this.texture1, this.texture2, this.texture3];

        // Labels and ID's for texture selection on MyInterface
        this.textureIDs = { 'Cube Map': 0 , 'Forest': 1 , 'Hell': 2 }; // ALTERAR!!!

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.selectedTexture = 0;
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

    /*setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }*/

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();

        this.vehicle.update(t);

        for(var i = 0; i < this.supplies.length; i++){
            this.supplies[i].update(t);
        }
        
        this.billboard.update(this.nSuppliesDelivered);

        if (this.delay > 0)
            this.delay--; 
    }

    //Function that resets selected texture in defaultMaterial
    updateAppliedTexture() {
        this.defaultMaterial.setTexture(this.textures[this.selectedTexture]);
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

        // ---- BEGIN Primitive drawing section
        this.vehicle.display();

        this.defaultMaterial.apply();
        this.updateAppliedTexture();

        this.cube.display();

        this.terrain.display();

        for(var i = 0; i < this.supplies.length; i++){
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
            for(var i = 0; i < this.nSuppliesDelivered; i++){
                this.supplies[i].reset();
            }
            this.nSuppliesDelivered = 0;
            keysPressed=true;
        }

        // quando o modo piloto automático é ativado as teclas "W", "S", "A", "D" são ignoradas 
        if (this.gui.isKeyPressed("KeyP") && this.delay == 0) {
            text+=" P ";
            this.delay = 10; // introduzir delay de aproximadamente 0.5 segundos
            this.vehicle.autopilot();
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyL") && this.delay == 0) {
            text+=" L ";
            this.delay = 10; // introduzir delay de aproximadamente 0.5 segundos
            if (this.nSuppliesDelivered < this.supplies.length && this.supplies[this.nSuppliesDelivered].state == 0){
                this.supplies[this.nSuppliesDelivered].drop(this.vehicle.position);
                this.nSuppliesDelivered++;
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