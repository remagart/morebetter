import 'package:flutter/material.dart';
import 'package:morebetter_flutter/core/theme/text_theme.dart';

class FCDetailPage extends StatelessWidget {
  const FCDetailPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            title: Text("你還記得嗎?"),
            bottom: TabBar(
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
          body: Text("cc"),
        ));
  }
}
