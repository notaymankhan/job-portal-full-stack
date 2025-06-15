import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations ,JobExperienceLevel , JobType } from '../assets/assets';
import JobCard from './JobCard';
import Loading from './Loading.jsx';
import Select from 'react-select'



const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter, jobs  } = useContext(AppContext);

    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedExperienceLevel, setSelectedExperienceLevel] = useState([]);
    const [selectedJobType, setSelectedJobType] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState(jobs);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    // const handleLocationChange = (location) => {
    //     setSelectedLocations((prev) =>
    //         prev.includes(location) ? prev.filter((c) => c !== location) : [...prev, location]
    //     );
    // };
    //
    // const handleExperienceLevelChange = (experienceLevel) => {
    //     setSelectedExperienceLevel((prev) =>
    //         prev.includes(experienceLevel)
    //             ? prev.filter((c) => c !== experienceLevel)
    //             : [...prev, experienceLevel]
    //     );
    // }
    //
    // const handleJobTypeChange = (jobType) => {
    //     setSelectedJobType((prev) =>
    //         prev.includes(jobType)
    //             ? prev.filter((c) => c !== jobType)
    //             : [...prev, jobType]
    //     );
    // }


    useEffect(() => {
        const currentFilters ={
            categories: selectedCategories,
            locations: selectedLocations,
            experienceLevel: selectedExperienceLevel,
            jobType: selectedJobType,
            title: searchFilter.title,
            location: searchFilter.location
        }
        console.log("Current Filters: ", currentFilters);
        const filteringStartTime = Date.now();
        // console.log("filtering started at",moments(filteringStartTime).format('YYYY-MM-DD HH:mm:ss'));
        const matchesCategory = (job) =>
            selectedCategories.length === 0 || selectedCategories.includes(job.category);

        const matchesLocation = (job) =>
            selectedLocations.length === 0 || selectedLocations.includes(job.location);

        const matchesExperienceLevel = (job) =>
            selectedExperienceLevel.length === 0 || selectedExperienceLevel.includes(job.level);

        const matchesJobType = (job) =>
            selectedJobType.length === 0 || selectedJobType.includes(job.type);

        const matchesTitle = (job) =>
            searchFilter.title === '' || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

        const matchesSearchLocation = (job) =>
            searchFilter.location === '' || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

        const newFilteredJobs = jobs
            .slice()
            .reverse()
            .filter(
                (job) =>
                    matchesCategory(job) &&
                    matchesLocation(job) &&
                    matchesExperienceLevel(job) &&
                    matchesJobType(job) &&
                    matchesTitle(job) &&
                    matchesSearchLocation(job)
            );

        setFilteredJobs(newFilteredJobs);
        const filteringEndTime = Date.now();
        // console.log("filtering ended at",moments(filteringEndTime).format('YYYY-MM-DD HH:mm:ss'));
        const filteringDuration = (filteringEndTime - filteringStartTime) / 1000; // in seconds
        console.log("Jobs Filtered Duration = ", filteringDuration, " seconds");
        setCurrentPage(1);
    }, [jobs, selectedCategories, selectedLocations, searchFilter, selectedExperienceLevel, selectedJobType]);

    return (
        <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-white px-4">
                {/* Search Filter from Hero Component */}
                {isSearched && (searchFilter.title !== '' || searchFilter.location !== '') && (
                    <>
                        <h3 className="font-medium text-lg mb-4">Current Search</h3>
                        <div className="mb-4 text-gray-600">
                            {searchFilter.title && (
                                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                                    {searchFilter.title}
                                    <img
                                        onClick={(e) =>
                                            setSearchFilter((prev) => ({ ...prev, title: '' }))
                                        }
                                        className="cursor-pointer"
                                        src={assets.cross_icon}
                                        alt=""
                                    />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                                    {searchFilter.location}
                                    <img
                                        onClick={(e) =>
                                            setSearchFilter((prev) => ({ ...prev, location: '' }))
                                        }
                                        className="cursor-pointer"
                                        src={assets.cross_icon}
                                        alt=""
                                    />
                                </span>
                            )}
                        </div>
                    </>
                )}

                <button
                    onClick={(e) => setShowFilter((prev) => !prev)}
                    className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
                >
                    {showFilter ? 'Close' : 'Filters'}
                </button>

                {/* Category Filter */}
                <div className={showFilter ? '' : 'max-lg:hidden'}>
                    <h4 className="font-medium text-lg py-4">Search by Categories</h4>
                    <ul className="space-y-4 text-gray-600">
                        {JobCategories.map((category, index) => (
                            <li className="flex gap-3 items-center" key={index}>
                                <input
                                    className="scale-125"
                                    type="checkbox"
                                    onChange={() => handleCategoryChange(category)}
                                    checked={selectedCategories.includes(category)}
                                />
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Location Filter */}

                <div className={showFilter ? '' : 'max-lg:hidden'}>
                    <h4 className="font-medium text-lg py-4 pt-14">Search by Location</h4>
                    <Select
                        isMulti
                        options={
                            JobLocations.map((location) => ({
                            value: location,
                            label: location,
                        }))}
                        value={selectedLocations.map((location) => ({ value: location, label: location }))}
                        onChange={(selectedOptions) =>
                            setSelectedLocations(selectedOptions.map((option) => option.value))
                        }
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select Locations"
                    />
                </div>


                {/* Experience Level Filter */}

                <div className={showFilter ? '' : 'max-lg:hidden'}>
                    <h4 className="font-medium text-lg py-4 pt-14">Search by Experience Level</h4>
                    <Select
                        isMulti
                        options={JobExperienceLevel.map((experienceLevel) => ({
                            value: experienceLevel,
                            label: experienceLevel,
                        }))}
                        value={selectedExperienceLevel.map((experienceLevel) => ({
                            value: experienceLevel,
                            label: experienceLevel,
                        }))}
                        onChange={(selectedOptions) =>
                            setSelectedExperienceLevel(selectedOptions.map((option) => option.value))
                        }
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select Experience Levels"
                    />
                </div>

                {/* Job Type Filter */}
                <div className={showFilter ? '' : 'max-lg:hidden'}>
                    <h4 className="font-medium text-lg py-4 pt-14">Search by Job Type</h4>
                    <Select
                        isMulti
                        options={JobType.map((jobType) => ({
                            value: jobType,
                            label: jobType,
                        }))}
                        value={selectedJobType.map((jobType) => ({
                            value: jobType,
                            label: jobType,
                        }))}
                        onChange={(selectedOptions) =>
                            setSelectedJobType(selectedOptions.map((option) => option.value))
                        }
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select Job Types"
                    />
                </div>


            </div>

            {/* Job listings */}
            {jobs.length ===0 ? (
                <Loading />
            ) : filteredJobs.length === 0 ? (
                <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
                    <h3 className="font-medium text-3xl py-2" id="job-list">
                        No Jobs Found!!
                    </h3>
                    <p className="mb-8">
                        Please try changing your search criteria or check back later.
                    </p>
                </section>
            ) : (
                <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
                    <h3 className="font-medium text-3xl py-2" id="job-list">
                        Latest jobs
                    </h3>
                    <p className="mb-8">Get your desired job from top companies</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filteredJobs
                            .slice((currentPage - 1) * 6, currentPage * 6)
                            .map((job, index) => (
                                <JobCard key={index} job={job} />
                            ))}
                    </div>

                    {/* Pagination */}
                    {filteredJobs.length > 0 && (
                        <div className="flex items-center justify-center space-x-2 mt-10">
                            <a href="#job-list">
                                <img
                                    onClick={() =>
                                        setCurrentPage(Math.max(currentPage - 1, 1))
                                    }
                                    src={assets.left_arrow_icon}
                                    alt=""
                                />
                            </a>
                            {(() => {
                                const totalPages = Math.ceil(filteredJobs.length / 6);
                                const windowSize = 8;

                                // Calculate the start and end of the sliding window
                                const startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
                                const endPage = Math.min(totalPages, startPage + windowSize - 1);

                                // Adjust the startPage if the window exceeds the total pages
                                const adjustedStartPage = Math.max(1, endPage - windowSize + 1);

                                return Array.from({ length: endPage - adjustedStartPage + 1 }, (_, index) => (
                                    <a key={index} href="#job-list">
                                        <button
                                            onClick={() => setCurrentPage(adjustedStartPage + index)}
                                            className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                                                currentPage === adjustedStartPage + index
                                                    ? 'bg-blue-100 text-blue-500'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {adjustedStartPage + index}
                                        </button>
                                    </a>
                                ));
                            })()}
                            <a href="#job-list">
                                <img
                                    onClick={() =>
                                        setCurrentPage(
                                            Math.min(
                                                currentPage + 1,
                                                Math.ceil(filteredJobs.length / 6)
                                            )
                                        )
                                    }
                                    src={assets.right_arrow_icon}
                                    alt=""
                                />
                            </a>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default JobListing;
