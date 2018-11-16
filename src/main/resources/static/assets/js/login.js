$(document).ready(function(){
    /*跳转至登录界面*/
    var flag = true;
    $('#changePanel').click(function(){
    var panel = $('.btnLogin');
    var signIn = $('.sign-in');
    if(flag){
        signIn.hide(200);
        panel.removeClass('col-4');
        panel.addClass('col-8');
        $('.rigth-img').css({
            "max-width":"600px",
            "margin-top":"80px"
        });
        $('.login').removeClass('hidden');       
        flag = false;
    }else{
        signIn.show(200);
        panel.removeClass('col-8');
        panel.addClass('col-4');
        $('.rigth-img').css({
            "max-width":"100%",
            "margin-top":"200px"
        });
        $('.login').addClass('hidden');
        flag = true;
    }
    });

    $('#signIn').click(function(){
        var name = $('#Name').val();
        var email = $('#Email').val();
        var password = $('#Password').val();
        var ensurePassword = $('#EnsurePassword').val();

        if(name!=""&&email!=""&&password!=""&&ensurePassword!=""){
            if(ensurePassword!=password){
                alert("两次密码不一致，请重新输入");
            }else{
                var input = {
                    name:name,
                    password:password,
                    email:email,
                }
                //访问后台服务器
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://localhost:8080/Xinqing/register",
                    "method": "POST",
                    "headers": {
                      "Content-Type": "application/json",
                      "cache-control": "no-cache",
                    },
                    "processData": false,
                    "data": "{\n    \"name\": \"{name}\",\n    \"password\": \"{password}\",\n    \"profile\": \"NA\",\n    \"email\": \"{email}\",\n    \"birthday\": \"1998-01-11\",\n    \"gender\": \"MALE\"\n}".format(input)
                  }
                  
                  $.ajax(settings).done(function (response) {
                    if(response.result==null){
                        alert("此账号已注册");
                    }else{
                        var message = confirm("注册成功!");
                        if(message==true){
                            var res = {
                                id:response.result,
                                password:password
                            };
                            var userinfo = '{\"id\":{id},\"password\":{password}}'.format(res);
                            sessionStorage.setItem("userinfo",userinfo);
                            location.href="http://localhost:8080/Xinqing/home";
                        }
                    }
                    });
            }
        }else{
            alert("请补全输入")
        }
    });

    $('#signUp').click(function(){
        var email = $('#LoginEmail').val();
        var password = $('#LoginPassword').val();
        if(email!=""&&password!=""){
                var input = {
                    password:password,
                    email:email,
                }
                //访问后台服务器
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://localhost:8080/Xinqing/login",
                    "method": "POST",
                    "headers": {
                      "Content-Type": "application/json",
                      "cache-control": "no-cache",
                    },
                    "processData": false,
                    "data": "{\n\t\"email\":\"{email}\",\n\t\"password\":\"{password}\"\n}".format(input)
                  }
                  
                  $.ajax(settings).done(function (response) {
                    console.log(response);
                    if(response.result==null){
                        alert(response.error);
                    }else{
                        var message = confirm("登录成功!");
                        if(message==true){
                            var res = {
                                id:response.result,
                                password:password
                            };
                            var userinfo = '{\"id\":{id},\"password\":{password}}'.format(res);
                            sessionStorage.setItem("userinfo",userinfo);
                            location.href="http://localhost:8080/Xinqing/home";
                        }
                    }
                  });
        }else{
            alert("请补全输入")
        }
    });

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
})