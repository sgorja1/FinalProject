package com.santosh.booklisting.repository;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.santosh.booklisting.model.Post;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@Component
public class Searchmultiparm implements SearchMultiple {
    @Autowired
    MongoClient client;
    @Autowired
    MongoConverter converter;
    public List<Post> findByText(String text) {
        final List<Post> posts= new ArrayList<>();
        MongoDatabase database = client.getDatabase("books");
        MongoCollection<Document> collection = database.getCollection("bookposts");
        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search",
                        new Document("text",
                                new Document("query", text)
                                        .append("path", Arrays.asList("bookname","desc", "buyFrom", "authour")))),
                new Document("$sort",
                        new Document("release", -1L))));
        result.forEach(document -> posts.add(converter.read(Post.class,document)));
        return posts;
    }
}
