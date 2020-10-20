const emailValidate = (email)=>{
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
}
let inputs = document.getElementsByClassName('form-input');

const cekKataKasar = async (sumber, KataKasar)=>{
    let len = KataKasar.length;
    let res;
    let hasilKataKasar = [];
    for (let i = 0; i < len; i++) {
        if(res = sumber.match(new RegExp(KataKasar[i]),'i')){
            hasilKataKasar.push(res[0]);
        }
    }

    return hasilKataKasar;
}
Array.from(inputs).forEach(function(input) {
    input.addEventListener('keyup', (e)=>{
        if (input.value !== '') {
            document.getElementById('invalid-'+input.name).style.display = "none";
        }else{
            document.getElementById('invalid-'+input.name).style.display = "block";
            document.getElementById('invalid-'+input.name).innerHTML = input.name +" ga boleh kosong";
        }
    });
    input.addEventListener('change', (e)=>{
        if (input.type === 'email' && !emailValidate(input.value) && input.value !== "" ) {
            document.getElementById('invalid-'+input.name).innerHTML = "Masukan format email yang benar";
            document.getElementById('invalid-'+input.name).style.display = "block";
        }
    });
});

const proses = async ()=>{
    let panjangInput = document.getElementsByClassName('form-input').length;
    let error = false;
    for (let i = 0; i < panjangInput; i++) {
        if(document.getElementsByClassName('form-input')[i].value == ''){
            let id = 'invalid-'+document.getElementsByClassName('form-input')[i].name;
            document.getElementById(id).style.display = "block";
            document.getElementById(id).innerHTML = document.getElementsByClassName('form-input')[i].name + " ga boleh kosong";
            error = true;
        }      
    }
    if(!error){
        let major =  document.getElementById('major').value;
        let name = document.getElementById('name').value;
        let komen = document.getElementById('komen').value;
        let email = document.getElementById('email').value.split('@');
        let username = email[0];
        let domain = email[1];
        const arrKataKasar = ['babi','anjing', 'goblok','berengsek','bajingan','asu','tai','idiot'];
        let hasilKataKasar = await cekKataKasar(komen,arrKataKasar);
        let arrKomen = komen.split(/\s+/);
        arrKomen.forEach((val)=>{
            if(val==""){
                arrKomen.splice(arrKomen.indexOf(val), 1);
                console.log(arrKomen);
            }
        });
        // console.log(arrKomen);
        document.getElementById('res-komen').innerHTML = komen;
        document.getElementById('text-length').innerHTML = arrKomen.length;
        document.getElementById('kata-kasar').innerHTML = hasilKataKasar.toString();
        document.getElementById('res-major').innerHTML = major;
        document.getElementById('res-name').innerHTML = name;
        document.getElementById('res-username').innerHTML = username;
        document.getElementById('res-domain').innerHTML = domain;
        if(hasilKataKasar.length>0){
            document.getElementById('kataKasar-wrapper').style.display= 'block';
        }else{
            document.getElementById('kataKasar-wrapper').style.display= 'none';
        }
        document.getElementById('res-wrapper').style.opacity= 1;
        document.getElementById('res-wrapper').style.zIndex= 999;


        document.getElementsByClassName('overlay')[0].style.opacity =1;
    }
}

const tutup=()=>{
    console.log('klik');
    document.getElementById('res-wrapper').style.opacity= 0;
    document.getElementById('res-wrapper').style.zIndex= -1;
    document.getElementsByClassName('overlay')[0].style.opacity =0;
    document.getElementsByClassName('overlay')[0].style.zIndex =-1;
}

const reset=()=>{
    document.getElementById("form").reset();
}