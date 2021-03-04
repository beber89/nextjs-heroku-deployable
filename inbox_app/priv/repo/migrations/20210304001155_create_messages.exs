defmodule InboxApp.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :name, :string
      add :phone, :string
      add :email, :string
      add :subject, :string
      add :body, :string

      timestamps()
    end

  end
end
