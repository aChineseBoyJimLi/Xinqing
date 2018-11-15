$(document).ready(function(){
option = {
    title: {
        text: '心情曲线~'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['好心情','一般般吧','不高兴','很不高兴!','找死吗?!']
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
            name:'好心情',
            type:'line',
            stack: '总量',
            data:[8, 1, 10, 18, 5, 6, 1]
        },
        {
            name:'一般般吧',
            type:'line',
            stack: '总量',
            data:[2, 4, 5, 7, 11, 2, 0]
        },
        {
            name:'不高兴',
            type:'line',
            stack: '总量',
            data:[2, 3, 5, 0, 1, 4, 0]
        },
        {
            name:'很不高兴!',
            type:'line',
            stack: '总量',
            data:[1, 0, 0, 2, 1, 3, 0]
        },
        {
            name:'找死吗?!',
            type:'line',
            stack: '总量',
            data:[0, 0, 1, 0, 0, 1, 0]
        }
    ]
};
    var line = document.getElementById('line-map');
    var lineMap = echarts.init(line);
    lineMap.setOption(option);
})