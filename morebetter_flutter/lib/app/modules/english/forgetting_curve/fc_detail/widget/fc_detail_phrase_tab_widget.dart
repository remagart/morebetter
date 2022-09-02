import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:morebetter_flutter/app/modules/english/forgetting_curve/fc_detail/utils/on_tap_handler.dart';
import 'package:morebetter_flutter/app/modules/english/forgetting_curve/fc_detail/utils/slidable_action_tools.dart';

class FcDetailPhraseTabWidget extends StatelessWidget {
  final List sentenceList;
  const FcDetailPhraseTabWidget({Key? key, required this.sentenceList})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
        itemBuilder: ((context, index) => ListTile(
              onTap: () => OnTapHandler.copyText_toast(sentenceList[index]),
              onLongPress: () =>
                  OnTapHandler.goGoogleTranslate(sentenceList[index]),
              title: Text("${index + 1}. ${sentenceList[index]}"),
            )),
        separatorBuilder: ((context, index) => Divider(
              indent: 16,
              endIndent: 16,
              thickness: 1,
              height: 0,
            )),
        itemCount: sentenceList.length);
  }
}
