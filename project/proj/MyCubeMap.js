/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
            //Front 
			0.5, 0.5, -0.5,  //0
			-0.5, 0.5, -0.5,  //1
			-0.5, -0.5, -0.5,  //2
			0.5, -0.5, -0.5,  //3

			//Top 
			-0.5, 0.5, -0.5,  //4
			0.5, 0.5, -0.5,  //5
			0.5, 0.5, 0.5,  //6
			-0.5, 0.5, 0.5,  //7

            //Bottom
			-0.5, -0.5, 0.5,  //8
            0.5, -0.5, 0.5,  //9
            0.5, -0.5, -0.5,  //10
            -0.5, -0.5, -0.5,  //11

            //Left
            -0.5, 0.5, -0.5,  //12
            -0.5, 0.5, 0.5,  //13
            -0.5, -0.5, 0.5,  //14
            -0.5, -0.5, -0.5,  //15

            //Right
            0.5, 0.5, 0.5,  //16
            0.5, 0.5, -0.5,  //17
            0.5, -0.5, -0.5,  //18
            0.5, -0.5, 0.5,  //19

            //Back
            -0.5, 0.5, 0.5,  //20
            0.5, 0.5, 0.5,  //21
            0.5, -0.5, 0.5,  //22
            -0.5, -0.5, 0.5,  //23
		];

		this.indices = [
			//Front
			0, 1, 2,
			3, 0, 2,

			//Top
			4, 5, 6,
			7, 4, 6,

			//Bottom
			8, 9, 10,
			11, 8, 10,

			//Left
			12, 13, 14,
			15, 12, 14,

			//Right
			16, 17, 18,
			19, 16, 18,

			//Back
			20, 21, 22,
			23, 20, 22,
		];

		this.normals = [
			//Front
			0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            
            //Top
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,

            //Bottom
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,

            //Left
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,

            //Right
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,

            //Back
			0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];

        this.texCoords = [
            //Front
            0.50, 1/3,
            0.25, 1/3,
            0.25, 2/3,
            0.50, 2/3,

            //Top
            0.25, 1/3,
            0.50, 1/3,
            0.50, 0.00,
            0.25, 0.00,
            
            //Bottom
            0.25, 1.00,
            0.50, 1.00,
            0.50, 2/3,
            0.25, 2/3,

            //Left
            0.25, 1/3,
            0.00, 1/3,
            0.00, 2/3,
            0.25, 2/3,

            //Right
            0.75, 1/3,
            0.50, 1/3,
            0.50, 2/3,
            0.75, 2/3,

            //Back
            1.00, 1/3,
            0.75, 1/3,
            0.75, 2/3,
            1.00, 2/3,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	display(){
        //this.scene.setAmbient(1.0, 1.0, 1.0, 1.0);
        //this.scene.setDiffuse(0.0, 0.0, 0.0, 1.0);
        //this.scene.setSpecular(0.0, 0.0, 0.0, 1.0);

	    this.scene.pushMatrix();
        //this.scene.scale(50.0, 50.0, 50.0);
        super.display();
        this.scene.popMatrix();
	}

	updateBuffers(){}
}
