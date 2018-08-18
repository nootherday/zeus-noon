(function(){

// 1 ~ 9 한글 표시
var arrNumberWord = new Array("","일","이","삼","사","오","육","칠","팔","구");
// 10, 100, 100 자리수 한글 표시
var arrDigitWord = new  Array("","십","백","천");
// 만단위 한글 표시
var arrManWord = new  Array("","만 ","억 ","조 ");


window.Humanize = {
    toHangeul: function(v) {
        v = v.toString();
        var num_length = v.length;

        var han_value = "";
        var man_count = 0;      // 만단위 0이 아닌 금액 카운트.

        for(var i=0; i < v.length; i++) {
            // 1단위의 문자로 표시.. (0은 제외)
            var strTextWord = arrNumberWord[v.charAt(i)];

            // 0이 아닌경우만, 십/백/천 표시
            if(strTextWord !== "") {
                man_count++;
                var d = arrDigitWord[(num_length - (i+1)) % 4];
                if (strTextWord !== "일" && d !== "") {
                    strTextWord += d;
                } else if (d !== "") {
                    strTextWord = d;
                }
            }

            // 만단위마다 표시 (0인경우에도 만단위는 표시한다)
            if(man_count != 0 && (num_length - (i+1)) % 4 == 0) {
                man_count = 0;
                strTextWord = strTextWord + arrManWord[(num_length - (i+1)) / 4];
            }

            han_value += strTextWord;
        }
        return han_value;
    },
    intcomma: function(v) {
        return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

}());
