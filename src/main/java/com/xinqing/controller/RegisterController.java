package com.xinqing.controller;

import com.xinqing.entities.ErrorCodes;
import com.xinqing.entities.ErrorMessage;
import com.xinqing.entities.User;
import com.xinqing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.xinqing.entities.Message;

@Controller
//@SpringBootApplication
public class RegisterController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/register")
    @ResponseBody
    public Message Register(@RequestBody User u){
        try{
            userRepository.save(u);
            User user = userRepository.findByEmail(u.getEmail());
            Message<Long> mes = new Message();
            mes.setResult(user.getId());
            return mes;
        }
        catch (Exception e){
            ErrorMessage<String> mes = new ErrorMessage();
            if(e instanceof org.springframework.dao.DataIntegrityViolationException){
                mes.setError("此账号已经存在");
                mes.setCode(ErrorCodes.Field_CONFLICT);
                return mes;
            }

            mes.setResult("未知异常，请稍后重试");
            mes.setCode(ErrorCodes.UNKOWN_ERROR);
            return mes;
        }

    }

}

