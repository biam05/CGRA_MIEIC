class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.terrain = new MyPlane(scene, 20);

        // Textures initialization
        this.terrainTexture = new CGFtexture(scene, 'images/terrain.jpg'); // informação da cor a ser mapeada sobre o terreno
        this.heightmapTexture = new CGFtexture(scene, 'images/heightmap.jpg'); // mapa de alturas

        // shader initialization
        this.terrainShader = new CGFshader(scene.gl, 'shaders/terrain.vert', 'shaders/terrain.frag');
        this.terrainShader.setUniformsValues({ uSampler1: 1 });
        this.terrainShader.setUniformsValues({ uSampler2: 2 });
    }

    display() {
        // activate terrain shader
        this.scene.setActiveShader(this.terrainShader);
        this.terrainTexture.bind(1);
        this.heightmapTexture.bind(2);

        this.scene.pushMatrix();
        this.scene.scale(50.0, 8.0, 50.0); 
        this.scene.rotate(-Math.PI/2.0, 1.0, 0.0, 0.0);
        this.terrain.display();
        this.scene.popMatrix();

        // restore default shader 
        this.scene.setActiveShader(this.scene.defaultShader);
    }

}