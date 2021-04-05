const JobModel = require('../models/job_schema');
const helper = require('../utils/helper');

function listAll(parameters) {
  const {
    searchText,
    jobType,
    locationText,
    experience
  } = parameters;

  const aggregateStages = [];

  /**
   * MongoDB combines all the below $match stages while optimizing the query.
   * So having multiple separate $match stages as below is OK!
   */

  // Keyword search.
  if (helper.isNotEmpty(searchText)) {
    aggregateStages.push({
      $match: {
        $text: { $search: searchText }
      }
    });
  }

  // Job type filter.
  if (helper.isNotEmpty(jobType)) {
    aggregateStages.push({
      $match: {
        type: { $in: jobType }
      }
    });
  }

  // Location filter.
  if (helper.isNotEmpty(locationText)) {
    aggregateStages.push({
      $match: {
        location: {
          $regex: `^${locationText}`,
          $options: 'i'
        }
      }
    });
  }

  // Minimum years of experience filter.
  if (helper.isNotEmpty(experience)) {
    aggregateStages.push({
      $addFields: {
        min: {
          $toInt: {
            $first: { $split: [{ $first: { $split: ['$experience', ' '] } }, '-'] }
          }
        },
        max: {
          $toInt: {
            $last: { $split: [{ $first: { $split: ['$experience', ' '] } }, '-'] }
          }
        }
      }
    });

    aggregateStages.push({
      $match: {
        $expr: {
          $and: [
            { $gte: [experience, '$min'] },
            { $lte: [experience, '$max'] }
          ]
        }
      }
    });
  }

  // Sort the result by most recently published jobs.
  aggregateStages.push({
    $sort: { updatedAt: -1 }
  });

  return JobModel.aggregate([
    aggregateStages
  ]).exec();
}

module.exports = {
  listAll
};
