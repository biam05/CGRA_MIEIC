class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(scene, 20);

        // Textures initialization
        this.terrainTexture = new CGFtexture(scene, 'images/terrain.jpg');
        this.heightmapTexture = new CGFtexture(scene, 'images/heightmap.jpg');

        // shader initialization
        this.terrainShader = new CGFshader(scene.gl, 'shaders/terrain.vert', 'shaders/terrain.frag');

        this.terrainShader.setUniformsValues({ uSampler1: 1});
        this.terrainShader.setUniformsValues({ uSampler2: 2});
    }

    display() {

        // activate terrain shader
        this.scene.setActiveShader(this.terrainShader);

        this.terrainTexture.bind(1);
        this.heightmapTexture.bind(2);

        this.scene.pushMatrix();
        //this.scene.translate(0, -25, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(50, 50, 50);
        this.plane.display();
        this.scene.popMatrix();

        // restore default shader (will be needed for drawing the axis in next frame)
        this.scene.setActiveShader(this.scene.defaultShader);
    }

}