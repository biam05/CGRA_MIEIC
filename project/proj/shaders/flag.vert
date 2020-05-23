attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float phase;
uniform int side;

void main() {
	vec3 offset = vec3(0.0, 0.0, 0.0);
	
	vTextureCoord = aTextureCoord;

	if (side == 1){
		offset.z = 0.05 * sin(25.0 * aVertexPosition.x + phase);
	} else if (side == 2){
		offset.z = 0.05 * sin(25.0 * aVertexPosition.x - phase);
	}

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
