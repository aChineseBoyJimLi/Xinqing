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
public class GetDailies {
    @Autowired
    private DailyRepository dailyRepository;
    @Autowired
    private UserRepository userRepository;
    @PostMapping(path="/read")
    @ResponseBody
    public Message Read(@RequestBody User d){
        try{
            User user1 = d;
            User user2 = userRepository.getOne(user1.getId());
            if(user1.getPassword().equals(user2.getPassword())){
                user1.setPassword("");
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
