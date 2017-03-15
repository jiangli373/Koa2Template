/**
 * Created by li.jiang on 2017/3/15.
 */

const Router = require('koa-router');
const router = new Router();

router.get('/', async function (ctx, next) {
	await ctx.render('index',{title:'Hello Koa2'})
});

module.exports = router;