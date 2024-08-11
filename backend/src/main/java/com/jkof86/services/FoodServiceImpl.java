package com.jkof86.services;

import com.jkof86.models.Food;
import com.jkof86.repositories.FoodRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepo fr;

    @Override
    public List<Food> getAllFoods() {
        return fr.findAll();
    }

    @Override
    public Food getFoodById(int id) {
        return fr.findById(id);
    }

    @Override
    public Food getFoodByName(String name) {
        return fr.findByName(name);
    }

    @Override
    public Food addFood(Food f) {
        return fr.save(f);
    }

    @Override
    public boolean removeFood(String name) {
        if (fr.existsFoodByName(name)) {
            try {
                fr.delete(getFoodByName(name));
            } catch (Exception e){
                System.out.println("Error Removing Food: " + fr);
                e.printStackTrace();
                return false;
            }
            System.out.println("Food removed successfully: " + fr);
            return true;
        }
        System.out.println("Food doesn't exist: " + fr);
        return false;
    }

    @Override
    public boolean updateFood(Food f) {
        if (fr.existsFoodByName(f.getName())) {
            //we add the new food
            try {
                fr.save(f);
            } catch (Exception e) {
                System.out.println("Error Removing food: " + fr);
                e.printStackTrace();
                return false;
            }
            //if all checks pass, we then remove the old food
            removeFood(f.getName());
            System.out.println("Food updated successfully: " + fr);
            return true;
        }
        System.out.println("Food doesn't exist: " + fr);
        return false;
    }
}
