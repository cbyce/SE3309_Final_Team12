const express = require('express');
const newConn = require('./js/conn/connection.js');
//INCORPERATE PROMISES ?
const app = express();

app.use(express.static('static'));

function getPageBase(pageTitle) {
    return {
                "head": '<!DOCTYPE html>'+
                        '<html lang="en">'+
                        '<head>'+
                            '<meta charset="UTF-8">'+
                            '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
                            '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
                        
                            '<!-- BOOTSTRAP AND JQUERY -->'+
                            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">'+
                            '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>'+
                            '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>'+
                            '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>'+
                        
                            '<!-- Font Awesome -->'+
                            '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />'+
                        
                            '<!-- Personal Style Sheets-->'+
                            '<link rel="stylesheet" href="./css/index.css">'+
                        
                            '<!-- Tab icon -->'+
                            '<link rel="icon" href="./imgs/weed-leaf-leafcircle.png">'+

                            '<title>Team 12 - ' + pageTitle + '</title>'+
                        '</head>'+
                        '<body>'+
                            '<div class="page-nav">'+
                                '<div class="header nav-left">'+
                                    '<div style="font-weight:bold; font-size: 2.25rem"><i class="fas fa-cannabis"></i> &nbsp; Employee Portal</div>'+
                                '</div>'+
                            
                                '<div class="header nav-center">'+
                                    '<div id="page_name_slot" style="font-weight:bold; font-size: 1.25rem; padding: 0 0.25rem">' + pageTitle + '</div>'+
                                '</div>'+
                            
                                '<div class="header nav-right" >'+
                                    '<a id="home-btn-header" class="btn-round nav-btn" href="/"><i class="fas fa-home"></i></a>'+
                                    
                                    '<div class="line-seperator"></div>'+
                                    
                                    '<a id="product-btn" class="btn-round nav-btn" href="/products"><i class="fas fa-cannabis"></i></a>'+
                                    
                                    '<div class="line-seperator"></div>'+
                        
                                    '<a id="customers-btn" class="btn-round nav-btn" href="/customers"><i class="fas fa-users"></i></a>'+
                            
                                    '<div class="line-seperator"></div>'+
                                    
                                    '<a id="employee-btn" class="btn-round nav-btn" href="/employees"><i class="fas fa-id-badge"></i></a>'+
                                    
                                    '<div class="line-seperator"></div>'+
                                    
                                    '<a id="reservation-btn" class="btn-round nav-btn" href="/reservations"><i class="fas fa-calendar"></i></a>'+
                            
                                    '<div class="line-seperator"></div>'+
                            
                                    '<a id="shipment-btn" class="btn-round nav-btn" href="/shipments"><i class="fas fa-ship"></i></a>'+

                                    '<div class="line-seperator"></div>'+
    
                                    '<a id="shipment-btn" class="btn-round nav-btn" href="/purchases"><i class="fas fa-receipt"></i></a>'+
                                '</div>'+
                            '</div>'+
                            '<div class="default-page">',
                "foot": '</div>'+
                        '<div class="footer-pos">'+
                            '<div class="footer nav-left">'+
                                '<i class="far fa-copyright"></i> &nbsp; Empoyee Portal'+
                            '</div>'+
                        
                            '<div class="footer nav-center">'+
                                '<div><i class="fas fa-cannabis"></i></div>'+
                            '</div>'+
                        
                            '<div class="footer nav-right">'+
                                '<a id="home-btn-footer" class="nav-btn">Home</a>'+
                                '<div class="line-seperator"></div>'+
                                '<a id="about-btn" class="nav-btn">About</a>'+
                                '<div class="line-seperator"></div>'+
                                '<a id="contact-btn" class="nav-btn" style="cursor:pointer">Contact</a>'+
                            '</div>'+
                        '</div>'+
                    '</body>'+
                    '</html>'
            };
}

//Change to incorperate error code display
function getErrPage() {
    let base = getPageBase('Error'); 

    return (base.head + 'An Error Has Occured, Please try again later.' + base.foot);
}
// Create our number formatter.
var currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

