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
                        '<div class="page-nav footer-pos">'+
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
    let base = getPageBase("Products");
    let conn = newProductsConn();
    conn.connect();
    conn.query(`SELECT * FROM Products`
            ,(err,rows,fields) => {
                if (err) {
                    console.log(err);
                    res.send(getErrPage());
                } else {
                    let content = '<div class="product-container">';

                    for(r of rows)
                    {
                        content +=  '<div class="product-row">'+
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

//Hosted on port 2000
app.listen(2000);