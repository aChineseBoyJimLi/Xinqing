   var lineMap,line;
   var DAYS = new Array();
   var DISGUST = new Array();
   var JOY = new Array();
   var ANGER = new Array();
   var NOEMO = new Array();
   var SURPRISE = new Array();
   var SADNESS = new Array();
   var FEAR = new Array();
   var option = {
    title: {
        text: ''
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
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            name:'恶心的',
            type:'line',
            // stack: '总量',
            data:[]
        },
        {
            name:'开心的',
            type:'line',
            // stack: '总量',
            data:[]
        },
        {
            name:'生气的',
            type:'line',
            // stack: '总量',
            data:[]
        },
        {
            name:'一般般',
            type:'line',
            // stack: '总量',
            data:[]
        },
        {
            name:'惊讶的',
            type:'line',
            // stack: '总量',
            data:[]
        },        
        {
            name:'悲伤的',
            type:'line',
            // stack: '总量',
            data:[]
        },
        {
            name:'害怕的',
            type:'line',
            // stack: '总量',
            data:[]
        }
    ]
};
$(document).ready(function(){
    /*******************************************************/
    $("body").css({
        "overflow-x":"hidden",
        "overflow-y":"hidden"
      });
    $('[data-toggle="tooltip"]').tooltip();
    
    /*导航栏样式代码*/
    $('.navbar-brand').click(function(){
        $('.nav-item').removeClass('now');
        $('.nav-link').removeClass('now-font');
        $(this).hide(200);
    });
    //切换面板对导航栏的样式修改
    var now = 0;
    $('#indexTwo').click(function(){
        $("#"+now).addClass('now-font');
        $("#"+now).parent().addClass('now');
        $('.navbar-brand').show(200);
        $('#main').animate({opacity:'1'},'fast');
    });

    $('.owl-prev').click(function(){
        var id = $('.nav-link').filter('.now-font').attr('id');
        id--;
        if(id<0){
            id=2;
        }
        now = id;
        var link = $('.nav-link').filter('#'+id);
        $('.nav-link').removeClass('now-font');
        $('.nav-item').removeClass('now');
        link.addClass('now-font');
        link.parent().addClass('now');
    })

    $('.owl-next').click(function(){
        var id = $('.nav-link').filter('.now-font').attr('id');
        id++;
        if(id>2){
            id=0;
        }
        now = id;
        var link = $('.nav-link').filter('#'+id);
        $('.nav-link').removeClass('now-font');
        $('.nav-item').removeClass('now');
        link.addClass('now-font');
        link.parent().addClass('now');
    })

    $('.owl-next,.owl-prev').click(function(){
        /*板块二恢复样式*/
        $('.select-panel ul li a').removeClass('actived');
        $("#dateNote").addClass('actived');
        $('.show-panel').hide();
        $('#Note').show();
    });

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
            RenderLines();
        }
    });

    $('#get-advice').click(function(){
        $('.main-content').show(200);
    });
})

//心情曲线
// function getLine(){

        // RenderLines(lineMap);
// }

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

function GetMonthData(){
    DAYS=[];
    DISGUST = [];
    JOY = [];
    ANGER = [];
    NOEMO = [];
    SURPRISE = [];
    SADNESS = [];
    FEAR = [];
    console.log("no");
    var dd = new Date(parseInt(new Date().getFullYear()),parseInt(new Date().getMonth()+1), 0);   //Wed Mar 31 00:00:00 UTC+0800 2010  
    var daysCount = dd.getDate();       //本月天数  
    for(i=1;i<=daysCount;i++){
        DAYS.push(i);
    }
    MonthMoods.forEach(element => {
        DISGUST.push(element.result.disgust);
        JOY.push(element.result.joy);
        ANGER.push(element.result.anger);
        NOEMO.push(element.result.noemo);
        SURPRISE.push(element.result.surprise);
        SADNESS.push(element.result.sadness);
        FEAR.push(element.result.fear);
    });
    console.log("FEAR:"+FEAR);
    console.log("SAD:"+SADNESS);
    MonthMoods = [];   //清空MonthMoods
}

function RenderLines(){
    line = document.getElementById('line-map');   
    lineMap = echarts.init(line);   //用于获取并初始化心情曲线
    lineMap.setOption({
        title: {
            text: ''
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
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: DAYS
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name:'恶心的',
                type:'line',
                // stack: '总量',
                data:DISGUST
            },
            {
                name:'开心的',
                type:'line',
                // stack: '总量',
                data:JOY
            },
            {
                name:'生气的',
                type:'line',
                // stack: '总量',
                data:ANGER
            },
            {
                name:'一般般',
                type:'line',
                // stack: '总量',
                data:NOEMO
            },
            {
                name:'惊讶的',
                type:'line',
                // stack: '总量',
                data:SURPRISE
            },        
            {
                name:'悲伤的',
                type:'line',
                // stack: '总量',
                data:SADNESS
            },
            {
                name:'害怕的',
                type:'line',
                // stack: '总量',
                data:FEAR
            }
        ]
    });
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