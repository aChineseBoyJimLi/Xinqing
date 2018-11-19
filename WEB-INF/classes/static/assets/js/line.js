$(document).ready(function(){
option = {
    title: {
        text: '心情曲线~'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['恶心的', '开心的', '生气的', '一般般', '惊讶的', '悲伤的', '害怕的']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            name:'恶心的',
            type:'line',
            stack: '总量',
            data:[8, 1, 10, 18, 5, 6, 1, 5]
        },
        {
            name:'开心的',
            type:'line',
            stack: '总量',
            data:[2, 4, 5, 7, 11, 2, 0, 0]
        },
        {
            name:'生气的',
            type:'line',
            stack: '总量',
            data:[2, 3, 5, 0, 1, 4, 0, 3]
        },
        {
            name:'一般般',
            type:'line',
            stack: '总量',
            data:[1, 0, 0, 2, 1, 3, 0, 2]
        },
        {
            name:'惊讶的',
            type:'line',
            stack: '总量',
            data:[0, 4, 1, 2, 0, 1, 2, 1]
        },        
        {
            name:'悲伤的',
            type:'line',
            stack: '总量',
            data:[0, 1, 1, 6, 0, 1, 3, 1]
        },
        {
            name:'害怕的',
            type:'line',
            stack: '总量',
            data:[1, 0, 1, 4, 0, 1, 0, 4]
        }

    ]
};
    var line = document.getElementById('line-map');
    var lineMap = echarts.init(line);
    lineMap.setOption(option);
})