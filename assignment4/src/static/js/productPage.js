
function updateProduct(id)
{
    let idVal = $("#" + id + "idBox").val();
    let name = ( ($("#" + id + "nameBox").val()).charAt(0).toUpperCase() + ($("#" + id + "nameBox").val()).slice(1).toLowerCase() );
    let qty = parseInt($('#' + id + 'qtyBox').val());
    let price = parseFloat($('#' + id + 'priceBox').val());

    let validName = name !== "" && name.charAt(0) !== " " && name.length < 50;
    let validQty = !Number.isNaN(qty) && qty >= 0 && qty < 999999999;
    let validPrice = !Number.isNaN(price) && price > 0 && price < 10000;

    if (validName && validQty && validPrice && idVal != "" && $('#' + id + 'prodValid').prop("checked")) {
        let data = {
            "id":   idVal,
            "name": name,
            "type": $("#" + id + "typeBox :selected").val(),
            "qty":  qty,
            "price": price
        };

        let xReq = new XMLHttpRequest();
        xReq.onreadystatechange = displayUpdateFeedback;

        xReq.open('POST','/products/update',true);
        xReq.setRequestHeader('data', JSON.stringify(data));
        xReq.send(); 
    } else {
        $('#' + id + 'prodUptBtn').blur();

        if (!validName) {
            getInputErr('name', name);
        } else if (!validQty) {
            getInputErr('qty', qty);
        } else if (!validPrice) {
            getInputErr('price',price);
        } else if (!$('#' + id + 'prodValid').prop("checked")) {
            getInputErr('valid', null);
        } else {
            getInputErr(null,null);
        }
    }
} 

function insertProduct()
{
    let name = ($("#nameBox").val()).charAt(0).toUpperCase() + ($("#nameBox").val()).slice(1).toLowerCase();
    let qty = parseInt($('#qtyBox').val());
    let price = parseFloat($('#priceBox').val());

    let validName = name !== "" && name.charAt(0) !== " " && name.length < 50;
    let validQty = !Number.isNaN(qty) && qty >= 0 && qty < 999999999;
    let validPrice = !Number.isNaN(price) && price > 0 && price < 10000;
    
    if (validName && validQty && validPrice) {
        let data = {
            "id":   getRandID(),
            "name": name,
            "type": $("#typeBox :selected").val(),
            "qty":  qty,
            "price": price
        };

        let xReq = new XMLHttpRequest();
        xReq.onreadystatechange = displayAlertFeedback;

        xReq.open('POST','/products/insert',true);
        xReq.setRequestHeader('data', JSON.stringify(data));
        xReq.send();
    } else {
        $('#prodAddBtn').blur();

        if (!validName) {
            getInputErr('name', name);
        } else if (!validQty) {
            getInputErr('qty', qty);
        } else if (!validPrice) {
            getInputErr('price',price);
        } else {
            getInputErr(null,null);
        }
    }
}

function displayUpdateFeedback()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        $('#' + msg.data.id + 'prodUptBtn').blur();
        $('#' + msg.data.id + 'prodValid').prop("checked", false); //Unchecks the validation box

        if (!msg.error) {
            $('#' + msg.data.id + 'ProdName').html(msg.data.name);
            $("#" + msg.data.id + "nameBox").val(msg.data.name);

            $('#' + msg.data.id + 'ProdType').html((msg.data.type).charAt(0).toUpperCase() + (msg.data.type).slice(1));

            $('#' + msg.data.id + 'ProdPrice').html(msg.data.price);
            $('#' + msg.data.id + 'priceBox').val(msg.data.price.replace('$',''));

            $('#' + msg.data.id + 'ProdQty').html(msg.data.qty);
            $('#' + msg.data.id + 'qtyBox').val(msg.data.qty);

            $('#' + msg.data.id + 'Collapse').collapse('hide');
        } 
        
        alert(msg.msg);
        
    }
}

function displayAlertFeedback() 
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        alert(msg.msg);
    }
}

function collapseProdDisp(id)
{
    if($('#' + id + 'Collapse').hasClass('show')) {
        $('#' + id + 'Collapse').collapse('hide');
    } else {
        $('#' + id + 'Collapse').collapse('show');
    }
}



function getProdList(id)
{
    let pageNum;
    if (id != 'pageNumBox') {
        pageNum = 0;
        $('#pageNumBox').val("1");
    } else {
        pageNum = (parseInt($('#pageNumBox').val()) - 1);
    }
    let sqlType = ( ( "" == $("#prodTypeBox :selected").val()) ? '' : 'WHERE productType="' + $("#prodTypeBox :selected").val() + '"');

    let data = {
        "page": pageNum,
        "sort": $("#sortBox :selected").val(),
        "type": sqlType,
        "count": parseInt($("#resultCountBox :selected").val())
    };

    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = displayProductsList;

    xReq.open('POST','/products/page',true);
    xReq.setRequestHeader('data', JSON.stringify(data));
    xReq.send(); 
}

function displayProductsList()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        $('#pgCountSpan').html(msg.numPages);
        $('#pageNumBox').attr("max", msg.numPages);
        $('#prodContainer').html(msg.html); //Unchecks the validation box
    }
}

/* Functions that do stuff */
function getRandID() {
    const idChars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let id = '';
    let idLen = 8; // Length of id

    // Creates id out of given chars of length idLen
    for(var i = 0; i < idLen; i++) {
        id += idChars.charAt(Math.floor(Math.random() * idChars.length));
    }

    return id;
}

function getInputErr(type, val)
{
    switch (type)
    {
        case 'name':
            alert('The product name entered (' + val + ') is invalid. The name must be shorter that 50 characters and cannot be blank.');
            break;
        case 'price':
            alert('The product price entered (' + val + ') is invalid. The price must be a number between 9999.99 and 0.00, and cannot be blank.');
            break;
        case 'qty':
            alert('The product quantity entered (' + val + ') is invalid. The quantity must be an integer between 0 and 999999999, and cannot be blank.');
            break;
        case 'valid':
            alert('Please ensure to check the validation box before updating a product.');
            break;
        default:
            alert('An error occured when trying to insert/update a product.\nPlease retry or refresh the page.');
            break;
    }
}