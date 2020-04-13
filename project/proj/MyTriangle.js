/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			0, 0, 0.5,  //0
			0.5, 0, -0.5,  //1
			-0.5, 0, -0.5  //2
            /*
			0, 0, 0.5,  //3
			0.5, 0, -0.5,  //4
			-0.5, 0, -0.5  //5
			*/
		];

		this.indices = [
			0, 1, 2
            /*
			3, 5, 4
			*/
		];

		this.normals = [
			0, 1, 0,
			0, 1, 0,
			0, 1, 0
            /*
			0, -1, 0,
			0, -1, 0,
			0, -1, 0
			*/
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}