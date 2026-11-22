import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:provider/provider.dart';
import 'package:snackki_coffee_app/model/product.dart';
import 'package:snackki_coffee_app/model/user.dart';
import 'package:snackki_coffee_app/provider/auth.dart';
import 'package:snackki_coffee_app/utils/base_url.dart';
import 'package:snackki_coffee_app/utils/colors.dart';
import 'package:snackki_coffee_app/widgets/home_page_part.dart';
import 'package:snackki_coffee_app/widgets/my_card.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Product> _products = [];
  User? user;
  bool loaded = false;
// Fetch content from the json file
  Future<void> fetchForYou() async {
    final response = await ApiService.getRequest("foryou");
    final data = productFromJson(response.body);
    setState(() {
      _products = data;
    });
  }

  Future<void> getUser(BuildContext context) async {
    var token = await Provider.of<AuthProvider>(context, listen: false)
        .getTokenFromSharedPref();
    var decoded = JwtDecoder.decode(token);
    var userDecoded = decoded["user"];
    user = User.fromJson(userDecoded);
    setState(() {
      loaded = true;
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getUser(context);
    fetchForYou();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
            child: Column(children: [
      if (loaded == true) ...[
        Container(
          color: mainColor,
          child: Padding(
            padding: const EdgeInsets.symmetric(
              vertical: 16,
              horizontal: 10,
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    Text(
                      "Hallo",
                      style: TextStyle(
                        color: primaryColor,
                        fontSize: 28,
                      ),
                    ),
                    SizedBox(width: 5),
                    Text(
                      user!.name.toString(),
                      style: TextStyle(
                        color: primaryColor,
                        fontSize: 28,
                      ),
                    )
                  ],
                ),
              ],
            ),
          ),
        ),
      ],
      const HomePagePart(),
      const SizedBox(height: 8),
      if (_products.isNotEmpty) ...[
        Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.symmetric(
                vertical: 16,
                horizontal: 10,
              ),
              child: Text(
                "Für Sie",
                style: TextStyle(
                  color: mainColor,
                  fontSize: 25,
                ),
              ),
            )),
        const SizedBox(height: 8),
        SizedBox(
          height: 270,
          child: Align(
            alignment: Alignment.centerLeft,
            child: ListView.builder(
                shrinkWrap: true,
                scrollDirection: Axis.horizontal,
                itemCount: _products.length,
                itemBuilder: (context, index) => MyCard(
                      title: _products[index].title,
                      id: _products[index].id,
                      image: _products[index].image,
                      desc: _products[index].desc,
                    )),
          ),
        )
      ]
    ])));
  }
}
