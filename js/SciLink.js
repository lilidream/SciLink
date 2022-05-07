class SciLink{
  constructor(option){
    // 注册节点
    G6.registerNode(
      'dom-node',
      (cfg) => `
      <rect style={{
        width: 50, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
        }} keyshape="true" name="test">
        <text style={{ 
          fontWeight: 'bold', 
          fill: '#fff' }} 
          name="title">${cfg.label || cfg.id}</text>
      </rect>
      `,
    );
    // 默认为力布局
    if (!option.layout){
      option.layout = {
        type: 'gForce',
        prevenOverlap: true,
        linkDistance: 200,
        minMovement: 0.1,
        maxIteration: 1000,
      }
    }
    if (!option.modes){
      option.modes = {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node']
      }
    }
    if (!option.defaultNode){
      option.defaultNode = {
          type: 'dom-node',
          size: [120, 40],
      }
    }
    console.log(option);
    this.g6 = new G6.Graph(option)
  }

  // 给G6输入数据
  data(d){
    this.g6.data(d);
  }

  // 渲染
  render(){
    this.g6.render();
  }
}