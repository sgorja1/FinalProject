package com.santosh.booklisting.repository;

import com.santosh.booklisting.model.Post;

import java.util.List;

public interface SearchMultiple {
    List<Post> findByText(String text);
}
