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

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
  /*  document.getElementById('deviceready').classList.add('ready');*/
    

    /*控制線段變色 */
    lineControl();
    
   
}

/*Modal 視窗操作*/


//20210120新增window open開啟
[...document.querySelectorAll('.windowOpen')].map(btn =>{
    btn.addEventListener('click', event =>{
        const _url = event.target.dataset.url;
        const _target = event.target.dataset.target?event.target.dataset.target:"_self";

        if(event.target.dataset.url != undefined){
            window.open(_url, _target);
        }
    })
});


//開啟視窗
[...document.querySelectorAll('.modalOpen')].map(btn =>{
    btn.addEventListener('click', event =>{
        let _modal = document.querySelector("#IP_Modal"); 
        _modal.style.display="block";
        console.log(event.target.dataset.modalcontent)
        if(event.target.dataset.modalcontent != undefined){
            _modal.querySelector(event.target.dataset.modalcontent).style.display = "block";
        }
    })
});

//關閉視窗
[...document.querySelectorAll('.modalClose')].map(btn =>{
    btn.addEventListener('click', event =>{
        document.querySelector("#IP_Modal").style.display="none";
        [...document.querySelectorAll('.MD_content')].map(content =>{ content.style.display = "none" });//關閉所有MD_content
    });
});

/*控制線段變色函式*/
const lineControl = ()=>{    
    [...document.querySelectorAll('.glassEffect')].map(item =>{
        item.addEventListener('click', event=>{
            const targetLine = event.currentTarget.dataset.line;
            if( targetLine != undefined){
               [...document.querySelectorAll(targetLine)].map(line=>{
                   line.style.fill ="#f00"
               })
            }
        })
        item.addEventListener('focusout', event=>{
            const targetLine = event.currentTarget.dataset.line;
            if( targetLine != undefined){
               [...document.querySelectorAll(targetLine)].map(line=>{
                   line.style.fill ="#001976"
               })
            }
        })        
    })
}

/*按鈕連結 */
lineControl();
[...document.querySelectorAll(".gotoPage")].map(btn=>{
    btn.addEventListener('click', event=>{
        [...document.querySelectorAll(".block, #app-nav")].map(page=>{ page.style.display = "none" })
        const page=event.target.dataset.pagename;
        console.log(page)
        if(page != "#login_page"){
            document.querySelector("#app-nav").style.display = "block";
        }
        document.querySelector(page).style.display = "block";
        document.documentElement.scrollTop = 0
    })
});

/*20210116 客製化的radio btn */
[...document.querySelectorAll(".IPbtn.radio")].map(btn=>{
   btn.addEventListener('click', event=>{
        const _g = event.currentTarget.dataset.group;
        [...document.querySelectorAll(".IPbtn[data-group='"+_g+"']")].map( unBtn =>{
            unBtn.classList.remove('active')
        });
        event.currentTarget.classList.add('active');
   })
})