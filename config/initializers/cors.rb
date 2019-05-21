Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3000'

    # ref. https://qiita.com/sugo/items/9c5f9cc5d88e6d7efa2d
    # 全てのリソースに対して次のものを許可する
    resource "*",
             # APIサーバに対するリクエストにどんなヘッダでもつけることを許可する
             headers: :any,
             # methodsで指定したメソッドでのリソースへのアクセスを許可する
             methods: [:get],
             # exposeで指定したものは、レスポンスのHTTPヘッダとして公開を許可する（別オリジンからのリクエスト者でも見えるようにする）
             expose: []
  end
end
