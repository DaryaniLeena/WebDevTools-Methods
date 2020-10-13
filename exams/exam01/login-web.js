const loginWeb={
  loginPage: function(){
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="/login-web.css" type="text/css">
        <title>Login</title>
      </head>
      <body>
        <div>
        ${loginWeb.loginUser()}
          </div>
      </body>
    </html>
    `;
  },

  loginUser: function(){
    return `<form action="/login" method="POST">
      <h2>Register</h2>
    		<p>
    			<label for="userName" class="floatLabel">Username</label>
    			<input id="userName" name="userName" type="text" required>
    		</p>
    		<p>
    			<button type="submit" value="Login" id="submit">Login</button>
    		</p>
    	</form>`;
  }
};

module.exports=loginWeb;