package com.rishit.financetracker.controller;

import com.rishit.financetracker.entity.Budget;
import com.rishit.financetracker.repository.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
public class BudgetController{

    private final BudgetRepository budgetRepository;
    @PostMapping
    public Budget createOrUpdateBudget(@RequestBody Budget budget) {

        Optional<Budget> existing = budgetRepository.findByUserId(budget.getUserId());

        if (existing.isPresent()) {
            Budget old = existing.get();
            old.setMonthlyLimit(budget.getMonthlyLimit());
            return budgetRepository.save(old);
        }

        return budgetRepository.save(budget);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Budget> getBudget(@PathVariable String userId) {

        return budgetRepository.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

