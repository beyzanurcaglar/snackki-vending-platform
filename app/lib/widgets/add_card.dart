import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:snackki_coffee_app/provider/basket.dart';
import 'package:snackki_coffee_app/utils/colors.dart';

class AddCard extends StatefulWidget {
  final String title;
  final String image;
  final int id;
  final bool? isBasket;
  final String desc;
  final String category;
  final int productId;
  final int cartoonAmount;
  const AddCard({
    super.key,
    required this.cartoonAmount,
    required this.id,
    required this.image,
    required this.title,
    this.isBasket,
    required this.productId,
    required this.category,
    required this.desc,
  });

  @override
  State<AddCard> createState() => _AddCardState();
}

class _AddCardState extends State<AddCard> {
  var itemCount = 0;
  var total = 0;
  var bool = false;
  @override
  Widget build(BuildContext context) {
    var basket = Provider.of<BasketProvider>(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(borderRadius),
              color: thirdColor),
          padding: EdgeInsets.all(4),
          child: Row(
            children: [
              Container(
                margin: EdgeInsets.only(right: 16, left: 2),
                child: InkWell(
                    onTap: () {
                      widget.isBasket == true
                          ? setState(() {
                              basket.decrementAmount(widget.productId);
                            })
                          : setState(() {
                              if (itemCount > 0) {
                                itemCount -= 1;
                                if (bool) {
                                  total = itemCount * widget.cartoonAmount;
                                } else {
                                  total = itemCount;
                                }
                              }
                            });
                    },
                    child: Container(
                        width: 30,
                        height: 30,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(borderRadius),
                            color: secondaryColor),
                        child: Text(
                          "-",
                          style: TextStyle(color: primaryColor, fontSize: 18),
                        ))),
              ),
              SizedBox(
                width: 10,
              ),
              widget.isBasket == true
                  ? SizedBox(
                      width: 20,
                      child: Align(
                        alignment: Alignment.center,
                        child: Text(
                          (basket.listOfOrders.where((element) =>
                                  element.productId == widget.productId))
                              .toList()
                              .first
                              .amount
                              .toString(),
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                              color: mainColor),
                        ),
                      ),
                    )
                  : SizedBox(
                      width: 20,
                      child: Align(
                        alignment: Alignment.center,
                        child: Text(
                          itemCount.toString(),
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                              color: mainColor),
                        ),
                      ),
                    ),
              SizedBox(
                width: 10,
              ),
              Container(
                margin: EdgeInsets.only(left: 16, right: 2),
                child: InkWell(
                    onTap: () {
                      widget.isBasket == true
                          ? setState(() {
                              basket.incrementAmount(widget.productId);
                            })
                          : setState(() {
                              itemCount += 1;
                              if (bool) {
                                total = itemCount * widget.cartoonAmount;
                              } else {
                                total = itemCount;
                              }
                            });
                    },
                    child: Container(
                        alignment: Alignment.center,
                        width: 30,
                        height: 30,
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(borderRadius),
                            color: secondaryColor),
                        child: Text(
                          "+",
                          style: TextStyle(color: primaryColor, fontSize: 18),
                        ))),
              ),
              widget.isBasket == true
                  ? InkWell(
                      onTap: () => basket.decrementBasket(widget.productId),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 8, right: 2),
                        child: Icon(Icons.delete, color: secondaryColor),
                      ))
                  : Container()
            ],
          ),
        ),
        SizedBox(
          height: 10,
        ),
        Padding(
            padding: const EdgeInsets.all(8.0),
            child: widget.isBasket == true
                ? Row(
                    children: [
                      Text(
                        "Gesamt ",
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      SizedBox(
                          width: 20,
                          child: Align(
                            alignment: Alignment.center,
                            child: Text(
                              (basket.listOfOrders.where((element) =>
                                      element.productId == widget.productId))
                                  .toList()
                                  .first
                                  .amount
                                  .toString(),
                              style: TextStyle(fontWeight: FontWeight.bold),
                            ),
                          )),
                      Text(
                        " Stück",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                      )
                    ],
                  )
                : Row(
                    children: [
                      Text(
                        "Gesamt ",
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      SizedBox(
                        width: 20,
                        child: Align(
                            alignment: Alignment.center,
                            child: Text(
                              total.toString(),
                              style: TextStyle(fontWeight: FontWeight.bold),
                            )),
                      ),
                      Text(
                        " Stück",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                      )
                    ],
                  )),
        widget.isBasket == true
            ? Container()
            : Row(
                children: [
                  InkWell(
                    onTap: () {
                      setState(() {
                        bool = !bool;
                        if (bool) {
                          total = itemCount * widget.cartoonAmount;
                        } else {
                          total = itemCount;
                        }
                      });
                    },
                    child: Container(
                        padding: EdgeInsets.all(8),
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(borderRadius),
                            color: secondaryColor),
                        child: Row(
                          children: [
                            SizedBox(
                              height: 18.0,
                              width: 18.0,
                              child: Checkbox(
                                fillColor:
                                    WidgetStateProperty.resolveWith<Color>(
                                        (Set<WidgetState> states) {
                                  if (states.contains(WidgetState.disabled)) {
                                    return primaryColor;
                                  }
                                  return fifthColor;
                                }),
                                checkColor: primaryColor,
                                value: bool,
                                onChanged: (value) {
                                  setState(() {
                                    bool = value!;
                                    if (bool) {
                                      total = itemCount * widget.cartoonAmount;
                                    } else {
                                      total = itemCount;
                                    }
                                  });
                                },
                              ),
                            ),
                            SizedBox(
                              width: 5,
                            ),
                            Text(
                              "Packung",
                              style:
                                  TextStyle(color: primaryColor, fontSize: 12),
                            ),
                          ],
                        )),
                  ),
                  SizedBox(
                    width: 5,
                  ),
                  InkWell(
                    onTap: () {
                      if (itemCount > 0) {
                        if (basket.listOfOrders
                            .where((element) =>
                                element.productId == widget.productId)
                            .isNotEmpty) {
                          basket.listOfOrders
                              .firstWhere((element) =>
                                  element.productId == widget.productId)
                              .amount = basket.listOfOrders
                                  .firstWhere((element) =>
                                      element.productId == widget.productId)
                                  .amount!
                                  .toInt() +
                              total;
                          setState(() {
                            itemCount = 0;
                            total = 0;
                            bool = false;
                          });
                        } else {
                          basket.incrementBasket(
                              widget.cartoonAmount,
                              widget.title,
                              widget.image,
                              widget.id,
                              widget.productId,
                              total,
                              widget.desc,
                              widget.category);
                          setState(() {
                            itemCount = 0;
                            total = 0;
                            bool = false;
                          });
                        }
                      }
                    },
                    child: Container(
                        padding: EdgeInsets.all(8),
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(borderRadius),
                            color: secondaryColor),
                        child: Text(
                          "Zum Warenkorb",
                          style: TextStyle(color: primaryColor, fontSize: 12),
                        )),
                  ),
                ],
              ),
      ],
    );
  }
}
