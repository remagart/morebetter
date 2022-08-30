import 'package:get/get_state_manager/get_state_manager.dart';
import 'package:get/get.dart';
import 'package:morebetter_flutter/app/data/models/english/english_everyday_model.dart';
import 'package:morebetter_flutter/app/data/providers/apis/base_api_provider.dart';
import 'package:morebetter_flutter/app/data/providers/apis/english_every_api_provider.dart';

class FcOverviewController extends GetxController {
  final englishEveryApiProvider = Get.find<EnglishEverydayApiProvider>();
  final RxList<EnglishEverydayModel> englishEverydayList =
      <EnglishEverydayModel>[].obs;

  Future<void> fetchEnglishEveryday() async {
    final res = await englishEveryApiProvider.getEnglishEverydayData();
    if (res.responseCode == 200) {
      englishEverydayList.addAll(res.data?.data ?? []);
    }
  }

  @override
  void onInit() async {
    // TODO: implement onInit
    super.onInit();
    await fetchEnglishEveryday();
  }

  @override
  void onReady() {
    // TODO: implement onReady
    super.onReady();
  }

  @override
  void onClose() {
    // TODO: implement onClose
    super.onClose();
  }
}
