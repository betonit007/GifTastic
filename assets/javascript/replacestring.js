

function strReplace(){
        var myStr = 'quick_brown_fox';
        var newStr = myStr.replace(/_/g, "-");
        
        // Insert modified string in paragraph
        document.getElementById("myText").innerHTML = newStr;
    }