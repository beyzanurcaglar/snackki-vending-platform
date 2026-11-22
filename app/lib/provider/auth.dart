import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:snackki_coffee_app/model/user.dart';
import 'package:snackki_coffee_app/screens/auth/login.dart';
import 'package:snackki_coffee_app/screens/layout.dart';

class AuthProvider extends ChangeNotifier {
  late User authUser = User();
  SharedPreferences? prefs;

  void saveToken(dynamic token, BuildContext context) async {
    notifyListeners();
    await saveTokenToSharedPref(token);
    if (!context.mounted) return;
    Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => Layout(),
        ));
  }

  void removeTokenFromSharedPref(context) async {
    await createSharedPref();
    prefs?.remove("accessToken");
    notifyListeners();
    Navigator.of(context, rootNavigator: true)
        .pushReplacement(MaterialPageRoute(builder: (context) => LoginPage()));
    Navigator.of(context).popUntil((route) => route.isFirst);
  }

  Future<void> createSharedPref() async {
    prefs = await SharedPreferences.getInstance();
  }

  Future<void> saveTokenToSharedPref(token) async {
    await createSharedPref();
    // Obtain shared preferences.
    if (prefs == null) return;

    prefs?.setString("accessToken", token);
    notifyListeners();
  }

  Future<String> getTokenFromSharedPref() async {
    await createSharedPref();
    if (prefs?.getString("accessToken") == null) {
      return "";
    } else {
      var userJson = prefs?.getString("accessToken") ?? "";

      if (userJson.isEmpty) {
        return "";
      }
      return userJson;
    }
  }
}

// import 'dart:convert';

// import 'package:flutter/material.dart';
// import 'package:shared_preferences/shared_preferences.dart';
// import 'package:snackki_coffee_app/model/user.dart';
// import 'package:snackki_coffee_app/screens/auth/login.dart';
// import 'package:snackki_coffee_app/screens/layout.dart';

// class AuthProvider extends ChangeNotifier {
//   late User authUser = User();
//   SharedPreferences? prefs;

//   void saveUser(User user, BuildContext context) async {
//     authUser = user;
//     notifyListeners();

//     await saveUserToSharedPref(user);
//     Navigator.push(
//         context,
//         MaterialPageRoute(
//           builder: (context) => Layout(),
//         ));
//   }

//   void removeUserFromSharedPref(context) async {
//     await createSharedPref();
//     prefs?.remove("sharedPrefUser");
//     notifyListeners();
//     Navigator.of(context, rootNavigator: true)
//         .pushReplacement(MaterialPageRoute(builder: (context) => LoginPage()));
//     Navigator.of(context).popUntil((route) => route.isFirst);
//   }

//   Future<void> createSharedPref() async {
//     prefs = await SharedPreferences.getInstance();
//   }

//   Future<void> saveUserToSharedPref(User user) async {
//     await createSharedPref();
//     // Obtain shared preferences.
//     if (prefs == null) return;
//     var userJson = jsonEncode(user);
//     prefs?.setString("sharedPrefUser", userJson);
//     notifyListeners();
//   }

//   Future<User?> getUserFromSharedPref() async {
//     await createSharedPref();
//     if (prefs?.getString("sharedPrefUser") == null) {
//       return null;
//     } else {
//       var userJson = prefs?.getString("sharedPrefUser") ?? "";

//       if (userJson.isEmpty) {
//         return null;
//       }
//       return User.fromJson(jsonDecode(userJson));
//     }
//   }
// }
