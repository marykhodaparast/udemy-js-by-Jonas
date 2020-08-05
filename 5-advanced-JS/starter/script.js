//Function Constructor
// var john = {
//     name: 'john',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };
// var Person = function (name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
//     // this.calculateAge = function () {
//     //    console.log(2020 - this.yearOfBirth);
//     // }
// }
// Person.prototype.calculateAge = function () {
//     console.log(2020 - this.yearOfBirth);
// }
// Person.prototype.lastName = 'Smith';
// var john = new Person('john', 1990, 'teacher');
// var mary = new Person('mary',1995,'programmer');
// var mark = new Person('mark', 1992,'designer');
// john.calculateAge();
// mary.calculateAge();
// mark.calculateAge();
// console.log(john.lastName,mary.lastName,mark.lastName);


//Object.create

var personProto = {
    calculateAge: function () {
        console.log(2020 - this.yearOfBirth);
    }
};
var john = Object.create(personProto);
john.name = 'john';
john.yearOfBirth = 1990;
john.job = 'teacher';
var jane = Object.create(personProto, {
    name: {value: 'Jane'},
    yearOfBirth: {value: 1990},
    job: {value: 'senior web developer'}
});