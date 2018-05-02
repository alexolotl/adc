import React, { Component } from 'react';
import * as THREE from 'three';
import textFragment from './shaders/frag2'
import textVertex from './shaders/textVertex'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import styled from 'styled-components'
const _texmap = require('assets/images/lookbook/F303BB32-EC15-44E0-9904-41F29C279929.jpg')

const Div = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2 !important;
  pointer-events: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  canvas {
    position: fixed;
    // left: 0;
    // width: 100vw;
    // height: 100vh;
    z-index: -2 !important;
  }
`

class ThreeWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scene: null
    }
  }

  componentDidMount() {
    this.setState({scene: new Three(this.threeRef, window.innerWidth, window.innerHeight)})
  }

  componentDidUpdate(oldProps, oldState) {
    if (this.props.image != oldProps.image) {

      // this.state.scene.scene.morph.uniforms.textureSampler2.value.image.src = this.state.scene.scene.morph.uniforms.textureSampler1.value.image.src
      // this.state.scene.scene.morph.uniforms.textureSampler1.value.image.src = this.props.image
      //
      // this.state.scene.scene.morph.uniforms.ramp.value = 0


      _loader.load(this.props.image, imgTex => {
        this.state.scene.scene.morph.uniforms.textureSampler2.value.image.src = this.state.scene.scene.morph.uniforms.textureSampler1.value.image.src
        this.state.scene.scene.morph.uniforms.textureSampler1.value = imgTex
        this.state.scene.scene.morph.uniforms.ramp.value = 0
      })

    }
  }

  render() {
    return (
      <Div innerRef={ref => this.threeRef = ref}>
      </Div>
    )
  }
}

export default withRouter(connect(
  state => ({
    image: state.three.image
  })
)(ThreeWindow))

const _loader = new THREE.TextureLoader()
_loader.crossOrigin = ''
const _tex1 = _loader.load(_texmap)
const _mouse = new THREE.Vector2(0, 0);
const _dampenedMouse = new THREE.Vector2(0, 0);

class Sphere extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.SphereGeometry(3, 30, 30);

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      // transparent: true,
      // wireframe: true,
      map: _tex1,
      side: THREE.DoubleSide
    });
    super(geometry, material);
    this.rotation.x = Math.random(Math.PI)
    this.rotation.y = Math.random(Math.PI)
  }

  update() {
    this.rotation.x += 0.0005;
    this.rotation.y += 0.0005;
  }
}

class TextCanvas extends THREE.Mesh {
  constructor() {
    const text = 'Antes de Cristo';

    const canvas = document.createElement('canvas');

    const context = canvas.getContext('2d');
    const metrics = context.measureText(text);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = 'rgba(0,0,0,1)';
    context.fillRect(0,0,canvas.width,canvas.height);
    context.font = '200px Xolonium';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = 'rgba(255,255,255,1)';

    context.fillText(text, canvas.width / 2, canvas.height / 2);
    const textTexture = new THREE.Texture(canvas);
    textTexture.needsUpdate = true;
    console.log(window.innerWidth)

    const uniforms = {
      textureSampler: { type: 't', value: textTexture },
      textureSampler1: { type: 't', value: _tex1 },
      textureSampler2: { type: 't', value: _tex1 },
      textureSampler3: { type: 't', value: _tex1 },
      ramp: {type: 'f', value: 0},
      time: { type: 'f', value: 0 },
      mouse: { type: 'v2', value: new THREE.Vector2() },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      }
    };

    // const material = new THREE.MeshBasicMaterial({
    // 	map : texture,
    //   // side: THREE.DoubleSide
    // })
    // material.transparent = true
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: textVertex,
      fragmentShader: textFragment,
      // transparent: true
    });
    const geometry = new THREE.PlaneGeometry(canvas.width, canvas.height)
    // const geometry = new THREE.SphereGeometry(
    //   16,
    //   32,
    //   32,
    //   0,
    //   Math.PI * 2,
    //   Math.PI / 2 - 0.4,
    //   0.8
    // );

    super(geometry, material);

    // this.position.z = 4
    this.scale.set(.01,.01,.01)
    // this.scale.set(0.2, 0.2, 0.2);
    this.rotateX = Math.PI / 2;
    this.uniforms = uniforms;
  }

  update() {
    this.uniforms.time.value += 0.02;
    this.uniforms.ramp.value += 0.06;
    this.uniforms.mouse.value = new THREE.Vector2(
      Math.abs(_mouse.x - _dampenedMouse.x),
      Math.abs(_mouse.y - _dampenedMouse.y)
    ).multiplyScalar(0.05);
  }
}

class TextObject extends THREE.Object3D {
  constructor() {
    super();
    this.textcanvas = new TextCanvas();
    this.add(this.textcanvas);
  }

  update() {
    // this.rotation.y -= 0.01;
    this.textcanvas.update();
  }
}

class Morph extends THREE.Mesh {
  constructor() {

    const uniforms = {
      textureSampler: { type: 't', value: null },
      textureSampler1: { type: 't', value: _tex1 },
      textureSampler2: { type: 't', value: _tex1 },
      textureSampler3: { type: 't', value: _tex1 },
      ramp: {type: 'f', value: 0},
      amplitude: {type: 'f', value: 0.5},
      time: { type: 'f', value: 0 },
      mouse: { type: 'v2', value: new THREE.Vector2() },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      }
    };

    const geometry = new THREE.PlaneGeometry(20, 20, 1)
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: textVertex,
      fragmentShader: textFragment,
      // transparent: true
    });
    super(geometry, material)
    this.uniforms = uniforms

    // this.createAudioCtx()
  }

  createAudioCtx() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.3;
    // this.audio.src = URL.createObjectURL(inputRef.files[0]);
    this.audio = document.createElement('audio')
    // this.audio.src = require('assets/test.mp3')
    this.audio.load();
    this.audio.play();
    this.source = this.audioCtx.createMediaElementSource(this.audio);
    // this.source = this.audioCtx.createMediaStreamSource(stream);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
    this.analyser.fftSize = 512;
    this.bufferLength = this.analyser.frequencyBinCount;
    // console.log(this.bufferLength);
  }

  updateAudio() {
    var dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);

    //this.analyser.getByteFrequencyData(dataArray);

    var amp = 0
    const amps = []
    const division = 256
    const start = 30
    const end = 60
    const offset = end - start
    for(var i = parseInt((start)*this.bufferLength/division); i < parseInt((end)*this.bufferLength/division); i++) {
      amp += dataArray[i]
      // amps.pushv(dataArray[i])
    }
    // console.log(amps)
    amp /= parseInt(this.bufferLength / division)*offset
    // console.log(amp/256)
    if (amp/256 > .6) {console.log('hit')}
    // this works too...
    // this.uniforms.amplitude.value += (amp/256 - this.uniforms.amplitude.value) * 0.07
    if (amp/256 > .6) {
      this.uniforms.amplitude.value += (amp/256 - this.uniforms.amplitude.value) * 0.07
    }
    else {
      this.uniforms.amplitude.value += (0 - this.uniforms.amplitude.value) * 0.07
    }
  }

  update() {
    this.uniforms.time.value += 0.02;
    this.uniforms.ramp.value += 0.02;
    this.uniforms.mouse.value = new THREE.Vector2(
      Math.abs(_mouse.x - _dampenedMouse.x),
      Math.abs(_mouse.y - _dampenedMouse.y)
    ).multiplyScalar(0.002);

    // this.updateAudio()

  }
}

class Scene extends THREE.Scene {
  constructor(bufferTexture, themeColor) {
    super();

    this.time = 0;

    this.morph = new Morph();
    this.add(this.morph)

    // this.add( new TextObject() );

    // this.add( new Sphere() )

    this.light1 = new THREE.PointLight(0x444444, 2);
    this.light1.position.set(20, 35, 70);
    this.add(this.light1);
  }

  update() {
    _dampenedMouse.x += (_mouse.x - _dampenedMouse.x) * 0.02;
    _dampenedMouse.y += (_mouse.y - _dampenedMouse.y) * 0.02;

    this.children.forEach(child => {
      if (child.update) {
        child.update()
      }
    })
  }
}

class Three {
  constructor(container, width, height, props) {
    this.width = width;
    this.height = height;
    this.fov = 45;
    this.aspect = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, 1, 1000);
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor( 0x000000, 0 ); // the default
    container.appendChild(this.renderer.domElement);

    const fps = 60;
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();

    this.scene = new Scene();

    this.resize();
    this.bind();
    this.loop();
  }

  bind() {
    // window.addEventListener('resize', this.resize.bind(this), false);
    window.addEventListener('mousemove', this.mousemove.bind(this), false);
    // window.addEventListener('click', this.click.bind(this), false);
  }

  loop() {
    this.raf = window.requestAnimationFrame(this.loop.bind(this));

    const now = Date.now();
    const delta = now - this.then;

    if (delta > this.fpsInterval) {
      this.scene.update();
      this.renderer.render(this.scene, this.camera);
      // this.renderer.render(this.bufferScene, this.bufferCamera);
      this.then = now;
    }
  }

  resize() {
    // this.width = window.innerWidth;
    // this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  mousemove(e) {
    _mouse.x = e.clientX;
    _mouse.y = e.clientY;
    //
    let timeout;
    const oldmouse = _mouse.clone();

    const mousevec = _mouse.clone();

    mousevec.x = mousevec.x / window.innerWidth * 2 - 1;
    mousevec.y = (1 - mousevec.y / window.innerHeight) * 2 - 1;
    oldmouse.x = oldmouse.x / window.innerWidth * 2 - 1;
    oldmouse.y = oldmouse.y / window.innerHeight * 2 - 1;
  }

  click() {
    // console.log('hi')
    // TweenLite.to(this.scene.morphsphere.uniforms.scale5, 2, {value: 3, ease:Power3.easeIn});
    // TweenLite.to(this.scene.morphsphere.uniforms.scale6, 2, {value: 0, ease:Power3.easeInOut});
  }
}
