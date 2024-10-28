import Info from "@icons/Info.vue"
import CaretUp from "@icons/CaretUp.vue"
import CaretDown from "@icons/CaretDown.vue"
import CaretRight from "@icons/CaretRight.vue"
import Copy from "@icons/Copy.vue"
import Filter from "@icons/Filter.vue"
import Refresh from "@icons/Refresh.vue"
import Tag from "@icons/Tag.vue"
import Play from "@icons/Play.vue"
import Star from "@icons/Star.vue"
import Sort from "@icons/Sort.vue"
import Calendar from "@icons/Calendar.vue"
import Close from "@icons/Close.vue"

export default {
	install: (app, options) => {
		app.component("IInfo", Info)
		app.component("ICaretUp", CaretUp)
		app.component("ICaretDown", CaretDown)
		app.component("ICaretRight", CaretRight)
		app.component("ICopy", Copy)
		app.component("IFilter", Filter)
		app.component("IRefresh", Refresh)
		app.component("ITag", Tag)
		app.component("IPlay", Play)
		app.component("IStar", Star)
		app.component("ISort", Sort)
		app.component("ICalendar", Calendar)
		app.component("IClose", Close)
	},
}
