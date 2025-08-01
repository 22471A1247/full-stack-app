package com.example.store.service.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.store.entity.Book;
import com.example.store.repository.BookRepository;
import com.example.store.service.Bookservice;

@Service
public class Bookimplementation implements Bookservice {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(Long bookId) {
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        return optionalBook.orElse(null); // Return null if book is not found
    }

    @Override
    public Book updateBook(Book book) {
        Book existingBook = bookRepository.findById(book.getId()).orElse(null);
        if (existingBook != null) {
            existingBook.setTitle(book.getTitle());
            existingBook.setAuthor(book.getAuthor());
            existingBook.setDescription(book.getDescription());
            existingBook.setGenre(book.getGenre());
            return bookRepository.save(existingBook);
        } else {
            return null; // Return null if book is not found
        }
    }

    @Override
    public void deleteBook(long bookId) {
        bookRepository.deleteById(bookId);
    }
}