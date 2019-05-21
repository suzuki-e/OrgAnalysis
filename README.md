# OrgAnalisis

## セットアップ方法

以下のソフトウェアをインストールしておく必要があります。

- Ruby 2.6.2
- PostgreSQL
- Yarn
- Node >=8.10

APIサーバを起動するために以下のコマンドを実行します。

```bash
$ git clone https://github.com/machisuke/OrgAnalisis.git
$ cd OrgAnalisis
$ bundle install
$ bundle exec rails db:setup
$ bundle exec rails server -p 4000
```

実行後、[http://localhost:4000](http://localhost:4000) が表示されれば起動成功です。

また、フロントエンドのサーバを起動するために以下のコマンドを実行します。

```bash
$ cd path/to/OrgAnalisis
$ cd client
$ yarn
$ yarn start
```

実行後、[http://localhost:3000](http://localhost:3000) が表示されれば起動成功です。
