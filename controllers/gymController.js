//Gymcontroller

import gym from '../models/gymModel.js'

const addgym = async (req, res) => {
    try {
        console.log("fgf")
        const { name, description, tier, address, contact, facilities } = req.body
        const newGym = await gym.create({
            name: name,
            description: description,
            owner: req.user.id,
            tier: tier,
            address: address,
            contact: contact,
            facilities: facilities
        })
        res.status(201).json({ message: "gym added", newGym })
    } catch (err) {
        console.error(err); // Add logging
        return res.status(500).json({ message: "server error", error: err.message })
    }
}

const updategym = async (req, res) => {
    try {
        const GymId = req.params.id;
        const updateGym = await gym.findById(GymId);
        if (!updateGym) {
            return res.status(404).json({ message: "gym not found" })
        }
        if (updateGym.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const nestedUpdates = {};
        const allowedTopLevelFields = ["name", "description", "tier", "facilities"];
        allowedTopLevelFields.forEach(field => {
            if (req.body[field] !== undefined) {
                nestedUpdates[field] = req.body[field];
            }
        })
        const nestedMappings = {
            "contact.phone": req.body.contact?.phone,
            "contact.email": req.body.contact?.email,
            "contact.website": req.body.contact?.website,
            "address.street": req.body.address?.street,
            "address.city": req.body.address?.city,
            "address.state": req.body.address?.state,
            "address.postalCode": req.body.address?.postalCode,
            "address.country": req.body.address?.country,
        };
        for (const [path, value] of Object.entries(nestedMappings)) {
            if (value !== undefined) nestedUpdates[path] = value;
        }
        
        // FIX: Remove the extra object wrapper and add { new: true }
        const updatedGym = await gym.findByIdAndUpdate(GymId, nestedUpdates, { new: true })
        res.status(200).json({ message: "updated gym successfully", updatedGym })
    } catch (err) {
        console.error(err); // Add logging
        res.status(500).json({ message: "server error", error: err.message })
    }
}

const gymList = async(req, res) => {
    try {
        // Return gyms array directly, not wrapped in object
        const gyms = await gym.find({})
        
        res.status(200).json(gyms) // Changed this line
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error", error: err.message })
    }
}


const getGym = async(req, res) => {
    try {
        const gymId = req.params.id;
        if(!gymId){
            return res.status(404).json({ message: "gym does not exist" })
        }
        const gymFound = await gym.findById(gymId)
        res.status(200).json({ message: "Gym details", gymFound })
    } catch (err) {
        console.error(err); // Add logging
        res.status(500).json({ message: "server error", error: err.message })
    }
}


const myGyms = async (req, res) => {
    try {
        const gyms = await gym.find({ owner: req.user.id });

        res.status(200).json(gyms);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
};


export { addgym, updategym, gymList, getGym, myGyms }