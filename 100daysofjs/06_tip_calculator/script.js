function Calculate(params) {
    const amount = parseFloat(document.getElementById("billamount").value).toFixed(2);
    const tippercent = parseFloat(document.getElementById("tippercent").value).toFixed(2);
    const noofperson = parseInt(document.getElementById("noofperson").value);
    const totalamountdiv = document.getElementById("total");
    const perpersonamountdiv = document.getElementById("perpersonamount");
    
    const tipamount = (amount * tippercent) / 100;
    const perpersonamount = tipamount / noofperson;

    totalamountdiv.innerHTML = `Rs. ${(parseFloat(amount) + parseFloat(tipamount)).toFixed(2)}`;
    perpersonamountdiv.innerHTML = `Rs. ${perpersonamount.toFixed(2)}`;
}

document.getElementById("calculate").addEventListener("click", Calculate);