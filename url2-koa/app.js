const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const router = require('koa-router')()

app.use(async (ctx, next) => {
    console.log('Process ${ctx.request.method} ${ctx.request.url}...')
    await next()
})

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name
    ctx.response.body = '<h1>Hello, ${name}!</h1>'
})

router.get('/', (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
})

router.post('/signin', async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || ''
    console.log(`signin with name: ${name}, password: ${password}`)
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`
    }
})

app.use(router.routes())

app.listen(3000)
console.log('app is listeniing on 3000...')