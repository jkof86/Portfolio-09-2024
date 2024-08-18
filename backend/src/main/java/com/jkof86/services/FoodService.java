package com.jkof86.services;

import com.jkof86.models.Food;
import java.util.List;

public interface FoodService {
    public List<String> getAllFoods() throws Exception;
    public Food getFoodById(int id);
    public Food getFoodByName(String name);
    public Food addFood(Food f);
    public boolean removeFood(String name);
    public boolean updateFood(Food f);
}
