function parentTable(el){
    for(var parent = el; parent = parent.parentNode;){
        if(parent.tagName === 'TABLE'){
            return parent;
        }
    }
    return null;
}

function sumOffsetTops(el){
    if(el === null) return 0;
    return el.offsetTop + sumOffsetTops(el.offsetParent);
}

function preserveWidth(stickable){
    // It is essential when working with table.
    var descendants = [].slice.call(stickable.querySelectorAll('*'));
    [stickable].concat(descendants).forEach(function(el){
        el.style.width = window.getComputedStyle(el).width;
    });
}

function getMarginHolder(stickable){
    return parentTable(stickable) || stickable.nextElementSibling;
}

function addStyle(document){
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.sticky{ position: fixed; top: 0; z-index: 99; }';
    document.getElementsByTagName('head')[0].appendChild(style);
}

window.addEventListener('load', function(){
    var stickable = document.getElementById('sticky'),
        marginHolder = getMarginHolder(stickable),
        getComputed = window.getComputedStyle.bind(window),
        marginTop = parseInt(getComputed(marginHolder).marginTop, 10),
        offset = sumOffsetTops(stickable);

    addStyle(document);
    preserveWidth(stickable);

    function sticky(){
        var isVisible = stickable.className === 'sticky';

        if(window.pageYOffset >= offset){
            if(!isVisible){
                stickable.className = 'sticky';
                marginHolder.style.marginTop = (stickable.clientHeight + marginTop) + 'px';
            }
        }else if(isVisible){
            stickable.className = '';
            marginHolder.style.marginTop = marginTop + 'px';
        }
    }
    sticky();
    window.addEventListener('scroll', sticky);
}, false);
