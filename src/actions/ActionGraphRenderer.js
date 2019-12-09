'use strict';

class ManagerActionContainer{

  constructor() {}

  static findNodeWithId(renderer, id, colorSelect){
    let nodeUI = renderer.getNode(id);
    if(nodeUI){
      //console.log(id);
      //console.debug(nodeUI);
      nodeUI.color = colorSelect;
      nodeUI.size = 50;

      //Focus to node
      renderer.showNode(id);
    }else{
      throw Error('Node not found');
    }
  }
}

export default ManagerActionContainer;
