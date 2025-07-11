import FormData from "form-data";
import fs from "fs";
import axios from "axios";

export const cropQueryController = async (req,res)=>{
    const {state,district,crop_list} = req.body
    console.log(req.body)
    try {
        if(crop_list.length === 0){
            return res.status(400).json({message:"Crop list is required"})
        }
        const data ={"state":state,"district":district,"crop_list":crop_list}
        const resp = await fetch("http://localhost:8000/mandi_price",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const ans = await resp.json()
        console.log(ans)
        res.status(200).json({message:"Crop query successful",response:ans.llm_response})
    } catch (error) {
        console.log("Error in cropQueryController",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const diseaseQueryController = async (req,res)=>{
    const {prompt} = req.body
    const image = req.file

        try{
        if(!prompt || !image){
            return res.status(400).json({message:"Prompt and image are required"})
        }
        const formData = new FormData()
        formData.append("prompt", prompt);
        formData.append("file", fs.createReadStream(req.file.path), {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            });

        //console.log(formData)
        
        const resp = await axios.post("http://localhost:8000/image_query", formData, {
            headers: formData.getHeaders(),
        });

        fs.unlink(req.file.path, () => {});  // tidy temp file
        
        let ans = resp.data.llm_responce;
        console.log("Raw FastAPI response:", ans);

        if (typeof ans === "string") {
        try {
            ans = JSON.parse(ans);
        } catch (e) {
            console.error("Failed to parse JSON from FastAPI:", e);
            return res.status(500).json({ message: "FastAPI did not return valid JSON", fastapi_response: resp.data });
        }
        }

        console.log(ans.solution);

        res.status(200).json({message:"Disease query successful",crop:ans.crop,disease:ans.disease,solution:ans.solution});
    
    } catch (error) {
        console.log("Error in diseaseQueryController",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const schemeQueryController = async (req,res)=>{
    const {prompt} = req.body
    try {
        if(!prompt){
            return res.status(400).json({message:"Prompt is required"})
        }
        const data ={"prompt":prompt,"state":req.user.state}
        console.log(data)
        const resp = await fetch("http://localhost:8000/govt_scheme",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const ans = await resp.json()
        console.log(ans.llm_responce)
        res.status(200).json({message: ans.llm_responce,response: ans.llm_responce})

    } catch (error) {
        console.log("Error in schemeQueryController",error)
        res.status(500).json({message:"Internal server error"})
    }
    
}