const GlobalRaysShader = {

	name: 'GlobalRaysShader',

	uniforms: {

		tDiffuse: {	value: null }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

		 vUv = uv;
		 gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

	 }`,

	fragmentShader: /* glsl */`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

		}`

};



export { GlobalRaysShader };
