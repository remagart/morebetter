import 'package:json_annotation/json_annotation.dart';

part 'english_everyday_model.g.dart';

@JsonSerializable()
class EnglishEverydayModel {
  @JsonKey(defaultValue: -1)
  int day;
  @JsonKey(defaultValue: [])
  List<String> vocabulary;
  @JsonKey(defaultValue: [])
  List<String> sentences;

  EnglishEverydayModel(
      {required this.day, required this.vocabulary, required this.sentences});

  factory EnglishEverydayModel.fromJson(Map<String, dynamic> json) =>
      _$EnglishEverydayModelFromJson(json);

  Map<String, dynamic> toJson() => _$EnglishEverydayModelToJson(this);
}
