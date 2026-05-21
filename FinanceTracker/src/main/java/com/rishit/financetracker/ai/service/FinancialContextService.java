package com.rishit.financetracker.ai.service;

import com.rishit.financetracker.analytics.service.AnalyticsService;
import com.rishit.financetracker.repository.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;

@Service
@RequiredArgsConstructor
public class FinancialContextService {

    private final AnalyticsService analyticsService;
    private final BudgetRepository budgetRepository;

    public String buildContext(String userId) {

        int year = LocalDate.now().getYear();
        int month = LocalDate.now().getMonthValue();

        var summary = analyticsService.getMonthlySummary(userId, year, month);
        var categories = analyticsService.getCategoryExpense(userId, year, month);

        var budgetOpt = budgetRepository.findByUserId(userId);

        StringBuilder context = new StringBuilder();

        context.append("Monthly Summary:\n");
        context.append("Income: ").append(summary.getIncome()).append("\n");
        context.append("Expense: ").append(summary.getExpense()).append("\n\n");

        context.append("Category Spending:\n");

        for (var c : categories) {
            context.append(c.getCategory())
                    .append(": ")
                    .append(c.getAmount())
                    .append("\n");
        }


        context.append("\nBudget:\n");

        if (budgetOpt.isPresent()) {
            var budget = budgetOpt.get();

            context.append("Monthly Limit: ")
                    .append(budget.getMonthlyLimit())
                    .append("\n");
        } else {
            context.append("No budget set\n");
        }

        double savings = summary.getIncome().doubleValue() - summary.getExpense().doubleValue();

        context.append("\nInsights:\n");

        if (savings > 0) {
            context.append("User is saving money.\n");
        } else {
            context.append("User is overspending.\n");
        }


        var maxCategory = categories.stream()
                .max(Comparator.comparing(c -> c.getAmount()))
                .orElse(null);

        if (maxCategory != null) {
            context.append("Highest spending category: ")
                    .append(maxCategory.getCategory())
                    .append("\n");
        }

        return context.toString();
    }
}