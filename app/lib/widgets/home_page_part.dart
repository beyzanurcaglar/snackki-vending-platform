import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:snackki_coffee_app/model/user.dart';
import 'package:snackki_coffee_app/provider/auth.dart';
import 'package:snackki_coffee_app/utils/base_url.dart';
import 'package:snackki_coffee_app/widgets/product_card.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class HomePagePart extends StatefulWidget {
  const HomePagePart({super.key});

  @override
  State<HomePagePart> createState() => _HomePagePartState();
}

class _HomePagePartState extends State<HomePagePart> {
  User? user;
  List? products;
  List<dynamic> filteredUser = [];
  bool grouped = false;
  bool _isDisposed = false;

  @override
  void dispose() {
    _isDisposed = true;
    super.dispose();
  }

  // Fetch content from the json file
  Future<void> fetchProduct() async {
    final response = await ApiService.getRequest("users/${user?.id}");
    products = jsonDecode(response.body);
    filteredUser = groupData(products!);
    if (!_isDisposed) {
      setState(() {
        grouped = true;
      });
    }
  }

  Future<void> getUser(BuildContext context) async {
    var token = await Provider.of<AuthProvider>(context, listen: false)
        .getTokenFromSharedPref();
    var decoded = JwtDecoder.decode(token);
    var userDecoded = decoded["user"];
    user = User.fromJson(userDecoded);
  }

  List<dynamic> groupData(List<dynamic> data) {
    List<dynamic> groupedData = [];

    for (var i = 0; i < data.length; i++) {
      int productId = data[i]['productId'];
      String title = data[i]['title'];
      int cartoonAmount = data[i]['cartoonAmount'];
      String image = data[i]['image'];
      String desc = data[i]['desc'];
      String categoryName = data[i]['categoryName'];
      var found = groupedData.firstWhere(
        (product) => product['productId'] == productId,
        orElse: () => null,
      );
      if (found == null) {
        groupedData.add({
          'productId': productId,
          'title': title,
          'cartoonAmount': cartoonAmount,
          'image': image,
          'desc': desc,
          'categoryName': categoryName,
        });
      }
    }

    return groupedData;
  }

  Future<void> getUserAndFetchProduct() async {
    await getUser(context);
    if (!_isDisposed) {
      await fetchProduct();
    }
  }

  @override
  void initState() {
    super.initState();
    getUserAndFetchProduct();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (grouped == true) ...[
          ListView.builder(
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            itemCount: filteredUser.length,
            itemBuilder: (context, index) {
              return ProductCard(
                cartoonAmount: filteredUser[index]["cartoonAmount"],
                isCatalog: true,
                productId: filteredUser[index]["productId"],
                title: filteredUser[index]["title"],
                id: 1,
                image: filteredUser[index]["image"],
                category: filteredUser[index]["categoryName"],
                desc: filteredUser[index]["desc"],
              );
            },
          )
        ]
      ],
    );
  }
}
