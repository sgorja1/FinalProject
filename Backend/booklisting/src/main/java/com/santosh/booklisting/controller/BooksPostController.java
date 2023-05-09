package com.santosh.booklisting.controller;


import com.mongodb.client.result.DeleteResult;
import com.santosh.booklisting.repository.PostDatabase;
import com.santosh.booklisting.model.Post;
import com.santosh.booklisting.repository.SearchMultiple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BooksPostController {
    @Autowired
    PostDatabase db;
    @Autowired
    SearchMultiple multiParams;
    @Autowired
    private MongoTemplate mongoTemplate;


    @ApiIgnore
    @RequestMapping(value ="/")
    public void sendSwagger(HttpServletResponse response) throws IOException {
        response.sendRedirect("/swagger.ui.html");
    }
    @CrossOrigin
    @GetMapping("/AllBooks")
    public List<Post> getAllBooks(){
        return db.findAll();
    }
    @PostMapping("/addBook")
    @CrossOrigin
    public Post addbook(@RequestBody Post post){
       return db.save(post);
    }
    @GetMapping("/searchBooks/{text}")
    public List<Post> searchBooks(@PathVariable String text){
        return multiParams.findByText(text);
    }
    @DeleteMapping("/books/{authour}")
    public DeleteResult deleteBookByAuthor(@PathVariable("authour") String authour) {
        return mongoTemplate.remove(new Query(Criteria.where("authour").is(authour)), Post.class);
    }
    @DeleteMapping("/books/authour/{id}")
    public DeleteResult deleteBookById(@PathVariable("id") String id) {
        return mongoTemplate.remove(new Query(Criteria.where("id").is(id)), Post.class);
    }


    public void updateBookContentById(String id, String newContent) {
        Query query = new Query(Criteria.where("id").is(id));
        Update update = new Update().set("desc", newContent);
        mongoTemplate.updateFirst(query, update, Post   .class);
    }
    @PutMapping("/books/description/{id}")
    public ResponseEntity<String> updateBookDescription(@PathVariable String id, @RequestBody String newContent) {
        updateBookContentById(id, newContent);
        return ResponseEntity.ok("Book description updated successfully");
    }


}






