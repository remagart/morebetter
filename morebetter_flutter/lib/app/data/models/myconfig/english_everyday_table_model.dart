import 'package:json_annotation/json_annotation.dart';

part 'english_everyday_table_model.g.dart';

@JsonSerializable()
class EnglishEverydayTableModel {
  @JsonKey(defaultValue: '')
  String startDay;

  EnglishEverydayTableModel({required this.startDay});

  factory EnglishEverydayTableModel.fromJson(Map<String, dynamic> json) =>
      _$EnglishEverydayTableModelFromJson(json);

  Map<String, dynamic> toJson() => _$EnglishEverydayTableModelToJson(this);
}
