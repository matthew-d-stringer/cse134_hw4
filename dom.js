/* dom.js */

function init() {
    document.getElementById('p1').dataset.layer = 1;

    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advWalkBtn');
    element.addEventListener('click', function () {
        document.getElementById('walkOutput').textContent = "";
        advancedWalk(document.getElementsByTagName('html')[0], 0);
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advModifyBtn');
    element.addEventListener('click', function () {
        advancedModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('advAdd');
    element.addEventListener('click', function () {
        advancedAdd();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeDel');
    element.addEventListener('click', function () {
        safeDelete();
    });

    element = document.getElementById('delBySelectorBtn');
    element.addEventListener('click', function () {
        deleteBySelector();
    });

    element = document.getElementById('basicClone');
    element.addEventListener('click', function () {
        basicClone();
    });

    element = document.getElementById('advClone');
    element.addEventListener('click', function () {
        advancedClone();
    });
}

function walk() {
   let el;

   document.getElementById('walkOutput').textContent = "";

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);
}

function advancedWalk(element, layer) {
    let textArea = document.getElementById('walkOutput');
    if(!element)
        return;
    for(i = 0; i < layer; i++) 
        textArea.textContent += "  |"
    
    textArea.textContent += `--${element.nodeName}\n`;
    textArea.style.height = textArea.scrollHeight + "px";
    advancedWalk(element.firstChild, layer+1);
    advancedWalk(element.nextSibling, layer);
}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;
    
    let textArea = document.getElementById('walkOutput');

    textArea.textContent += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`;
    textArea.style.height = textArea.scrollHeight + "px";
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advancedModify() {
    let h1Tag = document.getElementsByTagName('h1')[0];
    h1Tag.innerText = "DOM Manipulation is Fun!";
    h1Tag.style.color = `var(--darkcolor${Math.floor(6*Math.random())+1})`;

    let pTag = document.getElementById('p1');
    pTag.classList.add('shmancy');
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function advancedAdd() {
    let type = document.getElementById('elSelect').value;
    let tag = document.getElementById('elTag').value;
    let content = document.getElementById('elContent').value;

    let dateStr = Date().toLocaleString();

    let node;
    switch(parseInt(type)) {
        case 1: 
            content = content ? content : `New Element ${dateStr}\n`;
            node = document.createElement(tag);
            node.appendChild(document.createTextNode(content));
            break;
        case 3:
            content = content ? content : `New Text Node ${dateStr}\n`;
            node = document.createTextNode(content);
            break;
        case 8: 
            content = content ? content : `New Comment ${dateStr}\n`;
            node = document.createComment(content);
            break;
        default:
            node = document.createTextNode("Invalid Type");
            break;
    }

    document.getElementById('addOutput').appendChild(node);
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeDelete() {
    let el2Del = document.body.lastChild;
    while(el2Del.previousSibling && el2Del.classList && el2Del.classList.contains("dontDel"))
        el2Del = el2Del.previousSibling;
    if(el2Del && (!el2Del.classList || (el2Del.classList && !el2Del.classList.contains("dontDel"))))
        document.body.removeChild(el2Del);
    else
        document.getElementById('safeDelOutput').innerText = "Removed as much as possible";
}

function deleteBySelector() {
    let selector = document.getElementById("delBySelector").value;
    let elements = document.querySelectorAll(selector);
    for(let elt of elements) {
        elt.parentNode.removeChild(elt);
    }
}

function basicClone() {
    let p1 = document.getElementById('p1')
    let output = document.getElementById('addOutput')

    p1.dataset.layer++;

    let newP = p1.cloneNode(true);
    newP.id = `p${p1.dataset.layer}`;
    
    output.appendChild(newP);
}

function advancedClone() {
    let listOfLinks = [
        "https://images.unsplash.com/photo-1690910550116-8e8b814cdd96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        "https://images.unsplash.com/photo-1690440850413-d73785c4ac7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        "https://images.unsplash.com/photo-1689686611078-a33b28e0a3a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    ];
    let template = document.getElementsByTagName('template')[0];
    template.dataset.layer++;

    let newCard = template.content.cloneNode(true);
    newCard.id = `template${template.dataset.layer}`;

    newCard.querySelector("h3").innerText += ` ${template.dataset.layer}`;
    newCard.querySelector("img").src = listOfLinks[Math.floor(listOfLinks.length*Math.random())];

    document.querySelector('#cloneOutput').appendChild(newCard);
}

window.addEventListener('DOMContentLoaded', init);