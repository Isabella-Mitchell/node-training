const numbers = [1, 2, 3, 4, 5];

const names = ["Joanne", "Sophia", "Shaquilla", "Fola", "Brad"];

const [, , third] = names;

console.log(third);

const { name } = { name: "Fiona", timeAtBeeb: "8 months" };

console.log(name);

const {
  address: { postcode },
} = { name: "Kevin", address: { postcode: "BT33" } };

console.log(postcode);
{
  const [, { name: nameOfSecondPerson }] = [
    { name: "Fiona", timeAtBeeb: "8 months" },
    { name: "Brad", timeAtBeeb: "8 months" },
  ];

  // const [name, setName] = React.useState()
  console.log(nameOfSecondPerson);
}
