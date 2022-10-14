const SocketIO = require('socket.io');
const Door = require('./db/models/door');
const AdminDoor = require('./db/models/adminDoor');
const Admin = require('./db/models/admin');
const AlertRecord = require('./db/models/alertRecord');
const { sendSMS } = require('./service/sms');
const { uuid } = require('./service/createUUID');

const doorWarning = async(socketId) =>{

    const exDoor = await Door.findAll({
        where:{socketId},
        include:[{
            model:AdminDoor,
            attributes:['adminId']
        }]
    });
    if(exDoor){
        exDoor.warning = true;
        await exDoor.save();
        // 주석 처리 부분은 메시지 전송 기능(나중에 테스트)
        // await Promise(   
        //     exDoor.adminDoors.map(async admin =>{
        //         const exAdmin = await Admin.findOne({where:{adminId:admin.adminId}});
        //         if(exAdmin){
        //             let msg = `${exDoor.doorName}의 문이 이상이 생겼습니다.`;
        //             const smsResult = await sendSMS(exAdmin.phoneNum,msg);
        //             console.log(smsResult);
        //         }   
        //         else{
        //             console.log(`${admin.adminId}는 존재하지 않습니다.`);
        //         }
        //     })
        // );
        let nowTime = new Date();
        nowTime.setHours(nowTime.getHours()+9);
        await AlertRecord.create({
            recordId: await uuid.uuid(),
            startTime: nowTime,
            doorId: exDoor.doorId
        });
    }else{
        console.log("존재하지 않는 socket Id입니다.")
    }

}

module.exports = (server, app) =>{
    const io = SocketIO(server,{
        path:'/socket.io',  
        pingInterval: 25000,
        pingTimeout: 5000,
  });
    //path 수정 필요
    app.set('io',io);

    io.on('connection',(socket) =>{
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`새로운 클라이언트 접속 IP Address: ${ip}, Socket Id: ${socket.id}`);

        // socket.interval = setInterval(()=>{
        //     socket.emit("check","connection checking");
        // },20000);

        socket.on('disconnect',async()=>{
            console.log(`클라이언트 접속 해제  IP Address: ${ip}, Socket Id: ${socket.id}`);
            //const exDoor = await Door.findOne({where:{doorId:data.beaconId}});
            await doorWarning(socket.id);
            clearInterval(socket.interval);
        });

        socket.on('error',(error)=>{
            console.error(error);
        });

        socket.on('set',async(data)=>{
            console.log(data);
            const exDoor = await Door.findOne({where:{doorId:data.beaconId}});
            if(exDoor){
                exDoor.socketId = socket.id;
                exDoor.warning = false;
                await exDoor.save();
            }else{
                console.log('존재하지 않는 BeaconId입니다.');
            }

            console.log(data.beaconId, socket.id);
        });

        socket.on('change',async(data)=>{
            const exDoor = await Door.findOne({where:{doorId:data.beaconId}});
            if(exDoor){
                exDoor.isOpen = data.isOpen;
                exDoor.socketId = socket.id;
                await exDoor.save();
            }else{
                console.log('error');
            }
            console.log(data.beaconId, data.isOpen);
        });
    });
};