package com.jkof86.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "accounts")
public class Account {

    @Id //makes this a Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "a_id", updatable = false)
    private int id;

    private String fname;

    private String lname;

    @Column(unique = true)
    private String email;

    private String pw;

    private int age;

    private int height; //in cm

    private int weight; //in lbs

    //daily calorie and macronutrient goals
    private int calorieLimit;

    private float proteinPercent;

    private float carbPercent;

    private float fatPercent;

    @OneToMany(mappedBy = "account")
    private List<Food> foodList;

    public Account() {
        super();
    }

    public Account(String fname, String lname, String email, String pw, int age, int height,
                   int weight, int calorieLimit, float carbPercent, float proteinPercent,
                   float fatPercent, int id) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.pw = pw;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.calorieLimit = calorieLimit;
        this.carbPercent = carbPercent;
        this.proteinPercent = proteinPercent;
        this.fatPercent = fatPercent;
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;

    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getCalorieLimit() {
        return calorieLimit;
    }

    public void setCalorieLimit(int calorieLimit) {
        this.calorieLimit = calorieLimit;
    }

    public float getProteinPercent() {
        return proteinPercent;
    }

    public void setProteinPercent(float proteinPercent) {
        this.proteinPercent = proteinPercent;
    }

    public float getCarbPercent() {
        return carbPercent;
    }

    public void setCarbPercent(float carbPercent) {
        this.carbPercent = carbPercent;
    }

    public float getFatPercent() {
        return fatPercent;
    }

    public void setFatPercent(float fatPercent) {
        this.fatPercent = fatPercent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return id == account.id && age == account.age && height == account.height
                && weight == account.weight && calorieLimit == account.calorieLimit
                && Float.compare(proteinPercent, account.proteinPercent) == 0
                && Float.compare(carbPercent, account.carbPercent) == 0
                && Float.compare(fatPercent, account.fatPercent) == 0
                && Objects.equals(fname, account.fname) && Objects.equals(lname, account.lname)
                && Objects.equals(email, account.email)  && Objects.equals(pw, account.pw);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fname, lname, email,  pw, age, height, weight, calorieLimit,
                proteinPercent, carbPercent, fatPercent);
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", fname='" + fname + '\'' +
                ", lname='" + lname + '\'' +
                ", email='" + email + '\'' +
                ", pw='" + pw + '\'' +
                ", age=" + age +
                ", height=" + height +
                ", weight=" + weight +
                ", calorieLimit=" + calorieLimit +
                ", proteinPercent=" + proteinPercent +
                ", carbPercent=" + carbPercent +
                ", fatPercent=" + fatPercent +
                '}';
    }

    //    private void calculateCalories() {
//
//        // prompt user to enter the total daily calorie limit
//        System.out.print("Enter the total daily calorie limit: ");
//        Scanner scanner = new Scanner(System.in);
//
//        calorieLimit = scanner.nextInt();
//
//        // prompt user to enter three macronutrient percentage values
//        System.out.print("Enter the percentage of protein: ");
//        int proteinPercentage = scanner.nextInt();
//        System.out.print("Enter the percentage of carbohydrates: ");
//        int carbPercentage = scanner.nextInt();
//        System.out.print("Enter the percentage of fat: ");
//        int fatPercentage = scanner.nextInt();
//
//        if(proteinPercentage + carbPercentage + fatPercentage == 100) {
//            // calculate the macronutrient values (in grams) given the  entered calorieLimit
//
//            //protein has 4 calories per gram
//            //carbohydrates has 4 calories per gram
//            //fat has 9 calories per gram
//            protein = (int) (calorieLimit * proteinPercentage / 100.0 / 4.0);
//            carbs = (int) (calorieLimit * carbPercentage / 100.0 / 4.0);
//            fat = (int) (calorieLimit * fatPercentage / 100.0 / 9.0);
//
//            System.out.println("-----------------------");
//
//            // print the macronutrient values (in grams)
//            System.out.println("Protein: " + protein + " grams");
//            System.out.println("Carbohydrates: " + carbs + " grams");
//            System.out.println("Fat: " + fat + " grams");
//        }
//        else {
//            System.out.println("-----------------------");
//            System.out.println("Error: Macronutrient % not equal to 100");
//            System.out.println("Creating person object with default goals...");
//        }
//    }
}
