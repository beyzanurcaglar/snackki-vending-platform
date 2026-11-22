import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:snackki_coffee_app/utils/base_url.dart';
import 'package:snackki_coffee_app/utils/contact.dart';

void main() {
  test('API URL wird aus der .env gelesen', () {
    dotenv.testLoad(fileInput: 'API_URL=http://example.test:3001/api');
    expect(ApiService.baseUrl, 'http://example.test:3001/api');
  });

  test('Ohne .env-Werte werden Standardwerte verwendet', () {
    dotenv.testLoad(fileInput: '');
    expect(ApiService.baseUrl, 'http://localhost:3001/api');
    expect(Contact.phoneUrl, startsWith('tel:'));
    expect(Contact.whatsappUrl, startsWith('https://wa.me/'));
  });
}
