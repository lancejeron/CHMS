var express = require('express');
var flog = require( './loggedin');
var router = express.Router();

      function numberWithCommas(x) {
          var parts = x.toString().split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return parts.join(".");
      }
      
      function fitem(req, res, next){
        var db = require('../../lib/database')();
        db.query("SELECT * FROM tbluser", function (err, results, fields) {
            if (err) return res.send(err);
            var page = 1, pagearr = [1], curpage = [req.params.page], prevpage = [req.params.page - 1], nextpage = [parseInt(req.params.page)+1], lastpage = [];
            if (!results[0])
              console.log('');
            else{
              for(count=0;count<results.length;count++){
                // results[count].date= results[count].datPostDate.toDateString("en-US").slice(4, 15);
                // results[count].price = numberWithCommas(results[count].fltItemPrice.toFixed(2));
                results[count].page = page;
                results[count].curpage = req.params.page;
                if((count+1)%5==0){
                  page+=1;
                }
              }
              lastpage[0] = results[results.length-1].page;
            }
            if(req.params.page > 5){
              pagearr[0] = req.params.page - 5;
            }
            for(count=1;count<10;count++){
              pagearr[count] = pagearr[count-1] + 1;
            }
            req.lastpage = lastpage;
            req.curpage = curpage;
            req.prevpage = prevpage;
            req.nextpage = nextpage;
            req.page = pagearr;
            req.others = results;
            return next();
        });
      }


      
      function render(req,res){
          if(req.valid==3){
          res.render('login/views/invalidpages/banned');
        }
        else if(req.valid==1){
          if(!req.others[0]){
            if(req.params.page == 1)
              res.render('home/views/noposts', { usertab: req.user});
            else
              res.render('login/views/noroute');
          }
          else if
          (req.params.page < 1 || req.params.page > req.lastpage[0])
            res.render('login/views/noroute');
          else
            res.render('home/views/index', { usertab: req.user, otherstab: req.others, pagetab: req.page, curpagetab: req.curpage, prevpagetab: req.prevpage, nextpagetab: req.nextpage, lastpagetab: req.lastpage});
            
        }
        else if(req.valid==2)
          res.render('home/views/invalidpages/adminonly');
        else
          res.render('login/views/invalid');
      }
      router.get('/page/:page', flog, fitem, render);
      
      router.get('/help', flog, (req, res) => {
        if(req.valid==3){
      res.render('login/views/invalidpages/banned');
    }
    else if(req.valid==1)
      res.render('home/views/help');
      else if(req.valid==2)
      res.render('home/views/invalidpages/adminonly');
      else
    res.render('login/views/invalid');
});
router.get('/rules', flog, (req, res) => {
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
    }
    else if(req.valid==1)
      res.render('home/views/rules');
      else if(req.valid==2)
      res.render('home/views/invalidpages/adminonly');
      else
      res.render('login/views/invalid');
    });
    exports.home= router;

                                                        

                                  // function render(req,res){
                                  //   if(req.valid==1){
                                  //     res.render('home/views/index');
                                  //   }
                                  //   else if(req.valid==3){
                                  //       res.render('login/views/invalidpages/banned');
                                  //   }
                                  // }