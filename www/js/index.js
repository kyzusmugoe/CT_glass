/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);


/*20220411 控制scaleRuler比例尺*/
const scaleRulerResize = () => {
    document.querySelectorAll(".scaleRuler").forEach(item => {
        console.log(item.dataset.scale)
        item.style.width = document.querySelector("progress." + item.dataset.scale).clientWidth / 2 + "px"
    })
}
window.addEventListener("resize", scaleRulerResize)

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    /*  document.getElementById('deviceready').classList.add('ready');*/

    /*控制線段變色 */
    lineControl();
}

/*Modal 視窗操作*/


//20210120新增window open開啟
[...document.querySelectorAll('.windowOpen')].map(btn => {
    btn.addEventListener('click', event => {
        const _url = event.target.dataset.url;
        const _target = event.target.dataset.target ? event.target.dataset.target : "_self";

        if (event.target.dataset.url != undefined) {
            window.open(_url, _target);
        }
    })
});


//開啟視窗
[...document.querySelectorAll('.modalOpen')].map(btn => {
    btn.addEventListener('click', event => {
        let _modal = document.querySelector("#IP_Modal");
        _modal.style.display = "block";
        //console.log(event.target.dataset.modalcontent)
        if (event.target.dataset.modalcontent != undefined) {
            _modal.querySelector(event.target.dataset.modalcontent).style.display = "block";
        }
    })
});

//關閉視窗
[...document.querySelectorAll('.modalClose')].map(btn => {
    btn.addEventListener('click', event => {
        document.querySelector("#IP_Modal").style.display = "none";
        document.querySelector('html').classList.remove("is-locked");
        [...document.querySelectorAll('.MD_content')].map(content => {
            content.style.display = "none"
        }); //關閉所有MD_content
    });
});

/*控制線段變色函式*/
const lineControl = () => {
    [...document.querySelectorAll('.glassEffect')].map(item => {
        item.addEventListener('click', event => {
            const targetLine = event.currentTarget.dataset.line;
            if (targetLine != undefined) {
                [...document.querySelectorAll(targetLine)].map(line => {
                    line.style.fill = "#f00"
                })
            }
        })
        item.addEventListener('focusout', event => {
            const targetLine = event.currentTarget.dataset.line;
            if (targetLine != undefined) {
                [...document.querySelectorAll(targetLine)].map(line => {
                    line.style.fill = "#001976"
                })
            }
        })
    })
}

/*按鈕連結 */
lineControl();
[...document.querySelectorAll(".gotoPage")].map(btn => {
    btn.addEventListener('click', event => {
        [...document.querySelectorAll(".block, #app-nav")].map(page => {
            page.style.display = "none"
        })
        const page = event.target.dataset.pagename;
        if (page != "#login_page") {
            document.querySelector("#app-nav").style.display = "block";
        }
        document.querySelector(page).style.display = "block";
        document.documentElement.scrollTop = 0

        //20220411
        scaleRulerResize()
    })
});

/*20210116 客製化的radio btn */
[...document.querySelectorAll(".IPbtn.radio")].map(btn => {
    btn.addEventListener('click', event => {
        const _g = event.currentTarget.dataset.group;
        [...document.querySelectorAll(".IPbtn[data-group='" + _g + "']")].map(unBtn => {
            unBtn.classList.remove('active')
        });
        event.currentTarget.classList.add('active');
    })
})

/*20220325 5-2鏡框圓點 */
document.querySelectorAll(".PPInput").forEach(input => {

    //鏡框圓點變色
    input.addEventListener('click', event => {
        const _pt = event.currentTarget.dataset.point;
        console.log(_pt)
        document.querySelectorAll(".point").forEach(point => {
            point.classList.remove('active')
        });
        document.querySelector("." + _pt).classList.add('active');
    })

    //百分比的BAR變化
    input.addEventListener('change', event => {
        const _pr = event.currentTarget.dataset.progress;
        document.querySelector("." + _pr).value = parseInt(event.currentTarget.value * 5.0)
    })

})


