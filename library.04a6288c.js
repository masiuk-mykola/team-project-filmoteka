!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},i=e.parcelRequire62bd;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in n){var i=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,i.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequire62bd=i),i.register("cHsZg",(function(e,t){var n=i("UL92Z");i("9VC5X"),i("gLxPk"),i("euqRf"),i("7F1pg"),i("8a9Ol"),i("7znS4");var r=document.querySelector('button[data-action="watched"]'),a=document.querySelector('button[data-action="queue"]'),l=document.querySelector(".library__container"),s=document.querySelector(".film_list"),c=(0,n.loadLocalStorage)("queueKey"),o=(0,n.loadLocalStorage)("watchedKey");function d(e){if(null==e||0===e.length)return t='<h2 class="library-empty__title">\n          Your movie library to watch is empty\n        </h2>\n        <div class="library-empty__tumb">\n          <a href="./index.html" class="library-empty__btn">CHOOSE MOVIE</a>\n        </div>',l.insertAdjacentHTML("afterbegin",t),void console.log("Поставлена инфо что библиотека пустая");var t,n=e.map((function(e){var t=e.title,n="https://image.tmdb.org/t/p/w500".concat(e.poster_path),i=e.release_date.split("").slice(0,4).join(""),r=function(e){var t=e.map((function(e){return e.name}));if(0===t.length)return["Unknown"];t.length>=4&&t.splice(2,10,"Other");return t.join(", ")}(e.genres),a=e.id,l=e.vote_average;return'<li id="'.concat(a,'" class="film-list__item"><img src="').concat(n,'" alt="').concat(t,'" class="film-list__item-poster" loading="lazy">\n     <h3 class="film-list__item-title">').concat(t,'</h3>\n     <div class="film-list__item-details"><span class="film-list__item-genres">').concat(r,'</span>|<span class="film-list__item-year">').concat(i,'</span><span class="film-list__item-vote">').concat(l.toFixed(1),"</span></div>\n   </li>")})).join("");s.insertAdjacentHTML("beforeend",n)}r.addEventListener("click",(function(){r.classList.add("js-current"),a.classList.remove("js-current"),l.innerHTML="",s.innerHTML="",d(o)})),a.addEventListener("click",(function(){r.classList.remove("js-current"),a.classList.add("js-current"),l.innerHTML="",s.innerHTML="",d(c)})),a.classList.contains("js-current")?d(c):d(o)})),i("cHsZg")}();
//# sourceMappingURL=library.04a6288c.js.map
