defmodule InboxApp.Plug.AuthenticateUserSession do
  import Plug.Conn

  alias InboxApp.UserManager

  def init(options), do: options

  def call(conn, _opts) do
    email = with [] <- Enum.filter(conn.req_headers, fn(x) -> elem(x, 0) == "username" end) do
      send_resp(conn, 401, "UNAUTHORIZED: No username provided")
      |> halt()
    else
      filtered -> filtered |> hd |> elem(1)
    end
    tokenkey = with [] <- Enum.filter(conn.req_headers, fn(x) -> elem(x, 0) == "authorization" end) do
      send_resp(conn, 401, "UNAUTHORIZED: No auth header provided")
      |> halt()
    else
      filtered -> filtered |> hd |> elem(1)
    end

    ## Verify token starts by `Token `
    tokenkey = if  String.split(tokenkey, "Token ") |> length == 2 do
      String.split(tokenkey, "Token ") |> tl |> hd
    else
      conn
      |> send_resp(401, "UNAUTHORIZED: Improper token format")
      |> halt
    end

    ## Verify token is correct
    case UserManager.verify_email_by_token(tokenkey, email) do
      {:ok, _} -> conn
      _ -> conn
        |> send_resp(401, "UNAUTHORIZED: You are unauthorized to visit this page")
        |> halt()
    end
  end
end
