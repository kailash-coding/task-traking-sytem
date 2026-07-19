const STORAGE_KEY = 'simple-tasks-v1';

function $(id){return document.getElementById(id)}

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

const form = $('task-form');
const input = $('task-input');
const list = $('task-list');
const filter = $('filter');
const clearBtn = $('clear-completed');
const recipientInput = $('recipient-number');
const STORAGE_KEY = 'simple-tasks-v1';

function $(id){return document.getElementById(id)}

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

const form = $('task-form');
const input = $('task-input');
const list = $('task-list');
const filter = $('filter');
const clearBtn = $('clear-completed');

function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }

function render(){
  const f = filter.value;
  list.innerHTML = '';
  const shown = tasks.filter(t => f==='all' || (f==='active' && !t.completed) || (f==='completed' && t.completed));
  if(shown.length===0){ list.innerHTML = '<li style="color:#888;padding:12px">No tasks</li>'; return; }
  shown.forEach((t, i) => {
    const li = document.createElement('li'); li.className = 'task-item' + (t.completed? ' completed':'');
    const chk = document.createElement('input'); chk.type='checkbox'; chk.checked = !!t.completed;
    chk.onchange = () => { t.completed = chk.checked; save(); render(); };
    const span = document.createElement('span'); span.textContent = t.text; span.style.flex='1';
    const edit = document.createElement('button'); edit.textContent='✎'; edit.title='Edit'; edit.onclick = ()=>{
      const v = prompt('Edit task', t.text); if(v!=null && v.trim()){ t.text = v.trim(); save(); render(); }
    };
    const del = document.createElement('button'); del.textContent='✕'; del.title='Delete'; del.onclick = ()=>{ tasks = tasks.filter(x=>x!==t); save(); render(); };
    li.appendChild(chk); li.appendChild(span); li.appendChild(edit); li.appendChild(del);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const v = input.value.trim(); if(!v) return; tasks.push({id:Date.now(), text:v, completed:false}); input.value=''; save(); render();
});

filter.addEventListener('change', render);
clearBtn.addEventListener('click', ()=>{ tasks = tasks.filter(t=>!t.completed); save(); render(); });

render();
  }
}
