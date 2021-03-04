defmodule InboxApp.Models.Message do
  use Ecto.Schema
  import Ecto.Changeset

  schema "messages" do
    field :body, :string
    field :email, :string
    field :name, :string
    field :phone, :string
    field :subject, :string

    timestamps()
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:name, :phone, :email, :subject, :body])
    |> validate_required([:name, :phone, :email, :subject, :body])
  end
end
