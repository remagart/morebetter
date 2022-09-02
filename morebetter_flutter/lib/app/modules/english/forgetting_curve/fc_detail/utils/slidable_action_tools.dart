import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:morebetter_flutter/app/modules/english/forgetting_curve/fc_detail/utils/on_tap_handler.dart';
import 'package:morebetter_flutter/core/utils/string_helper.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../../../../core/values/colors.dart';

SlidableAction goGoogleTranslate(String text) {
  return SlidableAction(
    onPressed: (context) => OnTapHandler.goGoogleTranslate(text),
    backgroundColor: Color(0xFF7BC043),
    foregroundColor: lightColorScheme.onPrimaryContainer,
    icon: Icons.language,
    label: 'Google',
  );
}

SlidableAction goMadarinDictionary(String text) {
  return SlidableAction(
    onPressed: (context) => OnTapHandler.goMandarinDictionary(text),
    backgroundColor: lightColorScheme.primaryContainer,
    foregroundColor: lightColorScheme.onPrimaryContainer,
    icon: Icons.book,
    label: '中文詞典',
  );
}
