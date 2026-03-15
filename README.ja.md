# 福井県観光AIアドバイス

福井県の観光地事業者向けに、AI（GPT）を用いて自動的に生成される観光コンサルティングアドバイスシステムです。

## デモ
https://code4fukui.github.io/fukui-kanko-advice/

## 概要

本プロジェクトは、OpenAIのGPT APIを活用して観光アンケート調査データを分析し、福井県の観光地事業者に対して**すぐに実行できる改善施策**を自動生成します。訪問者アンケートフィードバックをAIが統合し、プロフェッショナルで実践的なコンサルティングアドバイスを提供します。

### 主な機能

- **AI による自動分析**: GPT（GPT-5.2）を使用してアンケート調査データを分析し、プロフェッショナルなアドバイスを生成
- **データベース駆動**: 実際の来訪者フィードバックを基に、すべての改善提案を作成
- **エリア別・期間別対応**: 各観光地ごと、調査期間ごとに異なるアドバイスを生成
- **インタラクティブなWeb インターフェース**: エリア・市町村・期間で動的にアドバイスを検索・閲覧可能
- **自動的なデータアーカイブ**: 生成されたアドバイスをJSON形式で自動保存

## データ出典

**アンケートソース**: [FTASオープンデータ - 福井県観光地域アンケート調査](https://github.com/code4fukui/fukui-kanko-survey)
- **データライセンス**: CC BY 福井県観光連盟
- コンテンツ：観光地の定義、アンケート回答、来訪者属性、満足度データ
- 継続的に新しい来訪者フィードバックが追加されます。

## AI Model & Prompting

**Current Model**: GPT-5.2 (or fallback to GPT-4 with alternative lines commented in code)

**System Prompt** (translates to):
> "You are a professional tourism consultant. Based on the following CSV survey data, create advice for tourism area business operators. What are important improvements that can be solved immediately?"

## 実行方法

### 前提条件

- [Deno](https://deno.land/) JavaScript/TypeScript runtime
- OpenAI API key (環境変数で設定)
- データ取得とAPI通信のための インターネット接続

### 基本的な使い方

```bash
# 最新のアンケート回答データからアドバイスを生成
deno run --allow-net --allow-read --allow-write make.js

# アドバイスのインデックスを作成/更新
deno run --allow-net --allow-read --allow-write makeList.js 

# 現在のアドバイスからHTMLページを生成
deno run --allow-net --allow-read --allow-write makeHTML.js

# サンプルデータでAIアドバイス生成をテスト
deno run --allow-net make.test.js
```

## ライセンス

- データソース: CC BY Fukui Tourism Association
- コード: オープンソース (リポジトリ内のライセンスを確認)
- AI API: OpenAIの利用規約に準拠