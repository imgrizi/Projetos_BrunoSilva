let firstQuote = "First String";
console.log(firstQuote);
let secondQuote = "Second Quote";
console.log(secondQuote);


let firstName = "Bruno";
let secondName = "Silva";
let fullName = firstName + " " +secondName;
console.log(fullName);

let greeting = "Welcome";
greeting += ", Bruno";
console.log(greeting);

let goodbye = "Goodbye,";
goodbye = `${goodbye} ${firstName}`;
console.log(goodbye);

console.log(greeting[0]);
console.log(greeting[greeting.length - 1]);
let firstTwo = greeting[0] + greeting[1];
console.log(firstTwo);

let poem = "Roses are red,\nViolets are blue,\nIf Goku goes super saiyan,\nIm breaking the limits too";
console.log(poem);
let statement = "Even further \"BEYOND!\"";
console.log(statement);

const song = "5150";
const score = 9.5;
const highestScore = 10;
const output = `One of my favorite songs is "${song}". I rated it ${
  (score / highestScore) * 100
}%.`;
console.log(output); 

let sentence = "I\'m awesome!";
let position = sentence.indexOf("awesome!");
console.log(position); 
