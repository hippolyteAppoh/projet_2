function modifier_1() {
  ouvrire("modifier_1.html");
  app.hideFromTemplate1()
  var valeur=  document.getElementById('cache_id').value;


  var  db=CreerBase();

  db.produit.where("id").equals(parseInt(valeur)).each(function(result) {
    document.getElementById('init_m').innerHTML=result.stock;
    document.getElementById('nom_m').value=result.nom;
    document.getElementById('id_base').value=valeur;

});

}



function modifier_produit() {
  var id_base=document.getElementById('id_base').value;
  var nom_m=document.getElementById('nom_m').value;
  var stock_m=document.getElementById('stock_m').value;
  var image_m =document.getElementById('image_m').value ; 
   
  if (nom_m=="") {
    ons.notification.confirm(
      {
        title: '',
        message: 'Le nom du produit est obligatoires',
        buttonLabels: ['Ok']
      } );
  }
  else{
    document.querySelector('ons-modal').show();
    if (image_m=="") {
      db=CreerBase();

    db.produit.update(parseInt(id_base) ,{
      nom:nom_m,stock:stock_m
       });  
       
    
       setTimeout(() => {
        document.querySelector('ons-modal').hide();
        document.getElementById('appNavigator').popPage(); 
        document.getElementById("les_produit").innerHTML="";
        document.getElementById("info").innerHTML="";
         affichage();
       }, 1000);

    }

    /******************************************************** */
    else{

      document.querySelector('ons-modal').show();

      var taille=document.getElementById('image_m').files[0].size;
    
     if (taille<1000000) {
       var seconde=1000;
     }
     if (taille>1000000 && taille<2000000) {
       var seconde=2000;
     }
     if (taille>2000000) {
       var seconde=10000;
     }

var nom_img=document.getElementById('image_m').files[0];
      var  reader=new FileReader();
     
      reader.onload=function (params) {
      //        reader.result;
  
      db=CreerBase();

      db.produit.update(parseInt(id_base) ,{
        nom:nom_m,stock:stock_m,image:reader.result
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



}



// modificayion des client

function modifier_client() {
  // body...
  ouvrire("modifier_2.html");

  app.hideFromTemplate();
     var valeur_client=document.getElementById('cache_d').value;
   

     var  db=CreerBase();

     db.clients.where("id").equals(parseInt(valeur_client)).each(function(result) {
       document.getElementById('nom_client_m').value=result.nom;
       document.getElementById('prix_client_m').value=result.prix;
       document.getElementById('quantite_client_m').value=result.quantite;
       document.getElementById('couleur_m').value=result.couleur;
       document.getElementById('numero_m').value=result.numero;

       document.getElementById('id_base_client').value=valeur_client;
   
   });


}






function modifier_client_m() {

  var id_base_client= document.getElementById('id_base_client').value;
  var nom_client_m= document.getElementById('nom_client_m').value;
 var quantite_client_m= document.getElementById('quantite_client_m').value;
    var prix_client_m= document.getElementById('prix_client_m').value;
    var couleur_m=document.getElementById('couleur_m').value;
    var numero_m= document.getElementById('numero_m').value;


    
  if (nom_client_m=="" || prix_client_m=="" ) {
    ons.notification.confirm(
      {
        title: '',
        message: 'Le nom et nyméro du client sont obligatoires',
        buttonLabels: ['Ok']
      } );
  }

  else{

   // var date_client=prendreDate();
   // var heure_client=prendreHeure();
   document.querySelector('ons-modal').show();
   db=CreerBase();



      db.clients.update(parseInt(id_base_client) ,{
     nom: nom_client_m,prix:prix_client_m,
      couleur:couleur_m,numero:numero_m,quantite:quantite_client_m
    });


    document.getElementById('appNavigator').popPage(); 

    setTimeout(() => {
      document.querySelector('ons-modal').hide();
      document.getElementById('client_prod').innerHTML="";
      trai_detail(parseInt(id_base_client));

      db.clients.where("id").equals(parseInt(id_base_client)).each(function(result) {
        traitement_client( result.id_2 );
      })
    
    }, 1000);
    

  }


}





//  la fonction de suppesson





function supprimer_2(params) {
  app.hideFromTemplate();
  var id_sup_1=document.getElementById('cache_d').value;
  ons.notification.confirm(
    {
      title: 'Etat',
      message: 'Voulez-vous supprimer ?',
      buttonLabels: ['Ok',"Annuler"]
    }
  ).then((response)=>{
    conf_sup_2(response,parseInt(id_sup_1));
  
  });
}




function conf_sup_2(arg,valeur) {
if (parseInt(arg)==0){


  db=CreerBase();

  



  setTimeout(() => {
    document.getElementById('appNavigator').popPage(); 
    document.getElementById('client_prod').innerHTML="";
    db.clients.where("id").equals(parseInt(valeur)).each(function(result) {
      var rec_id= result.id_2 ;
      traitement_client( rec_id );
    }) 
     
    db.clients.where("id").equals(parseInt(valeur)).delete();
  
  }, 1000);


}
}




//      la fonction de suppession des produits

function supprimer_1(params) {
  app.hideFromTemplate1();
  var id_sup_2=document.getElementById('cache_id').value;
  ons.notification.confirm(
    {
      title: 'Etat',
      message: 'Voulez-vous supprimer ?',
      buttonLabels: ['Ok',"Annuler"]
    }
  ).then((response)=>{
    conf_sup_1(response,parseInt(id_sup_2));
  
  });
}





function conf_sup_1(arg,valeur) {
  if (parseInt(arg)==0){

  
    db=CreerBase();
  
    
  
    db.clients.each(function(result) {
      if (result.id_2==valeur) {
        
        db=CreerBase();
        db.clients.where("id_2").equals(result.id_2).delete();
      }
     
 
    }) 
     
    db.produit.where("id").equals(parseInt(valeur)).delete();
  
    document.getElementById("les_produit").innerHTML="";
    document.getElementById("info").innerHTML="";
    setTimeout(() => {
     
      affichage();
    }, 100);

   
  
  
  }
  }
  