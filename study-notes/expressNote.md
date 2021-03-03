get("./address")- get("./address/:")

If i Want to send the parameters send them without :

- address must be in relevance to package.json
- the ./ refer to the last address called by the script
- in this case the start script calls ./routes file.
  \*/

# What is express.json()? express.urlencoded?

- think about Post/Put requests:
  express.json() turns the req.body into JSON format
  not to be confused with JSON.parse that takes a JSON and formats it into a JS object

You NEED:

- express.json() and express.urlencoded()
- for POST and PUT requests.
  these request are SENDING Data.
  -express.urlencoded({ extended: true })--> ('foo[bar]=baz') ==> foo: { bar: 'baz' }
  -express.urlencoded({ extended: false })--> no nesting - sometimes needed
  important

You DO NOT NEED:

- express.json() and express.urlencoded()
- for GET Requests or DELETE Requests.

there are also express.text and express.raw

# Responds:

- .render(view [, locals] [, callback]) create new file
- .redirect([status,] path)

## To send html back in a response:

- with express
- res.sendFile()
- or express.static() middle ware function
