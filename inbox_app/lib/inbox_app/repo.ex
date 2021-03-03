defmodule InboxApp.Repo do
  use Ecto.Repo,
    otp_app: :inbox_app,
    adapter: Ecto.Adapters.Postgres
end
