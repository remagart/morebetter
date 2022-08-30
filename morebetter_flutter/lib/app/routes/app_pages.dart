import 'package:get/route_manager.dart';
import 'package:morebetter_flutter/app/modules/english/english_page.dart';
import 'package:morebetter_flutter/app/modules/english/forgetting_curve/fc_detail/fc_detail_page.dart';
import 'package:morebetter_flutter/app/modules/english/forgetting_curve/fc_overview/fc_overview_binding.dart';
import 'package:morebetter_flutter/app/modules/english/forgetting_curve/fc_overview/fc_overview_page.dart';
import 'package:morebetter_flutter/app/modules/home/home_page.dart';
import 'package:morebetter_flutter/app/modules/login/login_page.dart';

part 'app_routes.dart';

abstract class AppPages {
  static final rootPages = [
    GetPage(name: AppRoutes.home, page: () => const HomePage()),
    GetPage(name: AppRoutes.english, page: () => const EnglishPage()),
    GetPage(name: AppRoutes.login, page: () => const LoginPage()),
    GetPage(
        name: AppRoutes.fcOverview,
        page: () => const FCOverviewPage(),
        binding: FcOverviewBindings()),
    GetPage(name: AppRoutes.fcDetail, page: () => FCDetailPage())
  ];
}
