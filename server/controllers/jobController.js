import Job from "../models/Job.js"



// Get All Jobs
export const getJobs = async (req, res) => {
    try {

        const jobs = await Job.find({ visible: true })
            .populate({ path: 'companyId', select: '-password' })

        res.json({ success: true, jobs })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// export const getJobsByParams = async (req, res) => {
//     try {
//         // Extract query parameters from the request
//         const { title, location, category, level, type } = req.query;
//
//         // Build a filter object dynamically
//         const filter = {};
//         if (location) {
//             filter.location = { $in: location.split('+') }; // Handle multiple locations
//         }
//         if (category) {
//             filter.category = { $in: category.split('+') }; // Handle multiple categories
//         }
//         if (title) {
//             filter.title = { $in: title.split('+') }; // Handle multiple titles
//         }
//         if (level) {
//             filter.level = { $in: level.split('+') }; // Handle multiple levels
//         }
//         if (type) {
//             filter.type = { $in: type.split('+') }; // Handle multiple types
//         }
//
//         // Query the database with the constructed filter
//         const jobs = await Job.find(filter).populate({
//             path: 'companyId',
//             select: '-password'
//         });
//
//         // Respond with the filtered jobs
//         res.json({ success: true, jobs });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// Get Single Job Using JobID
export const getJobById = async (req, res) => {
    try {

        const { id } = req.params

        const job = await Job.findById(id)
            .populate({
                path: 'companyId',
                select: '-password'
            })

        if (!job) {
            return res.json({
                success: false,
                message: 'Job not found'
            })
        }

        res.json({
            success: true,
            job
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
