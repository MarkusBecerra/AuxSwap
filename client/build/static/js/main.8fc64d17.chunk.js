(this["webpackJsonpauxswap-react"]=this["webpackJsonpauxswap-react"]||[]).push([[0],{104:function(e,t,s){},105:function(e,t,s){},107:function(e,t,s){},135:function(e,t,s){},136:function(e,t,s){},154:function(e,t,s){},155:function(e,t,s){},156:function(e,t,s){},160:function(e,t,s){},161:function(e,t,s){},178:function(e,t){},188:function(e,t,s){},189:function(e,t,s){"use strict";s.r(t);var c=s(1),n=s(0),a=s.n(n),r=s(74),i=s.n(r),o=(s(93),s(39)),l=s.n(o),u=s(75),j=s(2),d=(s(95),s(9)),b=s(5),m=s(4),h=a.a.createContext(),O=a.a.createContext(),f=(s(96),s.p+"static/media/logo_1_transparent.f6b8161d.png");var x=function(){return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)("h1",{className:"head",children:"AuxSwap"}),Object(c.jsx)("img",{src:f,className:"mainLogo"}),Object(c.jsxs)("body",{className:"bod",children:["A web application using Spotify. ",Object(c.jsx)("br",{}),"Listen together and chat with your friends!"]}),Object(c.jsx)("a",{className:"Login-button",href:"".concat(Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://auxswaptest.herokuapp.com/",REACT_APP_CLIENT_ID:"07edde060f0f46bf82f2a7f621354d2a",REACT_APP_CLIENT_SECRET:"8f0e089e81b74f44b4e0d5fee88d1436"}).REACT_APP_HOST,"/auth/login"),children:"Login to Spotify"})]})},p=(s(97),function(e){var t={backgroundImage:"url(".concat(e.item.album.images[0].url,")")},s={width:100*e.progress_ms/e.item.duration_ms+"%"};return Object(c.jsx)("div",{className:"App",children:Object(c.jsxs)("div",{className:"main-wrapper",children:[Object(c.jsx)("div",{className:"now-playing__img",children:Object(c.jsx)("img",{src:e.item.album.images[0].url})}),Object(c.jsxs)("div",{className:"now-playing__side",children:[Object(c.jsx)("div",{className:"now-playing__name",children:e.item.name}),Object(c.jsx)("div",{className:"now-playing__artist",children:e.item.artists[0].name}),Object(c.jsx)("div",{className:"now-playing__status",children:e.is_playing?"Playing":"Paused"}),Object(c.jsx)("div",{className:"progress",children:Object(c.jsx)("div",{className:"progress__bar",style:s})})]}),Object(c.jsx)("div",{className:"background",style:t})," "]})})}),g=(s(98),s.p+"static/media/logo.6ce24c58.svg"),v=(s(99),function(){var e=a.a.useState(""),t=Object(j.a)(e,2),s=t[0],n=t[1],r=Object(m.g)();return Object(c.jsx)("div",{children:Object(c.jsxs)("div",{className:"home-container",children:[Object(c.jsx)("input",{type:"text",placeholder:"Room",value:s,onKeyDown:function(e){13==e.keyCode&&r.push("/party/".concat(s))},onChange:function(e){n(e.target.value)},className:"text-input-field"}),Object(c.jsx)(b.b,{to:"/party/".concat(s),className:"enter-room-button",children:"Join room2"})]})})}),y=(s(104),s(105),function(e){var t=Object(n.useContext)(h),s=Object(n.useState)(""),a=Object(j.a)(s,2),r=a[0],i=a[1],o=Object(n.useState)(""),l=Object(j.a)(o,2),u=l[0],m=l[1],O=Object(n.useState)(""),f=Object(j.a)(O,2),x=f[0],p=f[1];return Object(n.useEffect)((function(e){""!==r?d.ajax({url:"https://api.spotify.com/v1/users/".concat(r),type:"GET",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+t.currtoken)},dataType:"json",success:function(e){e&&(void 0==typeof e||(console.log("userData: ".concat(e)),m(e.display_name),e.images.length>0?p(e.images[0].url):(m("User does not exist"),p(""))))},error:function(e){console.log(e)}}):(console.log("else"),i(""),m(""),p(""))}),[r]),Object(c.jsxs)("div",{children:[Object(c.jsx)("br",{}),Object(c.jsx)("input",{placeholder:"Search for a user",type:"search",id:"user_searchbar",autoComplete:"off",className:"user-searchbarChatUserSearch",onChange:function(){i(document.getElementById("user_searchbar").value)}}),""!==u&&""!==x?Object(c.jsx)("div",{className:"result-containerChatUserSearch",children:Object(c.jsx)("ul",{className:"result-listChatUserSearch",id:"result-listChatUserSearch",children:Object(c.jsx)("li",{className:"user-info-itemChatUserSearch",children:Object(c.jsxs)("div",{children:[Object(c.jsx)(b.b,{to:"/chat/1",children:Object(c.jsx)("img",{className:"search-imageChatUserSearch",src:x})}),Object(c.jsx)("div",{className:"user-display-nameChatUserSearch",children:u})]})})})}):null,""!==u&&""==x?Object(c.jsx)("div",{className:"result-containerChatUserSearch",children:Object(c.jsx)("ul",{className:"result-listChatUserSearch",id:"result-listChatUserSearch",children:Object(c.jsx)("li",{className:"user-info-itemChatUserSearch",children:Object(c.jsx)("div",{children:Object(c.jsx)("div",{className:"user-display-nameChatUserSearch_2",children:u})})})})}):null]})}),S=function(){var e=a.a.useState(""),t=Object(j.a)(e,2),s=t[0],n=t[1],r=Object(m.g)();return Object(c.jsx)("div",{children:Object(c.jsxs)("div",{className:"home-container",children:[Object(c.jsx)("input",{type:"text",placeholder:"Room",value:s,onKeyDown:function(e){13===e.keyCode&&r.push("/chat/".concat(s))},onChange:function(e){n(e.target.value)},className:"text-input-field"}),Object(c.jsx)(b.b,{to:"/chat/".concat(s),className:"enter-room-button",children:"Join room"}),Object(c.jsx)(y,{})]})})},N=s(38),_=(s(107),s(27)),C=s(44),E=s(25),A=s.n(E),w="newChatMessage",T=Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://auxswaptest.herokuapp.com/",REACT_APP_CLIENT_ID:"07edde060f0f46bf82f2a7f621354d2a",REACT_APP_CLIENT_SECRET:"8f0e089e81b74f44b4e0d5fee88d1436"}).REACT_APP_HOST,k=function(e){var t=Object(n.useState)([]),s=Object(j.a)(t,2),c=s[0],a=s[1],r=Object(n.useRef)();Object(n.useEffect)((function(){return r.current=A()(T,{query:{roomId:e}}),r.current.on(w,(function(e){var t=Object(C.a)(Object(C.a)({},e),{},{ownedByCurrentUser:e.senderId===r.current.id});a((function(e){return[].concat(Object(_.a)(e),[t])}))})),function(){r.current.disconnect()}}),[e]);return{messages:c,sendMessage:function(e){r.current.emit(w,{body:e,senderId:r.current.id})}}},P=(s(135),function(e){var t=Object(n.useContext)(h),s=/^(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/,r=a.a.useState(""),i=Object(j.a)(r,2),o=i[0],l=i[1],u=a.a.useState(""),b=Object(j.a)(u,2),m=b[0],O=b[1],f=a.a.useState(""),x=Object(j.a)(f,2),p=x[0],g=x[1];return Object(n.useEffect)((function(){!function(e){var c=e.match(s)[2];d.ajax({url:"https://api.spotify.com/v1/tracks/".concat(c),type:"GET",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+t.currtoken)},success:function(e){e||l("https://i.pinimg.com/originals/d4/e3/60/d4e3604d2811dbe178801f48e6a2ae69.jpg"),l(e.album.images[0].url),O(e.name),g(e.artists[0].name)},error:function(e){console.log(e),l("https://i.pinimg.com/originals/d4/e3/60/d4e3604d2811dbe178801f48e6a2ae69.jpg")}})}(e.message)}),[]),Object(c.jsxs)("div",{className:"song-message-container",children:[Object(c.jsx)("img",{className:"search-images",src:o}),Object(c.jsx)("div",{className:"song-name",children:m}),Object(c.jsx)("div",{className:"song-artist",children:p})]})}),I=(s(136),function(e){var t=Object(n.useContext)(h),s=a.a.useState([]),r=Object(j.a)(s,2),i=r[0],o=r[1],l=a.a.useState(""),u=Object(j.a)(l,2),b=u[0],m=u[1];var O=function(e){var t=document.getElementById("new-message-input-field");!function(e,t){var s=Object.getOwnPropertyDescriptor(e,"value").set,c=Object.getPrototypeOf(e),n=Object.getOwnPropertyDescriptor(c,"value").set;s&&s!==n?n.call(e,t):s.call(e,t)}(t,e+" "+t.value),t.dispatchEvent(new Event("input",{bubbles:!0}))};return Object(n.useEffect)((function(){i.length=0,o([]),o([]),i.length=0,""!=b&&d.ajax({url:"https://api.spotify.com/v1/search?q=".concat(b,"&type=track&limit=").concat(5,"&offset=0"),type:"GET",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+t.currtoken)},dataType:"json",success:function(e){e.tracks.items.forEach((function(e){o((function(t){return[].concat(Object(_.a)(t),[e])}))}))},error:function(e){console.log(e)}})}),[b]),Object(c.jsxs)("div",{children:[Object(c.jsx)("br",{}),Object(c.jsx)("input",{placeholder:"Search for a song",type:"search",id:"searchbar",autoComplete:"off",className:"song-searchbar",onChange:function(){o([]),i.length=0,m(document.getElementById("searchbar").value)}}),Object(c.jsx)("div",{className:"result-container",children:Object(c.jsx)("ul",{className:"result-list",children:i.slice(0,5).map((function(e){return Object(c.jsx)("li",{className:"song-info-list-item",children:Object(c.jsxs)("div",{children:[Object(c.jsx)("img",{className:"search-images",src:e.album.images[0].url,onClick:function(){O(e.external_urls.spotify),o([]),i.length=0,document.getElementById("searchbar").value=""}},e.external_urls.spotify),Object(c.jsx)("div",{className:"song-name",children:e.name}),Object(c.jsx)("div",{className:"song-artist",children:e.artists[0].name})]})})}))})})]})}),R=(s(43),function(e){var t=/(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/g,s=/(http:|https:|ftp:)\/\/[a-zA-Z0-9]+[.][a-z]+\/*[^ \n]*/g,r=e.match.params.roomId,i=k(r),o=i.messages,l=i.sendMessage,u=a.a.useState(""),d=Object(j.a)(u,2),b=d[0],m=d[1],O=a.a.useState([]),f=Object(j.a)(O,2),x=f[0],p=f[1],g=Object(n.useContext)(h),v=a.a.useState(!1),y=Object(j.a)(v,2),S=y[0],_=y[1],C=a.a.useState(!1),E=Object(j.a)(C,2),A=E[0],w=E[1],T=a.a.useState(!0),R=Object(j.a)(T,2),D=R[0],L=R[1],U=(a.a.useCallback((function(){return L(!D)})),function(){if(""!==b){l(b);var e=document.getElementById("messages-container");setTimeout((function(){e.scrollTop=1e9}),100),m("")}else m("")});return Object(c.jsx)("div",{className:"chat-room-page",children:Object(c.jsxs)("div",{className:"chat-room-container",children:[Object(c.jsx)("h1",{className:"chat-room-title",children:"Chat Room"}),Object(c.jsxs)("h2",{className:"room-name",children:["Room: ",r]}),Object(c.jsx)("div",{children:Object(c.jsx)(I,{children:"SPOTIFY SEARCH"})}),Object(c.jsx)("div",{className:"messages-container",id:"messages-container",children:Object(c.jsx)("ol",{className:"messages-list",children:o.map((function(e,n){if(u=e.body,t.test(u)){var a=new Set(e.body.match(t)),r=Array.from(a),i=e.body.replace(/[ \n]*spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/([0-9a-z-A-Z]{22})([?]si=[a-zA-Z0-9]{22})?([ \n]*)/g,""),o=""===i;return Object(c.jsxs)("div",{children:[o?null:Object(c.jsx)("li",{className:"message-item ".concat(e.ownedByCurrentUser?"my-message":"received-message"),children:Object(c.jsx)("div",{children:i})},n),r.map((function(t,s){return Object(c.jsx)("li",{className:"message-item ".concat(e.ownedByCurrentUser?"my-message":"received-message"),children:Object(c.jsx)("div",{onClick:function(){!function(e){var t=e.match(/(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/)[2],s="spotify:track:".concat(t);p([s])}(t),_(!0)},children:Object(c.jsx)(P,{message:t})})},s)}))]})}if(function(e){return!!s.test(e)}(e.body)){var l=e.body.split(" ");return Object(c.jsx)("li",{className:"message-item ".concat(e.ownedByCurrentUser?"my-message":"received-message"),children:l.map((function(e,t){var s=/(http:|https:|ftp:)\/\/[a-zA-Z0-9]+[.][a-z]+\/*[^ \n]*/g.test(e);return Object(c.jsx)("div",{children:s?Object(c.jsxs)("a",{href:e,target:"_blank",rel:"noreferrer",children:[e," "]}):Object(c.jsx)("div",{children:e})},t)}))},n)}return Object(c.jsx)("li",{className:"message-item ".concat(e.ownedByCurrentUser?"my-message":"received-message"),children:e.body},n);var u}))})}),Object(c.jsx)("textarea",{className:"new-message-input-field",value:b,onKeyDown:function(e){13===e.keyCode&&(w(!0),U())},onChange:function(e){e.preventDefault(),!0!==A&&m(e.target.value),w(!1)},placeholder:"Write message...",id:"new-message-input-field",onKeyPress:function(e){return"Enter"===e.key?U():null}}),Object(c.jsx)("button",{onClick:U,className:"send-message-button",children:"Send"}),Object(c.jsx)("div",{children:S?Object(c.jsx)("button",{onClick:function(){return _(!1)},children:Object(c.jsx)("img",{src:"https://1001freedownloads.s3.amazonaws.com/vector/thumb/70571/close-button.png",className:"x-button"})}):null}),Object(c.jsx)("div",{children:S?Object(c.jsx)(N.a,{token:g.currtoken,uris:x,autoPlay:"true",showSaveIcon:"true",name:"Auxswap"}):null})]})})});var D=function(){return Object(c.jsx)(b.a,{children:Object(c.jsxs)(m.d,{children:[Object(c.jsx)(m.b,{exact:!0,path:"/chat",component:S}),Object(c.jsx)(m.b,{exact:!0,path:"/home",component:ee}),Object(c.jsx)(m.b,{exact:!0,path:"/chat/:roomId",component:R}),Object(c.jsx)(m.b,{exact:!0,path:"/player",component:$}),Object(c.jsx)(m.b,{exact:!0,path:"/party",component:Q})]})})};s(154);function L(e){var t=Object(n.useState)(),s=Object(j.a)(t,2),a=s[0],r=s[1];return Object(n.useEffect)((function(){r(e.members)}),[e]),Object(c.jsx)("div",{className:"userContainer",children:a?a.map((function(e){var t=e.name,s=e.data,n=e.id;return Object(c.jsxs)("div",{className:"userBlock",children:[Object(c.jsx)("img",{src:s,className:"userIcon"}),Object(c.jsx)("div",{className:"userName",children:t})]},n)})):null})}var U=s(191);s(155),s(156);function B(e){var t=e.song,s=e.setsong;return Object(c.jsx)("div",{dclassName:"result-container",children:Object(c.jsx)("ul",{className:"result-list-party",children:Object(c.jsx)("li",{className:"song-info-list-item-party",onClick:function(){t&&s(t)},children:Object(c.jsxs)("div",{children:[Object(c.jsx)("img",{className:"search-images",src:t.image}),Object(c.jsx)("div",{className:"song-name",children:t.songName}),Object(c.jsx)("div",{className:"song-artist",children:t.artist})]})})})})}function z(e){var t=e.api,s=e.handleSongSend,a=Object(n.useState)(),r=Object(j.a)(a,2),i=r[0],o=r[1],l=Object(n.useState)(""),u=Object(j.a)(l,2),d=u[0],b=u[1],m=Object(n.useState)([]),h=Object(j.a)(m,2),O=h[0],f=h[1];function x(e){s(e),b("")}return Object(n.useEffect)((function(){t&&o(t)}),[t]),Object(n.useEffect)((function(){if(i)return d?void i.searchTracks(d).then((function(e){f(e.body.tracks.items.map((function(e){return{songName:e.name,artist:e.artists[0].name,image:e.album.images[2].url,songUrl:e.uri}})))})):f([])}),[d,i]),Object(c.jsxs)("div",{className:"search-box",children:[Object(c.jsx)(U.a,{type:"search",placeholder:"Enter song name",value:d,onChange:function(e){return b(e.target.value)}}),Object(c.jsx)("div",{className:"song-box",children:O.map((function(e){return Object(c.jsx)(B,{song:e,setsong:x},e.songUrl)}))}),Object(c.jsx)("div",{className:"decision-box"})]})}s(160);function H(e){var t=e.song;return Object(c.jsx)("div",{children:Object(c.jsxs)("div",{children:[Object(c.jsx)("img",{src:t.image}),Object(c.jsx)("div",{className:"song-name",children:t.songName}),Object(c.jsx)("div",{className:"artist-name",children:t.artist})]})})}var K=Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://auxswaptest.herokuapp.com/",REACT_APP_CLIENT_ID:"07edde060f0f46bf82f2a7f621354d2a",REACT_APP_CLIENT_SECRET:"8f0e089e81b74f44b4e0d5fee88d1436"}).REACT_APP_HOST,W="song_send",F="get_top_list",q=function(e){var t=Object(n.useState)(""),s=Object(j.a)(t,2),c=s[0],a=s[1],r=Object(n.useState)(),i=Object(j.a)(r,2),o=i[0],l=i[1],u=Object(n.useState)(""),b=Object(j.a)(u,2),m=b[0],O=b[1],f=Object(n.useContext)(h),x=Object(n.useState)(),p=Object(j.a)(x,2),g=p[0],v=p[1],y=Object(n.useState)(),S=Object(j.a)(y,2),N=S[0],_=S[1],C=Object(n.useState)(),E=Object(j.a)(C,2),w=E[0],T=E[1],k=Object(n.useRef)(),P=Object(n.useState)(),I=Object(j.a)(P,2),R=I[0],D=I[1],L=Object(n.useState)(),U=Object(j.a)(L,2),B=U[0],z=U[1],H=Object(n.useState)(!1),q=Object(j.a)(H,2),J=q[0],Z=q[1];function G(e,t){d.ajax({url:"https://api.spotify.com/v1/me/player/play?device_id="+t,type:"PUT",data:'{"uris": ["'+e+'"]}',beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+f.currtoken)},success:Z(!0)})}Object(n.useEffect)((function(){window.onbeforeunload=function(){return!1},l(e.room),e.setAPi(e.spotify.setAccessToken(f.currtoken)),e.spotify.getMe().then((function(e){O(e.body.images[0].url),a(e.body.display_name)}),(function(e){console.log(e)}))}),[e.room,f.currtoken]),Object(n.useEffect)((function(){e.SDK&&D(e.SDK)}),[e.SDK]),Object(n.useEffect)((function(){e.ID&&z(e.ID)}),[e.ID]),Object(n.useEffect)((function(){R&&B&&w&&R.getCurrentState().then((function(e){if(e)return 1==e.paused&&J?(Z(!1),void M()):void(1!=e.paused||J?console.log(e):G(w.songUrl,B));J||G(w.songUrl,B)}))}),[w]),Object(n.useEffect)((function(){if(R)return""!=c&&""!=m?(k.current=A()(K,{query:o}),k.current.emit("newJoin",{name:c,data:m,room:o}),k.current.on("get_room_data",(function(e){var t=e.users;v(t)})),k.current.on(W,(function(e){var t=e.songs;_(t)})),k.current.on(F,(function(e){var t=e.song;T(t)})),V(),function(){k.current.disconnect(),R.disconnect()}):void 0}),[c,m,o]);var M=function(){console.log("next...."),k.current.emit("get_next")},V=function(){var e=setInterval((function(){k.current.emit(F)}),1e3);return function(){clearInterval(e)}};return{memberlist:g,songList:N,sendSong:function(e){k.current.emit(W,{song:e})},currentSong:w}},J=s(85),Z=s.n(J);function G(e){var t=e.handleID,s=e.SDK,a=Object(n.useContext)(h);function r(){var e=a.currtoken,c=new window.Spotify.Player({name:"Aux2",getOAuthToken:function(t){t(e)}});console.log(c),c.addListener("initialization_error",(function(e){var t=e.message;console.error(t)})),c.addListener("authentication_error",(function(e){var t=e.message;console.error(t)})),c.addListener("account_error",(function(e){var t=e.message;console.error(t)})),c.addListener("playback_error",(function(e){var t=e.message;console.error(t)})),c.addListener("ready",(function(e){var s=e.device_id;console.log("Ready with Device ID",s),t(s)})),c.addListener("not_ready",(function(e){var t=e.device_id;console.log("Device ID has gone offline",t)})),c.connect(),s(c)}return Object(n.useEffect)((function(){window.onSpotifyWebPlaybackSDKReady=function(){r()}})),Object(c.jsx)("div",{children:Object(c.jsx)(Z.a,{url:"https://sdk.scdn.co/spotify-player.js",onLoad:r})})}s(161);var M=s(86),V=new(s.n(M).a);var Y=function(e){var t=e.match.params.roomId,s=Object(n.useState)(V),a=Object(j.a)(s,2),r=a[0],i=a[1],o=Object(n.useState)(),l=Object(j.a)(o,2),u=l[0],d=l[1],b=Object(n.useState)([]),m=Object(j.a)(b,2),h=m[0],O=m[1],f=Object(n.useState)(),x=Object(j.a)(f,2),p=x[0],g=x[1],v=Object(n.useState)(),y=Object(j.a)(v,2),S=y[0],N=y[1],_=q({room:t,spotify:r,setAPi:i,SDK:S,ID:p});return Object(n.useEffect)((function(){_.songList&&O(_.songList)}),[_.songList]),Object(n.useEffect)((function(){d(_.memberlist)}),[_.memberlist]),Object(c.jsx)("div",{children:Object(c.jsxs)("div",{className:"party-room-container",children:[Object(c.jsx)("h1",{className:"party-room-title",children:"Party room"}),Object(c.jsxs)("h2",{className:"party-room-name",children:["Room: ",t]}),Object(c.jsxs)("div",{className:"user-container",children:[Object(c.jsx)("h3",{className:"user-title",children:"Active Users"}),Object(c.jsx)(L,{members:u})]}),Object(c.jsx)("div",{className:"Search-Bar",children:Object(c.jsx)(z,{api:r,handleSongSend:function(e){_.sendSong(e)}})}),Object(c.jsx)("div",{className:"song-container",children:h.map((function(e){return Object(c.jsx)(H,{song:e},e.songUrl)}))}),Object(c.jsx)(G,{handleID:function(e){g(e)},SDK:function(e){N(e)}})]})})};var Q=function(){return Object(c.jsx)(b.a,{children:Object(c.jsxs)(m.d,{children:[Object(c.jsx)(m.b,{exact:!0,path:"/party",component:v}),Object(c.jsx)(m.b,{exact:!0,path:"/party/:roomId",component:Y}),Object(c.jsx)(m.b,{exact:!0,path:"/player",component:$}),Object(c.jsx)(m.b,{exact:!0,path:"/chat",component:D})]})})};s(73),s(188);var X=function(e){var t=a.a.useState(""),s=Object(j.a)(t,2),r=s[0],i=s[1],o=a.a.useState(""),l=Object(j.a)(o,2),u=l[0],d=l[1];return Object(n.useEffect)((function(){i(e.displayname),d(e.imageurl)}),[e.imageurl,e.displayname]),Object(c.jsxs)("nav",{className:"navClass",children:[Object(c.jsx)("div",{}),Object(c.jsxs)("ul",{className:"navList",children:[Object(c.jsx)("li",{className:"navListElementsLogo",children:Object(c.jsx)(b.c,{to:"/home",children:Object(c.jsx)("img",{src:f,className:"navLogo"})})}),Object(c.jsx)("li",{className:"navListElements",children:Object(c.jsx)(b.c,{to:"/chat",children:" Chat "})}),Object(c.jsx)("li",{className:"navListElements",children:Object(c.jsx)(b.c,{to:"/party",children:" Party "})}),Object(c.jsxs)("div",{className:"userNav",children:[Object(c.jsx)("li",{children:Object(c.jsx)("img",{className:"navImage",src:u})}),Object(c.jsxs)("li",{className:"displayName",children:[" ",r," "]})]})]})]})};var $=function(){var e=Object(n.useContext)(h),t=a.a.useState({album:{images:[{url:""}]},name:"",artists:[{name:""}],duration_ms:0}),s=Object(j.a)(t,2),r=s[0],i=s[1],o=a.a.useState("Paused"),l=Object(j.a)(o,2),u=l[0],b=l[1],m=a.a.useState(0),O=Object(j.a)(m,2),f=O[0],x=O[1],v=a.a.useState(!1),y=Object(j.a)(v,2),S=y[0],N=y[1],_=a.a.useState(!1),C=Object(j.a)(_,2),E=C[0],A=C[1];return Object(n.useEffect)((function(){d.ajax({url:"https://api.spotify.com/v1/me/player",type:"GET",beforeSend:function(t){t.setRequestHeader("Authorization","Bearer "+e.currtoken)},success:function(e){e?(i(e.item),b(e.is_playing),x(e.progress_ms),N(!1)):N(!0)},error:function(e){console.log(e),N(!0),A(!0)}})}),[e.currtoken]),Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)(X,{}),Object(c.jsxs)("header",{className:"App-header",children:[Object(c.jsx)("img",{src:g,className:"App-logo",alt:"logo"}),!S&&Object(c.jsx)(p,{item:r,is_playing:u,progress_ms:f}),S&&E&&Object(c.jsx)("p",{children:"Uh oh! An error occurred when making contact with the API :("}),S&&!E&&Object(c.jsx)("p",{children:"Are you logged into Spotify? Make sure you are logged in AND that something is playing."})]})]})};var ee=function(){return Object(c.jsxs)("div",{children:[Object(c.jsx)("header",{className:"head1",children:"Welcome to AuxSwap!"}),Object(c.jsx)("img",{src:f,className:"logoHome"}),Object(c.jsxs)("div",{class:"row",children:[Object(c.jsx)(b.c,{to:"/chat",children:Object(c.jsxs)("div",{class:"column",children:[Object(c.jsx)("h2",{className:"head2",children:"Chat"}),Object(c.jsxs)("ul",{children:[Object(c.jsx)("li",{className:"bullets",children:"Chat with friends"}),Object(c.jsx)("li",{className:"bullets",children:"Search and share songs"}),Object(c.jsx)("li",{className:"bullets",children:"Play songs directly in the chat"})]})]})}),Object(c.jsx)(b.c,{to:"/party",children:Object(c.jsxs)("div",{class:"column2",children:[Object(c.jsx)("h2",{className:"head2",children:"Party Lobbies"}),Object(c.jsxs)("ul",{children:[Object(c.jsx)("li",{className:"bullets",children:"Join lobbies to listen together"}),Object(c.jsx)("li",{className:"bullets",children:"Add songs to the queue"}),Object(c.jsx)("li",{className:"bullets",children:"Hear new music and share with your friends"})]})]})})]})]})};var te=function(e){return Object(n.useEffect)((function(){var t=window.location.hash.substring(1).split("&").reduce((function(e,t){if(t){var s=t.split("=");e[s[0]]=decodeURIComponent(s[1]),console.log(decodeURIComponent(s[1]))}return e}),{}),s=t.access_token,c=t.refresh_token;s&&c?e.updateToken(s,c):s&&e.JustToken(s)}),[e]),null};var se=function(){var e=a.a.useState(null),t=Object(j.a)(e,2),s=t[0],r=t[1],i=a.a.useState(null),o=Object(j.a)(i,2),f=o[0],p=o[1],g=a.a.useState(""),v=Object(j.a)(g,2),y=v[0],S=v[1],N=a.a.useState(""),_=Object(j.a)(N,2),C=_[0],E=_[1];return Object(n.useEffect)((function(){var e=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.ajax({url:"https://api.spotify.com/v1/me",type:"GET",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+t)},success:function(e){e||console.log("null values"),S(e.display_name),E(e.images[0].url)},error:function(e){console.log("IN GET DATA ERROR",t),console.log(e)}});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t=window.sessionStorage.getItem("token"),s=window.sessionStorage.getItem("refresh");t&&(r(t),e(t),s&&p(s))}),[]),Object(c.jsx)(h.Provider,{value:{currtoken:s},children:Object(c.jsx)(O.Provider,{value:{refreshcurrtoken:f},children:Object(c.jsx)(b.a,{children:Object(c.jsxs)(m.d,{children:[Object(c.jsx)(m.b,{exact:!0,path:"/",children:s?Object(c.jsx)(m.a,{to:"/home"}):Object(c.jsx)(x,{})}),Object(c.jsx)(m.b,{exact:!0,path:"/home",children:s?Object(c.jsxs)("div",{children:[" ",Object(c.jsx)(X,{displayname:y,imageurl:C}),Object(c.jsx)(ee,{})," "]}):Object(c.jsx)(m.a,{to:"/"})}),Object(c.jsx)(m.b,{path:"/callbackpage",children:s?Object(c.jsx)(m.a,{to:"/home"}):Object(c.jsx)(te,{updateToken:function(e,t){window.sessionStorage.setItem("token",e),window.sessionStorage.setItem("refresh",t),r(e),p(t)},JustToken:function(e){window.sessionStorage.setItem("token",e),r(e)}})}),Object(c.jsxs)(m.b,{exact:!0,path:"/chat",children:[Object(c.jsx)(X,{displayname:y,imageurl:C})," ",Object(c.jsx)(D,{})]}),Object(c.jsxs)(m.b,{exact:!0,path:"/party",children:[Object(c.jsx)(X,{displayname:y,imageurl:C})," ",Object(c.jsx)(Q,{})]})]})})})})},ce=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,192)).then((function(t){var s=t.getCLS,c=t.getFID,n=t.getFCP,a=t.getLCP,r=t.getTTFB;s(e),c(e),n(e),a(e),r(e)}))};i.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(se,{})}),document.getElementById("root")),ce()},73:function(e,t,s){},93:function(e,t,s){},95:function(e,t,s){},96:function(e,t,s){},97:function(e,t,s){},98:function(e,t,s){},99:function(e,t,s){}},[[189,1,2]]]);
//# sourceMappingURL=main.8fc64d17.chunk.js.map