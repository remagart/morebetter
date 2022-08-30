import 'package:flutter/material.dart';
import 'package:get/instance_manager.dart';
import 'package:morebetter_flutter/app/data/models/english/english_everyday_model.dart';
import 'package:morebetter_flutter/app/modules/english/forgetting_curve/fc_overview/fc_overview_controller.dart';
import 'package:morebetter_flutter/app/routes/app_pages.dart';
import 'package:morebetter_flutter/core/theme/text_theme.dart';
import 'package:morebetter_flutter/core/values/colors.dart';
import 'package:get/get.dart';

class FCOverviewPage extends StatelessWidget {
  const FCOverviewPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("今日複習"),
      ),
      body: RenderOverview(),
    );
  }
}

class RenderOverview extends GetView<FcOverviewController> {
  RenderOverview({Key? key}) : super(key: key);

  final List listData = List.generate(
      15,
      (index) => {
            'id': index,
            'product': 'product $index',
          });

  @override
  Widget build(BuildContext context) {
    return Obx(() => Column(
          children: [
            renderHeader(),
            SizedBox(
              height: 570, // TODO: 是否有好的方法
              child: renderList(controller.englishEverydayList),
            )
          ],
        ));
  }
}

Widget renderHeader() {
  return Container(
    color: lightColorScheme.primaryContainer, //TODO: 顏色取得?
    height: 50,
    child: Row(
      children: [
        SizedBox(
          width: 16,
        ),
        Text(
          "已經記憶XX天了",
          style: fontH4.copyWith(fontWeight: FontWeight.bold),
        ),
        Expanded(
            child: Container(
          height: 50,
        )),
        Text(
          "還剩下 XX:XX:XX",
          style: fontbody2,
        ),
        SizedBox(
          width: 16,
        ),
      ],
    ),
  );
}

Widget renderList(List<EnglishEverydayModel> data) {
  return ListView.builder(
      itemCount: data.length,
      shrinkWrap: true,
      itemBuilder: ((context, index) => Column(
            children: [
              ListTile(
                onTap: (() => Get.toNamed(AppRoutes.fcDetail)),
                leading: Text("Day ${index + 1}"),
                trailing: const Icon(
                  Icons.arrow_forward_ios_rounded,
                ),
                dense: true,
                title: Text(
                    "單字：${(data[index].vocabulary.isEmpty) ? "" : data[index].vocabulary[0]}"),
                subtitle: Text(
                    "片語：${(data[index].sentences.isEmpty) ? "" : data[index].sentences[0]}"),
              ),
              const Divider(
                height: 1,
                thickness: 1,
                indent: 16,
                endIndent: 16,
              ),
            ],
          )));
}