/*-----_____----- Products -----_____-----*/
app.get('/products', (req,res) => {
    let pageCount = 1;
    let prodPerPg = 10; //Products shown per page
    let base = getPageBase("Products");
    let conn = newConn();
    conn.connect();
    let content =   '<script src="./js/productPage.js"></script>';

    content +=  '<div class="container" style="padding: 0.5em">'+
                    '<div class="row">'+
                        '<div class="col-4" style="text-align:left">'+
                            'Showing '+
                            '<select id="resultCountBox" style="padding: 5px;" onchange="getProdList(this.id)">'+
                                '<option value="5">5</option>'+
                                '<option value="10" selected>10</option>'+
                                '<option value="15">15</option>'+
                                '<option value="25">25</option>'+
                                '<option value="50">50</option>'+
                                '<option value="75">75</option>'+
                                '<option value="100">100</option>'+
                            '</select>'+
                            ' per page'+
                        '</div>'+
                        '<div class="col-4" style="text-align:center">'+
                            'Sort '+
                            '<select id="prodTypeBox" style="padding: 5px" onchange="getProdList(this.id)">'+
                                '<option value="" selected>All</option>'+
                                '<option value="flower">Flower</option>'+
                                '<option value="vape">Vapes</option>'+
                                '<option value="edible">Edibles</option>'+
                                '<option value="oil">Oils</option>'+
                                '<option value="other">Other</option>'+
                            '</select>'+
                            ' by '+
                            '<select id="sortBox" style="padding: 5px" onchange="getProdList(this.id)">'+
                                '<option value="productName ASC, productType ASC, quantity DESC" selected>Name</option>'+
                                '<option value="quantity DESC, productName ASC">Quantity</option>'+
                                '<option value="quantitySold DESC, productName ASC">Quantity Sold</option>'+
                            '</select>'+
                        '</div>';
    
    conn.query(`SELECT COUNT(*) FROM Products;`
        ,(err,rows,fields) => {
            if (err) {
                console.log(err);
            } else {
                pageCount = Math.ceil(rows[0]['COUNT(*)'] / prodPerPg);

                content +=  '<div class="col-4" style="text-align:right">'+
                                'Page '+
                                '<input type="number" id="pageNumBox" value="1" min="1" max="' + pageCount + '" onchange="getProdList(this.id)">'+
                                ' of <span id="pgCountSpan">' + pageCount + '</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
            }
        });
    
    conn.query(`SELECT * FROM Products ORDER BY productName ASC LIMIT 0,` + prodPerPg + `;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.send(getErrPage());
                } else {
                    content += '<div class="product-container" id="prodContainer">';

                    for(r of rows)
                    {
                        content +=  '<div id="' + r.productID + '" class="product-row" onclick="prepProductDisplay(this.id);">'+
                                        '<div class="product-col left">'+
                                            '<div style="flex-direction: column;">'+
                                                '<div class="product-name">' + r.productName+ '</div>'+
                                                '<div class="product-id">' + r.productID + '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="product-col center">'+
                                            '<div class="product-type">' + (r.productType).charAt(0).toUpperCase() + (r.productType).slice(1) + '</div>'+
                                        '</div>'+
                                        '<div class="product-col right">'+
                                            '<div style="flex-direction: column; width: 175px">'+
                                                '<div style="display:flex; justify-content:space-between"><div>Qty: </div><div> ' + r.quantity + '</div></div>'+
                                                '<div style="display:flex; justify-content:space-between"><div style="padding-right: 15px">Qty Sold: </div><div>' + r.quantitySold + '</div></div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
                    }

                    content += '</div>';

                    //Changes box
                    content += '<div class="container" style="border: 2px solid black;border-radius: 7px; padding: 0.75em">'+
                                    '<div class="row" style="padding: 0.5em">'+
                                        '<div class="col-4">'+
                                            '<label for="idBox">ID: <span style="font-size:50%; color:grey;"> Click on a product to fill slot. (Does not matter when adding products")</span></label><br>'+
                                            '<input type="text" id="idBox" value="" style="width:100%; cursor: not-allowed" readonly>'+
                                        '</div>'+
                                        '<div class="col-4">'+
                                            '<label for="nameBox">Name:</label><br>'+
                                            '<input type="text" id="nameBox" value="" style="width:100%">'+
                                        '</div>'+
                                        '<div class="col-4">'+
                                            '<label for="typeBox">Type:</label><br>'+
                                            '<select id="typeBox" style="width: 100%; height: 30px;">'+
                                                '<option value="flower">Flower</option>'+
                                                '<option value="vape">Vape</option>'+
                                                '<option value="edible">Edible</option>'+
                                                '<option value="oil">Oil</option>'+
                                                '<option value="other">Other</option>'+
                                            '</select>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="row" style="padding: 0.5em">'+
                                        '<div class="col-4">'+
                                            '<label for="qtyBox">Quantity:</label><br>'+
                                            '<input type="number" id="qtyBox" min="0" style="width:100%">'+
                                        '</div>'+
                                        '<div class="col-4">'+
                                            '<label for="soldBox">Quantity Sold:</label><br>'+
                                            '<input type="number" id="soldBox" min="0" style="width:100%">'+
                                        '</div>'+
                                        '<div class="col-4" style="display:flex; justify-content: space-between; align-items:end">'+
                                            '<div><input  id="prodValid" type="checkbox"></div>'+
                                            '<button id="prodDelBtn" type="button" class="btn btn-danger" style="width: 85px" onclick="deleteProduct();">Delete</button>'+
                                            '<button id="prodUptBtn" type="button" class="btn btn-primary" style="width: 85px" onclick="updateProduct();">Update</button>'+
                                            '<button id="prodAddBtn" type="button" class="btn btn-success" style="width: 85px" onclick="insertProduct();">Add</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';
                    
                    res.send(base.head + content + base.foot);
                }
            } );

    conn.end();
});
app.post('/products/page', (req,res) => {
    let pageCount;
    let data = JSON.parse(req.headers.data);

    let conn = newConn();
    conn.connect();

    conn.query(`SELECT COUNT(*) FROM Products ` + data.type + `;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                } else {
                    pageCount = Math.ceil(rows[0]['COUNT(*)'] / data.count);
                }
            });

    conn.query(`SELECT * FROM Products ` + data.type + ` ORDER BY ` + data.sort + `  LIMIT ` + data.page * data.count + `, ` + data.count + `;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.send(getErrPage());
                } else {
                    let content = '';

                    for(r of rows)
                    {
                        content +=  '<div id="' + r.productID + '" class="product-row" onclick="prepProductDisplay(this.id);">'+
                                        '<div class="product-col left">'+
                                            '<div style="flex-direction: column;">'+
                                                '<div class="product-name">' + r.productName+ '</div>'+
                                                '<div class="product-id">' + r.productID + '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="product-col center">'+
                                            '<div class="product-type">' + (r.productType).charAt(0).toUpperCase() + (r.productType).slice(1) + '</div>'+
                                        '</div>'+
                                        '<div class="product-col right">'+
                                            '<div style="flex-direction: column; width: 175px">'+
                                                '<div style="display:flex; justify-content:space-between"><div>Qty: </div><div> ' + r.quantity + '</div></div>'+
                                                '<div style="display:flex; justify-content:space-between"><div style="padding-right: 15px">Qty Sold: </div><div>' + r.quantitySold + '</div></div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
                    }                    
                    
                    res.json({"html":content, "numPages": pageCount});
                }
            } );

    conn.end();
});
app.post('/products/info', (req,res) => {
    let data = JSON.parse(req.headers.data);
    let conn = newConn();
    conn.connect();

    conn.query(`SELECT * FROM Products WHERE productID = "` + data.productID + `";`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.json({"err": true});
                } else {
                    res.json({"err": false, "prod": rows[0]});
                }
            } );

    conn.end();
});
app.post('/products/update', (req,res) => {
    let data = JSON.parse(req.headers.data);

    let conn = newConn();
    conn.connect();
    
    conn.query(`UPDATE Products SET productName="` + data.name + `", productType="` + data.type + `", quantity=` + data.qty + `, quantitySold=` + data.sold + ` WHERE productID = "` + data.id + `";`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.json({"msg": "" + data.id + " (" + data.name + ") was NOT successfully updated in the database. Please retry."});
                } else {
                    res.json({"msg": "" + data.id + " (" + data.name + ") was successfully updated in the database. Refresh the page to see changes in the table."});
                }
            } );

    conn.end();
});
app.post('/products/delete', (req,res) => {
    let data = JSON.parse(req.headers.data);

    let conn = newConn();
    conn.connect();
    
    conn.query(`DELETE FROM Products WHERE productID = "` + data.id + `";`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.json({"msg": "" + data.id + ") was NOT successfully deleted from the database. Please retry."});
                } else {
                    res.json({"msg": "" + data.id + " was successfully deleted from the database. Refresh the page to see changes in the table."});
                }
            } );

    conn.end(); 
});
app.post('/products/insert', (req,res) => {
    let data = JSON.parse(req.headers.data);

    let conn = newConn();
    conn.connect();
    
    conn.query(`INSERT INTO Products VALUES ( "` + data.id + `", "` + data.name + `", "` + data.type + `", ` + data.qty + `, ` + data.sold + `);`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.json({"msg": "" + data.id + " (" + data.name + ") was NOT successfully added to the database. Please retry."});
                } else {
                    res.json({"msg": "" + data.id + " (" + data.name + ") was successfully added to the database. Refresh the page to see changes in the table."});
                }
            } );

    conn.end(); 
});

/*-----_____----- Employees -----_____-----*/
app.get('/employees', (req,res) => {
    let pageCount = 1;
    let empPerPg = 10; //EMployees shown per page
    let base = getPageBase("Employees");
    let conn = newConn();
    conn.connect();

    let contentPt2 = '';
    let contentPt1 =   '<script src="./js/employeePage.js"></script>'+
                        '<div class="container" style="padding: 0.5em">'+
                            '<div class="row">'+
                                '<div class="col-4" style="text-align:left">'+
                                    'Showing '+
                                    '<select id="resultCountBox" style="padding: 5px;" onchange="getEmpList(this.id)">'+
                                        '<option value="5">5</option>'+
                                        '<option value="10" selected>10</option>'+
                                        '<option value="15">15</option>'+
                                        '<option value="25">25</option>'+
                                        '<option value="50">50</option>'+
                                    '</select>'+
                                    ' per page'+
                                '</div>'+
                                '<div class="col-4" style="text-align:center">'+
                                    'Sort by '+
                                    '<select id="sortBox" style="padding: 5px" onchange="getEmpList(this.id)">'+
                                        '<option value="eLName, eFName " selected>Name</option>'+
                                        '<option value="hourlyPay, eLName">Pay</option>'+
                                        '<option value="noOfSales, eLName">Sales</option>'+
                                        '<option value="revenueGenerated, eLName">Revenue</option>'+
                                    '</select>'+
                                '</div>';

    conn.query(`SELECT COUNT(*) FROM Employees;`
        ,(err,rows,fields) => {
            if (err) {
                console.log(err);
            } else {
                pageCount = Math.ceil(rows[0]['COUNT(*)'] / empPerPg);

                contentPt1 +=  '<div class="col-4" style="text-align:right">'+
                                'Page '+
                                '<input type="number" id="pageNumBox" value="1" min="1" max="' + pageCount + '" onchange="getEmpList(this.id)">'+
                                ' of <span id="pgCountSpan">' + pageCount + '</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
            }
        });

    conn.query(`SELECT * FROM Employees ORDER BY eLName ASC, eFName ASC LIMIT 0,` + empPerPg + `;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.send(getErrPage());
                } else {
                    contentPt2 += '<div id="empContainer" class="product-container">';

                    for(r of rows)
                    {
                        contentPt2 +=  '<div id="' + r.eID + '" class="product-row" onclick="console.log(this.id);">'+
                                        '<div class="product-col left">'+
                                            '<div style="flex-direction: column;">'+
                                                '<div class="product-name">' + r.eLName + ', ' + r.eFName + '</div>'+
                                                '<div class="product-id">' + r.eID + '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="product-col center">'+
                                            '<div class="product-type">' + currency.format(r.hourlyPay) + '/hr</div>'+
                                        '</div>'+
                                        '<div class="product-col right">'+
                                            '<div style="flex-direction: column; width: 175px">'+
                                                '<div style="display:flex; justify-content:space-between"><div>Sales: </div><div> ' + r.noOfSales + '</div></div>'+
                                                '<div style="display:flex; justify-content:space-between"><div style="padding-right: 15px">Revenue: </div><div>' + currency.format(r.revenueGenerated) + '</div></div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
                    }

                    contentPt2 += '</div>';
                    
                    
                    
                    
                    res.send(base.head + contentPt1 + contentPt2 + base.foot);
                }
            } );

    conn.end();
});
app.post('/employees/page', (req,res) => {
    let pageCount;
    let data = JSON.parse(req.headers.data);

    let conn = newConn();
    conn.connect();

    conn.query(`SELECT COUNT(*) FROM Employees;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                } else {
                    pageCount = Math.ceil(rows[0]['COUNT(*)'] / data.count);
                }
            });

    conn.query(`SELECT * FROM Employees ORDER BY ` + data.sort + ` ASC  LIMIT ` + data.page * data.count + `, ` + data.count + `;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.send(getErrPage());
                } else {
                    let content = '';

                    for(r of rows)
                    {
                        content +=  '<div id="' + r.eID + '" class="product-row" onclick="console.log(this.id);">'+
                                        '<div class="product-col left">'+
                                            '<div style="flex-direction: column;">'+
                                                '<div class="product-name">' + r.eLName + ', ' + r.eFName + '</div>'+
                                                '<div class="product-id">' + r.eID + '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="product-col center">'+
                                            '<div class="product-type">' + currency.format(r.hourlyPay) + '/hr</div>'+
                                        '</div>'+
                                        '<div class="product-col right">'+
                                            '<div style="flex-direction: column; width: 175px">'+
                                                '<div style="display:flex; justify-content:space-between"><div>Sales: </div><div> ' + r.noOfSales + '</div></div>'+
                                                '<div style="display:flex; justify-content:space-between"><div style="padding-right: 15px">Revenue: </div><div>' + currency.format(r.revenueGenerated) + '</div></div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
                    }                    
                    
                    res.json({"html":content, "numPages": pageCount});
                }
            } );

    conn.end();
});

