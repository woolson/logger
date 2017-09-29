var moment = {
	getCurrent: function (template) {
		template = template ? template : 'YYYY-MM-DD'
		const date = new Date()
		return this.formatter(date, template)
	},
	formatter: function (date, template) {
		template = template ? template : 'YYYY-MM-DD'
		const newDate = new Date(date)
		const fullYear = newDate.getFullYear()
		const year = String(fullYear).substr(2)
		const month = newDate.getMonth() + 1
		const day = newDate.getDate()
		const hour = newDate.getHours()
		const minute = newDate.getMinutes()
		const second = newDate.getSeconds()

		const items = [
			{ key: 'YYYY', value: fullYear },				// 2017年
			{ key: 'YY', value: year },						// 17年
			{ key: 'MM', value: ('0' + month).substr(-2) },	// 02月
			{ key: 'M', value: month },						// 2月
			{ key: 'DD', value: ('0' + day).substr(-2) },	// 02号
			{ key: 'dd', value: day },						// 2号
			{ key: 'HH', value: ('0' + hour).substr(-2) },	// 24小时制
			{ key: 'H', value: hour },						// 2点
			{ key: 'mm', value: ('0' + minute).substr(-2) },// 02分
			{ key: 'm', value: minute },					// 2分
			{ key: 'SS', value: ('0' + second).substr(-2) },// 02秒
			{ key: 'S', value: second },					// 2秒
		]

		items.forEach(function (item) {
			template = template.replace(item.key, item.value)
		})

		return template
	}
}

module.exports = {
	moment: moment,
}