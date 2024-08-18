package com.jkof86.services;

import com.jkof86.models.Food;
import com.jkof86.repositories.FoodRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepo fr;


    //rather than returning a list of Food objects
    //we only need a list of the food names
    @Override
    public List<String> getAllFoods() throws Exception {

        //first we retrieve the List of Food Items
        List<Food> foodList = fr.findAll();

        //then we initialize the List of names
        List<String> foodNameList = new ArrayList<>();

        //and build the List of names
        for (Food f : foodList) {
            foodNameList.add(f.getName());
        }

        //we use Stream API to iterate through the food list
        //and retrieve just the names of the items
        //we use Optional to bypass NullPointerException

//        foodList.forEach( f -> foodList.add(f.getName())
//                    .map(Object::toString);
//                );

//        String result = list.stream()
//                .filter(x -> x.length() == 1)
//                .findFirst()  // returns Optional
//                .map(Object::toString)
//                .orElse("");


//
//        List<Optional<String>> foodNameList;
//
//        foodList.stream()
//                        .flatMap()
//                );

        return foodNameList;
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
        System.out.println("Attempting Food Deletion");
        if (fr.existsFoodByName(name)) {
            try {
                fr.delete(getFoodByName(name));
            } catch (Exception e) {
                System.out.println("Error Removing Food: " + name);
                e.printStackTrace();
                return false;
            }
            System.out.println("Food removed successfully: " + name);
            return true;
        }
        System.out.println("Food doesn't exist: " + name);
        return false;
    }

    @Override
    public boolean updateFood(Food f) {
        System.out.println("Attempting Food Item Update");
        if (fr.existsFoodByName(f.getName())) {
            //we remove the old food item
            try {
                removeFood(f.getName());
            } catch (Exception e) {
                System.out.println("Error Removing food: " + f.getName());
                e.printStackTrace();
                return false;
            }
            //if all checks pass, we then add the updated food item
            fr.save(f);
            System.out.println("Food updated successfully: " + f);
            return true;
        }
        System.out.println("Food doesn't exist: " + f.getName());
        return false;
    }
}
