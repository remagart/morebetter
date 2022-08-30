import 'package:get/instance_manager.dart';
import 'package:morebetter_flutter/app/data/providers/apis/english_every_api_provider.dart';
import 'package:morebetter_flutter/app/modules/english/forgetting_curve/fc_overview/fc_overview_controller.dart';

class FcOverviewBindings extends Bindings {
  @override
  void dependencies() {
    // TODO: 使用put就沒辦法？
    Get.lazyPut(() => EnglishEverydayApiProvider());
    Get.lazyPut(() => FcOverviewController());
  }
}
