import 'package:get/route_manager.dart';
import 'package:morebetter_flutter/app/modules/home/home_page.dart';

part 'app_routes.dart';

abstract class AppPages {
  static final rootPages = [
    GetPage(name: AppRoutes.home, page: () => const HomePage())
  ];
}
