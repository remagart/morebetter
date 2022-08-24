import 'package:flutter/material.dart';

final TextTheme appTextTheme = ThemeData.light().textTheme.copyWith(
      headline3: fontH3,
      headline4: fontH4,
      bodyText1: fontbody1,
      bodyText2: fontbody2,
    );

final TextStyle fontH3 = ThemeData.light().textTheme.headline3!.copyWith(
      fontSize: 21,
      height: 1.3,
    );
final TextStyle fontH4 = ThemeData.light().textTheme.headline4!.copyWith(
      fontSize: 18,
      height: 1.3,
    );
final TextStyle fontbody1 = ThemeData.light().textTheme.bodyText1!.copyWith(
      fontSize: 15,
      height: 1.3,
    );
final TextStyle fontbody2 = ThemeData.light().textTheme.bodyText2!.copyWith(
      fontSize: 13,
      height: 1.3,
    );
