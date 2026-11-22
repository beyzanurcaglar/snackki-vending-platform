// ignore_for_file: unused_import
import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:snackki_coffee_app/model/user.dart';
import 'package:snackki_coffee_app/provider/auth.dart';
import 'package:snackki_coffee_app/provider/basket.dart';
import 'package:snackki_coffee_app/screens/auth/login.dart';
import 'package:snackki_coffee_app/screens/home/home.dart';
import 'package:snackki_coffee_app/screens/layout.dart';
import 'package:snackki_coffee_app/utils/colors.dart';
import 'package:snackki_coffee_app/utils/session.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

void main() async {
  await dotenv.load(fileName: ".env");

  // Disable debug mode for web to prevent debug service errors
  if (kIsWeb) {
    debugPrint = (String? message, {int? wrapWidth}) {};
  }

  if (!kIsWeb) {
    // Only set HttpOverrides for non-web platforms
    // HttpOverrides.global = new MyHttpOverrides();
  }
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  void initState() {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => BasketProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: MaterialApp(
        navigatorKey: navigatorKey,
        debugShowCheckedModeBanner: false,
        title: 'Snackki',
        theme: ThemeData(
            scaffoldBackgroundColor: primaryColor,
            fontFamily: 'Nunito-Regular'),
        home: const Home(),
      ),
    );
  }
}

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    myFunc();
  }

  void myFunc() async {
    String user = await Provider.of<AuthProvider>(context, listen: false)
        .getTokenFromSharedPref();
    // Do not enter the app with an expired token
    bool invalid;
    try {
      invalid = user.isNotEmpty && JwtDecoder.isExpired(user);
    } catch (_) {
      invalid = true; // malformed token
    }
    if (invalid) {
      await Session.clear();
      user = "";
    }
    Future.delayed(Duration(seconds: 6), () {
      if (!mounted) return;
      Navigator.pushReplacement(
          context,
          MaterialPageRoute(
              builder: (context) => user == "" ? LoginPage() : Layout()));
    });
  }

  @override
  Widget build(BuildContext context) {
    Size sizeMedia;
    double height;
    sizeMedia = MediaQuery.of(context).size;
    height = sizeMedia.height;
    return Scaffold(
      body: Container(
        color: Colors.black,
        child: Center(
          child: Container(
            height: height / 2,
            alignment: Alignment.bottomCenter,
            decoration: BoxDecoration(
                image: DecorationImage(
                    image:
                        AssetImage("assets/images/SNACKKI_ANIMATION_GIF.gif"),
                    fit: BoxFit.fitWidth)),
          ),
        ),
      ),
    );
  }
}

// MyHttpOverrides class removed for web compatibility
// This class was causing issues on web platform
