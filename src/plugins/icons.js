
import Info from "@icons/Info.vue"
import CaretUp from "@icons/CaretUp.vue"
import CaretDown from "@icons/CaretDown.vue"
import CaretRight from "@icons/CaretRight.vue"
import Copy from "@icons/Copy.vue"
import Filter from "@icons/Filter.vue"

export default  {
	install: (app, options) => {
		app.component("Info", Info)
		app.component("CaretUp", CaretUp)
		app.component("CaretDown", CaretDown)
		app.component("CaretRight", CaretRight)
		app.component("Copy", Copy)
		app.component("Filter", Filter)
	}
}