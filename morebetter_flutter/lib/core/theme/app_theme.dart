import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:morebetter_flutter/core/theme/text_theme.dart';
import 'package:morebetter_flutter/core/values/colors.dart';

final ThemeData AppTheme = ThemeData.light().copyWith(
    scaffoldBackgroundColor: colorScaffoldBgColor,
    appBarTheme: const AppBarTheme(
      backgroundColor: colorAppBar,
      foregroundColor: colorAppBarTitle,
      elevation: 0,
    ),
    colorScheme: lightColorScheme,
    textTheme: appTextTheme);
