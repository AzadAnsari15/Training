let example1 = [5, 7, 6];

example1.push(8, 9, 10);
example1.pop();

example1[0] = 1;

example1.forEach((element) => {
    console.log(element)
});

console.log(example1)


// Challenge - Manage Inventory

/*
    1. Your company is launching 3 new products: toilet paper, bottled water, and sanitizer. Store them in a list.
    2. Turns out there was a mistake and toilet paper was actually paper towels. Make the appropriate update.
    3. Sanitizer sells out. Remove it from the list.
    4. Business is so good the company launches a new product: Bleach. Add it to the list.
    
    Note: After creating the initial array do not just create a brand new array. Modify it accordingly.
*/

const products = ["toilet paper", "bottled water", "sanitizer"];
products[0] = "paper towels";
products.pop();
products.push("bleach");

console.log(products)