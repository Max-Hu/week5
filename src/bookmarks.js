$(function(){
    var $jsontip = $("#jsonTip");
    $.getJSON("data/bookmarks.json",function(data){
        $jsontip.empty();
        var strHtml = "";
        $.each(data,function(infoIndex,info){
            var realtime = getRealTime(info["created"] );
            strHtml += createHtml(info["title"],realtime)
          })
          $jsontip.html(strHtml);
      });

    $("#textbox").on('input', function (){
        var value = $(this).val();
        $jsontip.empty();
        $.getJSON("data/bookmarks.json",function(data){
            var searchData = _.filter(data, function(object){ return object["title"].toLowerCase().indexOf(value.toLowerCase()) !=-1; });
            var strHtml = "";
            $.each(searchData,function(infoIndex,info){
                    var realtime = getRealTime(info["created"]);
                    var title = createHighLightTitle(info["title"],value);
                    strHtml += createHtml(title,realtime);
              })
              $jsontip.html(strHtml);
      });
      });

      function createHighLightTitle(title,input) {
          var position = title.toLowerCase().indexOf(input.toLowerCase());
          var result =  title.substring(0,position) + "<mark>";
          result +=title.substring(position,position+input.length) + "</mark>";
          return result += title.substring(position+input.length,title.length);
      }

      function getRealTime(time) {
        var time = new Date( time *1000);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        month = month > 10 ? month : '0' + month;
        var day = time.getDay();
        day = day > 10 ? day : '0' + day;
        return year + '-' + month + '-' + day;
      }

      function createHtml(title,realtime) {
        var strHtml = "";
        strHtml +="<div id=\'listitem\'>";
        strHtml += "<div class=\'title\' >"+title+"</div>";
        strHtml += "<div class=\'time\'>"+"Created @ "+realtime+"</div>";
        strHtml +="</div>";
        strHtml += "<hr class=\'hr\'>"
        return strHtml;
      }
})
