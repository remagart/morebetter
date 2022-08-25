import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:morebetter_flutter/app/modules/english/forgetting_curve/fc_detail/widget/fc_detail_phrase_tab_widget.dart';
import 'package:morebetter_flutter/app/modules/english/forgetting_curve/fc_detail/widget/fc_detail_vocabulary_tab_widget.dart';
import 'package:morebetter_flutter/core/theme/text_theme.dart';
import 'package:morebetter_flutter/core/values/colors.dart';

class FCDetailPage extends StatefulWidget {
  FCDetailPage({Key? key}) : super(key: key);

  @override
  State<FCDetailPage> createState() => _FCDetailPageState();
}

class _FCDetailPageState extends State<FCDetailPage> {
  bool isWordTab = true;

  final List tempData = List.generate(
      100, (index) => {"word": 'qqq ${index}', "sentence": 'zzz ${index}'});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            title: Text("你還記得嗎?"),
            bottom: TabBar(
                onTap: (value) => {
                      setState(() {
                        isWordTab = (value == 0);
                      })
                    },
                indicatorWeight: 1,
                indicatorSize: TabBarIndicatorSize.tab,
                labelPadding: EdgeInsets.only(bottom: 8),
                tabs: [
                  Text(
                    "單字",
                    style: fontH4,
                  ),
                  Text(
                    "片語",
                    style: fontH4,
                  )
                ]),
          ),
          body: (isWordTab == true)
              ? FcDetailVocabularyTabWidget(wordData: tempData)
              : FcDetailPhraseTabWidget(),
        ));
  }
}
