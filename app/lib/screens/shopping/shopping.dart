// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:snackki_coffee_app/provider/basket.dart';
import 'package:snackki_coffee_app/screens/shopping/checkout.dart';
import 'package:snackki_coffee_app/utils/colors.dart';
import 'package:snackki_coffee_app/utils/globals.dart';
import 'package:snackki_coffee_app/widgets/my_button.dart';
import 'package:snackki_coffee_app/widgets/product_card.dart';

class ShoppingPage extends StatefulWidget {
  const ShoppingPage({super.key});

  @override
  State<ShoppingPage> createState() => _ShoppingPageState();
}

class _ShoppingPageState extends State<ShoppingPage> {
  @override
  Widget build(BuildContext context) {
    Size sizeMedia;
    double height, width;
    sizeMedia = MediaQuery.of(context).size;
    height = sizeMedia.height;
    width = sizeMedia.width;
    var basket = Provider.of<BasketProvider>(context);

    return Scaffold(
      body: SingleChildScrollView(
          child: Column(children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "Warenkorb",
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 25,
                ),
              ),
              Text(
                "Gesamt: ${basket.listOfOrders.fold(0, (sum, item) => sum + (item.amount ?? 1))} Produkte",
                style: TextStyle(
                  color: mainColor,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
        basket.listOfOrders.isNotEmpty
            ? Consumer<BasketProvider>(
                builder: (context, value, child) => ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    scrollDirection: Axis.vertical,
                    itemCount: value.listOfOrders.length,
                    itemBuilder: (context, index) => ProductCard(
                          isCatalog: false,
                          isBasket: true,
                          cartoonAmount:
                              value.listOfOrders[index].cartoonAmount,
                          productId: value.listOfOrders[index].productId,
                          id: value.listOfOrders[index].id,
                          image: value.listOfOrders[index].image,
                          title: value.listOfOrders[index].title,
                          category: value.listOfOrders[index].category,
                          desc: value.listOfOrders[index].desc,
                        )))
            : Container(
                padding: EdgeInsets.all(height / 40),
                margin: EdgeInsets.symmetric(
                    horizontal: width / 15, vertical: height / 13.5),
                child: Text(
                  "Ihr Warenkorb ist leer!",
                  style:
                      TextStyle(fontWeight: FontWeight.bold, color: mainColor),
                )),
        Container(
            padding: EdgeInsets.all(height / 40),
            margin: EdgeInsets.symmetric(horizontal: width / 15),
            width: width,
            child: Column(children: [
              MyButton(
                  buttonName: "Zur Bestellung",
                  func: () => basket.listOfOrders.isNotEmpty
                      ? Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => Checkout(),
                          ))
                      : showSnackBar(context, "Ihr Warenkorb ist leer!",
                          secondaryColor, "Leerer Warenkorb")),
              SizedBox(
                height: height / 50,
              ),
              MyButton(
                color: fifthColor,
                buttonName: "Warenkorb leeren",
                func: () => basket.listOfOrders.isNotEmpty
                    ? basket.clearBasket()
                    : showSnackBar(context, "Der Warenkorb ist bereits leer.",
                        secondaryColor, "Warenkorb leeren"),
              ),
            ])),
      ])),
    );
  }
}
