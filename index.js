window.onload = function() {
	setButtons();
	setGrid();
}

function setButtons() {
	const content = document.getElementById("content");
	const buttonsElement = document.createElement("div");
	buttonsElement.setAttribute("id", "buttons");
	buttonsElement.setAttribute("class", "buttons");

	const p = document.createElement("p");
	p.setAttribute("id", "mode-element");
	const span1 = document.createElement("span");
	const span2 = document.createElement("span");
	span2.setAttribute("id", "mode");
	const text1 = document.createTextNode("Current mode is: ");
	const text2 = document.createTextNode("Default Mode");
	span1.appendChild(text1);
	span2.appendChild(text2);
	p.appendChild(span1);
	p.appendChild(span2);
	buttonsElement.appendChild(p);

	// Default Mode
	const buttonDefault = document.createElement("button");
	buttonDefault.setAttribute("class", "button");
	buttonDefault.setAttribute("id", "buttonDefault");
	buttonDefault.setAttribute("onclick", "activateButton(this.id)");
	buttonDefault.innerHTML = "Default Mode";
	buttonsElement.appendChild(buttonDefault);

	// Color Mode
	const buttonColor = document.createElement("button");
	buttonColor.setAttribute("class", "button");
	buttonColor.setAttribute("id", "buttonColor");
	buttonColor.setAttribute("onclick", "activateButton(this.id)");
	buttonColor.innerHTML = "Color Mode";
	buttonsElement.appendChild(buttonColor);

	content.appendChild(buttonsElement);
}

function activateButton(id) {
	const mode = document.getElementById("mode");
	const button = document.getElementById(id);
	mode.innerHTML = button.innerHTML;
}

function setGrid() {
	const content = document.getElementById("content");
	const tileBox = document.createElement("div");
	tileBox.setAttribute("id", "tile-box");
	tileBox.setAttribute("class", "tile-box");

    const tilesPerSide = 16;
    tileBox.style.gridTemplateColumns = "repeat(" + tilesPerSide + ", auto)";
    tileBox.style.gridTemplateRows = "repeat(" + tilesPerSide + ", auto)";

	for (let i = 0; i < tilesPerSide * tilesPerSide; i++) {
		const div = document.createElement("div");
		div.setAttribute("class", "tile");
		div.setAttribute("id", "tile-" + i);
		tileBox.appendChild(div);
	}
	content.appendChild(tileBox);

	setHoverEffects();
}

function setHoverEffects() {
	const tiles = document.querySelectorAll('.tile');
    let tile;
    tiles.forEach((tile) => {
        tile.addEventListener('mouseenter', (e) => {
            tile.style.background = changeColor(e);
        });
    });
}

function changeColor(e) {
	const currentColor = e.target['style']["background-color"];
	const current_mode = document.getElementById("mode").innerHTML;
	let newColor;

	if (current_mode === "Default Mode") {
		if (currentColor) {
			const colorAsString = currentColor.slice(4, -1).split(",");
			const colorAsNumber = parseInt(colorAsString);
			const newNumber = colorAsNumber - 32;
			newColor = "rgb(" + newNumber + "," + newNumber + "," + newNumber + ")";
		} else {
			newColor = "rgb("+224+","+224+","+224+")";
		}
	} else if (current_mode === "Color Mode") {
		const randomNum1 = Math.floor(Math.random() * 256);
		const randomNum2 = Math.floor(Math.random() * 256);
		const randomNum3 = Math.floor(Math.random() * 256);
		newColor = "rgb(" + randomNum1 + "," + randomNum2 + "," + randomNum3 + ")";
	}

	return newColor;
}