const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');

// 글 DB
let posts = [];

// post 요청시 필요
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ejs를 view 엔진으로 설정
app.set('view engine', 'ejs');

// 정적파일 경로 지정
app.use(express.static("public"));

// 파일 불러오기
const readfile = fs.readFileSync('postsDB.json', 'utf-8');
const jsonData = JSON.parse(readfile)
// console.log(jsonData)
posts = [...jsonData];

// home
app.get('/', function(req, res){
  res.render('pages/index.ejs', { posts })
})

// about
app.get('/about', function(req, res) {
  res.render('pages/about.ejs')
})

// create
app.post('/create', function(req, res) {
  const name = req.body.name;
  const post = req.body.post;
  console.log(req.body)
  // DB에 글 저장
  posts.push({ name, post });
  fs.writeFileSync('postsDB.json', JSON.stringify(posts))
  
  // 홈(게시판)으로 이동
  res.redirect('/');
})

// delete
app.post('/delete/:id', function(req, res) {
  // 글번호(배열)
  const id = req.params.id;
  const updatePost = posts.splice(id, 1);
  console.log('updatePost = ', posts)
  res.redirect('/')
})



const port = 3001;
app.listen(port, () => {
  console.log(`server running at ${port}`)
})