let data=[];
const todoList = document.querySelector('.todoList');

//初始化功能
function init(){   
    data = JSON.parse(localStorage.getItem('todoList') || '[]');
    // todoList.forEach(function(list, i){
    // });
    
    let str = "";
    data.forEach(function(item,index){
        str += renderListItem(item,index);
    });
    todoList.innerHTML = str;
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    let count=0;
    checkboxes.forEach(function(item, index){
        item.addEventListener("click",function(e){
            const i = this.getAttribute('data-num');
            data[i].checked = this.checked;
            localStorage.setItem('todoList', JSON.stringify(data));
            init();
        });
        if(!item.checked){
            count++;
        }
    })
    const num = document.querySelector('.num');
    num.textContent=`${count} 個待完成項目`

}

function renderListItem(item,index){
    
    return `<li class="${(item.checked ? 'checked' : '' )}">
    <div class="form-check">
    <input ${(item.checked ? 'checked' : '' )} data-num="${index}" class="form-check-input" type="checkbox" value="" id="todo${index}">
    <label class="form-check-label" for="todo${index}">
        ${item.content}
    </label>
    </div>
    <a href="#" class="delete" data-num="${index}"></a>
    </li>`
}


const txt = document.querySelector('.form-control');
const save = document.querySelector('.btn');
//新增邏輯
save.addEventListener('click',function(e){
    if (txt.value==''){
        alert('請輸入內容');
        return;
    }
    let obj={};
    obj.content=txt.value;
    data.push(obj);
    txt.value='';
    localStorage.setItem('todoList', JSON.stringify(data));
    init();
})

//刪除邏輯
todoList.addEventListener('click',function(e){
    if(e.target.getAttribute('class')!=='delete'){
        return;
    }
    let num=e.target.getAttribute('data-num');
    data.splice(num,1);
    localStorage.setItem('todoList', JSON.stringify(data));
    init();
});

init();


//篩選邏輯
const filter = document.querySelector(".nav");
filter.addEventListener("click",function(e){
    if (e.target.id == "all-tab"){
        todoList.className='todoList'
    }else if (e.target.id == "unfinished-tab"){
        todoList.className='todoList uncheckedUl';
    }
    else{
        todoList.className='todoList checkedUl';
    }
});

//清除邏輯
const clear = document.querySelector(".clear");

clear.addEventListener('click',function(e){
    let update=[];
    data.forEach(function(item){
        if(item.checked ==false || item.checked == undefined){
            update.push(item);
        }
    })
    data=update;
    localStorage.setItem('todoList', JSON.stringify(data));
    init();
});
