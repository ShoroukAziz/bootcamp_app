

const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2] || 'JUL02';
const values = [`%${cohortName}`];

queryString = `
SELECT DISTINCT teachers.name as teacher  , cohorts.name as cohort
FROM assistance_requests
JOIN students on students.id = assistance_requests.student_id
JOIN teachers on teachers.id = assistance_requests.teacher_id
JOIN cohorts on cohorts.id  = students.cohort_id 
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`
pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    })
  }).catch(err => console.error('query error', err.stack));

