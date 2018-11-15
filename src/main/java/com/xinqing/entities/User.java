package com.xinqing.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * 用户实体类，对应的数据库表是user
 */
@Entity
@Table(name="user")
@JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;          // 用户id，主键，自增，唯一标识一个用户

    @Column(nullable = false)
    private String name;      // 用户名

    @Column(nullable = false)
    private String password;  // 用户密码

    @Column(nullable = false)
    private String profile;   // 用户头像，存储头像在服务器上存储的位置

    @Column(nullable = false, length=32, unique = true)
    private String email;     // 用户邮箱，同时作为用户账号，不能重复

    @Column(nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date birthday;   // 用户生日

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;        // 用户性别



    public User() {
    }         // 默认的构造函数

    /**
     * 设置属性
     */
    public void setId(long l){this.id = l;}
    public void setName(String n) { this.name = n; }
    public void setPassword(String s) { this.password = s; }
    public void setProfile(String s) { this.profile = s; }
    public void setEmail(String s) { this.email = s; }
    public void setBirthday(Date d) { this.birthday = d; }
    public void setSex(Gender s) { this.gender = s; }

    /**
     * 返回属性
     */
    public long getId(){return this.id;}
    public String getName(){return this.name;}
    public String getPassword(){return this.password;}
    public String getProfile(){return this.profile;}
    public String getEmail(){return this.email;}
    public Date getBirthday(){return this.birthday;}
    public Gender getGender(){return this.gender;}

}