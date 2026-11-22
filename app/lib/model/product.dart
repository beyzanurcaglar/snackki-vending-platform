import 'dart:convert';

List<Product> productFromJson(str) =>
    List<Product>.from(json.decode(str).map((x) => Product.fromJson(x)));

String productToJson(List<Product> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Product {
  String category;
  String subCategory;
  String title;
  String image;
  String desc;
  int id;
  int productId;
  int cartoonAmount;
  int? amount;
  Product(
      {required this.category,
      required this.cartoonAmount,
      required this.productId,
      this.amount,
      required this.desc,
      required this.subCategory,
      required this.id,
      required this.title,
      required this.image});

  factory Product.fromJson(Map<String, dynamic> json) => Product(
      category: json["category"],
      cartoonAmount: json["cartoonAmount"],
      desc: json["desc"],
      subCategory: json["sub_category"],
      id: json["id"],
      title: json["title"],
      image: json["image"],
      productId: json["productId"]);

  Map<String, dynamic> toJson() => {
        "category": category,
        "cartoonAmount": cartoonAmount,
        "desc": desc,
        "subCategory": subCategory,
        "id": id,
        "title": title,
        "image": image,
        "productId": productId
      };
}
