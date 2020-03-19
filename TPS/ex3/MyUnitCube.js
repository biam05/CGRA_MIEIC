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
			//cada vertice do cubo tem 3 normais, uma para cada eixo
			//logo sera preciso definir cada vertice 3 vezes

			//0
			0.5, 0.5, 0.5,   //0
			0.5, 0.5, 0.5,   //1
			0.5, 0.5, 0.5,   //2
			//1
			0.5, -0.5, 0.5,  //3
			0.5, -0.5, 0.5,  //4
			0.5, -0.5, 0.5,  //5
			//2
			-0.5, 0.5, 0.5,	 //6
			-0.5, 0.5, 0.5,	 //7
			-0.5, 0.5, 0.5,	 //8
			//3
			-0.5, -0.5, 0.5, //9
			-0.5, -0.5, 0.5, //10
			-0.5, -0.5, 0.5, //11
			//4
			0.5, 0.5, -0.5,  //12
			0.5, 0.5, -0.5,  //13
			0.5, 0.5, -0.5,  //14
			//5
			0.5, -0.5, -0.5, //15
			0.5, -0.5, -0.5, //16
			0.5, -0.5, -0.5, //17
			//6
			-0.5, 0.5, -0.5, //18
			-0.5, 0.5, -0.5, //19
			-0.5, 0.5, -0.5, //20
			//7
			-0.5, -0.5, -0.5,//21
			-0.5, -0.5, -0.5,//22
			-0.5, -0.5, -0.5,//23
		];

		this.indices = [
			// --- 0123
			//0, 2, 3,
			0, 6, 9,
			//0, 3, 1,
			0, 9, 3,

			// --- 4567
			//4, 5, 7,
			12, 15, 21,
			//4, 7, 6,
			12, 21, 18,

			// --- 1345
			//4, 0, 1,
			13, 1, 4,
			//4, 1, 5,
			13, 4, 16,

			// --- 2367
			//6, 7, 3,
			19, 22, 10,
			//6, 3, 2,
			19, 10, 7,

			// --- 1357
			//7, 5, 1,
			23, 17, 5,
			//7, 1, 3,
			23, 5, 11,

			// --- 0246
			//4, 6, 2,
			14, 20, 8,
			//4, 2, 0
			14, 8, 2
		    
		];

		this.normals = [
			//uma normal para cada eixo em cada vertice -> 3 * 8 = 24 normais
			//definir as normais de cada vertice pela ordem em que eles foram definidos
			
			//x, y, z
			0, 0, 1,
            1, 0, 0,
            0, 1, 0,
			//x, -y, z
			0, 0, 1,
            1, 0, 0,
            0, -1, 0,
			//-x, y, z
			0, 0, 1,
            -1, 0, 0,
            0, 1, 0,
			//-x, -y, z
			0, 0, 1,
            -1, 0, 0,
            0, -1, 0,
			//x, y, -z
			0, 0, -1,
            1, 0, 0,
            0, 1, 0,
			//x, -y, -z
			0, 0, -1,
            1, 0, 0,
            0, -1, 0,
			//-x, y, -z
			0, 0, -1,
            -1, 0, 0,
            0, 1, 0,
			//-x, -y, -z
            0, 0, -1,
            -1, 0, 0,
            0, -1, 0
        ];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateBuffers(complexity){
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}