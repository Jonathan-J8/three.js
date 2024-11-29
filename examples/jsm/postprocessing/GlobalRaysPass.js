import {
	ShaderMaterial,
	UniformsUtils
} from 'three';
import { Pass, FullScreenQuad } from './Pass.js';
import { GlobalRaysShader } from '../shaders/GlobalRaysShader.js';

class GlobalRaysPass extends Pass {

	constructor() {

		super();

		const shader = GlobalRaysShader;

		this.uniforms = UniformsUtils.clone( shader.uniforms );

		this.material = new ShaderMaterial( {

			name: shader.name,
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		} );

		this.fsQuad = new FullScreenQuad( this.material );

	}
	render( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {


		this.uniforms.tDiffuse.value = readBuffer.texture;

		// this.fsQuad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );
			// TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
			if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
			this.fsQuad.render( renderer );

		}

	}

	dispose() {

		this.material.dispose();

		this.fsQuad.dispose();

	}

}

export { GlobalRaysPass };
