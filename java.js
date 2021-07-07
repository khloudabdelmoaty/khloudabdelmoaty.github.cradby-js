                         
const nameinput = document.getElementById("one");
const email = document.getElementById("two");
const phone= document.getElementById("three");
const btn = document.getElementById("btnn");
const tbody = document.getElementById("tb")
const edit =document.getElementById("edit")

class Empolyy
{
constructor(id, name , email, phone)
{
    this.id=id;
    this.name=name;
    this.email=email;
    this.phone=phone;
}
showdata()
{
    
    const trelemnt = document.createElement("tr")
    trelemnt.innerHTML=`
    <tr>
    <td>${this.name}</td>
    <td>${this.email}</td>
    <td>${this.phone}</td>
    <td>
        <BUTTON ID="EDIT" class="edit">EDIT</BUTTON>
        <BUTTON ID="REMOVE" class="dd" >DELETE</BUTTON>
        </td>
       
</tr>
    
    `
    
    tbody.appendChild(trelemnt);
    return this;
}
storeempoly()
{
    const alldata = JSON.parse(localStorage.getItem("Empolyes") ) ?? [];
    alldata.push({id:this.id, name:this.name, email:this.email, phone:this.phone});
    localStorage.setItem("Empolyes" , JSON.stringify(alldata))
}
 update(id)
{
    const newitem ={id:id, name:this.name, email:this.email, phone:this.phone}
    const updatedata= JSON.parse(localStorage.getItem("Empolyes")).map((item)=>
    {
        if(item.id == id)
        {
        //   btn.style.color="red";
        //     alert("looooo")
return newitem;
        }
        return item;
        alert("MMMMMMMMMMMMMM")
    })
localStorage.setItem("Empolyes",JSON.stringify(updatedata));
}
static showhtml( name, email,phone, id)
{
    
    if(localStorage.getItem("Empolyes"))
    {
        JSON.parse(localStorage.getItem("Empolyes")).forEach(item => {
            const trelemnt = document.createElement("tr")
            trelemnt.innerHTML=`
            <tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>
                <BUTTON ID="EDIT" class="edit" data="${item.id}" >EDIT</BUTTON>
                <BUTTON ID="REMOVE" class="dd" data="${item.id}">DELETE</BUTTON>
                </td>
               
        </tr>
            
            `
            
            tbody.appendChild(trelemnt);
            
            
        });
    }
}
}
 Empolyy.showhtml()

btn.addEventListener("click" ,(e)=>{
    e.preventDefault();
    
    if(!edit.value)
    {
   let id = Math.floor(Math.random() * 1000000);
    const newemp =  new Empolyy(id,nameinput.value,email.value,phone.value )
    newemp.showdata().storeempoly()
   

    }else {
         let id = edit.value
    const newemp =  new Empolyy(id,nameinput.value,email.value,phone.value )
    newemp.update(id)
    tbody.innerHTML="";
    Empolyy.showhtml();
    
    }
 
nameinput.value=""
email.value=""
phone.value=""


} )


tbody.addEventListener("click", (e)=>
{
    if(e.target.classList.contains("dd"))
    {
        // alert("kkkkkkkkkkkk")
        //  remove from local storge
    let d = e.target.getAttribute("data")
    let emps = JSON.parse(localStorage.getItem("Empolyes"));

    let newData = emps.filter((item) => item.id != d);
    localStorage.setItem("Empolyes",JSON.stringify(newData));
        //  const d = e.target.getAttribute("data")
        //  console.log(d)
        e.target.parentElement.parentElement.remove();
    }

// console.log(e.target.contains)

    if(e.target.classList.contains("edit"))
    {
        //  alert("kkkkkkkkkkkk")
        //  remove from local storge
    let d = e.target.getAttribute("data")
    let item = JSON.parse(localStorage.getItem("Empolyes")).find(item => item.id == d)
    // console.log(item)
   
nameinput.value=item.name;
    email.value=item.email;
    phone.value=item.phone;
    edit.value=item.id;

    }
})
btn.addEventListener("DOUBLECLICK" , update(id))