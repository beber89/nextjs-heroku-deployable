defmodule InboxApp.Utils.FileAccess do
  def verifyUser(username, password) do
    case :code.priv_dir(:inbox_app) |> Path.join("/.cs/.user") |> File.read do
      {:ok, content} ->
        [username_, hash_] = content |> String.split()
        hash = :crypto.hash(:md5, password) |> Base.encode16() |> String.downcase()
        if (username == username_) && (hash == hash_) do
          {:ok, "jwt"}
        else
          {:error, "FALSE CREDENTIALS"}
        end
      {:error, reason} -> {:error, reason}
    end
  end
end

# InboxApp.Utils.FileAccess.verifyUser("","")
