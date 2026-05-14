# 福井観光AIアドバイス

福井県内の事業者向けに、GPTモデルを活用して観光客のアンケートデータを分析し、専門的かつ実行可能な観光コンサルティングのアドバイスを生成するシステムです。

![福井観光アドバイスのウェブインターフェースのスクリーンショット。メインページには福井の風景写真が表示されたヘッダー、観光エリアと期間を選択するドロップダウンメニュー、および異なるエリア向けに生成されたアドバイスのリストが表示されています。](https://user-images.githubusercontent.com/108299/280241837-773a4658-0524-4f0e-8519-61405e60802c.png)

## デモ

**[https://code4fukui.github.io/fukui-kanko-advice/](https://code4fukui.github.io/fukui-kanko-advice/)**

## コアコンセプト

このプロジェクトは、シンプルなデータパイプラインによって観光コンサルティングのプロセスを自動化します。

1. **データの取得**: [FTAS（福井県観光アンケート）オープンデータ](https://github.com/code4fukui/fukui-kanko-survey)プロジェクトから最新の来訪者フィードバックを取得します。
2. **AIによる分析**: 各観光エリアについて、直近のアンケート回答を集計し、プロの観光コンサルタントとして振る舞うよう指示するプロンプトとともに、OpenAI API経由でGPTモデルに送信します。
3. **アドバイスの生成**: AIがフィードバックを分析し、優先順位付けされた実行可能な改善点を含むレポートを生成します。
4. **アーカイブと公開**: 生成されたアドバイスはJSONファイルとして保存され、静的なHTMLウェブサイトに公開されます。これにより、誰でもエリアや期間別にインサイトを閲覧できるようになります。

## 主な機能

- **AIを活用した分析**: GPTモデルを使用して生のアンケートデータを分析し、専門的なコンサルティングレポートを生成します。
- **データに基づく提案**: すべてのアドバイスは実際の来訪者のフィードバックに基づいており、繰り返し発生している課題や機会を特定します。
- **自動化されたワークフロー**: スクリプトにより、データの取得から最終的なHTMLページの生成・公開までの全プロセスが自動化されています。
- **インタラクティブなウェブインターフェース**: すっきりとした静的なウェブインターフェースにより、ユーザーは県内の地域、市町、調査期間別にアドバイスを閲覧できます。
- **データのアーカイブ**: 生成されたすべてのアドバイスについて、ダウンロード可能なJSONファイルを自動的に作成してインデックス化し、インサイトの履歴を記録します。

## 必須要件

- [Deno](https://deno.land/) (JavaScript/TypeScriptランタイム)
- OpenAI APIキー

## はじめに

1. **リポジトリをクローンします:**
    ```bash
    git clone https://github.com/code4fukui/fukui-kanko-advice.git
    cd fukui-kanko-advice
    ```

2. **環境をセットアップします:**
    ルートディレクトリに `.env` ファイルを作成し、OpenAI APIキーを追加します:
    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```

## 使い方

このプロジェクトには、データを管理しサイトを構築するためのDenoスクリプトがいくつか含まれています。

```bash
# パイプライン全体を実行: 新しいアドバイスの生成、インデックスの更新、HTMLの構築
deno run --allow-net --allow-read --allow-write --env make.js

# --- 個別のスクリプト ---

# 最近のアンケート回答があるエリア向けに新しいアドバイスを生成
# (出力は data/advice-YYYY-MM-DD.json に保存されます)
deno run --allow-net --allow-read --allow-write --env make.js

# /data ディレクトリからアドバイスのインデックスを作成または更新
# (advice-list.json を生成します)
deno run --allow-net --allow-read --allow-write makeList.js

# 現在のアドバイスデータからすべてのHTMLページを生成
# (index.html と area/*.html を生成します)
deno run --allow-net --allow-read --allow-write makeHTML.js

# サンプルデータを使用して、コアとなるAIアドバイス生成ロジックをテスト
deno run --allow-net --env make.test.js
```

## データとAPI

- **アンケートデータ**: [FTAS（福井県観光アンケート）オープンデータ](https://github.com/code4fukui/fukui-kanko-survey)
- **アドバイス生成**: OpenAI API

## ライセンス

- **データソース**: CC BY 福井県観光連盟
- **コード**: MIT License
- **AI API**: OpenAIの利用規約に準拠
