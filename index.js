const express = require('express');
const bodyParser = require('body-parser');
var createsend = require('createsend-node');
const hbs = require('hbs');



const app = express();
app.set('view engine','hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;



var auth = { apiKey: 'rRqs0ZRCR5SpvpBcEihc/MH9y3zI+htzXcOLnkWraOHM6c9qR6RL/jDpYepA73jmHvxxPD4H2E7ypjmjW4VGxWnRIq2V1ekMqWY5P52VHYvHZGcoNQV6SFsUdradTbGrFj9aJPSKt2pnK4S/WbEGiQ==' };
var api = new createsend(auth);
var listId = 'dabb329b9c92c5f5262377d0c5441659' // The ID of the list


app.post("/send-user", (req, res) => {
    var user = {
        EmailAddress: req.body.email,
        CustomFields: [
            { Key: 'asesoria', Value: 1 }
          ]
    };
    api.subscribers.addSubscriber(listId, user, (err, response) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log(response)
            console.log(user);
            res.render('sendResponse',{email:user.EmailAddress});
        }
    });

})

app.post("/thank-you",(req,res)=>{
    var user = {
        EmailAddress: req.body.email,
        CustomFields: [
            { Key: 'company', Value: req.body.company },
            { Key: 'phone', Value: req.body.phone },
            { Key: 'descripcionAsesoria', Value: req.body.descripcionAsesoria }
          ]
    };
    api.subscribers.addSubscriber(listId, user, (err, response) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log(response)
            console.log(user);
            res.render('thank-you');
        }
    });
})


app.listen(port, () => {
    console.log("Servidor inicilizado en ", port)
});