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
    `);
    
    G6.registerNode('process', (cfg) => `
      <group>
        <rect style={{width:${cfg.width + cfg.padding*2}, height:${cfg.height + cfg.padding*2}, stroke: '${cfg.color}',fill: '${cfg.color}', textAlign:'center', radius:[6,6,6,6]}}  name="equation" keyShape='true'>
          <text style={{fill: '#fff',  textAlign:'left', fontSize:12, marginLeft:${(cfg.padding*2)}, marginTop:${(cfg.height/2+cfg.padding*2)}}} name="title">${cfg.content}</text>
        </rect>
      </group>
    `);
    
    G6.registerNode('space1', (cfg) => `
      <group>
        <rect style={{width:${cfg.width + cfg.padding + 20}, height:${cfg.height + cfg.padding*2}, stroke: '${cfg.color}', textAlign:'center', radius:[6,6,6,6]}}  name="equation" keyShape='true'>
          <rect style={{width:20, height:${cfg.height + cfg.padding*2}, fill:'${cfg.color}', radius:[6,0,0,6]}}></rect>
          <image style={{width:20,height:20,img:'${cfg.icon}',marginLeft:0,marginTop:${-14-cfg.padding*2}}}></image>
          <text style={{fill: '#000',  textAlign:'left', fontSize:12, marginLeft:${(22)}, marginTop:${-(cfg.height+16+cfg.padding*2)}}} name="title">${cfg.range}</text>
        </rect>
      </group>
    `);

    G6.registerNode('space2', (cfg) => `
      <group>
        <rect style={{width:${cfg.width + cfg.padding + 20}, height:${cfg.height*3 + cfg.padding*2}, stroke: '${cfg.color}', textAlign:'center', radius:[6,6,6,6]}}  name="equation" keyShape='true'>
          <rect style={{width:20, height:${cfg.height*3 + cfg.padding*2}, fill:'${cfg.color}', radius:[6,0,0,6]}}></rect>
          <image style={{width:20,height:20,img:'${cfg.icon}',marginLeft:0,marginTop:${-cfg.height*2-cfg.padding}}}></image>
          <text style={{fill: '#000',  textAlign:'center', fontSize:12, marginLeft:${22+cfg.width/2}, marginTop:${-(cfg.height*3+16+cfg.padding*2)}}} name="title">${cfg.range[0]}</text>
          <text style={{fill: '#000',  textAlign:'center', fontSize:12, marginLeft:${(22+cfg.width/2)}, marginTop:${-(cfg.height*3+16+cfg.padding*2)}}} name="title">↓</text>
          <text style={{fill: '#000',  textAlign:'center', fontSize:12, marginLeft:${22+cfg.width/2}, marginTop:${-(cfg.height*3+16+cfg.padding*2)}}} name="title">${cfg.range[1]}</text>
        </rect>
      </group>
    `);
    G6.registerNode('space3', (cfg) => `
      <group>
        <rect style={{width:${cfg.width + cfg.padding + 20}, height:${cfg.height*3 + cfg.padding*2}, stroke: '${cfg.color}', textAlign:'center', radius:[6,6,6,6]}}  name="equation" keyShape='true'>
          <rect style={{width:20, height:${cfg.height*3 + cfg.padding*2}, fill:'${cfg.color}', radius:[6,0,0,6]}}></rect>
          <image style={{width:20,height:20,img:'${cfg.icon}',marginLeft:0,marginTop:${-cfg.height*2-cfg.padding}}}></image>
          <text style={{fill: '#000',  textAlign:'center', fontSize:12, marginLeft:${22+cfg.width/2}, marginTop:${-(cfg.height*3+16+cfg.padding*2)}}} name="title">${cfg.range[0]}</text>
          <text style={{fill: '#000',  textAlign:'center', fontSize:12, marginLeft:${(22+cfg.textWidth[3]/2)}, marginTop:${-(cfg.height*3+16+cfg.padding*2)}}} name="title">${cfg.range[3]}</text>
          <text style={{fill: '#000',  textAlign:'center', fontSize:12, marginLeft:${(22+cfg.textWidth[1]/2+cfg.textWidth[0]+cfg.textWidth[3])}, marginTop:${-(cfg.height*4+16+cfg.padding*2)}}} name="title">${cfg.range[1]}</text>
          <rect style={{stroke:'${cfg.color}',width:${Math.max(cfg.textWidth[0], cfg.textWidth[2])}, height:${cfg.height}, marginLeft:${22+cfg.textWidth[3]}, marginTop:${-(cfg.height*6+cfg.padding*2)}, textAlign:'center'}}></rect>
          <text style={{fill: '#000',  textAlign:'center', fontSize:12, marginLeft:${22+cfg.width/2}, marginTop:${-(cfg.height*6+cfg.padding*2)}}} name="title">${cfg.range[2]}</text>
        </rect>
      </group>
    `);
    
    // 默认为力布局
    option.layout = option.layout || {
        type: 'gForce',
        prevenOverlap: true,
        linkDistance: 200,
        minMovement: 0.01,
        maxIteration: 1000,
      };
    option.modes = option.modes || {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node']
    }
    option.defaultNode = option.defaultNode || {
          type: 'circle ',
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

  insertNewLine(text, n){
    var i;
    var l = text.length;
    var lineNumber = 0;
    for(i=0; i<l; i++){
      if((i+1)%n == 0){
        text = text.slice(0, i) + "\n" + text.slice(i);
        lineNumber += 1
      }
    }
    return {text: text, lineNumber: lineNumber};
  }


  // 转换数据为G6格式
  transformData(data){
    var g6Data = {nodes: [], edges: []};
    var nodeLength = data.nodes.length;
    var i, d, node;
    var colors = {
      element: "#C4DCEB",
      equation: "#46B692",
      process: "#ba7ece",
      space: "#397fc6",
      time: "#288a59"
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
      if (d.type == 'element'|| d.type == 'equation'){
        var tex = d.latex || d.id;
        var svg = this.latex2Svg(tex);
        node.base64 = svg.base64;
        node.ratio = svg.ratio;
      }else if (d.type == 'object'){
        node.type = 'circle',
        node.size = d.size || 20+d.name.length*11
        node.style = {
          fill: '#d6ad85',
          stroke: '#835f50',
        }
      }else if (d.type == 'process'){
        let textNumber = d.wrap || 12
        let t = this.insertNewLine(d.content, textNumber);
        node.content = t.text;
        node.height = t.lineNumber * 18;
        node.width = textNumber*12
      }else if (d.type == 'space' || d.type == 'time'){
        node.icon = d.type == 'space' ? this.icon('pin') : this.icon('time');
        node.range = d.range;
        if (typeof(d.range) == 'string'){
          node.type = 'space1';
          node.width = d.range.length * 12
        }else if (typeof(d.range) == 'object'){
          if (d.range.length == 1){
            node.type = 'space1';
            node.width = d.range.length * 12
          }else if (d.range.length < 4){
            node.type = 'space2';
            node.width = Math.max(d.range[0].length, d.range[1].length) * 12
          }else{
            node.type = 'space3';
            node.textWidth = d.range.map(v=>v.length*12)
            node.width = Math.max(node.textWidth[0], node.textWidth[2]) + node.textWidth[1] + node.textWidth[3];
          }
        }
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
        },
        4:{
          endArrow: {
            path: G6.Arrow.rect(15, 2, 5),
            d: 5,fill: color, stroke:color
          },
        }
      }
    }
    for(i=0; i<linkLength; i++){
      d = data.links[i];
      d.type = d.type || 1;
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

  //图标
  icon(type){
    let d = {
      pin:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGcgZGF0YS1uYW1lPSJMYXllciAyIiBzdHlsZT0iZmlsbDojZmZmIj48ZyBkYXRhLW5hbWU9InBpbiI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBvcGFjaXR5PSIwIi8+PHBhdGggZD0iTTEyIDJhOCA4IDAgMCAwLTggNy45MmMwIDUuNDggNy4wNSAxMS41OCA3LjM1IDExLjg0YTEgMSAwIDAgMCAxLjMgMEMxMyAyMS41IDIwIDE1LjQgMjAgOS45MkE4IDggMCAwIDAgMTIgMnptMCAxNy42NWMtMS42Ny0xLjU5LTYtNi02LTkuNzNhNiA2IDAgMCAxIDEyIDBjMCAzLjctNC4zMyA4LjE0LTYgOS43M3oiLz48cGF0aCBkPSJNMTIgNmEzLjUgMy41IDAgMSAwIDMuNSAzLjVBMy41IDMuNSAwIDAgMCAxMiA2em0wIDVhMS41IDEuNSAwIDEgMSAxLjUtMS41QTEuNSAxLjUgMCAwIDEgMTIgMTF6Ii8+PC9nPjwvZz48L3N2Zz4=",
      time:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6I2ZmZiI+PGcgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBkYXRhLW5hbWU9ImNsb2NrIj48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxMiAxMikiIG9wYWNpdHk9IjAiLz48cGF0aCBkPSJNMTIgMmExMCAxMCAwIDEgMCAxMCAxMEExMCAxMCAwIDAgMCAxMiAyem0wIDE4YTggOCAwIDEgMSA4LTggOCA4IDAgMCAxLTggOHoiLz48cGF0aCBkPSJNMTYgMTFoLTNWOGExIDEgMCAwIDAtMiAwdjRhMSAxIDAgMCAwIDEgMWg0YTEgMSAwIDAgMCAwLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=",
    }
    return d[type];
  }
}