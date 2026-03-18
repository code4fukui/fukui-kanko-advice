# 福井観光AIアドバイス
English README is available here: [README.md](README.md)

日本福井県の観光業者向けに、プロフェッショナルなAIパワードツーリズムコンサルテーションアドバイスを生成するシステム。

## デモ
https://code4fukui.github.io/fukui-kanko-advice/

## 機能
- **AIパワーの分析**: GPTモデルを使用して調査データを分析し、専門的な観光コンサルティングアドバイスを生成します
- **データに基づいた提案**: 調査で収集された実際の訪問者フィードバックに基づいて、すべてのアドバイスを提供します
- **エリアと期間別に整理**: 各観光エリアと期間ごとにアドバイスを個別に生成します
- **対話型Webインターフェイス**: 都道府県、市、エリア別にアドバイスを閲覧できる動的HTMLページを提供します
- **自動ドキュメンテーション**: 生成されたすべてのアドバイスについて、ダウンロード可能なJSONファイルを自動的に作成します

## 要件
- [Deno](https://deno.land/)のJavaScript/TypeScript実行環境
- OpenAIのAPIキー

## 使用法
```bash
# 最近のアンケート回答のある地域の新しいアドバイスを生成する
deno run --allow-net --allow-read --allow-write make.js

# アドバイスのインデックスを作成/更新する
deno run --allow-net --allow-read --allow-write makeList.js

# 現在のアドバイスからHTMLページを生成する
deno run --allow-net --allow-read --allow-write makeHTML.js

# サンプルデータを使ってAIアドバイス生成をテストする
deno run --allow-net make.test.js
```

## データ / API
- [FTAS (Fukui Tourism Area Survey) オープンデータ](https://github.com/code4fukui/fukui-kanko-survey)からのサーベイデータ
- OpenAI APIを使って生成されたアドバイス

以下のREADMEマークダウンチャンクを英語から日本語に翻訳します。
ルール:
- 同じマークダウン構造、見出しレベル、リスト、およびセクションの順序を保持します。
- すべてのリンクとURLを正確に保持します。
- コードブロックを完全に保持します(コードを翻訳しません)。
- 文章を落とすことはありません。
- マークダウンのみを出力します。

日本語マークダウンチャンク:

## ライセンス
このプロジェクトは [MIT License](LICENSE) のもとで公開されています。
