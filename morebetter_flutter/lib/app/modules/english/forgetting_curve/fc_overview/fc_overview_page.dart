import 'package:flutter/material.dart';
import 'package:morebetter_flutter/core/theme/text_theme.dart';

class FCOverviewPage extends StatelessWidget {
  const FCOverviewPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("今日複習"),
      ),
      body: Container(
        child: Column(
          children: [
            renderHeader(),
            renderList(),
          ],
        ),
      ),
    );
  }
}

Widget renderHeader() {
  return Text(
    "www",
  );
}

Widget renderList() {
  return Text("zzz");
}
