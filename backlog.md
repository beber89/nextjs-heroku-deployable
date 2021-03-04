## TODOs
  * TODO: Contact Us
    * ask if it is possible to use shopify-admin with api
    * Create an admin app to receive messages
      * TODO: Signin post request
      * TODO: middleware with jwt stored in a file handled by FileAccess
      * TODO: create the page
      * TODO: Embed app into shopify ?
    * | create custom liquid contact us in store
  * TODO: footer
  * TODO: in cart, item should link to product
  * TODO: Remove categories
  * TODO: Quantity input change increment field
  * TODO: Configs
    * config for merchant specific info: email, phone, address, ...
    * config for themes
    * config for app info: environment, urls, ...

## Next Phase
  * Contact Us validation
    * Message maximum 500 chars

## Walkthrough
 ### Elixir App
   * mix phx.new appname
   * run docker postgres
   * mix ecto.setup
   * generate user_manager
   * middleware for authenticate_user_session.ex
   * add user auth routes