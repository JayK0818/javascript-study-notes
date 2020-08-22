const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const views = require('koa-views');
const path = require('path');

app.use(views(
    path.join(__dirname,'./views'),
    {
        extension:'ejs'
    }
))

app.use(async (ctx,next) => {
    ctx.state = {
        title: '公共title'
    }
    await next()
})

router.get('/player',async ctx => {
    console.log(ctx.state.title);
    await ctx.render('player',{
        firstName:'kyrie',
        lastName:'irving'
    })
});

const list = [
    '拜登称愿为阻止新冠关停美国经济',
    '郑爽回应直播争议',
    '教师提离职被索赔42万',
    '台风巴威可能成为今年来最强台风'
]

router.get('/news',async ctx => {
    await ctx.render('news',{
        list
    })
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001,() => {
    console.log('app starting at port 3001');
})