window.onload = function () { 

    var t = new Array();
    var ob = new Array();
    var ae = new Array();
    var hb = "rgba(255,30,30,0.1)";
    var tf = 100;
   
    media = document.querySelectorAll('[data-tlid="media"]')[0];    
    media.addEventListener("timeupdate", function(){ tlProc(); });    
   
    hl = document.querySelectorAll('[data-tl]');
    //iterate over element with @data-tl
    for (i=0; i<hl.length; i++) {
       hlArr = hl[i].dataset.tl.split('-');
       start = hlArr[0] * tf;
       end = hlArr[1] * tf;
       
       //test consistency of @data-tl's
       if(!(start!=null) || !(end!=null) || (start > end)){ alert('error in timelight&quot;s @tl: inconsistent values.'); }
       
       //set unique ID for current element
       thisID = 'e'+i;
       hl[i].dataset.tlid = thisID;
       
       //add original background-color to origBackground
       ob[thisID] = (hl[i].style.backgroundColor!='' ? hl[i].style.backgroundColor : 'transparent');
       
       //add times to array
       for(j=start; j<=end; j++){
           if(!t[j]){ t[j] = new Array(); }
           t[j].push(thisID);
       }       
    }
    
    function tlProc(){
        
        //fetch array from currentTime's position in times - t[], i.e. the IDs to be highlighted now 
        ids = new Array();
        if(t[Math.floor(media.currentTime * tf)]!=null){
            ids = t[Math.floor(media.currentTime * tf)];
        }
     
        // first remove and dehighlight old IDs from ae (activeEvents)
        aecount = ae.length; //has to remain constant value
        //iterate all active elements
        for (var i=0; i<aecount; i++) {
            //if they are not active anymore
            if(ids.indexOf(ae[aecount - i - 1]) < 0){
                document.querySelectorAll('[data-tlid="'+ae[aecount - i - 1]+'"]')[0].style.backgroundColor = ob[ae[aecount - i - 1]];
                ae.splice(aecount - i - 1, 1);
            }
        }
        
        // then push and highlight new IDs
        for (var i = 0; i < ids.length; i++) {
            if(!ae.indexOf(ids[i]) >= 0){
                document.querySelectorAll('[data-tlid="'+ids[i]+'"]')[0].style.backgroundColor = hb;
                ae.push(ids[i]);
            }
        }
        
     }
    
}