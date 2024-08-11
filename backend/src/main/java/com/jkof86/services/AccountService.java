package com.jkof86.services;

import com.jkof86.models.Account;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public interface AccountService {
    public List<Account> getAllAccounts();
    public Account getAccountById(int id);
    public Account getAccountByEmail(String email);
    public Account addAccount(Account a);
    public boolean removeAccount(String email);
    public boolean updateAccount(Account a);
}
