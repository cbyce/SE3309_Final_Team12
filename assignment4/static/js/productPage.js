//const getRandID = require('./api/randomId.js');

function updateProduct()
{
    if ($("#idBox").val() != "" && $('#prodValid').prop("checked")) {
        let data = {
            "id":   $("#idBox").val(),
            "name": ($("#nameBox").val()).charAt(0).toUpperCase() + ($("#nameBox").val()).slice(1),
            "type": $("#typeBox :selected").val(),
            "qty":  parseInt($('#qtyBox').val()),
            "sold": parseInt($('#soldBox').val())
        };

        let xReq = new XMLHttpRequest();
        xReq.onreadystatechange = displayFeedback;

        xReq.open('POST','/products/update',true);
        xReq.setRequestHeader('data', JSON.stringify(data));
        xReq.send(); 
    } else {
        $('#prodUptBtn').blur();
    }
}

function deleteProduct()
{
    if ($("#idBox").val() != "" && $('#prodValid').prop("checked")) {
        let xReq = new XMLHttpRequest();
        xReq.onreadystatechange = displayFeedback;

        xReq.open('POST','/products/delete',true);
        xReq.setRequestHeader('data', '{"id": "' + $("#idBox").val() + '"}');
        xReq.send();
    } else {
        $('#prodDelBtn').blur();
    }
}

function insertProduct()
{
    
    if ($("#nameBox").val() != "" && $("#nameBox").val() != " " && $('#prodValid').prop("checked")) {
        let data = {
            "id":   getRandID(),
            "name": ($("#nameBox").val()).charAt(0).toUpperCase() + ($("#nameBox").val()).slice(1),
            "type": $("#typeBox :selected").val(),
            "qty":  0,
            "sold": 0
        };

        let qtyNum = parseInt($('#qtyBox').val());
        let soldNum = parseInt($('#soldBox').val())

        if(!isNaN(qtyNum)) {
            data.qty = qtyNum;
        }

        if(!isNaN(soldNum)) {
            data.sold = soldNum;
        }

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
        $('#prodValid').prop("checked", false); //Unchecks the validation box
        let msg = JSON.parse(this.responseText);
        alert(msg.msg);
    }
}

function prepProductDisplay(id)
{
    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = fillProdDisplay;

    xReq.open('POST','/products/info',true);
    xReq.setRequestHeader('data', '{"productID": "' + id + '"}');
    xReq.send();
}

function fillProdDisplay()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);
        
        if(msg.err) {
            //Handle error
        } else {
            $("#idBox").val(msg.prod.productID);
            $("#nameBox").val(msg.prod.productName);
            $("#typeBox option[value='" + msg.prod.productType + "']").attr("selected", "selected");
            $('#qtyBox').val(msg.prod.quantity);
            $('#soldBox').val(msg.prod.quantitySold);
        }
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
    xReq.onreadystatechange = displayEmployeeList;

    xReq.open('POST','/products/page',true);
    xReq.setRequestHeader('data', JSON.stringify(data));
    xReq.send(); 
}

function displayEmployeeList()
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