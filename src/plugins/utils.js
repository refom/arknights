
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
	return "/avatar/" + id + ".png"
}

export default {
	install: (app, options) => {
		app.provide("utils", {
			RarityToStyle,
			OpIdToImg,
		})
	},
}
