const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require('./db/models');
const authRouter = require('./routes/auth');
const doorRouter = require('./routes/door');
const superRouter = require('./routes/super');
const alertRouter = require('./routes/alert');
const smsRouter = require('./routes/sms');
const statementRouter = require('./routes/statement');
const userRouter = require('./routes/user');
const accessRecordRouter = require('./routes/accessRecord');

const app = express();
app.set('port', process.env.PORT || 5000);

sequelize
    //? force: true 옵션은 모델 수정 시 db에 반영
    //? 테이블 삭제 후 다시 생성하기 때문에 데이터가 삭제됨
    //? alter: true 옵션을 통해 기존 데이터를 유지하면서 테이블 업데이트 가능
    //? 단, 필드를 새로 추가할때 필드가 NULL값을 허용하지 않을 시 오류 발생하므로 대처 필요
    .sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    }).catch((err) => {
        console.error(err);
    });

app.use(morgan('dev')); // 로그
// 굳이 필요한가? public 폴더에 이미지, css, js 파일을 제공받을 때 설정
// app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정 
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // uri 파싱
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
}));

app.use('/auth',authRouter);
app.use('/door',doorRouter);
app.use('/super',superRouter);
app.use('/alert',alertRouter);
app.use('/sms',smsRouter);
app.use('/statement', statementRouter);
app.use('/user',userRouter);
app.use('/accessrecord',accessRecordRouter);

// 일부러 에러 발생시키기 TEST용
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    // 템플릿 변수 설정
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 배포용이 아니라면 err설정 아니면 빈 객체

    res.status(err.status || 500);
    res.render('error'); // 템플릿 엔진을 렌더링 하여 응답
});

// 서버 실행
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});