/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0.5, 0.5, 0.5,   //0
			0.5, -0.5, 0.5,  //1
			-0.5, 0.5, 0.5,  //2
			-0.5, -0.5, 0.5, //3
			
			0.5, 0.5, -0.5,  //4
			0.5, -0.5, -0.5, //5
			-0.5, 0.5, -0.5, //6
			-0.5, -0.5, -0.5 //7
		];

		this.indices = [
		    //0123
			0, 2, 3,
			0, 3, 1,

			//4567
			4, 5, 7,
			4, 7, 6,


			//1345
			4, 0, 1,
			4, 1, 5,

			//2367
			6, 7, 3,
			6, 3, 2,

			//1357
			7, 5, 1,
			7, 1, 3,

			//0246
			4, 6, 2,
			4, 2, 0,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}