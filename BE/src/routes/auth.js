const express = require('express');
const bcrypt = require('bcrypt');

const Admin = require('../db/models/admin');
const SuperAdmin = require('../db/models/superAdmin');
const User = require('../db/models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async(req,res,next) =>{
    const { ID, PW } = req.body;
    try{
        const exSuperAdmin = await SuperAdmin.findOne({
            where: {superLoginId:ID}
        });
        if (exSuperAdmin){
            const checkPassword = await bcrypt.compare(PW,exSuperAdmin.superLoginPw);
            if(checkPassword){
                res.cookie('accessToken',exSuperAdmin.superId,{
                    expires: new Date(Date.now() + 1000*60*60*24*7),
                    httpOnly: true,
                    secure:false,
                    signed:true,
                });
                res.cookie('isSuper',1,{
                    expires: new Date(Date.now() + 1000*60*60*24*7),
                    httpOnly: true,
                    secure:false,
                });
                const encrypted = CryptoJS.AES.encrypt(JSON.stringify(exSuperAdmin.superName), process.env.PRIVATEKEY).toString();
                console.log(res.getHeader('set-cookie'));
                return res.status(200).send(encrypted);
            }else{
                return res.status(202).send('비밀번호가 일치하지 않습니다.');
            } 
        }else{
            const exAdmin = await Admin.findOne({
                where: {adminLoginId:ID}
            });
            if(exAdmin){
                const checkPassword = await bcrypt.compare(PW,exAdmin.adminLoginPw);
                if(checkPassword){
                    res.cookie('accessToken',exAdmin.adminId,{
                        expires: new Date(Date.now() + 1000*60*60*24*7),
                        httpOnly: true,
                        secure:false,
                        signed:true,
                    });
                    res.cookie('isSuper',0,{
                        expires: new Date(Date.now() + 1000*60*60*24*7),
                        httpOnly: true,
                        secure:false
                    });
                    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(exAdmin.adminName), process.env.PRIVATEKEY).toString();
                    console.log(res.getHeader('set-cookie'),0);
                    return res.status(200).send(encrypted);
                }else{
                    return res.status(202).send('비밀번호가 일치하지 않습니다.');
                } 
            }
            else{
                return res.status(202).send('존재하지 않는 아이디입니다.');
            }
        }
    }catch(err){
        console.error(err);
        return res.status(500).send(err.message);
    }
});

router.post('/logout', (req,res)=>{
    try{
        console.log('로그아웃');
        res.clearCookie('accessToken');
        res.clearCookie('isSuper');
        res.end();
    }catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.post('/user/login',async(req,res)=>{
    const {userId, userPw} = req.body;
    console.log(userId, userPw);
    try{
        const exUserId = await User.findOne({where:{userLoginId:userId}});
        if(exUserId){
            const checkPassword = await bcrypt.compare(userPw,exUserId.userLoginPw);
            if(checkPassword){
                const token = jwt.sign({
                    name:exUserId.userName
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:'3 days'
                }
                );
                return res.status(200).send({token:token});
            }else{
                return res.status(202).send('Do not match password');
            } 
        }else{
            return res.status(202).send('Not exist ID');
        }

    }catch(err){
        console.error(err);
        return res.status(500).send(err.message);
    }
})


module.exports = router;