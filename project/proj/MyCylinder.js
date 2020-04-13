/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords=[];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var texture = 0;
        var textureInc = 1/this.slices;

        for(var i = 0; i <= this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa = Math.sin(ang);
            var saa = Math.sin(ang + alphaAng);
            var ca = Math.cos(ang);
            var caa = Math.cos(ang + alphaAng);

            //Plane Y = 0
            this.vertices.push(ca, 0, -sa);
            this.normals.push(ca, 0, -sa);
            this.texCoords.push(texture, 1);

            //Plane Y = 1
            this.vertices.push(ca, 1, -sa);
            this.normals.push(ca, 0, -sa);
            this.texCoords.push(texture, 0);
            
            if(i!=0){
                this.indices.push(2*i, (2*i+1) , (2*i-1) );
                this.indices.push(2*i, (2*i-1) , (2*i-2) );
            }

            ang += alphaAng;
            texture += textureInc;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

/*// triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);*/