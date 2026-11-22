import 'package:flutter/material.dart';
import 'package:snackki_coffee_app/utils/base_url.dart';
import 'package:snackki_coffee_app/utils/colors.dart';

class ProductDetail extends StatefulWidget {
  final String name;
  final String image;
  final int id;
  final String desc;
  const ProductDetail({
    super.key,
    required this.desc,
    required this.name,
    required this.image,
    required this.id,
  });

  @override
  State<ProductDetail> createState() => _ProductDetailState();
}

class _ProductDetailState extends State<ProductDetail> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
      children: <Widget>[
        SizedBox(
          height: 16,
        ),
        Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              IconButton(
                  icon: Icon(
                    Icons.arrow_back_ios,
                    color: secondaryColor,
                  ),
                  onPressed: () => Navigator.pop(context)),
              SizedBox(
                width: MediaQuery.of(context).size.width / 1.3,
                child: Text(
                  widget.name,
                  style: TextStyle(
                    color: secondaryColor,
                    fontSize: 25,
                  ),
                ),
              ),
            ],
          ),
        ),
        Image.network(
          "${ApiService.baseUrl}/images/${widget.image}",
          height: 200,
          fit: BoxFit.cover,
        ),
        Expanded(
          child: Container(
            padding: EdgeInsets.all(32),
            width: MediaQuery.of(context).size.width,
            decoration: BoxDecoration(
                color: fourthColor,
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(64),
                    topRight: Radius.circular(64))),
            child: SingleChildScrollView(
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                      width: MediaQuery.of(context).size.width / 1.3,
                      child: Text(
                        widget.name,
                        style: TextStyle(
                          color: primaryColor,
                          fontSize: 20,
                        ),
                      ),
                    ),
                    Divider(
                      color: primaryColor,
                    ),
                    Text(
                      "Details",
                      style: TextStyle(
                        color: primaryColor,
                        fontStyle: FontStyle.italic,
                        fontSize: 16,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    Text(
                      widget.desc,
                      style: TextStyle(
                        color: primaryColor,
                        fontStyle: FontStyle.italic,
                        fontSize: 16,
                      ),
                    ),
                  ]),
            ),
          ),
        ),
      ],
    ));
  }
}
