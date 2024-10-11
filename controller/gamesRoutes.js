const { get } = require("mongoose")

const addGames = async (req, res) =>{
    try{
        return res.status(200).json({
            success:true,
            message:`addGames Route works!!!!`
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`${req.method} failed, consult error >>>> ${error}`
        })
    }
}

const getOne = async (req , res)=>{
    const id = req.params.id;
    if(!id){
        return res.status(400).json({
            success:false,
            message:`${req.method} failed, ID not provided`
        })
    }
    try {
        return res.status(200).json({
            success:true,
            message:`Get id ${id} worked`
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`${req.method} failed, consult error >>> ${error}`
        })
    }
}
module.exports = {
    addGames,
    getOne
};