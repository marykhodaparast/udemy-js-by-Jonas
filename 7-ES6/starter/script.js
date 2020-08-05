//Lecture: let and const

//ES5
// var name5 = 'Jane Smith';
// var age5 = 23;
// name5 = 'Jane Miller';
// //console.log(name5);
//
// //ES6
// const name6 = 'Jane Smith';
// let age6 = 23;
// //name6 = 'Jane Miller';
// //console.log(name6);
//
// //ES5
// function driversLicence5(passedTest) {
//     if (passedTest) {
//         console.log(firstName);
//         var firstName = 'John';
//         var yearOfBirth = 1990;
//     }
//     console.log(firstName + ' is born on ' + yearOfBirth + ' is now officially allowed to drive a car');
//
// }
//
// driversLicence5(true);
//
// //ES6
// //let and const are not function scoped but they are block-scoped
// function driversLicence6(passedTest) {
//     //console.log(firstName);
//     let firstName;
//     const yearOfBirth = 1990;
//     if (passedTest) {
//         firstName = 'John';
//         //yearOfBirth = 1990;
//     }
//     console.log(firstName + ' is born on ' + yearOfBirth + ' is now officially allowed to drive a car');
//
// }
//
// driversLicence6(true);
//
//
// var i = 23;
// for (var i = 0; i < 5; i++) {
//     console.log(i);
// }
// console.log(i);

//Lecture: blocks and IIFEs
//ES6
// {
//     const a = 1;
//     let b = 2;
//     var c = 3;
//
// }
// //console.log(a+b);
// console.log(c);
// //ES5
// (function () {
//   var c = 3;
// })();
//console.log(c);

//Lecture:Strings
// let firstName = 'john';
// let lastName = 'Smith';
// const yearOfBirth = 1990;
// function calcAge(year) {
//    return 2020 - year;
// }
// //ES5
// console.log('This is ' + firstName + ' ' + lastName + 'He was born in ' + yearOfBirth + '. Today he is ' + calcAge(yearOfBirth) );
// //ES6
// console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)}`)
// const n = `${firstName} ${lastName}`;
// console.log(n.startsWith('J'));
// console.log(n.endsWith('th'));
// console.log(n.includes('oh'));//the middle of string
// console.log(`${firstName} `.repeat(5));

//Lecture: Arrow functions
// const years = [1990, 1965, 1995, 2000];
// //ES5
// var ages5 = years.map(function (el) {
//      return 2020 - el;
// })
// console.log(ages5);
// //ES6
// let ages6 = years.map(el => 2020 - el );
// console.log(ages6);
// ages6 = years.map((el,index) => `Age Element ${index + 1}: ${2020 - el}`);
// console.log(ages6);
// ages6 = years.map((el,index) => {
//     const now = new Date().getFullYear();
//     const age = now - el;
//     return  `Age Element ${index + 1}: ${age}`;
// });
// console.log(ages6);

//Lecture: Arrow functions2
//ES5
// var box5 = {
//     color: 'green',
//     position: 1,
//     clickMe: function () {
//         var self = this;
//         document.querySelector('.green').addEventListener('click', function () {
//             var str = 'This is box number ' + self.position + ' and it is ' + self.color;
//             alert(str);
//         });
//     }
// }
// //box5.clickMe();
// //ES6
// const box6 = {
//     color: 'green',
//     position: 1,
//     clickMe: function () {
//         document.querySelector('.green').addEventListener('click', () => {
//             var str = 'This is box number ' + this.position + ' and it is ' + this.color;
//             alert(str);
//         });
//     }
// }
// //box6.clickMe();
//
// // const box66 = {
// //     color: 'green',
// //     position: 1,
// //     clickMe:  () => {//shares the this keyword from global object
// //         document.querySelector('.green').addEventListener('click',  () => {
// //             var str = 'This is box number ' + this.position + ' and it is ' + this.color;//this.position is undefined because
// //             //we dont have window.position and window.color
// //             alert(str);
// //         });
// //     }
// // }
// // box66.clickMe();
//
// function Person(name) {
//     this.name = name;
// }
//
// //ES5
// Person.prototype.myFriends5 = function (friends) {
//     //var self = this;
//     var arr = friends.map(function (el) {
//         return this.name + ' is friends with ' + el
//     }.bind(this))
//     console.log(arr);
// }
// var friends = ['Bob', 'Jane', 'Mark'];
// new Person('John').myFriends5(friends);
//
// //ES6
// Person.prototype.myFriends6 = function (friends) {
//
//     let arr = friends.map(el => `${this.name} is friends with ${el}`);
//     console.log(arr);
// }
// new Person('Mike').myFriends6(friends);

//Lecture: Destructing

