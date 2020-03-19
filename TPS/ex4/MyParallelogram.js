/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			//0
			1, 1, 0,	//0
			1, 1, 0,	//1
			//1
			0, 0, 0,	//2
			0, 0, 0,	//3
			//2
			3, 1, 0,	//4
			3, 1, 0,	//5
			//3
			2, 0, 0,	//6
			2, 0, 0		//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			//0, 1, 2,
			0, 2, 4,	
			//0, 2, 1, 
			0, 4, 2,
			//1, 3, 2,
			2, 6, 4,
			//1, 2, 3,
			2, 4, 6,
		];

		this.normals = [
			0, 0, 1,
			0, 0, -1,

			0, 0, 1,
			0, 0, -1,

			0, 0, 1,
			0, 0, -1,
			
			0, 0, 1,
			0, 0, -1,
		]

		this.texCoords = [
			0.75, 0.75,
			0.75, 0.75,			
			1, 1,
			1, 1,
			0.25, 0.75,
			0.25, 0.75,
			0.5, 1,
			0.5, 1,
		]


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}