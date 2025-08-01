package com.example.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.store.entity.Book;

public interface BookRepository extends JpaRepository<Book,Long>{
}