const formateIcons = document.querySelectorAll(".toolbar .material-icons");

formateIcons.forEach((icons) => {
	icons.addEventListener("click", () => {
		const selected = icons.dataset["element"];
		if (selected === "createLink" || selected === "insertImage") {
			const url = prompt("Url");
			url && document.execCommand(selected, false, url);
		} else if (selected === "add" || selected === "remove") {
			let size = document.getSelection().focusNode.parentNode.size;
			let fontSize = selected === "add" ? (size ? parseInt(size) + 1 : 4) : size ? parseInt(size) - 1 : 2;
			let res = document.execCommand("fontSize", false, parseInt(fontSize));
			console.log(fontSize);
		} else {
			document.execCommand(selected, false, null);
		}
	});
});

document.querySelector("#showCode").onclick = () => {
	const code = document.querySelector(".editor").innerHTML;
	document.querySelector("#showCodeInput").innerText = code;
	if (code.length) document.querySelector("#showCodeDialog").style.transform = "translateX(0%)";
};

document.querySelector("#copy").onclick = () => {
	const input = document.createElement("textarea");
	input.value = document.querySelector("#showCodeInput").innerText;
	document.body.appendChild(input);
	input.select();
	document.execCommand("copy");
	document.body.removeChild(input);
};

document.querySelector("#close").onclick = () => {
	document.querySelector("#showCodeDialog").style.transform = "translateX(100%)";
};


document.querySelector(".socialMedias").addEventListener('click', (e) => {
	e.stopPropagation()
	console.log("SocialMedia")
}, false)


document.querySelector("#developer").onclick = (e) => {
	e.stopPropagation()
	console.log("developer")
	document.querySelector("#developer").classList.toggle("inCircle");
	document.querySelector("#developer").classList.toggle("outCircle");
};
