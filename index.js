let myLeads = [];
const listEl = document.querySelector('#list-el')
const inputEl = document.querySelector('#input-el')
const inputBtn = document.querySelector('#input-btn');
const delBtn = document.querySelector('#del-btn');
const tabBtn = document.querySelector('#tab-btn');

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}
inputBtn.addEventListener('click', function(){
    inputEl.value.length > 0 ? myLeads.push(inputEl.value) : '';
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    renderLeads(myLeads);
    inputEl.value = '';
})

tabBtn.addEventListener('click', function(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        renderLeads(myLeads)
    })
})

function renderLeads(leads){
    let listitems = '';
    for(let i=0; i < leads.length; i++){
        listitems += 
        `<li>
            <a href="${leads[i]}" target="_blank">${leads[i]}</a>
        </li>`;
    }
    listEl.innerHTML = listitems;
}

delBtn.addEventListener('click', function(){
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
})
