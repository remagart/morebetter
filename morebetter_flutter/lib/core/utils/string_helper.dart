class StringHelper {
  static String formatCopiedTxt(String text) {
    const reg = r"\s*\(.*\)$";
    bool isTest = RegExp(reg).hasMatch(text);
    if (isTest) {
      String result = text.replaceAll(RegExp(reg), "");
      return result;
    }

    return text;
  }
}