//loadImg
const uploadBtn = document.querySelector(".UploadBtn")
const uploadInput = document.querySelector(".uploadImgInput")

const openEyeCapture = base64 => {
    document.querySelector("#IP_Modal").style.display = "block";
    const img = document.querySelector(".eyeCapture img")
    img.style.width = "100%"
    img.style.top = 0
    img.style.left = 0
    img.src = base64
}

uploadBtn.addEventListener("click", event => {
    uploadInput.click();
    uploadInput.value = "";
    //document.querySelector('html').classList.add("is-locked");
})

uploadInput.addEventListener("change", event => {
    document.querySelector('html').classList.add("is-locked");
    if (event.target.files && event.target.files[0]) {
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
            //const b64 = e.target.result;
            openEyeCapture(e.target.result)

            document.querySelector(".eyeCapture").style.display = "block";
        });
        FR.readAsDataURL(event.target.files[0]);
    }
})



//眼距計算相關
const eyeDistance = () => {
    document.querySelector(".rValue").innerHTML = document.querySelector(".bar3").offsetLeft - document.querySelector(".bar2").offsetLeft
    document.querySelector(".lValue").innerHTML = document.querySelector(".bar4").offsetLeft - document.querySelector(".bar3").offsetLeft
    document.querySelector(".tValue").innerHTML = document.querySelector(".bar5").offsetLeft - document.querySelector(".bar1").offsetLeft
    //document.querySelector(".tValue").innerHTML = ((window.innerWidth / 2) - document.querySelector(".bar2").offsetLeft) + (document.querySelector(".bar4").offsetLeft - (window.innerWidth / 2))
}

const bars = [
    document.querySelector(".bar1"),
    document.querySelector(".bar2"),
    document.querySelector(".bar3"),
    document.querySelector(".bar4"),
    document.querySelector(".bar5")
]



let barsSw = false
let targetBar;
const barsDown = event => {
    targetBar && targetBar.classList.remove('on')
    targetBar = event.currentTarget

    console.log(targetBar)
    targetBar.classList.add('on')
    barsSw = true
}
const barsUp = event => {
    barsSw = false
    //targetBar.classList.remove('on')
}


const barsMove = event => {
    if (barsSw) {
        let index = parseInt(targetBar.dataset.index)
        let limitL = 0
        let limitR = 96
        if (bars[index - 1] != undefined) {
            limitL = parseInt(bars[index - 1].style.left, 10)
        }

        if (bars[index + 1] != undefined) {
            limitR = parseInt(bars[index + 1].style.left, 10)
        }
        let boxW = document.querySelector(".faceCtrl").offsetWidth
        let curT = (event.pageX || event.touches[0].pageX) - ((window.innerWidth - boxW) / 2)
        curT = curT < 0 ? 0 : curT > boxW ? boxW : curT;
        let percent = (curT / boxW) * 100;
        if (percent > limitL && percent < limitR) {
            //targetBar.style.left = `calc(${percent}% - 15px)`;
            targetBar.style.left = `${percent}%`;
            eyeDistance()
        }
    }
}



bars.map((cBar, index) => {
    if (index == 0) {
        cBar.style.left = `15%`;
    } else if (index == bars.length - 1) {
        //cBar.style.left = `96%`;
        cBar.style.left = `85%`;
    } else {
        cBar.style.left = `${(  (100/(bars.length-1))*index) }%`;

    }
    cBar.dataset.index = index
    cBar.addEventListener('touchstart', barsDown)
    cBar.addEventListener('touchmove', barsMove)
    cBar.addEventListener('touchend', barsUp)

    cBar.addEventListener('mousedown', barsDown)
    document.addEventListener('mousemove', barsMove)
    document.addEventListener('mouseup', barsUp)
    //eyeDistance()
})

