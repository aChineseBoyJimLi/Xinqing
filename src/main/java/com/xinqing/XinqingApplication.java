package com.xinqing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@SpringBootApplication
public class XinqingApplication {
    @GetMapping(path="/")
    public String index(){
        return "index";
    }
    @GetMapping(path="/home")
    public String home(){
        return "home";
    }
    public static void main(String[] args) {
        SpringApplication.run(XinqingApplication.class, args);
    }
}
