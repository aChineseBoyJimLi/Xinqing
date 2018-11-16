$(document).ready(function(){
    $("body").css({
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
                // stack: '总量',
                data:[8, 1, 10, 18, 5, 6, 1, 5]
            },
            {
                name:'开心的',
                type:'line',
                // stack: '总量',
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
                // stack: '总量',
                data:[1, 0, 0, 2, 1, 3, 0, 2]
            },
            {
                name:'惊讶的',
                type:'line',
                // stack: '总量',
                data:[0, 4, 1, 2, 0, 1, 2, 1]
            },        
            {
                name:'悲伤的',
                type:'line',
                // stack: '总量',
                data:[0, 1, 1, 6, 0, 1, 3, 1]
            },
            {
                name:'害怕的',
                type:'line',
                // stack: '总量',
                data:[1, 0, 1, 4, 0, 1, 0, 4]
            }
    
        ]
    };
        var line = document.getElementById('line-map');
        var lineMap = echarts.init(line);
        lineMap.setOption(option);
}

function RenderNotesList(Notes){
    $("#Note").empty();
    Notes.forEach(element => {
       var str = '<div class="card" id="noteOne" v-for="note in result">'+
        '<div class="title">'+'<span class="timestamp">'+element.time+'</span></div>'+
        '<div class="Notecontent">'+'<span class="message">'+element.content+'</span>'+
        '&nbsp;&nbsp;<img src="'+SwitchMoodImg(element.mood)+'" style="margin:3px auto;display: inline;max-width: 30px;"></div></div>';
        $('#Note').append(str);
    });  
}

function SwitchMoodImg(mood){
    var temp;
    switch(mood){
        case "DISGUST":{
            temp = "disappointed.png";
            break;
        }
        case "JOY":{
            temp = "happy.png";
            break;
        }
        case "ANGER":{
            temp = "angry.png";
            break;
        }
        case "NOEMO":{
            temp = "normal.png";
            break;
        }
        case "SURPRISE":{
            temp = "surprise.png";
            break;
        }
        case "SADNESS":{
            temp = "sad.png";
            break;
        }
        case "FEAR":{
            temp = "fear.png";
            break;
        }
        
    }
    return "assets/img/faceEmotion/"+temp;
}

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg= new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}