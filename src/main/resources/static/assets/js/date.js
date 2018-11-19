var MonthMoods = [];
var IsMood = 0;
var userinfo = sessionStorage.getItem("userinfo");
$(document).ready(function(){ 
    $('.owl-next,.owl-prev').click(function(){
        //页面加载初始化年月
        var mydate = new Date();
        $(".f-year").html( mydate.getFullYear() );
        $(".f-month").html( mydate.getMonth()+1 );
        showDate(mydate.getFullYear(),mydate.getMonth()+1);
        sessionStorage.setItem('moods', JSON.stringify(MonthMoods));
        MonthMoods = [];
        //日历上一月
        $(".f-btn-jian ").click(function(){
            var mm = parseInt($(".f-month").html());
            var yy = parseInt($(".f-year").html());
            if( mm == 1){//返回12月
                $(".f-year").html(yy-1);
                $(".f-month").html(12);
                showDate(yy-1,12);
            }else{//上一月
                $(".f-month").html(mm-1);
                showDate(yy,mm-1);
            }
        })
        //日历下一月
        $(".f-btn-jia").click(function(){
            var mm = parseInt($(".f-month").html());
            var yy = parseInt($(".f-year").html());
            if( mm == 12){//返回12月
                $(".f-year").html(yy+1);
                $(".f-month").html(1);
                showDate(yy+1,1);
            }else{//上一月
                $(".f-month").html(mm+1);
                showDate(yy,mm+1);
            }
        })
        //返回本月
        $(".f-btn-fhby").click(function(){
            $(".f-year").html( mydate.getFullYear() );
            $(".f-month").html( mydate.getMonth()+1 );
            showDate(mydate.getFullYear(),mydate.getMonth()+1);
        })
        
        //读取年月写入日历  重点算法!!!!!!!!!!!
        function showDate(yyyy,mm){
            var dd = new Date(parseInt(yyyy),parseInt(mm), 0);   //Wed Mar 31 00:00:00 UTC+0800 2010  
            var daysCount = dd.getDate();            //本月天数  
            var mystr ="";//写入代码
            // var mystr;
            var icon = "";//图标代码
            var today = new Date().getDate(); //今天几号  
            var monthstart = new Date(parseInt(yyyy)+"/"+parseInt(mm)+"/1").getDay()//本月1日周几  
            var lastMonth; //上一月天数
            var nextMounth//下一月天数
            if(  parseInt(mm) ==1 ){
                lastMonth = new Date(parseInt(yyyy)-1,parseInt(12), 0).getDate();
            }else{
                lastMonth = new Date(parseInt(yyyy),parseInt(mm)-1, 0).getDate();
            }
            if( parseInt(mm) ==12 ){
                nextMounth = new Date(parseInt(yyyy)+1,parseInt(1), 0).getDate();
            }else{
                nextMounth = new Date(parseInt(yyyy),parseInt(mm)+1, 0).getDate();
            }
            //计算上月空格数
            for(j=monthstart;j>0;j--){
                mystr += "<div class='f-td f-null f-lastMonth' style='color:#ccc;'>"+(lastMonth-j+1)+"</div>";
            }
            var year = new Date().getFullYear();
            var month = new Date().getMonth()+1;
            //本月单元格
            for(i=0;i<daysCount;i++){
                 //这里为一个单元格，添加内容在此
                var renderTime = new Date(parseInt(yyyy),parseInt(mm)-1,i+1);
                if(renderTime>new Date()){
                    mystr += "<div class='f-td f-number'><span class='f-day'>"+(i+1)+"</span></div>";
                }else{
                    var mood = SwitchMoodImg(getDayMood(yyyy,mm,i+1));
                    if(IsMood!=0){
                        mystr += "<div class='f-td f-number'><span class='f-day'>"+(i+1)+"</span>"
                        +"<img class='f-yuan' src='"+mood+"'>"
                        +"</div>"; 
                    }else{
                        mystr += "<div class='f-td f-number'><span class='f-day'>"+(i+1)+"</span></div>";
                    }

                }
            }
            
            //计算下月空格数
            for(k=0; k<42-(daysCount+monthstart);k++ ){//表格保持等高6行42个单元格
                mystr += "<div class='f-td f-null f-nextMounth' style='color:#ccc;'>"+(k+1)+"</div>";
            }
             
            
            
            //写入日历
            $(".f-rili-table .f-tbody").html(mystr);
            //给今日加class
            if( mydate.getFullYear() == yyyy){
                if( (mydate.getMonth()+1 ) == mm){
                    var today = mydate.getDate();
                    var lastNum = $(".f-lastMonth").length;
                    $(".f-rili-table .f-td").eq(today+lastNum-1).addClass("f-today");
                }
            }
            //绑定选择方法
            $(".f-rili-table .f-number").off("click");
            $(".f-rili-table .f-number").on("click",function(){
                $(".f-rili-table .f-number").removeClass("f-on");
                $(this).addClass("f-on");
            });
            
            //绑定查看方法
            $(".f-yuan").off("mouseover");
            $(".f-yuan").on("mouseover",function(){
                $(this).parent().find(".f-table-msg").show();
            });
            $(".f-table-msg").off("mouseover");
            $(".f-table-msg").on("mouseover",function(){
                $(this).show();
            });
            $(".f-yuan").off("mouseleave");
            $(".f-yuan").on("mouseleave",function(){
                $(this).parent().find(".f-table-msg").hide();
            });
            $(".f-table-msg").off("mouseleave");
            $(".f-table-msg").on("mouseleave",function(){
                $(this).hide();
            });
        }

        function getDayMood(y,m,d){
            var settings = {
                "async": false,
                "crossDomain": true,
                "url": "http://47.106.207.177/Xinqing/getmood",
                "method": "POST",
                "headers": {
                  "Content-Type": "application/json",
                  "cache-control": "no-cache",
                },
                "processData": false,
                "data": "{\n\t\"id\":\"{4}\",\n\t\"password\":\"{5}\",\n\t\"begin\":\"{0}-{1}-{2} 00:00:00\",\n\t\"end\":\"{0}-{1}-{3} 00:00:00\"\n}".format(y,m,d,d+1,JSON.parse(userinfo).id,JSON.parse(userinfo).password)
              }
              var Moods;
              $.ajax(settings).done(function (response) { 
                MonthMoods.push(response);                     
                Moods = response.result.main;
                IsMood = response.result.main_num;
              });
              return Moods; 
        }
    })             
})

