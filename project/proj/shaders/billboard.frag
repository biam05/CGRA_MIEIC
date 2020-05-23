#ifdef GL_ES
precision highp float;
#endif

varying vec3 vVertexPosition;

uniform int suppliesDelivered;

void main() {
	// A componente vermelha evolui de forma inversa à verde, sendo que o vermelho deve ir de 1 até 0 ao longo do eixo X,
	// e o verde ao contrário, de 0 a 1. A posição em X varia para o plano de -0.5 a 0.5
	
	float cutoff = (float(suppliesDelivered) / 5.0) - 0.5; // corresponde à largura onde o gradiente é visível

	if(vVertexPosition.x > cutoff){
		//gl_FragColor =  vec4(0.5, 0.5, 0.5, 1.0);
		gl_FragColor =  vec4(0.0, 0.0, 0.0, 1.0);
	} else {
		gl_FragColor.rgb =  vec3(1.0 - (0.5 + vVertexPosition.x), 0.5 + vVertexPosition.x, 0.0);
        gl_FragColor.a = 1.0;
	}
}