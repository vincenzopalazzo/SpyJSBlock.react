//SpyJSBlock.react (c) by Vincenzo Palazzo vincenzopalazzodev@gmail.com
//
//SpyJSBlock-Ngraph is licensed under a
//Creative Commons Attribution 4.0 International License.
//
//You should have received a copy of the license along with this
//work. If not, see <http://creativecommons.org/licenses/by/4.0/>

require('normalize.css/normalize.css');
require('styles/App.css');

import '@material/react-layout-grid/dist/layout-grid.css';
import '@material/react-button/dist/button.css';

import React from 'react';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import Button from '@material/react-button';

import ApplyLouvain from '../../actions/ApplyLouvainClusteringAction'

const DESCRIPTION_LOUVAIN = 'The Louvain method is a simple, efficient and easy-to-implement method for identifying \n' +
  'communities in large networks. The method has been used with success for networks of many different \n' +
  'type (see references below) and for sizes up to 100 million nodes and billions of links. The analysis of \n' +
  'a typical network of 2 million nodes takes 2 minutes on a standard PC. The method unveils hierarchies of \n' +
  'communities and allows to zoom within communities to discover sub-communities, sub-sub-communities, \n' +
  'etc. It is today one of the most widely used method for detecting communities in large networks.';

class DialogForLouvain extends React.Component {

  constructor(props) {
    super(props);

    this.doApplyLouvain = this.doApplyLouvain.bind(this);
  }

  doApplyLouvain(closeDialog){
    this.props.setState({isLoading: true});
    let graph = this.props.render.graph(undefined);
    let instanceApplyLouvain = ApplyLouvain.getInstance();
    instanceApplyLouvain.calculateCluster(graph);
    if(instanceApplyLouvain.hasExecuted()){
      this.props.setState({
        instanceLouvain: instanceApplyLouvain,
        openSnackBar: true,
        isLoading: false,
        messageSnackBar: 'Louvain Applicated'
      });
    }
    _drawClustering(this.props.render, instanceApplyLouvain);
    closeDialog();
  }

  render() {
    let {title, closeDialog} = this.props;
    return (
      <div>
        <h3 className="title-dialog"> {title} </h3>
        <Grid>
          <Row>
            <Cell columns={12}>{DESCRIPTION_LOUVAIN}</Cell>
          </Row>
         <Row className="mt-1">
           <Cell columns={5}/>
           <Cell columns={7}>
             <Button
               className="buttons-dialog"
               raised={true}
              icon={<i className="material-icons icon-black">close</i>}
              onClick={() => closeDialog()}
             >
               Undo
             </Button>
             <Button
               className="buttons-dialog-default"
               raised={true}
               icon={<i className="material-icons icon-black">done</i>}
               onClick={() => this.doApplyLouvain(closeDialog)}
             >
               Apply
             </Button>
           </Cell>
         </Row>
        </Grid>
      </div>
    );
  }
}

function _drawClustering(render, resultAlg){
  if(!render){
    throw new Error('Renderer null');
  }
  render.forEachNode(nodeUI => nodeUI.color = resultAlg.getColorForClass(nodeUI));
}

DialogForLouvain.defaultProps = {};

export default DialogForLouvain;
