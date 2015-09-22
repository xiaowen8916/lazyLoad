/**
 * Created by qiwenshi on 2015/9/22.
 */
;(function($){
    $.fn.lazyLoad=function(){
        var opt=arguments[0],
            $win=$(window),
            $imgs=this;
        $win.on('scroll resize load',handler);
        $imgs.each(function(){
            var $img=$(this);
            $img.attr('lazy-src',$img.attr('src')).removeAttr('src');
        });
        function handler(){
            var winHeight=$win.height(),
                winWidth=$win.width(),
                scrollLeft=$win.scrollLeft(),
                scrollTop=$win.scrollTop();
            $imgs.each(function(){
                var fakeImg,offset,oLeft,oTop,
                    $img=$(this),
                    src=$img.attr('lazy-src');
                    if(!src)return;
                    offset=$img.offset();
                    oLeft=offset.left;
                    oTop=offset.top;
                if(oTop<winHeight+scrollTop&&oLeft<winWidth+scrollLeft){
                        fakeImg=new Image();
                        fakeImg.src=src;
                        fakeImg.onload=function(){
                            $img.attr('src',src).removeAttr('lazy-src');
                            fakeImg=null;
                        };
                        fakeImg.onerror=function(){
                            fakeImg=null;
                        }
                }
            });
        }
        return this;
    };
})(Zepto);