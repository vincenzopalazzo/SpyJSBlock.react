//SpyJSBlock.react (c) by Vincenzo Palazzo vincenzopalazzodev@gmail.com
//
//SpyJSBlock-Ngraph is licensed under a
//Creative Commons Attribution 4.0 International License.
//
//You should have received a copy of the license along with this
//work. If not, see <http://creativecommons.org/licenses/by/4.0/>
'use strict';

/**
 * @author https://vincenzopalazzo.github.io/
 */
class ManagerActionContainer{

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
