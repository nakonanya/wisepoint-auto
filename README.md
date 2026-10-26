# wisepoint-auto

信州大学の ACSU で使用される多要素認証「WisePoint」を自動化するユーザースクリプトです。

Tampermonkey などの汎用ユーザースクリプト実行環境で動作します。使用する際は、スクリプト内の変数を各自の環境に合わせて変更してください。

## 対応環境

以下の環境で動作確認済みです。

| デバイス | ブラウザ | 拡張機能・アプリ |
| --- | --- | --- |
| PC | Google Chrome / Brave | Tampermonkey(無料) |
| iPhone | Safari | UserScripts(無料)・Tampermonkey(有料) |
| Android | Firefox | UserScripts(無料) |

## セキュリティ

4文字のアルファベットを平文で保存する運用を想定しています。ここでしか使われない4文字なので問題ないでしょう。

## 導入方法

導入手順や設定方法については、以下の記事を参照してください。

- [導入方法・設定手順はこちら](https://blog.nakonanya.workers.dev/articles/2025-08-09-acsu-auto)
