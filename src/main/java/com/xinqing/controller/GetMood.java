package com.xinqing.controller;

import com.xinqing.entities.*;
import com.xinqing.repository.DailyRepository;
import com.xinqing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;


@Controller
public class GetMood {
    @Autowired
    private DailyRepository dailyRepository;
    @Autowired
    private UserRepository userRepository;
    @PostMapping(path = "/getmood")
    @ResponseBody
    public Message GetMood(@RequestBody QueryMood q){
        try{
            User user1 = new User();
            user1.setId(q.getId());
            user1.setPassword(q.getPassword());
            User user2 = userRepository.getOne(user1.getId());
            if(user1.getPassword().equals(user2.getPassword())){
                DailyMood mood = new DailyMood();
                Map<Mood, Integer> moodMap = new TreeMap<Mood, Integer>();

                int disgust = dailyRepository.findMood(user1.getId(),q.getBegin(),q.getEnd(),"DISGUST");
                mood.setDisgust(disgust);
                moodMap.put(Mood.DISGUST,disgust);
                int joy = dailyRepository.findMood(user1.getId(),q.getBegin(),q.getEnd(),"JOY");
                mood.setJoy(joy);
                moodMap.put(Mood.JOY,joy);
                int anger = dailyRepository.findMood(user1.getId(),q.getBegin(),q.getEnd(),"ANGER");
                mood.setAnger(anger);
                moodMap.put(Mood.ANGER,anger);
                int noemo = dailyRepository.findMood(user1.getId(),q.getBegin(),q.getEnd(),"NOEMO");
                mood.setNoemo(noemo);
                moodMap.put(Mood.NOEMO,noemo);
                int surprise = dailyRepository.findMood(user1.getId(),q.getBegin(),q.getEnd(),"SURPRISE");
                mood.setSurprise(surprise);
                moodMap.put(Mood.SURPRISE,surprise);
                int sadness = dailyRepository.findMood(user1.getId(),q.getBegin(),q.getEnd(),"SADNESS");
                mood.setSadness(sadness);
                moodMap.put(Mood.SADNESS,sadness);
                int fear = dailyRepository.findMood(user1.getId(),q.getBegin(),q.getEnd(),"FEAR");
                mood.setFear(fear);
                moodMap.put(Mood.FEAR,fear);

                // 对心情进行排序
                List<Map.Entry<Mood,Integer>> list = new ArrayList<Map.Entry<Mood,Integer>>(moodMap.entrySet());
                Collections.sort(list, new Comparator<Map.Entry<Mood, Integer>>() {
                    @Override
                    public int compare(Map.Entry<Mood, Integer> o1, Map.Entry<Mood, Integer> o2) {
                        return o2.getValue().compareTo(o1.getValue());
                    }
                });
                mood.setMain(list.get(0).getKey());
                mood.setMain_num(list.get(0).getValue());
                Message<DailyMood> mes = new Message();
                mes.setResult(mood);



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


