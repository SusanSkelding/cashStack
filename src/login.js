function Login() {
	const [show, setShow] = React.useState(true);
	const [status, setStatus] = React.useState("");
	const [name, setName] = React.useState("");
	const [accountEmail, setAccountEmail] = React.useState("");
	const [currentAccount, setCurrentAccount] = React.useState("");
	const [emailinput, setEmailinput] = React.useState("");
	const [passwordinput, setPasswordinput] = React.useState("");
	const ctx = React.useContext(UserContext);
  
	if (show) {
	  for (const { name, email, loggedin } of ctx.users) {
		if (loggedin) {
		  setShow(false);
		  setAccountEmail(email);
		  setName(name);
  
		  return;
		}
	  }
	}
  
	function validate(field, label) {
	  if (!field) {
		setStatus("Error: Missing " + label);
		setTimeout(() => setStatus(""), 3000);
		return false;
	  }
	  return true;
	}

	function logginNow() {
	  if (!validate(emailinput, "email")) return;
	  if (!validate(passwordinput, "password")) return;
	  let tracker = false;
  
	  for (const { email, password } of ctx.users) {
		if (emailinput === email && passwordinput === password) {
		  for (var i = 0, length = ctx.users.length; i < length; i++) {
			if (ctx.users[i].email === email) {
			  ctx.users[i].loggedin = true;
			  tracker = true;
			}
		  }
		}
	  }
  
	  if (tracker) {
		setShow(false);
		setCurrentAccount(emailinput);
	  } else {
		setStatus("Error: Email or Password incorrect");
		setTimeout(() => setStatus(""), 8000);
	  }
	}
  
	function logout() {
	  for (var i = 0, length = ctx.users.length; i < length; i++) {
		ctx.users[i].loggedin = false;
	  }
	  setShow(true);
	}
  
	return (
	  <Card
		bgcolor="success"
		txtcolor="white"
		header="Login"
		status={status}
		body={
		  show ? (
			<>
			  <div className="text-left">
				<img
				  src="coin.svg"
				  className="img-fluid left"
				  alt="Responsive image"
				  width="22%"
				/>
				<br />
				<br />
			  </div>
			  Email
			  <br />
			  <input
				type="input"
				className="form-control"
				id="email"
				placeholder="Enter Email"
				value={emailinput}
				onChange={(e) => setEmailinput(e.currentTarget.value)}
			  />
			  <br />
			  Password
			  <br />
			  <input
				type="password"
				className="form-control"
				id="password"
				placeholder="Enter Password"
				value={passwordinput}
				onChange={(e) => setPasswordinput(e.currentTarget.value)}
			  />
			  <br />
			  <button
				type="submit"
				className="btn btn-outline-light"
				onClick={logginNow}
			  >
				Login
			  </button>
			  <br />
			  <br />
			</>
		  ) : (
			<>
			  <h5> {`Hello ${currentAccount}! `} </h5>
			  <br />
			  Make a
			  <a className="link-light" href="#/deposit">
				Deposit
			  </a>{" "}
			  or{" "}
			  <a className="link-light" href="#/withdraw">
				Withdrawal
			  </a>
			  ?
			  <br />
			  <br />
			  <button
				type="submit"
				className="btn btn-outline-light"
				onClick={logout}
			  >
				Logout
			  </button>
			</>
		  )
		}
	  />
	);
  }