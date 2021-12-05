function populateHomePage() 
{
    getEmpMonth();
    getCustMonth();
    getProdSalesMonth();
    getProdQtyMonth();
}


function getEmpMonth()
{
    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = displayEmpMonth;

    xReq.open('GET','/getEmployeeOfMonth',true);
    xReq.send(); 
}
function displayEmpMonth()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        $('#empMonth').html(msg.month);
        $('#empName').html(msg.name);
        $('#empSales').html(msg.sales);
    }
}

function getCustMonth()
{
    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = displayCustMonth;

    xReq.open('GET','/getCustomerOfMonth',true);
    xReq.send(); 
}
function displayCustMonth()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        $('#custMonth').html(msg.month);
        $('#custName').html(msg.name);
        $('#custSales').html(msg.sales);
    }
}


function getProdSalesMonth()
{
    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = displayProdSalesMonth;

    xReq.open('GET','/getProdSalesOfMonth',true);
    xReq.send(); 
}
function displayProdSalesMonth()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        $('#prodSalesMonth').html(msg.month);
        $('#prodSalesName').html(msg.name);
        $('#prodSalesTotal').html(msg.sales);
    }
}

function getProdQtyMonth()
{
    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = displayProdQtyMonth;

    xReq.open('GET','/getProdQtyOfMonth',true);
    xReq.send(); 
}
function displayProdQtyMonth()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        $('#prodQtyMonth').html(msg.month);
        $('#prodQtyName').html(msg.name);
        $('#prodQtyTotal').html(msg.qty);
    }
}