const express = require('express');
const newProductsConn = require('./js/conn/products.js');
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

                            '<!-- Personal Code -->'+
                            '<script src="./js/productPage.js"></script>'+ //CHANGE LATER TO HAVE SELECT HANDLE THIS BASED ON PAGE NAME
                        
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
                        
                                    '<a id="customers-btn" class="btn-round nav-btn"><i class="fas fa-receipt"></i></a>'+
                            
                                    '<div class="line-seperator"></div>'+
                                    
                                    '<a id="employee-btn" class="btn-round nav-btn"><i class="fas fa-id-badge"></i></a>'+
                                    
                                    '<div class="line-seperator"></div>'+
                                    
                                    '<a id="reservation-btn" class="btn-round nav-btn"><i class="fas fa-calendar"></i></a>'+
                            
                                    '<div class="line-seperator"></div>'+
                        
                                    '<a id="ads-btn" class="btn-round nav-btn"><i class="fas fa-mail-bulk"></i></a>'+
                            
                                    '<div class="line-seperator"></div>'+
                            
                                    '<a id="shipment-btn" class="btn-round nav-btn"><i class="fas fa-ship"></i></a>'+
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
    let base = getpageBase('Error'); 

    return (base.head + 'An Error Has Occured, Please try again later.' + base.foot);
}

app.get('/products', (req,res) => {
    let content =   '<div class="container" style="border: 2px solid black;border-radius: 7px; padding: 0.75em">'+
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
                                '<button id="prodDelBtn" type="button" class="btn btn-danger" style="width: 85px" onclick="deleteProduct();">Delete</button>'+
                                '<button id="prodUptBtn" type="button" class="btn btn-primary" style="width: 85px" onclick="updateProduct();">Update</button>'+
                                '<button id="prodAddBtn" type="button" class="btn btn-success" style="width: 85px" onclick="insertProduct();">Add</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

    let base = getPageBase("Products");
    let conn = newProductsConn();
    conn.connect();
    conn.query(`SELECT * FROM Products ORDER BY productName ASC`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.send(getErrPage());
                } else {
                    content += '<div class="product-container">';
                    let icon;

                    for(r of rows)
                    {
                        switch (r.productType)
                        {
                            case 'flower':
                                icon = 'joint';
                                break;
                            case 'vape':
                                icon = 'smoking';
                                break;
                            case 'oil':
                                icon = 'eye-dropper';
                                break;
                            case 'edible':
                                icon = 'cookie';
                                break;
                            default:
                                icon = 'cannabis';
                                break;
                        }
                        content +=  '<div id="' + r.productID + '" class="product-row" onclick="prepProductDisplay(this.id);">'+
                                        '<div class="product-col left">'+
                                            '<div style="flex-direction: column;">'+
                                                '<div class="product-name">' + r.productName+ '</div>'+
                                                '<div class="product-id">' + r.productID + '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="product-col center">'+
                                            '<div class="product-type"><i class="fas fa-' + icon + '"></i> ' + (r.productType).charAt(0).toUpperCase() + (r.productType).slice(1) + '</div>'+
                                        '</div>'+
                                        '<div class="product-col right">'+
                                            '<div class="product-qty">Stock: ' + r.quantity + '</div>'+
                                        '</div>'+
                                    '</div>';
                    }

                    content += '</div>';
                    
                    
                    
                    
                    res.send(base.head + content + base.foot);
                }
            } );

    conn.end();
});

app.post('/products/info', (req,res) => {
    let data = JSON.parse(req.headers.data);
    let conn = newProductsConn();
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

    let conn = newProductsConn();
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

    let conn = newProductsConn();
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

    let conn = newProductsConn();
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

//Hosted on port 2000
app.listen(2000);