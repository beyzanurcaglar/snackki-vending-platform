import 'package:flutter/material.dart';
import 'package:snackki_coffee_app/screens/home/product_detail.dart';
import 'package:snackki_coffee_app/utils/base_url.dart';
import 'package:snackki_coffee_app/utils/colors.dart';

class MyCard extends StatelessWidget {
  final String title;
  final String image;
  final int id;
  final String desc;
  const MyCard(
      {super.key,
      required this.id,
      required this.image,
      required this.title,
      required this.desc});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) =>
                ProductDetail(name: title, image: image, id: id, desc: desc),
          )),
      child: Container(
        width: 150,
        margin: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: primaryColor,
          boxShadow: [
            BoxShadow(
                blurRadius: 2,
                color: greyColor,
                spreadRadius: 2,
                offset: Offset(0, 1))
          ],
          borderRadius: BorderRadius.circular(borderRadius),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(borderRadius),
                topRight: Radius.circular(borderRadius),
              ),
              child: Image.network(
                "${ApiService.baseUrl}/images/$image",
                height: 140,
                width: 140,
                fit: BoxFit.cover,
              ),
            ),
            Padding(
                padding: const EdgeInsets.symmetric(
                  vertical: 16,
                ),
                child: Text(
                  title,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: mainColor,
                    fontSize: 16,
                  ),
                ))
          ],
        ),
      ),
    );
  }
}
