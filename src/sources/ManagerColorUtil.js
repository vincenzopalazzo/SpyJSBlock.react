// Copyright (c) 2018-2019 Vincenzo Palazzo vicenzopalazzodev@gmail.com
// Distributed under the Apache License Version 2.0 software license,
// see https://www.apache.org/licenses/LICENSE-2.0.txt

'use strict';

const COLORS = [0xff5722,
  0xef6c00,
  0xc6ff00,
  0x00e676,
  0x2196f3,
  0x3d5afe,
  0x651fff,
  0xff1744,
  0x00e5ff,
  0x1de9b6,
  0x00e676,
  0xeceff1,
  0x001f3f,
  0x39CCCC,
  0x01FF70,
  0x01FF70,
  0x85144b,
  0x85144b,
  0xFF4136,
  0xFF851B
];

const COLOR_NODE_DEFAULT = [
  0x1967be,
  0x2780e3
];


module.exports = (function () {
  let instance;

  function createInstance() {
    console.log('Instance singleton');
    return {
      getRandomColor: function(){
        return COLORS[Math.floor(Math.random() * COLORS.length) |0];
      },
      getRandomNodeColor: function(){
        return COLOR_NODE_DEFAULT[Math.floor(Math.random() * COLOR_NODE_DEFAULT.length) |0];
      }
    }
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();
