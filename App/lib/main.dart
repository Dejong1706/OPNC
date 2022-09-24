import 'package:flutter/material.dart';
import 'package:smart_beacon_customer_app/find_account_screen.dart';
import 'package:smart_beacon_customer_app/find_id_screen.dart';
import 'package:smart_beacon_customer_app/find_pw_screen.dart';
import 'package:smart_beacon_customer_app/login_screen.dart';
import 'package:smart_beacon_customer_app/main_view.dart';
import 'package:smart_beacon_customer_app/middle_screen.dart';
import 'package:smart_beacon_customer_app/register_screen.dart';
import 'package:smart_beacon_customer_app/edit_personal_info.dart';
import 'package:smart_beacon_customer_app/device_info_check.dart';
import 'package:smart_beacon_customer_app/splash_screen.dart';

// Future<void> main() async {
//   WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
//   FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
//   runApp(const MyApp());
//   FlutterNativeSplash.remove();
// }

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashScreen(),
        '/middle': (context) => const MiddleScreen(),
        '/login': (context) => const LoginScreen(),
        '/regist': (context) => const RegisterScreen(),
        '/account': (context) => const AccountFindingPage(),
        '/findId': (context) => const FindIdScreen(),
        '/findPw': (context) => const FindPwScreen(),
        '/findIdResult': (context) => const FindIdResultScreen(),
        '/findPwResult': (context) => const FindPwResultScreen(),
        '/main': (context) => const MainView(),
        '/editInfo': (context) => const EditPersonalInfo(),
        '/deviceInfo': (context) => const DeviceInfoCheck(),
      },
    );
  }
}

// class MyApp extends StatelessWidget {
//   const MyApp({
//     Key? key,
//     required this.route,
//   }) : super(key: key);

//   final String? route;
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       debugShowCheckedModeBanner: false,
//       initialRoute: route,
//       routes: {
//         '/': (context) => const MiddleScreen(),
//         '/login': (context) => const LoginScreen(),
//         '/regist': (context) => const RegisterScreen(),
//         '/account': (context) => const AccountFindingPage(),
//         '/findId': (context) => const FindIdScreen(),
//         '/findPw': (context) => const FindPwScreen(),
//         '/findIdResult': (context) => const FindIdResultScreen(),
//         '/findPwResult': (context) => const FindPwResultScreen(),
//         '/main': (context) => const MainView(),
//         '/editInfo': (context) => const EditPersonalInfo(),
//         '/deviceInfo': (context) => const DeviceInfoCheck(),
//       },
//     );
//   }
// }
