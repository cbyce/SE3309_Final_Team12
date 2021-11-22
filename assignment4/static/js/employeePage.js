function getEmpList(id)
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
    xReq.onreadystatechange = displayEmployeeList;

    xReq.open('POST','/employees/page',true);
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
        $('#empContainer').html(msg.html); //Unchecks the validation box
    }
}