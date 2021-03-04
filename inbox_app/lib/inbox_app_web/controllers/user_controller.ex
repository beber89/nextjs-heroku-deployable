defmodule InboxAppWeb.UserController do
  use InboxAppWeb, :controller

  def index(conn, _params) do
    # TODO: Read conn body to find username and password, then verify it using FileAccess
    send_resp(conn, 200, "Hello here")
  end
end
