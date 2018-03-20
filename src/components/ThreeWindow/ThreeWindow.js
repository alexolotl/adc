import React, { Component } from 'react';
import * as THREE from 'three';
import textFragment from './shaders/frag2'
import textVertex from './shaders/textVertex'

import styled from 'styled-components'
const _texmap = require('assets/images/adc.png')
const _texmap2 = require('assets/images/lookbook/5A3D47D4-DE5F-4615-B0C6-EF5BDBD48C7B.jpg')
const _texmap3 = require('assets/images/lookbook/4E75ABD1-7990-4D36-9D04-BF3BB9D48701.jpg')
const _texmap4 = require('assets/images/lookbook/887D160C-45A2-43EE-86EB-E33615A0A0FB.jpg')

const Div = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 4;
  pointer-events: none;

  canvas {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 4;
  }
`

export default class ThreeWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scene: null
    }
  }

  componentDidMount() {
    this.setState({scene: new Three(this.threeRef, window.innerWidth, window.innerHeight)})

    // audio.src = URL.createObjectURL(files[0]);
    // audio.load();
    // audio.play();
    // var context = new AudioContext();
    // var src = context.createMediaElementSource(audio);
    // var analyser = context.createAnalyser();
    // src.connect(analyser);
    // analyser.connect(context.destination);
    // analyser.fftSize = 256;
    // var bufferLength = analyser.frequencyBinCount;
    // console.log(bufferLength);
    // var dataArray = new Uint8Array(bufferLength);
    // var sum = 0;
    // for (var i = 0; i < bufferLength; i++) {
    //   sum += dataArray[i]
    // }
    // sum /= bufferLength
    //





  }

  componentDidUpdate() {
    const imgTex = _loader.load(this.props.img)
    this.state.scene.scene.morph.uniforms.textureSampler2.value = this.state.scene.scene.morph.uniforms.textureSampler1.value
    this.state.scene.scene.morph.uniforms.textureSampler1.value = imgTex
    this.state.scene.scene.morph.uniforms.ramp.value = 0
  }

  render() {
    return (
      <Div innerRef={ref => this.threeRef = ref}>
      </Div>
    )
  }
}

const _loader = new THREE.TextureLoader()
_loader.crossOrigin = ''
const _tex1 = _loader.load(_texmap)
// const _tex2 = _loader.load(_texmap3)
// const _tex3 = _loader.load(_texmap4)
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
    this.uniforms.ramp.value += 0.02;
    this.uniforms.mouse.value = new THREE.Vector2(
      Math.abs(_mouse.x - _dampenedMouse.x),
      Math.abs(_mouse.y - _dampenedMouse.y)
    ).multiplyScalar(0.005);
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


        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioCtx.createAnalyser();
        // this.audio.src = URL.createObjectURL(inputRef.files[0]);
        this.audio = document.createElement('audio')
        this.audio.src = require('assets/test.mp3')
        this.audio.load();
        this.audio.play();
        this.source = this.audioCtx.createMediaElementSource(this.audio);
        // this.source = this.audioCtx.createMediaStreamSource(stream);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        console.log(this.bufferLength);
  }

  update() {
    this.uniforms.time.value += 0.02;
    this.uniforms.ramp.value += 0.02;
    this.uniforms.mouse.value = new THREE.Vector2(
      Math.abs(_mouse.x - _dampenedMouse.x),
      Math.abs(_mouse.y - _dampenedMouse.y)
    ).multiplyScalar(0.0006);

    var dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);
    var amp = 0
    for(var i = parseInt(0*this.bufferLength/12); i < parseInt(1*this.bufferLength/12); i++) {
      amp += dataArray[i]
    }
    amp /= parseInt(this.bufferLength / 12)
    this.uniforms.amplitude.value += (amp/256 - this.uniforms.amplitude.value) * 0.1
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
    window.addEventListener('resize', this.resize.bind(this), false);
    window.addEventListener('mousemove', this.mousemove.bind(this), false);
    window.addEventListener('click', this.click.bind(this), false);
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
    this.width = window.innerWidth;
    this.height = window.innerHeight;

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
