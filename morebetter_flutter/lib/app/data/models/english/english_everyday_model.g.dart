// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'english_everyday_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

EnglishEverydayModel _$EnglishEverydayModelFromJson(
        Map<String, dynamic> json) =>
    EnglishEverydayModel(
      day: json['day'] as int? ?? -1,
      vocabulary: (json['vocabulary'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      sentences: (json['sentences'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
    );

Map<String, dynamic> _$EnglishEverydayModelToJson(
        EnglishEverydayModel instance) =>
    <String, dynamic>{
      'day': instance.day,
      'vocabulary': instance.vocabulary,
      'sentences': instance.sentences,
    };
