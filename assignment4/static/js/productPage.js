function updateProduct(update)
{
    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = displayFeedback;

    xReq.open('POST','/products/update',true);
    xReq.setRequestHeader('data', '{"Cam": ' + update + '}');//'data', '{"questionNum":' + qNum + ', "answered":' + ans + '}');
    xReq.send();
}

function displayFeedback()
{
    if (this.readyState == 4 && this.status == 200)
    {
        //let msg = JSON.parse(this.responseText);
        //let fDiv = document.getElementById('q' + msg.num + 'FeedbackSpan'); // Feedback span for given question id
        
        //fDiv.innerHTML = (msg.str);

        console.log(JSON.parse(this.responseText));
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