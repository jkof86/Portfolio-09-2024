package com.jkof86.services;

import com.jkof86.models.Account;
import com.jkof86.repositories.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepo ar;

    @Override
    public List<Account> getAllAccounts() {
        return ar.findAll();
    }

    @Override
    public Account getAccountById(int id){
        return ar.findById(id);
    }

    @Override
    public Account getAccountByEmail(String email) {
        return ar.findByEmail(email);
    }

    @Override
    public Account addAccount(Account a) {
        return ar.save(a);
    }

    @Override
    public boolean removeAccount(String email) {
        if (ar.existsAccountByEmail(email)) {
            try {
                ar.delete(getAccountByEmail(email));
            } catch (Exception e){
                System.out.println("Error Removing account: " + ar);
                e.printStackTrace();
                return false;
            }
            System.out.println("Account removed successfully: " + ar);
            return true;
        }
        System.out.println("Account doesn't exist: " + ar);
        return false;
    }

    @Override
    public boolean updateAccount(Account a) {
        if (ar.existsAccountByEmail(a.getEmail())) {
            //we add the new account
            try {
                ar.save(a);
            } catch (Exception e) {
                System.out.println("Error Removing account: " + ar);
                e.printStackTrace();
                return false;
            }
            //if all checks pass, we then remove the old account
            removeAccount(a.getEmail());
            System.out.println("Account updated successfully: " + ar);
            return true;
        }
        System.out.println("Account doesn't exist: " + ar);
        return false;
    }

}
