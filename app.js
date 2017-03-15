/**
 * Created by li.jiang on 2017/3/15.
 */
const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router')
	,render = require('koa-ejs')
	,bodyparser = require('koa-bodyparser')
	,log4js = require('koa-log4')
	,json = require('koa-json')
	,onerror = require('koa-onerror')
	,path = require('path');

log4js.configure('./log4js.json');
const router = new Router();
const Index = require('./routes/index');
const logger = log4js.getLogger('app');
// global middlewares
render(app, {
	root: path.join(__dirname, 'views'),
	layout: null,
	viewExt: 'ejs',
	cache: false,
	debug: true
});

// middlewares
app.use(bodyparser());
// app.use(json());


app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto',format:':remote-addr - -' +
' ":method :url HTTP/:http-version"' +
' :status :content-length ":referrer"' +
' ":user-agent" :response-timems'}))
app.use(require('koa-static')(path.join(__dirname, 'public')));

router.use('/', Index.routes(), Index.allowedMethods());
app.use(router.routes(),router.allowedMethods());


app.on('error', function (err, ctx) {
	logger.error('server error', err, ctx)
});
module.exports = app;