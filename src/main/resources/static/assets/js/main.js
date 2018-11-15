$(document).ready(function(){
    $(document.body).css({
        "overflow-x":"hidden",
        "overflow-y":"hidden"
      });
    $('[data-toggle="tooltip"]').tooltip();
    
    /*导航栏样式代码*/
    $('#indexTwo').click(function(){
        $("#index").parent().addClass('now');
        $("#index").addClass('now-font');
        $('.navbar-brand').show(200);
        $('#main').animate({opacity:'1'},'fast');
    });

    $('.navbar-brand').click(function(){
        $('.nav-item').removeClass('now');
        $('.nav-link').removeClass('now-font');
        $(this).hide(200);
    });

    //切换面板对导航栏的样式修改
    var num = 3;
    $('.owl-prev').click(function(){
        num--;
        getNav(num);
        console.log('left');
    });

    $('.owl-next').click(function(){
        num++;
        getNav(num);
        console.log('right');
    });

    function getNav(count){
        $('.nav-item').removeClass('now');
        $('.nav-link').removeClass('now-font');
        if(count%3==1){
            $('#index').parent().next().addClass('now');
            $('#index').parent().next().children().addClass('now-font');
        }
        else if(count%3==2){
            $('#index').parent().next().next().addClass('now');
            $('#index').parent().next().next().children().addClass('now-font');
        }else{
            $('#index').parent().addClass('now');
            $('#index').parent().children().addClass('now-font');
        }
    }

    $('.navbar-brand').mouseenter(function(){
        $(this).addClass('now');
        $(this).children().attr('src','assets/img/sun_black.png');
    });

    $('.navbar-brand').mouseleave(function(){
        $(this).removeClass('now');
        $(this).children().attr('src','assets/img/sun_white.png');
    });

    /***************************************************/
    $('.select-panel ul li a').click(function(){
        var selectId = "#" + $(this).attr('id').substr(4,4);
        /*添加actived样式*/
        $('.select-panel ul li a').removeClass('actived');
        $(this).addClass('actived');
        /*切换面板*/
        if(selectId!="#Line"){
            $('.show-panel').not(selectId).hide(200);
            $('.show-panel').filter(selectId).show(200);
        }else{
            $('.show-panel').not("#Line").hide(200);
            $('#Line').show(200);
            getLine();
        }
    });

    $('#get-advice').click(function(){
        $('.main-content').show(200);
    });
})

//获取心情曲线
function getLine(){
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
                // stack: '总量',
                data:[8, 1, 10, 18, 5, 6, 1]
            },
            {
                name:'一般般吧',
                type:'line',
                // stack: '总量',
                data:[2, 4, 5, 7, 11, 2, 0]
            },
            {
                name:'不高兴',
                type:'line',
                // stack: '总量',
                data:[2, 3, 5, 0, 1, 4, 0]
            },
            {
                name:'很不高兴!',
                type:'line',
                // stack: '总量',
                data:[1, 0, 0, 2, 1, 3, 0]
            },
            {
                name:'找死吗?!',
                type:'line',
                // stack: '总量',
                data:[0, 0, 1, 0, 0, 1, 0]
            }
        ]
    };
        var line = document.getElementById('line-map');
        var lineMap = echarts.init(line);
        lineMap.setOption(option);
}