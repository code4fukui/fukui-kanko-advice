# 福井県観光AI アドバイス

福井県の観光地事業者向けに、AIを用いて自動的に生成される観光コンサルティングアドバイスシステムです。

## デモ
https://code4fukui.github.io/fukui-kanko-advice/

## 機能
- **AI による自動分析**: GPTを使用してアンケート調査データを分析し、プロフェッショナルなアドバイスを生成
- **データベース駆動**: 実際の来訪者フィードバックを基に、すべての改善提案を作成
- **エリア別・期間別対応**: 各観光地ごと、調査期間ごとに異なるアドバイスを生成
- **インタラクティブなWebインターフェース**: エリア・市町村・期間で動的にアドバイスを検索・閲覧可能
- **自動的なデータアーカイブ**: 生成されたアドバイスをJSON形式で自動保存

## 必要環境
- [Deno](https://deno.land/) JavaScript/TypeScript runtime
- OpenAI API key

## 使い方
```bash
# 新しい回答データからアドバイスを生成
deno run --allow-net --allow-read --allow-write make.js

# アドバイスのインデックスを作成/更新
deno run --allow-net --allow-read --allow-write makeList.js

# 現在のアドバイスからHTMLページを生成
deno run --allow-net --allow-read --allow-write makeHTML.js

# サンプルデータでAIアドバイス生成をテスト
deno run --allow-net make.test.js
```

## データ・API
- アンケートデータ: [FTASオープンデータ - 福井県観光地域アンケート調査](https://github.com/code4fukui/fukui-kanko-survey)
- アドバイス生成: OpenAI API

## ライセンス
- データソース: CC BY Fukui Tourism Association 
- コード: オープンソース (リポジトリ内のライセンスを確認)
- AI API: OpenAIの利用規約に準拠