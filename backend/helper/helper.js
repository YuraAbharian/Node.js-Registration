import sgMail from '@sendgrid/mail';
// register user/ participant / admin
export const registerHandler=( Collection, name )=>  async (req, res) => {
    const { email } = req.body;

    let newName = name;
        if(name==='admin' || name ==="user"){
                switch (email) {
                    case "superAdmin@test.com":{
                         req.body.isSuperAdmin = true;
                        break
                    }
                    default:{
                         req.body.isAdmin = true
                    }
                }
        }

        [newName] =  [new Collection(await req.body)];

        try {
            const data = {
                newName,
                message: "created!",
                statusCode: 0
            };

            await newName.save();

            res.status(201).send(data);

        } catch (e) {

            const data = {message: e.message, statusCode: 1};

            res.status(200).send(data);

        }

};

// get all data user/participant
export const getAllDatas =(Collection)=>   async (req, res) => {

    const data = await Collection.find();

    res.status(200).send(data)

};

// delete or restore user
export const deleteOrRestore =(Collection)=>async (req, res)=>{
    const { id, isDeleted } = req.body;
    try {
        const obj = await Collection.findByIdAndUpdate(id);
        obj.isDeleted = isDeleted;
        obj.save();
        res.status(200).send(obj)
    } catch (e) {
        res.status(200).send("Unable to delete")
    }

};


export const mailSender=async (key, obj) =>{

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: obj.Email,
        from: 'cook20091@gmail.com',
        // from: 'cook55@yandex.ru',
        subject: 'JAVASCRIPT FEST',
        text:  key === "Approve" ? `Dear ${obj.Username + ' ' +obj.Lastname} your ticket has been Approved. See you at conference! Best regards`: `Dear ${obj.Username + ' ' +obj.Lastname} sorry but we Decline your ticket.  Best regards`,
        // html:key === "Approve" ? '<strong>Welcome to the conference in Kiev</strong>' : '<strong>We hope to see you there next time</strong>',
    };

   // await sgMail.send(msg);
};
