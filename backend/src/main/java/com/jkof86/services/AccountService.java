package com.jkof86.services;

import com.jkof86.models.Account;

import java.util.List;

public interface AccountService {
    public List<Account> getAllAccounts();
    public Account getAccountById(int id);
    public Account getAccountByEmail(String email);
    public Account addAccount(Account a);
    public boolean removeAccount(String email);
    public boolean updateAccount(Account a);
}
