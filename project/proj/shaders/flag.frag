#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler1;

void main() {
	gl_FragColor = texture2D(uSampler1, vTextureCoord);
}
