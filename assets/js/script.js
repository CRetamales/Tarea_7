//Objeto de tipo clase Character
class Character {
    constructor(name, species, image) {
        this.name = name;
        this.species = species;
        this.image = image;
    }

    //Método get
    get getCharacter() {
        let array = [this.name, this.species, this.image];
        return array;
    }

    //Método get para el nombre
    get getName() {
        return this.name;
    }

    //Método get para la especie
    get getSpecies() {
        return this.species;
    }

    //Método get para la imagen
    get getImage() {
        return this.image;
    }

    //Método set para el nombre
    set setName(name) {
        this.name = name;
    }

    //Método set para la especie
    set setSpecies(species) {
        this.species = species;
    }

    //Método set para la imagen
    set setImage(image) {
        this.image = image;
    }

    //Método para mostrar los datos del personaje, es decir, los inyecta el DOM de las cards
    show(){
        //Se obtiene el elemento del DOM
        let cards = document.getElementById("cards");

        //Estructura de la card
        cards.innerHTML += `
        <li class="cards__item">
            <div class="card">
                        <img class = "card__texture-picture" src = "./assets/img/texture_img.png" alt = "texture">
                        <img class = "card__picture" src = "${this.image}" alt = "picture">
                        <div class = "card__name-background"></div>
                        <h2 class = "card__name">${this.name}</h2>
                        <div class = "card__species-background"></div>
                        <p class = "card__species">${this.species}</p>
            </div>
        </li>
        `;
    }


}

//URL de la API
let url = "https://rickandmortyapi.com/api/character/";


//Funcion que se encarga de realizar la peticion a la API 
//Entrada: void
//Salida: void
async function getCharacters() {
    try{
        let response  = await axios.get(url);
        let data = response.data.results;
        //Si la respuesta es correcta, se recorre el arreglo de objetos
        data.map((character) => {
            //Se crea un objeto de tipo clase Character
            let characterObj = new Character(character.name, character.species, character.image);
            //Se inyecta el objeto en el DOM;
            characterObj.show();

        });

    }catch(error){
        console.log(error);
        alert("Error al realizar la petición");
    }
}

//Llamada a la funcion
//getCharacters();

//Funcion que se encarga de realizar la peticion a la API
//Entrada: cantidad de personajes a mostrar por cantidad de paginas
//Salida: void
async function getCharactersByQuantity(quantity) {
    if (quantity <= 0) {
        quantity = 1;
    } else if (quantity > 42) {
        quantity = 42;
    }
    try{
        let response  = await axios.get(url);
        //Si no hay problemas con la respuesta
        //se puede efectuar la peticion
        for (let i = 0; i < quantity; i++) {
            //Se realiza la peticion
            response  = await axios.get(url);
            //Se obtiene la data
            let data = response.data.results;
            //Se recorre el arreglo de objetos
            data.map((character) => {
                //Se crea un objeto de tipo clase Character
                let characterObj = new Character(character.name, character.species, character.image);
                //Se inyecta el objeto en el DOM;
                characterObj.show();
            });
            url = response.data.info.next;

        }
    }catch(error){
        console.log(error);
        alert("Error al realizar la petición");
    }
}

//Llamada a la funcion
getCharactersByQuantity(1);