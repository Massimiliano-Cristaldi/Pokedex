export function strTrim (string){
    string = string.charAt(0).toUpperCase() + string.replace(/-/g, " ").slice(1);
    return string;
}

export function strUntrim (string){
    string = string?.replace(" ", "-").toLowerCase();
    return string;
}

export function statColor (statName){
    switch (statName) {
        case "hp":
            return "#279611";
        case "attack":
            return "#e8c931";
        case "defense":
            return "#d47120";
        case "special-attack":
            return "#3264e3";
        case "special-defense":
            return "#791ba1";
        case "speed":
            return "#d43bc9";
        default: "N/A"
            break;
    }
}

export function shortStat (statName){
    switch (statName) {
        case "hp":
            return "Hp";
        case "attack":
            return "Atk";
        case "defense":
            return "Def";
        case "special-attack":
            return "Sp. atk";
        case "special-defense":
            return "Sp. def";
        case "speed":
            return "Speed";
        default: "N/A"
            break;
    }
}

export function typeStyle (type){
    switch (type) {
        case "bug":
            return {
                backgroundColor: "#20733e",
                borderColor: "#0f361e",
            };
        case "dark":
            return {
                backgroundColor: "#636363",
                borderColor: "#141414",
            };
        case "dragon":
            return {
                backgroundColor: "#25bbcc",
                borderColor: "#147985",
            };
        case "electric":
            return {
                backgroundColor: "#faff70",
                borderColor: "#ccd13b",
            };
        case "fairy":
            return {
                backgroundColor: "#d61a59",
                borderColor: "#821036",
            };
        case "fighting":
            return {
                backgroundColor: "#c95d32",
                borderColor: "#873514",
            };
        case "fire":
            return {
                backgroundColor: "#d44c51",
                borderColor: "#752427",
            };
        case "flying":
            return {
                backgroundColor: "#7292b3",
                borderColor: "#2f3e4d",
            };
        case "ghost":
            return {
                backgroundColor: "#1b2240",
                borderColor: "#6e4647",
            };
        case "grass":
            return {
                backgroundColor: "#41ab48",
                borderColor: "#255c28",
            };
        case "ground":
            return {
                backgroundColor: "#7a5020",
                borderColor: "#422e18",
            };
        case "ice":
            return {
                backgroundColor: "#d3eff5",
                borderColor: "#62b3d9",
            };
        case "normal":
            return {
                backgroundColor: "#bd9194",
                borderColor: "#573a3c",
            };
        case "poison":
            return {
                backgroundColor: "#80609c",
                borderColor: "#43275c",
            };
        case "psychic":
            return {
                backgroundColor: "#b02068",
                borderColor: "#701844",
            };
        case "rock":
            return {
                backgroundColor: "#75380c",
                borderColor: "#241002",
            };
        case "steel":
            return {
                backgroundColor: "#969696",
                borderColor: "#405657",
            };
        case "water":
            return {
                backgroundColor: "#a7b8fc",
                borderColor: "#223eab",
            };
        default:
            return {};
    }
}