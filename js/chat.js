$(function () {
    // 第一次打开页面时让文本域获得焦点
    $("#my-msg").focus();
    getVoice("你好啊靓仔");

    // 点击发送按钮实现发送消息功能
    $(".send").on("click", function () {
        var myMsg = $("#my-msg").val().trim();
        if (myMsg.length <= 0) {
            return $("#my-msg").val("");
        }
        $(".chat-list").append("<li class='right-li clearfix'><div class='img'><img src='./images/me.jpg' alt='' class='headshot'></div><div class='msg'>" + myMsg + "</div></li>");
        // $("#my-msg").val("");
        // $("#my-msg").focus();
        // 链式编程
        $("#my-msg").val("").focus();
        // 调用人工智能回复函数
        getMsg(myMsg);

        // 将滚动条移动到最底部
        $(".chat-content").scrollTop(3000);
        // $(".chat-content").stop().animate({
        //     scrollTop: 3000
        // }, 1000);
        console.log($(".chat-content").scrollTop());
    });

    // 复读机功能
    $(".repeater").on("click", function () {
        var myMsg = $("#my-msg").val().trim();
        if (myMsg.length <= 0) {
            $(".chat-list").append("<li class='left-li clearfix'><div class='img'><img src='./images/she.jpg' alt='' class='headshot'></div><div class='msg'>什么都没有你让我复读个只因儿</div></li>");
            $(".chat-content").scrollTop(3000);
            getVoice("什么都没有你让我复读个只因儿");
            return $("#my-msg").val("");
        }
        $(".chat-list").append("<li class='left-li clearfix'><div class='img'><img src='./images/she.jpg' alt='' class='headshot'></div><div class='msg'>" + myMsg + "</div></li>");
        $("#my-msg").val("").focus();

        // 将滚动条移动到最底部
        $(".chat-content").scrollTop(3000);
        getVoice(myMsg);
    });

    // 来点色图功能
    $(".setu").on("click", function () {
        $(".chat-list").append("<li class='left-li clearfix'><div class='img'><img src='./images/she.jpg' alt='' class='headshot'></div><div class='msg'><img src='./images/setu.jpg' alt=''></div></li>");
        $(".chat-list").append("<li class='left-li clearfix'><div class='img'><img src='./images/she.jpg' alt='' class='headshot'></div><div class='msg'>你tm怎么这么猥琐</div></li>");
        $(".chat-content").scrollTop(3000);
        getVoice("你他妈怎么这么猥琐");
    });

    // 按下回车键实现发送消息功能
    $("textarea").on("keyup", function (e) {
        if (e.keyCode === 13) {
            $(".send").triggerHandler("click");
        }
    });

    // 人工智能回复
    function getMsg(text) {
        $.ajax({
            type: "GET",
            url: "http://www.liulongbin.top:3006/api/robot",
            data: { spoken: text },
            success: function (res) {
                if (res.message == "success") {
                    $(".chat-list").append("<li class='left-li clearfix'><div class='img'><img src='./images/she.jpg' alt='' class='headshot'></div><div class='msg'>" + res.data.info.text + "</div></li>");
                    $(".chat-content").scrollTop(3000);
                    // $(".chat-content").stop().animate({
                    //     scrollTop: 3000
                    // }, 1000);
                    getVoice(res.data.info.text);
                } else {
                    $(".chat-list").append("<li class='left-li clearfix'><div class='img'><img src='./images/she.jpg' alt='' class='headshot'></div><div class='msg'>抱歉靓仔，接口出问题了~</div></li>");
                    console.log("骚瑞，出bug了~");
                }
            }
        })
    };

    // 人工智能回复转语音
    function getVoice(text) {
        $.ajax({
            type: "GET",
            url: "http://www.liulongbin.top:3006/api/synthesize",
            data: { text: text },
            success: function (res) {
                if (res.message == "success") {
                    $(".voice").attr("src", res.voiceUrl);
                } else {
                    console.log("骚瑞，出bug了~");
                }
            }
        })
    };

})