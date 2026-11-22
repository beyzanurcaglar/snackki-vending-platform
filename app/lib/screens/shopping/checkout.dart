import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:provider/provider.dart';
import 'package:snackki_coffee_app/model/user.dart';
import 'package:snackki_coffee_app/provider/auth.dart';
import 'package:snackki_coffee_app/provider/basket.dart';
import 'package:snackki_coffee_app/screens/layout.dart';
import 'package:snackki_coffee_app/utils/base_url.dart';
import 'package:snackki_coffee_app/utils/colors.dart';
import 'package:snackki_coffee_app/utils/globals.dart';
import 'package:snackki_coffee_app/widgets/my_button.dart';
import 'package:intl/intl.dart';

class Checkout extends StatefulWidget {
  const Checkout({super.key});

  @override
  State<Checkout> createState() => _CheckoutState();
}

class _CheckoutState extends State<Checkout> {
  String? value;
  bool grouped = false;
  User? user;
  List? paymenttypes;
  List filteredUser = [];
  List groupData(List<dynamic> data) {
    List groupedData = [];

    for (var i = 0; i < data.length; i++) {
      String paymentName = data[i]['paymentName'];
      var found = groupedData.firstWhere(
          (product) => product['paymentName'] == paymentName,
          orElse: () => null);
      if (found == null) {
        groupedData.add({'paymentName': paymentName});
      }
    }
    return groupedData;
  }

// Fetch content from the json file
  void fetchProduct() async {
    await getUser(context);
    final response = await ApiService.getRequest("users/${user?.id}");
    // await rootBundle.loadString('assets/json/products/products.json');

    paymenttypes = jsonDecode(response.body);
    filteredUser = groupData(paymenttypes!);
    setState(() {
      grouped = true;
    });
  }

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
    fetchProduct();
  }

  void handleSendOrder() async {
    try {
      final res = await ApiService.postRequest("orders", <String, String>{
        "userId": user!.userId.toString(),
        "orderId": user!.userId.toString() +
            DateTime.now().microsecondsSinceEpoch.toString(),
        "productId": Provider.of<BasketProvider>(context, listen: false)
            .listOfOrders
            .map((e) => e.id)
            .join(",")
            .toString(),
        "productAmount": Provider.of<BasketProvider>(context, listen: false)
            .listOfOrders
            .map((e) => e.amount)
            .join(",")
            .toString(),
        "orderDate":
            DateFormat('dd.MM.yyyy - kk:mm').format(DateTime.now()).toString(),
        "paymentName": value ?? "Bankabbuchung"
      });

      if (!mounted) return;
      // Only a successful response means the order was saved
      if (res.statusCode != 200) {
        throw Exception('Order failed: ${res.statusCode}');
      }
      final responseJson = jsonDecode(res.body);

      if (responseJson != null) {
        Provider.of<BasketProvider>(context, listen: false).clearBasket();

        showSnackBar(
            context, "Bestellung abgeschlossen!", greenColor, "Bestellung");
        Future.delayed(
          Duration(seconds: 1),
          () {
            if (!mounted) return;
            Navigator.of(context, rootNavigator: true).pushReplacement(
                MaterialPageRoute(builder: (context) => Layout()));
            Navigator.of(context).popUntil((route) => route.isFirst);
          },
        );
      }
    } catch (e) {
      if (!mounted) return;
      showSnackBar(
          context,
          "Die Bestellung konnte nicht abgeschlossen werden. Bitte erneut versuchen.",
          mainColor,
          "Fehler");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: grouped == true
            ? SingleChildScrollView(
                child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(mainAxisSize: MainAxisSize.max, children: [
                      Row(
                        children: [
                          IconButton(
                              icon: Icon(Icons.arrow_back_ios),
                              onPressed: () => Navigator.pop(context)),
                          Text(
                            "Kasse",
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 25,
                            ),
                          ),
                        ],
                      ),
                      Consumer<BasketProvider>(
                          builder: (context, value, child) => ListView.builder(
                              physics: NeverScrollableScrollPhysics(),
                              shrinkWrap: true,
                              scrollDirection: Axis.vertical,
                              itemCount: value.listOfOrders.length,
                              itemBuilder: (context, index) => Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Container(
                                      decoration: BoxDecoration(
                                          color: primaryColor,
                                          boxShadow: [
                                            BoxShadow(
                                                blurRadius: 2,
                                                color: sixthColor,
                                                spreadRadius: 1)
                                          ],
                                          borderRadius: BorderRadius.circular(
                                              borderRadius)),
                                      padding: const EdgeInsets.all(16.0),
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          Image.network(
                                            "${ApiService.baseUrl}/images/${value.listOfOrders[index].image}",
                                            width: 64,
                                          ),
                                          SizedBox(
                                            width: MediaQuery.of(context)
                                                    .size
                                                    .width /
                                                2,
                                            child: Text(
                                              value.listOfOrders[index].title,
                                              style: TextStyle(
                                                  color: mainColor,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                          ),
                                          Text(
                                            "${value.listOfOrders[index].amount} Stück",
                                            style: TextStyle(
                                                color: secondaryColor,
                                                fontWeight: FontWeight.bold),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ))),
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Row(
                          children: [
                            Text(
                              "Zahlungsart",
                              style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                      ),
                      // RadioGroup stores the selected payment method
                      RadioGroup<String>(
                        groupValue: value,
                        onChanged: (String? selected) {
                          setState(() {
                            value = selected;
                          });
                        },
                        child: ListView.builder(
                          shrinkWrap: true,
                          physics: NeverScrollableScrollPhysics(),
                          itemBuilder: (context, index) => ListTile(
                            title: Text(filteredUser[index]["paymentName"]),
                            leading: Radio<String>(
                              value: filteredUser[index]["paymentName"],
                            ),
                          ),
                          itemCount: filteredUser.length,
                        ),
                      ),
                      Consumer<AuthProvider>(
                          builder: (context, value, child) => MyButton(
                                buttonName: "Bestellung abschließen",
                                func: () {
                                  showDialog<String>(
                                      context: context,
                                      builder: (BuildContext context) =>
                                          AlertDialog(
                                            title: const Text(
                                              'Bestellung abschließen ?',
                                              style:
                                                  TextStyle(color: mainColor),
                                            ),
                                            content: const Text(
                                              'Bestellungen, die nach 12 Uhr eingehen, werden am nächsten Werktag versandt.',
                                              style: TextStyle(
                                                  color: secondaryColor),
                                            ),
                                            actions: <Widget>[
                                              TextButton(
                                                onPressed: () => Navigator.pop(
                                                    context, 'Cancel'),
                                                child: const Text(
                                                  'Abbrechen',
                                                  style: TextStyle(
                                                      color: mainColor),
                                                ),
                                              ),
                                              TextButton(
                                                onPressed: () => {
                                                  handleSendOrder(),
                                                  Navigator.pop(
                                                      context, 'Komplett'),
                                                },
                                                child: const Text(
                                                  'Abschließen',
                                                  style: TextStyle(
                                                      color: mainColor),
                                                ),
                                              ),
                                            ],
                                          ));
                                },
                                color: secondaryColor,
                              ))
                    ])))
            : CircularProgressIndicator());
  }
}
