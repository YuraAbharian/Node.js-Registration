

export const registerHandler=( Collection, name )=>  async (req, res) => {

        [name] =  [new Collection(await req.body)];

        try {
            const data = {
                name,
                message: "created!",
                statusCode: 0
            };

            await name.save();

            res.status(201).send(data);

        } catch (e) {

            const data = {message: e.message, statusCode: 1};

            res.status(400).send(data);

        }

};


export const getAllDatas =(Collection)=>   async (req, res) => {

    const data = await Collection.find();

    res.status(200).send(data)

};
