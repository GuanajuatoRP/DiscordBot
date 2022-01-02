let foo_objects = [1,2,3,4,5]
let foo_object = 3
console.log(foo_objects)
foo_objects = foo_objects.filter(obj => obj !== foo_object);
console.log(foo_objects)