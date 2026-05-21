package com.rishit.financetracker.repository;

import com.rishit.financetracker.entity.Budget;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

//public interface BudgetRepository extends MongoRepository<Budget, String> {
//
//    Optional<Budget> findByUserIdAndCategory(String userId, String category);
//
//    List<Budget> findByUserId(String userId);
//
//}

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends MongoRepository<Budget, String> {

    // ✅ get all budgets for user

    Optional<Budget> findByUserId(String userId);



}