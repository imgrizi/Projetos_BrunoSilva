//Object
let pet = {
    name: "Isko",
    age: 8,
    type: "cat"
};
console.log(typeof pet);
console.log(pet);

//Symbol
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2);// Compare

let petId = Symbol("petId");
let petId2 = Symbol("petId");
pet[petId] =101;
pet[petId2] =50;
console.log(pet[petId]);
console.log(pet[petId2]);
console.log(Object.getOwnPropertySymbols(pet));