/*-----_____----- Customers -----_____-----*/
app.get('/customers', (req,res) => {
    let pageCount = 1;
    let custPerPg = 10; //Customers shown per page
    let base = getPageBase("Customers");
    let conn = newConn();
    conn.connect();

    let content =   '<script src="./js/customerPage.js"></script>'+
                        '<div class="container" style="padding: 0.5em">'+
                            '<div class="row">'+
                                '<div class="col-4" style="text-align:left">'+
                                    'Showing '+
                                    '<select id="resultCountBox" style="padding: 5px;" onchange="getCustList(this.id)">'+
                                        '<option value="5">5</option>'+
                                        '<option value="10" selected>10</option>'+
                                        '<option value="15">15</option>'+
                                        '<option value="25">25</option>'+
                                        '<option value="50">50</option>'+
                                        '<option value="75">75</option>'+
                                        '<option value="100">100</option>'+
                                    '</select>'+
                                    ' per page'+
                                '</div>'+
                                '<div class="col-4" style="text-align:center">'+
                                    'Sort by '+
                                    '<select id="sortBox" style="padding: 5px" onchange="getCustList(this.id)">'+
                                        '<option value="cLName ASC, cFName ASC" selected>Name</option>'+
                                        '<option value="email ASC, cLName ASC, cFName ASC">Email</option>'+
                                        '<option value="numVisits DESC, cLName ASC, cFName ASC">Visits</option>'+
                                        '<option value="totSpent DESC, cLName ASC, cFName ASC">Spent</option>'+
                                    '</select>'+
                                '</div>';

    conn.query(`SELECT COUNT(*) FROM Customer;`
        ,(err,rows,fields) => {
            if (err) {
                console.log(err);
            } else {
                pageCount = Math.ceil(rows[0]['COUNT(*)'] / custPerPg);

                content +=  '<div class="col-4" style="text-align:right">'+
                                'Page '+
                                '<input type="number" id="pageNumBox" value="1" min="1" max="' + pageCount + '" onchange="getCustList(this.id)">'+
                                ' of <span id="pgCountSpan">' + pageCount + '</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
            }
        });

    conn.query(`SELECT c.cID, c.cFName, c.cLName, c.email, COALESCE(spent.total, 0) totSpent, COALESCE(visit.totVisits, 0) numVisits FROM Customer c
                    LEFT JOIN (
                    SELECT SUM(pp.totCost * pp.qty) total, cID 
                    FROM Purchase p 
                    INNER JOIN ProductPurchase pp
                    WHERE pp.orderID = p.orderID  
                    GROUP BY p.cID) 
                AS spent  ON spent.cID = c.cID
                LEFT JOIN (
                    SELECT COUNT(*) totVisits, cID 
                    FROM Reservation r 
                    WHERE r.resTime < CURRENT_TIME
                    GROUP BY r.cID
                ) AS visit ON  visit.cID = c.cID
                ORDER BY cLName ASC, cFName ASC
                LIMIT 0,` + custPerPg + `;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.send(getErrPage());
                } else {
                    content += '<div id="custContainer" class="product-container">';

                    for(r of rows)
                    {
                        content +=  '<div id="' + r.cID + '" class="product-row" style="margin-bottom:0;margin-top:10px" onclick="getCurrAdvert(this.id);">'+
                                            '<div class="product-col left">'+
                                                '<div style="flex-direction: column;">'+
                                                    '<div class="product-name">' + r.cLName + ', ' + r.cFName + '</div>'+
                                                    '<div class="product-id">' + r.cID + '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="product-col center">'+
                                                '<div class="product-type">' + r.email + '</div>'+
                                            '</div>'+
                                            '<div class="product-col right">'+
                                                '<div style="flex-direction: column; width: 175px">'+
                                                    '<div style="display:flex; justify-content:space-between"><div>Visits: </div><div> ' + parseInt(r.numVisits) + '</div></div>'+
                                                    '<div style="display:flex; justify-content:space-between"><div style="padding-right: 15px">Spent: </div><div>' + currency.format(r.totSpent) + '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="collapse" id="' + r.cID + 'Collapse">'+
                                            '<div class="card card-body" id="' + r.cID +'Card">'+
                                                'N/A'+
                                            '</div>'+
                                        '</div>';
                    }

                    content += '</div>';
                    
                    res.send(base.head + content + base.foot);
                }
            } );

    conn.end();
});
app.post('/customer/page', (req,res) => {
    let pageCount;
    let data = JSON.parse(req.headers.data);

    let conn = newConn();
    conn.connect();

    conn.query(`SELECT COUNT(*) FROM Customer;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                } else {
                    pageCount = Math.ceil(rows[0]['COUNT(*)'] / data.count);
                }
            });

    conn.query(`SELECT c.cID, c.cFName, c.cLName, c.email, COALESCE(spent.total, 0) totSpent, COALESCE(visit.totVisits, 0) numVisits FROM Customer c
                    LEFT JOIN (
                    SELECT SUM(pp.totCost * pp.qty) total, cID 
                    FROM Purchase p 
                    INNER JOIN ProductPurchase pp
                    WHERE pp.orderID = p.orderID  
                    GROUP BY p.cID) 
                AS spent  ON spent.cID = c.cID
                LEFT JOIN (
                    SELECT COUNT(*) totVisits, cID 
                    FROM Reservation r 
                    WHERE r.resTime < CURRENT_TIME
                    GROUP BY r.cID
                ) AS visit ON  visit.cID = c.cID 
                ORDER BY ` + data.sort + `  
                LIMIT ` + data.page * data.count + `, ` + data.count + `;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.send(getErrPage());
                } else {
                    let content = '';

                    for(r of rows)
                    {
                        content +=  '<div id="' + r.cID + '" class="product-row" style="margin-bottom:0;margin-top:10px" onclick="getCurrAdvert(this.id);">'+
                                            '<div class="product-col left">'+
                                                '<div style="flex-direction: column;">'+
                                                    '<div class="product-name">' + r.cLName + ', ' + r.cFName + '</div>'+
                                                    '<div class="product-id">' + r.cID + '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="product-col center">'+
                                                '<div class="product-type">' + r.email + '</div>'+
                                            '</div>'+
                                            '<div class="product-col right">'+
                                                '<div style="flex-direction: column; width: 175px">'+
                                                    '<div style="display:flex; justify-content:space-between"><div>Visits: </div><div> ' + r.numVisits + '</div></div>'+
                                                    '<div style="display:flex; justify-content:space-between"><div style="padding-right: 15px">Spent: </div><div>' + currency.format(r.totSpent) + '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="collapse" id="' + r.cID + 'Collapse">'+
                                            '<div class="card card-body" id="' + r.cID +'Card">'+
                                                'N/A'+
                                            '</div>'+
                                        '</div>';;
                    }                    
                    
                    res.json({"html":content, "numPages": pageCount});
                }
            } );

    conn.end();
});
app.post('/customer/advert', (req, res) => {
    let data = JSON.parse(req.headers.data);

    let conn = newConn();
    conn.connect();

    conn.query(`SELECT Products.productName, Products.productType, Products.productID, Advertisement.dateAdvert
                FROM Advertisement
                INNER JOIN Products ON Products.productID = Advertisement.productID
                WHERE Advertisement.cID = "` + data.id + `"
                ORDER BY Advertisement.dateAdvert DESC LIMIT 1;`
                    ,(err,rows,fields) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let content = '<div class="container"><div class="row" style="padding: 0.5em">';

                        if(rows.length > 0) {
                           
                                
                            content +=  '<div class="col-12" style="text-align:center; padding-bottom: 0.75em">Current Advertisement</div>'+
                                        '<div class="col-6" style="display:flex; align-items:center; justify-content:end; border-bottom: 2px solid;">'+
                                            '<div class="product-name">' + rows[0].productName + '</div><div class="product-id" style="padding-left:0.25em"> (' + rows[0].productType + ')</div>'+
                                        '</div>'+
                                        '<div class="col-6" style="display:flex; align-items:center; justify-content:start; border-bottom: 2px solid;">'+
                                            '<div class="product-name">' + rows[0].dateAdvert.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) + ' - ' + rows[0].dateAdvert.toLocaleTimeString([], { timeStyle: 'short' }) + '</div>'+
                                        '</div>';
                        }

                        content +=  '<div class="col-12" style="text-align:center; padding:1em">'+
                                        '<div>Create A New Advertisement</div>'+
                                    '</div>' +
                                    '<div class="col-6" style="display: flex; justify-content: center">'+
                                        '<button type="button" class="btn btn-info" onclick="createNewAdvert(`' + data.id + '`,`qty`)">Highest Quantity</button>'+
                                    '</div>'+
                                    '<div class="col-6" style="display: flex; justify-content: center">'+
                                        '<button type="button" class="btn btn-info" onclick="createNewAdvert(`' + data.id + '`, `totCost`)">Highest Spent</button>'+
                                    '</div>';

                        content += '</div></div>';

                        res.json({"id": data.id, "html":content});
                    }
            });

    conn.end();
});
//NEEDS COST EDIT for qty vs TotSold
app.post('/customer/new_advert', (req,res) => {
    let data = JSON.parse(req.headers.data);
    let conn = newConn();
    conn.connect();
    
    conn.query(`INSERT INTO Advertisement
                 VALUES ( 
                            "` + data.id + `",
                            NOW(),
                            (   
                                SELECT 
                                    CASE
                                        WHEN ( (SELECT COUNT(*) FROM  Purchase WHERE cID = "` + data.id + `") > 0) 
                                            THEN (  SELECT ProductPurchase.productID
                                                    FROM ProductPurchase
                                                    INNER JOIN Purchase ON Purchase.orderID = ProductPurchase.orderID
                                                    WHERE Purchase.cID = "` + data.id + `"
                                                    GROUP BY ProductPurchase.productID
                                                    ORDER BY SUM(ProductPurchase.` + data.type + `) DESC LIMIT 1
                                                    )
                                        ELSE (SELECT productID FROM Products ORDER BY RAND() LIMIT 1)
                                    END AS newID
                                FROM ProductPurchase LIMIT 1
                            )

                 );`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.json({"id": data.id, "msg": "The Advertisement was NOT successfully added to the database. Please retry."});
                } else {
                    res.json({"id": data.id, "msg": "The Advertisement was successfully added to the database."});
                }
            } );

    conn.end();
});

/*-----_____-----  Purchases -----_____-----*/
app.get('/purchases', (req, res) => {
    let pageCount = 1;
    let purchPerPg = 10; //Purchases shown per page
    let base = getPageBase("Purchases");
    let conn = newConn();
    conn.connect();

    let content =   '<script src="./js/purchasePage.js"></script>'+
                        '<div class="container" style="padding: 0.5em">'+
                            '<div class="row">'+
                                '<div class="col-4" style="text-align:left">'+
                                    'Showing '+
                                    '<select id="resultCountBox" style="padding: 5px;" onchange="getPurchList(this.id)">'+
                                        '<option value="5">5</option>'+
                                        '<option value="10" selected>10</option>'+
                                        '<option value="15">15</option>'+
                                        '<option value="25">25</option>'+
                                        '<option value="50">50</option>'+
                                        '<option value="75">75</option>'+
                                        '<option value="100">100</option>'+
                                    '</select>'+
                                    ' per page'+
                                '</div>'+
                                '<div class="col-4" style="text-align:center">'+
                                    'Sort by '+
                                    '<select id="sortBox" style="padding: 5px" onchange="getPurchList(this.id)">'+
                                        '<option value="Purchase.orderFillDate DESC, Customer.cLName ASC, Employees.eLName  ASC" selected>Date</option>'+
                                        '<option value="Customer.cLName ASC, Customer.cFName, Purchase.orderFillDate DESC, Employees.eLName  ASC">Customer</option>'+
                                        '<option value="Employees.eLName ASC, Employees.eFName, Purchase.orderFillDate DESC, Customer.cLName  ASC">Employee</option>'+
                                        '<option value="orderTotal DESC, Purchase.orderFillDate DESC, Customer.cLName ASC, Employees.eLName ASC">Total Spent</option>'+
                                    '</select>'+
                                '</div>';

    conn.query(`SELECT COUNT(*) FROM Purchase;`
        ,(err,rows,fields) => {
            if (err) {
                console.log(err);
            } else {
                pageCount = Math.ceil(rows[0]['COUNT(*)'] / purchPerPg);

                content +=  '<div class="col-4" style="text-align:right">'+
                                'Page '+
                                '<input type="number" id="pageNumBox" value="1" min="1" max="' + pageCount + '" onchange="getPurchList(this.id)">'+
                                ' of <span id="pgCountSpan">' + pageCount + '</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
            }
        });

    conn.query(`SELECT Purchase.*, SUM(ProductPurchase.totCost) orderTotal, Employees.eFName, Employees.eLName, Customer.cFName, Customer.cLName, Customer.email 
                FROM Purchase 
                INNER JOIN ProductPurchase ON Purchase.orderID = ProductPurchase.orderID 
                INNER JOIN Employees ON Purchase.eID = Employees.eID 
                INNER JOIN Customer ON Purchase.cID = Customer.cID 
                GROUP BY orderID
                ORDER BY Purchase.orderFillDate DESC, orderTotal DESC, Customer.cLName ASC, Customer.cFName ASC, Employees.eLName  ASC, Employees.eFName  ASC LIMIT 0,` + purchPerPg + `;`
                ,(err,rows,fields) => {
                    if (err) {
                        console.log(err);
                        res.send(getErrPage());
                    } else {
                        content += '<div id="purchContainer" class="product-container">';

                        for(r of rows)
                        {
                            content +=  '<div id="' + r.orderID + '" class="product-row" style="margin-bottom: 0; margin-top: 10px;" onclick="getPurchRcpt(this.id);">'+
                                                '<div class="product-col left">'+
                                                    '<div style="flex-direction: column;">'+
                                                        '<div class="product-name">' + r.orderFillDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) + ' - ' + r.orderFillDate.toLocaleTimeString([], { timeStyle: 'short' }) + '</div>'+
                                                        '<div class="product-id">' + r.orderID + '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="product-col center" style="flex-direction:column">'+
                                                    '<div class="product-type">' + r.email + '</div>'+
                                                    '<div class="product-type" style="font-weight:bold">' + currency.format(parseInt(r.orderTotal)) + '</div>'+
                                                '</div>'+
                                                '<div class="product-col right">'+
                                                    '<div style="flex-direction: column; width: 350px">'+
                                                        '<div style="display:flex; justify-content:space-between"><div style="padding-right: 15px">Customer:</div><div class="product-name"> ' + r.cFName + ' ' + r.cLName  + '</div></div>'+
                                                        '<div style="display:flex; justify-content:space-between"><div style="padding-right: 15px">Employee:</div><div class="product-name">' + r.eFName + ' ' + r.eLName + '</div></div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="collapse" id="' + r.orderID + 'Collapse">'+
                                                '<div class="card card-body" id="' + r.orderID +'Card">'+
                                                    'N/A'+
                                                '</div>'+
                                            '</div>';
                        }

                        content += '</div>';
                        
                        
                        
                        
                        res.send(base.head  + content + base.foot);
                        conn.end();
                    }
            } );
});
app.post('/purchases/receipts', (req,res) => {
    let pageCount;
    let data = JSON.parse(req.headers.data);

    let conn = newConn();
    conn.connect();

    conn.query(`SELECT ProductPurchase.qty, ProductPurchase.totCost, Products.productName, Products.productType
                FROM ProductPurchase
                INNER JOIN Products ON ProductPurchase.productID=Products.productID
                WHERE ProductPurchase.orderID = "` + data.order + `"
                ORDER BY Products.productName;`
                    ,(err,rows,fields) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let content = '<div class="container"><div class="row">';
                        let total = 0;

                        for (r of rows) {
                            total += r.totCost;

                            content +=  '<div class="col-4">'+
                                            '<div class="product-name">' + r.productName + '</div>'+
                                        '</div>';

                            content +=  '<div class="col-2">'+
                                            '<div style="text-align:center">' + r.productType.charAt(0).toUpperCase() + r.productType.slice(1) + '</div>'+
                                        '</div>';

                            content +=  '<div class="col-1">'+
                                            '<div class="product-id" style="text-align:right">' + r.qty + '</div>'+
                                        '</div>';
                            content +=  '<div class="col-1">'+
                                            '<div class="product-id" style="text-align:center"> @ </div>'+
                                        '</div>';
                            content +=  '<div class="col-1">'+
                                            '<div class="product-id" style="text-align:right">'+ currency.format(r.totCost/r.qty) + '</div>'+
                                        '</div>';

                            content +=  '<div class="col-3">'+
                                            '<div style="text-align:right">' + currency.format(r.totCost) + '</div>'+
                                        '</div>';


                        }
                        content +=  '<div class="col-12" style="text-align:right;">'+
                                        '<div class="product-name" style="border-top: 2px solid black;">' + currency.format(total) + '</div>'+
                                    '</div>';

                        content += '</div></div>';

                        res.json({"id": data.order, "html":content});
                    }
            });

    conn.end();
});
app.post('/purchases/page', (req,res) => {
    let pageCount;
    let data = JSON.parse(req.headers.data);

    let conn = newConn();
    conn.connect();

    conn.query(`SELECT COUNT(*) FROM Purchase;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                } else {
                    pageCount = Math.ceil(rows[0]['COUNT(*)'] / data.count);
                }
            });
            

    conn.query(`SELECT Purchase.*, SUM(ProductPurchase.totCost) orderTotal, Employees.eFName, Employees.eLName, Customer.cFName, Customer.cLName, Customer.email 
                FROM Purchase 
                INNER JOIN ProductPurchase ON Purchase.orderID = ProductPurchase.orderID 
                INNER JOIN Employees ON Purchase.eID = Employees.eID 
                INNER JOIN Customer ON Purchase.cID = Customer.cID 
                GROUP BY orderID
                ORDER BY ` + data.sort + ` LIMIT ` + data.page * data.count + `, ` + data.count + `;` //ORDER BY ` + data.sort+ ` ect
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.send(getErrPage());
                } else {
                    let content = '';

                    for(r of rows)
                    {
                        content +=  '<div id="' + r.orderID + '" class="product-row" style="margin-bottom: 0; margin-top: 10px;" onclick="getPurchRcpt(this.id);">'+
                                            '<div class="product-col left">'+
                                                '<div style="flex-direction: column;">'+
                                                    '<div class="product-name">' + r.orderFillDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) + '</div>'+
                                                    '<div class="product-id">' + r.orderID + '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="product-col center" style="flex-direction:column">'+
                                                '<div class="product-type">' + r.email + '</div>'+
                                                '<div class="product-type" style="font-weight:bold">' + currency.format(parseInt(r.orderTotal)) + '</div>'+
                                            '</div>'+
                                            '<div class="product-col right">'+
                                                '<div style="flex-direction: column; width: 350px">'+
                                                    '<div style="display:flex; justify-content:space-between"><div style="padding-right: 15px">Customer:</div><div class="product-name"> ' + r.cFName + ' ' + r.cLName  + '</div></div>'+
                                                    '<div style="display:flex; justify-content:space-between"><div style="padding-right: 15px">Employee:</div><div class="product-name">' + r.eFName + ' ' + r.eLName + '</div></div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="collapse" id="' + r.orderID + 'Collapse">'+
                                            '<div class="card card-body" id="' + r.orderID +'Card">'+
                                                'N/A'+
                                            '</div>'+
                                        '</div>';
                    }
                    
                    res.json({"html":content, "numPages": pageCount});
                }
            } );

    conn.end();
});

