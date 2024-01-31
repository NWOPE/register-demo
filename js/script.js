async function start() {
	let { registration } = await fetch(`/api/initiate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());

    let { _id, session } = registration;

    document.querySelector("#id").textContent = _id;
    document.querySelector("#started").textContent = new Date(session.started);
    document.querySelector("#lastActive").textContent = new Date(session.lastActive);

    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        // set initial value
        input.value = registration[input.name];

        input.addEventListener("change", () => {
            fetch(`/api/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [input.name]: input.value }),
            });
        });
    });
}

let names = {
    "platinum": "Platinum Sponsorship",
    "gold": "Gold Sponsorship",
    "silver": "Silver Sponsorship",
    "bronze": "Bronze Sponsorship",
}

let sponsorOptions = document.querySelectorAll(`input.sponsor-radio`)
let seatSection = document.querySelector(".seat-section")
let requiredMessage = document.querySelector(".required-tables")
let requiredLevel = requiredMessage.querySelector(".level")

sponsorOptions.forEach((option) => {
    option.checked = false;
    option.addEventListener("click", () => {
        console.log(option.checked)
        if (!option.checked) option.checked = false;
    })
    option.addEventListener("change", () => {
        if (option.checked) {
            seatSection.classList.remove("dimmed")
            if (option.value != "none") {
                requiredMessage.classList.add("visible")
                requiredLevel.textContent = names[option.value]
            } else {
                requiredMessage.classList.remove("visible")
            }
        } 
    })
})

// start()