import 'package:flutter_test/flutter_test.dart';
import 'package:morebetter_flutter/app/data/providers/apis/english_every_api_provider.dart';

void main() {
  test('test1', () async {
    final apiProvider = EnglishEverydayApiProvider();
    final res = await apiProvider.getEnglishEverydayData();
    expect(res.responseCode, 200);
  });
}
