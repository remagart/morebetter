import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:morebetter_flutter/core/utils/string_helper.dart';
import 'package:url_launcher/url_launcher.dart';

class OnTapHandler {
  void _openLink(link) async {
    if (await canLaunch(link)) {
      await launch(link);
    }
  }

  static void goGoogleTranslate(String text) {
    text = StringHelper.formatCopiedTxt(text);
    String googlequery = "https://www.google.com/search?q=${text}+翻譯";
    OnTapHandler()._openLink(googlequery);
  }

  static void goOxfordDictionary(String text) {
    text = StringHelper.formatCopiedTxt(text);
    String oxfordquery =
        "https://www.oxfordlearnersdictionaries.com/definition/english/${text}";
    OnTapHandler()._openLink(oxfordquery);
  }

  static void copyText_toast(String text) {
    text = StringHelper.formatCopiedTxt(text);
    Clipboard.setData(ClipboardData(text: text));
    Fluttertoast.showToast(msg: text);
  }

  static void goMandarinDictionary(String text) async {
    text = StringHelper.formatCopiedTxt(text);
    String query = "https://tw.dictionary.search.yahoo.com/search?p=${text}";
    OnTapHandler()._openLink(query);
  }
}
