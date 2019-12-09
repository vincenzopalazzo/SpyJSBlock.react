// Copyright (c) 2018-2019 Vincenzo Palazzo vicenzopalazzodev@gmail.com
// Distributed under the Apache License Version 2.0 software license,
// see https://www.apache.org/licenses/LICENSE-2.0.txt

'use strict';

import NgraphLouvain from 'ngraph.louvain'
import ManagerColorUtil from '../sources/ManagerColorUtil'
import Coarsen from 'ngraph.coarsen'

let mapClassForColor = new Map();
let listClass = [];
module.exports = (function () {
  let instance;

  function createInstance() {
    return {
      calculateCluster: function(graph){
        if(!graph){
          throw Error('graph null');
        }
        instance.claster = NgraphLouvain(graph);
        console.debug('***** CALCULATED CLUSTER ***********');
      },
      getColorForClass: function(node){
        if(!instance.claster){
          //console.debug('****** no color ******');
          return null;
        }
        //console.debug('****** color ******');
        let classNode = instance.claster.getClass(node.id);
        if(mapClassForColor.has(classNode)){
          return mapClassForColor.get(classNode);
        }else{
          let color = ManagerColorUtil.getInstance().getRandomColor();
          mapClassForColor.set(classNode, color);
          listClass.push({
            classNode: classNode,
            color: color
          });
          return color;
        }
      },
      hasExecuted: function(){
        return (instance.claster !== undefined);
      },
      getClassNode: function(node){
        return instance.claster.getClass(node.id);
      },
      getListClass: function(){
        return listClass;
      },
      getSubGraph: function (graph, clazz) {
        if(!instance.claster){
          return null;
        }

        if(!instance.coarsen){
          let coarsenList = Coarsen(graph, instance.claster);
          console.debug('Coarsen: ', instance.coarsen);
          instance.coarsen =  Coarsen.getSubgraphs(coarsenList)
        }
       //console.debug('Node comunity: ', instance.coarsen);
        let nodeWanted;
        for(let node of instance.coarsen){
          //console.log(node);
          if(node.id === parseInt(clazz)){
            //console.debug('found', node.id);
            nodeWanted = node;
            break;
          }
        }
        return nodeWanted;
      }
    };
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
