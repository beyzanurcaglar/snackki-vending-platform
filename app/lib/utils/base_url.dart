import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:snackki_coffee_app/utils/session.dart';

class ApiService {
  /// Backend base URL, read from API_URL in .env.
  /// On a real phone use your computer's LAN IP (e.g. http://192.168.1.20:3001/api).
  static String get baseUrl =>
      dotenv.maybeGet('API_URL') ?? "http://localhost:3001/api";

  static String getApiToken() {
    return dotenv.env['API_TOKEN'] ?? "";
  }

  static const _timeout = Duration(seconds: 10);

  static Future<Map<String, String>> _headers({bool json = false}) async {
    final headers = <String, String>{'x-api-key': getApiToken()};
    final token = await Session.token();
    if (token.isNotEmpty) headers['Authorization'] = 'Bearer $token';
    if (json) headers['Content-Type'] = 'application/json';
    return headers;
  }

  /// Sends the user back to login when the session expired (401/403)
  static Future<void> _checkSession(http.Response res, String endpoint) async {
    if ((res.statusCode == 401 || res.statusCode == 403) &&
        endpoint != "login") {
      await Session.expire();
    }
  }

  static Future<http.Response> getRequest(String endpoint) async {
    try {
      final response = await http
          .get(Uri.parse('$baseUrl/$endpoint'), headers: await _headers())
          .timeout(_timeout);
      await _checkSession(response, endpoint);
      if (response.statusCode == 200) {
        return response;
      } else {
        throw Exception('Daten konnten nicht geladen werden');
      }
    } catch (e) {
      throw Exception('Fehler bei der API-Anfrage: $e');
    }
  }

  static Future<http.Response> postRequest(
      String endpoint, dynamic body) async {
    try {
      final response = await http
          .post(Uri.parse('$baseUrl/$endpoint'),
              headers: await _headers(json: true), body: jsonEncode(body))
          .timeout(_timeout, onTimeout: () {
        throw Exception('Zeitüberschreitung der Anfrage');
      });
      await _checkSession(response, endpoint);
      // The caller evaluates the status code
      return response;
    } catch (e) {
      throw Exception('Fehler bei der API-Anfrage: $e');
    }
  }

  static Future<http.Response> putRequest(String endpoint, dynamic body) async {
    try {
      final response = await http
          .put(Uri.parse('$baseUrl/$endpoint'),
              headers: await _headers(json: true), body: jsonEncode(body))
          .timeout(_timeout);
      await _checkSession(response, endpoint);
      if (response.statusCode == 200) {
        return response;
      } else {
        throw Exception('Daten konnten nicht gesendet werden');
      }
    } catch (e) {
      throw Exception('Fehler bei der API-Anfrage: $e');
    }
  }
}
