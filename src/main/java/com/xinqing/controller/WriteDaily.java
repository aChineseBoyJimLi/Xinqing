package com.xinqing.controller;

import com.xinqing.entities.*;
import com.xinqing.repository.DailyRepository;
import com.xinqing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class WriteDaily {
    @Autowired
    private DailyRepository dailyRepository;
    @Autowired
    private UserRepository userRepository;
    @PostMapping(path = "/write")
    @ResponseBody
    public Message Write(@RequestBody Daily d){

        try{
            User user1 = d.getUser();
            User user2 = userRepository.getOne(user1.getId());
            if(user1.getPassword().equals(user2.getPassword())){ // 判断该用户的合法性
                user1.setPassword("");
                d.setUser(user1);
                dailyRepository.save(d);
                Message<List<Daily>> mes = new Message();
                List<Daily> dailyList = dailyRepository.findAllDailyByUser(user1);
                mes.setResult(dailyList);
                return mes;
            }
            else{
                ErrorMessage<String> mes = new ErrorMessage<>();
                mes.setError("密码错误");
                mes.setCode(ErrorCodes.NO_PASSWORD);
                return mes;
            }
        }
        catch (Exception e){
            Message<String> mes = new Message<>();
            mes.setResult(e.getClass().toString());
            return mes;
        }
    }
}
