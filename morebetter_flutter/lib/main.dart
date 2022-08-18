import 'package:flutter/material.dart';
import 'package:get/route_manager.dart';
import 'package:morebetter_flutter/app/routes/app_pages.dart';

void main() {
  runApp(GetMaterialApp(
    initialRoute: AppRoutes.home,
    getPages: AppPages.rootPages,
  ));
}
