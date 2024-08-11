package com.jkof86.services;

import com.jkof86.models.Account;
import com.jkof86.models.Food;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public interface FoodService {
    public List<Food> getAllFoods();
    public Food getFoodById(int id);
    public Food getFoodByName(String name);
    public Food addFood(Food f);
    public boolean removeFood(String name);
    public boolean updateFood(Food f);
}
