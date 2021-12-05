function getCustList(id)
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
    xReq.onreadystatechange = displayCustList;

    xReq.open('POST','/customer/page',true);
    xReq.setRequestHeader('data', JSON.stringify(data));
    xReq.send(); 
}

function displayCustList()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        $('#pgCountSpan').html(msg.numPages);
        $('#pageNumBox').attr("max", msg.numPages);
        $('#custContainer').html(msg.html); //Unchecks the validation box
    }
}


function getCurrAdvert(id, truth)
{
    if (!$('#' + id + 'Collapse').hasClass('show') || truth) {
        let data = {
            "id": id
        };

        let xReq = new XMLHttpRequest();
        xReq.onreadystatechange = displayAdvert;

        xReq.open('POST','/customer/advert',true);
        xReq.setRequestHeader('data', JSON.stringify(data));
        xReq.send();  
    } else {
        $('#' + id + 'Collapse').collapse('hide');    
    }
}

function displayAdvert()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        $('#' + msg.id + 'Card').html(msg.html);

        $('#' + msg.id + 'Collapse').collapse('show');
    }
}

function createNewAdvert(id,sort)
{
    let data = {
        "id": id,
        "sort": sort
    };

    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = showNewAdvert;

    xReq.open('POST','/customer/new_advert',true);
    xReq.setRequestHeader('data', JSON.stringify(data));
    xReq.send();
}

function showNewAdvert()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let msg = JSON.parse(this.responseText);

        alert(msg.msg);
        
        if (!msg.error) {
            getCurrAdvert(msg.id, true);
        }
    }
}