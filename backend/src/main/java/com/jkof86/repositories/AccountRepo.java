package com.jkof86.repositories;

import com.jkof86.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepo extends JpaRepository<Account, Integer> {
    Account findById(int id);
    Account findByEmail(String email);
    boolean existsAccountByEmail(String email);
}
