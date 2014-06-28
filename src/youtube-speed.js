(function() {

        $(document).ready(function() {

            function get_youtube_key(youtube_url) {
                youtube_key = youtube_url.replace("https://", "")
                    .replace("http://", "")
                    .replace("www.youtube.com", "")
                    .replace("youtube.com", "")
                    .replace("/embed/", "")
                return youtube_key;
            }

            function overlay_play_button(c) {
                var ctx = c.getContext("2d");

                // Set rectangle and corner values
                var rectX = 0;
                var rectY = 0;
                var rectWidth = 140;
                var rectHeight = 100;
                var cornerRadius = 40;

                // Set faux rounded corners
                ctx.lineJoin = "round";
                ctx.lineWidth = cornerRadius;
                ctx.strokeStyle = "#db3947"; //d41727";
                ctx.fillStyle = "#db3947"; //d41727";

                // Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
                ctx.strokeRect(
                    rectX+(cornerRadius/2),
                    rectY+(cornerRadius/2),
                    rectWidth-cornerRadius,
                    rectHeight-cornerRadius);
                ctx.fillRect(
                    rectX+(cornerRadius/2),
                    rectY+(cornerRadius/2),
                    rectWidth-cornerRadius,
                    rectHeight-cornerRadius);

                ctx.fillStyle = "#FFFFFF";
                ctx.beginPath();
                ctx.moveTo(100,50);
                ctx.lineTo(50,70);
                ctx.lineTo(50,30);
                ctx.closePath();
                ctx.fill();
            }

            for (var i = 0; i < $("iframe").length; i++) {

                k = $("iframe").length;
                for (var i = 0; i < k; i++) {
                    
                    //var overlay_button = "youtube-overlay-" + i;
                    var current_video = $("iframe").first()[0];
                    
                    $("iframe").first().replaceWith(
                        '    <div style="width:' + current_video.width +'px; height:' + current_video.height + 'px; display: inline-block; vertical-align: top; overflow: hidden;">' +
                        '        <img style="width:100%; height:100%;" src="http://img.youtube.com/vi/' + get_youtube_key(current_video.src) + '/maxresdefault.jpg">' + 
                        '        <img style="width:100%; height:100%; margin-top:-' + current_video.height + 'px;" alt="" src="../assets/play_button.png" />' + 
                      //'        <canvas id="' + overlay_button + '" width="250" height="150" style="margin:-225px 0 0 250px;"></canvas>' +
                        '    </div>'
                    );

                    //overlay_play_button(document.getElementById(overlay_button));
                    
                }
            }
        }); 
    })();
