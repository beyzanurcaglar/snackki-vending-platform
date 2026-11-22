import 'package:flutter/material.dart';
import 'package:snackki_coffee_app/utils/colors.dart';

class MyButton extends StatefulWidget {
  final String buttonName;
  final Function() func;
  final Color? color;
  const MyButton(
      {super.key, required this.buttonName, required this.func, this.color});

  @override
  State<MyButton> createState() => _MyButtonState();
}

class _MyButtonState extends State<MyButton> {
  @override
  Widget build(BuildContext context) {
    Size sizeMedia;
    double width;
    sizeMedia = MediaQuery.of(context).size;
    width = sizeMedia.width;
    return InkWell(
        onTap: widget.func,
        child: Container(
          width: double.infinity,
          alignment: Alignment.center,
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: widget.color ?? mainColor,
            borderRadius: BorderRadius.circular(borderRadius),
          ),
          child: Text(
            widget.buttonName,
            style: TextStyle(
                fontSize: width / 25,
                color: primaryColor,
                fontWeight: FontWeight.bold),
          ),
        ));
  }
}
