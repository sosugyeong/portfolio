'use strict';

/*메뉴 클릭했을때 색 변경(안됨) */
/*
let divElement = document.getElementById('menu');
divElement.addEventListener('click', (e) => {
    let targetElement = e.target;
    targetElement.setAttribute('class', 'active');
});

*/

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session)

let authRouter = require('./lib_login/auth');
let authCheck = require('./lib_login/authCheck.js');
let template = require('./lib_login/template.js');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'good',
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}))

app.get('/', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
    return false;
  } else {                                      // 로그인 되어있으면 메인 페이지로 이동시킴
    res.redirect('/main');
    return false;
  }
})

// 인증 라우터
app.use('/auth', authRouter);

// 메인 페이지
app.get('/main', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
    return false;
  }
  let html = template.HTML('Welcome',
    `<hr>
        <h2>메인 페이지에 오신 것을 환영합니다</h2>
        <p>로그인에 성공하셨습니다.</p>`,
    authCheck.statusUI(req, res)
  );
  res.send(html);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})