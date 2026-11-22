import 'package:flutter_dotenv/flutter_dotenv.dart';

/// Contact details are read from .env (not committed).
/// Placeholder values are used when a key is missing.
class Contact {
  static String _get(String key, String fallback) =>
      dotenv.maybeGet(key) ?? fallback;

  static String get company => _get('CONTACT_COMPANY', 'Snackki GmbH');
  static String get address =>
      _get('CONTACT_ADDRESS', 'Musterstraße 1, 10115 Berlin');
  static String get phone => _get('CONTACT_PHONE', '+490000000000');
  static String get whatsapp => _get('CONTACT_WHATSAPP', '490000000000');
  static String get instagram =>
      _get('CONTACT_INSTAGRAM', 'https://www.instagram.com/');

  static String get phoneUrl => 'tel:$phone';
  static String get whatsappUrl => 'https://wa.me/$whatsapp?text=Hallo';
}
