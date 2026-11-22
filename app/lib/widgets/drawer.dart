// ignore_for_file: file_names
import 'package:snackki_coffee_app/utils/contact.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:snackki_coffee_app/provider/auth.dart';
import 'package:snackki_coffee_app/provider/basket.dart';
import 'package:snackki_coffee_app/screens/category/category.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:snackki_coffee_app/utils/colors.dart';

class MyDrawer extends StatelessWidget {
  const MyDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
        child: ListView(children: [
      UserAccountsDrawerHeader(
        decoration: BoxDecoration(
          color: mainColor,
        ),
        accountName: Text(Contact.company),
        accountEmail: Text(Contact.address),
        currentAccountPicture: CircleAvatar(
          backgroundColor: Colors.white,
          child: Image.asset(
            'assets/images/snackki_logo.png',
            fit: BoxFit.cover,
          ),
        ),
      ),
      Theme(
        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          leading: Icon(Icons.category, color: mainColor),
          title: Text(
            'Katalog',
            style: TextStyle(
              color: mainColor,
              fontWeight: FontWeight.bold,
              fontSize: 17,
            ),
          ),
          children: [
            ListTile(
                leading: Icon(Icons.local_cafe_outlined, color: mainColor),
                title: Text(
                  'Füllprodukte',
                  style: TextStyle(color: mainColor),
                ),
                onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => Category(pageName: 'Füllprodukte'),
                    ))),
            ListTile(
                leading: Icon(Icons.coffee_maker_outlined, color: mainColor),
                title: Text(
                  'Kaffeeautomaten',
                  style: TextStyle(color: mainColor),
                ),
                onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          Category(pageName: 'Kaffeeautomaten'),
                    ))),
            ListTile(
                leading: Icon(Icons.local_bar_outlined, color: mainColor),
                title: Text(
                  'Getränkeautomaten',
                  style: TextStyle(color: mainColor),
                ),
                onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => Category(
                        pageName: 'Getränkeautomaten',
                      ),
                    ))),
            ListTile(
                leading: Icon(Icons.local_dining_outlined, color: mainColor),
                title: Text(
                  'Snackautomaten',
                  style: TextStyle(color: mainColor),
                ),
                onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => Category(
                        pageName: 'Snackautomaten',
                      ),
                    ))),
            ListTile(
                leading: Icon(Icons.local_drink_outlined, color: mainColor),
                title: Text(
                  'Wasserspender',
                  style: TextStyle(color: mainColor),
                ),
                onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => Category(
                        pageName: 'Wasserspender',
                      ),
                    ))),
            ListTile(
                leading: Icon(Icons.kitchen_outlined, color: mainColor),
                title: Text(
                  'Siebträger',
                  style: TextStyle(color: mainColor),
                ),
                onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => Category(
                        pageName: 'Siebträger',
                      ),
                    ))),
          ],
        ),
      ),
      Divider(),
      ListTile(
        leading: Icon(Icons.phone, color: mainColor),
        title: Text(
          'Anruf Snackki',
          style: TextStyle(color: mainColor),
        ),
        onTap: () {
          _launchURL(Contact.phoneUrl);
        },
      ),
      ListTile(
        leading: Icon(Icons.whatshot, color: mainColor),
        title: Text(
          'WhatsApp',
          style: TextStyle(color: mainColor),
        ),
        onTap: () {
          _launchURL(Contact.whatsappUrl);
        },
      ),
      ListTile(
        leading: Image.asset(
          "assets/images/instagram2.png",
          width: 20,
        ),
        title: Text(
          'Instagram',
          style: TextStyle(color: mainColor),
        ),
        onTap: () {
          _launchURL(Contact.instagram);
        },
      ),
      Divider(),
      ListTile(
          onTap: () {
            Provider.of<BasketProvider>(context, listen: false).clearBasket();
            Provider.of<AuthProvider>(context, listen: false)
                .removeTokenFromSharedPref(context);
          },
          leading: Icon(Icons.logout, color: mainColor),
          title: Text('Abmelden',
              style: TextStyle(
                color: mainColor,
              ))),
    ]));
  }
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
