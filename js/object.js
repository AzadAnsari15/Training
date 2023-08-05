let example1 = {
    firstName: 'Dylan',
    lastName: 'Israel',
    address: {
        city: 'Austin',
        state: 'Texas'
    },
    age: 30,
    cats: ['Milo', 'Tito', 'Achieles']
};

example1.age = 31;

console.log(Object.keys(example1));//values

console.log(example1.hasOwnProperty('firstName2'));






const user = {
    firstName: 'Dylan',
    lastName: 'Israel'
};

user['address'] = {
    city: 'Tampa',
    state: 'Florida'
};

user.hobbies = ['Anime', 'Coding', 'Dating', 'Gaming'];
user.isGoldMember = true;

console.log(user);