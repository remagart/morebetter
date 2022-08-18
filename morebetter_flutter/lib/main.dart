import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '/app/bindings/home_binding.dart';
import '/app/routes/app_pages.dart';
import '/app/translations/app_translations.dart';

import 'app/ui/android/home/home_page.dart';
import 'app/ui/theme/app_theme.dart';

void main() {
  runApp(GetMaterialApp(
    debugShowCheckedModeBanner: false,
    initialRoute: Routes.INITIAL,
    theme: appThemeData,
    defaultTransition: Transition.fade,
    getPages: AppPages.pages,
    locale: Locale('pt', 'BR'),
    translationsKeys: AppTranslation.translations,
  ));
}
