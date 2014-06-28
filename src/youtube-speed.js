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

            num_iframes = $("iframe").length;
            for (var i = 0; i < num_iframes; i++) {
                var current_video = $("iframe").first()[0];

                $("iframe").first().replaceWith(
                    '    <div style="width:' + current_video.width +'px; height:' + current_video.height + 'px; display: inline-block; vertical-align: top; overflow: hidden;" ' + 
                    ' class="youtube_video_replacement" youtube-url="' + getYoutubeId(current_video.src) + '">\n' +
                    '        <img style="width:100%; height:100%;" src="http://img.youtube.com/vi/' + getYoutubeId(current_video.src) + '/maxresdefault.jpg">\n' + 
                    '        <img style="width:100%; height:100%; margin-top:-' + current_video.height + 'px;" alt="" src="../assets/play_button.png" />\n' + 
                    '    </div>\n'
                );
            }
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
