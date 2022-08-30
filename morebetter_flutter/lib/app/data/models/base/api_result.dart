class ApiResult<T> {
  final int? responseCode;
  final String? responseMsg;
  final T? data; // TODO: 為何專案上不用final呢
  final int? errorCode;
  final String? errorMsg;

  ApiResult({
    this.responseCode,
    this.responseMsg,
    this.data,
    this.errorCode,
    this.errorMsg,
  });
}
