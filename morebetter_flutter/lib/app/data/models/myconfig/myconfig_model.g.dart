// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'myconfig_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

MyconfigModel _$MyconfigModelFromJson(Map<String, dynamic> json) =>
    MyconfigModel(
      englishEveryday: json['englishEveryday'] == null
          ? null
          : MyconfigModel.fromJson(
              json['englishEveryday'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$MyconfigModelToJson(MyconfigModel instance) =>
    <String, dynamic>{
      'englishEveryday': instance.englishEveryday,
    };
