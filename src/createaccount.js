function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function checkPass() {
    var pass = document.getElementById("password");
    if (pass.value.length < 4) {
      setStatus("Password Must Include 4 Characters");
      setTimeout(() => setStatus(""), 3000);
      return;
    } else {
      return true;
    }
  }

  function handleCreate() {
    if (!validate(name, "Please Enter Name")) return;
    if (!validate(email, "Please Enter Valid Email")) return;
    if (!validate(password, "Password Must Include 4 Characters")) return;
    if (!checkPass(password)) return;
    ctx.users.push({ name, email, password, balance: 100 });
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="success"
      txtcolor="white"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            <div className="text-left">
              <img
                src="coin.svg"
                className="img-fluid right"
                alt="Responsive image"
                width="22%"
              />
              <br />
              <br />
            </div>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email Address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-outline-light"
              onClick={handleCreate}
            >
              Create Account
            </button>
          </>
        ) : (
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
         
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-outline-light"
              onClick={clearForm}
            >
              Make another account
            </button>
          </>
        )
      }
    />
  );
}