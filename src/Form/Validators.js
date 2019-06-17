const email = (value ) => {
  if (!value || value.indexOf("@") < 0) {
    return Error("Error: you must insert an email.")
  }
  console.log(value);
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
    return ("Warning: This email looks unusual, double check it's right.");
  }
}

export default {email};