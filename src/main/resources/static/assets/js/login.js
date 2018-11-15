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

    $('#signUp').click(function(){
        location.href = "home.html";
    });

})