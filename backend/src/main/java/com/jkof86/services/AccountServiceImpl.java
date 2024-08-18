package com.jkof86.services;

import com.jkof86.models.Account;
import com.jkof86.repositories.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountRepo ar;

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
        System.out.println("Attempting Account Deletion");
        if (ar.existsAccountByEmail(email)) {
            try {
                ar.delete(getAccountByEmail(email));
            } catch (Exception e){
                System.out.println("Error Removing account: " + email);
                e.printStackTrace();
                return false;
            }
            System.out.println("Account removed successfully: " + email);
            return true;
        }
        System.out.println("Account doesn't exist: " + email);
        return false;
    }

    @Override
    public boolean updateAccount(Account a) {
        System.out.println("Attempting Account Update");
        if (ar.existsAccountByEmail(a.getEmail())) {
            //we remove the old account
            try {
                removeAccount(a.getEmail());
            } catch (Exception e) {
                System.out.println("Error Removing account: " + a);
                e.printStackTrace();
                return false;
            }
            //if all checks pass, we then add the updated account
            ar.save(a);
            System.out.println("Account updated successfully: " + a);
            return true;
        }
        System.out.println("Account doesn't exist: " + a);
        return false;
    }

}
