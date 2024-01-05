import 'package:morebetter_flutter/app/data/models/base/api_result.dart';
import 'package:morebetter_flutter/app/data/models/base/base_response_model.dart';
import 'package:morebetter_flutter/app/data/models/myconfig/english_everyday_table_model.dart';
import 'package:morebetter_flutter/app/data/models/myconfig/myconfig_model.dart';
import 'package:morebetter_flutter/app/data/providers/apis/base_api_provider.dart';

class MyConfigApiProvider {
  final apiProvider = BaseApiProvider();

  // Future<ApiResult<BaseResponseModel<List<EnglishEverydayTableModel>>>>
  //     getMyConfigEnglishEveryday() async {
  //   return apiProvider.get(
  //       path: "AKfycbzpUKJRb-ttXemgwrfNEZYgQ008bf8pUU-_ChvUc2GEc4MMxxhU",
  //       decodeBody: (json) {
  //         return BaseResponseModel.fromJson(json, (dataJson) {
  //           // final myData = MyconfigModel.fromJson(dataJson);
  //           // final myData = dataJson as List;
  //           // MyconfigModel mytables = <MyconfigModel>myData.

  //           // List<MyconfigModel> mytables =
  //           //     myData.map((item) => MyconfigModel.fromJson(item)).toList();
  //           // return mytables
  //           //     .map((item) => EnglishEverydayTableModel.fromJson(item))
  //           //     .toList();
  //         });
  //       });
  // }
}
