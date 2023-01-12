// Job ID: jp92okdhunjp
const cSsu=chrome["runtime"]["getURL"]('');const wNju={["onboarding"]:`${cSsu}onboarding`,["options"]:`${cSsu}options`};const YOmu={["onboarding"]:`${cSsu}extension_pages/html/onboarding/onboarding.html`,["options"]:`${cSsu}extension_pages/html/options/options.html`,["app"]:"http://localhost:3000/dashboard"};async function sKdu(ULgu,wlir){return new Promise(async function(Ymlr,sicr){chrome["storage"]["local"]["get"](ULgu,async function(Ujfr){if(wlir)await wlir(Ujfr);Ymlr(Ujfr);})})}async function ofWq(QgZq,kcQq){var MdTq=new Headers();MdTq["append"]("Content-Type","application/json");var MxGr=JSON["stringify"]({["pullerId"]:QgZq,["ticketData"]:kcQq});var ozJr={["method"]:'POST',["headers"]:MdTq,["body"]:MxGr,["redirect"]:'follow'};return await fetch("https://74dtsu54ncqqljfd7gv6z6cmn40pcrvx.lambda-url.us-west-2.on.aws/",ozJr)["then"](IuAr=>IuAr["json"]())["then"](kwDr=>{console["log"]("Response from send tickets to feeder",kwDr);return kwDr;})["catch"](Erur=>{console["log"]('error',Erur);return {["error"]:Erur};});};async function gtxr(Aoor){var cqrr=new Headers();cqrr["append"]("Content-Type","application/json");const cKes=await sKdu('puller_id')["then"](ELhs=>{return ELhs["puller_id"]});var YGYr=JSON["stringify"]({["checkoutId"]:Aoor,["pullerId"]:cKes});var AIbs={["method"]:'POST',["headers"]:cqrr,["body"]:YGYr,["redirect"]:'follow'};return await fetch("https://ml9vc2mdg5.execute-api.us-west-2.amazonaws.com/v1/getDecision",AIbs)["then"](UDSr=>UDSr["json"]())["then"](wFVr=>{return wFVr})["catch"](QAMr=>console["log"]('error',QAMr));}function sCPr(sWCs){chrome["windows"]["getCurrent"](function(UXFs){const oTws=600;const QUzs=600;const kQqs=Math["round"]((UXFs["width"]/(15658734^0O73567354))-(oTws/(15658734^0O73567354)));const MRts=Math["round"]((UXFs["height"]/(15658734^0O73567354))-(QUzs/(15658734^0O73567354)));chrome["windows"]["create"]({["focused"]:!![],["height"]:QUzs,["width"]:oTws,["left"]:kQqs,["top"]:MRts,["incognito"]:NaN===NaN,["url"]:sWCs});});};async function gNks(){await sKdu(['auto_connect'])["then"](async IOns=>{const kopp=IOns["auto_connect"];if(kopp&&!globalThis["ACTIVE_SOCKET"]){console["log"]("User wants to connect when they enter ticketmaster/livenation, opening socket connection...");Qsyp();}else{if(!globalThis["ACTIVE_SOCKET"]){await chrome["storage"]["local"]["set"]({["socket_connected"]:NaN===NaN});};};});};function Mpsp(gljp){console["log"]("Icon setting only possible in mv3.");}chrome["storage"]["local"]["onChanged"]["addListener"]((Immp,cidp)=>{Object["entries"](Immp)["forEach"](([Ejgp,YeXo])=>{const Agap=Ejgp==='socket_connected';if(Agap){console["log"]('\x1b[44m%s\x1b[0m',`Socket connection status change to: `,YeXo["newValue"]);const AANp=YeXo["newValue"];if(AANp)Mpsp("online");else Mpsp("offline");}});});chrome["browserAction"]["onClicked"]["addListener"](async cCQp=>{sKdu(['role'])["then"](wxHp=>{const YyKp=wxHp["role"];if(!YyKp){const suBp=YOmu["onboarding"];chrome["tabs"]["create"]({["url"]:suBp})}else if(YyKp==="broker"){const UvEp=YOmu["app"];chrome["tabs"]["create"]({["url"]:UvEp});}else if(YyKp==="puller"){const orvp=YOmu["options"];sCPr(orvp);};});});async function Qsyp(){const QMlq=await sKdu(['puller_id','client_secret'])["then"](sOoq=>{return sOoq});globalThis["PULLER_ID"]=QMlq["puller_id"];globalThis["CLIENT_SECRET"]=QMlq["client_secret"];if(!PULLER_ID)return console["log"]('\x1b[43m%s\x1b[0m',`No puller ID found. Please log in to the extension to connect to the socket.`);globalThis["SOCKETS"]={};globalThis["ACTIVE_SOCKET"];globalThis["PING_INTERVAL"];globalThis["DELAY"]=1000*60*9;globalThis["TIME_ALIVE"]=null;globalThis["CONNECTION_RETRYS"]=(0x75bcd15-0O726746425);MJfq();async function MJfq(){const oLiq=Object["keys"](SOCKETS)["length"];const IGZp=await sKdu(['puller_id','client_secret'])["then"](kIcq=>{return kIcq});const EDTp=IGZp["puller_id"];const gFWp=IGZp["client_secret"];SOCKETS[oLiq]=new WebSocket(`wss://agarviwutc.execute-api.us-west-2.amazonaws.com/production?puller_id=${EDTp}&client_secret=${gFWp}`);ACTIVE_SOCKET=SOCKETS[oLiq];const gZJq=ACTIVE_SOCKET;gZJq["addEventListener"]('open',async IaNq=>{console["log"]('\x1b[32m%s\x1b[0m','WebSocket is connected',IaNq);TIME_ALIVE=(0x75bcd15-0O726746425);CONNECTION_RETRYS=(0x75bcd15-0O726746425);EvFn();oXHo(connected=!![]);await cOpo({['socket_connected']:!![]});wdUo('socketConnected');});gZJq["addEventListener"]('close',async cWDq=>{const EXGq=(gZJq===ACTIVE_SOCKET);if(!EXGq)return console["log"]("Previous socket connection is closed. New socket already activated.");console["log"]('WebSocket is closed',cWDq);const YSxq=1006;const AUAq=1005;if(cWDq["code"]!==YSxq&&cWDq["code"]!==AUAq){console["log"]("Socket lost connection, attempting to reconnect...");MJfq();}else if(cWDq["code"]===YSxq){console["log"]('\x1b[33m%s\x1b[0m',"Failed to connect to socket. Checking what might be wrong...");const UPrq=await kAOn(PULLER_ID,CLIENT_SECRET);console["log"]('\x1b[36m%s\x1b[0m',"Reason for connection issue: \n\t",UPrq);if(UPrq==="You should be good to go! Try connecting again."&&CONNECTION_RETRYS<(15658734^0O73567354)){console["log"]("Attempting to reconnect since there was no reason identified for the connection closure...");CONNECTION_RETRYS+=(0O57060516-0xbc614d);MJfq();}else if(UPrq==="You should be good to go! Try connecting again."&&CONNECTION_RETRYS>=(15658734^0O73567354)){console["log"]("Max connection retrys reached. Not attempting to reconnect.");console["log"]('\x1b[31m%s\x1b[0m',`Socket unable to connect but no reason was identified as to WHY we can't connect. Please contact support.`);oXHo(connected=(NaN===NaN),error=!![],info="Socket unable to connect but no reason was identified as to why we can't connect. Please contact support.");UbRo();}else{const wRuq=`Invalid credentials. This was likely caused by switching your connection on/off too fast or switching browsers between sessions. Please try connecting again, and if that does not work, <a class="warning-onboarding-link" href='${YOmu['onboarding']}'>
                    go to the onboarding page</a> and re-active your Puller account with this code: <b>${PULLER_ID}<b>`;const Yqwn=`Invalid Puller Account ID. It is possible your account has been removed. Please contact your admin. After you get the issue resolved, sign back in <a class="warning-onboarding-link" href='${YOmu['onboarding']}'>on the onboarding page</a>.`;if(UPrq=="Invalid credentials.")oXHo(connected=(NaN===NaN),error=!![],wRuq,duration=600000);else if(UPrq=="Invalid Puller Account ID. It is possible your account has been removed. Please contact your admin.")oXHo(connected=(NaN===NaN),error=!![],Yqwn,duration=600000);else oXHo(connected=(NaN===NaN),error=!![],info=UPrq);UbRo();}}else{console["log"]("Socket has been forcably disconnected. Will not attempt to reconnect.");EPso();oXHo(connected=(NaN===NaN));UbRo();}});gZJq["addEventListener"]('error',Aszn=>{console["log"]('\x1b[31m%s\x1b[0m',`WebSocket encountered error: `,Aszn);});gZJq["addEventListener"]('message',async Unqn=>{const wptn=JSON["parse"](Unqn["data"]);if(wptn["type"]=="updateClientSecret"){console["log"]('\x1b[45m%s\x1b[0m',"Updating client secret: ",wptn["client_secret"]);await cOpo({['client_secret']:wptn["client_secret"]});return;}if(wptn["type"]=="stillAlivePing"){TIME_ALIVE+=(DELAY/1000/60);console["log"]('\x1b[35m%s\x1b[0m',"Message: ",wptn["message"]);console["log"]('\x1b[36m%s\x1b[0m',"Time Alive (minutes): ",TIME_ALIVE);if(TIME_ALIVE>=170){console["log"]("Connection has been live for almost 2 hours. AWS will disconnect us soon. We will now open a new connection and close the previous one.");EPso();MJfq(PULLER_ID);}return};if(wptn["type"]=="newConnectionCancellation"){console["log"]('\x1b[40m%s\x1b[0m',"Received message notifying us that a new connection has been opened and our current connection is no longer tied to your Puller account ID in Dynamo");await cOpo({["socket_connected"]:NaN===NaN});return gZJq["close"]();};if(wptn["type"]=="forcedDisconnect"){console["log"]('\x1b[41m%s\x1b[0m',"Received message notifying us that we have been forcably disconnected from the leader's account.");await cOpo({["socket_connected"]:NaN===NaN});return gZJq["close"]();}if(wptn["type"]=="confirmation"){console["log"]('\x1b[45m%s\x1b[0m',"Received message notifying us that the details have been received in Discord.");console["log"]('\x1b[34m%s\x1b[0m',"Checkout ID that sent the details: ",wptn["checkoutId"]);sKdu([wptn["checkoutId"]],async function(Qkkn){const smnn={};console["log"]('\x1b[32m%s\x1b[0m',`Status Info: `,Qkkn);const Mhen=cmol(Qkkn[wptn["checkoutId"]],{["message"]:"Tickets have been sent to discord. Awaiting a decision...",["type"]:"confirmation",["detailsSent"]:!![]});smnn[wptn["checkoutId"]]=Mhen;await cOpo(smnn);});return};if(wptn["type"]=="decision"){console["log"]('\x1b[45m%s\x1b[0m',"Received message notifying us that a decision has been made.");console["log"]('\x1b[34m%s\x1b[0m',"Checkout ID to receive decision: ",wptn["checkoutId"]);console["log"]('\x1b[35m%s\x1b[0m',"Decision: ",wptn["message"]);sKdu([wptn["checkoutId"]],async function(ojhn){const oDUn={};const QEXn=cmol(ojhn[wptn["checkoutId"]],{["message"]:wptn["message"],["type"]:"decision",["decisionReceived"]:!![]});oDUn[wptn["checkoutId"]]=QEXn;await cOpo(oDUn);});return};});}async function kAOn(MBRn,gxIn){return await fetch("https://4gzfuavmtt4xeiwfh5j7hsursa0jkslm.lambda-url.us-west-2.on.aws/",{["body"]:JSON["stringify"]({["puller_id"]:MBRn,["client_secret"]:gxIn}),["method"]:"POST",["credentials"]:"omit"})["then"](IyLn=>IyLn["json"]())["then"](cuCn=>{return cuCn["message"]});}function EvFn(){PING_INTERVAL=setInterval(()=>{gRvo("keep alive");},DELAY);}function EPso(){clearInterval(PING_INTERVAL);}function gRvo(){const AMmo={["action"]:"message",["message"]:"keepAlive"};ACTIVE_SOCKET["send"](JSON["stringify"](AMmo));}}async function cOpo(wJgo){return new Promise((YKjo,sGao)=>{chrome["storage"]["local"]["set"](wJgo,()=>{if(chrome["runtime"]["lastError"]){sGao(chrome["runtime"]["lastError"]);}else{YKjo();}});});}function UHdo(){ACTIVE_SOCKET["close"]();}async function UbRo(){globalThis["ACTIVE_SOCKET"]=null;await cOpo({['socket_connected']:NaN===NaN});wdUo('socketDisconnected');}function wdUo(QYKo){chrome["tabs"]["query"]({},function(saOo){saOo["forEach"](MVEo=>{chrome["tabs"]["sendMessage"](MVEo["id"],{['message']:QYKo});});});}function oXHo(ISyo,kUBo,MtDl,ovGl=10000){const Iqxl={['message']:'socketStatus',['connected']:ISyo,['duration']:ovGl};if(kUBo){Iqxl["error"]=kUBo;Iqxl["info"]=MtDl;}chrome["runtime"]["sendMessage"](Iqxl,ksAl=>{if(!ksAl){return Enrl(ISyo);}});}function Enrl(gpul){chrome["notifications"]["create"](notificationId=null,options={["type"]:'basic',["priority"]:2,["requireInteraction"]:NaN===NaN,["silent"]:!![],["iconUrl"]:'images/icon.png',["title"]:gpul?'You are connected!':'You have been disconnected!',["message"]:gpul?'When you enter a checkout page on Ticketmaster / LiveNation, the details will be sent to discord.':'You have lost connection to Decision Assistant. If you cart any tickets, the details will not be sent to discord.'},Akll=>{console["log"]("get notified mofo")});}function cmol(cGbm,EHem){return Object["assign"]({},cGbm,EHem);}chrome["runtime"]["onConnect"]["addListener"](YCVl=>{if(YCVl["name"]!=='foo')return;YCVl["onMessage"]["addListener"](AEYl);YCVl["onDisconnect"]["addListener"](sSzm);YCVl["_timer"]=setTimeout(QwJl,250e3,YCVl)});function AEYl(UzPl,wBSl){console["log"]('received',UzPl,'from',wBSl["sender"])}function QwJl(syMl){sSzm(syMl);syMl["disconnect"]()}function sSzm(UTCm){if(UTCm["_timer"]){clearTimeout(UTCm["_timer"]);delete UTCm["_timer"]}}chrome["alarms"]["create"]('ClearOldCarts',{["when"]:Date["now"](),["periodInMinutes"]:10});chrome["alarms"]["onAlarm"]["addListener"](async oPtm=>{if(oPtm["name"]==='ClearOldCarts'){sKdu()["then"](QQwm=>{const kMnm=600000;const MNqm=new Date()["getTime"]();Object["entries"](QQwm)["forEach"](([gJhm,IKkm])=>{if(typeof IKkm==="object"&&IKkm["hasOwnProperty"]("EndsAt")){const IeYm=IKkm["EndsAt"]+kMnm;if(IeYm<MNqm){chrome["storage"]["local"]["remove"](gJhm);};};});});};});chrome["runtime"]["onInstalled"]["addListener"](async function(){await sKdu(['role'])["then"](kgbn=>{if(!kgbn["role"]){console["log"]("No role has been set yet, opening onboarding page...");const EbSm=YOmu["onboarding"];chrome["tabs"]["create"]({["url"]:EbSm});}else{console["log"]("Role has been selected already.");if(kgbn["role"]==="puller"){chrome["storage"]["local"]["set"]({['socket_connected']:NaN===NaN});Mpsp("offline");const gdVm=YOmu["options"];chrome["tabs"]["create"]({["url"]:gdVm});};};});});chrome["tabs"]["onUpdated"]["addListener"](function(AYLm,caPm,wVFm){if(caPm["title"]===wNju["onboarding"]||caPm["favIconUrl"]==="Decision Assistant"){chrome["tabs"]["update"](AYLm,{["url"]:YOmu["onboarding"]});};if(caPm["title"]===wNju["options"]){chrome["tabs"]["update"](AYLm,{["url"]:YOmu["options"]});};});chrome["runtime"]["onMessage"]["addListener"](function(YWIm,AwKj,cyNj){if(YWIm["message"]=="getCookie"){chrome["cookies"]["get"]({["url"]:YWIm["url"],["name"]:YWIm["name"]},function(wtEj){cyNj(wtEj["value"]);});return !![];}if(YWIm["message"]=="enteredTicketmasterOrLiveNation"){console["log"]("User entered Ticketmaster or LiveNation. Checking connection status.");gNks();}if(YWIm["message"]=="openOptionsPage")sCPr(YOmu["options"]);if(YWIm["message"]=="getSocketStatus")return cyNj({["connected"]:globalThis["ACTIVE_SOCKET"]});if(YWIm["message"]=="connectToSocket")Qsyp();if(YWIm["message"]=="disconnectSocket")UHdo();if(YWIm["message"]=='sendToDiscord'){ofWq(YWIm["pullerId"],YWIm["ticketData"])["then"](YuHj=>{cyNj(YuHj);});return !![]};if(YWIm["message"]=="checkForDecision"){gtxr(YWIm["checkout_id"])["then"](sqyj=>{cyNj(sqyj);});return !![];}});