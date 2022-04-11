function getTypeColor(tipo){
	switch(tipo) {
		case 'normal':
			return '#A8A878';
		break;
		case 'bug':
			return '#A8B820';
		break;
		case 'flying':
			return '#A890F0';
		break;
		case 'electric':
			return '#F8D030';
		break;
		case 'poison':
			return '#A040A0';
		break;
		case 'grass':
			return '#78C850';
		break;
		case 'fire':
			return "#F08030";
		break;
		case 'water':
			return "#6890F0";
		break;
		case 'shadow':
			return 'black';
		break;
		case 'fighting':
			return '#C03028';
		break;
		case 'ground':
			return '#E0C068';
		break;
		case 'fairy':
			return '#EE99AC';
		break;
		case 'psychic':
			return '#F85888';
		break;
		case 'rock':
			return '#B8A038';
		break;
		case 'ice':
			return '#98D8D8';
		break;
		case 'ghost':
			return '#705898';
		break;
		case 'dragon':
			return '#7038F8';
		break;
		case 'steel':
			return '#B8B8D0';
		break;
		case 'dark':
			return '#705848';
		break;
		default:
			return "#68A090";
	}
}