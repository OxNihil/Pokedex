const pokedexList = pokedex => {
	Object.keys(pokedex).forEach(p => {
		getPokeCardSingle(pokedex[p].url)
	})
	const loading  = document.getElementById('loading');
		if (!loading.classList.value.includes('hidden')){
			loading.classList.toggle("hidden");
	}
	const form = document.getElementById('search-form');
	var orden = form['poke-ord'].value;
	reorder(orden);
};	

async function reorder(orden){
	let container = document.getElementById('poke-container');
	let els = document.getElementsByClassName('poke-card');
	var firstelem = document.createElement('div');
	tmpcontainer = document.createElement('div');
	tmpcontainer.appendChild(firstelem);
	tmpcontainer.classList.add('pokecard-container');
	tmpcontainer.id = 'poke-container';
	firstelem.id = 'firts-pokecard';
	if (orden == "ASC"){
		for(var i=0;i< max_pokemon;i++){
			var el = document.getElementById(i.toString());
			if(el != null){
				tmpcontainer.appendChild(el);
			}
		}
		container.parentNode.replaceChild(tmpcontainer, container);
	} else {
		//
		for(var i=max_pokemon;i > 0;i--){
			var el = document.getElementById(i.toString());
			if(el != null){
				tmpcontainer.appendChild(el);
			}
		}
		container.parentNode.replaceChild(tmpcontainer, container);
	}
}

async function getPokeCardSingle(url){
	await fetch(url)
	.then( function(response){
		response.json()
		.then(function(pokemon){
			//CARD
			var card = document.createElement("div");
			card.id = pokemon.id;
			card.setAttribute('name',pokemon.name);
			card.classList.add("poke-card");
			card.setAttribute('tabindex','0');
			//Ocultar si mayot que pokeload
			if (pokemon.id > pokeload){
				card.classList.toggle("hidden");
			}
			var detalles = 'location.replace("detailed.html?'+pokemon.name+'")'
			card.setAttribute('onclick',detalles);
			card.setAttribute('onkeypress',detalles);
			//Pokemon-name
			var name = document.createElement("span");
			var background = document.createElement("div");
			var title = document.createElement("div");
			background.classList.add("poke-card-background");
			title.classList.add("poke-card-title");
			name.appendChild(document.createTextNode(pokemon.name));
			title.appendChild(name);
			background.appendChild(title);
			//imagen
			var img = document.createElement("img");
			img.setAttribute("src",pokemon.sprites.front_default); 
			img.setAttribute("alt",pokemon.name);
			
			background.appendChild(img);
			card.appendChild(background);
			//content and stats
			var stats = document.createElement("div");
			var content = document.createElement("div");
			content.classList.add("poke-card-content");
			stats.classList.add("poke-card-stats");
			//Tabla
			var table = document.createElement("table");
			var tr = table.insertRow();
			var td = tr.insertCell();
			td.appendChild(document.createTextNode("HP"));
			var td = tr.insertCell();
			td.appendChild(document.createTextNode("ATK"));
			var td = tr.insertCell();
			td.appendChild(document.createTextNode("DEF"));
			var td = tr.insertCell();
			td.appendChild(document.createTextNode("SATK"));
			var tr = table.insertRow();
			var td = tr.insertCell();
			if (pokemon.stats[0] != null){
				td.appendChild(document.createTextNode(pokemon.stats[0].base_stat));}
			var td = tr.insertCell();
			if (pokemon.stats[1] != null){
				td.appendChild(document.createTextNode(pokemon.stats[1].base_stat));}
			var td = tr.insertCell();
			if (pokemon.stats[2] != null){
				td.appendChild(document.createTextNode(pokemon.stats[2].base_stat));}
			var td = tr.insertCell();
			if (pokemon.stats[3] != null){
			td.appendChild(document.createTextNode(pokemon.stats[3].base_stat));}
			stats.appendChild(table);
			content.appendChild(stats);
			//Tipo
			var poketype = document.createElement("div")
			var poketype2 = document.createElement("div")
			poketype.classList.add("poke-card-type");
			poketype2.classList.add("poke-card-type");
			poketype2.style.float="right";
			poketype2.style.right="20px";
			poketype2.style.top="-110px";
			//Tipo pokemon
			if (pokemon.types[0] != null){
				poketype.appendChild(document.createTextNode(pokemon.types[0].type.name));
				poketype.style.backgroundColor = getTypeColor(pokemon.types[0].type.name);
				content.appendChild(poketype);
			}
			if (pokemon.types.length > 1 && pokemon.types[1] != null){
				poketype2.appendChild(document.createTextNode(pokemon.types[1].type.name));
				poketype2.style.backgroundColor = getTypeColor(pokemon.types[1].type.name);
				content.appendChild(poketype2);
			}
			card.appendChild(content);
			var currentDiv = document.getElementById("firts-pokecard"); 
			currentDiv.parentNode.insertBefore(card, currentDiv); 
			})
		})
};