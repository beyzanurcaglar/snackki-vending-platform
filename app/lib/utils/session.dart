import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:snackki_coffee_app/screens/auth/login.dart';

/// Global navigator (used to return to login when the session expires)
final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

class Session {
  static Future<String> token() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString("accessToken") ?? "";
  }

  /// Removes the stored token
  static Future<void> clear() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove("accessToken");
  }

  /// Removes the token and returns to the login screen
  static Future<void> expire() async {
    await clear();
    navigatorKey.currentState?.pushAndRemoveUntil(
      MaterialPageRoute(builder: (_) => LoginPage()),
      (route) => false,
    );
  }
}
