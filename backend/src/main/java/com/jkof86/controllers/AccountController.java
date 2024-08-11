package com.jkof86.controllers;

import com.jkof86.models.Account;
import com.jkof86.services.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    AccountServiceImpl as;

    @GetMapping
    private ResponseEntity<List<Account>> getAll() {
        return new ResponseEntity<>(as.getAllAccounts(), HttpStatus.OK);
    }

    @GetMapping
    private ResponseEntity<List<Account>> getById() {
        return new ResponseEntity<>(as.getAllAccounts(), HttpStatus.OK);
    }

    @GetMapping
    private ResponseEntity<List<Account>> getByEmail() {
        return new ResponseEntity<>(as.getAllAccounts(), HttpStatus.OK);
    }



    @PostMapping
    private ResponseEntity<Account> add(@RequestBody Account a) {
        return new ResponseEntity<>(as.addAccount(a), HttpStatus.OK);
    }
}