//ES5
// var john = ['John', 26];
// //var name = john[0];
// //var age = john[1];
//
// //ES6
// const [name, year] = ['John', 26];
// console.log(name);
// console.log(year);
//
// const obj = {
//     firstName: 'John',
//     lastName: 'Smith'
// }
// const {firstName, lastName} = obj;
// console.log(firstName);
// console.log(lastName);
//
// const {firstName: a, lastName: b} = obj;
// console.log(a);
// console.log(b);
//
//
// function calcAgeRetirement(year) {
//     const age = new Date().getFullYear() - year;
//     return [age, 65 - age];
// }
// const [ age2, retirement] = calcAgeRetirement(1995);
// console.log(age2);
// console.log(retirement);

//Lecture:Arrays
// const boxes = document.querySelectorAll('.box');
//
// //ES5
//
// var boxesArr5 = Array.prototype.slice.call(boxes);
// boxesArr5.forEach(function (cur) {
//     cur.style.backgroundColor = 'dodgerblue';
// })
//
// //ES6
// const boxesArr6 = Array.from(boxes);
// boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');
//
// //ES5
// /*
// for (var i = 0; i < boxesArr5.length; i++) {
//     if (boxesArr5[i].className === 'box blue') {
//         //continue;
//         break;
//     }
//     boxesArr5[i].textContent = 'I Changed to blue';
// }
//  */
//
// //ES6
// for (const cur of boxesArr6) {
//     if (cur.className.includes('blue')) {
//         continue;
//     }
//     cur.textContent = 'I Changed to blue';
//
// }
//
//
// //ES5
// var ages = [12, 17, 8, 21, 14, 11];
// var full = ages.map(function (cur) {
//     return cur >= 18;
// });
// console.log(full);
// console.log(full.indexOf(true));
// console.log(ages[full.indexOf(true)]);
//
// //ES6
// console.log(ages.findIndex(cur => cur >= 18));
// console.log(ages.find(cur => cur >= 18))

//Lecture: spread operator
// function addFourAges(a, b, c, d) {
//    return a + b + c + d;
// }
// var sum1 = addFourAges(18, 30, 12, 21);
// console.log(sum1);
//
// //ES5
// var ages = [18, 30, 12, 21];
// var sum2 = addFourAges.apply(null,ages);
// console.log(sum2);
//
// //ES6
// const sum3 = addFourAges(...ages);
// console.log(sum3);
//
// const familySmith = ['John', 'Jane', 'Mark'];
// const familyMiller = ['Mary','Bob','Ann'];
// const bigFamily = [...familySmith,'Lilly',...familyMiller];
// console.log(bigFamily);
//
// const h = document.querySelector('h1');
// const boxes = document.querySelectorAll('.box');
// const all = [h,...boxes];
// Array.from(all).forEach(cur => cur.style.color = 'purple')

//Lecture12: Rest Parameters(these are opposite of spread operator)
//ES5
// function isFullAge5() {
//    //console.log(arguments);
//     var argsArr = Array.prototype.slice.call(arguments);
//     argsArr.forEach(function (cur) {
//       //console.log((2020 - cur >= 18))
//     })
// }
// isFullAge5(1990,2012,1987);
// isFullAge5(1990,2012,1987,2019,2013,2014);
//
// //ES6
// function isFullAge6(...years) {
//    years.forEach(cur => console.log(2020 - cur >= 18));
// }
// isFullAge6(1990,2012,1987);

// function isFullAge5(limit) {
//     // console.log(arguments);
//     var argsArr = Array.prototype.slice.call(arguments,1);//position 1
//     //console.log(argsArr);
//     argsArr.forEach(function (cur) {
//         console.log((2020 - cur >= limit))
//     })
// }
// //isFullAge5(16,1990,2012,1987);
// //isFullAge5(1990,2012,1987,2019,2013,2014);
//
// //ES6
// function isFullAge6(limit,...years) {
//     years.forEach(cur => console.log(2020 - cur >= limit));
// }
// isFullAge6(16,1990,2012,1987);

//Lecture13: Default Parameters
/*
//ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'american': nationality = nationality;
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}
*/
//ES6
// function SmithPerson(firstName, yearOfBirth, lastName='Smith',nationality='american' ) {
//     this.firstName = firstName;
//     this.yearOfBirth = yearOfBirth;
//     this.lastName = lastName;
//     this.nationality = nationality;
// }
// var john = new SmithPerson('John', 1990);
// var Emily = new SmithPerson('Emily',1983,'Diaz','Spanish');

