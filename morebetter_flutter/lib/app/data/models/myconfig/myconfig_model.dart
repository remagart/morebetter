import 'package:json_annotation/json_annotation.dart';

part 'myconfig_model.g.dart';

@JsonSerializable()
class MyconfigModel {
  MyconfigModel? englishEveryday;

  MyconfigModel({this.englishEveryday});

  factory MyconfigModel.fromJson(Map<String, dynamic> json) =>
      _$MyconfigModelFromJson(json);

  Map<String, dynamic> toJson() => _$MyconfigModelToJson(this);
}
