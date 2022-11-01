/*Function to fetch API*/
const callApi = async (url) => {
  const response = await fetch(url);
  const payload = await response.json();
  return payload;
};

const main = async () => {
  //Call Api
  const { results } = await callApi(
    "https://pokeapi.co/api/v2/pokemon?limit=30"
  );

  //Create an array of promises
  const result = results.map((pokemon) => {
    return callApi(pokemon.url);
  });

  //Get all pokemon info
  const pokemonArray = await Promise.all(result);

  //Filter only the types Normal
  const list = pokemonArray.filter((pokemon) =>
    pokemon.types.some(({ type }) => type.name === "normal")
  );

  return list;
};

main().then(res => console.log(res));
