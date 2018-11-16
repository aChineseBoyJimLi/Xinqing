package com.xinqing.entities;

public class DailyMood {
    private int disgust; // 统计该天相应心情的数量
    private int joy;
    private int anger;
    private int noemo;
    private int surprise;
    private int sadness;
    private int fear;
    private Mood main;   // 统计该天主要的心情
    private int main_num;// 统计该天主要的心情的数量

    public void setDisgust(int i){this.disgust = i;}
    public void setJoy(int i){this.joy = i;}
    public void setAnger(int i){this.anger = i;}
    public void setNoemo(int i){this.noemo = i;}
    public void setSurprise(int i){this.surprise = i;}
    public void setSadness(int i){this.sadness = i;}
    public void setFear(int i){this.fear = i;}
    public void setMain(Mood m){this.main = m;}
    public void setMain_num(int i){this.main_num = i;}

    public int getDisgust(){return this.disgust;}
    public int getJoy(){return this.joy;}
    public int getAnger(){return this.anger;}
    public int getNoemo(){return this.noemo;}
    public int getSurprise(){return this.surprise;}
    public int getSadness(){return this.sadness;}
    public int getFear(){return this.fear;}
    public Mood getMain(){return this.main;}
    public int getMain_num(){return this.main_num;}
}
