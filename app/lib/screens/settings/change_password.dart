import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:provider/provider.dart';
import 'package:snackki_coffee_app/model/user.dart';
import 'package:snackki_coffee_app/provider/auth.dart';
import 'package:snackki_coffee_app/utils/base_url.dart';
import 'package:snackki_coffee_app/utils/colors.dart';
import 'package:snackki_coffee_app/utils/globals.dart';
import 'package:snackki_coffee_app/widgets/my_button.dart';
import 'package:snackki_coffee_app/widgets/text_field_input.dart';

class ChangePassword extends StatefulWidget {
  const ChangePassword({super.key});

  @override
  State<ChangePassword> createState() => _ChangePasswordState();
}

class _ChangePasswordState extends State<ChangePassword> {
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _passwordAgainController =
      TextEditingController();
  User? user;
  Future<void> getUser(BuildContext context) async {
    var token = await Provider.of<AuthProvider>(context, listen: false)
        .getTokenFromSharedPref();
    var decoded = JwtDecoder.decode(token);
    var userDecoded = decoded["user"];
    user = User.fromJson(userDecoded);
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getUser(context);
  }

  @override
  void dispose() {
    super.dispose();
    _passwordController.dispose();
    _passwordAgainController.dispose();
  }

  void handleChangePassword() async {
    try {
      if (_passwordAgainController.text.isNotEmpty &&
          _passwordController.text.isNotEmpty) {
        if (_passwordController.text.length < 6) {
          showSnackBar(
              context,
              "Das Passwort muss mindestens 6 Zeichen lang sein.",
              secondaryColor,
              "Kennwort ändern");
          return;
        }
        if (_passwordAgainController.text != _passwordController.text) {
          showSnackBar(context, "Die Passwörter stimmen nicht überein.",
              secondaryColor, "Kennwort ändern");
          return;
        }
        {
          await ApiService.putRequest("login/changePassword", <String, String>{
            'password': _passwordController.text,
          });
          if (!mounted) return;

          // Navigator.pop(context);
          showSnackBar(context, "Passwort wurde geändert.", greenColor,
              "Kennwort ändern");
          _passwordController.text = "";

          _passwordAgainController.text = "";
        }
      } else {
        showSnackBar(context, "Bitte alle Felder ausfüllen!", secondaryColor,
            "Kennwort ändern");
      }
    } catch (e) {
      if (!mounted) return;
      showSnackBar(context, "Das Passwort konnte nicht geändert werden",
          secondaryColor, "Kennwort ändern");
    }
  }

  @override
  Widget build(BuildContext context) {
    Size sizeMedia;
    double height, width;
    sizeMedia = MediaQuery.of(context).size;
    height = sizeMedia.height;
    width = sizeMedia.width;
    return Scaffold(
        body: SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.all(height / 40),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Row(
            children: [
              IconButton(
                  icon: Icon(Icons.arrow_back_ios),
                  onPressed: () => Navigator.pop(context)),
              Text(
                "Passwort ändern",
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 25,
                ),
              ),
            ],
          ),
          SizedBox(
            height: height / 54,
          ),
          TextFieldInput(
              radius: width / 12,
              icon: Icons.person,
              hintText: 'Passwort',
              textInputType: TextInputType.text,
              textEditingController: _passwordController,
              isPass: true),
          SizedBox(
            height: height / 54,
          ),
          TextFieldInput(
            radius: width / 12,
            icon: Icons.key,
            hintText: 'Passwort erneut',
            textInputType: TextInputType.text,
            textEditingController: _passwordAgainController,
            isPass: true,
          ),
          SizedBox(
            height: height / 54,
          ),
          MyButton(
              buttonName: "Passwort ändern",
              func: () => handleChangePassword()),
        ]),
      ),
    ));
  }
}
