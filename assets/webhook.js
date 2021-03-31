document.getElementById('add-embed').onchange = function embed_field() {
    document.getElementById('hook-hex').disabled = !this.checked;
    document.getElementById('hook-title').disabled = !this.checked;
    document.getElementById('hook-content').disabled = !this.checked;
}

document.getElementById('add-img').onchange = function embed_field() {
    document.getElementById('file-selector').disabled = !this.checked;
}

function upload2() {
    var url = document.getElementById("hook-url").value;
    var formData = new FormData();
    formData.append("file", document.getElementById("file-selector").files[0]);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.send(formData);
}

function sendMessage() {
    var url = document.getElementById("hook-url").value;
    var plaincontent = document.getElementById("plain-content").value;
    var hex = document.getElementById("hook-hex").value;
    var title = document.getElementById("hook-title").value;
    var content = document.getElementById("hook-content").value;
    var checkbox = document.getElementById('add-embed').checked
    var checkboxImg = document.getElementById('add-img').checked

    var request = new XMLHttpRequest();
    request.open("POST", url);

    request.setRequestHeader('Content-type', 'application/json');

    var myEmbed = {
        title: title,
        description: content,
        color: hexToDecimal(hex)
    }

    if (checkbox == true) {
        var params = {
            content: plaincontent,
            embeds: [myEmbed]
        }
    }
    else {
        var params = {
            content: plaincontent
        }
    }


    request.send(JSON.stringify(params));
    if (checkboxImg == true) {
        upload2();
    }
}

function hexToDecimal(hex) {
    return parseInt(hex.replace("#", ""), 16)
}
