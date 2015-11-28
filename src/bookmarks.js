$(function(){
    var lowerCase = new Array();
    var $jsontip = $("#jsonTip");
    $.getJSON("data/bookmarks.json",function(data){
        $jsontip.empty();
        var strHtml = "";
        $.each(data,function(infoIndex,info){
            var realtime = getRealTime(info["created"] );
            strHtml += createHtml(info["title"],realtime)
            pushLowCase(info,lowerCase);
          })
          $jsontip.html(strHtml);
      });

    $("#textbox").on('input', function (){
        var value = $(this).val();
        $jsontip.empty();
        $.getJSON("data/bookmarks.json",function(data){
            var strHtml = "";
            $.each(lowerCase,function(infoIndex,info){
                if (info["title"].indexOf(value.toLowerCase()) !=-1) {
                    var realtime = getRealTime(info["created"]);
                    var title = createHightLight();
                    strHtml += createHtml(title,realtime);
                    function createHightLight() {
                      var position = info["title"].indexOf(value.toLowerCase());
                      var defaultTitle = data[infoIndex].title;
                      var title =  defaultTitle.substring(0,position) + "<mark>";
                      title +=defaultTitle.substring(position,position+value.length) + "</mark>";
                      return title += defaultTitle.substring(position+value.length,data[infoIndex].length);
                    }
                }
              })
              $jsontip.html(strHtml);
      });
      });

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

      function pushLowCase(info,lowerCase) {
        info = _.mapObject(info, function(val, key) {
            return val.toLowerCase();
        });
        lowerCase.push(info);
      }
})
