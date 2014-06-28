(function() {
        $(document).ready(function() {

            function get_youtube_id(youtube_url) {
                youtube_key = youtube_url.replace("https://", "")
                    .replace("http://", "")
                    .replace("www.youtube.com", "")
                    .replace("youtube.com", "")
                    .replace("/embed/", "")
                return youtube_key;
            }

            for (var i = 0; i < $("iframe").length; i++) {

                k = $("iframe").length;
                for (var i = 0; i < k; i++) {
                    
                    var current_video = $("iframe").first()[0];
                    
                    $("iframe").first().replaceWith(
                        '    <div style="width:' + current_video.width +'px; height:' + current_video.height + 'px; display: inline-block; vertical-align: top; overflow: hidden;">' +
                        '        <img style="width:100%; height:100%;" src="http://img.youtube.com/vi/' + get_youtube_id(current_video.src) + '/maxresdefault.jpg">' + 
                        '        <img style="width:100%; height:100%; margin-top:-' + current_video.height + 'px;" alt="" src="../assets/play_button.png" />' + 
                        '    </div>'
                    );
                }
            }
        }); 
    })();