//Lecture14: Maps is a new data structure in ES6 in map objects we can have also booleans and functions and .... as keys
// const question = new Map();
// question.set('question', 'What is the official name of the latest major javascript version?');
// question.set(1, 'ES5');
// question.set(2, 'ES6');
// question.set(3, 'ES2015');
// question.set(4, 'ES7');
// question.set('correct', 3);
// question.set(true, 'Correct Answer!');
// question.set(false, 'Wrong! please try again!');
// console.log(question.get('question'));
// //console.log(question.size);//8
// if (question.has(4)) {
//     //question.delete(4);
//   //  console.log('Answer 4 is here');
// }
// //question.clear();
// //maps get the foreach methods like arrays
// //question.forEach((value, key) => console.log(`This is ${key} and it set to ${value}`));
// for (let [key, value] of question.entries()) {
//     //console.log(`This is ${key} and it set to ${value}`);
//     if (typeof (key) === 'number') {
//         console.log(`Answer ${key}:${value}`);
//     }
// }
// const ans = parseInt(prompt('Write the correct answer'));
// console.log(question.get(ans === question.get('correct')));
// //maps are better than objects for 3 reasons
// //1. anything like booleans,etc... can be key in maps
// //2. maps are iterable and it makes it easy to loop through them
// //3. getting the size of a map is really easy with size property
//Lecture15: one of the big additions to ES6 => classes
//ES5
// var Person5 = function (name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }
// Person5.prototype.calculateAge = function () {
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
// }
// var john5 = new Person5('John', 1990, 'painter');
//
// //ES6
// //we can not add properties to classes not methods
// class Person6 {
//     constructor(name, yearOfBirth, job) {
//         this.name = name;
//         this.yearOfBirth = yearOfBirth;
//         this.job = job;
//     }
//     calculateAge(){
//         var age = new Date().getFullYear() - this.yearOfBirth;
//         console.log(age);
//     }
//     static greeting(){
//         console.log('Hey there!');
//     }
// }
// const john6 = new Person6('John',1990,'painter');
// Person6.greeting();

//Lecture16: Classes and subclasses
// var Person5 = function (name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }
// Person5.prototype.calculateAge = function () {
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
// }
// var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
//     Person5.call(this, name, yearOfBirth, job);
//     this.olympicGames = olympicGames;
//     this.medals = medals;
// }
//
// Athlete5.prototype = Object.create(Person5.prototype);
// Athlete5.prototype.wonMedal = function () {
//     this.medals++;
//     console.log(this.medals);
// }
// var john5 = new Person5('John', 1990, 'painter');
// var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 4);
// johnAthlete5.calculateAge();
// johnAthlete5.wonMedal();
// //john5.wonMedal();
//
// //ES6
// class Person6 {
//     constructor(name, yearOfBirth, job) {
//         this.name = name;
//         this.yearOfBirth = yearOfBirth;
//         this.job = job;
//     }
//
//     calculateAge() {
//         var age = new Date().getFullYear() - this.yearOfBirth;
//         console.log(age);
//     }
//
// }
//
// class Athlete6 extends Person6 {
//     constructor(name, yearOfBirth, job, olympicGames, medals) {
//         super(name, yearOfBirth, job);
//         this.olympicGames = olympicGames;
//         this.medals = medals;
//     }
//     wonMedal(){
//         this.medals++;
//         console.log(this.medals);
//     }
// }
// const johnAthlete6 = new Athlete6('John',1990,'swimmer',3,4);
// johnAthlete6.calculateAge();
// johnAthlete6.wonMedal();


/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/
class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element {
    constructor(name, buildYear, numTrees, parkArea) {
        super(name, buildYear);
        this.numTrees = numTrees;
        this.parkArea = parkArea;
    }

    TreeDensity() {
        return (this.numTrees / this.parkArea);
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size = "normal") {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

}

const parks = [new Park('roz', 1980, 1000, 100),
    new Park('maryam', 1995, 1900, 300),
    new Park('mina', 1890, 450, 100)];
const streets = [
    new Street('street1',2000,240),
    new Street('street2',1970,450,"tiny"),
    new Street('street3',1950,500,'big'),
    new Street('street4',1976,300,'huge')
]

function reportParks(p) {
    console.log('-------Park Report-------');
    p.forEach((el, index) => console.log(`Tree density of park ${index + 1} is ${el.TreeDensity()}`));
    console.log('-------------------------');
    let ages = [];
    let sum = 0;
    let element = 0;
    const now = new Date().getFullYear();
    p.forEach(el => {
        ages.push(now - el.buildYear)
        sum += now - el.buildYear;
    });
    console.log(`Average age of each park is ${sum / 3}`);
    console.log('-------------------------');
    p.forEach( el => {
        if ( el.numTrees > 1000){
            element = el;
        }
    })
    console.log(`The name of the park that has more than 1000 trees is ${element.name}`);

}
function reportStreets(s) {
    console.log('-------Street Report-------');
    let sum = 0;
    s.forEach(el => sum += el.length);
    console.log(`The streets have total length of ${sum} and average length of ${sum/4}`);
    console.log('-------------------------');
    s.forEach(el => console.log(`${el.name} built in ${el.buildYear} is a ${el.size} street`));
}

reportParks(parks);
reportStreets(streets)




























