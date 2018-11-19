const MAXLEN=100
const START_WORD_INDEX = 1
const OOV_WORD_INDEX = 2
const INDEX_FROM = 3
var wordDict = {}
var dataReady = false
var currEmotion = -1
var wordIndexURL = 'model/word_index.json'
var modelURL = 'model/Sentiment_Analyze_Model_1_8.bin'
var baiduTranslatorURL = 'https://api.fanyi.baidu.com/api/trans/vip/translate?'
var model;
var probindex = []  //概率结果顺序
var select = 0      //当前采用的表情标签值
var labels = ['恶心的', '开心的', '生气的', '一般般', '惊讶的', '悲伤的', '害怕的']
var flag = false;
var result;
var userinfo = sessionStorage.getItem("userinfo");
// var modelrunning = true
var textarea_activated = false
/*加载模型*/
window.onload = function(){
    console.log(userinfo);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/Xinqing/read",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
        },
        "processData": false,
        "data": "{\n\t\"id\":\"{id}\",\n\t\"password\":\"{password}\"\n}".format(JSON.parse(userinfo))
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        RenderNotesList(response.result);
      });

    /**********************************/
    $('body,html').animate({'scrollTop':'fast'});
    model = new KerasJS.Model({
        filepath: modelURL,
        gpu: false
    })
    axios.get(wordIndexURL).then(function(response) {
        wordDict = response.data;
    })
    model.ready().then(() => {
    //启用定时器
    setTimeout(function(){
        $('#load').animate({opacity:'0'},'fast');
        $('.loading-title').animate({opacity:'0'},'fast');
        setTimeout(function(){
            $('#load').hide();
            $('.loading-title').hide();
        },1000);
    },2000);

    setTimeout(function(){
        $('.masthead-img').show(300);
        $('.masthead-title').show();
        $('#indexTwo').animate({opacity:'1'},'fast');
    },3000);

    window.timer = window.setInterval(function(){
        if(textarea_activated==true){
            var str = $('textarea').val();
            getPrediction(str);
            selectPicture(result);
        }
    },1000);
    })
};

$('textarea').click(function(){
    textarea_activated = true
})

/*计数器*/
$('*').on("keyup","textarea",function(){
    var str = $(this).val();
    var length = str.length;
    var NewStr = length+"/50"; 
    $(this).next().text(NewStr);
})

/*弹出预测结果框*/
var result_Panel = $('#result');
result_Panel.hide();
$('#ready').click(function(){
    // window.clearInterval(window.timer);
    // modelrunning = false
    var str =  $('#text_input').val();
    if(str!=""){
        getPrediction(str);
        textarea_activated = false;
        $('#result p span').text(result);
        selectPicture(result);
        $('textarea').blur();
        $('textarea').attr('disabled','true');
        result_Panel.show(100);
        $(this).hide(100);
    }else{
        alert("请随便写点什么");
    }
})

/*预测面板事件*/
$('#ok').click(function(){
    console.log(userinfo);
    var note = $('textarea').val();
    var date = getNowFormatDate();
    var input = {
        content:note,
        time:date,
        user:userinfo,
        mood:probindex[select]
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/Xinqing/write",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
        },
        "processData": false,
        "data": "{\n\t\"title\":\"wegame\",\n\t\"content\":\"{content}\",\n\t\"time\":\"{time}\",\n\t\"user\":{user},\n\t\"mood\":\"{mood}\",\n\t\"image\":\"NA\"\n}".format(input)
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        RenderNotesList(response.result);
      });

    select = 0
    textarea_activated = true
    $('#ready').show(100);
    result_Panel.hide(100);
    $('textarea').removeAttr("disabled");
    $('#face').attr('src',"assets/img/faceEmotion/normal.png");
})

$('#try-again').click(function(){
    select++;
    if(select>6){
        alert("你在拿我寻开心呀？")
        select = 0
    }
    result = labels[probindex[select]];
    selectPicture(result);
    $('#result p span').text(result);
})

/*根据表情选择对应的图片*/
function selectPicture(result){
    switch(result){
        case "恶心的":
        {
            $('#face').attr('src',"assets/img/faceEmotion/disappointed.png");
            break;
        }
        case "生气的":
        {
            $('#face').attr('src',"assets/img/faceEmotion/angry.png");
            break;
        }
        case "惊讶的":
        {
            $('#face').attr('src',"assets/img/faceEmotion/surprise.png");
            break;
        }
        case "悲伤的":
        {
            $('#face').attr('src',"assets/img/faceEmotion/sad.png");
            break;
        }
        case "害怕的":
        {
            $('#face').attr('src',"assets/img/faceEmotion/fear.png");
            break;
        }
        case "开心的":
        {
            $('#face').attr('src',"assets/img/faceEmotion/happy.png");
            break;
        }
        default:
        {
            $('#face').attr('src',"assets/img/faceEmotion/normal.png");
            break;
        }
    }
    $('#result p span').text(result);
}

//获取当前时间 以yyyy-MM-dd HH:MM:SS的格式返回数据
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

function getPrediction(inputtext) {
    var input = new Float32Array(MAXLEN)
    // 调用翻译的过程，inputtext为要翻译的文字-------------------------------------------------------------------------------
    salt = 1435660288
    needMD5 = '20181112000233191' + inputtext + salt.toString() + 'JMuQLVm5_aRDvvRFoSqM'
    key = md5(needMD5);
    $.ajax({
        url:baiduTranslatorURL + 'q=' + inputtext + '&from=zh&to=en&appid=20181112000233191&salt=1435660288&sign=' + key,
        dataType:'jsonp',
        processData: false, 
        type:'get',
        // 调用翻译成功，则
        success:function(data){
            var inputTextParsed = data.trans_result[0].dst.trim().toLowerCase().split(/[\s.,!?]+/gi)
            let indices = inputTextParsed.map(word => {
                const index = wordDict[word]
                return !index ? OOV_WORD_INDEX : index + INDEX_FROM
            })
            indices = [START_WORD_INDEX].concat(indices)
            indices = indices.slice(-MAXLEN)
            const start = Math.max(0, MAXLEN - indices.length)
            for (let i = start; i < MAXLEN; i++) {
                input[i] = indices[i - start]
            }
            model.ready().then(() => {
                return model.predict({ input: input })
            }).then(outputData => {
                select = 0
                var probresult = new Float32Array(outputData.output)
                probresult = probresult.sort()
                for(let i = 0;i<probresult.length;i++){
                    probindex[i] = new Float32Array(outputData.output).indexOf(probresult[probresult.length-i-1])
                }
                result = labels[probindex[select]];
                console.log("pre:"+result);
            })
        },
        // 若调用翻译失败
          error:function(XMLHttpRequest, textStatus, errorThrown) {
          alert(XMLHttpRequest.status);
          alert(XMLHttpRequest.readyState);
          alert(textStatus);
        }
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