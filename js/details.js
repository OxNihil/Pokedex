
function details() {
    var currentLocation = window.location;
    var split = String(currentLocation).split("?")[1];
    var url = 'https://pokeapi.co/api/v2/pokemon/' + split
    fetch(url)
        .then(function (response) {
            response.json()
                .then(function (pokemon) {
                    var content = document.createElement("div");
                    //Title
                    var title = document.createElement("div");
                    var name = document.createElement("span");
                    title.classList.add("detailed-card-title");
                    name.appendChild(document.createTextNode(pokemon.name + "  (#" + pokemon.id + ")"));
                    title.appendChild(name);

                    //Imagen
                    var img_container = document.createElement("div");
                    var img = document.createElement("img");
                    var img2 = document.createElement("img");
                    img.setAttribute("src", pokemon.sprites.front_default);
                    img2.setAttribute("src", pokemon.sprites.back_default);
                    img_container.appendChild(img);
                    img_container.appendChild(img2);

                    //Tipos
                    var tablet = document.createElement("table");
                    tablet.classList.add("detailed-table");
                    var tr = tablet.insertRow();
                    for (var i = 0; i < pokemon.types.length; i++) {
                        var td = tr.insertCell();
                        td.appendChild(document.createTextNode(pokemon.types[i].type.name));
                        td.style.backgroundColor = getTypeColor(pokemon.types[i].type.name);
                        td.style.color = 'white';
                        if (pokemon.types.length == 2) { td.style.width = '50%'; }
                    }

                    //Habilidades
                    var habilidadcontent = document.createElement("div");
                    var habilidad = document.createElement("span");
                    habilidadcontent.classList.add("detailed-card-title");
                    habilidad.appendChild(document.createTextNode("Abilities"));
                    habilidadcontent.appendChild(habilidad);

                    //Tabla de habilidades
                    var tablea = document.createElement("table");
                    tablea.classList.add("detailed-table");
                    var tr = tablea.insertRow();
                    for (var i = 0; i < pokemon.abilities.length; i++) {

                        var td = tr.insertCell();
                        td.appendChild(document.createTextNode(pokemon.abilities[i].ability.name));
                        if (i % 2) var tr = tablea.insertRow();
                    }

                    //Tabla pesos
                    var tablep = document.createElement("table");
                    tablep.classList.add("detailed-table");
                    var tr = tablep.insertRow();
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode("Height"));
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode("Weight"));
                    var tr = tablep.insertRow();
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode(pokemon.height));
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode(pokemon.weight));
                    //var td = tr.insertCell();

                    //Stat title
                    var stattitle = document.createElement("div");
                    var stat_span = document.createElement("span");
                    stattitle.classList.add("detailed-card-title");
                    stat_span.appendChild(document.createTextNode("Base stats"));
                    stattitle.appendChild(stat_span);

                    //Tabla stats
                    var stats = document.createElement("div");
                    var table = document.createElement("table");
                    table.classList.add("detailed-table");
                    var tr = table.insertRow();

                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode("HP"));
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode("ATK"));
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode("DEF"));

                    var tr = table.insertRow();
                    tr.style.borderBottom = '1px solid black';
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode(pokemon.stats[0].base_stat));
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode(pokemon.stats[1].base_stat));
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode(pokemon.stats[2].base_stat));

                    var tr = table.insertRow();
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode("S.ATK"));
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode("S.DEF"));
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode("SPEED"));

                    var tr = table.insertRow();
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode(pokemon.stats[3].base_stat));
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode(pokemon.stats[4].base_stat));
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode(pokemon.stats[5].base_stat));
                    stats.appendChild(table);

                    //Movimientos iniciales
                    var movestitle = document.createElement("div");
                    var move_span = document.createElement("span");
                    movestitle.classList.add("detailed-card-title");
                    move_span.appendChild(document.createTextNode("Base moves"));
                    movestitle.appendChild(move_span);

                    //Tabla movimientos
                    var moves = document.createElement("div");
                    var tablem = document.createElement("table");
                    tablem.classList.add("detailed-table");
                    var tr = tablem.insertRow();
                    for (var i = 0; i < 4; i++) {
                        var td = tr.insertCell();
                        td.appendChild(document.createTextNode(pokemon.moves[i].move.name));
                        if (i % 2) var tr = tablem.insertRow();
                    }


                    content.appendChild(title);
                    content.appendChild(tablet);
                    content.appendChild(img_container);
                    content.appendChild(tablep);
                    content.appendChild(stattitle);
                    content.appendChild(stats);
                    content.appendChild(habilidadcontent);
                    content.appendChild(tablea);
                    content.appendChild(movestitle);
                    content.appendChild(tablem);
                    var currentDiv = document.getElementById("poke-detailed-content");
                    currentDiv.parentNode.insertBefore(content, currentDiv);
                })
        })
}