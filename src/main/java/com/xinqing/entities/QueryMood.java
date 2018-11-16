package com.xinqing.entities;

public class QueryMood {
    private long id;
    private String password;
    private String begin;
    private String end;

    public void setId(long id){this.id = id;}
    public void setPassword(String p){this.password = p;}
    public void setBegin(String d){this.begin = d;}
    public void setEnd(String d){this.end = d;}

    public long getId(){return this.id;}
    public String getPassword(){return this.password;}
    public String getBegin(){return this.begin;}
    public String getEnd(){return this.end;}

    public QueryMood(){}
}
