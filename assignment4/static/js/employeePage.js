//const getRandID = require('./api/randomId.js');

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
        "count": parseInt($("#resutCountBox :selected").val())
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

/* Functions that do stuff 
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

} */