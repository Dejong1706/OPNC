import 'package:flutter/material.dart';

class AccountFindingPage extends StatelessWidget {
  const AccountFindingPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
          image: DecorationImage(
        fit: BoxFit.cover,
        image: AssetImage('assets/background.png'),
      )),
      child: Scaffold(
        appBar: AppBar(
          iconTheme: const IconThemeData(
            color: Color(0xff81a4ff), //색변경
          ),
          backgroundColor: Colors.white,
          elevation: 0.0,
        ),
        extendBodyBehindAppBar: true,
        backgroundColor: Colors.transparent,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: const <Widget>[FindIdButton(), FindPwButton()],
          ),
        ),
      ),
    );
  }
}

//아이디 찾기 버튼
class FindIdButton extends StatelessWidget {
  const FindIdButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 30),
      width: 270,
      height: 150,
      child: ElevatedButton.icon(
        icon: const Icon(
          Icons.account_box, 
          size:70.0
        ),
        onPressed: () {
          Navigator.pushNamed(context, '/findId');
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xff81a4ff),
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
        ),
        label: const Text("아이디 찾기", style: TextStyle(fontSize: 25.0),),
      ),
    );
  }
}

// 패스워드 찾기 버튼
class FindPwButton extends StatelessWidget {
  const FindPwButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 30),
      width: 270,
      height: 150,
      child: ElevatedButton.icon(
        icon: const Icon(
          Icons.fact_check, 
          size:70.0
        ),
        onPressed: () {
          Navigator.pushNamed(context, '/findPw');
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xff81a4ff),
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
        ),
        label: const Text("비밀번호 찾기", style: TextStyle(fontSize: 25.0),),
      ),
    );
  }
}