package com.xinqing.entities;

/**
 * 返回错误信息类
 */
//@Entity
public class ErrorMessage<T> extends Message {
    private String error = "";     //错误消息
    private ErrorCodes code;  //错误代码
    public void setError(String s){ this.error = s; }
    public String getError(){ return this.error;}
    public void setCode(ErrorCodes c){this.code = c;}
    public ErrorCodes getCode() {return this.code;}
}
