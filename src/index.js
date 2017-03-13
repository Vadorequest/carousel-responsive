import React from 'react';
import ReactDOM from 'react-dom';

import './common.css';

import Carousel from './Carousel';

ReactDOM.render(
  <Carousel
    debug={true}
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
      {
        id: '3',
        action: {
          type: 'link',
          value: 'http://google2.com',
        },
        sizes: [
          {
            size: 'large',
            images: [
              {
                url: "http://static.milibris.com/carousel/sfr-presse/resources/394de467-2479-416f-b0b2-d18cc805f48b",
              },
              {
                url: "http://static.milibris.com/carousel/sfr-presse/resources/833e4598-4f40-42f3-a994-8027106f48a6",
              },
            ],
          }
        ]
      },
      {
        id: '4',
        action: {
          type: 'link',
          value: 'http://google2.com',
        },
        sizes: [
          {
            size: 'large',
            images: [
              {
                url: "http://static.milibris.com/carousel/sfr-presse/resources/222839ef-f177-441b-98df-77fdd0773dcd",
              },
              {
                url: "http://static.milibris.com/carousel/sfr-presse/resources/a0b1305b-3442-4852-ae33-bcb9949fc5cf",
              },
            ],
          }
        ]
      },
      {
        id: '5',
        action: {
          type: 'link',
          value: 'http://google2.com',
        },
        sizes: [
          {
            size: 'large',
            images: [
              {
                url: "http://static.milibris.com/carousel/sfr-presse/resources/6c7ce2fe-2c3f-4fb5-8f58-7aa3d40541bf",
              },
              {
                url: "http://static.milibris.com/carousel/sfr-presse/resources/814b8246-d894-4888-b2ba-96da186a176f",
              },
            ],
          }
        ]
      },
    ]}
  />,
  document.getElementById('carousel-container')
);
