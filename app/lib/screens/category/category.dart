import 'package:flutter/material.dart';
import 'package:snackki_coffee_app/model/product.dart';
import 'package:snackki_coffee_app/utils/base_url.dart';
import 'package:snackki_coffee_app/widgets/product_card.dart';

class Category extends StatefulWidget {
  final String pageName;
  const Category({super.key, required this.pageName});

  @override
  State<Category> createState() => _CategoryState();
}

class _CategoryState extends State<Category> {
  List<Product> _products = [];

// Fetch content from the json file
  Future<void> fetchProduct() async {
    final response = await ApiService.getRequest("products");

    final data = productFromJson(response.body);

    setState(() {
      _products =
          data.where((product) => product.category == widget.pageName).toList();
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchProduct();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
            child: Column(children: [
      Column(
        children: [
          SizedBox(
            height: 32,
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: Icon(Icons.arrow_back_ios)),
                Text(
                  widget.pageName,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 25,
                  ),
                ),
              ],
            ),
          ),
          _products.isNotEmpty
              ? ListView.builder(
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  itemCount: _products.length,
                  itemBuilder: (context, index) {
                    return ProductCard(
                      cartoonAmount: _products[index].cartoonAmount,
                      productId: _products[index].productId,
                      title: _products[index].title,
                      id: _products[index].id,
                      image: _products[index].image,
                      category: _products[index].category,
                      desc: _products[index].desc,
                    );
                  },
                )
              : Container()
        ],
      ),
    ])));
  }
}
