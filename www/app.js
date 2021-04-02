
/************************fonction de creation de la base de donnee***************/


function CreerBase() {
  // body...
  var db = new Dexie("mes_clients");
db.version(1).stores({
  produit:"++id, nom,stock,image",
  clients:"++id,id_2,nom,prix,couleur,numero,dates,heure,quantite"

});
db.open().catch(function(e) {
  console.log("Open failed: " + e);
});
return db;
}

  CreerBase();






window.fn = {};

window.fn.toggleMenu = function () {
  document.getElementById('appSplitter').left.toggle();
};

window.fn.loadView = function (index) {
  document.getElementById('appTabbar').setActiveTab(index);
  document.getElementById('sidemenu').close();
};

window.fn.loadLink = function (url) {
  window.open(url, '_blank');
};

window.fn.pushPage = function (page, anim) {
  if (anim) {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
  } else {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } });
  }

};



/******   la fonction pour ouvrire les page */

function ouvrire(page) {

  fn.pushPage({'id': page, animation: "lift"});
  
}




//fonction de l'heure actuelle

function prendreDate() {
  // body...
  var date=new Date();

  var jour=date.getDate();
  if (jour==1 ||  jour==2 ||  jour==3 || jour==4 || jour==5 || jour==6 || jour==7 || jour==8 || jour==9) {
    var jours="0"+jour;
  }
  else{
    var jours=jour;
  }

  var moi=date.getMonth()+1;
  if (moi==1 ||  moi==2 ||  moi==3 || moi==4 || moi==5 || moi==6 || moi==7 || moi==8 || moi==9) {
    var mois="0"+moi;
  }
  else{
    var mois=moi;
  }

  var annee=date.getFullYear();

  var laDate=jours+"-"+mois+"-"+annee;
  return laDate;
}


// la fonction qui recuper l'heure
function prendreHeure() {
  // body...
  var date=new Date();
  var heure=date.getHours();
  var minute=date.getMinutes();
  var seconde=date.getSeconds();
  var lHeur=heure+"h"+minute+"min"+seconde+"s";
  return lHeur;
}





// la fonction d'ajout de produit

function ajout_produit() {
  var nom =document.getElementById('nom').value;
  var stock =document.getElementById('stock').value;
  var image =document.getElementById('image').value ; 

  if (nom=="" || image=="" ) {
    ons.notification.confirm(
      {
        title: '',
        message: 'Tous les champs sont obligatoires',
        buttonLabels: ['Ok']
      } );

  }


  else{

    document.querySelector('ons-modal').show();

  
     var taille=document.getElementById('image').files[0].size;
     
    if (taille<1000000) {
      var seconde=1000;
    }
    if (taille>1000000 && taille<2000000) {
      var seconde=2000;
    }
    if (taille>2000000) {
      var seconde=10000;
    }
 

    var nom_img=document.getElementById('image').files[0];

    var  reader=new FileReader();
   
    reader.onload=function (params) {
    //        reader.result;

    db=CreerBase();
    db.produit.add({
      nom: nom,stock: stock,image:reader.result
    });


    }

    reader.readAsDataURL(nom_img);
    
    setTimeout(() => {
      document.querySelector('ons-modal').hide();
  document.getElementById('appNavigator').popPage(); 
    document.getElementById("les_produit").innerHTML="";
    document.getElementById("info").innerHTML="";
   
      affichage();

     }, seconde);
   
  }




}



// fonction d'affichage des client pour chaque produits

function afficher_client(params,argument) {

  var arg="#"+argument; 
  var btn_choix= document.querySelectorAll('.list-item');

for(var j=0;j<btn_choix.length;j++){
  btn_choix[j].style.backgroundColor="white";
}
  
 document.querySelector(arg).style.backgroundColor="#E6E7E6";

  ouvrire('les_clients.html');
  traitement_client(params);
}

