function* genFun(){
    yield 'First Pause'
    console.log('Manisha')
    yield 'Second Pause'
    console.log('Nilesh')
    yield 'Third Pause'
    console.log('Dipesh')
  }
  const obj=genFun() 
  
//   obj.next() 
//   Object { value: "First Pause", done: false }
  
//   obj.next() 
//   Manisha
//   Object { value: "Second Pause", done: false }
  
//   obj.next() 
//   Nilesh
//   Object { value: "Third Pause", done: false }
  
//   obj.next() 
//   Dipesh
//   Object { value: undefined, done: true }