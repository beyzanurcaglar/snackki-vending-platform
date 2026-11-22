import 'package:flutter/material.dart';
import 'package:snackki_coffee_app/utils/colors.dart';

class TextFieldInput extends StatelessWidget {
  final TextEditingController textEditingController;
  final bool isPass;
  final String hintText;
  final TextInputType textInputType;
  final IconData? icon;
  final IconData? suffixIcon;
  final bool? multiLine;
  final double radius;
  const TextFieldInput({
    super.key,
    this.icon,
    this.suffixIcon,
    required this.radius,
    this.multiLine,
    required this.textEditingController,
    this.isPass = false,
    required this.hintText,
    required this.textInputType,
  });

  @override
  Widget build(BuildContext context) {
    Size sizeMedia;
    double width;
    sizeMedia = MediaQuery.of(context).size;
    width = sizeMedia.width;
    final inputBorder = OutlineInputBorder(
        borderSide: Divider.createBorderSide(context),
        borderRadius: BorderRadius.circular(radius));

    return TextFormField(
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Sie können es nicht leer lassen..';
        }
        return null;
      },
      controller: textEditingController,
      decoration: InputDecoration(
        fillColor: fifthColor,
        suffixIcon:
            suffixIcon != null ? Icon(suffixIcon, color: fifthColor) : null,
        prefixIcon: icon != null
            ? Container(
                padding: EdgeInsets.all(borderRadius),
                margin: EdgeInsets.only(right: borderRadius),
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(borderRadius),
                    color: fourthColor),
                child: Icon(
                  icon,
                  color: primaryColor,
                ),
              )
            : null,
        hintStyle: TextStyle(color: primaryColor),
        hintText: hintText,
        border: inputBorder,
        focusedBorder: inputBorder,
        enabledBorder: inputBorder,
        filled: true,
        contentPadding: EdgeInsets.all(width / 25),
      ),
      minLines: multiLine == true ? 5 : 1,
      maxLines: multiLine == true ? 10 : 1,
      keyboardType: textInputType,
      obscureText: isPass,
    );
  }
}
