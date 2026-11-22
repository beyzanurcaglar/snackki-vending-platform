import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:snackki_coffee_app/provider/basket.dart';
import 'package:snackki_coffee_app/screens/home/product_detail.dart';
import 'package:snackki_coffee_app/utils/base_url.dart';
import 'package:snackki_coffee_app/utils/colors.dart';
import 'package:snackki_coffee_app/widgets/add_card.dart';

class ProductCard extends StatefulWidget {
  final String title;
  final bool? isCatalog;
  final String image;
  final int id;
  final bool? isBasket;
  final String desc;
  final String category;
  final int productId;
  final int cartoonAmount;
  const ProductCard({
    super.key,
    this.isCatalog = false,
    required this.cartoonAmount,
    required this.productId,
    required this.category,
    required this.desc,
    required this.id,
    required this.image,
    required this.title,
    this.isBasket,
  });

  @override
  State<ProductCard> createState() => _ProductCardState();
}

class _ProductCardState extends State<ProductCard> {
  @override
  Widget build(BuildContext context) {
    var basket = Provider.of<BasketProvider>(context);
    return InkWell(
        onTap: () => Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => ProductDetail(
                desc: widget.desc,
                name: widget.title,
                image: widget.image,
                id: widget.id,
              ),
            )),
        child: Padding(
          padding: EdgeInsets.all(8),
          child: Container(
            padding: EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: primaryColor,
              borderRadius: BorderRadius.circular(borderRadius),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withValues(alpha: 0.5),
                  spreadRadius: 1,
                  blurRadius: 5,
                  offset: Offset(0, 3), // changes position of shadow
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: EdgeInsets.all(borderRadius),
                  child: Text(
                    widget.title.toUpperCase(),
                    style: TextStyle(
                      color: mainColor,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(borderRadius / 2),
                      ),
                      child: Image.network(
                        "${ApiService.baseUrl}/images/${widget.image}",
                        width: 100,
                        height: 100,
                        fit: BoxFit.cover,
                      ),
                    ),
                    widget.isCatalog == true
                        ? AddCard(
                            cartoonAmount: widget.cartoonAmount,
                            isBasket: widget.isBasket,
                            id: widget.id,
                            category: widget.category,
                            desc: widget.desc,
                            image: widget.image,
                            title: widget.title,
                            productId: widget.productId,
                          )
                        : widget.isBasket == true
                            ? Column(
                                children: [
                                  Text(
                                    'Menge: ${basket.listOfOrders.where((element) => element.productId == widget.productId).first.amount ?? 1}',
                                    style: TextStyle(
                                      color: mainColor,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  SizedBox(height: 8),
                                  Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      IconButton(
                                        icon: Icon(Icons.remove,
                                            color: mainColor),
                                        onPressed: () => basket
                                            .decrementAmount(widget.productId),
                                      ),
                                      IconButton(
                                        icon: Icon(Icons.add, color: mainColor),
                                        onPressed: () => basket
                                            .incrementAmount(widget.productId),
                                      ),
                                    ],
                                  ),
                                ],
                              )
                            : Container()
                  ],
                ),
              ],
            ),
          ),
        ));
  }
}
