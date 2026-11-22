// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:provider/provider.dart';
import 'package:snackki_coffee_app/model/user.dart';
import 'package:snackki_coffee_app/provider/auth.dart';
import 'package:snackki_coffee_app/provider/basket.dart';
import 'package:snackki_coffee_app/screens/settings/change_password.dart';
import 'package:snackki_coffee_app/utils/colors.dart';
import 'package:snackki_coffee_app/widgets/my_button.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  User? user;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getUser(context);
  }

  Future<void> getUser(BuildContext context) async {
    var token = await Provider.of<AuthProvider>(context, listen: false)
        .getTokenFromSharedPref();
    var decoded = JwtDecoder.decode(token);
    var userDecoded = decoded["user"];
    user = User.fromJson(userDecoded);
  }

  @override
  Widget build(BuildContext context) {
    Size sizeMedia;
    double height, width;
    sizeMedia = MediaQuery.of(context).size;
    height = sizeMedia.height;
    width = sizeMedia.width;

    void handleChangePassword() async {
      Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ChangePassword(),
          ));
    }

    void handleLogout() async {
      Provider.of<BasketProvider>(context, listen: false).clearBasket();
      Provider.of<AuthProvider>(context, listen: false)
          .removeTokenFromSharedPref(context);
    }

    return Scaffold(
        body: Column(mainAxisSize: MainAxisSize.max, children: [
      if (user != null)
        Container(
            padding: EdgeInsets.all(height / 40),
            margin: EdgeInsets.symmetric(
                horizontal: width / 15, vertical: height / 20),
            width: width,
            child: Column(children: [
              CircleAvatar(
                  radius: 64,
                  backgroundImage: AssetImage("assets/images/user.png")),
              SizedBox(
                height: height / 20,
              ),
              Text(
                "${user!.name} ${user!.surname}",
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                    color: mainColor),
              ),
              SizedBox(
                height: height / 50,
              ),
              Text(
                user!.companyName.toString(),
                style: TextStyle(
                    fontStyle: FontStyle.italic,
                    fontSize: 12,
                    color: secondaryColor,
                    fontWeight: FontWeight.bold),
              ),
              SizedBox(
                height: height / 50,
              ),
              Text(
                "${user!.street} ,${user!.postNo} ,${user!.city} ",
                style: TextStyle(
                    fontStyle: FontStyle.italic,
                    fontWeight: FontWeight.bold,
                    fontSize: 12,
                    color: secondaryColor),
              ),
              SizedBox(
                height: height / 20,
              ),
              MyButton(
                  buttonName: "Passwort ändern",
                  func: () {
                    handleChangePassword();
                  }),
              SizedBox(
                height: height / 50,
              ),
              MyButton(
                  buttonName: "Ausloggen",
                  func: () {
                    handleLogout();
                  }),
              SizedBox(
                height: height / 50,
              ),
            ]))
    ]));
  }
}
