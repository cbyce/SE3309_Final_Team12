
function updateProduct(id)
{
    if ($("#" + id + "idBox").val() != "" && $('#' + id + 'prodValid').prop("checked")) {
        let data = {
            "id":   $("#" + id + "idBox").val(),
            "name": ( ($("#" + id + "nameBox").val()).charAt(0).toUpperCase() + ($("#" + id + "nameBox").val()).slice(1).toLowerCase() ),
            "type": $("#" + id + "typeBox :selected").val(),
            "qty":  parseInt($('#' + id + 'qtyBox').val()),
            "price": parseFloat($('#' + id + 'priceBox').val())
        };

        let xReq = new XMLHttpRequest();
        xReq.onreadystatechange = displayFeedback;

        xReq.open('POST','/products/update',true);
        xReq.setRequestHeader('data', JSON.stringify(data));
        xReq.send(); 
    } else {
        $('#' + id + 'prodUptBtn').blur();
    }
} 

function insertProduct()
{
    
    if ($("#nameBox").val() != "" && $("#nameBox").val() != " " && $('#prodValid').prop("checked")) {
        let data = {
            "id":   getRandID(),
            "name": ($("#nameBox").val()).charAt(0).toUpperCase() + ($("#nameBox").val()).slice(1),
            "type": $("#typeBox :selected").val(),
            "qty":  parseInt($('#qtyBox').val()),
            "price": parseFloat($('#priceBox').val())
        };

        //ADD ERROR HANDELING

        let xReq = new XMLHttpRequest();
        xReq.onreadystatechange = displayFeedback;

        xReq.open('POST','/products/insert',true);
        xReq.setRequestHeader('data', JSON.stringify(data));
        xReq.send();
    } else {
        $('#prodAddBtn').blur();
    }
}

function displayFeedback()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        $('#' + msg.data.id + 'prodValid').prop("checked", false); //Unchecks the validation box

        if (!msg.error) {
            $('#' + msg.data.id + 'ProdName').html(msg.data.name);
            $('#' + msg.data.id + 'ProdType').html((msg.data.type).charAt(0).toUpperCase() + (msg.data.type).slice(1));
            $('#' + msg.data.id + 'ProdPrice').html(msg.data.price);
            $('#' + msg.data.id + 'ProdQty').html(msg.data.qty);
            $('#' + msg.data.id + 'Collapse').collapse('hide');
        } else {
            alert(msg.msg);
        }
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

    //return Math.random().toString(36).substr(2, 8); //Same as above just only returns lowercase

}