require('normalize.css/normalize.css');
require('styles/App.css');

import '@material/react-layout-grid/dist/layout-grid.css';
import '@material/react-button/dist/button.css';

import React from 'react';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import Button from '@material/react-button';

import CreatePIXIgraphics from 'ngraph.pixi'

const NODE_WIDTH = 10;
const colorLookup = [0x1967be, 0x2780e3];
const physicsSettings = {
  springLength: 30,
  springCoeff: 0.0008,
  gravity: -1.2,
  theta: 0.8,
  dragCoeff: 0.02,
  timeStep: 20
};

class DialogSubGraph extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this._createNodeUI = this._createNodeUI.bind(this);
    this._renderNode = this._renderNode.bind(this);
    this._createLinkUI = this._createLinkUI.bind(this);
    this._renderLink = this._renderLink.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let {render, classSelected, instanceLouvain} = this.props;
    //console.debug('Class selected:', classSelected);
    //console.debug('instanceLouvain:', instanceLouvain);
    if (render && instanceLouvain) {
      let graph = render.graph(undefined);
      let classGraph = instanceLouvain.getSubGraph(graph, classSelected);
      console.debug('Class found: ', classGraph, ' and do not built before');
      if (classSelected) {
        let renderPixi = CreatePIXIgraphics(classGraph.graph, {
          container: this.div,
          rendererOptions: {
            backgroundColor: 0xFFFFFF,
            antialias: true
          },
          labelConf: {
            enable: true,
            style: { fontFamily: 'Roboto', fontSize: '20px' ,  fill: 0x000000}
          },
          physics: physicsSettings
        });
        renderPixi.createNodeUI(this._createNodeUI);
        renderPixi.renderNode(this._renderNode);
        renderPixi.createLinkUI(this._createLinkUI);
        renderPixi.renderLink(this._renderLink);
        renderPixi.run();
      }
    }
  }

  _createLinkUI(link) {
    return {
      width: 2 - Math.log(2)
    };
  }

  _createNodeUI(node) {
    return new AnimatedNode(node);
  }

  _renderLink(link, ctx) {
    //ctx.lineStyle(link.width, 0x333333, 1);
    ctx.lineStyle(link.width, 0x9caeb8, 1);
    ctx.moveTo(link.from.x, link.from.y);
    ctx.lineTo(link.to.x, link.to.y);

    //Add the arch to the link
    // first, let's compute normalized vector for our link:
    let dx = link.to.x - link.from.x;
    let dy = link.to.y - link.from.y;
    let l = Math.sqrt(dx * dx + dy * dy);

    if (l === 0) return; // if length is 0 - can't render arrows

    // This is our normal vector. It describes direction of the graph
    // link, and has length == 1:
    let nx = dx / l;
    let ny = dy / l;

    // Now let's draw the arrow:
    let arrowLength = 6;       // Length of the arrow
    let arrowWingsLength = 2;  // How far arrow wings are from the link?

    // This is where arrow should end. We do `(l - NODE_WIDTH)` to
    // make sure it ends before the node UI element.
    let ex = link.from.x + nx * (l - NODE_WIDTH / 1.5);
    let ey = link.from.y + ny * (l - NODE_WIDTH / 1.5);

    // Offset on the graph link, where arrow wings should be
    let sx = link.from.x + nx * (l - (NODE_WIDTH / 1.5) - arrowLength);
    let sy = link.from.y + ny * (l - (NODE_WIDTH / 1.5) - arrowLength);

    // orthogonal vector to the link vector is easy to compute:
    let topX = -ny;
    let topY = nx;

    // Let's draw the arrow:
    ctx.moveTo(ex, ey);
    ctx.lineTo(sx + topX * arrowWingsLength, sy + topY * arrowWingsLength);
    ctx.moveTo(ex, ey);
    ctx.lineTo(sx - topX * arrowWingsLength, sy - topY * arrowWingsLength);
  }

  _renderNode(animatedNode, ctx) {
    animatedNode.renderFrame();
    ctx.lineStyle(0);
    ctx.beginFill(animatedNode.color, 1);
    ctx.drawCircle(animatedNode.pos.x, animatedNode.pos.y, animatedNode.width);
  }

  render() {
    let {title, closeDialog, classSelected} = this.props;
    return (
      <div>
        <h3 className="title-dialog"> {title} </h3>
        <Grid>
          <Row>
            <Cell columns={12}>
              <p>Subgraph for the class {classSelected}</p>
              <div className="container-ngraph-dialog"
                ref={div => {
                this.div = div;
              }}/>
            </Cell>
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
                Close
              </Button>
            </Cell>
          </Row>
        </Grid>
      </div>
    );
  }
}

function AnimatedNode(node) {
  this.node = node;
  this.color = colorLookup[(Math.random() * colorLookup.length) | 0];
  this.frame = Math.random();
  this.width = Math.random() * 5 + 5;
  this.v = 1 - Math.random() * 0.01;
}

AnimatedNode.prototype.renderFrame = function () {
  if (this.frame < 0.6) {
    this.frame = 1;
    this.color = colorLookup[(Math.random() * colorLookup.length) | 0];
    this.width = Math.random() * 5 + 5;
    this.v = 0.99999 - Math.random() * 0.01;
  }

  this.frame *= this.v;
  this.width *= this.v;
};


DialogSubGraph.defaultProps = {};

export default DialogSubGraph;
