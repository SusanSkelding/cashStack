function Deposit() {
	const [show, setShow] = React.useState(true);
	const [status, setStatus] = React.useState("");
	const [user, setUser] = React.useState("");
	const [userEmail, setUserEmail] = React.useState("");
	const [userPassword, setUserPassword] = React.useState("");
	const [balance, setBalance] = React.useState("");
	const [deposit, setDeposit] = React.useState("");
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
  
	function MakeDeposit() {
	  if (!isNaN(deposit) && deposit > 0) {
		let newBalance = Number(balance) + Number(deposit);
		let tracker = false;
		setBalance(newBalance);
		setDeposit("");
		setStatus(`$${deposit} deposited into ${user}'s account`);
  
		
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
		  setStatus(`$${deposit} deposited into account`);
		  setTimeout(() => setStatus(""), 3000);
		  setDeposit("");
		  setBalance(Number(newBalance));
		}
	  } else if (!isNaN(deposit)) {
		setStatus("Error: must be greater than $0.00.");
		setDeposit("");
		setTimeout(() => setStatus(""), 3000);
	  } else {
		setStatus("Error: must be a number.");
		setDeposit("");
		setTimeout(() => setStatus(""), 3000);
	  }
	  return;
	}
  
	return (
	  <Card
		bgcolor="info"
		txtcolor="white"
		header="Deposit"
		status={status}
		body={
		  show ? (
			<>
			  <div className="text-left">
				<img
				  src="deposit.png"
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
			  to make a deposit.
			  <br />
			  <br />
			</>
		  ) : (
			<>
			  Current Balance: ${balance.toFixed(2)}
			  <br />
			  <br />
			  <img
				src="deposit.png"
				className="img-fluid left"
				alt="Responsive image"
				width="22%"
			  />
			  <br />
			  <br />
			  Deposit Amount:
			  <br />
			  <input
				type="input"
				className="form-control"
				id="deposit"
				placeholder="$0.00"
				value={deposit}
				onChange={(e) => setDeposit(e.currentTarget.value)}
			  />
			  <br />
			  <>
				<button
				  type="submit"
				  className="btn btn-outline-light"
				  onClick={MakeDeposit}
				>
				  Deposit
				</button>
				<br />
				<br />
				<div className="text-left"></div>
			  </>
			</>
		  )
		}
	  />
	);
  }
  