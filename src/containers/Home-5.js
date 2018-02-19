import React, { Component } from 'react';
import styled, {keyframes} from 'styled-components'
import {H2} from 'components/styledComponents/Typography'
import {FlexCol, FlexRow} from 'globalStyles'
import {fabric} from 'fabric'
const painting = require('assets/images/painting1.jpg')
const img1 = require('assets/images/rtd1.jpg')
const img2 = require('assets/images/rtd2.jpg')
const img3 = require('assets/images/rtd3.jpg')

const Products = FlexRow.extend`
  height: 150px;
  position: fixed;
  bottom: 0;
  justify-content: space-around;
  border-top: 2px solid black;
  img {
    max-height: 80%;
  }
`

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      img: 'https://s3.amazonaws.com/codepen-az/rtd1.jpg',
      active: null
    }
  }
  componentDidMount() {
    this.canvas = new fabric.Canvas('c', {
      width: this.canvasRef.clientWidth,
      height: this.canvasRef.clientHeight
    });
    // var rect = new fabric.Rect({
    //   left: 100,
    //   top: 100,
    //   fill: 'red',
    //   width: 20,
    //   height: 20
    // });
    // this.canvas.add(rect)
    fabric.Image.fromURL('https://s3.amazonaws.com/codepen-az/figures.jpg', (oImg) => {
      this.canvas.add(oImg);
      oImg.set({lockMovementX: true, lockMovementY: true, lockScalingX: true, lockScalingY: true, lockUniScaling: true, lockRotation: true})
      this.canvas.centerObject(oImg)
      this.canvas.renderAll()
    });

  }
  addProduct(src) {
    fabric.Image.fromURL(src, (oImg) => {
      const dim = oImg.getOriginalSize()
      oImg.set({scaleY: 200/dim.height, scaleX: (200/dim.height) })
      this.canvas.add(oImg);
      this.canvas.centerObject(oImg)
      this.canvas.renderAll()
    });
  }
  render() {
    const images = [
      'https://s3.amazonaws.com/codepen-az/shirt.png',
      'https://s3.amazonaws.com/codepen-az/necklace.png',
      'https://s3.amazonaws.com/codepen-az/boots.png',
      'https://s3.amazonaws.com/codepen-az/skirt.png',
    ]

    return (
      <div>
        <canvas style={{width: '100vw', height: '80vh'}} id="c" ref={ref => this.canvasRef = ref} />
        <Products>
          {
            images.map(image => (
              <img onClick={() => this.addProduct(image)} src={image} />
            ))
          }
        </Products>
      </div>
    );
  }
}
