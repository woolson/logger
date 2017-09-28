var utils = require('./utils')

function Logger (config) {
	config = config || {}
	// 控制log等级
	this.LEVELS = [
		'log',
		'warn',
		'error',
	]
	// debug模式 title的字体大小
	this.debugTitleSize = config.debugTitleSize || 14
	// 是否使用颜色
	this.colored = config.colored === false ? false : true
	// log的时间格式
	this.dateTemp = config.dateTemp === undefined
		? 'HH:mm:SS'
		: config.dateTemp
	// 控制哪些log是可以显示出来，区别本地和线上
	this.logLevel = config.logLevel
		? this.getLevelFromName(config.logLevel)
		: 0
}

// 信息log
Logger.prototype.log = function (msg) {
	if(this.logLevel > 0) return
	console.log.apply(null, this.renderTemp('log', msg))
}

// 警告
Logger.prototype.warn = function (msg) {
	if(this.logLevel > 1) return
	console.log.apply(null, this.renderTemp('warn', msg))
}

// 错误log
Logger.prototype.error = function (msg) {
	if(this.logLevel > 3) return
	console.log.apply(null, this.renderTemp('error', msg))
}

// debug
Logger.prototype.debug = function () {
	if(this.logLevel > 1) return
	var length = arguments.length
	var msg = ''
	var title = ''
	if(length > 1) {
		title = arguments[0]
		msg = arguments[1]
	}else {
		msg = arguments[0]
	}
	console.log.apply(null, this.renderTemp('debug', msg, title))
}

// 设置全局log的等级
Logger.prototype.setLevel = function (levelName) {
	this.logLevel = this.getLevelFromName(levelName)
}

Logger.prototype.getLevelFromName = function (levelName) {
	var newLevel = this.LEVELS.indexOf(levelName)

	if(newLevel === -1) {
		this.error('level error')
		return
	}

	return newLevel
}

Logger.prototype.renderTemp = function (type, msg, title) {
	var date = utils.moment.getCurrent(this.dateTemp)

	if(type === 'debug') {
		var debugColors = [
			'#E6DA50',
			'#43CE87',
			'#5CC9F5',
			'#6638F0',
			'#F78AE0',
		]
		var dashs = '—'.repeat(20)
		var debugTitle = '%c' + dashs + title + date + dashs + '\n%c%o%c%s'
		var debugColor = debugColors[(Math.random() * 5).toFixed(0)]

		return [
			debugTitle,
			'font-size: ' + this.debugTitleSize + 'px;color: '+ debugColor,
			'',
			msg,
			'font-size: ' + this.debugTitleSize + 'px;color: '+ debugColor,
			'\n' + '—'.repeat(debugTitle.length - 9),
		]
	}else {
		var colors = {
			log: '#0AC380',
			warn: '#FFB000',
			error: '#F25353',
		}
		var temp = [
			'%c ' + type.toUpperCase() + ' %c%s',
			'color: #FFFFFF; background: ' + colors[type],
			'text-decoration: underline',
			this.dateTemp ? '[' + date + ']' : '',
			msg,
		]

		if(!this.colored) {
			temp.splice(1, 2)
			temp[0] = ' ' + type.toUpperCase()
		}

		return temp
	}
}

Logger.install = function (Vue, config) {
	var logger = new Logger(config)
	Object.defineProperty(Vue.prototype, '$log', {
		get: function () { return logger.log.bind(logger) },
	})
	Object.defineProperty(Vue.prototype, '$warn', {
		get: function () { return logger.warn.bind(logger) },
	})
	Object.defineProperty(Vue.prototype, '$error', {
		get: function () { return logger.error.bind(logger) },
	})
	Object.defineProperty(Vue.prototype, '$debug', {
		get: function () { return logger.debug.bind(logger) },
	})
}

module.exports = Logger
