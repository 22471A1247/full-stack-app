package com.example.store.service;

import java.util.List;

import com.example.store.entity.Book;

public interface Bookservice {
    Book createBook(Book book);
    Book getBookById(Long bookId);
    List<Book> getAllBooks();
    Book updateBook(Book book);
    void deleteBook(long bookId);
}