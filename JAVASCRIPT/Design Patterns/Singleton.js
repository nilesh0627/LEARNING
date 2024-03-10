// Declared dummyInstance variable and it's value will be assigned while first time object dummyInstance is created from
// this class. Next time if it is called, it will throw error as dummyInstance already has some value.


// Singletons are classes which can be instantiated once, and can be accessed globally. 
// This single instance can be shared throughout our application, which makes Singletons great for 
// managing global state in an application.

let dummyInstance;
let counter=0

class Counter {
  constructor(){
    if(dummyInstance)
      throw new Error('Counter has been already instantiated');
      dummyInstance=this
  }
  
  getInstance(){
    return this;
  }
  
  increment(){
    return counter++;
  }
  
  decrement(){
    return counter--;
  }
  
  getCounter(){
    return counter;
  }
}

const counter1= new Counter()

const counter2= new Counter()
