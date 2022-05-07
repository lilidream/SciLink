window.onload = function() {
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
    const data = {
        nodes: [
            { id: 'node1'},
            { id: 'node2'},
        ],
        edges: [{ source: 'node1', target: 'node2' }],
    };
    const graph = new G6.Graph({
      modes:{
        default: ['drag-canvas', 'zoom-canvas', 'drag-node']
      },
      container: 'nodeCanvas',
      width: 500,
      height: 500,
      defaultNode: {
          type: 'dom-node',
          size: [120, 40],
      },
      animate: true,
      layout: {
        type: 'gForce',
        prevenOverlap: true,
        linkDistance: 200,
        minMovement: 0.1,
        maxIteration: 1000,
        // gpuEnabled: true
      }
    });
    graph.data(data);
    graph.render();
}