
const {
    contacts,
    Pager,
    sortContacts,
    filterContacts,
    ContactModel
} = require("@jworkman-fs/asl");

function index(req,res){

    let results = [...contacts];



    if(req.get("X-Filter-By")) {

        results = filterContacts(
        req.get("X-Filter-By"),
        req.get("X-Filter-Operator"),
        req.get("X-Filter-Value"),
        results
);
        

    }


    if(req.query.sort) {

        results = sortContacts(
            results,
            req.query.sort,
            req.query.direction
        )

    }


    const pager = new Pager(
        results,
        req.query.page || 1,
        req.query.limit || 10
    )


    res.set("X-Page-Total", pager.total)
    res.set("X-Page-Next", pager.next())
    res.set("X-Page-Prev", pager.prev())


    res.json(
        pager.results()
    )
}

function create(req, res) {
    try {
        const contact = ContactModel.create(req.body);

        res
            .status(303)
            .location(`/v1/contacts/${contact.id}`)
            .end();

    } catch(e) {
        switch(e.name) {
            case "DuplicateContactResourceError":
                return res.status(400).json({message: e.message});

            case "InvalidContactSchemaError":
            case "InvalidContactFieldError":
                return res.status(400).json({message: e.message});

            default:
                return res.status(500).json(e);
        }
    }
}


function show(req, res) {
    try {
        const contact = ContactModel.show(req.params.id);

        res.json(contact);

    } catch(e) {
        switch(e.name) {
            case "ContactNotFoundError":
                return res.status(404).json({message: e.message});

            default:
                return res.status(500).json(e);
        }
    }
}


function update(req, res) {
    try {
        const contact = ContactModel.update(
            req.params.id,
            req.body
        );

        res
            .status(303)
            .location(`/v1/contacts/${contact.id}`)
            .end();

    } catch(e) {
        switch(e.name) {
            case "ContactNotFoundError":
                return res.status(404).json({message: e.message});

            case "InvalidContactSchemaError":
            case "InvalidContactFieldError":
                return res.status(400).json({message: e.message});

            default:
                return res.status(500).json(e);
        }
    }
}


function remove(req, res) {
    try {
        ContactModel.remove(req.params.id);

        res.status(204).end();

    } catch(e) {
        switch(e.name) {
            case "ContactNotFoundError":
                return res.status(404).json({message: e.message});

            default:
                return res.status(500).json(e);
        }
    }
}
 module.exports = {
    index,
    create,
    show,
    update,
    remove
};