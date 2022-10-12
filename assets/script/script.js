const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);
let numBox = cs('.numero');
let seuVotoVai = c('.d-1-1 span');
let a = 0;

const clicou = (num) =>{    
    let checkLoop = 0;
    let i = 0; 
    for(let n = 0; n <= numBox.length; n++){
        if(n < numBox.length){
            let checkText = numBox[n].textContent;
            i++     
            if(checkText == '' && checkLoop == 0){
                numBox[n].innerHTML = num;
                numBox[n].classList.remove("pisca");

                if(i < numBox.length){
                    numBox[i].classList.add("pisca");
                }            
                checkLoop = 1;                       
            } 
        }        
         

        if(n == numBox.length) {
            seuVotoVai.style.visibility = 'visible';
        }     
    }
}

const corrige = () =>{
    for(let n in numBox){
        numBox[n].innerHTML = '';
    }
    numBox[0].classList.add('pisca');
}