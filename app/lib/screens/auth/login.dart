import 'package:snackki_coffee_app/utils/contact.dart';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:snackki_coffee_app/provider/auth.dart';
import 'package:snackki_coffee_app/utils/base_url.dart';
import 'package:snackki_coffee_app/utils/colors.dart';
import 'package:snackki_coffee_app/utils/globals.dart';
import 'package:snackki_coffee_app/widgets/my_button.dart';
import 'package:snackki_coffee_app/widgets/text_field_input.dart';
import 'package:url_launcher/url_launcher.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _userIdController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  @override
  void dispose() {
    super.dispose();
    _userIdController.dispose();
    _passwordController.dispose();
  }

  Future<void> handleLogin() async {
    if (_passwordController.text.isEmpty || _userIdController.text.isEmpty) {
      showSnackBar(context, "Bitte alle Felder ausfüllen!", secondaryColor,
          "Leere Felder");
    } else {
      try {
        final res = await ApiService.postRequest("login", <String, String>{
          'userId': _userIdController.text,
          'password': _passwordController.text,
          'client': 'mobile',
        });
        if (!mounted) return;

        if (res.statusCode == 200) {
          final responseJson = jsonDecode(res.body);
          final accessToken = responseJson["accessToken"];
          Provider.of<AuthProvider>(context, listen: false)
              .saveToken(accessToken, context);
        } else if (res.statusCode == 401) {
          showSnackBar(context, "Benutzer-ID oder Passwort falsch!",
              secondaryColor, "Anmeldefehler");
        } else {
          showSnackBar(context, "Kontakt mit dem Administrator!",
              secondaryColor, "Benutzer deaktiviert");
        }
      } catch (e) {
        if (!mounted) return;
        showSnackBar(
            context,
            "Keine Verbindung zum Server. Bitte später erneut versuchen.",
            secondaryColor,
            "Verbindungsfehler");
      }
    }
  }
  // Future<User?> handleLogin() async {
  //   if (_passwordController.text.isEmpty || _userIdController.text.isEmpty) {
  //     showSnackBar(context, "Leerfelder!", secondaryColor, "Leer");
  //   } else {
  //     final res = await http.post(Uri.parse(baseUrl + "login"),
  //         headers: <String, String>{
  //           'Content-Type': 'application/json; charset=UTF-8',
  //         },
  //         body: jsonEncode(<String, String>{
  //           'userId': _userIdController.text,
  //           'password': _passwordController.text,
  //         }));
  //     if (res.statusCode == 200) {
  //       final responseJson = jsonDecode(res.body);
  //       if (responseJson['data'] != null &&
  //           responseJson['data']["isActive"] == 1) {
  //         final userData = User.fromJson(responseJson['data']);
  //         Provider.of<AuthProvider>(context, listen: false)
  //             .saveUser(userData, context);
  //       } else {
  //         showSnackBar(context, "Kontakt mit dem Administrator!",
  //             secondaryColor, "Benutzer deaktiviert");
  //       }
  //     } else {
  //       showSnackBar(context, "Benutzer-ID oder Passwort falsch!",
  //           secondaryColor, "Benutzerfehler");
  //     }
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    Size sizeMedia;
    double height, width;
    sizeMedia = MediaQuery.of(context).size;
    height = sizeMedia.height;
    width = sizeMedia.width;
    return Scaffold(
      body: Center(
          child: Container(
        color: fourthColor,
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Flexible(
                flex: 1,
                child: Container(),
              ),
              Expanded(
                flex: 2,
                child: Container(
                  width: width / 3,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage("assets/images/snackki_logo3.png"),
                      fit: BoxFit.contain,
                    ),
                  ),
                ),
              ),
              Container(
                  padding: EdgeInsets.all(height / 40),
                  margin: EdgeInsets.symmetric(
                      horizontal: width / 15, vertical: height / 13.5),
                  width: width,
                  child: Column(children: [
                    TextFieldInput(
                      radius: width / 12,
                      icon: Icons.person,
                      hintText: 'Benutzer-ID',
                      textInputType: TextInputType.number,
                      textEditingController: _userIdController,
                    ),
                    SizedBox(
                      height: height / 54,
                    ),
                    TextFieldInput(
                      radius: width / 12,
                      icon: Icons.key,
                      hintText: 'Passwort',
                      textInputType: TextInputType.text,
                      textEditingController: _passwordController,
                      isPass: true,
                    ),
                    SizedBox(
                      height: height / 54,
                    ),
                    MyButton(buttonName: "Anmelden", func: () => handleLogin()),
                    SizedBox(
                      height: height / 20,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        InkWell(
                          child: Icon(
                            Icons.phone,
                            color: mainColor,
                          ),
                          onTap: () {
                            _launchURL(Contact.phoneUrl);
                          },
                        ),
                        SizedBox(
                          width: 50,
                        ),
                        InkWell(
                          child: Icon(
                            Icons.whatshot,
                            color: mainColor,
                          ),
                          onTap: () {
                            _launchURL(Contact.whatsappUrl);
                          },
                        ),
                        SizedBox(
                          width: 50,
                        ),
                        InkWell(
                          child: Image.asset(
                            "assets/images/instagram2.png",
                            width: 24,
                          ),
                          onTap: () {
                            _launchURL(Contact.instagram);
                          },
                        ),
                      ],
                    ),
                  ])),
            ]),
      )),
    );
  }

  _launchURL(url) async {
    if (await canLaunchUrl(
      Uri.parse(
        url,
      ),
    )) {
      await launchUrl(
        Uri.parse(url),
        mode: LaunchMode.externalApplication,
      );
    } else {
      // can't launch url
    }
  }
}
