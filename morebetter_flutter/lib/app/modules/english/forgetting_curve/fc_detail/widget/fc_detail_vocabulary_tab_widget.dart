import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:morebetter_flutter/app/modules/english/forgetting_curve/fc_detail/utils/on_tap_handler.dart';
import 'package:morebetter_flutter/core/utils/string_helper.dart';
import 'package:morebetter_flutter/core/values/colors.dart';
import 'package:url_launcher/url_launcher.dart';
import '../utils/slidable_action_tools.dart';

class FcDetailVocabularyTabWidget extends StatelessWidget {
  final List wordData;
  const FcDetailVocabularyTabWidget({Key? key, required this.wordData})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
        shrinkWrap: true,
        itemCount: wordData.length,
        separatorBuilder: (context, index) => Divider(
              indent: 16,
              endIndent: 16,
              thickness: 1,
              height: 0,
            ),
        itemBuilder: ((context, index) => Slidable(
              endActionPane: ActionPane(
                motion: DrawerMotion(),
                children: [
                  goGoogleTranslate(wordData[index]),
                  goMadarinDictionary(wordData[index])
                ],
              ),
              child: ListTile(
                onTap: () => OnTapHandler.copyText_toast(wordData[index]),
                onLongPress: () =>
                    OnTapHandler.goOxfordDictionary(wordData[index]),
                title: Text("${index + 1}. ${wordData[index]}"),
                trailing: Icon(
                  Icons.copy,
                  size: 20,
                ),
              ),
            )));
  }
}
