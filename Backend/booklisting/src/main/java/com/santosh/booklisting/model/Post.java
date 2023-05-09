package com.santosh.booklisting.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.Collection;

@Document(collection= "bookposts")
public class Post {
    private String bookname;
    private int release;
    private String authour;

    private String desc;

    private String buyFrom[];

    private String id;

    public Post() {
    }

    public String getBookname() {
        return bookname;
    }

    public void setBookname(String bookname) {
        this.bookname = bookname;
    }

    public int getRelease() {
        return release;
    }

    public void setRelease(int release) {
        this.release = release;
    }

    public String getAuthour() {
        return authour;
    }

    public void setAuthour(String authour) {
        this.authour = authour;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String[] getBuyFrom() {
        return buyFrom;
    }

    public void setBuyFrom(String[] buyFrom) {
        this.buyFrom = buyFrom;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Post{" +
                "bookname='" + bookname + '\'' +
                ", release=" + release +
                ", authour='" + authour + '\'' +
                ", desc='" + desc + '\'' +
                ", buyFrom=" + Arrays.toString(buyFrom) +
                ", id='" + id + '\'' +
                '}';
    }
}