//20220503 微調Bar
const fineTuningBar = event=>{
    const btn = event.currentTarget

    let boxW = document.querySelector(".faceCtrl").offsetWidth
    
    let step = 100/boxW
    if(targetBar){
        let nLeft = parseFloat(targetBar.style.left)
        console.log(nLeft)
        if(btn.classList.contains("FT_plus")){
            if(nLeft < 96){
                nLeft += step
            }
        }
        if(btn.classList.contains("FT_minus")){            
            if(nLeft > 0){
                nLeft -= step
            }
        }
        targetBar.style.left = `${nLeft}%`

       
        eyeDistance()
    }
}
document.querySelectorAll(".FT").forEach(btn=>{
    btn.addEventListener("click", fineTuningBar)
    //btn.addEventListener("touchend", fineTuningBar)
})




/*

document.querySelector(".bar2").addEventListener('touchmove', event => {
    if (percent > 0 && percent < 46) {
        event.target.style.left = `${percent}%`
        eyeDistance()

    }
})

document.querySelector(".bar4").addEventListener('touchmove', event => {
    let percent = (event.touches[0].pageX / window.screen.width) * 100;
    if (percent > 46 && percent < 93.5) {
        event.target.style.left = `${percent}%`
        eyeDistance()
    }
})
*/
document.querySelector(".captureBtn").addEventListener('click', event => {
    html2canvas(document.querySelector(".faceCtrl")).then(function (canvas) {
        document.querySelector(".captureImg").style.backgroundImage = `url(${canvas.toDataURL()})`
    });
})

let nowX = 0
let nowY = 0
let imgX = 0
let imgY = 0
let dragSw = false
let fixBody = false

const dragImg = document.querySelector(".dragImg");

const dragImgStartHanderer = event =>{
    nowX = event.screenX || event.touches[0].screenX
    nowY = event.screenY || event.touches[0].screenY
    imgX = parseInt(event.target.style.left, 10)
    imgY = parseInt(event.target.style.top, 10)
    fixBody = true;
    dragSw = true
}

const dragImgMoveHanderer = event =>{

    
    if(dragSw){
        let curX =event.touches?  event.touches[0].screenX - nowX:event.screenX - nowX 
        let curY =event.touches?  event.touches[0].screenY - nowY:event.screenY - nowY 
        dragImg.style.left = `${imgX + curX}px`
        dragImg.style.top = `${imgY + curY}px`
    }
    
}

const dragImgEndHanderer = event =>{
    dragSw = false
}

dragImg.addEventListener("mousedown", dragImgStartHanderer)
dragImg.addEventListener("mousemove", dragImgMoveHanderer)
dragImg.addEventListener("touchstart", dragImgStartHanderer)
dragImg.addEventListener("touchmove", dragImgMoveHanderer)
dragImg.addEventListener("touchend", dragImgEndHanderer)
dragImg.addEventListener("mouseup", dragImgEndHanderer)

dragImg.addEventListener("touchstart", event => {
    fixBody = false
})

document.querySelector(".imgScale").addEventListener("input", event => {
    dragImg.style.width = `${event.target.value}%`
})

window.addEventListener("scroll", (e) => {
    if (fixBody) {
        e.preventDefault();
        window.scrollTo(0, 0);
    }
});

document.querySelector(".eyeCaptureDone").addEventListener("click", event => {
    document.querySelector("#IP_Modal .MD_content.eyeCapture .eyeCaptureBox .redLine").style.display = "none";
    html2canvas(document.querySelector(".eyeCaptureBox")).then(function (canvas) {
        //document.querySelector(".faceCtrl .editEyeImg").style.backgroundImage = `url(${canvas.toDataURL()})`
        document.querySelector(".faceCtrl .editEyeImg").src = canvas.toDataURL()
        document.querySelector('html').classList.remove("is-locked");
        document.querySelector("#IP_Modal").style.display = "none";
        [...document.querySelectorAll('.MD_content')].map(content => {
            content.style.display = "none"
        }); //關閉所有MD_content
        document.querySelector("#IP_Modal .MD_content.eyeCapture .eyeCaptureBox .redLine").style.display = "block";
    });
})