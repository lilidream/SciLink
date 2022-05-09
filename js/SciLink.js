class SciLink{
  constructor(option){
    // 注册节点
    G6.registerNode('element',(cfg) => `
      <group>
      <rect style={{width:${cfg.height * cfg.ratio + cfg.padding*2}, height:${cfg.height + cfg.padding*2}, fill: '${cfg.color}', textAlign:'center', radius:[6,6,6,6]}}  name="element" keyShape='true'>
        <image  style={{width:${cfg.height * cfg.ratio}, height:${cfg.height},img: '${cfg.base64}', marginTop:${cfg.padding}, marginLeft:${cfg.padding}}}></image>
      </rect>
      <text style={{fill: '#000',  textAlign:'center', fontSize:12, marginLeft:${(cfg.height * cfg.ratio + cfg.padding*2) / 2}}} name="title">${cfg.label}</text>
      </group>
      `,
    );

    G6.registerNode('equation', (cfg) => `
      <group>
        <rect style={{width:${cfg.height * cfg.ratio + cfg.padding*2}, height:${cfg.height + cfg.padding*2}, stroke: '${cfg.color}', textAlign:'center', radius:[6,6,6,6]}}  name="equation" keyShape='true'>
          <image  style={{width:${cfg.height * cfg.ratio}, height:${cfg.height},img: '${cfg.base64}', marginTop:${cfg.padding}, marginLeft:${cfg.padding}}}></image>
        </rect>
        <text style={{fill: '#000',  textAlign:'center', fontSize:12, marginLeft:${(cfg.height * cfg.ratio + cfg.padding*2) / 2}}} name="title">${cfg.label}</text>
      </group>
    `)
    // 默认为力布局
    option.layout = option.layout || {
        type: 'gForce',
        prevenOverlap: true,
        linkDistance: 200,
        minMovement: 0.1,
        maxIteration: 1000,
      };
    option.modes = option.modes || {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node']
    }
    option.defaultNode = option.defaultNode || {
          type: 'dom-node',
          size: [120, 40],
    }
  
    console.log(option);
    this.g6 = new G6.Graph(option)
  }


  latex2Svg(tex){
    var svg = MathJax.tex2svg(tex);
    var svgWidth = parseFloat(svg.childNodes[0].getAttribute("width").slice(0, -2));
    var svgHeight = parseFloat(svg.childNodes[0].getAttribute("height").slice(0, -2));

    var ratio = svgWidth / svgHeight;

    var svg = svg.childNodes[0]
    svg.setAttribute('fill', '#ff0000')
    console.log(svg)
    var ssvg = new XMLSerializer().serializeToString(svg);
    var base64 = "data:image/svg+xml;base64, " + window.btoa(unescape(encodeURIComponent(ssvg)));
    return {
      base64: base64,
      ratio: ratio
    }
  }


  // 转换数据为G6格式
  transformData(data){
    var g6Data = {nodes: [], edges: []};
    var nodeLength = data.nodes.length;
    var i, d, node;
    var colors = {
      element: "#C4DCEB",
      equation: "#46B692"
    }

    // nodes
    for(i=0; i<nodeLength; i++){
      d = data.nodes[i];
      node = {
        id: d.id,
        type: d.type || 'element',
        label: d.name || d.id,
        content: d.content || '',
        height: d.height || 16,
        color: d.color || colors[d.type || 'element'],
        padding: d.padding || 5,
        fontSize: d.fontSize || 12
      }
      if (d.type == 'element'||'equation'){
        var tex = d.latex || d.id;
        var svg = this.latex2Svg(tex);
        node.base64 = svg.base64;
        node.ratio = svg.ratio;
      }
      g6Data.nodes.push(node);
    }

    // edges
    var linkLength = data.links.length;
    var linkStyle = function(color){
      return{
        1: {},
        2: {
          endArrow: {
            path: G6.Arrow.triangle(5, 10, 5),
            d: 5,fill: color, stroke:color
          }
        },
        3:{
          endArrow: {
            path: G6.Arrow.triangle(5, 10, 5),
            d: 5,fill: color, stroke:color
          },
          startArrow: {
            path: G6.Arrow.triangle(5, 10, 5),
            d: 5,fill: color, stroke:color
          }
        }
      }
    }
    for(i=0; i<linkLength; i++){
      d = data.links[i];
      var edge = {
        source: d.from,
        target: d.to
      }
      if (d.label){
        edge.label = d.label
      }
      if (d.type > 1){
        edge.style = linkStyle(d.color||'#888888')[d.type];
      }
      g6Data.edges.push(edge)
    }
    return g6Data;
  }

  // 给G6输入数据
  data(d){
    var d = this.transformData(d)
    this.g6.data(d);
  }

  // 渲染
  render(){
    this.g6.render();
  }
}