import React from 'react';
import ReactDOM from 'react-dom';

import './common.css';

import Carousel from './Carousel';

ReactDOM.render(
  <Carousel
    backgroundColor="pink"
    slides={[
      {
        id: '1',
        action: {
          type: 'link',
          value: 'http://google.com',
        },
        sizes: [
          {
            size: 'large',
            images: [
              {
                url: 'http://static.milibris.com/carousel/sfr-presse/resources/a2a09d44-c739-4ed4-ab3b-bed47e4f5b91',
              },
              {
                url: 'http://static.milibris.com/carousel/sfr-presse/resources/1db4da93-1d0c-44d3-afb9-7bef3ec2656a',
              },
            ],
          }
        ]
      },
      {
        id: '2',
        action: {
          type: 'link',
          value: 'http://google2.com',
        },
        sizes: [
          {
            size: 'large',
            images: [
              {
                url: 'http://static.milibris.com/carousel/sfr-presse/resources/3c7c5ac9-5bf5-4524-8a69-84c1e10fd09b',
              },
              {
                url: 'http://static.milibris.com/carousel/sfr-presse/resources/140cca96-4371-4579-abd0-c142262a33d4',
              },
            ],
          }
        ]
      },
    ]}
  />,
  document.getElementById('carousel-container')
);
