import ApiResponse from "../utils/ApiResponse.js";

export const health = async function (req,res) {
    return res.status(200)
        .json(new ApiResponse(200,{message : "Route is Working"}))
}