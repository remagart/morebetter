import 'package:dio/dio.dart';
import 'package:get/get_state_manager/get_state_manager.dart';
import 'package:morebetter_flutter/app/data/models/base/api_result.dart';

class BaseApiProvider extends GetxService {
  late Dio _dio;

  Dio get dio => _dio;
  Map<String, dynamic> _headers = {};

  BaseOptions get defaultOptions => BaseOptions(
        baseUrl: "https://script.google.com/macros/s/",
        connectTimeout: 20 * 1000,
        receiveTimeout: 20 * 1000,
        sendTimeout: 20 * 1000,
        headers: _headers,
        responseType: ResponseType.json,
      );

  BaseApiProvider({BaseOptions? customOptions}) {
    _dio = Dio(customOptions ?? defaultOptions);
    // TODO: 攔截器??
  }

  @override
  void onClose() {
    super.onClose();
    _dio.close();
  }

  Future<ApiResult<T>> request<T>({
    required String method,
    required String path,
    Map<String, dynamic>? parameters,
    dynamic data,
    Options? options,
    required T Function(dynamic) decodeBody,
  }) async {
    try {
      final res = await _dio.request(
        path + "/exec",
        data: data,
        queryParameters: parameters,
        options: options?.copyWith(method: method) ?? Options(method: method),
      );
      return ApiResult<T>(
        responseCode: res.statusCode,
        responseMsg: res.statusMessage,
        data: decodeBody(res.data),
      );
    } on DioError catch (e) {
      return ApiResult<T>(
        errorMsg: e.message,
        responseCode: e.response?.statusCode,
        responseMsg: e.response?.statusMessage,
      );
    }
  }

  Future<ApiResult<T>> get<T>({
    required String path,
    Map<String, dynamic>? parameters,
    Options? options,
    required T Function(dynamic) decodeBody,
  }) async {
    return request(
        method: "GET",
        path: path,
        decodeBody: decodeBody,
        parameters: parameters,
        options: options);
  }
}
