const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
let containerNumbox = c('.d-1-3');
let goesTo = c('.d-1-1 span');
let containerInfo = c('.d-1-4');
let footerInfo = c('.d-2')
let listaNum = []
let numTot;
let fase = 0;
let candidatos = etapas[fase].candidatos;
let boxImg = cs('.d-1-image')[0];
let boxImgSmall = cs('.d-1-image')[1];
let checkNumEmpty;

realizeFase()
let numBox = cs('.numero');

listcand()
function listcand() {
    boxTitle = c('.container-candidatos');

    for (let n in etapas) {
        boxTitle.innerHTML += `<div class="dep-estaduais dep">
            <div class="titulo">${etapas[n].titulo}</div>
            <div class="box-candidatos">                             
            </div>
        </div>`
    }
    boxList = document.querySelectorAll('.box-candidatos')
    for (let n in etapas) {
        for (let i in etapas[n].candidatos) {
            boxList[n].innerHTML += `<div class="box">
                <img src="${etapas[n].candidatos[i].fotos[0].url}" alt="">
                <h3>${etapas[n].candidatos[i].nome}</h3>
                <h4>Nº ${etapas[n].candidatos[i].numero}</h4>
                </div>`
        }
    }
}



function realizeFase() {
    let numBoxverify = cs('.numero')
    let qntBoxadd = etapas[fase].numeros - numBoxverify.length;

    for (let n = 0; n < qntBoxadd; n++) {
        containerNumbox.innerHTML += '<div class="numero"></div>';
    }
    c('.d-1-2 span').innerHTML = etapas[fase].titulo;
}


const clicou = (num) => {
    let checkLoop = 0;
    let i = 0;
    checkNumEmpty = true;
    numBox = cs('.numero')
    for (let n = 0; n < numBox.length; n++) {
        let checkText = numBox[n].textContent;
        i++

        if (checkText == '' && checkLoop == 0) {
            numBox[n].innerHTML = num;
            listaNum[n] = num

            numBox[n].classList.remove("pisca");
            if (i < numBox.length) {
                numBox[i].classList.add("pisca");
            }

            checkLoop = 1;
        }
    }

    numTot = listaNum.join('');
    for (let n in numBox) {
        if (numBox[n].textContent == '') {
            checkNumEmpty = false
        }
    }

    if (checkNumEmpty) {
        let falseCad = true
        for (n in candidatos) {
            if (numTot == candidatos[n].numero) {
                containerInfo.style.visibility = 'visible';
                goesTo.style.visibility = 'visible';
                footerInfo.style.visibility = 'visible';
                falseCad = false
                boxImg.style.visibility = 'visible';

                containerInfo.innerHTML = `Nome: ${candidatos[n].nome}<br/>Partido: ${candidatos[n].partido}<br/>`
                boxImg.innerHTML = `<img src="${candidatos[n].fotos[0].url}" alt="" /> <span>${candidatos[n].fotos[0].legenda}</span>`;

                if (candidatos[n].fotos.length > 1) {
                    containerInfo.innerHTML += `Vice-Presidente: ${candidatos[n].vice}`
                    boxImgSmall.innerHTML = `<img src="${candidatos[n].fotos[1].url}" alt="" /> <span>${candidatos[n].fotos[1].legenda}</span>`;
                    boxImgSmall.style.visibility = 'visible';
                }
            }
        }

        if (falseCad) {
            containerInfo.style.visibility = 'visible';
            goesTo.style.visibility = 'visible';
            footerInfo.style.visibility = 'visible';
            containerInfo.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
        }
    }
}

const corrige = () => {
    for (let n in numBox) {
        numBox[n].innerHTML = '';
    }
    numBox[0].classList.add('pisca');
    containerInfo.style.visibility = 'hidden';
    goesTo.style.visibility = 'hidden';
    footerInfo.style.visibility = 'hidden';
    containerNumbox.style.visibility = 'visible';
    boxImg.style.visibility = 'hidden';
    boxImgSmall.style.visibility = 'hidden';
}

const branco = () => {
    containerInfo.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    containerInfo.style.visibility = 'visible';
    goesTo.style.visibility = 'visible';
    containerNumbox.style.visibility = 'visible';
    footerInfo.style.visibility = 'visible';
    containerNumbox.style.visibility = 'hidden';
    boxImg.style.visibility = 'hidden';
    boxImgSmall.style.visibility = 'hidden';
    checkNumEmpty = true
}

const confirma = () => {
    if (checkNumEmpty) {
        if (fase < etapas.length - 1) {
            fase++;
            listaNum = [];
            candidatos = etapas[fase].candidatos;
            numTot = 0;
            c('.d-1-3').innerHTML = '<div class="numero pisca"></div><div class="numero "></div>';
            containerInfo.style.visibility = 'hidden';
            goesTo.style.visibility = 'hidden';
            footerInfo.style.visibility = 'hidden';
            containerNumbox.style.visibility = 'visible';
            boxImg.style.visibility = 'hidden';
            boxImgSmall.style.visibility = 'hidden';
            realizeFase()
        } else {
            c('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
        }
    }
    checkNumEmpty = false
}

function openCandList() {
    c('.sec-cand-list').style.display = 'block';
}

function closeCandList() {
    c('.sec-cand-list').style.display = 'none';
}
function closeCandListEsc(e) {
    if(e.keyCode == 27){
        c('.sec-cand-list').style.display = 'none';
    }
}