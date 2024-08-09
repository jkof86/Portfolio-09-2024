package com.jkof86.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.jkof86.models.Food;

@Repository
public interface FoodRepo extends JpaRepository<Food,Integer> {

}
