const DB_URI = 'mongodb+srv://joblisting:vV8spiEdMcZaYy0G@lvcluster.bdqqe.mongodb.net/JobsDB?retryWrites=true&w=majority';

const DB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  DB_URI,
  DB_OPTIONS
};
