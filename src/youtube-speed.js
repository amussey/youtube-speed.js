//
// youtube-speed.js -- A tool to replace embedded YouTube vids with images.
//
// Copyright (c) 2014 Andrew Mussey
//
// Redistributable under a BSD license.
// See LICENSE.md for more information.
//
// Having too many videos embedded on a page can cause slowdowns and
// degradation of the user experience.  This library replaces the iframed
// YouTube videos on a page with images that, when clicked, begin playing
// the video.  This prevents the need to load HTML5 or Flash-based videos
// until the user actually wants to see them.
//
// More information is available at http://amussey.com.
//

(function() {

    if (typeof $ === 'undefined') {
        loadScript('https://code.jquery.com/jquery-1.11.0.min.js', replaceYouTubeVideos);
    } else {
        replaceYouTubeVideos();   
    }

    var play_button_logo =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4AAAAQ4CAYAAADo08FDAAA3p0lEQVR42u' +
        'zde2ydZQHH8YM6r0QkmJgYYrwQMVOQedq+b2XMbj3vWwHxEjA4iTpRRC5eIGgEvGPAWxwJEo2iJioYEU' +
        'OiYgRvBHRcrAhjW89533bd1l1gTtzY1ttp+9gNnbKgc72evv18km/6/zknff745X3eUgkAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYIrlx0XPrzYtPX5tS/sp1Th5c9acntMdd5xXi5' +
        'KL8ji9RJI0PdVaKxdnLcn51ajyrnXNy97WFVfa8ualr+56VfsxnymVnuaEAgAAAAAADqmzXF6QNy1ZlD' +
        'enF1bj5HtZlP42i5MHalHSncXptvF25nE6MP53OG/tCJKk6SlrTet5lA7W4o5d4/9zHx1v/fj/44fG/w' +
        'ffWY0rN9aaK5fVypXFD5144vOcXgAAAAAAwJNUj09eXI0qn9w39OatHYNZnNbzOB0zwkhSAzb+//mJ/9' +
        'MdQ1mcbB7//73y4dcse4XTDAAAAAAA5qnOUnlB70ltL+1qqpyZxZVb8tb0caOKJM3p6lmc/Kba0v6+9U' +
        '1Lj89Lxz3LaQcAAAAAAAW3772R+aL2hbWW5IpalKxylbMkFe7p4JF9V0VXW9q/lL2uEq9ZuPCZTj8AAA' +
        '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' +
        'OvAzWQSFJav/ObHygszX+l/kMrD9337/+bnIIAAAAAAJBiyaEr3lHM1F5dqM41FbP5Pt8IlqT5/43fJJ' +
        'MfLGZzbY2Z3M1Nhx3zl047AAAAAABYYDYdvvydDUtXn1PI5O5OMvmXJ2+MGVIkaT593zc/lGTzm5Nl+f' +
        'sbltZc+sri1YdMvvHBCQcAAAAAAAtY/aJFby0cueqDDZmaUwuZ2huSTP4/itl8l3FFkiqvQjbfV8zknm' +
        'uszt3SmFn9kcalNUtffu8Rb3eaAQAAAAAAvyOqqg7ueNfhb6lfVvfnjUfmlhSrc58qZHLf2tfjjdncK4' +
        'VMvmPff7spLEkzO/IO7vv3tquQzTUUMrVP7fv3946kOn/Z5qWrj3nlsJp31b9j0Vvrqxa92akFAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/tAcHJAAAAACC/r/uR6gAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAADATwQBBYIz5K9RAAAAAElFTkSuQmCC';
    

    function replaceYouTubeVideos() {
        $(document).ready(function() {

            function getYoutubeId(youtube_url) {
                youtube_key = youtube_url.replace("https://", "")
                    .replace("http://", "")
                    .replace("www.youtube.com", "")
                    .replace("youtube.com", "")
                    .replace("/embed/", "")
                return youtube_key;
            }


            $('iframe').each(function(){
                var current_video = $(this)[0];

                if ($(this)[0].src.substring(0, 24).toLowerCase().indexOf("youtube.com") > -1 && getYoutubeId(current_video.src).length == 11) {
                    $(this).replaceWith(
                        ('    <div style="width:' + current_video.width +'px; height:' + current_video.height + 'px; display: inline-block; vertical-align: bottom; overflow: hidden; position:relative;" ' + 
                        ' class="youtube_video_replacement" youtube-url="' + getYoutubeId(current_video.src) + '">\n' +
                        '        <img style="position: absolute; top: 0px; left: 0px; width:100%; height:100%;" src="http://img.youtube.com/vi/' + getYoutubeId(current_video.src) + '/maxresdefault.jpg">\n' + 
                        '        <img style="position: absolute; top: 0px; left: 0px; width:100%; height:100%; " alt="" src="' + play_button_logo + '" />\n' +
                        '    </div>\n').replace("    ", "").replace("\n")
                    );
                }
            });
            $(".youtube_video_replacement").click(function() {
                $(this).replaceWith('<iframe width="' + $(this).width() + '" height="' + $(this).height() +
                    '" src="https://www.youtube.com/embed/' + $(this).attr('youtube-url') + '?autoplay=1" frameborder="0" allowfullscreen></iframe>')
            });
        });
    }

    function loadScript(url, callback){
        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState){  //IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                        script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
})();
