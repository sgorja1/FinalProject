package com.santosh.booklisting.repository;

import com.santosh.booklisting.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostDatabase extends MongoRepository<Post,String> {

}
