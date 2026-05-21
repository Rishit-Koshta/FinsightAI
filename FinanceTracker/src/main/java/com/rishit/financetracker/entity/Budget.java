package com.rishit.financetracker.entity;


import com.rishit.financetracker.entity.enums.TransactionType;
import com.rishit.financetracker.exceptions.ResourceNotFoundException;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//@Data
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Document(collection = "budgets")
//public class Budget {
//
//    @Id
//    private String id;
//
//    private String userId;
//
//    private String category;
//
//    private Double monthlyLimit;
//}


    @Document(collection = "budgets")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Budget {

        @Id
        private String id;

        private String userId;

        private Double monthlyLimit; // ✅ only one field needed
    }