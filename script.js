function cart(){
  let c=document.querySelector(".cart-container");
  c.style.right="0";
}

document.querySelector(".close").addEventListener("click",()=>{
  let c=document.querySelector(".cart-container");
  c.style.right="-100%";
})


document.addEventListener('DOMContentLoaded',loadXContent);
function loadXContent(){
  loadContent();
}


function loadContent(){
  let del=document.querySelectorAll(".delete");
  del.forEach((btn)=>{
    btn.addEventListener("click",removeItem);
  })

  let inputs=document.querySelectorAll(".inp");
  inputs.forEach((i)=>{
    i.addEventListener("change",uchiha)
  })

  let addCart=document.querySelectorAll(".cart-icons");
  addCart.forEach((add)=>{
    add.addEventListener("click",add_cart);
  })

  update();

}



  
  function removeItem(){
    if(confirm("Are you sure want to delete product")){
      let titles=this.parentElement.querySelector(".food-title").innerHTML;
      item_list=item_list.filter(el=>el.food_name!=titles);
      this.parentElement.remove();
    }
    loadContent();
    let empty=document.querySelector(".empty");
  if(item_list==0){
    empty.style.display="block"
  }
  else{
    empty.style.display="none"
  }
  }
  
  
  
  function uchiha(){
    if(isNaN(this.value) || this.value<1){
      this.value=1;
    }
    loadContent();
  }
  

  let item_list=[];

  
  function add_cart(){
    let food=this.parentElement;
    let food_name=food.querySelector(".food-name").innerHTML;
    let food_price=food.querySelector(".food-price").innerHTML;
    let food_img=food.querySelector(".f-img").src;
    
    let temp={food_name,food_price,food_img};

    if(item_list.find((el)=>el.food_name==temp.food_name)){
      alert("Product alreday added in cart!");
      return;
    }
    else{
      item_list.push(temp);
    }


    let newbasket=create(food_name,food_price,food_img);
    let element=document.createElement('div');
    element.innerHTML=newbasket;
  
    let shopcontent=document.querySelector(".shop-basket");
    shopcontent.append(element);
    
    let empty=document.querySelector(".empty");
    empty.style.display="none";

    loadContent();
  }
  
  function create(food_name,food_price,food_img){
    return `
  <div class="grid-con">
    <div class="food-image-con">
      <div>
        <img src="${food_img}" alt="">
      </div>
    </div>
    <div class="details">
      <h2 class="food-title">${food_name}</h2>
      <div class="fl">
        <div class="cart-price">${food_price}</div>
        <div class="cart-price1">${food_price}</div>
      </div>
      <input type="number" value="1" class="inp">
    </div>
      <ion-icon name="trash" class="delete"></ion-icon>
  </div>
    `;
  }  

function update(){
  let cart=document.querySelectorAll(".grid-con");
    let finalprice=document.querySelector('.final-price');
    let total=0;
    
    cart.forEach(products=>{
      let ele=products.querySelector(".cart-price");
      let price=parseFloat(ele.innerHTML.replace("Rs.",""));
      let qty=products.querySelector(".inp").value;
      products.querySelector(".cart-price1").innerText="Rs."+(price*qty);
      total+=(price*qty);
    });
    finalprice.innerHTML="Total Rs."+total;

    let place=document.querySelector(".place");
    let count=document.querySelector(".cart-count");
  
    if(item_list.length==0){
      count.style.display="none"
      finalprice.style.display="none"
      place.style.display="none"
    }
    else{
      finalprice.style.display="block"
      count.style.display="block"
      place.style.display="block"
      count.innerHTML=item_list.length;
    }
 
  }

  let place=document.querySelector(".place");
  place.addEventListener("click",()=>{
    alert("Order Placed Successfully")
      confetti({
        particleCount:500,
        spread:100,
        origin:{y: .6}
      })
  })

  