/*-----_____----- Reservations  -----_____-----*/
app.get('/reservations', (req, res) => {
    let pageCount = 1;
    let resPerPg = 10; //Purchases shown per page
    let base = getPageBase("Reservations");
    let conn = newConn();
    conn.connect();

    let content =   '<script src="./js/reservationPage.js"></script>'+
                        '<div class="container" style="padding: 0.5em">'+
                            '<div class="row">'+
                                '<div class="col-4" style="text-align:left">'+
                                    'Showing '+
                                    '<select id="resultCountBox" style="padding: 5px;" onchange="getResList(this.id)">'+
                                        '<option value="5">5</option>'+
                                        '<option value="10" selected>10</option>'+
                                        '<option value="15">15</option>'+
                                        '<option value="25">25</option>'+
                                        '<option value="50">50</option>'+
                                        '<option value="75">75</option>'+
                                        '<option value="100">100</option>'+
                                    '</select>'+
                                    ' per page'+
                                '</div>'+
                                '<div class="col-4" style="text-align:center">'+
                                    'Sort by '+
                                    '<select id="sortBox" style="padding: 5px" onchange="getResList(this.id)">'+
                                        '<option value="Reservation.resTime DESC, Customer.cLName ASC, Employees.eLName  ASC" selected>Date</option>'+
                                        '<option value="Customer.cLName ASC, Customer.cFName, Reservation.resTime DESC, Employees.eLName  ASC">Customer</option>'+
                                        '<option value="Employees.eLName ASC, Employees.eFName, Reservation.resTime DESC, Customer.cLName  ASC">Employee</option>'+
                                    '</select>'+
                                '</div>';

    conn.query(`SELECT COUNT(*) FROM Reservation;`
        ,(err,rows,fields) => {
            if (err) {
                console.log(err);
            } else {
                pageCount = Math.ceil(rows[0]['COUNT(*)'] / resPerPg);

                content +=  '<div class="col-4" style="text-align:right">'+
                                'Page '+
                                '<input type="number" id="pageNumBox" value="1" min="1" max="' + pageCount + '" onchange="getResList(this.id)">'+
                                ' of <span id="pgCountSpan">' + pageCount + '</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
            }
        });

    conn.query(`SELECT Reservation.*, Employees.eFName, Employees.eLName, Customer.cFName, Customer.cLName 
                FROM Reservation 
                INNER JOIN Employees ON Reservation.eID = Employees.eID 
                INNER JOIN Customer ON Reservation.cID = Customer.cID 
                ORDER BY Reservation.resTime DESC, Customer.cLName ASC, Customer.cFName ASC, Employees.eLName  ASC, Employees.eFName  ASC LIMIT 0,` + resPerPg + `;`
                ,(err,rows,fields) => {
                    if (err) {
                        console.log(err);
                        res.send(getErrPage());
                    } else {
                        content += '<div id="resContainer" class="product-container">';

                        for(r of rows)
                        {
                            content +=  '<div class="product-row" style="margin-bottom: 0; margin-top: 10px;" onclick="getResDets(`' + r.resTime + '`,`' + r.cID+ '`);">'+
                                                '<div class="product-col left">'+
                                                    '<div style="flex-direction: column; justify-content:center">'+
                                                        '<div class="product-name">' + r.resTime.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) + ' - ' + r.resTime.toLocaleTimeString([], { timeStyle: 'short' }) + '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="product-col center">'+
                                                    '<div style="flex-direction: column; align-items:center; justif-content:center; text-align:center">'+
                                                        '<div class="product-id">Customer(' + r.cID + ')</div>'+
                                                        '<div class="product-name"> ' + r.cFName + ' ' + r.cLName  + '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="product-col right">'+
                                                    '<div style="flex-direction: column; align-items:center; justif-content:center; text-align:center">'+
                                                        '<div class="product-id">Employee(' + r.eID + ')</div>'+
                                                        '<div class="product-name">' + r.eFName + ' ' + r.eLName + '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="collapse" id="' + r.cID + 'Collapse">'+
                                                '<div class="card card-body" id="' + r.cID +'Card">'+
                                                    'N/A'+
                                                '</div>'+
                                            '</div>';
                        }

                        content += '</div>';
                        
                        res.send(base.head + content + base.foot);
                        conn.end();
                    }
            } );
});
app.post('/reservations/page', (req,res) => {
    let pageCount;
    let data = JSON.parse(req.headers.data);

    let conn = newConn();
    conn.connect();

    conn.query(`SELECT COUNT(*) FROM Reservation;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                } else {
                    pageCount = Math.ceil(rows[0]['COUNT(*)'] / data.count);
                }
            });
            

    conn.query(`SELECT Reservation.*, Employees.eFName, Employees.eLName, Customer.cFName, Customer.cLName 
                FROM Reservation 
                INNER JOIN Employees ON Reservation.eID = Employees.eID 
                INNER JOIN Customer ON Reservation.cID = Customer.cID 
                ORDER BY ` + data.sort + ` LIMIT ` + data.page * data.count + `,` + data.count + `;`
                ,(err,rows,fields) => {
                    if (err) {
                        console.log(err);
                        res.send(getErrPage());
                    } else {
                        let content = '';

                        for(r of rows)
                        {
                            content +=  '<div class="product-row" style="margin-bottom: 0; margin-top: 10px;" onclick="getResDets(`' + r.resTime + '`,`' + r.cID+ '`);">'+
                                                '<div class="product-col left">'+
                                                    '<div style="flex-direction: column; justify-content:center">'+
                                                        '<div class="product-name">' + r.resTime.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) + ' - ' + r.resTime.toLocaleTimeString([], { timeStyle: 'short' }) + '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="product-col center">'+
                                                    '<div style="flex-direction: column; align-items:center; justif-content:center; text-align:center">'+
                                                        '<div class="product-id">Customer(' + r.cID + ')</div>'+
                                                        '<div class="product-name"> ' + r.cFName + ' ' + r.cLName  + '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="product-col right">'+
                                                    '<div style="flex-direction: column; align-items:center; justif-content:center; text-align:center">'+
                                                        '<div class="product-id">Employee(' + r.eID + ')</div>'+
                                                        '<div class="product-name">' + r.eFName + ' ' + r.eLName + '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="collapse" id="' + r.cID + 'Collapse">'+
                                                '<div class="card card-body" id="' + r.cID +'Card">'+
                                                    'N/A'+
                                                '</div>'+
                                            '</div>';
                        }
                        
                        res.json({"html":content, "numPages": pageCount});
                    }
                } );
    conn.end();
});

/*-----_____----- Shipments -----_____-----*/
app.get('/shipments', (req, res) => {
    let pageCount = 1;
    let shipPerPg = 10; //Purchases shown per page
    let base = getPageBase("Shipments");
    let conn = newConn();
    conn.connect();

    let content =   '<script src="./js/shipmentPage.js"></script>'+
                        '<div class="container" style="padding: 0.5em">'+
                            '<div class="row">'+
                                '<div class="col-4" style="text-align:left">'+
                                    'Showing '+
                                    '<select id="resultCountBox" style="padding: 5px;" onchange="getShipList(this.id)">'+
                                        '<option value="5">5</option>'+
                                        '<option value="10" selected>10</option>'+
                                        '<option value="15">15</option>'+
                                        '<option value="25">25</option>'+
                                        '<option value="50">50</option>'+
                                        '<option value="75">75</option>'+
                                        '<option value="100">100</option>'+
                                    '</select>'+
                                    ' per page'+
                                '</div>'+
                                '<div class="col-4" style="text-align:center">'+
                                    'Sort by '+
                                    '<select id="sortBox" style="padding: 5px" onchange="getShipList(this.id)">'+
                                        '<option value="shipmentDate DESC, supplierName ASC" selected>Date</option>'+
                                        '<option value="supplierName  ASC, shipmentDate DESC">Supplier</option>'+
                                    '</select>'+
                                '</div>';

    conn.query(`SELECT COUNT(*) FROM Shipment;`
        ,(err,rows,fields) => {
            if (err) {
                console.log(err);
            } else {
                pageCount = Math.ceil(rows[0]['COUNT(*)'] / shipPerPg);

                content +=  '<div class="col-4" style="text-align:right">'+
                                'Page '+
                                '<input type="number" id="pageNumBox" value="1" min="1" max="' + pageCount + '" onchange="getShipList(this.id)">'+
                                ' of <span id="pgCountSpan">' + pageCount + '</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
            }
        });

    conn.query(`SELECT * FROM Shipment ORDER BY shipmentDate DESC, supplierName ASC LIMIT 0,` + shipPerPg + `;`
                ,(err,rows,fields) => {
                    if (err) {
                        console.log(err);
                        res.send(getErrPage());
                    } else {
                        content += '<div id="shipContainer" class="product-container">';

                        for(r of rows)
                        {
                            content +=  '<div id="' + r.shipmentID + '" class="product-row" style="margin-bottom: 0; margin-top: 10px;" onclick="getShipRcpt(this.id);">'+
                                                '<div class="product-col left">'+
                                                    '<div style="flex-direction: column;">'+
                                                        '<div class="product-name">' + r.shipmentDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) + ' - ' + r.shipmentDate.toLocaleTimeString([], { timeStyle: 'short' }) + '</div>' +
                                                        '<div class="product-id">' + r.shipmentID + '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="product-col center" style="flex-direction:column">'+
                                                '</div>'+
                                                '<div class="product-col right">'+
                                                    '<div class="product-name">' + r.supplierName + '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="collapse" id="' + r.shipmentID + 'Collapse">'+
                                                '<div class="card card-body" id="' + r.shipmentID +'Card">'+
                                                    'N/A'+
                                                '</div>'+
                                            '</div>';
                        }

                        content += '</div>';
                        
                        
                        
                        
                        res.send(base.head  + content + base.foot);
                        conn.end();
                    }
            } );
});
app.post('/shipments/receipts', (req,res) => {
    let pageCount;
    let data = JSON.parse(req.headers.data);

    let conn = newConn();
    conn.connect();

    conn.query(`SELECT ProductShipment.productQty, Products.productName, Products.productType
                FROM ProductShipment
                INNER JOIN Products ON ProductShipment.productID=Products.productID
                WHERE ProductShipment.shipmentID = "` + data.id + `"
                ORDER BY Products.productName;`
                    ,(err,rows,fields) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let content = '<div class="container"><div class="row">';
                        let total = 0;

                        for (r of rows) {
                            total += r.totCost;

                            content +=  '<div class="col-4">'+
                                            '<div class="product-name">' + r.productName + '</div>'+
                                        '</div>';

                            content +=  '<div class="col-4">'+
                                            '<div style="text-align:center">' + r.productType.charAt(0).toUpperCase() + r.productType.slice(1) + '</div>'+
                                        '</div>';

                            content +=  '<div class="col-4">'+
                                            '<div class="product-id" style="text-align:right">' + r.productQty + '</div>'+
                                        '</div>';
                        }

                        content += '</div></div>';

                        res.json({"id": data.id, "html":content});
                    }
            });

    conn.end();
});
app.post('/shipments/page', (req,res) => {
    let pageCount;
    let data = JSON.parse(req.headers.data);

    let conn = newConn();
    conn.connect();

    conn.query(`SELECT COUNT(*) FROM Shipment;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                } else {
                    pageCount = Math.ceil(rows[0]['COUNT(*)'] / data.count);
                }
            });
            

    conn.query(`SELECT * FROM Shipment ORDER BY ` + data.sort + ` LIMIT ` + data.page * data.count + `, ` + data.count + `;`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.send(getErrPage());
                } else {
                    let content = '';

                    for(r of rows)
                    {
                        content +=  '<div id="' + r.shipmentID + '" class="product-row" style="margin-bottom: 0; margin-top: 10px;" onclick="getPurchRcpt(this.id);">'+
                                        '<div class="product-col left">'+
                                            '<div style="flex-direction: column;">'+
                                                '<div class="product-name">' + r.shipmentDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) + ' - ' + r.shipmentDate.toLocaleTimeString([], { timeStyle: 'short' }) + '</div>' +
                                                '<div class="product-id">' + r.shipmentID + '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="product-col center" style="flex-direction:column">'+
                                        '</div>'+
                                        '<div class="product-col right">'+
                                            '<div class="product-name">' + r.supplierName + '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="collapse" id="' + r.shipmentID + 'Collapse">'+
                                        '<div class="card card-body" id="' + r.shipmentID +'Card">'+
                                            'N/A'+
                                        '</div>'+
                                    '</div>';
                    }
                    
                    res.json({"html":content, "numPages": pageCount});
                }
            } );

    conn.end();
});

//Hosted on port 2000
app.listen(2000);