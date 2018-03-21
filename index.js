let store = {
  deliveries: [], 
  meals: [], 
  employers: [], 
  customers: []
};

let deliveryId = 0; 

class Delivery {
  constructor(meal = {}, customer = {}){
    this.mealId = meal.id; 
    this.customerId = customer.id; 
    this.id = deliveryId++; 
    store.deliveries.push(this); 
  }
  
  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId; 
    })
  }
  
  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId; 
    })
  }
}

let mealId = 0; 
class Meal {
  constructor(title, price){
    this.title = title; 
    this.price = price; 
    this.id = mealId++; 
    store.meals.push(this); 
  }
  
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id; 
    });
  }
  
  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer(); 
    })
  }
  
  static byPrice(){
    return store.meals.sort((meal1, meal2) => 
      {
        return meal1.price < meal2.price; 
      }); 
  }
}

let employerId = 0; 
class Employer {
  constructor(name){
    this.name = name; 
    this.id = employerId++; 
    store.employers.push(this); 
  }
  
  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id; 
    })
  }
  
  deliveries(){
    let allDeliveries =  this.employees().map(employee => {
      return employee.deliveries; 
    }); 
    
    return allDeliveries.flatten(); 
  }
}

let customerId = 0; 
class Customer{
  constructor(name, employer={}){
    this.name = name; 
    this.id = customerId++; 
    this.employerId = employer.id; 
    store.customers.push(this); 
  }
  
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id; 
    });
  }
  
  meals(){
    return this.deliveries().map( delivery => {
      return delivery.meal(); 
    })
  }
  
  totalSpent(){
    return this.meals().reduce(function(sum, meal){
      return sum + meal.price; 
    }, 0); 
  }
}