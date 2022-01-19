function Withdraw() {
	const [withdraw, setWithdraw] = React.useState("");
	const [show, setShow] = React.useState(true);
	const [status, setStatus] = React.useState("");
	const [user, setUser] = React.useState("");
	const [userEmail, setUserEmail] = React.useState("");
	const [userPassword, setUserPassword] = React.useState("");
	const [balance, setBalance] = React.useState("");
  
	const ctx = React.useContext(UserContext);
  
	if (show) {
	  for (const { name, email, password, balance, loggedin } of ctx.users) {
		if (loggedin) {
		  setShow(false);
		  setUser(name);
		  setUserEmail(email);
		  setUserPassword(password);
		  setBalance(balance);
  
		  return;
		}
	  }
	}
  
	function MakeWithdrawal() {
	  if (!isNaN(withdraw) && withdraw > 0 && withdraw <= balance) {
		let newBalance = Number(balance) - Number(withdraw);
  
		let tracker = false;
  
		for (const { email, password, balance } of ctx.users) {
		  if (userEmail === email && userPassword === password) {
			for (var i = 0, length = ctx.users.length; i < length; i++) {
			  if (ctx.users[i].email === userEmail) {
				ctx.users[i].balance = Number(newBalance);
  
				tracker = true;
			  }
			}
		  }
		}
  
		if (tracker) {
		  setStatus(`$${withdraw} withdrawn from account`);
		  setTimeout(() => setStatus(""), 3000);
		  setWithdraw("");
		  setBalance(Number(newBalance));
		}
	  } else if (withdraw > balance) {
		setStatus(`Error: Withdraw amount must be less than $${balance}.`);
		setWithdraw("");
		setTimeout(() => setStatus(""), 3000);
	  } else if (!isNaN(withdraw)) {
		setStatus("Error: must be greater than $0.00. ");
		setWithdraw("");
		setTimeout(() => setStatus(""), 3000);
	  } else {
		setStatus("Error: must be a number.");
		setWithdraw("");
		setTimeout(() => setStatus(""), 3000);
	  }
	  return;
	}
  
	return (
	  <Card
		bgcolor="warning"
		txtcolor="white"
		header="Withdraw"
		status={status}
		body={
		  show ? (
			<>
			  <div className="text-left">
				<img
				  src="withdraw.png"
				  className="card-img-top"
				  alt="Responsive image"
				  width="22%"
				/>
				<br />
				<br />
			  </div>
			  <a
				href="#/login/"
				className="btnDeposit"
				data-toggle="tooltip"
				title="Login to your account"
			  >
				Login
			  </a>{" "}
			  to make withdrawal!
			  <br />
			  <br />
			</>
		  ) : (
			<>
			  Current Balance: ${balance.toFixed(2)}
			  <br />
			  <br />
			  <img
				src="withdraw.png"
				className="img-fluid left"
				alt="Responsive image"
				width="22%"
			  />
			  <br />
			  <br />
			  Withdrawal Amount:
			  <br />
			  <input
				type="input"
				className="form-control"
				id="deposit"
				placeholder="$0.00"
				value={withdraw}
				onChange={(e) => setWithdraw(e.currentTarget.value)}
			  />
			  <br />
			  <button
				type="submit"
				className="btn btn-outline-light"
				onClick={MakeWithdrawal}
			  >
				Withdraw
			  </button>
			  <br />
			  <br />
			</>
		  )
		}
	  />
	);
  }