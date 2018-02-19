import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.div`
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  box-sizing: border-box;
  flex: 1 1 20%;
  // min-height: 450px;
  min-width: 300px;
  height: 400px;
  overflow: hidden;
  position: relative;
`;

const CardImg = styled.img`
  // width: 300px;
  // height: 300px;

  width: 100%;
  height: 100%;
  object-fit: cover;
  // padding: 20px;
`;

const TextOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  h3 {
    color: transparent;
    font-size: 1.75em;
  }

  &:hover h3 {
    color: yellow;
  }
`;

const ProductCard = props => {
  return (
    <Card>
      <Link style={{height: 0}} to={`shop/${props.product.id}`}>
        <CardImg src={props.product.images[0].src} />
        <TextOverlay>
          <h3>{props.product.vendor}</h3>
          <h3>{props.product.title}</h3>
          <hr />
          <h3>{props.product.variants[0].price}</h3>
        </TextOverlay>
      </Link>
    </Card>
  );
}

export default ProductCard
