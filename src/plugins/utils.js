
const RarityToStyle = (rarity) => {
	switch (rarity) {
		case 6:
			return "bg-rare-six"
		case 5:
			return "bg-rare-five"
		case 4:
			return "bg-rare-four"
		case 3:
			return "bg-rare-three"
		case 2:
			return "bg-rare-two"
		case 1:
			return "bg-rare-one"
		default:
			return "bg-light"
	}
}

const OpIdToImg = (id) => {
	if (!id) return "icon.png"
	return "./avatar/" + id + ".png"
}

const dummyAcc = {
	id: "This_is_Acc_ID",
	operator: [
		"example",
		"ela",
		"ascalon",
		"amiya",
		"mint",
		"gavial",
		"cuora",
		"kroos",
		"melantha",
	],
	tag: ["1iai7d0dv0d47681543cb79", "Tag"],
	story: "Story-Chapter",
	created_at: Date.now(),
	updated_at: Date.now(),
}

const dummyOperator = {
	id: "amiya",
	name: "Operator",
	rarity: 5,
}

export default {
	install: (app, options) => {
		app.provide("utils", {
			RarityToStyle,
			OpIdToImg,
			dummyAcc,
			dummyOperator,
		})
	},
}
