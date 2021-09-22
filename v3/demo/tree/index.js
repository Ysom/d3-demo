const data = {
  label: 'd3分享',
  children: [
    {
      label: '初步了解',
      children: [
        {
          label: '概念',
        },
        {
          label: '优点',
        },
        {
          label: '缺点',
        },
        {
          label: '版本',
        },
      ],
    },
    {
      label: '简单使用',
      children: [
        {
          label: '选择集',
        },
        {
          label: '数据',
        },
        {
          label: '元素',
        },
        {
          label: '关键点',
        },
        {
          label: '注意点',
        },
      ],
    },
    {
      label: '例子分享',
      children: [
        {
          label: '树状图',
        },
        {
          label: '力引导图',
        },
      ],
    },
  ],
};

const padding = {
  left: 50,
  top: 20,
  bottom: 20,
  right: 0,
};

const width = 500;
const height = 500;

const treeSvg = body
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const tree = d3
  .layout
  .tree()
  .size([360, 320])
  .separation((a, b) => {
    return a.parent === b.parent ? 1 : 2;
  });

const nodes =  tree.nodes(data);
const links = tree.links(nodes);

console.log({
  nodes,
  links,
});

const line = d3.svg.line();

const diagonal = d3
  .svg
  .diagonal()
  .projection(d => {
    return [d.y, d.x];
  })

const link = treeSvg
  .selectAll('.link')
  .data(links)
  .enter()
  .append('path')
  .attr('class', 'link')
  .style('stroke-width', 1)
  .attr('d', diagonal)

const node = treeSvg
  .selectAll('.node')
  .data(nodes)
  .enter()
  .append('g')
  .attr('class', 'node')
  .attr('transform', d => {
    return `translate(${d.y}, ${d.x})`;
  })

node
  .append('circle')
  .attr('class', 'circle')
  .attr('r', 4.5);

node
  .append('text')
  .attr('class', 'text')
  .attr('dx', (d) => {
    if (d.depth === 0) {
      return 50;
    }
    return d.children ? -8 : 8;
  })
  .attr('dy', 3)
  .style('text-anchor', d => {
    return d.children ? 'end' : 'start';
  })
  .text(d => d.label);
