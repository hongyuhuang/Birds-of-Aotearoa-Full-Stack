const { bird_sort, search_string } = require('./bird_utils.js');
const Bird = require('../models/bird');

// get all birds (filtered)
async function filter_bird_data(search, status, sort) {

    const birds = await Bird.find( {} );
    var results = birds;
    
    // filter by conservation status 
    if (status !== undefined && status !== "All") {
        results = results.filter((b) => b.status == status);
    }
    // filter by search string
    if (search !== undefined && search !== "") {
        results = search_string(results, search);
    }
    // sort by
    if (sort !== undefined) {
        results = bird_sort(results, sort);
    }
    return results;
}

module.exports = { filter_bird_data };