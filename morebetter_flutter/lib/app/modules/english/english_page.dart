import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:morebetter_flutter/app/routes/app_pages.dart';
import 'package:morebetter_flutter/core/image/app_images.dart';

class EnglishPage extends StatelessWidget {
  const EnglishPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('英文學習'),
      ),
      body: renderContent(context),
    );
  }
}

Widget? renderContent(context) {
  return Container(
    alignment: Alignment.center,
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        InkWell(
          onTap: () => Get.toNamed(AppRoutes.fcOverview),
          child: SizedBox(
            child: Image.asset(
              AppImages.forgettingCurve,
              fit: BoxFit.fill,
            ),
            width: 300,
            height: 250,
          ),
        )
      ],
    ),
  );
}
