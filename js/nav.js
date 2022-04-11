//Global vars
var pokeload = 0; //numero de pokemons cargados
more_data = true;
var max_pokemon;

//Detecta cuando esta en el bottom de la pagina
window.onscroll = function(ev) {
	setTimeout(function() {
		if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
			const form = document.getElementById('search-form');
			var limit = form['limit'].value;
			if(more_data){
				load_more(limit);
			}
		}	
    },200)
};

async function fetchmaxdata(offset){
	var request ='https://pokeapi.co/api/v2/pokemon/?limit=1';
	await fetch(request)
	.then( function(response){
		response.json()
		.then(pokemon =>{		
			max_pokemon = pokemon.count;
			fetch_data_col(pokemon.count,offset);
						
		})
	});
}

function testConnection() {
	const url = 'https://pokeapi.co/api/v2/pokemon/1';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {}
    xmlhttp.onerror = function() { 
		const loading = document.getElementById('loading');
		const nocon = document.getElementById('nocon');
		loading.style.display = 'none';
		nocon.classList.toggle("hidden");
	}
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function change_more_data(){
	if(more_data){
		more_data = false;
	} else {
		more_data = true;
	}
}

async function fetch_data_col(limit,offset){
	var request ='https://pokeapi.co/api/v2/pokemon/';
	const form = document.getElementById('search-form');
	var limite = form['limit'].value;
	pokeload = pokeload + parseInt(limite);
	request = request.concat('?limit='+limit);
	request = request.concat('&offset='+offset);
	await fetch(request)
	.then( function(response){
		response.json()
		.then(pokemon =>{
			pokedexList(pokemon.results);
						
		})
	});
}

function load_more(limit){
	var i = pokeload+1;
	pokeload = parseInt(pokeload) + parseInt(limit);
	for(i;i <= pokeload;i++){
		var el = document.getElementById(i);
		if (el != null && el.classList.value.includes("hidden")){
			el.classList.toggle("hidden");
		}
	}
}

function findNamecached(name){
	var el = document.getElementsByName(name);
	if (el.length != 0){
		return el[0].id;
	}
	return false;
}  

function findNameRegexCached(name){
	let els = document.getElementsByClassName('poke-card');
	var results = [];
	for(var i=0;i<els.length;i++){
		var pokename = els[i].attributes.name.nodeValue;
		if (pokename.includes(name)){
			var pokeid = findNamecached(pokename);
			results.push(pokeid);
		}
	}
	return results;
}    

function filterbytype(type){
	let els = document.getElementsByClassName('poke-card');
	var results = [];
	for(var i=0;i<els.length;i++){
		var pokename = els[i].attributes.name.nodeValue;
		var tipo1 = 'all';
		var tipo2 = 'all';
		if (els[i].children[1].children[1] != null){
			tipo1 = els[i].children[1].children[1].innerText;
		}
		if(els[i].children[1].children.length > 2 && els[i].children[1].children[2] != null){
			tipo2 = els[i].children[1].children[2].innerText;
		}
		if(type == tipo1 || type == tipo2){
			var pokeid = findNamecached(pokename);
			results.push(pokeid);
		}
	}
	return results;
}

function filterbyTypeCol(array,type){
	var results = [];
	for(var i=0;i<= array.length;i++){
		var tipo1 = 'all';
		var tipo2 = 'all';
		var id = array[i];
		var els = document.getElementById(id);
		if (els != null){
			if (els.children[1].children[1] != null){
				tipo1 = els.children[1].children[1].innerText;
			}
			if(els.children[1].children.length > 2 && els.children[1].children[2] != null){
				tipo2 = els.children[1].children[2].innerText;
			}
			//si es del tipo
			if(type == tipo1 || type == tipo2){
				results.push(id);
			}
		}
	}
	return results;
}

function findIdcached(id){
	var el = document.getElementById(id);
	if (el != null){
		return true;
	}
	return false;
}

function clearcacheExcept(except){
	for (var i=1;i<=max_pokemon;i++){
		var el = document.getElementById(i);
		if (i == except){
			//si esta hidden mostrar
			if (el.classList.value.includes('hidden')){
				el.classList.toggle("hidden");
			}
			continue;
		}
		if (el != null){
			//si esta visible lo ocukta
			if(!el.classList.value.includes("hidden")){
				el.classList.toggle("hidden");
			}
		}
	}
	pokeload = except;
}

function clearcacheExceptCol(except){
	for (var i=1;i<=max_pokemon;i++){
		var el = document.getElementById(i);
		if (except.includes(i.toString())){
			//si esta oculto lo muesta
			if (el.classList.value.includes('hidden')){
				el.classList.toggle("hidden");
				continue;
			}
		}
		if (el != null){
			//sino esta en la lista lo oculta
			if (!except.includes(i.toString())){
				if(!el.classList.value.includes("hidden")){
					el.classList.toggle("hidden");
				}
			}
		}
	}
	pokeload = except;
}

function pokesubmit(){
	more_data = true;
	const form = document.getElementById('search-form');
	var id = form['poke-id'].value;
	var name = form['poke-name'].value;
	var orden = form['poke-ord'].value;
	var type = form['opt-pokemon-type'].value;
	var limit = form['limit'].value;
	//Busqueda por ID
	if (id.length != 0){
		clearcacheExcept(id);
		more_data = false;
	//Busqueda por nombre
	} else if (name.length != 0){
		var nameid = findNamecached(name)
		//si el nombre coincide exactamente
		if (nameid){
			clearcacheExcept(nameid);
		} else {
			//busca por regex 
			var results = findNameRegexCached(name);
			clearcacheExceptCol(results);
		}		
		more_data = false;
		//filtrado por nombre+ tipo
		if (type != "all"){
			var results2 = filterbyTypeCol(results,type);
			clearcacheExceptCol(results2);
		}
	} else if (type != "all"){
		var results = filterbytype(type);
		clearcacheExceptCol(results);
	}
	searchmenu();
	reorder(orden);
}	


function resetScreen(){
	const form = document.getElementById('search-form');
	var limit = 20; //default value 
	for(var i=1;i <= max_pokemon;i++){
		var el = document.getElementById(i.toString());
		if (i < limit){
			if(el != null){
				if(el.classList.value.includes("hidden")){
					el.classList.toggle("hidden");
				}
			}
		} else {
			if (el != null){
				if(!el.classList.value.includes("hidden")){
					el.classList.toggle("hidden");
				}
			}
		}
	}
	pokeload = limit-1; 
	more_data = true;
	searchmenu();
}

//Ocultar/Visualizar nav
function searchmenu() {
	document.getElementById('search-opts').classList.toggle('show-search');
	//change_more_data();
}

//Lista de Tipos pokemon
function getPokeTypeOpts(){
	fetch('https://pokeapi.co/api/v2/type/')
	.then( function(response){
		response.json()
		.then(pokemon =>{			
			pokeType(pokemon.results)
		})
	});
}
		
const pokeType = tipos => {
	Object.keys(tipos).forEach(p => {
		getPokeType(tipos[p].name);
	})
};
						
function getPokeType(tipo){
	var option = document.createElement("option")
	option.setAttribute('value',tipo)
	option.appendChild(document.createTextNode(tipo))
	selection = document.getElementById("opt-pokemon-type");
	selection.appendChild(option)
	//selection.parentNode.insertBefore(card, selection); 
}

