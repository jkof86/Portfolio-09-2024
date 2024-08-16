package com.jkof86.models;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "foods")
public class Food {

    @Id //makes this a Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "f_id", updatable = false)
    private int id;

    @Column(unique = true)
    private String name;

    //calories in kcal
    @Column(nullable = true)
    private int calories;

    //macronutrients in grams
    @Column(nullable = true)
    private int protein;

    @Column(nullable = true)
    private int carbs;

    @Column(nullable = true)
    private int fat;

    //micronutrients
    @Column(nullable = true)
    private int fiber;

    @Column(nullable = true)
    private int sugar;

    @Column(nullable = true)
    private int cholesterol;

    @Column(nullable = true)
    private int sodium;

    @Column(nullable = true)
    private int potassium;

    @Column(nullable = true)
    private int vitaminA;

    @Column(nullable = true)
    private int vitaminC;

    @Column(nullable = true)
    private int calcium;

    @Column(nullable = true)
    private int iron;

    @ManyToOne
    @JoinColumn(name = "a_id")
    private Account account;


    //constructors
    public Food() {
        super();
    }

    public Food(int id, String name, int calories, int protein, int carbs,
                int fat, int fiber, int sugar, int cholesterol, int sodium,
                int potassium, int vitaminA, int vitaminC, int calcium, int iron) {
        this.id = id;
        this.name = name;
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.fiber = fiber;
        this.sugar = sugar;
        this.cholesterol = cholesterol;
        this.sodium = sodium;
        this.potassium = potassium;
        this.vitaminA = vitaminA;
        this.vitaminC = vitaminC;
        this.calcium = calcium;
        this.iron = iron;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCholesterol() {
        return cholesterol;
    }

    public void setCholesterol(int cholesterol) {
        this.cholesterol = cholesterol;
    }

    public int getSugar() {
        return sugar;
    }

    public void setSugar(int sugar) {
        this.sugar = sugar;
    }

    public int getFiber() {
        return fiber;
    }

    public void setFiber(int fiber) {
        this.fiber = fiber;
    }

    public int getFat() {
        return fat;
    }

    public void setFat(int fat) {
        this.fat = fat;
    }

    public int getCarbs() {
        return carbs;
    }

    public void setCarbs(int carbs) {
        this.carbs = carbs;
    }

    public int getProtein() {
        return protein;
    }

    public void setProtein(int protein) {
        this.protein = protein;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public int getSodium() {
        return sodium;
    }

    public void setSodium(int sodium) {
        this.sodium = sodium;
    }

    public int getPotassium() {
        return potassium;
    }

    public void setPotassium(int potassium) {
        this.potassium = potassium;
    }

    public int getVitaminA() {
        return vitaminA;
    }

    public void setVitaminA(int vitaminA) {
        this.vitaminA = vitaminA;
    }

    public int getVitaminC() {
        return vitaminC;
    }

    public void setVitaminC(int vitaminC) {
        this.vitaminC = vitaminC;
    }

    public int getCalcium() {
        return calcium;
    }

    public void setCalcium(int calcium) {
        this.calcium = calcium;
    }

    public int getIron() {
        return iron;
    }

    public void setIron(int iron) {
        this.iron = iron;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Food food = (Food) o;
        return id == food.id && calories == food.calories && protein == food.protein && carbs == food.carbs && fat == food.fat && fiber == food.fiber && sugar == food.sugar && cholesterol == food.cholesterol && sodium == food.sodium && potassium == food.potassium && vitaminA == food.vitaminA && vitaminC == food.vitaminC && calcium == food.calcium && iron == food.iron && Objects.equals(name, food.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, calories, protein, carbs, fat, fiber, sugar, cholesterol, sodium, potassium, vitaminA, vitaminC, calcium, iron);
    }

    @Override
    public String toString() {
        return "Food{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", calories=" + calories +
                ", protein=" + protein +
                ", carbs=" + carbs +
                ", fat=" + fat +
                ", fiber=" + fiber +
                ", sugar=" + sugar +
                ", cholesterol=" + cholesterol +
                ", sodium=" + sodium +
                ", potassium=" + potassium +
                ", vitaminA=" + vitaminA +
                ", vitaminC=" + vitaminC +
                ", calcium=" + calcium +
                ", iron=" + iron +
                '}';
    }
}