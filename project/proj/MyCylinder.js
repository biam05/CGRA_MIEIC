/**
 * MyCylinder que aproxima um cilindro de raio de uma unidade, com um número variável de "lados" (slices) , e altura de uma unidade em Y. 
 * A base do cilindro é coincidente com o plano XZ e centrada na origem.
 * @method constructor
 * @param  {CGFscene} scene - MyScene object
 * @param  {integer} slices - number of slices around Y axis
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
  /**
   * @method initBuffers
   * Initializes the Cylinder buffers
   */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords=[];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;
        var texture = 0;
        var textureInc = 1/this.slices;

        for(var i = 0; i <= this.slices; i++){
            
            var sa = Math.sin(ang);
            var ca = Math.cos(ang);

            //Plano Y = 0
            this.vertices.push(ca, 0, -sa);
            this.normals.push(ca, 0, -sa);
            this.texCoords.push(texture, 1);

            //Plano Y = 1
            this.vertices.push(ca, 1, -sa);
            this.normals.push(ca, 0, -sa);
            this.texCoords.push(texture, 0);
            
            if(i!=0){ 
                this.indices.push(2*i, (2*i+1), (2*i-1));
                this.indices.push(2*i, (2*i-1), (2*i-2));
            }

            ang += alphaAng;
            texture += textureInc;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    /*updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }*/
}