$ = new Env("微博超话")
const tokenurl = 'evil_tokenurl';
const tokencheckinurl = 'evil_tokencheckinurl'
const tokenheaders = 'evil_tokenheaders'
const tokencheckinheaders = 'evil_tokencheckinheaders'
console.log("🫏执行了脚本")
if ($request && $request.method != 'OPTIONS' && $request.url.match(/active\_checkin/) && $request.url.match(/page\/button/)){
	console.log("🌹🌹匹配到了链接")
	const tokencheckinheaders = 'evil_tokencheckinheaders'
	const checkinheaders = JSON.stringify($request.headers)
	$.setdata(checkinheaders, tokencheckinheaders) 
	console.log(checkinheaders)
	if (($.getdata(tokenurl) != undefined && $.getdata(tokenurl) != "") && ($.getdata(tokencheckinurl) == undefined || $.getdata(tokencheckinurl) == "")) {
		const tokencheckinheaders = 'evil_tokencheckinheaders'
		const checkinheaders = JSON.stringify($request.headers)
		$.setdata(checkinheaders, tokencheckinheaders) 
		console.log(checkinheaders)
		console.log("🌟❤️🌟❤️🌹😊成功啦🌹❤️🌟❤️🌟")
	}
  }

$.done()

//@Chavy
function Env(s) {
	this.name = s, this.data = null, this.logs = [], this.isSurge = (() => "undefined" != typeof $httpClient), this.isQuanX = (() => "undefined" != typeof $task), this.isNode = (() => "undefined" != typeof module && !!module.exports), this.log = ((...s) => {
	  this.logs = [...this.logs, ...s], s ? console.log(s.join("\n")) : console.log(this.logs.join("\n"))
	}), this.msg = ((s = this.name, t = "", i = "") => {
	  this.isSurge() && $notification.post(s, t, i), this.isQuanX() && $notify(s, t, i);
	  const e = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
	  s && e.push(s), t && e.push(t), i && e.push(i), console.log(e.join("\n"))
	}), this.getdata = (s => {
	  if (this.isSurge()) return $persistentStore.read(s);
	  if (this.isQuanX()) return $prefs.valueForKey(s);
	  if (this.isNode()) {
		const t = "box.dat";
		return this.fs = this.fs ? this.fs : require("fs"), this.fs.existsSync(t) ? (this.data = JSON.parse(this.fs.readFileSync(t)), this.data[s]) : null
	  }
	}), this.setdata = ((s, t) => {
	  if (this.isSurge()) return $persistentStore.write(s, t);
	  if (this.isQuanX()) return $prefs.setValueForKey(s, t);
	  if (this.isNode()) {
		const i = "box.dat";
		return this.fs = this.fs ? this.fs : require("fs"), !!this.fs.existsSync(i) && (this.data = JSON.parse(this.fs.readFileSync(i)), this.data[t] = s, this.fs.writeFileSync(i, JSON.stringify(this.data)), !0)
	  }
	}), this.wait = ((s, t = s) => i => setTimeout(() => i(), Math.floor(Math.random() * (t - s + 1) + s))), this.get = ((s, t) => this.send(s, "GET", t)), this.post = ((s, t) => this.send(s, "POST", t)), this.send = ((s, t, i) => {
	  if (this.isSurge()) {
		const e = "POST" == t ? $httpClient.post : $httpClient.get;
		e(s, (s, t, e) => {
		  t && (t.body = e, t.statusCode = t.status), i(s, t, e)
		})
	  }
	  this.isQuanX() && (s.method = t, $task.fetch(s).then(s => {
		s.status = s.statusCode, i(null, s, s.body)
	  }, s => i(s.error, s, s))), this.isNode() && (this.request = this.request ? this.request : require("request"), s.method = t, s.gzip = !0, this.request(s, (s, t, e) => {
		t && (t.status = t.statusCode), i(null, t, e)
	  }))
	}), this.done = ((s = {}) => this.isNode() ? null : $done(s))
  }