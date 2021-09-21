const data = {
  label: 'd3分享',
  children: [
    {
      label: '基础认知',
      children: [
        {
          label: '是什么',
        },
        {
          label: '优点',
        },
        {
          label: '缺点',
        },
      ],
    },
    {
      label: '简单使用',
      children: [
        {
          label: '版本说明',
        },
        {
          label: '选择集',
        },
        {
          label: '数据绑定',
        },
      ],
    },
    {
      label: '例子分享',
      children: [
        {
          label: '柱状图',
        },
        {
          label: '力引导图',
        },
        {
          label: '树状图',
        },
      ],
    },
  ],
};

const width = 1000;
const height = 500;

const treeSvg = body.append('svg').attr('width', width).attr('height', height);

const tree = d3
  .layout
  .tree()
  .size([height / 2, width / 2])
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
  .attr('d', diagonal);

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
  .attr('r', 4.5);

node
  .append('text')
  .attr('dx', (d) => {
    return d.children ? -8 : 8;
  })
  .attr('dy', 3)
  .style('text-anchor', d => {
    return d.children ? 'end' : 'start';
  })
  .text(d => d.label);