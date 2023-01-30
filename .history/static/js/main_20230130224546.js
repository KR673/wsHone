var pageData = {
    data:{},
    dataCount:0,
    fault : {},
    countMapToId : {},
    dataError : {},
}

class DataErr{

    constructor(data){
        this.dateTime = new Date();
        this.data = data;
        this.count = data?.length;
    }
    
    // save data to local
    save(){
        if(!this.data || this.data.length <= 0){
            return
        }

        var dataList = this.getAll()

        // limit maximum capacity
        if(dataList.length == 15){
            dataList.splice(0, 1)        
        }

        dataList.push(this)
        localStorage['errorList'] = JSON.stringify(dataList)
        randerHistoryList()
    }
    
    // get the wrong data before
    getAll(){
        var dataList = localStorage['errorList']
        if(!dataList){
            dataList = new Array()
        }else{
            dataList = JSON.parse(dataList)
        }
        return dataList
    }
    
    getByIndex(index){
        var dataAll = this.getAll() 
        if(dataAll && dataAll.length > 0){
            return dataAll[index]
        }else{
            return new Array()
        }
    }
    
    deleteByIndex(index){
        var dataAll = this.getAll() 
        if(dataAll && dataAll.length > 0){
            dataAll.splice(index, 1)
            localStorage['errorList'] = JSON.stringify(dataAll)
            randerHistoryList()
        }
    }
}

init(frequentlyWord)

function init(dataAccept){

    var allData = dataAccept || dataSource
    var arr = new Array()

    $.each(allData, function(index, n){
        arr.push(n)
    })

    pageData.data = arr
    pageData.dataCount = pageData.data.length
    
    pageData.fault = {
        'one-key' : [],
        'two-key' : [],
        'three-key' : [],
        'four-key' : []
    }

    var countMapToId = pageData.countMapToId = new Map()
    countMapToId.set(1, 'one-key')
    countMapToId.set(2, 'two-key')
    countMapToId.set(3, 'three-key')
    countMapToId.set(4, 'four-key')

    pageData.dataError = new Array()
    wordInput()
    randerHistoryList()    
    initFaultConut()
    initInput()
    processEdit(0)
}

function randerHistoryList(){
    var dataErr= new DataErr()
    var typeHistoryList = dataErr.getAll()
    if(typeHistoryList){
        var tableHtml = '<tr>'+
                            '<th style="width:50px">序号</th>'+
                            '<th style="width:100px">数量</th>'+
                            '<th style="width:300px">日期</th>'+
                            '<th></th>'+
                            '<th style="width:150px">操作</th>'+
                        '</tr>'
        $.each(typeHistoryList, function (index , n){  
            tableHtml += "<tr>"
            tableHtml += '<td>' + index + '</td>'
            tableHtml += '<td>' + n.count + '</td>'
            tableHtml += '<td>' + n.dateTime+ '</td>'
            tableHtml += '<td></td>'
            tableHtml += '<td class="history-option button-container">' +
                            '<button class="history-load" onclick=historyLoad('+index+')>练习</button>'+
                            '<button class="history-del" onclick=historyDelete('+index+')>删除</button>'+
                        '</td>'
            tableHtml += '</tr>'
        })
        $('.history-table').empty();
        $('.history-table').append(tableHtml)
    }
}

function historyLoad(index){
    var dataErr= new DataErr()
    var dataAll = dataErr.getAll()
    var dataTarget = dataAll[index]
    init(dataTarget.data)
}
function historyDelete(index){
    var dataErr= new DataErr()
    var dataAll = dataErr.deleteByIndex(index)
}
function wordInput() {
    var $word = $('#word')
    var indexPre = $word.attr('data-index')
    var count = pageData.data.length
    var index = Math.floor(Math.random() * count)

    // 保证相邻的两个不同
    if(indexPre == index){
        index = index < (count - 1) ? index + 1 : index - 1
    }
    if(count <= 1){
        index = 0
    }

    var wordInfo = pageData.data[index]
    // data.splice(index, 1)
    $word.text(wordInfo.word)
    $('#key').text(wordInfo.key)
    $word.attr('data-key', wordInfo.key)
    $word.attr('data-index', index)
    $('#input').val('')
}

$('body').on('keydown', function(event){
    if(event.keyCode == 27){
        $('#input').val("")
        $('#input').focus()
        return;
    }
})
var $word = $('#word')
$('#input').on('keydown', function (event) {
    var keyValue = event.keyCode

    var determain_num =  (keyValue >= 49 && keyValue <= 57)
    var determain_symbol = (keyValue == 186 || keyValue == 222)
    var determain_space = (keyValue == 32)

    if(keyValue == 27){
        $('#input').val("")
        return;
    }
    if(determain_num || determain_symbol || determain_space){

        if(pageData.data.length == 0){
            return;
        }

        if($(this).val() == $('#word').attr('data-key')){
            inputRight()
            if(pageData.data.length == 0){
                return;
            }
            wordInput()
        }else{
            inputFault()
            $(this).val('')
        }
        return false;
    }else{
        return;
    }
});

$('#fault-save').on('click', function(){
    faultSave()
})

$('#source-change').on('click', function(this) {
    switch ($(this).val()) {
        case 'hanziRoot':
            init(hanZiRoot)
            break;
        default:
            init(frequentlyWord)
            break;
    }
})