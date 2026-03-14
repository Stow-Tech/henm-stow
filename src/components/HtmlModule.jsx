import { useEffect, useRef } from "react";

export default function HtmlModule({ file }) {

const containerRef = useRef(null);

useEffect(() => {

const container = containerRef.current;

if(!container) return;

/* --------------------------------
RESET OLD MODULE COMPLETELY
-------------------------------- */

container.innerHTML = "";

/* --------------------------------
LOAD NEW MODULE
-------------------------------- */

fetch(file)
.then(res => res.text())
.then(html => {

container.innerHTML = html;

/* --------------------------------
EXECUTE SCRIPT TAGS
-------------------------------- */

const scripts = container.querySelectorAll("script");

scripts.forEach(oldScript => {

const newScript = document.createElement("script");

if(oldScript.src){
newScript.src = oldScript.src;
}else{
newScript.textContent = oldScript.textContent;
}

document.body.appendChild(newScript);
oldScript.remove();

});

});

return () => {

/* --------------------------------
CLEANUP WHEN MODULE CHANGES
-------------------------------- */

container.innerHTML = "";

};

}, [file]);

return <div ref={containerRef}></div>;

}