import 'package:json_annotation/json_annotation.dart';

part 'base_response_model.g.dart';

@JsonSerializable(genericArgumentFactories: true)
class BaseResponseModel<T> {
  @JsonKey(defaultValue: '')
  String status;
  @JsonKey(defaultValue: '')
  String version;
  T data;

  BaseResponseModel(
      {required this.status, required this.version, required this.data});

  factory BaseResponseModel.fromJson(
          Map<String, dynamic> json, T Function(Object? json) fun) =>
      _$BaseResponseModelFromJson(json, fun);

  Map<String, dynamic> toJson(data) => _$BaseResponseModelToJson(this, data);
}
