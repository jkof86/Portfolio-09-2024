package com.jkof86.controllers;

import com.jkof86.models.Food;
import com.jkof86.services.FoodService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/foods")
public class FoodController {

    @Autowired
    FoodService fs;

    @GetMapping
    private ResponseEntity<List<String>> getAll() throws Exception {
        List<String> foodList =
                fs.getAllFoods();
        System.out.println("Retrieving List of Food Items: " + foodList);
        return new ResponseEntity<>(foodList, foodList != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Food> getById(@PathVariable int id) {
        Food food= fs.getFoodById(id);
        System.out.println("Retrieving Food Item(s): " + food);
        return new ResponseEntity<>(food, food != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/search")
    private ResponseEntity<Food> getByName(@PathParam("name") String name) {
        Food food = fs.getFoodByName(name);
        System.out.println("Attempting Food Item Retrieval: " + food);
        return new ResponseEntity<>(food, food != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping
    private ResponseEntity<Food> add(@RequestBody Food f) {
        Food food = fs.addFood(f);
        System.out.println("Attempting Food Item Creation: " + food);
        return new ResponseEntity<>(food, food != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @DeleteMapping
    private ResponseEntity<Boolean> remove(@PathParam("name") String name) {
        Boolean food = fs.removeFood(name);
        //tertiary condition based on result of food item removal
        return new ResponseEntity<>(food, food ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PutMapping
    private ResponseEntity<Boolean> update(@RequestBody Food f) {
        Boolean food = fs.updateFood(f);
        //tertiary condition based on result of food item removal
        return new ResponseEntity<>(food, food ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
}
