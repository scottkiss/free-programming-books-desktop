"use strict";


var nodegrass = require('nodegrass');

var cheerio = require('cheerio');

var fs = require('fs'); 

let updateTool = {

  Azerbaijan_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-az.md',
  Bulgarian_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-bg.md',
  Chinese_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-zh.md',
  Czech_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-cs.md',
  English_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books.md',
  French_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-fr.md',
  German_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-de.md',
  Greek_doc:'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-gr.md',
  Hungarian_doc:'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-hu.md',
  Indonesian_doc:'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-id.md',
  Italian_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-it.md',
  Japanese_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-ja.md',
  Korean_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-ko.md',
  Persian_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-fa_IR.md',
  Polish_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-pl.md',
  Brazil_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-pt_BR.md',
  Portugal_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-pt_PT.md',
  Romania_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-ro.md',
  Russian_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-ru.md',
  Slovak_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-sk.md',
  Spanish_doc:'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-es.md',
  Swedish_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-se.md',
  Turkish_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-tr.md',
  Ukrainian_doc : 'https://github.com/vhf/free-programming-books/blob/master/free-programming-books-ua.md'

};
updateTool.syncData = (language_doc_url,file_name) => {
  var free_books_category = [];
  nodegrass.get(language_doc_url,function(data,status,headers){
    var dom = cheerio.load(data);
    dom('h3').each(function(i){
      var content = [];
      var cate = {
        "name" : dom(this).text(),
        "lan": file_name
      } 
      var cate_name = dom(this).text();
      var li = dom(this).next().find('li');
      li.each(function(){
        var text = dom(this).text();
        var src = dom(this).find('a').attr('href');
        content.push({
            'category':cate_name,
            'text':text,
            'src':src
        });
      });
      cate.content = content;
      free_books_category.push(cate);
    });
    var cateStr = JSON.stringify(free_books_category); 
    fs.writeFile(__dirname + '/data/'+file_name+'.js','var '+file_name+'_categories='+cateStr, function(err){  
      if(err)  
        console.log("fail " + err);  
      else  
        console.log("write file ok"); 
    });
  },null,'utf8').on('error', function(e) {
  console.log("Got error: " + e.message);
  });

  }

  module.exports=updateTool;
