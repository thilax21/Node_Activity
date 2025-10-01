import express from "express";
import fs from "fs"
const app = express()

app.use(express.json());



app.get("/books", (req, res) => {
    console.log("get student list")
    res.setHeader("content-type", "application/json");
    const data=fs.readFileSync('book.json',{encoding:"utf8" , falg:"r"});
   const responseData =JSON.parse(data);
    res.json(responseData);

});

app.get("/books/:id",(req,res)=>{
    const id= parseInt(req.params.id);
    console.log(`get book with id : ${id}`);

    const data=fs.readFileSync('book.json',{encoding:"utf8" , falg:"r"});
    const responseData =JSON.parse(data);

    const filterData= responseData.filter((item)=>{
        if (item.id === id){
            return item
        }
    })
    res.json(filterData);
});

app.post("/books",(req,res)=>{
    const reqbody=req.body
    console.log(reqbody)

    const data=fs.readFileSync('book.json',{encoding:"utf8" , falg:"r"});
    const responseData =JSON.parse(data);

    responseData.push(reqbody)
    fs.writeFileSync("book.json",JSON.stringify(responseData));
    res.send(reqbody)

})


app.put("/books/:id",(req,res)=>{
    const reqId= parseInt(req.params.id);
    const reqbody=req.body

    const data=fs.readFileSync('book.json',{encoding:"utf8" , falg:"r"});
    const responseData =JSON.parse(data);

    let filterData= responseData.filter((item)=>{
        if (item.id === reqId){
            return item
        }
    })

    filterData={...filterData[0], ...reqbody};

    const index= responseData.findIndex((item) => item.id === reqId);
    responseData[index]=filterData;


    fs.writeFileSync("book.json",JSON.stringify(responseData));
    res.send(reqbody)

})

app.delete("/books/:id",(req,res)=>{
    const id= parseInt(req.params.id);

    const data=fs.readFileSync('book.json',);
    const responseData =JSON.parse(data);

    const index= responseData.findIndex((item) => item.id === id);
    responseData.splice(index,1);

    fs.writeFileSync("book.json",JSON.stringify(responseData));

    res.send({
        message:"Book Deleted"
    })
})

app.listen(3000, () => {
    console.log('server running at http://localhost:3000/');
}
);