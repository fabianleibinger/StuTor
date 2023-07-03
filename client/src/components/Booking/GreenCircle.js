import React from 'react';
import styled from 'styled-components';

const GreenCircle = styled.div`
  background-color: #6CA779;
  color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GreenCircleText = styled.span`
  font-size: 16px;
`;

const GreenCircleComponent = ({ pricePerHourEuro }) => (
  <GreenCircle>
    <GreenCircleText>{pricePerHourEuro}€/hour</GreenCircleText>
  </GreenCircle>
);

export default GreenCircleComponent;