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
        $("#changePanel").text("点击注册")
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
        $("#changePanel").text("点击登录")
    }
    });

    $('#signIn').click(function(){
        var name = $('#Name').val();
        var email = $('#Email').val();
        var password = $('#Password').val();
        var ensurePassword = $('#EnsurePassword').val();

        if(name!=""&&email!=""&&password!=""&&ensurePassword!=""){
            $("#form-sign-in .title span").text("");
            $("#form-sign-in .form-control").removeClass("form-control-error");
            if(ensurePassword!=password){
                // 两次密码不一致，请重新输入
                $("#form-sign-in .title #pwd-error").text("两次密码不一致，请重新输入");
                $("#form-sign-in #Password").addClass("form-control-error");
                $("#form-sign-in #EnsurePassword").addClass("form-control-error");
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
                    "url": "http://47.106.207.177/Xinqing/register",
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
                        //此账户已注册
                        $("#form-sign-in .title #email-error").text("此账号已注册");
                        $("#form-sign-in #Email").addClass("form-control-error");
                    }else{
                        var res = {
                            id:response.result,
                            password:password
                        };
                        var userinfo = '{\"id\":{id},\"password\":{password}}'.format(res);
                        sessionStorage.setItem("userinfo",userinfo);
                        location.href="http://47.106.207.177/Xinqing/home";
                    }
                    });
            }
        }else{
            $("#form-sign-in .title span").text("");
            $("#form-sign-in .form-control").removeClass("form-control-error");
            // 存在空表单
            if(name == ""){
                $("#form-sign-in .title #name-error").text("请输入用户名");
                $("#form-sign-in #Name").addClass("form-control-error");
            }
            if(email == ""){
                $("#form-sign-in .title #email-error").text("请输入用户名");
                $("#form-sign-in #Email").addClass("form-control-error");
            }
            if(password == "" || ensurePassword == ""){
                $("#form-sign-in .title #pwd-error").text("请输入密码");
                $("#form-sign-in #Password").addClass("form-control-error");
                $("#form-sign-in #EnsurePassword").addClass("form-control-error");
            }
        }
    });

    $('#signUp').click(function(){
        var email = $('#LoginEmail').val();
        var password = $('#LoginPassword').val();
        if(email!=""&&password!=""){
                $("#form-login .title span").text("");
                $("#form-login .form-control").removeClass("form-control-error");
                var input = {
                    password:password,
                    email:email,
                }
                //访问后台服务器
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://47.106.207.177/Xinqing/login",
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
                        if(response.code == "NO_RECORDS"){
                            // 账号未注册
                            $("#form-login .title #email-login-error").text("此账户还未注册");
                            $("#form-login #LoginEmail").addClass("form-control-error");
                        }
                        if(response.code == "NO_PASSWORD"){
                            // 密码错误
                            $("#form-login .title #pwd-login-error").text("密码错误");
                            $("#form-login #LoginPassword").addClass("form-control-error");
                        }
                    }else{
                            var res = {
                                id:response.result,
                                password:password
                            };
                            var userinfo = '{\"id\":{id},\"password\":{password}}'.format(res);
                            sessionStorage.setItem("userinfo",userinfo);
                            location.href="http://47.106.207.177/Xinqing/home";
                    }
                  });
        }else{
            $("#form-login .title span").text("");
            $("#form-login .form-control").removeClass("form-control-error");
            // 表单不能有空
            if(email == ""){
                $("#form-login .title #email-login-error").text("请输入邮箱");
                $("#form-login #LoginEmail").addClass("form-control-error");
            }
            if(password == ""){
                $("#form-login .title #pwd-login-error").text("请输入密码");
                $("#form-login #LoginPassword").addClass("form-control-error");
            }
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