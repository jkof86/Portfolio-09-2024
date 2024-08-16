package com.jkof86.controllers;

import com.jkof86.models.Account;
import com.jkof86.services.AccountService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    AccountService as;

    @Autowired
    List<Account> accountList;

//    List<Account> accountList;
//    Account account;

    //There's some issue autowiring the constructor
    //Not sure why

//    @Autowired
//    public AccountController(AccountService as, List<Account> accountList,
//                             Account account) {
//        this.as = as;
//        this.account = account;
//    }

    @GetMapping
    private ResponseEntity<List<Account>> getAll() {
        accountList = as.getAllAccounts();
        System.out.println("Retrieving List of Accounts: " + accountList);
        return new ResponseEntity<>(accountList != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Account> getById(@PathVariable int id) {
        Account account = as.getAccountById(id);
        System.out.println("Retrieving Account(s): " + account);
        return new ResponseEntity<>(account != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/search")
    private ResponseEntity<Account> getByEmail(@PathParam("email") String email) {
        Account account = as.getAccountByEmail(email);
        System.out.println("Attempting Account Retrieval: " + account);
        return new ResponseEntity<>(account != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping
    private ResponseEntity<Account> add(@RequestBody Account a) {
        Account account = as.addAccount(a);
        System.out.println("Attempting Account Creation: " + account);
        return new ResponseEntity<>(account != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @DeleteMapping
    private ResponseEntity<Boolean> remove(@PathParam("email") String email) {
        System.out.println("Attempting Account Deletion");
        //tertiary condition based on result of account removal
        return new ResponseEntity<>(as.removeAccount(email) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PutMapping
    private ResponseEntity<Boolean> update(@RequestBody Account a) {
        System.out.println("Attempting Account Update");
        //tertiary condition based on result of account removal
        return new ResponseEntity<>(as.updateAccount(a) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
}
