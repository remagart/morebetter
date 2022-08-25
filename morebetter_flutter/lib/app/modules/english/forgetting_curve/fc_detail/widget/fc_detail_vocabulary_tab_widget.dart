import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:morebetter_flutter/core/values/colors.dart';

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
                  SlidableAction(
                    onPressed: (context) {
                      print("xxx");
                    },
                    backgroundColor: Color(0xFF7BC043),
                    foregroundColor: lightColorScheme.onPrimaryContainer,
                    icon: Icons.language,
                    label: 'Google',
                  ),
                  SlidableAction(
                    onPressed: (context) {
                      print("xxxyyy");
                    },
                    backgroundColor: lightColorScheme.primaryContainer,
                    foregroundColor: lightColorScheme.onPrimaryContainer,
                    icon: Icons.book,
                    label: '中文詞典',
                  ),
                ],
              ),
              child: ListTile(
                onTap: () {
                  print("asddd");
                },
                onLongPress: () {
                  print("mcmcm");
                },
                title: Text("${index}"),
                trailing: Icon(
                  Icons.copy,
                  size: 20,
                ),
              ),
            )));
  }
}
