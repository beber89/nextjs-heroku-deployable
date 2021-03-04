defmodule InboxApp.ModelsTest do
  use InboxApp.DataCase

  alias InboxApp.Models

  describe "users" do
    alias InboxApp.Models.User

    @valid_attrs %{password_hash: "some password_hash", username: "some username"}
    @update_attrs %{password_hash: "some updated password_hash", username: "some updated username"}
    @invalid_attrs %{password_hash: nil, username: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Models.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Models.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Models.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Models.create_user(@valid_attrs)
      assert user.password_hash == "some password_hash"
      assert user.username == "some username"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Models.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = Models.update_user(user, @update_attrs)
      assert user.password_hash == "some updated password_hash"
      assert user.username == "some updated username"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Models.update_user(user, @invalid_attrs)
      assert user == Models.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Models.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Models.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Models.change_user(user)
    end
  end

  describe "messages" do
    alias InboxApp.Models.Message

    @valid_attrs %{body: "some body", email: "some email", name: "some name", phone: "some phone", subject: "some subject"}
    @update_attrs %{body: "some updated body", email: "some updated email", name: "some updated name", phone: "some updated phone", subject: "some updated subject"}
    @invalid_attrs %{body: nil, email: nil, name: nil, phone: nil, subject: nil}

    def message_fixture(attrs \\ %{}) do
      {:ok, message} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Models.create_message()

      message
    end

    test "list_messages/0 returns all messages" do
      message = message_fixture()
      assert Models.list_messages() == [message]
    end

    test "get_message!/1 returns the message with given id" do
      message = message_fixture()
      assert Models.get_message!(message.id) == message
    end

    test "create_message/1 with valid data creates a message" do
      assert {:ok, %Message{} = message} = Models.create_message(@valid_attrs)
      assert message.body == "some body"
      assert message.email == "some email"
      assert message.name == "some name"
      assert message.phone == "some phone"
      assert message.subject == "some subject"
    end

    test "create_message/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Models.create_message(@invalid_attrs)
    end

    test "update_message/2 with valid data updates the message" do
      message = message_fixture()
      assert {:ok, %Message{} = message} = Models.update_message(message, @update_attrs)
      assert message.body == "some updated body"
      assert message.email == "some updated email"
      assert message.name == "some updated name"
      assert message.phone == "some updated phone"
      assert message.subject == "some updated subject"
    end

    test "update_message/2 with invalid data returns error changeset" do
      message = message_fixture()
      assert {:error, %Ecto.Changeset{}} = Models.update_message(message, @invalid_attrs)
      assert message == Models.get_message!(message.id)
    end

    test "delete_message/1 deletes the message" do
      message = message_fixture()
      assert {:ok, %Message{}} = Models.delete_message(message)
      assert_raise Ecto.NoResultsError, fn -> Models.get_message!(message.id) end
    end

    test "change_message/1 returns a message changeset" do
      message = message_fixture()
      assert %Ecto.Changeset{} = Models.change_message(message)
    end
  end
end
