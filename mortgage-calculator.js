document.getElementById("calculateBtn").addEventListener("click", function() {
  const loan = parseFloat(document.getElementById("loanAmount").value);
  const rate = parseFloat(document.getElementById("interestRate").value) / 100 / 12;
  const term = parseInt(document.getElementById("loanTerm").value);

  if (isNaN(loan) || isNaN(rate) || isNaN(term)) {
    document.getElementById("result").innerHTML = "Please enter all fields correctly.";
    return;
  }

  const totalMonths = term * 12;
  const monthlyPayment = (loan * rate) / (1 - Math.pow(1 + rate, -totalMonths));
  document.getElementById("result").innerHTML = "Monthly Payment: $" + monthlyPayment.toFixed(2);
});
