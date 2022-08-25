import 'package:flutter/material.dart';
import 'package:get/instance_manager.dart';
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

class RenderOverview extends StatelessWidget {
  RenderOverview({Key? key}) : super(key: key);

  final List listData = List.generate(
      15,
      (index) => {
            'id': index,
            'product': 'product $index',
          });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        renderHeader(),
        SizedBox(
          height: 570, // TODO: 是否有好的方法
          child: renderList(listData),
        )
      ],
    );
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

Widget renderList(List data) {
  return ListView.builder(
      itemCount: data.length,
      shrinkWrap: true,
      itemBuilder: ((context, index) => Column(
            children: [
              ListTile(
                onTap: (() => Get.toNamed(AppRoutes.fcDetail)),
                leading: const Icon(
                  Icons.date_range_rounded,
                  color: Colors.red,
                  size: 30,
                ),
                trailing: const Icon(
                  Icons.arrow_forward_ios_rounded,
                ),
                dense: true,
                title: Text(data[index]["product"]),
                subtitle: Text(data[index]["product"]),
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
