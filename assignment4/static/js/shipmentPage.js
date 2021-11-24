function getShipList(id)
{
    let pageNum;
    if (id != 'pageNumBox') {
        pageNum = 0;
        $('#pageNumBox').val("1");
    } else {
        pageNum = (parseInt($('#pageNumBox').val()) - 1);
    }

    let data = {
        "page": pageNum,
        "sort": $("#sortBox :selected").val(),
        "count": parseInt($("#resultCountBox :selected").val())
    };

    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = displayShipList;

    xReq.open('POST','/shipments/page',true);
    xReq.setRequestHeader('data', JSON.stringify(data));
    xReq.send();  
}

function displayShipList()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        $('#pgCountSpan').html(msg.numPages);
        $('#pageNumBox').attr("max", msg.numPages);
        $('#shipContainer').html(msg.html); //Unchecks the validation box
    }
}

function getShipRcpt(id)
{
    if (!$('#' + id + 'Collapse').hasClass('show') && $('#' + id + 'Card').html() == 'N/A') {
        let data = {
            "id": id
        };

        let xReq = new XMLHttpRequest();
        xReq.onreadystatechange = displayReciept;

        xReq.open('POST','/shipments/receipts',true);
        xReq.setRequestHeader('data', JSON.stringify(data));
        xReq.send();  
    } else {
        if (!$('#' + id + 'Collapse').hasClass('show') && $('#' + id + 'Card').html() !== 'N/A') {
            $('#' + id + 'Collapse').collapse('show');
        } else {
            $('#' + id + 'Collapse').collapse('hide');
        }
    }
}

function displayReciept()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        $('#' + msg.id + 'Card').html(msg.html);

        $('#' + msg.id + 'Collapse').collapse('show');
    }
}