function traitement_client(params) {
 
 

 var  db=CreerBase();

db.clients.where("id_2").equals(params).count(function(count){
  document.getElementById('cache_produit').value=params;

  if (count==0) {
    document.getElementById('info_client').innerHTML="Vous n'avez pas de client";
    document.getElementById('nbr_client').innerHTML="Vous avez 0 client"
    document.getElementById('prix_total').innerHTML="Prix total : 0 Fcfa";
  }
  else{
    var nombre=0;
    var prix_total=0;
    document.getElementById('info_client').innerHTML="";
    var compteur_1=0;
    db.clients.where("id_2").equals(params).reverse().each(function(result) {
      nombre++;
      compteur_1++;
      var id_1="dive"+compteur_1;
      prix_total=prix_total+parseInt(result.prix);
         document.getElementById('client_prod').innerHTML+="<li class=\"list-item list-item--chevron \" id=\""+id_1+"\" onclick=\"detail("+result.id+",'"+id_1+"') \" ><div class=\"list-item__center\"><div class=\"list-item__title\" >"+result.nom+"</div> <div class=\"list-item__subtitle\">Prix : "+result.prix+" Fcfa</div> </div></li>  ";
        
         document.getElementById('prix_total').innerHTML="Prix total : "+prix_total+" Fcfa";

         if (nombre<2) {
          document.getElementById('nbr_client').innerHTML="Vous avez "+nombre +" client"
        }
        else{
          document.getElementById('nbr_client').innerHTML="Vous avez "+nombre +" clients"
    
        }
  
  
        });

    

   

  }   
 
})

}


// fonction enregistrement de client

function ajout_client() {
  var ident_2=document.getElementById('cache_produit').value;
  var nom_client=document.getElementById('nom_client').value;
  var quantite_client=document.getElementById('quantite_client').value;
  var prix_client=document.getElementById('prix_client').value;
  var couleur=document.getElementById('couleur').value;
  var numero=document.getElementById('numero').value;

  if (nom_client=="" || prix_client=="" ) {
    ons.notification.confirm(
      {
        title: '',
        message: 'Le nom et nyméro du client sont obligatoires',
        buttonLabels: ['Ok']
      } );
  }

  else{


    document.querySelector('ons-modal').show();

    var date_client=prendreDate();
    var heure_client=prendreHeure();

    db=CreerBase();

    db.clients.add({
      id_2: ident_2,nom: nom_client,prix:prix_client,
      couleur:couleur,numero:numero,dates:date_client  ,heure:heure_client,
      quantite:quantite_client
    });



    setTimeout(() => {
      document.querySelector('ons-modal').hide();
      document.getElementById('appNavigator').popPage(); 
      document.getElementById("client_prod").innerHTML="";
      traitement_client(ident_2);
      
    }, 1000);
    

  }

}





// la fonction detail

function detail(params,argument) {

  var arg_1="#"+argument; 
  var btn_choix_1= document.querySelectorAll('.list-item--chevron');

for(var j=0;j<btn_choix_1.length;j++){
  btn_choix_1[j].style.backgroundColor="white";
}
  
 document.querySelector(arg_1).style.backgroundColor="#E6E7E6";

  ouvrire("detail.html");
  trai_detail(params);
}

function trai_detail(params) {
  var db=CreerBase();
  db.clients.where("id").equals(params).each(function(result) {
 
   document.getElementById('nom_d').innerHTML=result.nom;
   document.getElementById('prix_d').innerHTML=result.prix+" Fcfa" ;
   document.getElementById('date_d').innerHTML=result.dates;
   document.getElementById('quantite_d').innerHTML=result.quantite;
   document.getElementById('heure_d').innerHTML=result.heure;  
   document.getElementById('cache_d').value=result.id;     
   
   if (result.couleur=="") {
    document.getElementById('couleur_d').innerHTML="Non définie";
   }
   else{
    document.getElementById('couleur_d').innerHTML=result.couleur;

   }

   if (result.numero=="") {
    document.getElementById('numero_d').innerHTML="Non définie";
   }
   else{
    document.getElementById('numero_d').innerHTML=result.numero;
 //  " <span> <img src=\"copy.png\" style=\"margin-left: 30%;\" onclick=\"copier() \"></span>" ;
    document.getElementById('input_copy').value=result.numero;
   }
});
}





function copier() {
 var text=document.getElementById('input_copy').value;  

 text.select();
 text.setSelectionRange(0,99999);
 document.execCommand("copy");
 console.log("copier")

}