(this["webpackJsonpauxswap-react"]=this["webpackJsonpauxswap-react"]||[]).push([[0],{107:function(e,t,n){},108:function(e,t,n){},127:function(e,t,n){},155:function(e,t,n){},156:function(e,t,n){},160:function(e,t,n){},161:function(e,t,n){},162:function(e,t,n){},166:function(e,t,n){},167:function(e,t,n){},184:function(e,t){},194:function(e,t,n){},195:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n.n(c),a=n(74),r=n.n(a),o=(n(92),n(7)),i=n.n(o),l=n(20),u=n(2),j=(n(94),n(6)),d=n(5),b=n(4),h=s.a.createContext(),m=s.a.createContext(),f=(n(95),n.p+"static/media/logo_1_transparent.f6b8161d.png"),O=n(1);var p=function(){return Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)("h1",{className:"head",children:"AuxSwap"}),Object(O.jsx)("img",{src:f,className:"mainLogo"}),Object(O.jsxs)("body",{className:"bod",children:["A web application using Spotify. ",Object(O.jsx)("br",{}),"Listen together and chat with your friends!"]}),Object(O.jsx)("a",{className:"Login-button",href:"".concat("http://localhost:4000","/auth/login"),children:"Login to Spotify"})]})},g=(n(97),function(e){var t={backgroundImage:"url(".concat(e.item.album.images[0].url,")")},n={width:100*e.progress_ms/e.item.duration_ms+"%"};return Object(O.jsx)("div",{className:"App",children:Object(O.jsxs)("div",{className:"main-wrapper",children:[Object(O.jsx)("div",{className:"now-playing__img",children:Object(O.jsx)("img",{src:e.item.album.images[0].url})}),Object(O.jsxs)("div",{className:"now-playing__side",children:[Object(O.jsx)("div",{className:"now-playing__name",children:e.item.name}),Object(O.jsx)("div",{className:"now-playing__artist",children:e.item.artists[0].name}),Object(O.jsx)("div",{className:"now-playing__status",children:e.is_playing?"Playing":"Paused"}),Object(O.jsx)("div",{className:"progress",children:Object(O.jsx)("div",{className:"progress__bar",style:n})})]}),Object(O.jsx)("div",{className:"background",style:t})," "]})})}),x=(n(98),n.p+"static/media/logo.6ce24c58.svg"),v=(n(99),n(75)),y=n.n(v);function S(){var e=Object(c.useContext)(h),t=Object(c.useState)(),n=Object(u.a)(t,2),s=n[0],a=n[1],r=Object(c.useState)(),o=Object(u.a)(r,2),i=o[0],l=o[1];return Object(c.useEffect)((function(){window.onSpotifyWebPlaybackSDKReady=function(){return{SDK_object:s,SDK_ID:i}}})),Object(O.jsx)("div",{children:Object(O.jsx)(y.a,{url:"https://sdk.scdn.co/spotify-player.js",onLoad:function(){var t=new window.Spotify.Player({name:"AuxSwap",getOAuthToken:function(t){t(e.currtoken)}});t.addListener("initialization_error",(function(e){var t=e.message;console.error(t)})),t.addListener("authentication_error",(function(e){var t=e.message;console.error(t)})),t.addListener("account_error",(function(e){var t=e.message;console.error(t)})),t.addListener("playback_error",(function(e){var t=e.message;console.error(t)})),t.addListener("ready",(function(e){var t=e.device_id;console.log("Ready with Device ID",t),l(t)})),t.addListener("not_ready",(function(e){var t=e.device_id;console.log("Device ID has gone offline",t)})),t.connect(),a(t)}})})}var N=function(){var e=s.a.useState(""),t=Object(u.a)(e,2),n=t[0],c=t[1],a=Object(b.g)();return Object(O.jsxs)("div",{children:[Object(O.jsx)(S,{}),Object(O.jsxs)("div",{className:"home-container-party",children:[Object(O.jsx)("input",{type:"text",placeholder:"Room",value:n,onKeyDown:function(e){13==e.keyCode&&a.push("/party/".concat(n))},onChange:function(e){c(e.target.value)},className:"text-input-field"}),Object(O.jsx)(d.b,{to:"/party/".concat(n),className:"enter-room-button",children:"Join Party"})]})]})},w=(n(107),n(19)),k=(n(108),n(21)),C=n.n(k),E=n(40),_=(n(127),n(44)),I=n(29),A=n.n(I),T="newChatMessage",D=function(e){var t=Object(c.useState)([]),n=Object(u.a)(t,2),s=n[0],a=n[1],r=Object(c.useRef)();Object(c.useEffect)((function(){return r.current=A()("http://localhost:4000",{query:{roomId:e}}),r.current.on(T,(function(e){var t=Object(_.a)(Object(_.a)({},e),{},{isCurrentUser:e.senderId===r.current.id});a((function(e){return[].concat(Object(w.a)(e),[t])}))})),function(){r.current.disconnect()}}),[e]);return{messages:s,sendMessage:function(e){r.current.emit(T,{body:e,senderId:r.current.id})},setMessages:a}},U=(n(155),function(e){var t=Object(c.useContext)(h),n=/^(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/,a=s.a.useState(""),r=Object(u.a)(a,2),o=r[0],i=r[1],l=s.a.useState(""),d=Object(u.a)(l,2),b=d[0],m=d[1],f=s.a.useState(""),p=Object(u.a)(f,2),g=p[0],x=p[1];return Object(c.useEffect)((function(){!function(e){var c=e.match(n)[2];j.ajax({url:"https://api.spotify.com/v1/tracks/".concat(c),type:"GET",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+t.currtoken)},success:function(e){e||i("https://i.pinimg.com/originals/d4/e3/60/d4e3604d2811dbe178801f48e6a2ae69.jpg"),i(e.album.images[0].url),m(e.name),x(e.artists[0].name)},error:function(e){console.log(e),i("https://i.pinimg.com/originals/d4/e3/60/d4e3604d2811dbe178801f48e6a2ae69.jpg")}})}(e.message)}),[]),Object(O.jsxs)("div",{className:"song-message-container",children:[Object(O.jsx)("img",{className:"search-images",src:o}),Object(O.jsx)("div",{className:"song-name",children:b}),Object(O.jsx)("div",{className:"song-artist",children:g})]})}),P=(n(156),n(197)),L=function(e){var t=Object(c.useContext)(h),n=s.a.useState([]),a=Object(u.a)(n,2),r=a[0],o=a[1],i=s.a.useState(""),l=Object(u.a)(i,2),d=l[0],b=l[1];var m=function(e){var t=document.getElementById("new-message-input-field");!function(e,t){var n=Object.getOwnPropertyDescriptor(e,"value").set,c=Object.getPrototypeOf(e),s=Object.getOwnPropertyDescriptor(c,"value").set;n&&n!==s?s.call(e,t):n.call(e,t)}(t,e+" "+t.value),t.dispatchEvent(new Event("input",{bubbles:!0}))};return Object(c.useEffect)((function(){r.length=0,o([]),o([]),r.length=0,""!=d&&j.ajax({url:"https://api.spotify.com/v1/search?q=".concat(d,"&type=track&limit=").concat(10,"&offset=0"),type:"GET",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+t.currtoken)},dataType:"json",success:function(e){e.tracks.items.forEach((function(e){o((function(t){return[].concat(Object(w.a)(t),[e])}))}))},error:function(e){console.log(e)}})}),[d]),Object(O.jsxs)("div",{children:[Object(O.jsx)("br",{}),Object(O.jsx)("input",{placeholder:"Search for a song",type:"search",id:"searchbar",autoComplete:"off",className:"song-searchbar",onChange:function(){o([]),r.length=0,b(document.getElementById("searchbar").value)}}),Object(O.jsx)("div",{className:"result-container",children:Object(O.jsx)("ul",{className:"result-list",children:r.slice(0,10).map((function(e){return Object(O.jsx)("li",{className:"song-info-list-item",children:Object(O.jsxs)("div",{children:[Object(O.jsx)("img",{className:"search-images",src:e.album.images[0].url,onClick:function(){m(e.external_urls.spotify),o([]),r.length=0,document.getElementById("searchbar").value=""}},Object(P.a)()),Object(O.jsx)("div",{className:"song-name",children:e.name}),Object(O.jsx)("div",{className:"song-artist",children:e.artists[0].name})]})})}))})})]})},R=function(e){var t=Object(c.useContext)(h),n=/(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/g,a=/(http:|https:|ftp:)\/\/[a-zA-Z0-9]+[.][a-z]+\/*[^ \n]*/g,r=e.match.params.roomId,o=s.a.useState(""),d=Object(u.a)(o,2),b=d[0],m=d[1],f=D(r),p=f.messages,g=f.sendMessage,x=f.setMessages,v=s.a.useState(""),y=Object(u.a)(v,2),S=y[0],N=y[1],k=s.a.useState([]),_=Object(u.a)(k,2),I=_[0],A=_[1],T=s.a.useState(!1),P=Object(u.a)(T,2),R=P[0],z=P[1],B=s.a.useState(!1),H=Object(u.a)(B,2),F=H[0],K=H[1],G=s.a.useState(!0),q=Object(u.a)(G,2),W=q[0],M=q[1],Z=s.a.useCallback((function(){return M(!W)})),J=s.a.useState(),Y=Object(u.a)(J,2)[1],X=(s.a.useCallback((function(){return Y({})}),[]),s.a.useState("")),V=Object(u.a)(X,2),Q=V[0],$=V[1],ee=function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:C.a.get("".concat("http://localhost:4000","/session/").concat(r),{params:{session_id:r},headers:{Accept:"application/json","Content-Type":"application/json"}},{responseType:"json"}).then((function(e){for(var t=0;t<e.data.length;t++)e.data[t].user_id!=b&&$(e.data[t].user_id)})).catch((function(e){console.log(e.type)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),te=function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.currtoken){e.next=2;break}return e.abrupt("return","");case 2:return e.next=4,j.ajax({url:"https://api.spotify.com/v1/me",type:"GET",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+t.currtoken)},success:function(e){e||console.log("null values"),m(e.id),console.log("right after set: ".concat(b))},error:function(e){console.log("IN GET DATA ERROR",t.currtoken),console.log(e)}});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();s.a.useEffect((function(){te(),ee()})),s.a.useEffect((function(){se(r)}),[b]);var ne=function(){if(""!==S){g(S),ce(S,r);var e=document.getElementById("messages-container");setTimeout((function(){e.scrollTop=1e9}),200),N("")}else N("")},ce=function(e,t){var n={session:t,userID:b,content:e};C.a.post("".concat("http://localhost:4000","/messages"),n).catch((function(e){alert(e.message)}))},se=function(e){console.log("here"),b&&W&&(C.a.get("".concat("http://localhost:4000","/messages/").concat(e),{params:{id:e},headers:{Accept:"application/json","Content-Type":"application/json"}},{responseType:"json"}).then((function(e){console.log("retrive from db here");for(var t=0;t<e.data.length;t++)e.data[t].sender_id==b?function(){var n={body:e.data[t].content,senderId:e.data[t].sender_id,isCurrentUser:!0};x((function(e){return[].concat(Object(w.a)(e),[n])}))}():function(){var n={body:e.data[t].content,senderId:e.data[t].sender_id,isCurrentUser:!1};x((function(e){return[].concat(Object(w.a)(e),[n])}))}()})).catch((function(e){console.log(e.type)})),Z())};return Object(O.jsx)("div",{className:"chat-room-page",children:Object(O.jsxs)("div",{className:"chat-room-container",children:[Object(O.jsx)("h1",{className:"chat-room-title",children:"Chat Room"}),Object(O.jsx)("h2",{className:"room-name",children:Q}),Object(O.jsx)("div",{children:Object(O.jsx)(L,{children:"SPOTIFY SEARCH"})}),Object(O.jsx)("div",{className:"messages-container",id:"messages-container",children:Object(O.jsx)("ol",{className:"messages-list",children:(console.log(p.length),p.map((function(e,t){if(l=e.body,n.test(l)){var c=new Set(e.body.match(n)),s=Array.from(c),r=e.body.replace(/[ \n]*spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/([0-9a-z-A-Z]{22})([?]si=[a-zA-Z0-9]{22})?([ \n]*)/g,""),o=""===r;return Object(O.jsxs)("div",{children:[o?null:Object(O.jsx)("li",{className:"message-item ".concat(e.isCurrentUser?"my-message":"received-message"),children:Object(O.jsx)("div",{children:r})},t),s.map((function(t,n){return Object(O.jsx)("li",{className:"message-item ".concat(e.isCurrentUser?"my-message":"received-message"),children:Object(O.jsx)("div",{onClick:function(){!function(e){var t=e.match(/(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/)[2],n="spotify:track:".concat(t);A([n])}(t),z(!0)},children:Object(O.jsx)(U,{message:t})})},n)}))]})}if(function(e){return!!a.test(e)}(e.body)){var i=e.body.split(" ");return Object(O.jsx)("li",{className:"message-item ".concat(e.isCurrentUser?"my-message":"received-message"),children:i.map((function(e,t){var n=/(http:|https:|ftp:)\/\/[a-zA-Z0-9]+[.][a-z]+\/*[^ \n]*/g.test(e);return Object(O.jsx)("div",{children:n?Object(O.jsxs)("a",{href:e,target:"_blank",rel:"noreferrer",children:[e," "]}):Object(O.jsx)("div",{children:e})},t)}))},t)}return Object(O.jsx)("li",{className:"message-item ".concat(e.isCurrentUser?"my-message":"received-message"),children:e.body},t);var l})))})}),Object(O.jsx)("textarea",{className:"new-message-input-field",value:S,onKeyDown:function(e){13===e.keyCode&&(K(!0),ne())},onChange:function(e){e.preventDefault(),!0!==F&&N(e.target.value),K(!1)},placeholder:"Write message...",id:"new-message-input-field",onKeyPress:function(e){return"Enter"===e.key?ne():null}}),Object(O.jsx)("button",{onClick:ne,className:"send-message-button",children:"Send"}),Object(O.jsx)("div",{children:R?Object(O.jsx)("button",{onClick:function(){return z(!1)},children:Object(O.jsx)("img",{src:"https://1001freedownloads.s3.amazonaws.com/vector/thumb/70571/close-button.png",className:"x-button"})}):null}),Object(O.jsx)("div",{children:R?Object(O.jsx)(E.a,{token:t.currtoken,uris:I,autoPlay:"true",showSaveIcon:"true",name:"Auxswap"}):null})]})})},z=(n(157),function(e){var t=Object(c.useRef)(),n=Object(b.g)(),a=Object(c.useContext)(h),r=Object(c.useState)(""),o=Object(u.a)(r,2),d=o[0],m=o[1],f=Object(c.useState)(""),p=Object(u.a)(f,2),g=p[0],x=p[1],v=Object(c.useState)(""),y=Object(u.a)(v,2),S=y[0],N=y[1],k=Object(c.useState)(""),E=Object(u.a)(k,2),_=E[0],I=E[1],A=Object(c.useState)(""),T=Object(u.a)(A,2),D=T[0],U=T[1],P=Object(c.useState)([]),L=Object(u.a)(P,2),R=L[0],z=L[1],B=Object(c.useState)([]),H=Object(u.a)(B,2),F=H[0],K=H[1],G=function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.currtoken){e.next=2;break}return e.abrupt("return","");case 2:return e.next=4,j.ajax({url:"https://api.spotify.com/v1/me",type:"GET",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+a.currtoken)},success:function(e){if(e||console.log("null values"),""!=d&&e.id==d)return document.getElementById("user_searchbar").value="",m(""),x("You cannot chat with yourself"),void N("");U(e.id)},error:function(e){console.log(e)}});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();s.a.useEffect((function(){console.log("INSIDE ID USE EFFECT"),G()}));Object(c.useEffect)((function(e){console.log("INSIDE GET USER SEARCH USE EFFECT"),""!==d?j.ajax({url:"https://api.spotify.com/v1/users/".concat(d),type:"GET",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+a.currtoken)},dataType:"json",success:function(e){e&&(void 0==typeof e||(x(e.display_name),e.images.length>0?N(e.images[0].url):(x("User does not exist"),N(""))))},error:function(e){console.log(e),m(""),x(""),N("")}}):(m(""),x(""),N(""))}),[d]);var q=function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.a.get("".concat("http://localhost:4000","/sessions/").concat(D),{params:{user_id:D},headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){console.log("DATA"),console.log(e.data),z(e.data)})).catch((function(e){console.log("err: ".concat(e.message))}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(e){console.log("INSIDE GET EXISTING CHATS EFFECT"),""!=D&&q()}),[D]);var W=function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.a.get("".concat("http://localhost:4000","/session/").concat(d,"/").concat(D),{params:{user1:d,user2:D},headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){if(0==e.data.length){var t={user1:D,user2:d};C.a.post("".concat("http://localhost:4000","/sessions"),t).then((function(e){I(e.data[1])})).catch((function(e){console.log("err: ".concat(e.message))}))}else I(e.data[0].session_id)})).catch((function(e){console.log("err: ".concat(e.message))}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(e){if(console.log("INSIDE SET EXISTING CHATS DISPLAY EFFECT"),R!=[]&&0!=R.length){console.log("LOL"),console.log("length: ".concat(R.length));for(var t=function(e){""!==D&&(console.log("IT'S HAPPENING"),j.ajax({url:"https://api.spotify.com/v1/users/".concat(R[e].user_id),type:"GET",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+a.currtoken)},dataType:"json",success:function(t){t&&K((function(n){return[].concat(Object(w.a)(n),[[R[e].session_id,t.display_name,t.images[0].url]])}))},error:function(e){console.log(e)}}))},n=0;n<R.length;n++)t(n)}}),[R]),Object(c.useEffect)((function(e){console.log("CHANGED EXISTINGCHATSDISPLAY: ".concat(F.length))}),[F]),Object(c.useEffect)((function(e){console.log("INSIDE LINK TO USE EFFECT"),n.push("/chat/".concat(_))}),[_]),Object(O.jsxs)("div",{className:"chat-user-search-container",children:[Object(O.jsx)("div",{className:"existing-chats-container",children:Object(O.jsx)("ul",{className:"existing-chats-list",id:"existing-chats-list",children:F.map((function(e){return Object(O.jsx)("li",{className:"existing-chat-item",children:Object(O.jsxs)("div",{children:[Object(O.jsx)("img",{className:"existing-chat-image",src:e[2],onClick:function(){n.push("/chat/".concat(e[0]))}},e[0]),Object(O.jsx)("div",{className:"existing-chat-displayname",children:e[1]})]})})}))})}),Object(O.jsxs)("div",{className:"ChatUserSearch-container",children:[Object(O.jsx)("br",{}),Object(O.jsx)("input",{placeholder:"Search for user by Spotify username",type:"search",id:"user_searchbar",autoComplete:"off",className:"user-searchbarChatUserSearch",onChange:function(){m(document.getElementById("user_searchbar").value.toLowerCase())}}),""!==g&&""!==S&&D.toLowerCase()!=d.toLowerCase()?Object(O.jsx)("div",{className:"result-containerChatUserSearch",children:Object(O.jsx)("ul",{className:"result-listChatUserSearch",id:"result-listChatUserSearch",children:Object(O.jsx)("li",{className:"user-info-itemChatUserSearch",children:Object(O.jsxs)("div",{children:[Object(O.jsx)("input",{type:"image",ref:t,className:"search-imageChatUserSearch",src:S,onClick:function(e){t.current&&t.current.setAttribute("disabled","disabled"),W()}}),Object(O.jsx)("div",{className:"user-display-nameChatUserSearch",children:g})]})})})}):null,""!==g&&"You cannot chat with yourself"!=g&&""==S?Object(O.jsx)("div",{className:"result-containerChatUserSearch",children:Object(O.jsx)("ul",{className:"result-listChatUserSearch",id:"result-listChatUserSearch",children:Object(O.jsx)("li",{className:"user-info-itemChatUserSearch",children:Object(O.jsx)("div",{children:Object(O.jsx)("div",{className:"user-display-nameChatUserSearch_2",children:g})})})})}):null,"You cannot chat with yourself"==g?Object(O.jsx)("div",{className:"result-containerChatUserSearch",children:Object(O.jsx)("ul",{className:"result-listChatUserSearch",id:"result-listChatUserSearch",children:Object(O.jsx)("li",{className:"user-info-itemChatUserSearch",children:Object(O.jsx)("div",{children:Object(O.jsx)("div",{className:"user-display-nameChatUserSearch_2",children:g})})})})}):null]})]})}),B=function(){var e=s.a.useState(""),t=Object(u.a)(e,2);t[0],t[1],Object(b.g)();return Object(O.jsx)("div",{children:Object(O.jsx)("div",{className:"home-container",children:Object(O.jsx)(z,{})})})};var H=function(){return Object(O.jsx)(d.a,{children:Object(O.jsxs)(b.d,{children:[Object(O.jsx)(b.b,{exact:!0,path:"/chat",component:B}),Object(O.jsx)(b.b,{exact:!0,path:"/home",component:te}),Object(O.jsx)(b.b,{exact:!0,path:"/chat/:roomId",component:R}),Object(O.jsx)(b.b,{exact:!0,path:"/player",component:ee}),Object(O.jsx)(b.b,{exact:!0,path:"/party",component:Q})]})})};n(160);function F(e){var t=Object(c.useState)(),n=Object(u.a)(t,2),s=n[0],a=n[1];return Object(c.useEffect)((function(){a(e.members)}),[e]),Object(O.jsx)("div",{className:"userContainer",children:s?s.map((function(e){var t=e.name,n=e.data,c=e.id;return Object(O.jsxs)("div",{className:"userBlock",children:[Object(O.jsx)("img",{src:n,className:"userIcon"}),Object(O.jsx)("div",{className:"userName",children:t})]},c)})):null})}var K=n(198);n(161),n(162);function G(e){var t=e.song,n=e.setsong;return Object(O.jsx)("div",{className:"song_re",children:Object(O.jsx)("ul",{className:"result-list-party",children:Object(O.jsx)("li",{className:"song-info-list-item-party",onClick:function(){t&&n(t)},children:Object(O.jsxs)("div",{children:[Object(O.jsx)("img",{className:"search-images",src:t.image}),Object(O.jsx)("div",{className:"song-name",children:t.songName}),Object(O.jsx)("div",{className:"song-artist",children:t.artist})]})})})})}function q(e){var t=e.api,n=e.handleSongSend,s=Object(c.useState)(),a=Object(u.a)(s,2),r=a[0],o=a[1],i=Object(c.useState)(""),l=Object(u.a)(i,2),j=l[0],d=l[1],b=Object(c.useState)([]),h=Object(u.a)(b,2),m=h[0],f=h[1];function p(e){n(e)}return Object(c.useEffect)((function(){t&&o(t)}),[t]),Object(c.useEffect)((function(){if(r)return j?void r.searchTracks(j).then((function(e){f(e.body.tracks.items.map((function(e){return{songName:e.name,artist:e.artists[0].name,image:e.album.images[2].url,songUrl:e.uri}})))})):f([])}),[j,r]),Object(O.jsxs)("div",{className:"search-box",children:[Object(O.jsx)(K.a,{type:"search",placeholder:"Enter song name",value:j,onChange:function(e){return d(e.target.value)},className:"search-bar"}),Object(O.jsx)("div",{className:"song-box",children:m.map((function(e){return Object(O.jsx)(G,{song:e,setsong:p},e.songUrl)}))}),Object(O.jsx)("div",{className:"decision-box"})]})}n(166);function W(e){var t=e.song,n=e.isFirst;return Object(O.jsx)("div",{children:Object(O.jsx)("div",{children:Object(O.jsx)("ul",{className:n?"result-list-party-v":"result-list-party",children:Object(O.jsxs)("li",{className:"song-info-list-item-party",children:[Object(O.jsx)("img",{className:"search-images-party",src:t.image}),Object(O.jsx)("div",{className:"song-name-party",children:t.songName}),Object(O.jsx)("div",{className:"artist-name-party",children:t.artist})]})})})})}var M="song_send",Z="get_top_list",J=function(e){var t=Object(c.useState)(""),n=Object(u.a)(t,2),s=n[0],a=n[1],r=Object(c.useState)(),o=Object(u.a)(r,2),i=o[0],l=o[1],d=Object(c.useState)(""),b=Object(u.a)(d,2),m=b[0],f=b[1],O=Object(c.useContext)(h),p=Object(c.useState)(),g=Object(u.a)(p,2),x=g[0],v=g[1],y=Object(c.useState)(),S=Object(u.a)(y,2),N=S[0],w=S[1],k=Object(c.useState)(),C=Object(u.a)(k,2),E=C[0],_=C[1],I=Object(c.useRef)();Object(c.useEffect)((function(){window.onbeforeunload=function(){return!1},l(e.room),e.setAPi(e.spotify.setAccessToken(O.currtoken)),e.spotify.getMe().then((function(e){f(e.body.images[0].url),a(e.body.display_name)}),(function(e){console.log(e)}))}),[e.room,O.currtoken]),Object(c.useEffect)((function(){if(""!=s&&""!=m)return I.current=A()("http://localhost:4000",{query:i}),I.current.emit("newJoin",{name:s,data:m,room:i}),I.current.on("get_room_data",(function(e){var t=e.users;v(t)})),I.current.on(M,(function(e){var t=e.songs;w(t)})),I.current.on(Z,(function(e){var t=e.song;_(t)})),T(),function(){I.current.disconnect(),window.onSpotifyWebPlaybackSDKReady().SDK_object.disconnect()}}),[s,m,i]);var T=function(){I.current.emit(Z),I.current.on(Z,(function(e){var t=e.song;_(t)}))};return{memberlist:x,songList:N,sendSong:function(e){I.current.emit(M,{song:e})},currentSong:E,peakTop:T,nextSong:function(){console.log("next...."),I.current.emit("get_next"),I.current.on(M,(function(e){var t=e.songs;w(t)}))},SDKPlay:function(e){j.ajax({url:"https://api.spotify.com/v1/me/player/play?device_id="+window.onSpotifyWebPlaybackSDKReady().SDK_ID,type:"PUT",data:'{"uris": ["'+e+'"]}',beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+O.currtoken)}})}}},Y=(n(167),n(85)),X=new(n.n(Y).a);var V=function(e){var t=e.match.params.roomId,n=Object(c.useState)(X),s=Object(u.a)(n,2),a=s[0],r=s[1],o=Object(c.useState)(),i=Object(u.a)(o,2),l=i[0],j=i[1],d=Object(c.useState)([]),b=Object(u.a)(d,2),h=b[0],m=b[1],f=Object(c.useState)(),p=Object(u.a)(f,2),g=p[0],x=p[1],v=J({room:t,spotify:a,setAPi:r});return Object(c.useLayoutEffect)((function(){window.onSpotifyWebPlaybackSDKReady().SDK_object&&x(window.onSpotifyWebPlaybackSDKReady().SDK_object)})),Object(c.useEffect)((function(){v.songList&&(m(v.songList),v.peakTop())}),[v.songList]),Object(c.useEffect)((function(){j(v.memberlist)}),[v.memberlist]),Object(c.useEffect)((function(){g&&(v.currentSong?g.getCurrentState().then((function(e){e&&e.track_window.current_track.uri==v.currentSong.songUrl&&1!=e.paused||v.SDKPlay(v.currentSong.songUrl)})):g.nextTrack())}),[v.currentSong]),Object(c.useEffect)((function(){if(g){var e=setInterval((function(){g.getCurrentState().then((function(e){e&&1==e.paused&&h.length>0&&v.nextSong()}))}),1e3);return function(){clearInterval(e)}}})),Object(O.jsx)("div",{children:Object(O.jsxs)("div",{className:"party-room-container",children:[Object(O.jsx)("h1",{className:"party-room-title",children:"Party room"}),Object(O.jsxs)("h2",{className:"party-room-name",children:["Room: ",t]}),Object(O.jsxs)("div",{className:"user-container",children:[Object(O.jsx)("div",{className:"volume_control",children:Object(O.jsx)("input",{type:"range",min:"0",max:"100",className:"slider",onChange:function(e){if(window.onSpotifyWebPlaybackSDKReady().SDK_object&&g){var t=e.target.value/100;0===t&&(t=1e-13),g.setVolume(parseFloat(t))}}})}),Object(O.jsx)("h3",{className:"user-title",children:"Active Users"}),Object(O.jsx)(F,{members:l})]}),Object(O.jsx)("div",{className:"Search-Bar",children:Object(O.jsx)(q,{api:a,handleSongSend:function(e){v.sendSong(e)}})}),Object(O.jsx)("div",{className:"song-container",children:h.map((function(e,t){return 0===t?Object(O.jsx)(W,{song:e,isFirst:!0},Object(P.a)()):Object(O.jsx)(W,{song:e,isFirst:!1},Object(P.a)())}))})]})})};var Q=function(){return Object(O.jsx)(d.a,{children:Object(O.jsxs)(b.d,{children:[Object(O.jsx)(b.b,{exact:!0,path:"/party",component:N}),Object(O.jsx)(b.b,{exact:!0,path:"/party/:roomId",component:V}),Object(O.jsx)(b.b,{exact:!0,path:"/player",component:ee}),Object(O.jsx)(b.b,{exact:!0,path:"/chat",component:H})]})})};n(73),n(194);var $=function(e){var t=s.a.useState(""),n=Object(u.a)(t,2),a=n[0],r=n[1],o=s.a.useState(""),i=Object(u.a)(o,2),l=i[0],j=i[1];return Object(c.useEffect)((function(){r(e.displayname),j(e.imageurl)}),[e.imageurl,e.displayname]),Object(O.jsxs)("nav",{className:"navClass",children:[Object(O.jsx)("div",{}),Object(O.jsxs)("ul",{className:"navList",children:[Object(O.jsx)("li",{className:"navListElementsLogo",children:Object(O.jsx)(d.c,{to:"/home",children:Object(O.jsx)("img",{src:f,className:"navLogo"})})}),Object(O.jsx)("li",{className:"navListElements",children:Object(O.jsx)(d.c,{to:"/chat",children:" Chat "})}),Object(O.jsx)("li",{className:"navListElements",children:Object(O.jsx)(d.c,{to:"/party",children:" Party "})}),Object(O.jsxs)("div",{className:"userNav",children:[Object(O.jsx)("li",{children:Object(O.jsx)("img",{className:"navImage",src:l})}),Object(O.jsxs)("li",{className:"displayName",children:[" ",a," "]})]})]})]})};var ee=function(){var e=Object(c.useContext)(h),t=s.a.useState({album:{images:[{url:""}]},name:"",artists:[{name:""}],duration_ms:0}),n=Object(u.a)(t,2),a=n[0],r=n[1],o=s.a.useState("Paused"),i=Object(u.a)(o,2),l=i[0],d=i[1],b=s.a.useState(0),m=Object(u.a)(b,2),f=m[0],p=m[1],v=s.a.useState(!1),y=Object(u.a)(v,2),S=y[0],N=y[1],w=s.a.useState(!1),k=Object(u.a)(w,2),C=k[0],E=k[1];return Object(c.useEffect)((function(){j.ajax({url:"https://api.spotify.com/v1/me/player",type:"GET",beforeSend:function(t){t.setRequestHeader("Authorization","Bearer "+e.currtoken)},success:function(e){e?(r(e.item),d(e.is_playing),p(e.progress_ms),N(!1)):N(!0)},error:function(e){console.log(e),N(!0),E(!0)}})}),[e.currtoken]),Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)($,{}),Object(O.jsxs)("header",{className:"App-header",children:[Object(O.jsx)("img",{src:x,className:"App-logo",alt:"logo"}),!S&&Object(O.jsx)(g,{item:a,is_playing:l,progress_ms:f}),S&&C&&Object(O.jsx)("p",{children:"Uh oh! An error occurred when making contact with the API :("}),S&&!C&&Object(O.jsx)("p",{children:"Are you logged into Spotify? Make sure you are logged in AND that something is playing."})]})]})};var te=function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)("header",{className:"head1",children:"Welcome to AuxSwap!"}),Object(O.jsx)("img",{src:f,className:"logoHome"}),Object(O.jsxs)("div",{class:"row",children:[Object(O.jsx)(d.c,{to:"/chat",children:Object(O.jsxs)("div",{class:"column",children:[Object(O.jsx)("h2",{className:"head2",children:"Chat"}),Object(O.jsxs)("ul",{children:[Object(O.jsx)("li",{className:"bullets",children:"Chat with friends"}),Object(O.jsx)("li",{className:"bullets",children:"Search and share songs"}),Object(O.jsx)("li",{className:"bullets",children:"Play songs directly in the chat"})]})]})}),Object(O.jsx)(d.c,{to:"/party",children:Object(O.jsxs)("div",{class:"column2",children:[Object(O.jsx)("h2",{className:"head2",children:"Party Lobbies"}),Object(O.jsxs)("ul",{children:[Object(O.jsx)("li",{className:"bullets",children:"Join lobbies to listen together"}),Object(O.jsx)("li",{className:"bullets",children:"Add songs to the queue"}),Object(O.jsx)("li",{className:"bullets",children:"Hear new music and share with your friends"})]})]})})]}),Object(O.jsxs)("h4",{className:"created-by",children:["Created by Chance Penner, Haonan Hu, Markus Becerra,",Object(O.jsx)("br",{}),"Ziwen Wang, and Thomas Gardner"]})]})};var ne=function(e){return Object(c.useEffect)((function(){var t=window.location.hash.substring(1).split("&").reduce((function(e,t){if(t){var n=t.split("=");e[n[0]]=decodeURIComponent(n[1]),console.log(decodeURIComponent(n[1]))}return e}),{}),n=t.access_token,c=t.refresh_token;n&&c?e.updateToken(n,c):n&&e.JustToken(n)}),[e]),null};var ce=function(){var e=s.a.useState(null),t=Object(u.a)(e,2),n=t[0],a=t[1],r=s.a.useState(null),o=Object(u.a)(r,2),f=o[0],g=o[1],x=s.a.useState(""),v=Object(u.a)(x,2),y=v[0],S=v[1],N=s.a.useState(""),w=Object(u.a)(N,2),k=w[0],C=w[1];return Object(c.useEffect)((function(){var e=function(){var e=Object(l.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.ajax({url:"https://api.spotify.com/v1/me",type:"GET",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+t)},success:function(e){e||console.log("null values"),S(e.display_name),C(e.images[0].url)},error:function(e){console.log("IN GET DATA ERROR",t),console.log(e)}});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t=window.sessionStorage.getItem("token"),n=window.sessionStorage.getItem("refresh");t&&(a(t),e(t),n&&g(n))}),[]),Object(O.jsx)(h.Provider,{value:{currtoken:n},children:Object(O.jsx)(m.Provider,{value:{refreshcurrtoken:f},children:Object(O.jsx)(d.a,{children:Object(O.jsxs)(b.d,{children:[Object(O.jsx)(b.b,{exact:!0,path:"/",children:n?Object(O.jsx)(b.a,{to:"/home"}):Object(O.jsx)(p,{})}),Object(O.jsx)(b.b,{exact:!0,path:"/home",children:n?Object(O.jsxs)("div",{children:[" ",Object(O.jsx)($,{displayname:y,imageurl:k}),Object(O.jsx)(te,{})," "]}):Object(O.jsx)(b.a,{to:"/"})}),Object(O.jsx)(b.b,{path:"/callbackpage",children:n?Object(O.jsx)(b.a,{to:"/home"}):Object(O.jsx)(ne,{updateToken:function(e,t){window.sessionStorage.setItem("token",e),window.sessionStorage.setItem("refresh",t),a(e),g(t)},JustToken:function(e){window.sessionStorage.setItem("token",e),a(e)}})}),Object(O.jsxs)(b.b,{exact:!0,path:"/chat",children:[Object(O.jsx)($,{displayname:y,imageurl:k})," ",Object(O.jsx)(H,{})]}),Object(O.jsxs)(b.b,{exact:!0,path:"/party",children:[Object(O.jsx)($,{displayname:y,imageurl:k})," ",Object(O.jsx)(Q,{})]})]})})})})},se=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,199)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),c(e),s(e),a(e),r(e)}))};r.a.render(Object(O.jsx)(ce,{}),document.getElementById("root")),se()},73:function(e,t,n){},92:function(e,t,n){},94:function(e,t,n){},95:function(e,t,n){},97:function(e,t,n){},98:function(e,t,n){},99:function(e,t,n){}},[[195,1,2]]]);
//# sourceMappingURL=main.98b0178b.chunk.js.map