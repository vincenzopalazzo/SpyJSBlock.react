//SpyJSBlock.react (c) by Vincenzo Palazzo vincenzopalazzodev@gmail.com
//
//SpyJSBlock-Ngraph is licensed under a
//Creative Commons Attribution 4.0 International License.
//
//You should have received a copy of the license along with this
//work. If not, see <http://creativecommons.org/licenses/by/4.0/>

import './../../styles/App.css';
import '@material/react-fab/dist/fab.css';
import '@material/react-dialog/dist/dialog.css';
import '@material/react-snackbar/dist/snackbar.css';

import React from 'react';

//Component
import Fab from '@material/react-fab'
import Dialog, {
  DialogTitle,
  DialogContent
} from '@material/react-dialog';
import {Snackbar} from '@material/react-snackbar';
import SearchBar from 'material-ui-search-bar'
import Loading from 'react-loading-animation';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

//NGraph module
import FromPrecompute from 'ngraph.fromprecompute'
import RenderGraph from 'ngraph.pixel'

//Local components
import DialogForLouvain from '../dialogs/DialogForLouvain';
import PanelDetails from '../details/PanelDetails';
import DialogNodeInformations from '../details/DialogNodeInformations';
import DialogSubGraph from '../dialogs/DialogSubGraph';

//Actions
import ManagerActionContainer from '../../actions/ActionGraphRenderer';

//App service
import ManagerColorUtil from '../../sources/ManagerColorUtil'

const StateSnackBar = _withState(Snackbar);
const HOCDialogInformatioNode = _withNodeInformation(Dialog);

class NGraphContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      graph: null,
      typeRenderer: 'pixel',
      typeGraph: 'address',
      actionName: 'address',
      isOpen: false,
      isOpenSubGraph: false,
      isBuild: false,
      isLoading: false,
      openSnackBar: false,
      messageSnackBar: '',
      render: undefined,
      idNodeDialogOpen: false,
      pauseRender: false,
      ColorUtil: ManagerColorUtil.getInstance()
    };

    this.buildGraph = this.buildGraph.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.closeDialogSubGraph = this.closeDialogSubGraph.bind(this);
    this.closeSnack = this.closeSnack.bind(this);
    this.doSearchNode = this.doSearchNode.bind(this);
    this.closeDialogNode = this.closeDialogNode.bind(this);
    this.stateRender = this.stateRender.bind(this);
    this.buildGraphAddress = this.buildGraphAddress.bind(this);
    this.buildGraphTransactions = this.buildGraphTransactions.bind(this);
    this.destroyDialogSubGraph = this.destroyDialogSubGraph.bind(this);
  }

  buildGraph(typeGraph) {
    if (!this.state.typeGraph || !this.state.actionName) {
      throw Error('The typeGraph and the actionName are/is undefined');
    }
    if (this.state.typeGraph !== this.state.actionName) {
      throw Error('The typeGraph and the actionName have the different value');
    }
    this.renderGraph(typeGraph);
    this.setState({
      isBuild: true,
      openSnackBar: true,
      actionName: this.state.typeGraph,
      messageSnackBar: 'constructed graph'
    });
  }

  renderGraph(typeGraph) {
    let positionFileName;
    let linksFileName;
    let labelsFileName;
    if (typeGraph === 'transaction') {
      console.debug('Type graph built: ', this.state.typeGraph);
      positionFileName = 'resources/tx/data/positions.bin';
      linksFileName = 'resources/tx/data/links.bin';
      labelsFileName = 'resources/tx/data/labels.json';
    } else if (typeGraph === 'address') {
      console.debug('Type graph built: ', this.state.typeGraph);
      positionFileName = 'resources/address/data/positions.bin';
      linksFileName = 'resources/address/data/links.bin';
      labelsFileName = 'resources/address/data/labels.json';
    } else {
      throw Error('Type graph not valid, ', this.state.typeGraph);
    }

    let renderPromisse = FromPrecompute({
      positionsPos: positionFileName,
      linksPos: linksFileName,
      labelsPos: labelsFileName,
      CreateRenderer: RenderGraph,
      renderSettings: {
        container: this.div,
        clearColor: 0x616161,
        node: _createNodePixel,
        link: _createPixelLink,
        physics: {
          springLength: 80,
          springCoeff: 0.0002,
          gravity: -1.2,
          theta: 0.8,
          dragCoeff: 0.02
        },
        is3d: true
      }
    });
    renderPromisse.then(result => this.setState({
      render: result,
      isLoading: false
    }));
  }

  stateRender() {
    if (this.state.pauseRender === true) {
      this.state.render.stable(true);
      this.setState({pauseRender: false})
    } else {
      this.state.render.stable(false);
      this.setState({pauseRender: true})
    }
  }

  buildGraphTransactions() {
    if (this.state.isBuild === true && this.state.typeGraph === 'transaction') {
      this.setState({
        openSnackBar: true,
        messageSnackBar: 'constructed already graph'
      });
      return;
    } else if (this.state.isBuild === true) {
      this.setState({
        openSnackBar: true,
        messageSnackBar: 'For build another type of graph reload page'
      });
      return;
    }
    this.setState({
      typeGraph: 'transaction',
      actionName: 'transaction',
      isBuild: false,
      isLoading: true
    });
    this.buildGraph('transaction');
  }

  buildGraphAddress() {
    if (this.state.isBuild === true && this.state.typeGraph === 'address') {
      this.setState({
        openSnackBar: true,
        messageSnackBar: 'constructed already graph'
      });
      return;
    } else if (this.state.isBuild === true) {
      this.setState({
        openSnackBar: true,
        messageSnackBar: 'For build another type of graph reload page'
      });
      return;
    }
    this.setState({
      typeGraph: 'address',
      actionName: 'address',
      isBuild: false,
      isLoading: true
    });
    this.buildGraph('address');
  }

  closeDialog() {
    this.setState({
      isOpen: false,
      isLoading: false
    });
  }

  closeDialogSubGraph() {
    this.setState({isOpenSubGraph: false});
  }

  closeDialogNode() {
    this.setState({idNodeDialogOpen: false});
  }

  closeSnack() {
    this.setState({openSnackBar: false});
  }

  doSearchNode(id) {
    let stringId = String(id);
    stringId.trim();
    try {
      ManagerActionContainer.findNodeWithId(this.state.render, stringId, 0xe65100);
      this.setState({
        id: stringId,
        idNodeDialogOpen: true
      });
    } catch (e) {
      this.setState({
        openSnackBar: true,
        messageSnackBar: 'Node not found!'
      });
    }
  }

  destroyDialogSubGraph() {
    this.comp.remove();
  }

  render() {
    return (
      <div>
        <div ref={div => {
          this.div = div;
        }}
             className="container-ngraph"
        >
          <div className="loading-animatin">
            {
              this.state.isLoading && <Loading width={'85px'} height={'100px'}/>
            }
          </div>
        </div>
        <Tooltip title="Address Graph" aria-label="Address Graph">
          <Fab icon={<i className="material-icons icon-black">account_balance_wallet</i>}
               className="top-bar-personal-four"
               onClick={() => this.buildGraphAddress()}
          />
        </Tooltip>
        <Tooltip title="Transaction Graph" aria-label="Transaction Graph">

          <Fab icon={<i className="material-icons icon-black">trending_up</i>}
               className="top-bar-personal-thee"
               onClick={() => this.buildGraphTransactions()}/>
        </Tooltip>
        <Tooltip title="Clustering Algorithm" aria-label="Clustering Algorithm">

          <Fab icon={<i className="material-icons icon-black">settings</i>}
               className="top-bar-personal-two"
               onClick={() => this.setState({isOpen: true})}/>
        </Tooltip>
        <Tooltip title="Manager Renderer" aria-label="Manager Renderer">
          <Fab icon={<i className="material-icons icon-black">pause_circle_outline</i>}
               className="top-bar-personal-one"
               onClick={() => this.stateRender()}/>
        </Tooltip>
        {this.state.render !== undefined && <SearchBar
          className="search-bar"
          value={this.state.value}
          onChange={(newValue) => this.setState({value: newValue})}
          onRequestSearch={() => this.doSearchNode(this.state.value)}
        />}
        <Dialog
          open={this.state.isOpen}
          onClose={() => this.setState({isOpen: false})}>
          <DialogTitle>Operation Dialog</DialogTitle>
          <DialogContent>
            <DialogForLouvain
              title={'Clustering algorithm'}
              closeDialog={this.closeDialog}
              setState={p => {
                this.setState(p)
              }}
              {...this.state}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={this.state.isOpenSubGraph}
          onClose={() => this.setState({isOpenSubGraph: false})}>
          <DialogTitle>SubGraph</DialogTitle>
          <DialogContent>
            <DialogSubGraph
              ref={comp => this.comp = comp}
              title={'Clustering Subgraph'}
              closeDialog={this.closeDialogSubGraph}
              onClosing={this.destroyDialogSubGraph}
              setState={p => {
                this.setState(p)
              }}
              {...this.state}
            />
          </DialogContent>
        </Dialog>
        <StateSnackBar eventCloseSnack={this.closeSnack} {...this.state} />
        <HOCDialogInformatioNode eventOnClose={this.closeDialogNode} {...this.state} />
        <PanelDetails
          {...this.state}
          setState={p => {
            this.setState(p)
          }}
        />
      </div>
    );
  }
}

//private API pixel
function _createNodePixel(node) {
  if (node.data === 'hidden') {
    return;
  }
  return {
    color: ManagerColorUtil.getInstance().getRandomNodeColor(),
    size: 50
  }
}

function _createPixelLink(link) {
  if (link.data === 'hidden') {
    return;
  }
  return {
    fromColor: 0xcfd8dc,
    toColor: 0x546e7a
  };
}

//HOC
function _withState(Snackbar) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      let {messageSnackBar, openSnackBar, eventCloseSnack} = this.props;
      return openSnackBar === true &&
        <Snackbar message={messageSnackBar}
                  className="snackbar-personal"
                  actionText="Close"
                  onClosing={() => eventCloseSnack()}
        />
    }
  }
}

function _withNodeInformation(Dialog) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    //TODO use the api explora of blockstream for details of node
    render() {
      let {idNodeDialogOpen, eventOnClose} = this.props;
      return <Dialog
        open={idNodeDialogOpen}
        onClose={() => eventOnClose()}>
        <DialogContent>
          <DialogNodeInformations
            title={'Node Informations'}
            closeDialog={eventOnClose}
            {...this.props}/>
        </DialogContent>
      </Dialog>
    }
  }
}

NGraphContainer.defaultProps = {};

export default NGraphContainer;
