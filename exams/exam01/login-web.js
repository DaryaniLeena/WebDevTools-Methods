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
    		<div class="loginform">
    			<label for="userName" class="user-label">Username</label>
    			<input id="userName" name="userName" type="text" required>
    		</div>
    		<div class="loginform">
    			<button class="submit-button" type="submit" value="Login" id="submit">Login</button>
    		</div>
    	</form>`;
  }
};

module.exports=loginWeb;