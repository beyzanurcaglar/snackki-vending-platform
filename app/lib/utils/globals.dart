import 'package:another_flushbar/flushbar.dart';
import 'package:flutter/material.dart';

void showSnackBar(
        BuildContext context, String text, Color color, String title) =>
    Flushbar(
      backgroundColor: color,
      message: text,
      title: title,
      duration: Duration(seconds: 2),
      flushbarPosition: FlushbarPosition.TOP,
      padding: EdgeInsets.all(12),
    )..show(context);
