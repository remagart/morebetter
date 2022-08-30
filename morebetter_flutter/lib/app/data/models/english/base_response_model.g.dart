// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'base_response_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

BaseResponseModel<T> _$BaseResponseModelFromJson<T>(
  Map<String, dynamic> json,
  T Function(Object? json) fromJsonT,
) =>
    BaseResponseModel<T>(
      status: json['status'] as String? ?? '',
      version: json['version'] as String? ?? '',
      data: fromJsonT(json['data']),
    );

Map<String, dynamic> _$BaseResponseModelToJson<T>(
  BaseResponseModel<T> instance,
  Object? Function(T value) toJsonT,
) =>
    <String, dynamic>{
      'status': instance.status,
      'version': instance.version,
      'data': toJsonT(instance.data),
    };
