import 'package:flutter/material.dart';
import 'package:snackki_coffee_app/model/product.dart';

class BasketProvider extends ChangeNotifier {
  List<Product> listOfOrders = [];

  void incrementBasket(
    int cartoonAmount,
    String title,
    String image,
    int id,
    int productId,
    int amount,
    String desc,
    String category,
  ) {
    // Check if product already exists in basket by productId
    var existingProductIndex =
        listOfOrders.indexWhere((element) => element.productId == productId);

    // Use the quantity selected on the product card (at least 1)
    final quantity = amount > 0 ? amount : 1;

    if (existingProductIndex != -1) {
      // If product exists, add the selected quantity
      listOfOrders[existingProductIndex].amount =
          (listOfOrders[existingProductIndex].amount ?? 0) + quantity;
    } else {
      // If product doesn't exist, add new product
      listOfOrders.add(Product(
          cartoonAmount: cartoonAmount,
          category: category,
          title: title,
          image: image,
          desc: desc,
          amount: quantity,
          id: productId, // Use productId as unique identifier
          productId: productId,
          subCategory: ""));
    }

    notifyListeners();
  }

  void decrementBasket(int productId) {
    if (listOfOrders.isNotEmpty) {
      listOfOrders.removeWhere((element) => element.productId == productId);
    }
    notifyListeners();
  }

  void decrementAmount(int productId) {
    var productIndex =
        listOfOrders.indexWhere((element) => element.productId == productId);
    if (productIndex != -1) {
      if ((listOfOrders[productIndex].amount ?? 0) > 1) {
        listOfOrders[productIndex].amount =
            (listOfOrders[productIndex].amount ?? 0) - 1;
      } else {
        listOfOrders.removeAt(productIndex);
      }
      notifyListeners();
    }
  }

  void incrementAmount(int productId) {
    var productIndex =
        listOfOrders.indexWhere((element) => element.productId == productId);
    if (productIndex != -1) {
      listOfOrders[productIndex].amount =
          (listOfOrders[productIndex].amount ?? 0) + 1;
      notifyListeners();
    }
  }

  void clearBasket() {
    listOfOrders.clear();
    notifyListeners();
  }
}
