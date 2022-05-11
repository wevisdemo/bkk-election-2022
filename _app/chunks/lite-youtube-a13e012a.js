class i extends HTMLElement{constructor(){super();this.isIframeLoaded=!1,this.setupDom()}static get observedAttributes(){return["videoid","playlistid"]}connectedCallback(){this.addEventListener("pointerover",i.warmConnections,{once:!0}),this.addEventListener("click",()=>this.addIframe())}get videoId(){return encodeURIComponent(this.getAttribute("videoid")||"")}set videoId(t){this.setAttribute("videoid",t)}get playlistId(){return encodeURIComponent(this.getAttribute("playlistid")||"")}set playlistId(t){this.setAttribute("playlistid",t)}get videoTitle(){return this.getAttribute("videotitle")||"Video"}set videoTitle(t){this.setAttribute("videotitle",t)}get videoPlay(){return this.getAttribute("videoPlay")||"Play"}set videoPlay(t){this.setAttribute("videoPlay",t)}get videoStartAt(){return Number(this.getAttribute("videoStartAt")||"0")}set videoStartAt(t){this.setAttribute("videoStartAt",String(t))}get autoLoad(){return this.hasAttribute("autoload")}get noCookie(){return this.hasAttribute("nocookie")}get posterQuality(){return this.getAttribute("posterquality")||"hqdefault"}get posterLoading(){return this.getAttribute("posterloading")||"lazy"}get params(){return`start=${this.videoStartAt}&${this.getAttribute("params")}`}setupDom(){const t=this.attachShadow({mode:"open"});t.innerHTML=`
      <style>
        :host {
          contain: content;
          display: block;
          position: relative;
          width: 100%;
          padding-bottom: calc(100% / (16 / 9));
          --lyt-animation: all 0.2s cubic-bezier(0, 0, 0.2, 1);
          --lyt-play-btn-default: #212121;
          --lyt-play-btn-hover: #f00;
        }

        #frame, #fallbackPlaceholder, iframe {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
        }

        #frame {
          cursor: pointer;
        }

        #fallbackPlaceholder {
          object-fit: cover;
        }

        #frame::before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          background-image: linear-gradient(180deg, #111 -20%, transparent 90%);
          height: 60px;
          width: 100%;
          transition: var(--lyt-animation);
          z-index: 1;
        }

        #playButton {
          width: 70px;
          height: 46px;
          background-color: var(--lyt-play-btn-hover);
          z-index: 1;
          opacity: 0.8;
          border-radius: 14%;
          transition: var(--lyt-animation);
          border: 0;
        }

        #frame:hover > #playButton {
          background-color: var(--lyt-play-btn-hover);
          opacity: 1;
        }

        #playButton:before {
          content: '';
          border-style: solid;
          border-width: 11px 0 11px 19px;
          border-color: transparent transparent transparent #fff;
        }

        #playButton,
        #playButton:before {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }

        /* Post-click styles */
        .activated {
          cursor: unset;
        }

        #frame.activated::before,
        #frame.activated > #playButton {
          display: none;
        }
      </style>
      <div id="frame">
        <picture>
          <source id="webpPlaceholder" type="image/webp">
          <source id="jpegPlaceholder" type="image/jpeg">
          <img id="fallbackPlaceholder" referrerpolicy="origin">
        </picture>
        <button id="playButton"></button>
      </div>
    `,this.domRefFrame=t.querySelector("#frame"),this.domRefImg={fallback:t.querySelector("#fallbackPlaceholder"),webp:t.querySelector("#webpPlaceholder"),jpeg:t.querySelector("#jpegPlaceholder")},this.domRefPlayButton=t.querySelector("#playButton")}setupComponent(){this.initImagePlaceholder(),this.domRefPlayButton.setAttribute("aria-label",`${this.videoPlay}: ${this.videoTitle}`),this.setAttribute("title",`${this.videoPlay}: ${this.videoTitle}`),this.autoLoad&&this.initIntersectionObserver()}attributeChangedCallback(t,r,o){switch(t){case"videoid":case"playlistid":{r!==o&&(this.setupComponent(),this.domRefFrame.classList.contains("activated")&&(this.domRefFrame.classList.remove("activated"),this.shadowRoot.querySelector("iframe").remove(),this.isIframeLoaded=!1));break}}}addIframe(t=!1){if(!this.isIframeLoaded){const r=t?0:1,o=this.noCookie?"-nocookie":"";let e;this.playlistId?e=`?listType=playlist&list=${this.playlistId}&`:e=`${this.videoId}?`;const a=`
<iframe frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
  src="https://www.youtube${o}.com/embed/${e}autoplay=${r}&${this.params}"
></iframe>`;this.domRefFrame.insertAdjacentHTML("beforeend",a),this.domRefFrame.classList.add("activated"),this.isIframeLoaded=!0,this.dispatchEvent(new CustomEvent("liteYoutubeIframeLoaded",{detail:{videoId:this.videoId},bubbles:!0,cancelable:!0}))}}initImagePlaceholder(){var o,e;i.addPrefetch("preconnect","https://i.ytimg.com/");const t=`https://i.ytimg.com/vi_webp/${this.videoId}/${this.posterQuality}.webp`,r=`https://i.ytimg.com/vi/${this.videoId}/${this.posterQuality}.jpg`;this.domRefImg.fallback.loading=this.posterLoading,this.domRefImg.webp.srcset=t,this.domRefImg.jpeg.srcset=r,this.domRefImg.fallback.src=r,this.domRefImg.fallback.setAttribute("aria-label",`${this.videoPlay}: ${this.videoTitle}`),(e=(o=this.domRefImg)==null?void 0:o.fallback)==null||e.setAttribute("alt",`${this.videoPlay}: ${this.videoTitle}`)}initIntersectionObserver(){const t={root:null,rootMargin:"0px",threshold:0};new IntersectionObserver((o,e)=>{o.forEach(a=>{a.isIntersecting&&!this.isIframeLoaded&&(i.warmConnections(),this.addIframe(!0),e.unobserve(this))})},t).observe(this)}static addPrefetch(t,r,o){const e=document.createElement("link");e.rel=t,e.href=r,o&&(e.as=o),e.crossOrigin="true",document.head.append(e)}static warmConnections(){i.isPreconnected||(i.addPrefetch("preconnect","https://s.ytimg.com"),i.addPrefetch("preconnect","https://www.youtube.com"),i.addPrefetch("preconnect","https://www.google.com"),i.addPrefetch("preconnect","https://googleads.g.doubleclick.net"),i.addPrefetch("preconnect","https://static.doubleclick.net"),i.isPreconnected=!0)}}i.isPreconnected=!1;customElements.define("lite-youtube",i);export{i as LiteYTEmbed};
