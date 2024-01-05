import 'package:morebetter_flutter/app/data/models/base/api_result.dart';
import 'package:morebetter_flutter/app/data/models/english/english_everyday_model.dart';
import 'package:morebetter_flutter/app/data/providers/apis/base_api_provider.dart';

import '../../models/base/base_response_model.dart';

class EnglishEverydayApiProvider {
  final apiProvider = BaseApiProvider();

  Future<ApiResult<BaseResponseModel<List<EnglishEverydayModel>>?>>
      getEnglishEverydayData() async {
    return apiProvider.get(
        path: "AKfycbx1XmJyNfATXf3YPpJRLgevnSjiIPzP4N_wDp89vw6ftKg-bzk",
        decodeBody: (json) {
          return BaseResponseModel.fromJson(json, (dataJson) {
            final myData = dataJson as List;
            return myData.map((e) => EnglishEverydayModel.fromJson(e)).toList();
          });
          final mydata = json['data'] as List?;
          // return mydata
          //     ?.map((item) => EnglishEverydayModel.fromJson(item))
          //     .toList();
        });
  }
}
