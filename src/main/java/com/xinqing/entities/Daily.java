package com.xinqing.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * 日志实体类，对应的数据库表是daily
 */
@Entity
@Table(name="daily")
@JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
public class Daily {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String title;       //日志标题

    @Column(nullable = false)
    private String content;     // 日志内容

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;          // 日志外键，关联用户表

    @Column(nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;          // 日志创建的时间

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Mood mood;          // 写日志时的心情

    @Column(nullable = false)
    private String image;       // 一张图片

    public Daily(){}

    /**
     * 设置属性
     */
    public void setTitle(String s){this.title = s;}
    public void setContent(String s){this.content = s;}
    public void setUser(User u){this.user = u;}
    public void setTime(Date d){this.time = d;}
    public void setMood(Mood m){this.mood = m;}
    public void setImage(String s){this.image = s;}

    /**
     * 返回属性
     */
    public String getTitle(){return this.title;}
    public String getContent(){return this.content;}
    public User getUser(){return this.user;}
    public Date getTime(){return this.time;}
    public Mood getMood(){return this.mood;}
    public String getImage(){return this.image;}

}
