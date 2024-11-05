
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

const image_path = "https://raw.githubusercontent.com/refom/arknek-backend/refs/heads/main/avatar/"

const OpIdToImg = (id) => {
	if (!id) return "icon.png"
	return image_path + id + ".png"
}

const dummyAcc = {
	id: "This_is_Acc_ID",
	operator: [
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
	limited: true,
}

const dummyTag = {
	id: "starter",
	name: "Tag",
	rarity: 5,
}

export {
	RarityToStyle,
	OpIdToImg,
	dummyAcc,
	dummyOperator,
	dummyTag,
}
