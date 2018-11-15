package com.xinqing.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 * 返回消息
 */

public class Message <T>{
    public Message(){}

    private T res; //返回结果

    public void setResult(T s){ this.res = s;}

    public T getResult(){ return this.res;}

}