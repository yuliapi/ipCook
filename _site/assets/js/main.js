class NavAnimation{constructor(t){this.expanded=!1,this.stretched=!1,this.nav=$("#nav-toggler"),this.fade=$("#nav-fade"),this.items=$(t).find(".menu-item");for(let t=0;t<this.items.length;t++)this.items[t].initialWidth=this.items[t].offsetWidth,this.items[t].initialHeight=this.items[t].offsetHeight,this.items[t].initialTop=$(this.items[t]).css("top"),this.items[t].initialRight=$(this.items[t]).css("right")}activate(){console.log("navigation is active"),this.nav.bind("mouseenter mouseout",()=>{this.shake(),this.stretched=!this.stretched}),this.nav.click(()=>{this.navExpansion(),this.expanded=!this.expanded})}shake(){if(!1===this.expanded)for(let t=0;t<this.items.length;t++)TweenLite.to(this.items[t],.4,{ease:Back.easeOut.config(4),delay:.1*(t+1),width:!1===this.stretched?this.items[t].initialWidth+8:this.items[t].initialWidth,height:!1===this.stretched?this.items[t].initialHeight+8:this.items[t].initialHeight})}pulse(){for(let t=0;t<this.items.length;t++)$(this.items[t]).bind("mouseenter",()=>{TweenMax.to(this.items[t],1.2,{scale:1.2,repeat:-1,yoyo:!0})}),$(this.items[t]).bind("mouseout",()=>{TweenMax.to(this.items[t],1,{scale:1,repeat:0,yoyo:!1})})}navExpansion(){const t=this.items.length;let e=$(window).width();if(!1===this.expanded){this.nav.addClass("expanded"),this.pulse();for(let i=0;i<t;i++){let s=$(this.items[i]).find("span");$(this.items[i]).addClass("open");const n=e/4,a=150;let h=e-(i*n+(n/2+a/2)),l=120;e<=635&&(2!==i&&3!==i||(l=l+a+20),0!==i&&2!==i||(h=e/2+20),1!==i&&3!==i||(h=e/2-a-20),i===t-1&&($(this.items[i]).hide(),h=-1e3)),TweenLite.to(this.items[i],.6,{delay:.1*(i+1),width:a,height:a,top:l,right:h}),TweenLite.to(s,.6,{opacity:1}),TweenLite.to(this.items[i],.6,{delay:.1*(i+1),width:a,height:a,top:l,right:h})}TweenLite.to(this.fade,.3,{opacity:1,height:1e3,bottom:0})}else{this.nav.removeClass("expanded");for(let e=t-1;e>=0;--e){$(this.items[e]).removeClass("open");let i=$(this.items[e]).find("span");e===t-1&&$(this.items[e]).show(),TweenLite.to(this.items[e],.5,{delay:.1*(t-e),left:"",width:this.items[e].initialWidth,height:this.items[e].initialHeight,top:this.items[e].initialTop,right:this.items[e].initialRight}),TweenLite.to(i,.6,{opacity:0})}TweenLite.to(this.fade,.1,{delay:.8,opacity:0,bottom:-1e3})}}}function isViewoprtExtraSmall(){return window.width>=520}let items,preview,winsize={};const standartHeight=500,imgDefault="/assets/images/no-image.png";let allTags;function initEvents(){items.each(function(){$(this).click(thumbnailClickEvent)})}function isSameRow(t){return null!=preview.current&&t[0].offsetTop===preview.current[0].offsetTop}function thumbnailClickEvent(){let t=$(this),e=$(t[0]);if(e.hasClass("expanded"))preview.close(),preview=new Preview;else{let i=e.data("content");i.title=e.data("title"),i.image=""!==e.data("src")?e.data("src"):imgDefault,i.image=i.image,e.data("origin")&&(i.origin=e.data("origin")),e.data("link")&&(i.link=e.data("link"),console.log(i));let s=isSameRow(e);t.position&&!1===s&&!0===preview.open&&preview.close(),$(preview.current).removeClass("expanded"),preview.current=t,t.addClass("expanded"),!1===preview.open?(preview.open=!0,preview.parent=t,preview.parent.addClass("parent"),t.append(preview.create(i))):preview.update(),preview.content(i),preview.adjustHeight()}}window.onload=function(){console.log("scripts loaded"),$("#nav-toggler").bind(new NavAnimation("#nav-menu").activate()),items=$("#grid-gallery").find("li"),initEvents(),preview=new Preview,allTags=$(".tag")};class PreviewMockup{constructor(){this.node=$("<div>",{class:"preview"}),this.inner=$("<div>",{class:"preview-inner"}),this.node.append(this.inner),this.closeSpan=$("<span>",{class:"preview-close"}),this.imageDiv=$("<div>",{class:"preview-image"}),this.detailsDiv=$("<div>",{class:"preview-details"}),this.inner.append(this.closeSpan),this.inner.append(this.imageDiv),this.inner.append(this.detailsDiv),this.node.bind("click",t=>{t.stopPropagation()}),this.btnHolder=$("<div>",{class:"preview-btn-holder"}),this.showBtn=$("<a>",{text:"my recipie",target:"_blank"}),this.linkBtn=$("<a>",{text:"original recipie",target:"_blank"})}}class Table{constructor(){this.table=$("<table>",{class:"ingredient-table"}),this.head=$("<tr>"),this.headRow=$("<th>",{text:"ingredients"}),this.head.append(this.headRow),this.table.append(this.head)}add(t){return t.forEach(t=>{const e=Object.keys(t);let i="",s="";null!=Object.values(t)[0]&&(i=Object.values(t)[0].split(" ")[0],s=Object.values(t)[0].split(" ")[1]);const n=$("<tr>").append($("<td>",{class:"ingredient",text:e})).append($("<td>",{class:"amount",text:i+s}));this.table.append(n)}),this.table}}class Preview extends PreviewMockup{constructor(){super(),this.open=!1,this.current=null,this.scroll=250,this.parent=null}content(t){this.table=new Table,this.image=$("<img>",{src:t.image}),this.imageDiv.append(this.image),this.imageDiv.append(this.btnHolder),t.link&&($(this.showBtn).attr("href",t.link),this.btnHolder.append(this.showBtn)),t.origin&&($(this.linkBtn).attr("href",t.origin),this.btnHolder.append(this.linkBtn)),this.title=$("<h3>",{text:t.title}),this.detailsDiv.append(this.title),this.detailsDiv.append(this.table.add(t.ingredients))}create(){return console.log("create"),this.closeSpan.bind("click",t=>{preview.close(),t.stopPropagation()}),this.node}update(){console.log("update"),this.detailsDiv.empty(),this.imageDiv.empty(),$(this.linkBtn).attr("href",""),this.btnHolder.empty(),this.parent.height("initial")}close(){this.detailsDiv.empty(),this.imageDiv.empty(),this.node.remove(),this.current.removeClass("expanded"),this.parent.removeClass("parent"),this.parent.height("initial"),this.open=!1}adjustHeight(){console.log(this.parent);let t=$(this.node).outerHeight();this.parent.height($(this.parent).outerHeight()+t)}scrollUpdate(){console.log("scrolling...."),window.scrollTo(0,this.scroll)}}