import 'package:flutter/material.dart';
import 'package:get/route_manager.dart';
import 'package:morebetter_flutter/app/routes/app_pages.dart';
import 'package:morebetter_flutter/core/theme/app_theme.dart';

void main() {
  runApp(GetMaterialApp(
    theme: AppTheme,
    initialRoute: AppRoutes.english,
    getPages: AppPages.rootPages,
  ));
}
