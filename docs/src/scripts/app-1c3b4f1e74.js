!function(n){var i={};function o(e){if(i[e])return i[e].exports;var t=i[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=n,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,n){"use strict";var i,o,r=document.getElementById("myCanvas"),f=r.getContext("2d"),l=(r.width,r.height,r.width/2),c=r.height/2,a=10,d=10,h=100,u=0,s=r.height/2-50,g=r.height/2-50,m=r.width-d,p=!1,w=!1,y=5,v=0,x=0,C=!1;function k(){i=Math.random()<.5?6:-6,o=Math.random()<.5?-6:6}function P(e,t,n,i){f.beginPath(),f.rect(e,t,n,i),f.fillStyle="#fff",f.fill(),f.closePath()}window.addEventListener("resize",function(){document.location.reload()}),k(),document.addEventListener("keydown",function(e){38===e.keyCode?p=!0:40===e.keyCode&&(w=!0)}),document.addEventListener("keyup",function(e){38===e.keyCode?p=!1:40===e.keyCode&&(w=!1)}),document.addEventListener("mousemove",function(e){var t=e.clientX-r.offsetLeft,n=e.clientY;0<t&&t<r.width&&0+h/2<n&&n<r.height-h/2&&(s=n-h/2)}),r.addEventListener("click",function(e){C&&document.location.reload()}),function e(){if(f.clearRect(0,0,r.width,r.height),C)return f.font="16px Monospace",f.fillStyle="#fff",v===y?f.fillText("You won",280,200):f.fillText("Computer won",280,200),void f.fillText("Click anywhere in the canvas to restart",150,500);var t;f.beginPath(),f.arc(l,c,a,0,2*Math.PI),f.fillStyle="#fff",f.fill(),f.closePath(),P(u,s,d,h),P(m,g,d,h),(t=g+h/2)<c-20?g+=5:c+20<t&&(g-=5),f.font="16px Monospace",f.fillStyle="#fff",f.fillText("Your score: "+v,50,100),f.fillText("Computer score: "+x,r.width-225,100),l+i<a?s<c&&c<s+h&&l<a+d?i=-i:++x===y?C=!0:(l=r.width/2,c=r.height/2,k(),s=r.height/2-50):l+i>r.width-a&&(g<c&&c<g+h&&a+d<l?i=-i:++v===y?C=!0:(l=r.width/2,c=r.height/2,k(),s=r.height/2-50)),(c+o<a||c+o>r.height-a)&&(o=-o),w&&s<r.height-h?s+=4:p&&0<s&&(s-=4),l+=i,c+=o,requestAnimationFrame(e)}()}]);