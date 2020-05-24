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
            0.50, 0.335,
            0.25, 0.335,
            0.25, 0.664,
            0.50, 0.664,

            //Top
            0.251, 0.332,
            0.499, 0.332,
            0.499, 0.002,
            0.251, 0.002,
            
            //Bottom
            0.26, 0.99,
            0.49, 0.99,
            0.49, 0.664,
            0.26, 0.664,

            //Left
            0.25, 0.335,
            0.00, 0.335,
            0.00, 0.663,
            0.25, 0.664,

            //Right
            0.75, 0.335,
            0.50, 0.335,
            0.50, 0.664,
            0.75, 0.664,

            //Back
            1.00, 0.335,
            0.75, 0.335,
            0.75, 0.664,
            1.00, 0.664
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	display(){
		// componente especular e difusa nulas, e componente ambiente forte
        this.scene.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.scene.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.scene.setSpecular(0.0, 0.0, 0.0, 1.0);

	    this.scene.pushMatrix();
        this.scene.scale(50.0, 50.0, 50.0);
        super.display();
        this.scene.popMatrix();
	}
}
